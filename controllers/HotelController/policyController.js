const Hotel = require("../../models/Hotel/hotelModel"); // Corrected the import
const Policy = require("../../models/Hotel/policyModel"); // Corrected the import

exports.createPolicy = async function (req, res) {
  try {
    const hotelId = req.body.hotelId;
    const {
      hotelsPolicy,
      outsideFoodPolicy,
      cancellationPolicy,
      paymentMode,
      petsAllowed,
      bachelorAllowed,
      smokingAllowed,
      alcoholAllowed,
      unmarriedCouplesAllowed,
      internationalGuestAllowed,
      returnPolicy,
      onDoubleSharing,
      onQuadSharing,
      onBulkBooking,
      onTrippleSharing,
      onMoreThanFour,
      offDoubleSharing,
      offQuadSharing,
      offBulkBooking,
      offTrippleSharing,
      offMoreThanFour,
      onDoubleSharingAp,
      onQuadSharingAp,
      onBulkBookingAp,
      onTrippleSharingAp,
      onMoreThanFourAp,
      offDoubleSharingAp,
      offQuadSharingAp,
      offBulkBookingAp,
      offTrippleSharingAp,
      offMoreThanFourAp,
      onDoubleSharingMAp,
      onQuadSharingMAp,
      onBulkBookingMAp,
      onTrippleSharingMAp,
      onMoreThanFourMAp,
      offDoubleSharingMAp,
      offQuadSharingMAp,
      offBulkBookingMAp,
      offTrippleSharingMAp,
      offMoreThanFourMAp,
    } = req.body;
    const fetchData = await Hotel.findOne({ hotelId: hotelId });
    if (!fetchData) {
      return res.status(404).json({ message: "Not found" });
    }
    const created = await Policy.create({
      hotelId,
      hotelsPolicy,
      outsideFoodPolicy,
      cancellationPolicy,
      paymentMode,
      petsAllowed,
      bachelorAllowed,
      smokingAllowed,
      alcoholAllowed,
      unmarriedCouplesAllowed,
      internationalGuestAllowed,
      returnPolicy,
      onDoubleSharing,
      onQuadSharing,
      onBulkBooking,
      onTrippleSharing,
      onMoreThanFour,
      offDoubleSharing,
      offQuadSharing,
      offBulkBooking,
      offTrippleSharing,
      offMoreThanFour,
      onDoubleSharingAp,
      onQuadSharingAp,
      onBulkBookingAp,
      onTrippleSharingAp,
      onMoreThanFourAp,
      offDoubleSharingAp,
      offQuadSharingAp,
      offBulkBookingAp,
      offTrippleSharingAp,
      offMoreThanFourAp,
      onDoubleSharingMAp,
      onQuadSharingMAp,
      onBulkBookingMAp,
      onTrippleSharingMAp,
      onMoreThanFourMAp,
      offDoubleSharingMAp,
      offQuadSharingMAp,
      offBulkBookingMAp,
      offTrippleSharingMAp,
      offMoreThanFourMAp,
    });
    res.status(201).json({message:"Created",created});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPolicy = async function (req, res) {
  const { hotelId } = req.params;

  try {
    const getData = await Policy.findOne({ hotelId }); // Changed to findOne
    if (!getData) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json(getData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
