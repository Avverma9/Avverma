const partnerModel = require("../models/partnerModel");

const createPartner = async (req, res) => {
  try {
    const {
      hotelOwnerName,
      ownerContactDetails,
      receptionContactDetails,
      hotelEmail,
      generalManagerContact,
      salesManagerContact,
      hotelDetails,
      street,
      city,
      state,
      zip,
      landmark,
      starType,
      propertyType,
      amenities,
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
      checkInOut,
      onDoubleSharing,
      onQuadSharing,
      onBulkBooking,
      onTrippleSharing,
      onMoreThanFour,
      offDoubleSharing,
      offQuadSharing,
      offBulkBooking,
      offTrippleSharing,
      offMoreThanFour
    } = req.body;

    const images = req.files.map((file) => file.location);

    const newPartner = {
      hotelOwnerName,
      ownerContactDetails,
      receptionContactDetails,
      hotelEmail,
      generalManagerContact,
      salesManagerContact,
      hotelDetails,
      street,
      city,
      state,
      zip,
      landmark,
      starType,
      propertyType,
      images,
      amenities,
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
      checkInOut,
      onDoubleSharing,
      onQuadSharing,
      onBulkBooking,
      onTrippleSharing,
      onMoreThanFour,
      offDoubleSharing,
      offQuadSharing,
      offBulkBooking,
      offTrippleSharing,
      offMoreThanFour
    };

    const savedPartner = await partnerModel.create(newPartner);

    return res.status(201).send({
      status: true,
      data: savedPartner,
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'An error occurred while creating the partner.' });
  }
};

//=============================================================================================================
const getHotelPartner = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;

    const partner = await partnerModel.findById(partnerId);

    if (!partner) {
      return res.status(404).json({ error: "Hotel partner not found." });
    }

    return res.status(200).json({
      status: true,
      data: partner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving the hotel partner." });
  }
};

module.exports = {
  createPartner,
  getHotelPartner
};
