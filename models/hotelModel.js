const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
  images: {
    type: [String],
    default:[],
  },
  hotelName: {
    type: String,
    required: false,
  },
  hotelOwnerName: {
    type: String,
    required: false,
  },
  roomTypes: {
    type: [String],
    default: [],
  },

  description: {
    type: String,
    required: false,
  },
  destination: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  guests: {
    type: String,
    required: false,
  },
  numRooms: {
    type: String,
    required: false,
  },
  localId: {
    type: String,
    default: "Accepted",
  },
  maritalStatus: {
    type: String,
    required: false,
    default: "Unmarried"
  },
  availability: {
    type: String,
    required: false,
  },
  hotelsPolicy: {
    type: String,
    required: false,
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
    default: true
  },
  bedTypes: {
    type: [String],
    default: [],
  },

  starRating: {
    type: [String],
    default: "2",
  },
  propertyType: {
    type: [String],
    default: [],
  },
  contact: {
    type: Number,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  checkInTime:String,
  checkOutTime:String,
  ownerContactDetails: String,
  receptionContactDetails: String,
  hotelEmail: String,
  generalManagerContact: String,
  salesManagerContact: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  landmark: String,
  outsideFoodPolicy: String,
  cancellationPolicy: String,
  paymentMode: String,
  petsAllowed: String,
  bachelorAllowed: String,
  smokingAllowed: String,
  alcoholAllowed: String,
  unmarriedCouplesAllowed: String,
  internationalGuestAllowed: String,
  returnPolicy: String,

  onDoubleSharing: String,
  onQuadSharing: String,
  onBulkBooking: String,
  onTrippleSharing: String,
  onMoreThanFour: String,
  offDoubleSharing: String,
  offQuadSharing: String,
  offBulkBooking: String,
  offTrippleSharing: String,
  offMoreThanFour: String,
});

module.exports = mongoose.model("Hotels", hotelsSchema);
