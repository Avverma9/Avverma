import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the entered email and password match the default values
    if (email === "user@example.com" && password === "user") {
      navigate("/home");
    } else {
      // Show an error message if the email and password are incorrect
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container-admin">
    
      <div className="form_container-admin">
        <div className="right-admin">
          <h2 className="from_heading-admin">Admin</h2>
          <input
            type="text"
            className="input-admin"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-admin"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-admin" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
