const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: false,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotels",
    required: false,
  },
  offers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: false,
  },
  hotelName: {
    type: String,
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  checkInTime: {
    type: Date,
  },
  checkOutTime: {
    type: Date,
  },
  guests: {
    type: Number,
    required: false,
  },
  rooms: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  bookingStatus: {
    type: String,
    enum: ["success", "failed", "cancelled"],
    default: "success",
  },
  cardDetails: {
    type: String,
    default: null,
  },
  upiId: {
    type: String,
    default: null,
  },
  images: {
    type: String,
  },
  destination: {
    type: String,
  },
  cancelledAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  foodItems: [
    {
      name: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Booking", bookingSchema);
