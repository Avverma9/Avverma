const mongoose= require("mongoose")

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotels",
  },
    type:String,
    bedTypes: String,
    price:Number,
})
module.exports= mongoose.model("room",roomSchema)