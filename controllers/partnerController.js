const Partner = require("../models/partnerModel");

const createPartner = async (req, res) => {
  try {
    const {
      hotelownerName,
      ownercontact,
      receptioncontact,
      hotelemail,    
      gmcontact,
      salescontact,
      hotelName,
      hoteladdress,
      hotelstate,   
      zipcode,
      citypartner,
      landmark,
    } = req.body;

    const partner = {
      hotelownerName,
      ownercontact,
      receptioncontact,
      hotelemail,
      gmcontact,
      salescontact,
      hotelName,
      hoteladdress,
      hotelstate,
      zipcode,
      citypartner,
      landmark,
    };
    const partnerData = await partnerModel.create(partner);
    return res.status(201).json({ success: true, partner: partnerData });
  } catch (error) {
    console.error("Something went wrong", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create partner" });
  }
};

///=============================================================================================================
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
