const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: false,
      unique: true,
    },
    userId: {
      type: String,
      required: false,
    },
    hotelId: {
      type: String,
      required: false,
    },
    user: {
     type:Object,
      required: false,
    },
    hotelName: {
      type: String,
    },
    hotelOwnerName: {
      type: String,
    },
    checkInDate: {
      type: String,
    },
    checkOutDate: {
      type: String,
    },
    checkInTime: {
      type: String,
    },
    checkOutTime: {
      type: String,
    },
    guests: {
      type: Number,
      required: false,
    },
    foodDetails: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    roomDetails: [
      {
        type: { type: String },
        bedTypes: { type: String },
        price: { type: Number },
      },
    ],
    
    numRooms: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    bookingStatus: {
      type: String,
      enum: [
        "Confirmed",
        "Failed",
        "Cancelled",
        "Checked-in",
        "Checked-out",
        "No-Show",
      ],
      default: "success",
    },
    cancellationReason: String,
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
  
  },
  {
    timestamps: {
      currentTime: () => {
        const currentDate = new Date();
        const offset = 330 * 60 * 1000; // 5 hours 30 minutes
        return new Date(currentDate.getTime() + offset);
      },
    },
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
