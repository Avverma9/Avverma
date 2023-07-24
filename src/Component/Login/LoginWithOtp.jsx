// LoginWithOtp.js
import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginWithOtp.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginWithOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email && !mobileNumber) {
      toast.error("Please enter either an email or mobile number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/otplogin", {
        email: email || null,
        mobileNumber: mobileNumber || null,
      });

      if (response.status === 200) {
        setOtpSent(true);
        toast.success(
          "OTP sent successfully. Check your email or mobile number."
        );
      } else {
        toast.error(response.data.error || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error("Error occurred. Please try again.");
    }
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/verifyotp", {
        email: email || null,
        mobileNumber: mobileNumber || null,
        otp,
      });
      console.log("Response from API:", response.data);
      const { userId } = response.data;
      if (response.status === 200) {
        toast.success("OTP verification successful. Logged in.");
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userId", userId);
        navigate("/");
      } else {
        toast.error(response.data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error occurred. Please try again.");
    }
  };

  return (
    <div className={styles["login-with-otp-container"]}>
      <form
        onSubmit={otpSent ? handleOTPSubmit : handleSendOTP}
        className={styles["login-with-otp-form"]}
      >
        <h2 className={styles["login-with-otp-heading"]}>Login with OTP</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email address"
          className={styles["login-with-otp-input"]}
        />
        {otpSent ? (
          <>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOTPChange}
              placeholder="Enter OTP"
              maxLength={4}
              className={styles["login-with-otp-input"]}
              required
            />
          </>
        ) : (
          <>
            <h5 style={{ margin: "auto" }}>OR</h5>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              placeholder="Enter your mobile number"
              className={styles["login-with-otp-input"]}
            />
          </>
        )}
        <button type="submit" className={styles["login-with-otp-button"]}>
          {otpSent ? "Verify OTP" : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default LoginWithOtp;
