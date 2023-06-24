const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  guests: {
    type: String,
    required: true,
  },
  numRooms: {
    type: String,
    required: true,
  },
  localId: {
    type: Boolean,
    default: false,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  hotelsPolicy: {
    type: String,
    required: true,
  },
  moreOptions: {
    type: [String],
    default: [],
  },
  amenities: {
    type: [String],
    default: [],
  },
  reviews: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Hotels", hotelsSchema);
