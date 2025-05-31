import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Google from './GoogleSignIn';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import baseURL from '../../utils/baseURL';
import './Login.css'; // ⬅ Link to external CSS file

export default function LoginPage() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
            const data = JSON.parse(storedUser).providerData[0];
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('userImage', data.photoURL);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('userName', data.displayName);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/signIn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const { userId, rsToken } = await response.json();
                localStorage.setItem('isSignedIn', 'true');
                localStorage.setItem('rsUserId', userId);
                localStorage.setItem('rsToken', rsToken);
                window.history.back();

            } else {
                const err = await response.json();
                console.error('Login failed:', err.message);
            }
        } catch (err) {
            console.error('Network error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`login-page ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="login-header">
                <div className="logo">
                    <span role="img" aria-label="logo">🏨</span>
                    <h2>Hotel Roomsstay</h2>
                </div>
                <button className="mode-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? '🌙' : '☀️'}
                </button>
            </div>

            <div className="login-container">
                <h1>Sign in</h1>
                <p>
                    New to Roomsstay? <a href="/register">Sign up!</a>
                </p>

                <button className="google-button">
                    <Google />
                </button>

                <div className="divider">or</div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                    </div>

                    <div className="form-group password-group">
                        <label>Password</label>
                        <input type={showPassword ? 'text' : 'password'} name="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                        <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className="form-footer">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="submit-btn">
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>

            <footer className="login-footer">
                © Hotel Roomsstay {new Date().getFullYear()}
            </footer>
        </div>
    );
}
