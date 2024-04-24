const mongoose = require("mongoose");
const generateHotelId = () => {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const hotelsSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      unique: true,
      default: generateHotelId,
    },
    images: {
      type: [String],
    },
    hotelName: {
      type: String,
    },
    description: String,
    hotelOwnerName: {
      type: String,
    },
    destination: {
      type: String,
    },
    price: {
      type: Number,
    },
    isOffer: {
      type: Boolean,
      default: false,
    },
    state: String,
    city: String,
    landmark: String,
    pinCode: Number,
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    rating: {
      type: Number,
    },
    starRating: {
      type: String,
      default: "2",
    },
    propertyType: [String],
    contact: {
      type: Number,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },

    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],

    foods: {
      type: [{}],
      ref: "foods",
    },

    amenities: {
      type: [{}],
      ref: "amenities",
    },

    policies: {
      type: [{}],
      ref: "policies",
    },
    localId: String,
    hotelEmail: String,
    generalManagerContact: String,
    salesManagerContact: String,
    customerWelcomeNote: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("hotels", hotelsSchema);
