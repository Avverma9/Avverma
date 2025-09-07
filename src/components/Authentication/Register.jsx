import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../utils/toast";
import baseURL from "../../utils/baseURL";

// Replace with your actual API endpoint


const AuthPageStyles = () => (
  <style>{`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-image: linear-gradient(to bottom right, #f0f4ff, white, #e0f7fa);
    }
    .auth-page-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    .auth-card {
      width: 100%;
      max-width: 30rem;
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .auth-header {
      text-align: center;
    }
    .auth-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }
    .auth-subtitle {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #6b7280;
    }
    .auth-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .auth-form .full-width {
      grid-column: span 2;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }
    .form-input {
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.9rem;
    }
    .form-input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px #4f46e5;
    }
    .submit-btn {
      width: 100%;
      padding: 0.8rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      background: #4f46e5;
      color: #fff;
      cursor: pointer;
    }
    .submit-btn:hover {
      background: #4338ca;
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .login-link-container {
      text-align: center;
      font-size: 0.9rem;
      color: #374151;
    }
    .login-link {
      color: #4f46e5;
      font-weight: 500;
      text-decoration: none;
    }
    .login-link:hover {
      text-decoration: underline;
    }
  `}</style>
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, mobile, password } = formData;
    if (!userName || !email || !mobile || !password) {
      return toast.warn("Please fill in all required fields.");
    }

    setLoading(true);
    const data = new FormData();
    data.append("userName", userName);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("password", password);
    if (formData.image) {
      data.append("images", formData.image);
    }

    try {
      const res = await axios.post(`${baseURL}/Signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data?.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthPageStyles />
      <div className="auth-page-container">
        <div className="auth-card" role="main">
          <div className="auth-header">
            <h2 className="auth-title">Create Your Account</h2>
            <p className="auth-subtitle">
              Get started by filling out the form below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="userName" className="form-label">
                Username
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                placeholder="Choose a unique username"
                className="form-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="form-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="123-456-7890"
                className="form-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="form-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image" className="form-label">
                Profile Picture (Optional)
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="form-input"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="submit-btn full-width"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="login-link-container">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
