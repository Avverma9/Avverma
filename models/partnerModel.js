const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  hotelOwnerName: String,
  ownerContactDetails: String,
  receptionContactDetails: String,
  hotelEmail: String,
  generalManagerContact: String,
  salesManagerContact: String,
  hotelDetails: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  landmark: String,
  starType: String,
  propertyType: String,
  images: [String],
  amenities: {
    "Free Wireless Internet": Boolean,
    "Air Conditioning": Boolean,
    "Room Services": Boolean,
    "Clean And Disinfect": Boolean,
    "School Diatacing": Boolean,
    "Free Parking": Boolean,
    "House Keeping": Boolean,
    "Towels": Boolean, 
    "Complimentary Tolietries": Boolean,
    "Good Showers": Boolean,
    "Cable Tv": Boolean,
    "Bottled Water": Boolean,
    "Swimming Pool": Boolean,
    "On-site Restaurant": Boolean,
    "Hair Dryer": Boolean,
    "Fitness Center": Boolean,
    "Conclerge Desk": Boolean,
    "Spa": Boolean,
    "Dry Cleaning": Boolean,
    "Bathrobe": Boolean,
    "24 Hour Front Desk Service": Boolean
  }
});


module.exports =mongoose.model('Partner', PartnerSchema);
