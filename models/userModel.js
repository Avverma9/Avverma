const mongoose = require("mongoose");
const generatedUserId = () => {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  userId: {
    type: String,
    default: generatedUserId,
  },
  userName: { type: String, required: false },
  userImage: { type: [String], required: false },
  address: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  mobile: { type: String, required: false },
  password: { type: String, required: false },

  adhar: { type: String, required: false, unique: true },
  pan: { type: String, required: false, unique: true },

});

module.exports = mongoose.model("user", UserSchema);
