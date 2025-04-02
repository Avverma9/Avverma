const mongoose = require("mongoose");

// Define the booking schema
const travelBookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
    ref: "Car",
    required: true,
  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
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
    type: String, // Could be user ID or name
  },
  seatType: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const TravelBooking =  mongoose.model("TravelBooking", travelBookingSchema);

module.exports = TravelBooking;
