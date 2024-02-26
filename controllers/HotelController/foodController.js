const foods = require("../../models/Hotel/foodsModel");
const hotel = require("../../models/Hotel/hotelModel");

const createFood = async function (req, res) {
  try {
    // Extract other fields from the request body
    const { hotelId, name, foodType, about, price } = req.body;

    // Extract image data from the uploaded files
    const images = req.files.map((file) =>file.location);

    // Create a new food item with the extracted data
    const newFood = await foods.create({
      hotelId,
      name,
      foodType,
      images,
      about,
      price,
    });
   res.status(201).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
