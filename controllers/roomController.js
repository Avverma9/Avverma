const roomModel = require("../models/roomModel.js");
const hotelModel = require("../models/hotelModel.js");
const createRoom = async function (req, res) {
  const { hotelId } = req.params;
  const { type, bedTypes, price } = req.body;

  try {
    const hotel = await hotelModel.findOne({ hotel: hotelId });
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    const createdRoom = await roomModel.create({
      hotel: hotelId,
      type,
      bedTypes,
      price,
    });
    createdRoom.hotel = hotel;
    hotel.roomDetails.push({
      type,
      bedTypes,
      price,
    });
    hotel.numRooms += 1;
    await Promise.all([createdRoom.save(), hotel.save()]);
    res.json(createdRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRoom };
