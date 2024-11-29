// nodemailer.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Set up the Nodemailer transporter with Gmail (use your email configuration)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD, // Use the EMAIL_PASS from .env
    },
});

// Send OTP email function
const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Generate OTP function
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
};

module.exports = { sendOtpEmail, generateOtp };
