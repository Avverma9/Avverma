const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  offers:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Offer",
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


