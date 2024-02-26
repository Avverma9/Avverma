const mongoose = require ("mongoose")
const rooms = new mongoose.Schema({
hotelId:String,
          images: [String],
          type: {
            type: String,
          },
          bedTypes: {
            type: String,
          },
          price: {
            type: Number,
          },
          originalPrice: {
            type: Number,
          },
          offerDetails: {
            type: String,
            default: "N/A",
          },
          offerPriceLess: {
            default: 0,
            type: Number,
          },
          offerExp: {
            type: Date,
          },
          offerStartDate: {
            type: Date,
            default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD format
          },
  
          countRooms: {
            type: Number,
            default: 1,
          },
        
})
module.exports=mongoose.model("rooms",rooms)