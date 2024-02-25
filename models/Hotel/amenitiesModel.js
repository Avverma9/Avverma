const mongoose = require("mongoose")
const amenities = new mongoose.Schema({
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotels",
        required:true
    },
    amenities:[String]
})
module.exports=mongoose.model("amenities",amenities)