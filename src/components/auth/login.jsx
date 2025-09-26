import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import baseURL from "../../utils/baseURL";
import { useToast } from "../../utils/toast";

const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
];

function CountryCodeDropdown({ selectedCode, onSelect, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const selectedCountry = countryCodes.find((c) => c.code === selectedCode);
  const filtered = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.includes(searchTerm)
  );
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative w-24 sm:w-28" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center justify-between px-3 py-2 border rounded-lg bg-white shadow-sm text-sm w-full focus:ring-2 focus:ring-blue-500"
      >
        <span>{selectedCountry?.flag}</span>
        <span>{selectedCountry?.code}</span>
        <svg
          className={`w-3 h-3 ml-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 12 12"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 bg-white border rounded-lg shadow-lg w-56 max-h-64 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filtered.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onSelect(c.code);
                setIsOpen(false);
                setSearchTerm("");
              }}
              className={`flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-gray-100 ${
                c.code === selectedCode ? "bg-gray-200 font-medium" : ""
              }`}
            >
              <span>{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-gray-500">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SixDigitOTP({ disabled, onComplete, value = "" }) {
  const [vals, setVals] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  useEffect(() => {
    if (value.length === 6) setVals(value.split(""));
    else if (value === "") setVals(Array(6).fill(""));
  }, [value]);
  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...vals];
    next[i] = v;
    setVals(next);
    if (v && i < 5) inputsRef.current[i + 1]?.focus();
    onComplete(next.every((d) => d) ? next.join("") : "");
  };
  return (
    <div className="flex gap-2">
      {vals.map((val, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-10 h-10 md:w-12 md:h-12 border rounded-lg text-center text-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          ref={(el) => (inputsRef.current[i] = el)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [mode, setMode] = useState("password");
  const [authMethod, setAuthMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const toggleMode = () => {
    setOtp("");
    setPassword("");
    setOtpSent(false);
    setResendTimer(0);
    setMode(mode === "password" ? "otp" : "password");
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.warn("Email and password required.");
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/signIn`, { email, password });
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("rsUserId", res.data.userId);
      localStorage.setItem("rsToken", res.data.rsToken);
      localStorage.setItem("roomsstayUserEmail", res.data.email);
      localStorage.setItem("rsUserMobile", res.data.mobile);
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async () => {
    if (authMethod === "email" && !email)
      return toast.warn("Please enter your email.");
    if (authMethod === "mobile" && !phone)
      return toast.warn("Please enter your mobile number.");
    setLoading(true);
    try {
      let res;
      if (authMethod === "email") {
        res = await axios.post(`${baseURL}/mail/send-otp`, { email });
      } else {
        const full = countryCode + phone;
        res = await axios.post(`${baseURL}/send-otp`, {
          phoneNumber: full,
          mobile: full,
        });
      }
      toast.success(res.data.message || "OTP sent successfully.");
      setOtpSent(true);
      setResendTimer(30);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.warn("Please enter the OTP.");
    setLoading(true);
    try {
      let res;
      if (authMethod === "email") {
        res = await axios.post(`${baseURL}/mail/verify-otp/site`, { email, otp });
      } else {
        const full = countryCode + phone;
        res = await axios.post(`${baseURL}/verify-otp`, {
          phoneNumber: full,
          mobile: full,
          code: otp,
        });
      }
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("rsUserId", res.data.userId);
      localStorage.setItem("rsToken", res.data.rsToken);
      localStorage.setItem("roomsstayUserEmail", res.data.email);
      localStorage.setItem("rsUserMobile", res.data.mobile);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit =
    mode === "password"
      ? handlePasswordLogin
      : otpSent
      ? handleOtpSubmit
      : (e) => {
          e.preventDefault();
          requestOtp();
        };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-5 sm:p-8 space-y-6 mx-auto">
        <div className="text-center">
          <UserCircleIcon className="mx-auto h-14 w-14 text-blue-600" />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>
        {mode === "otp" && (
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setAuthMethod("email")}
              className={`px-3 py-1 rounded-full border transition ${
                authMethod === "email"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("mobile")}
              className={`px-3 py-1 rounded-full border transition ${
                authMethod === "mobile"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Mobile
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "password" || authMethod === "email" ? (
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={mode === "otp" && otpSent}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                autoComplete="email"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <CountryCodeDropdown
                selectedCode={countryCode}
                onSelect={setCountryCode}
                disabled={otpSent}
              />
              <div className="relative flex-1">
                <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                  disabled={otpSent}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  autoComplete="tel"
                />
              </div>
            </div>
          )}
          {mode === "password" && (
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                autoComplete="current-password"
              />
            </div>
          )}
          {mode === "otp" && otpSent && (
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Enter verification code</label>
              <SixDigitOTP
                disabled={loading}
                onComplete={setOtp}
                value={otp}
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading || (mode === "otp" && otpSent && otp.length !== 6)}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
            <span>
              {loading
                ? "Processing..."
                : mode === "password"
                ? "Sign In"
                : otpSent
                ? "Verify & Sign In"
                : "Send OTP"}
            </span>
          </button>
        </form>
        {mode === "otp" && otpSent && (
          <div className="text-center text-sm">
            {resendTimer > 0 ? (
              <p className="text-gray-500">
                Resend code in{" "}
                <span className="font-semibold">{resendTimer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={requestOtp}
                disabled={loading}
                className="text-blue-600 hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
        )}
        <div className="text-center">
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline text-sm"
          >
            {mode === "password"
              ? "Use verification code instead"
              : "Use password instead"}
          </button>
        </div>
        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}
