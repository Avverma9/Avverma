import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ResetPassword.module.css"

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/resetPassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }), 
      });

      if (response.ok) {
        toast.success("Password reset successful. You can now log in.");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else if (response.status === 404) {
        const data = await response.json();
        toast.error(data.error);
      } else {
        toast.error("Password reset failed. Please try again later.");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles["reset-password-container"]}>
      <h2 className={styles["reset-password-heading"]}>Reset Your Password</h2>
      <form onSubmit={handleResetPassword} className={styles["reset-password-form"]}>
        <div>
          <label className={styles["reset-password-label"]}>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles["reset-password-input"]}
          />
        </div>
        <div>
          <label className={styles["reset-password-label"]}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles["reset-password-input"]}
          />
        </div>
        <button type="submit" className={styles["reset-password-button"]}>
          Reset Password
        </button>
      </form>
    
    </div>
  )
};

export default ResetPassword;