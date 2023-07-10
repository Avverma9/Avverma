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

const getOffers = async (req,res)=>{
    try{
        const data = await offersModel.find()
        return res.status(200).json(data)
    }catch(error){
        console.log(error.log);
    }
}
module.exports = { createOffers,getOffers };
