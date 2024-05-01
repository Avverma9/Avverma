const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotelId: {
    type:String,
  },
  userId: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: true
  },
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model('Review', reviewSchema);


