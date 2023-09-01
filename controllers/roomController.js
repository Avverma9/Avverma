const roomModel = require("../models/roomModel.js");
const hotelModel = require("../models/hotelModel.js");



const createRoom = async function (req, res) {
  const { id } = req.params;
  const { type, bedTypes, price } = req.body;
  
  try {
    const hotel = await hotelModel.findById(id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const createdRoom = await roomModel.create({
      room: id,
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
}

//============================get all rooms=================================
const getAllRooms = async (req,res)=> {
  const fetchedData= await roomModel.find()
  res.json(fetchedData)
}
const getRoomsById = async (req,res)=>{
  const {id}= req.params
  const fetchedData = await roomModel.findById(id)
  res.json(fetchedData)
}
//===============================get rooms by hotel ID===============================
const getRoomsByHotelId = async(req,res)=> {
  const {id}=req.params
  const fetchedData = await roomModel.findOne({hotel:id})
 
  res.json(fetchedData)
}
//===================================update room price================================
const updateRoom= async(req,res)=>{
  const {id} = req.params
  const {type,bedTypes,price} = req.body
  const UpdatedData= await roomModel.findByIdAndUpdate(id,{type,bedTypes,price},{new : true})
  res.json(UpdatedData)
}
module.exports = { createRoom,getAllRooms,getRoomsByHotelId,updateRoom,getRoomsById};
