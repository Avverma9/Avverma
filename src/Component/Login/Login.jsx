import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("Mahi@3332");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://13.233.229.68:4008/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="form-data">
      <div className="input-field-5">
        <label>
        <h2>
          Username:</h2>
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        <br />
        <div className="input-field-5">
        <label><h2>
          Password:</h2>
          <input
            type="password"
            placeholder="Mahi@3332"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
        <br />
        <div className="ok-btn-div">
        <button type="submit" className="ok-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};


export default Login;
