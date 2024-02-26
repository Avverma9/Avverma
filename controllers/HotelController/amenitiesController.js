const amenitiesModel = require("../../models/Hotel/amenitiesModel")
exports.createAmenity = async(req,res)=>{
    const {hotelId} = req.body
    const {amenities}=req.body
    const created=await amenitiesModel.create({hotelId,amenities})
    res.status(201).json(created)
}