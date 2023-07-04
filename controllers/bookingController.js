const bookingModel = require('../models/bookingModel');
const paymentModel = require('../models/paymentModel');


const createBooking = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;
    const { checkIn, checkOut, guests, price } = req.body;

   
    const booking = {
      user: userId,
      hotel: hotelId,
      checkIn,
      checkOut,
      guests,
      price
    };

    const savedBooking = await bookingModel.create(booking);


    res.status(201).json({ success: true, data:savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


//============================================================================================

 const getConfirmedBookings =async (req, res) => {
    try {
      const bookings = await bookingModel.find().populate({
        path: 'payment',
        match: { status: 'confirmed' }
      }).exec();
  
      const confirmedBookings = bookings.filter(booking => booking.payment !== null);
  
      res.status(200).json({ success: true, bookings: confirmedBookings });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  //============================================================================================

const getFailedBookings = async (req, res) => {
    try {
      const failedPaymentIds = await paymentModel.find({ status: 'failed' }).distinct('booking');
  
      const failedBookings = await bookingModel.find({ _id: { $in: failedPaymentIds } }).populate('user hotel');
      
      res.status(200).json({ success: true, bookings: failedBookings });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };



module.exports={createBooking,getConfirmedBookings,getFailedBookings}