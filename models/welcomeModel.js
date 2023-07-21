const mongoose = require("mongoose");

const welcomeSchema = new mongoose.Schema({
  images: { type: [String], required: false },
});

const Welcome = mongoose.model("Welcome", welcomeSchema);

module.exports = Welcome;
