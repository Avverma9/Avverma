import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import baseURL from '../../utils/baseURL';
import Google from './GoogleSignIn';

// Country codes data
const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
    { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
    { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
    { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
    { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
    { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
    { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' }
];

// Country Code Dropdown Component
function CountryCodeDropdown({ selectedCode, onSelect, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const selectedCountry = countryCodes.find(country => country.code === selectedCode);
    
    const filteredCountries = countryCodes.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm)
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (country) => {
        onSelect(country.code);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="country-dropdown" ref={dropdownRef}>
            <button
                type="button"
                className={`country-button ${isOpen ? 'active' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                aria-label="Select country code"
                aria-expanded={isOpen}
            >
                <span className="country-flag">{selectedCountry?.flag}</span>
                <span className="country-code">{selectedCode}</span>
                <svg className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
            </button>
            
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                            autoFocus
                        />
                    </div>
                    <div className="countries-list">
                        {filteredCountries.map((country) => (
                            <button
                                key={country.country}
                                type="button"
                                className={`country-option ${country.code === selectedCode ? 'selected' : ''}`}
                                onClick={() => handleSelect(country)}
                            >
                                <span className="country-flag">{country.flag}</span>
                                <span className="country-info">
                                    <span className="country-name">{country.name}</span>
                                    <span className="country-code">{country.code}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Enhanced 6-digit OTP input
function SixDigitOTP({ disabled, onComplete, value = '' }) {
    const [vals, setVals] = useState(Array(6).fill(''));
    const inputsRef = useRef([]);

    useEffect(() => {
        if (value.length === 6) {
            setVals(value.split(''));
        } else if (value === '') {
            setVals(Array(6).fill(''));
        }
    }, [value]);

    const handleChange = (i, v) => {
        if (!/^\d?$/.test(v)) return;
        const next = [...vals];
        next[i] = v;
        setVals(next);
        
        if (v && i < 5) {
            inputsRef.current[i + 1]?.focus();
        }
        
        if (next.every((d) => d !== '')) {
            onComplete(next.join(''));
        } else {
            onComplete('');
        }
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace') {
            if (!vals[i] && i > 0) {
                inputsRef.current[i - 1]?.focus();
            } else if (vals[i]) {
                const next = [...vals];
                next[i] = '';
                setVals(next);
                onComplete('');
            }
        }
    };

    const handlePaste = (e) => {
        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!text) return;
        
        const next = Array(6).fill('');
        for (let i = 0; i < text.length; i++) {
            next[i] = text[i];
        }
        setVals(next);
        
        if (text.length === 6) {
            onComplete(text);
        }
        e.preventDefault();
    };

    return (
        <div className="otp-grid" onPaste={handlePaste}>
            {vals.map((val, i) => (
                <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    pattern="\d{1}"
                    maxLength={1}
                    className="otp-cell"
                    value={val}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    ref={(el) => (inputsRef.current[i] = el)}
                    disabled={disabled}
                    aria-label={`OTP digit ${i + 1}`}
                />
            ))}
        </div>
    );
}

export default function LoginPage() {
    const navigate = useNavigate();

    // Modes and method selection
    const [mode, setMode] = useState('password');
    const [authMethod, setAuthMethod] = useState('email');

    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [otp, setOtp] = useState('');

    // Flow state
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

    useEffect(() => {
        if (mode === 'otp') {
            setOtp('');
            setOtpSent(false);
            setResendTimer(0);
        }
    }, [authMethod, mode]);

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.warn('Email and password required.');
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/signIn`, { email, password });
            sessionStorage.setItem('isSignedIn', 'true');
            sessionStorage.setItem('rsUserId', res.data.userId);
            sessionStorage.setItem('rsToken', res.data.rsToken);
            sessionStorage.setItem('roomsstayUserEmail', res.data.email);
            sessionStorage.setItem('rsUserMobile', res.data.mobile);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    const requestOtp = async () => {
        if (authMethod === 'email') {
            if (!email) return toast.warn('Please enter your email.');
        } else {
            if (!phone) return toast.warn('Please enter your mobile number.');
        }
        
        setLoading(true);
        try {
            let response;
            if (authMethod === 'email') {
                response = await axios.post(`${baseURL}/mail/send-otp`, { email });
            } else {
                const fullPhoneNumber = countryCode + phone;
                response = await axios.post(`${baseURL}/send-otp`, { 
                    phoneNumber: fullPhoneNumber,
                    mobile: fullPhoneNumber 
                });
            }
            
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
            let response;
            if (authMethod === 'email') {
                response = await axios.post(`${baseURL}/mail/verify-otp/site`, { email, otp });
            } else {
                const fullPhoneNumber = countryCode + phone;
                response = await axios.post(`${baseURL}/verify-otp`, { 
                    phoneNumber: fullPhoneNumber,
                    mobile: fullPhoneNumber, 
                    code: otp 
                });
            }
            
            sessionStorage.setItem('isSignedIn', 'true');
            sessionStorage.setItem('rsUserId', response.data.userId);
            sessionStorage.setItem('rsToken', response.data.rsToken);
            sessionStorage.setItem('roomsstayUserEmail', response.data.email);
            sessionStorage.setItem('rsUserMobile', response.data.mobile);
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
                    <div className="brand-logo">
                        <div className="logo-circle">
                            <span>HRS</span>
                        </div>
                    </div>
                    <h1 className="login-title">Welcome Back!</h1>
                    <p className="login-subtitle">Sign in to continue to your account</p>
                </div>

                {/* <button
                    type="button"
                    className="google-signin-btn"
                    aria-label="Sign in with Google"
                >
                    <div className="google-icon-wrapper">
                        <Google />
                    </div>
             
                </button>

                <div className="divider">
                    <span className="divider-text">or</span>
                </div> */}

                {mode === 'otp' && (
                    <div className="method-selector" role="group" aria-label="Select OTP method">
                        <button
                            type="button"
                            className={`method-chip ${authMethod === 'email' ? 'selected' : ''}`}
                            aria-pressed={authMethod === 'email'}
                            onClick={() => setAuthMethod('email')}
                        >
                            <div className="method-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                            <span className="method-text">Email</span>
                        </button>
                        <button
                            type="button"
                            className={`method-chip ${authMethod === 'mobile' ? 'selected' : ''}`}
                            aria-pressed={authMethod === 'mobile'}
                            onClick={() => setAuthMethod('mobile')}
                        >
                            <div className="method-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                                </svg>
                            </div>
                            <span className="method-text">Mobile</span>
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="login-form">
                    {mode === 'password' ? (
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="form-input"
                            />
                        </div>
                    ) : (
                        authMethod === 'email' ? (
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={otpSent}
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    className="form-input"
                                />
                            </div>
                        ) : (
                            <div className="form-group">
                                <label className="form-label">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                                    </svg>
                                    Mobile Number
                                </label>
                                <div className="phone-input-container">
                                    <CountryCodeDropdown
                                        selectedCode={countryCode}
                                        onSelect={setCountryCode}
                                        disabled={otpSent}
                                    />
                                    <input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                                        required
                                        disabled={otpSent}
                                        autoComplete="tel"
                                        placeholder="Enter mobile number"
                                        className="form-input phone-input"
                                    />
                                </div>
                            </div>
                        )
                    )}

                    {mode === 'password' && (
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
                                </svg>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="form-input"
                            />
                        </div>
                    )}

                    {mode === 'otp' && otpSent && (
                        <div className="form-group animate-fade-in">
                            <label className="form-label otp-label">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM18 20H6V10h12v10z"/>
                                </svg>
                                Enter verification code
                            </label>
                            <p className="otp-description">
                                We sent a 6-digit code to {authMethod === 'email' ? email : `${countryCode} ${phone}`}
                            </p>
                            <SixDigitOTP
                                disabled={loading}
                                onComplete={(code) => setOtp(code)}
                                value={otp}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || (mode === 'otp' && otpSent && otp.length !== 6)}
                        className="submit-btn"
                    >
                        {loading && (
                            <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3"/>
                                <path d="M22 12c0-5.5-4.5-10-10-10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                            </svg>
                        )}
                        <span>
                            {loading 
                                ? 'Processing...' 
                                : (mode === 'password' 
                                    ? 'Sign In' 
                                    : (otpSent 
                                        ? 'Verify & Sign In' 
                                        : `Send OTP`
                                    )
                                )
                            }
                        </span>
                    </button>
                </form>

                <div className="login-footer">
                    {mode === 'otp' && otpSent && (
                        <div className="resend-container">
                            {resendTimer > 0 ? (
                                <p className="resend-timer">
                                    Resend code in <span className="timer-count">{resendTimer}s</span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={requestOtp}
                                    disabled={loading}
                                    className="link-button"
                                >
                                    Resend code
                                </button>
                            )}
                        </div>
                    )}
                    
                    <button onClick={toggleMode} className="toggle-mode-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {mode === 'password' ? 'Use verification code instead' : 'Use password instead'}
                    </button>
                </div>

                <div className="register-section">
                    <p>
                        Don't have an account? 
                        <a href="/register" className="register-link">Create one</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
