const mongoose = require("mongoose");
const monthPriceSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels.roomDetails",
    unique: true,
  },
  hotelId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"hotels",
    unique:true,
  },
  monthDate: {
    type: Date,
  },
  monthPrice: Number,
});
module.exports = mongoose.model("monthlyPrice", monthPriceSchema);
