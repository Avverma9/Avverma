const mongoose = require("mongoose");

const monthPriceSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels",
  },
  monthDate: {
    type: Date,
  },
  monthPrice: Number,
});
module.exports = mongoose.model("monthlyPrice", monthPriceSchema);
