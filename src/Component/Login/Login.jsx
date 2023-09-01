import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setemailError] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://13.48.45.18:4008/admin/login", {
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
      if (response.ok) {
        alert("Logged In ");
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminId", data.data._id);
        navigate("/mannage-auction");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="form-data">
        <div className="input-field-5">
          <label>
            <h2>Username:</h2>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={username}
              onChange={(event) => {
                if (!isValidEmail(event.target.value)) {
                  setemailError("Email is invalid");
                } else {
                  setemailError(null);
                }

                setUsername(event.target.value);
              }}
            />
            {emailerror && <h2 style={{ color: "red" }}>{emailerror}</h2>}
          </label>
        </div>
        <br />
        <div className="input-field-5">
          <label>
            <h2>Password:</h2>
            <input
              type={show === false ? "password" : "text"}
              placeholder="Mahi@3332"
              value={password}
              onChange={(event) => {
                if (!isValidPassword(event.target.value)) {
                  setError(
                    "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
                  );
                } else {
                  setError(null);
                }

                setPassword(event.target.value);
              }}
            />
            {show === false ? (
              <AiFillEyeInvisible
                className="pswd-icon"
                onClick={() => setShow(!show)}
              />
            ) : (
              <AiFillEye className="pswd-icon" onClick={() => setShow(!show)} />
            )}
            {error && <h2 style={{ color: "red" }}>{error}</h2>}
          </label>
        </div>
        <br />
        <div className="ok-btn-div">
          <button type="submit" className="ok-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
