const partnerModel = require("../models/partnerModel");

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

module.exports = {
  createPartner,
};
