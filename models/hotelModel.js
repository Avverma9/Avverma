const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
  images: {
    type: [String],
    
  },
  hotelName: {
    type: String,
    required: true,
  },
  hotelOwnerName: {
  type:String,
  required:false
  },
  roomTypes: {
    type: [String],
    default: [],
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
  checkInFeature: {
    type: Boolean,
  },
  bedTypes:{
    type:[String],
    default: [],
  },

  starRating:{
    type:[String],
    default: [],
  },
  propertyType:{
    type:[String],
    default: [],
  },
  contact:{
   type: Number,
  },
});

module.exports = mongoose.model("Hotels", hotelsSchema);