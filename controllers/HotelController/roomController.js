const roomModel = require("../../models/Hotel/roomModel");
const hotelModel = require("../../models/Hotel/hotelModel");

exports.createRooms = async (req, res) => {
  try {
    const { hotelId, bedTypes, type, price, countRooms } = req.body;
    const fetchHotel = await hotelModel.findOne({ hotelId: hotelId });

    if (!fetchHotel) {
      return res.status(404).json({ message: "Not found 404" });
    }

    const images = req.files.map((file) => file.location);

    const created = await roomModel.create({
      hotelId,
      bedTypes,
      type,
      price,
      images,
      countRooms,
    });

    // Update the numRooms field in the hotelModel
    const updatedHotel = await hotelModel.findOneAndUpdate(
      { hotelId: hotelId },
      { $inc: { numRooms: countRooms } },
      { new: true }
    );

    res.status(201).json({ message: "Created", created, updatedHotel });
  } catch (error) {
    console.error("Error creating rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
