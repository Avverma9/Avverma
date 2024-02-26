const mongoose = require("mongoose");
const policy = new mongoose.Schema({
  hotelId: {
    type: String,
    unique: true,
  },
  hotelsPolicy:String,
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
});
module.exports = mongoose.model("policy", policy);
