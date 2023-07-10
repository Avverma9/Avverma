const mongoose = require("mongoose")

offerSchema = new mongoose.Schema({
    images: {
        type: [String],
        required: false,
      },
      hotelName: {
        type: String,
        required: false,
      },
      roomtype: {
        type: String,
        required: false,
      },
      offers : {
        type : String,
        required : false
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
      roomType: {
        type: String,
        required: false,
      },
      localId: {
        type: Boolean,
        default: false,
      },
      maritalStatus: {
        type: String,
        required: false,
      },
      availability: {
        type: String,
        required: false,
      },
      hotelsPolicy: {
        type: String,
        required: false,
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
      collections: {
        type: [String],
        required: false,
      },
      categories: {
        type: [String],
        required: false,
      },
      accommodationType: {
        type: [String],
        required: false,
      },
      checkInFeature: {
        type: Boolean,
      },
})


module.exports = mongoose.model("offer",offerSchema)