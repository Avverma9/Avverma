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
      default:generateHotelId
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

    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    numRooms: {
      type: Number,
    },
  
    reviews: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
    },
    starRating: {
      type: String,
      default: "2",
    },
    propertyType: String,
    contact: {
      type: Number,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    localId: {
      type: String,
      default: "Not Accepted",
    },
    hotelEmail:String,
    generalManagerContact:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotels", hotelsSchema);
