const foods = require("../../models/Hotel/foodsModel");
const hotel = require("../../models/Hotel/hotelModel");
const { v4: uuidv4 } = require("uuid");
const createFood = async function (req, res) {
  try {
    const { hotelId, ...foods } = req.body;
    const foodId = uuidv4().substr(0, 8);
    const created = { foodId, hotelId, ...foods };
    await hotel.findOneAndUpdate(
      { hotelId },
      { $push: { foods: created } },
      { new: true }
    );
    res.status(201).json({ message: "You have added amenities", created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFood = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const getData = await foods.find({ hotelId });
    res.json(getData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { hotelId, foodId } = req.params;
    console.log(`Deleting food item with ID: ${foodId} from hotel: ${hotelId}`);

    if (!hotelId || !foodId) {
      return res
        .status(400)
        .json({ message: "hotelId and foodId are required" });
    }

    const updatedHotel = await hotel.findOneAndUpdate(
      { hotelId },
      { $pull: { foods: { foodId } } },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res
      .status(200)
      .json({ message: "Food item deleted successfully", foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { createFood, getFood, deleteFood };
