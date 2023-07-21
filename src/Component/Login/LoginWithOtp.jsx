import React, { useState, useEffect } from 'react';
import styles from "./LoginWithOtp.module.css"

const LoginWithOtp = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleResendOTP = () => {
    setOtpSent(false);
    setOtp('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      const otp = Math.floor(1000 + Math.random() * 9000);
      setOtp(otp);
      setOtpSent(true);
      setOtpExpiry(Date.now() + 120000); 
    }, 1000); 

    setOtpSent(true);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      if (otpExpiry && Date.now() < otpExpiry) {
        const remainingTime = Math.ceil((otpExpiry - Date.now()) / 1000);
        console.log(remainingTime); 
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpiry]);

  return (
    <div className={styles['login-with-otp-container']}>
      {otpSent ? (
        <div>
          <h2 className={styles['login-with-otp-heading']}>OTP Sent</h2>
          <p>An OTP has been sent to your mobile number.</p>
          <p>OTP expires in: {"2"}</p>
          <input
            type="text"
            value={otp}
            onChange={handleOTPChange}
            placeholder="Enter OTP"
            maxLength={4}
            className={styles['login-with-otp-input']}
            required
          />
          <button onClick={handleResendOTP} className={styles['login-with-otp-button']}>
            Resend OTP
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles['login-with-otp-form']}>
          <h2 className={styles['login-with-otp-heading']}>Login with OTP</h2>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Enter your mobile number"
            required
            className={styles['login-with-otp-input']}
          />
          <button type="submit" className={styles['login-with-otp-button']}>
            Send OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginWithOtp;
