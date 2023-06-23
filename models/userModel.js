const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    gender : { type: String, required: false },
    address: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    mobile: { type: String, required: false },
    password: { type: String, required: false },
    images: { type: [String], required: false },
    gID:{type: [String], required: false }
  });
  
  module.exports= mongoose.model("user", UserSchema);