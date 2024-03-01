const mongoose = require("mongoose");
const generatedUserId = () => {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const users = new mongoose.Schema({
  uid: {
    type: String,
  },
  userId: {
    type: String,
    default: generatedUserId,
  },
  userName: String,
  userImage: [String],
  address:String,
  email: { type: String, required: false},
  mobile: { type: String, required: false },
  password: { type: String, required: false },
  adhar:String,

});

module.exports = mongoose.model("users", users);
