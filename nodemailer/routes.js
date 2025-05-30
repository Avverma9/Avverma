const express = require('express');
const { generateOtp, sendOtpEmail, sendCustomEmail } = require('./nodemailer');
const router = express.Router();

const otpStore = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000;

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + OTP_EXPIRY_MS;

    try {
        await sendOtpEmail(email, otp);
        otpStore.set(email, { otp, expiresAt });
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const stored = otpStore.get(email);

    if (!stored) {
        return res.status(400).json({ message: 'No OTP found for this email' });
    }

    if (Date.now() > stored.expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ message: 'OTP has expired' });
    }

    if (stored.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    otpStore.delete(email);
    res.status(200).json({ message: 'OTP verified successfully' });
});

router.post('/send-message', async (req, res) => {
  const { email, subject, message, link } = req.body;

  try {
    await sendCustomEmail(email, subject, message, link);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
