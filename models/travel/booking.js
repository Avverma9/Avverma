const mongoose = require("mongoose");

// Utility function to generate 8-character alphanumeric uppercase ID
const generateBookingId = () => {
  return [...Array(8)]
    .map(() => Math.random().toString(36).charAt(2).toUpperCase())
    .join('');
};

const travelBookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: generateBookingId,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  seatPrice: {
    type: Number,
    required: true,
  },
  bookedBy: {
    type: String,
  },
  customerMobile: {
    type: String,
    required: true,
  },
  seatType: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const TravelBooking = mongoose.model("TravelBooking", travelBookingSchema);

module.exports = TravelBooking;
