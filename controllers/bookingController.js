const bookingModel = require('../models/bookingModel');
const CanceledBooking = require('../models/cancelledModel');
const paymentModel = require('../models/paymentModel');
const foodModel = require("../models/foodModel")

const hotelModel = require("../models/hotelModel");


//==========================================creating booking========================================================================================================


const createBooking = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;
    const { foodItems } = req.body;
    let totalFoodPrice = 0;
    const foodItemsDetails = [];

    for (const foodItem of foodItems) {
      const food = await foodModel.findById(foodItem._id);

      if (!food) {
       
        return res.status(404).json({ success: false, error: "Food item not found" });
      }

      totalFoodPrice += food.price;

      foodItemsDetails.push({
        name: food.name,
        price: food.price,
      });
    }
    const {
      checkIn,
      checkOut,
      guests,
      rooms,
      price,
      paymentStatus,
      hotelName,
      hotelOwnerName,
      images,
      destination,
    } = req.body;

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

    const booking = new bookingModel({
      bookingId,
      user: userId,
      hotel: hotelId,
      hotelName,
      hotelOwnerName,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      rooms,
      price: foodPrice,
      destination,
      foodItems: foodItemsDetails,
      bookingStatus: paymentStatus === "success" ? "success" : "failed",
      images, // Assuming images is a string
    });

    hotel.numRooms -= rooms;
    await hotel.save();

    const savedBooking = await booking.save();

    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



//================================================================================================================================================

const getConfirmedBookings = async (req, res) => {
  const booking= await bookingModel.find().sort({createdAt: -1})
  const confirmedBookings = booking.filter(booking=>booking.bookingStatus === "success") //dashboard
  res.json(confirmedBookings)
};
//================================hotel booking API ========================
const getConfirmedBookingsHotel = async (req, res) => {
  const {id} = req.params
  const booking= await bookingModel.find({user:id}) // hotel
  const details = booking.filter(confirmed=>confirmed.bookingStatus === "success")
  res.json(details)
};
const getFailedBookingsHotel = async (req, res) => {
  const bookings = await bookingModel.find().sort({createdAt: -1})
  res.json(bookings)
}
const getCancelledBookingHotel = async (req, res) => {
  const booking= await bookingModel.find().sort({createdAt: -1})

  if(!booking)
  res.status(404).json({success: false , message:"No any booking are here"});
  
  res.json(booking)
};
const getCheckedInHotel = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await bookingModel.find({ user: userId }).sort({ createdAt: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ success: false, message: "No bookings found" });
    }

    const checkedIn = bookings.filter(booking => booking.bookingStatus === "checkedIn");

    res.json(checkedIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCheckedOutHotel = async(req,res)=>{
  const { userId } = req.params;
  const bookings = await bookingModel.find({ user: userId }).sort({ createdAt: -1 });
  const checkedOut = bookings.filter(checkedOut=>checkedOut.bookingStatus === "checkedOut")
  if(!bookings){
    res.status(404).json({success: false, message: "No such type of booking here"})
  }
  res.json(checkedOut)
}
//============================================================================================

const getFailedBookings = async (req, res) => {
 const bookings = await bookingModel.find().sort({createdAt: -1})
 const failedBooking= bookings.filter(booking=>booking.bookingStatus === "failed")
 res.json(failedBooking)
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
  const booking= await bookingModel.find().sort({createdAt: -1})
  const cancellledBooking = booking.filter(cancelled=>cancelled.bookingStatus === "cancelled" )
  if(!booking)
  res.status(404).json({success: false , message:"No any booking are here"});
  
  res.json(cancellledBooking)
};
//================================================================================
const getCheckedIn= async(req,res)=>{
  const booking = await bookingModel.find().sort({createdAt: -1})
  const checkedIn = booking.filter(checkedIn=>checkedIn.bookingStatus === "checkedIn")
  if(!booking){
    res.status(404).json({success: false, message: "No any booking found"})
  }
  res.json(checkedIn)
}
//========================================================================================
const getCheckedOut = async(req,res)=>{
  const booking = await bookingModel.find().sort({createdAt: -1})
  const checkedOut = booking.filter(checkedOut=>checkedOut.bookingStatus === "checkedOut")
  if(!booking){
    res.status(404).json({success: false, message: "No such type of booking here"})
  }
  res.json(checkedOut)
}
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
const {bookingId} = req.params
const data = req.body
const updatedData = await bookingModel.findOneAndUpdate({bookingId:bookingId}, {$set:data},{new:true})
res.json(updatedData)
};




module.exports = {
  createBooking,
  getConfirmedBookings,
  getFailedBookings,
  getConfirmedBookingsHotel,
  getFailedBookingsHotel,
  getCancelledBookingHotel,
  getCheckedInHotel,
  getCheckedOutHotel,
  cancelBooking,
  getCheckedIn,
  getCheckedOut,
  getCancelledBooking,
  getCheckingBooking,
  updateBooking,
}
