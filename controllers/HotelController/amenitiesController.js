
const hotels = require("../../models/Hotel/hotelModel");
const foods = require("../../models/Hotel/foodsModel");
const amenities = require("../../models/Hotel/amenitiesModel");
const policies = require("../../models/Hotel/policyModel");
const rooms = require("../../models/Hotel/roomModel");

exports.createAmenity = async(req,res)=>{
  try {
    const { hotelId } = req.body;
    const createdAmenity = await amenities.create({
      hotelId,
     ...req.body
    });
    await hotels.findOneAndUpdate(
      { hotelId },
      { $push: { amenities: createdAmenity } },
      { new: true }
    );
    res.status(201).json(createdAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
exports.getHotelByAmenities = async (req, res) => {
    try {
        const hotelData = await hotelModel.findOne();
        
        if (!hotelData) {
          return res.status(404).json({ message: 'No hotel data found' });
        }
        const hotelId = hotelData.hotelId;
        const foodsData = await foods.findOne({ hotelId });
        const amenitiesData = await amenities.findOne({ hotelId });
        const policiesData = await policies.findOne({ hotelId });
        const roomData = await roomModel.findOne({ hotelId });
    
        // Return the data
        res.json({
          hotel: hotelData,
          foods: foodsData,
          amenities: amenitiesData,
          policies: policiesData,
          room: roomData,
        });
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

  