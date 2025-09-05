Import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Google from './GoogleSignIn';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import baseURL from '../../utils/baseURL';

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
        if (resendTimer > 0) {
            const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
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
            if (response.status === 200) {
                toast.success(response.data.message || 'OTP sent successfully.');
                if (!otpSent) setOtpSent(true);
                setResendTimer(30);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error(error.response.data.message || 'Could not send OTP.');
            } else {
                console.error('Send OTP failed:', error);
                toast.error('Failed to send OTP. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtpSubmit = (e) => {
        e.preventDefault();
        requestOtp();
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) return toast.warn('Please enter the OTP.');
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/mail/verify-otp/site`, { email, otp });
            if (response.status === 200) {
                localStorage.setItem('isSignedIn', 'true');
                localStorage.setItem('rsUserId', response.data.userId);
                localStorage.setItem('rsToken', response.data.rsToken);
                localStorage.setItem('roomsstayUserEmail', response.data.email);
                localStorage.setItem('rsUserMobile', response.data.mobile);
            }

            navigate('/');
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error(error.response.data.message || 'Invalid OTP.');
            } else {
                console.error('OTP verification failed:', error);
                toast.error('OTP verification failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box" role="main" aria-label="Login form">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to manage your bookings</p>

                <button type="button" className="google-button" aria-label="Sign in with Google">
                    <Google />
                </button>
                <div className="toggle-mode">
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="toggle-btn"
                        aria-label={`Switch to ${mode === 'password' ? 'OTP' : 'Password'
                            } login`}
                    >
                        {mode === 'password' ? 'Login with OTP' : 'Login with Password'}
                    </button>
                </div>
                <div className="divider" aria-hidden="true">or</div>

                <form
                    onSubmit={
                        mode === 'password'
                            ? handlePasswordLogin
                            : otpSent
                                ? handleOtpSubmit
                                : handleSendOtpSubmit
                    }
                    noValidate
                    className="login-form"
                >
                    <div className="form-control">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={mode === 'otp' && otpSent}
                            autoComplete="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    {mode === 'password' && (
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="Enter your password"
                            />
                        </div>
                    )}

                    {mode === 'otp' && otpSent && (
                        <div
                            className="form-control otp-input-wrapper fade-in"
                            key="otp-field"
                        >
                            <label htmlFor="otp">Enter OTP</label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="6-digit OTP"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={6}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading
                            ? 'Processing...'
                            : mode === 'password'
                                ? 'Login'
                                : otpSent
                                    ? 'Verify OTP'
                                    : 'Send OTP'}
                    </button>
                </form>

                {mode === 'otp' && otpSent && (
                    <div className="resend-otp">
                        {resendTimer > 0 ? (
                            <span>Resend OTP in {resendTimer}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={requestOtp}
                                disabled={loading}
                                className="resend-btn"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                )}



                <div className="footer-note">
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
