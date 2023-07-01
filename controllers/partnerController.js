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
      amenities
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
      amenities
    };

    const savedPartner = await partnerModel.create(newPartner);

    return res.status(201).send({
      status: true,
      data: savedPartner,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'An error occurred while creating the partner.' });
  }
};

module.exports = {
  createPartner
};
