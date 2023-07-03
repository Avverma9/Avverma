const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  insurance: {
    type: Boolean,
    default: false,
  },
  open: {
    type: Boolean,
    default: true,
  },
  countdown: {
    type:Date,
    required: true, 
  },
  motorcycles: {
    type: Number,
    required: true,
  },
  cars: {
    type: Number,
    required: true,
  },
});


module.exports= mongoose.model('Auction', auctionSchema);


