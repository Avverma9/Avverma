const foods = require("../../models/Hotel/foodsModel");
const hotel = require("../../models/Hotel/hotelModel");

const createFood = async function (req, res) {
  try {
    const { hotelId } = req.body;
    const created = await foods.create({ hotelId, ...req.body });
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
    const getData = await foods.find({hotelId
});
    res.json(getData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { createFood, getFood };
