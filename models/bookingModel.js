const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotels',
    required: true,
  },
  hotelName:{
    type: String
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  guests: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ['success', 'failed','pending'],
    default: 'success',
  },
  cardDetails: {
    type: String,
    default: null,
  },
  upiId: {
    type: String,
    default: null,
  },
  images:{
   type:String
  },
  destination:{
    type:String
  },
  cancelledAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Booking', bookingSchema);
