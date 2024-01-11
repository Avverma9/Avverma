const mongoose = require("mongoose");

const monthPriceSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels",
  },
  monthDate: {
    type: Date,
  },
  monthName: String,
  monthPrice: Number,
});


monthPriceSchema.index({ hotelId: 1 }, { unique: false });

module.exports = mongoose.model("monthlyPrice", monthPriceSchema);
