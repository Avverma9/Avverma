import React, { useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from  "./ConfirmEmail.module.css"

const ConfirmEmail = () => {
  const [email, setEmail] = useState("");

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://hotel-backend-tge7.onrender.com/passwordChangeMail/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Password reset email sent successfully");
        toast.success("Password reset email sent successfully");
      } else if (response.status === 404) {
        console.log("User not found");
        toast.error("User not found");
      } else {
        console.log("Failed to send password reset email");
        toast.error("Failed to send password reset email");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles["reset-password-container"]}>
    <h2 className={styles["reset-password-heading"]}>Enter Your Email to Reset Password</h2>
    <form onSubmit={handleSendEmail} className={styles["reset-password-form"]}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter Your Email"
        className={styles["reset-password-input"]}
      />
      <button type="submit" className={styles["reset-password-button"]}>
        Send Reset Password Email
      </button>
    </form>
  </div>
  );
};

export default ConfirmEmail;
