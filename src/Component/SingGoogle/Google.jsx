import React, { useEffect, useState } from "react";
import "./Google.css";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const Google = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [showErrorImage, setShowErrorImage] = useState(false); // State to control whether to show the error image

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const user = result.user;
      const email = user.email;
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("loggedUser", JSON.stringify(user));

      const response = await fetch("https://hotel-backend-tge7.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Use a ternary operator to conditionally navigate and set showErrorImage
      response.status >= 200 && response.status < 300
        ? (window.location.href = "/profile")
        : setShowErrorImage(true);
        const data = await response.json();
        const { userId } = data;

        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userId", userId);
        
    }
  };

  return (
    <div className="google-container" onClick={handleGoogleLogin}>
      <p className="google-text">Continue With</p>
      {showErrorImage ? (
        <img
          src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" // Replace with the URL of your error image
          alt="Error"
          className="error-image"
        />
      ) : (
        <img
          src="https://avvermabucket.s3.ap-south-1.amazonaws.com/1693858435763-kisspng-google-images-computer-icons-google-logo-portable-search-engine-search-searching-detective-zoomi-5cc855f44c71c0.3502844515566330763131.png"
          alt="Google Logo"
          className="google-logo"
        />
      )}
    </div>
  );
};

export default Google;
