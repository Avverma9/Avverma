const bookingModel = require('../models/bookingModel');
const CanceledBooking = require('../models/cancelledModel');
const paymentModel = require('../models/paymentModel');
const foodModel = require("../models/foodModel")
const offersModel = require("../models/offersModel")
const hotelModel = require("../models/hotelModel");


//==========================================creating booking========================================================================================================

const createBooking = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;
    const { foodItems } = req.body;
    let totalFoodPrice = 0;
    for (const foodItem of foodItems) {
      const food = await foodModel.findById(foodItem._id);
      totalFoodPrice += food.price;
    }

    const { checkIn, checkOut, guests, rooms, price, paymentStatus, hotelName, images, destination } = req.body;

    const bookingId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const totalprice = price * rooms;
    const foodPrice = totalprice + totalFoodPrice;

    const hotel = await hotelModel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ success: false, error: "Hotel not found" });
    }

    if (rooms > hotel.numRooms) {
      return res.status(400).json({ success: false, error: "No rooms available" });
    }

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
      price: foodPrice,
      destination,
      bookingStatus: paymentStatus === "success" ? "success" : "failed"
    };

    hotel.numRooms -= rooms;
    await hotel.save();

    const savedBooking = await bookingModel.create(booking);

    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//================================creating booking for offer========================================================================//
const createOfferBooking = async (req, res) => {
  try {
    const { userId, offerId } = req.params;
    const { foodItems } = req.body;
    let totalFoodPrice = 0
    for (const foodItem of foodItems) {
      const food = await foodModel.findById(foodItem._id)
      totalFoodPrice += food.price
    }

    const { checkIn, checkOut, guests, rooms, price, paymentStatus, hotelName, images, destination } = req.body;

    const bookingId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const totalprice = price * rooms
    const foodPrice = totalprice + totalFoodPrice

    const booking = {
      images,
      bookingId,
      user: userId,
      offer: offerId,
      hotelName,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      rooms,
      price: foodPrice,
      destination: destination,
      bookingStatus: paymentStatus === "success" ? "success" : "failed"
    };

    // console.log(booking, "bookingggggggggggggggg");

    const savedBooking = await bookingModel.create(booking);
    console.log(savedBooking, "savedBooking");

    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
//================================================================================================================================================

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
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      bookingStatus: booking.bookingStatus,
      hotelimage: booking.images,
      price: booking.price,
      destination: booking.destination
    }));

    console.log(confirmedBookings, "Confirmed Booking............................")

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
      checkInDate: booking.checkInDate,
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
const getCheckingBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingModel.findOne({ bookingId }).populate('user');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })

  }
}

//========================================================================
const updateBooking = async (req, res) => {

  try {
    const { bookingId } = req.params;
    const updatedFields = req.body;

    const booking = await bookingModel.findOneAndUpdate({ bookingId });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

   
    for (const field in updatedFields) {
      if (booking.schema.paths.hasOwnProperty(field)) { 
        booking[field] = updatedFields[field];
      }
    }

    await booking.save();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

};



module.exports = {
  createBooking,
  createOfferBooking,
  getConfirmedBookings,
  getFailedBookings,
  cancelBooking,
  getCancelledBooking,
  getCheckingBooking,
  updateBooking,
}
