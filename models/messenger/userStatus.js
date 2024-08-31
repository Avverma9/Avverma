const mongoose = require("mongoose");

const userStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dashBoardUser",
    required: true,
  },
  online: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserStatus", userStatusSchema);
