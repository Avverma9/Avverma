const bookingModel = require('../models/bookingModel');
const CanceledBooking = require('../models/cancelledModel');
const paymentModel = require('../models/paymentModel');
const foodModel= require("../models/foodModel")

const createBooking = async (req, res) => {
  try {
    const { userId, hotelId, foodItems } = req.params;
    let totalFoodPrice=0
    for(const foodItem of foodItems){
      const food= await foodModel.findById(foodItem._id)
      totalFoodPrice += food
    }
    const { checkIn, checkOut, guests,rooms, price, paymentStatus,hotelName,images,destination } = req.body;

    const bookingId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const totalprice = price* rooms
  
    const booking = {
      images,
      bookingId,
      user: userId,
      hotel: hotelId,
      hotelName,
      checkInDate: checkIn, 
      checkOutDate: checkOut, 
      guests,
      rooms,
      price: totalprice,
      destination:destination,
      bookingStatus: paymentStatus === "success" ? "success" : "failed"
    };

    console.log(booking, "bookingggggggggggggggg");

    const savedBooking = await bookingModel.create(booking);
    console.log(savedBooking, "savedBooking");

    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


//============================================================================================

const getConfirmedBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find()
      .populate('user')
      .populate('hotel')
      .exec();

    const confirmedBookings = bookings.map((booking) => ({
      bookingId: booking.bookingId,
      user: {
        name: booking.user?.name,
        email: booking.user?.email
      },
      hotel: {
        hotelName: booking.hotel?.hotelName, 
      },
      guests: booking.guests,
      price: booking.price,
      checkInDate : booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      bookingStatus: booking.bookingStatus,
      hotelimage: booking.images,
      price:booking.price,
      destination:booking.destination
    }));

    console.log(confirmedBookings,"Confirmed Booking............................")

    res.status(200).json({ success: true, bookings: confirmedBookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
  //============================================================================================

  const getFailedBookings = async (req, res) => {
    try {
      const bookings = await bookingModel
        .find({ bookingStatus: "failed" })
        .populate('user')
        .populate('hotel')
        .exec();
  
      const failedBookings = bookings.map((booking) => ({
        bookingId: booking.bookingId,
        user: {
          name: booking.user?.name,
          email: booking.user?.email
        },
        hotel: {
          hotelName: booking.hotel?.hotelName, 
        },
        guests: booking.guests,
        price: booking.price,
        checkInDate : booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        bookingStatus: booking.bookingStatus
      }));
  
      console.log(failedBookings, ".failed booking...........................")
  
      res.status(200).json({ success: true, bookings: failedBookings });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


//==================================================================================

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const cancelledAt = new Date();

    const updatedBooking = await bookingModel.findOneAndUpdate(
      { bookingId },
      { $set: { bookingStatus: 'Cancelled', cancelledAt } },
      { new: true }
    );

    console.log(updatedBooking);

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//===================================================================================

const getCancelledBooking = async (req, res) => {
  try {
    const canceledBookings = await bookingModel
      .find({ bookingStatus: 'Cancelled' })
      .populate('user');

    res.status(200).json({ success: true, canceledBookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//====================================================================================
const getCheckingBooking = async(req,res)=>{
  try {
    const {bookingId} = req.params;
    const booking = await bookingModel.findOne({bookingId}).populate('user');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({success:false, error: error.message})
    
  }
}

//========================================================================
const updateBookingDates = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { checkInDate, checkOutDate } = req.body;

    const booking = await bookingModel.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;

    await booking.save();

    res.status(200).json({ success: true, data:booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports={createBooking,
  getConfirmedBookings,
  getFailedBookings,
   cancelBooking,
    getCancelledBooking,
    getCheckingBooking,
    updateBookingDates,
  }
