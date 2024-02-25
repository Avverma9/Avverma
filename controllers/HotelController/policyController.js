const hotel =require("../../models/Hotel/hotelModel")
const policy = require("../../models/Hotel/amenitiesModel")
exports.createPolicy = async function(req,res){
    const {hotelId}=req.params
    const {data}=req.body
    const findHotel = await hotel.findById(hotelId)
    if(findHotel.length < 0){
        return res.status(404).json({message:`No any hotel found`})
    }
    const created= await policy.create({hotelId,data})
    res.json(created)
}
