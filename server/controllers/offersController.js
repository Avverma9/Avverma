const offersModel = require("../models/offersModel");

const createOffers = async (req, res) => {
  try {
    const {
      hotelName,
      description,
      destination,
      price,
      startDate,
      endDate,
      guests,
      numRooms,
      roomType,
      offers,
      localId,
      maritalStatus,
      availability,
      hotelsPolicy,
      moreOptions,
      amenities,
      reviews,
      rating,
      collections,
      categories,
      accommodationType,
      checkInFeature,
    } = req.body;
    const images = req.files.map((file)=>file.location)
    const data = {
        images,
      hotelName,
      description,
      destination,
      price,
      startDate,
      endDate,
      guests,
      numRooms,
      roomType,
      offers,
      localId,
      maritalStatus,
      availability,
      hotelsPolicy,
      moreOptions,
      amenities,
      reviews,
      rating,
      collections,
      categories,
      accommodationType,
      checkInFeature,
    };
    const createData = await offersModel.create(data); 
    return res
      .status(201)
      .json({ message: "successfully created", createData });
  } catch (error) {
    console.log(error.message);
  }
};
//===========get offers by id==============================//
const getOffersById = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await offersModel.findOne({ _id: offerId})
      if (!offer) {
      return res.status(404).json({ error: "Offers not found" });
    }
    res.json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//=========================get all offers=======================//
const getOffers = async (req,res)=>{
    try{
        const offer = await offersModel.find()
        return res.status(200).json(offer)
    }catch(error){
        console.log(error.log);
    }
}

module.exports = { createOffers,getOffers,getOffersById };
