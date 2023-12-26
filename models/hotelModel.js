const mongoose = require("mongoose");
const hotelsSchema = new mongoose.Schema(
  {
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
    roomDetails: [
      {
        images: [String],
        type: {
          type: String,
        },
        bedTypes: {
          type: String,
        },
        price: {
          type: Number,
        },
        originalPrice: {
          type: Number,
        },
        offerDetails: {
          type: String,
          default: "N/A",
        },
        offerPriceLess: {
          default: 0,
          type: Number,
        },
        offerExp: {
          type: Date,
        },
        offerStartDate: {
          type: Date,
          default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD format
        },

        countRooms: {
          type: Number,
          default: 1,
        },
      },
    ],
    foodItems: [
      {
        name: String,
        foodType: String,
        images: [String],
        about: String,
        price: Number,
      },
    ],
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
    guests: {
      type: String,
    },
    numRooms: {
      type: Number,
    },
    localId: {
      type: Boolean,
      default: false,
    },
    maritalStatus: {
      type: String,
    },
    hotelsPolicy: {
      type: String,
    },
    checkInPolicy: String,
    checkOutPolicy: String,
    customerWelcomeNote: String,
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
    starRating: {
      type: String,
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
    categories: [String],
    collections: [String],
    accommodationType: [String],

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
    onDoubleSharingAp: String,
    onQuadSharingAp: String,
    onBulkBookingAp: String,
    onTrippleSharingAp: String,
    onMoreThanFourAp: String,
    offDoubleSharingAp: String,
    offQuadSharingAp: String,
    offBulkBookingAp: String,
    offTrippleSharingAp: String,
    offMoreThanFourAp: String,
    onDoubleSharingMAp: String,
    onQuadSharingMAp: String,
    onBulkBookingMAp: String,
    onTrippleSharingMAp: String,
    onMoreThanFourMAp: String,
    offDoubleSharingMAp: String,
    offQuadSharingMAp: String,
    offBulkBookingMAp: String,
    offTrippleSharingMAp: String,
    offMoreThanFourMAp: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotels", hotelsSchema);
