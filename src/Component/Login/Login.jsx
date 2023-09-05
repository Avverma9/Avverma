import React, { useState } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";
import "./Login.css";
import Google from "../SingGoogle/Google.jsx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";





const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignedIn = localStorage.getItem("isSignedIn")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true while making the request

    try {
      const response = await fetch(
        "https://hotel-backend-tge7.onrender.com/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { userId } = data;

        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userId", userId);
        navigate("/profile");
      } else {
        console.log("Sign in failed");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after the request is complete
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    navigate("/register"); // Redirect to the signup page
  };

  const handleOtplogin =()=>{
    navigate("/otplogin")
  }

  if (location.pathname !== "/") {
    return null;
  }

  const handleForgotPassword = () => {
    navigate("/passwordChangeMail"); 
  };
if(!isSignedIn){
  return null
}

  return (
    <div className="card-signin">
      {isLoading && (
        <img
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt="Loading"
          className="loading-image"
        />
      )}

      <form onSubmit={handleSignIn}>
        <div className="form-group-signin">
          <input
          style={{border:'2px solid black'}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Your Username"
            className="input-signin"
          />
        </div>
        <div className="form-group-signin">
          <input
          style={{border:'2px solid black'}}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Your Password"
            className="input-signin"
          />
          <button
            type="button"
            className="show-password-button-signin"
            onClick={togglePasswordVisibility}
            style={{ position: "relative", bottom: "35px", left: "250px" }}
          >
            {showPassword ? (
              <AiFillEye
              size={25}
                alt="Toggle Password Visibility"
                className="eye-icon"
              />
            ) : (
              < AiFillEyeInvisible 
              size={25}
                alt="Toggle Password Visibility"
                className="eye-icon"
              />
            )}
          </button>
          Forgot Your Password ?
          <button onClick={handleForgotPassword} className="signup-button">Click Here</button>
        </div>
        <button type="submit-login" disabled={isLoading} className="signin-button">
      Sign In
    </button>
    <button type="submit-otp" onClick={handleOtplogin} disabled={isLoading} className="signin-button">
      OTP SignIn
    </button>
        <Google />
        
        <br />

        <div className="dhac">
          Don't have an account?
          <button
            type="button"
            onClick={handleSignUp}
            className="signup-button"
          >
            Click Here
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default Login;
