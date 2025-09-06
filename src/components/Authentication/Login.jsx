import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css'; // Import the external CSS
import baseURL from '../../utils/baseURL';
import Google from './GoogleSignIn';

// A simple Google Icon component
const GoogleIcon = () => (
    <svg className="google-icon" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


export default function LoginPage() {
    const navigate = useNavigate();

    const [mode, setMode] = useState('password'); // 'password' or 'otp'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const toggleMode = () => {
        setOtp('');
        setPassword('');
        setOtpSent(false);
        setResendTimer(0);
        setMode(mode === 'password' ? 'otp' : 'password');
    };

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.warn('Email and password required.');
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/signIn`, { email, password });
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('rsUserId', res.data.userId);
            localStorage.setItem('rsToken', res.data.rsToken);
            localStorage.setItem('roomsstayUserEmail', res.data.email);
            localStorage.setItem('rsUserMobile', res.data.mobile);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    const requestOtp = async () => {
        if (!email) return toast.warn('Please enter your email.');
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/mail/send-otp`, { email });
            toast.success(response.data.message || 'OTP sent successfully.');
            setOtpSent(true);
            setResendTimer(30);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not send OTP.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) return toast.warn('Please enter the OTP.');
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/mail/verify-otp/site`, { email, otp });
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('rsUserId', response.data.userId);
            localStorage.setItem('rsToken', response.data.rsToken);
            localStorage.setItem('roomsstayUserEmail', response.data.email);
            localStorage.setItem('rsUserMobile', response.data.mobile);
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = mode === 'password'
        ? handlePasswordLogin
        : (otpSent ? handleOtpSubmit : (e) => { e.preventDefault(); requestOtp(); });

    return (
        <div className="login-page-container">
            <div className="login-card" role="main">
                <div className="login-header">
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">Sign in to continue to your account</p>
                </div>

                <button
                    type="button"
                    className="google-signin-btn"
                    aria-label="Sign in with Google"
                >
                    <Google />
                  
                </button>

                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>

                <form onSubmit={handleSubmit} noValidate className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={mode === 'otp' && otpSent}
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="form-input"
                        />
                    </div>

                    {mode === 'password' && (
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="form-input"
                            />
                        </div>
                    )}

                    {mode === 'otp' && otpSent && (
                        <div className="form-group animate-fade-in">
                            <label htmlFor="otp" className="form-label">
                                Enter OTP
                            </label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="6-digit code"
                                inputMode="numeric"
                                pattern="\d{6}"
                                maxLength={6}
                                className="form-input otp-input"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        aria-busy={loading}
                        className="submit-btn"
                    >
                        {loading ? 'Processing...' : (mode === 'password' ? 'Sign In' : (otpSent ? 'Verify & Sign In' : 'Send OTP'))}
                    </button>
                </form>

                <div className="login-footer">
                    {mode === 'otp' && otpSent && (
                        <div className="resend-container">
                            {resendTimer > 0 ? (
                                <span className="resend-timer">Resend OTP in {resendTimer}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={requestOtp}
                                    disabled={loading}
                                    className="link-button"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    )}
                    <button onClick={toggleMode} className="link-button">
                        {mode === 'password' ? 'Use One-Time Password (OTP)' : 'Use Password Instead'}
                    </button>
                </div>
                 <div className="register-link-container">
                    <p>
                        Don’t have an account?{' '}
                        <a href="/register" className="register-link">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

