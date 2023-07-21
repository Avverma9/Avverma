const express = require('express');
const userModel = require("../models/userModel");
const Twilio = require('twilio');


const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

// Create a Twilio client
const client = new Twilio(accountSid, authToken);

// API route for generating and sending OTP
const sendOtp =  async (req, res) => {
  const { mobile } = req.body;

  try {
 
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const otp = Math.floor(1000 + Math.random() * 9000);

 
    user.otp = otp;
    user.otpExpires = Date.now() + 120000; 
    await user.save();

   
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: user.mobile,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
}

module.exports = {sendOtp};
