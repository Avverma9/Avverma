import React, { useEffect, useState } from "react";
import "./Google.css";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

      // Use a ternary operator to conditionally set showErrorImage
      setShowErrorImage(response.status >= 200 && response.status < 300 ? false : true);
    }
  };

  return (
    <div className="google-container" onClick={handleGoogleLogin}>
      <p className="google-text">Continue With</p>
      <img
        src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
        alt="Google Logo"
        className="google-logo"
      />
      {showErrorImage ? (
        <img
          src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
          alt="Error"
          className="error-image"
        />
      ) : null}
    </div>
  );
};

export default Google;
