const mongoose = require("mongoose");

const dashboardUser = new mongoose.Schema(
  {
    images: [String],
    name: String,
    mobile: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("dashBoardUser", dashboardUser);
