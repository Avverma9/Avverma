const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  newuserId : {
    type : String ,
    required : true 
  },
  hotelId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  hotelname : {
    type: String,
    required: false,
    default : "N/A"
  },
  city  : {
    type: String,
    required: false,
    default : "N/A"
  },
  checkin: {
    type: Date,
    required: true
  },
  checkout: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: "INR",
  },
  bookingStatus : {
    type : String , 
    require : true , 
    default : "failed" 
  },
  orderId : {
    type : String , 
    require : true , 
  },
  paymentId : {
    type : String , 
    require : true , 
    default : "N/A" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports  = mongoose.model('booking', bookingSchema);
