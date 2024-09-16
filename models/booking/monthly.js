const mongoose = require("mongoose");

const monthlyPriceSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true,
  },
  monthDate: {
    type: String, 
    required: true,
  },
  monthPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("MonthlyPrice", monthlyPriceSchema);
