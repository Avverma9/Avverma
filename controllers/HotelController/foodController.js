const foods = require("../../models/Hotel/foodsModel");
const hotel = require("../../models/Hotel/hotelModel");

const createFood = async function (req, res) {
  try {
    const { hotelId } = req.params;
    const data = req.body;
    const images = req.files.map((file) => file.location);

    // Retrieve the hotel document
    const hotelDoc = await hotel.findById(hotelId);

    // Check if the hotel exists
    if (!hotelDoc) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // Create a new food item associated with the hotel
    const created = await foods.create({ hotel: hotelDoc._id, ...data, images });

    return res.json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getFood = async (req,res)=>{
    try {
           const {hotelId}=req.params
    const getData = await foods.findById(hotelId)
    res.json(getData)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
 
}
module.exports = {createFood,getFood}
