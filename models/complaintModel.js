const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  regarding: {
    type: String,
    enum: ["Booking", "Hotel", "Website"],
  },
  hotelName: String,
  bookingId: String,
  attachment: [String],
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected", "Resolved"],
    default: "Pending",
  },
  issue: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("complaint", complaintSchema);
