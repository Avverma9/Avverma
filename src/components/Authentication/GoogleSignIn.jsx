import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import baseURL from '../../utils/baseURL';
import Googles from '@mui/icons-material/Google';
const firebaseConfig = {
    apiKey: 'AIzaSyB8g--z3j8NrWrJrOUMyvXf4AAuxgdOKSI',
    authDomain: 'hotelroomsstay-2bb96.firebaseapp.com',
    projectId: 'hotelroomsstay-2bb96',
    storageBucket: 'hotelroomsstay-2bb96.appspot.com',
    messagingSenderId: '847078471253',
    appId: '1:847078471253:web:ea331e86bdbd9bf78906dc',
    measurementId: 'G-FJ3K5REZEK',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Google = () => {
    const provider = new GoogleAuthProvider();
    const [showErrorImage, setShowErrorImage] = useState(false);

    const handleGoogleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const email = user.email;

            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('loggedUser', JSON.stringify(user));
            const storedLoggedUser = localStorage.getItem('loggedUser');
            const loggedUserObj = JSON.parse(storedLoggedUser);
            const originalData = loggedUserObj.providerData;
            const uid = originalData[0].uid;
            const images = originalData[0].photoURL;
            const GoogleEmail = originalData[0].email;
            const userName = originalData[0].displayName;
            const response = await fetch(`${baseURL}/signIn/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    images: images,
                    email: GoogleEmail,
                    userName: userName,
                }),
            });
            if (response.ok) {
                window.history.back();
            } else {
                setShowErrorImage(true);
            }

            const data = await response.json();
            console.log('Google login data:', GoogleEmail);

            const { userId, rsToken, mobile } = data;

            localStorage.setItem('rsUserId', userId);
            localStorage.setItem('rsToken', rsToken);
            localStorage.setItem('rsUserMobile', mobile);
            localStorage.setItem('roomsstayUserEmail', GoogleEmail);
            localStorage.setItem('roomsstayUserImage', images);
            const userDocRef = doc(db, 'users', userId);
            await setDoc(userDocRef, { email /* other user data */ });
        } catch (error) {
            console.error('Google login error:', error);
            setShowErrorImage(true);
        }
    };
    return (
        <div className="google-container" onClick={handleGoogleLogin}>
            <Googles />
            Continue with google
        </div>
    );
};

export default Google;
