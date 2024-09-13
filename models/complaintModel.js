const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
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
    feedBack:String,
    images: [String],
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected", "Resolved","Working"],
      default: "Pending",
    },
    issue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Correct option for automatically managing createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
