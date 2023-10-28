const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
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
    hotelName: {
      type: String,
    },
    hotelOwnerName: {
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
      enum: [
        "success",
        "failed",
        "cancelled",
        "checkedIn",
        "checkedOut",
        "noshow",
      ],
      default: "success",
    },
    cancellationReason:String,
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
