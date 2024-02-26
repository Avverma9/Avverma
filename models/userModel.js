const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  uid:{
    type:String,
  },
  name: { type: String, required: false },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  mobile: { type: String, required: false },
  password: { type: String, required: false },
  images: { type: [String], required: false },
  adhar: { type: String, required: false, unique: true },
  pan: { type: String, required: false, unique: true },
  dl: { type: String, required: false, unique: true },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
  otp: { type: String, required: false }, 
  otpExpires: { type: Date, required: false }, 
});
  
  module.exports= mongoose.model("user", UserSchema); 