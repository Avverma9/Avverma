import Googles from "@mui/icons-material/Google";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import baseURL from "../../utils/baseURL";
import { useLoader } from "../../utils/loader";

const firebaseConfig = {
  apiKey: "AIzaSyB8g--z3j8NrWrJrOUMyvXf4AAuxgdOKSI",
  authDomain: "hotelroomsstay-2bb96.firebaseapp.com",
  projectId: "hotelroomsstay-2bb96",
  storageBucket: "hotelroomsstay-2bb96.appspot.com",
  messagingSenderId: "847078471253",
  appId: "1:847078471253:web:ea331e86bdbd9bf78906dc",
  measurementId: "G-FJ3K5REZEK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Google = () => {
  const provider = new GoogleAuthProvider();
  const [showErrorImage, setShowErrorImage] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      sessionStorage.setItem("isSignedIn", "true");
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      const storedLoggedUser = sessionStorage.getItem("loggedUser");
      const loggedUserObj = JSON.parse(storedLoggedUser);
      const originalData = loggedUserObj.providerData;
      const uid = originalData[0].uid;
      const images = originalData[0].photoURL;
      const GoogleEmail = originalData[0].email;
      const userName = originalData[0].displayName;

      const response = await fetch(`${baseURL}/signIn/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          images: images,
          email: GoogleEmail,
          userName: userName,
        }),
      });

      if (!response.ok) {
        showLoader();
      }

      if (response.ok) {
        hideLoader();
        window.location.href = "/";
      } else {
        setShowErrorImage(true);
      }

      const data = await response.json();
      const { userId, rsToken, mobile } = data;

      sessionStorage.setItem("rsUserId", userId);
      sessionStorage.setItem("rsToken", rsToken);
      sessionStorage.setItem("rsUserMobile", mobile);
      sessionStorage.setItem("roomsstayUserEmail", GoogleEmail);
      sessionStorage.setItem("roomsstayUserImage", images);
      sessionStorage.setItem("roomsstayUserName", userName);
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, { email: GoogleEmail }); // Changed to use GoogleEmail
    } catch (error) {
      console.error("Google login error:", error);
      setShowErrorImage(true);
    }
  };

  return (
    <div className="google-container" onClick={handleGoogleLogin}>
      <Googles /> Continue with Google
    </div>
  );
};

export default Google;
