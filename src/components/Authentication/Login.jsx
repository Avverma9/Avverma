import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Google from './GoogleSignIn';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';

export default function LoginPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('password');
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg md:p-10" role="main" aria-label="Login form">
                <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">Welcome Back</h2>
                <p className="mb-6 text-center text-gray-500">Sign in to manage your bookings</p>

                <button
                    type="button"
                    className="google-button flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    aria-label="Sign in with Google"
                >
                    <Google />
                </button>

                <div className="flex items-center justify-center pt-4">
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
                        aria-label={`Switch to ${mode === 'password' ? 'OTP' : 'Password'} login`}
                    >
                        {mode === 'password' ? 'Login with OTP' : 'Login with Password'}
                    </button>
                </div>

                <div className="relative my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form
                    onSubmit={
                        mode === 'password'
                            ? handlePasswordLogin
                            : otpSent
                                ? handleOtpSubmit
                                : handleSendOtpSubmit
                    }
                    noValidate
                    className="space-y-6"
                >
                    <div className="form-control">
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={mode === 'otp' && otpSent}
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-300 p-3 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
                        />
                    </div>

                    {mode === 'password' && (
                        <div className="form-control">
                            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 p-3 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    )}

                    {mode === 'otp' && otpSent && (
                        <div className="form-control animate-fade-in" key="otp-field">
                            <label htmlFor="otp" className="mb-1 block text-sm font-medium text-gray-700">Enter OTP</label>
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
                                className="w-full rounded-lg border border-gray-300 p-3 text-center tracking-wider transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full rounded-lg py-3 font-semibold text-white shadow-sm transition-colors ${loading ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
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
                    <div className="mt-4 text-center">
                        {resendTimer > 0 ? (
                            <span className="text-sm text-gray-500">Resend OTP in {resendTimer}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={requestOtp}
                                disabled={loading}
                                className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500 disabled:cursor-not-allowed disabled:text-gray-400"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Don’t have an account?{' '}
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
