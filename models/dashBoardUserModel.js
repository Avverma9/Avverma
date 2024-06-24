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
    role: {
      type: String,
      required : true,
      enum: ["admin", "superAdmin","developer"],
    },
    address: String,
    password: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dashBoardUser", dashboardUser);
