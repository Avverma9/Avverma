const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true,
  },
  images: {
    type: [String],
    default: [],
  }, 
  text: {
    type: [String],
    default: [],
  },
});



module.exports = mongoose.model("State", stateSchema);
