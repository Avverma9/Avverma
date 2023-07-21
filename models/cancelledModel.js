const mongoose = require('mongoose');

const canceledBookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
  },
  canceledAt: {
    type: Date,
    default: Date.now,
  },
});

const CanceledBooking = mongoose.model('CanceledBooking', canceledBookingSchema);

module.exports = CanceledBooking;
