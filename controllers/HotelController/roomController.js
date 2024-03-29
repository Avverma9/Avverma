const roomModel = require("../../models/Hotel/roomModel");
const hotelModel = require("../../models/Hotel/hotelModel");

exports.createRooms = async (req, res) => {
  try {
    const { hotelId } = req.body;

    const images = req.files.map((file) => file.location);

    // Check if the hotel exists
    const existingHotel = await hotelModel.findOne({ hotelId });
    if (!existingHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Create the room
    const createdRoom = await roomModel.create({
      hotelId,
      images,
      ...req.body,
    });

    // Update the hotel with the created room
    const updatedHotel = await hotelModel.findOneAndUpdate(
      { hotelId },
      { $push: { rooms: createdRoom } },
      { new: true }
    );

    res.status(201).json({ message: "Created", createdRoom, updatedHotel });
  } catch (error) {
    console.error("Error creating rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getRoomsByHotelId = async (req,res)=>{
  const {hotelId} = req.query
  const getData = await roomModel.find({hotelId:hotelId})
  res.json(getData)
}