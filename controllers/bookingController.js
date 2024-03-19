const bookingModel = require("../models/bookingModel");
const hotelModel = require("../models/Hotel/hotelModel");
const month = require("../models/monthlyPriceModel");
//==========================================creating booking========================================================================================================
const createBooking = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;
    const {
      checkInDate,
      checkOutDate,
      guests,
      numRooms,
      foodDetails,
      roomDetails,
      price,
      hotelName,
      hotelOwnerName,
      destination,
    } = req.body;

    // Check if bookingId already exists (not shown in the code)

    const bookingId = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const booking = new bookingModel({
      bookingId,
      user: userId,
      hotel: hotelId,
      hotelName,
      foodDetails,
      numRooms,
      hotelOwnerName,
      checkInDate,
      checkOutDate,
      guests,
      price,
      destination,
      roomDetails,
    });

    // Save the booking
    const savedBooking = await booking.save();

    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//=============================================================================
const perMonthPrice = async function (req, res) {
  try {
    const { hotelId } = req.params;
    const { checkOutDate } = req.body;
    const allMonthlyData = await month.find({
      hotelId: hotelId,
      monthDate: { $lte: new Date(checkOutDate) },
    });
    if (!allMonthlyData || allMonthlyData.length === 0) {
      return res.status(404).json({
        error: "Hotel not found or no suitable monthly data available",
      });
    }

    const checkOutDateObject = new Date(checkOutDate);

    let closestMonth = null;
    let closestDateDifference = Infinity;

    for (const monthly of allMonthlyData) {
      const dateOfmonth = new Date(monthly.monthDate);
      const dateDifference = Math.abs(checkOutDateObject - dateOfmonth);
      if (dateDifference < closestDateDifference) {
        closestMonth = monthly;
        closestDateDifference = dateDifference;
      }
    }

    // Display the data of the closest month
    res.json({ monthlyPrice: closestMonth.monthPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//================================================================================================================================================

const getConfirmedBookings = async (req, res) => {
  const booking = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("users");
  const confirmedBookings = booking.filter(
    (booking) => booking.bookingStatus === "success"
  ); //dashboard
  res.json(confirmedBookings);
};
//===============================Get all=============================
const getAll = async (req, res) => {
  const booking = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("users");
  res.json(booking);
};
//===================================================================
const getBookingCounts = async function(req,res){
  const getCount = await bookingModel.countDocuments({})
  res.json(getCount)
}

const getTotalSell = async function (req, res) {
  try {
    const result = await bookingModel.aggregate([
      {
        $group: {
          _id: null,
          totalSell: { $sum: '$price' }
        }
      }
    ]);

    // Extract the totalSell value from the result
    const totalSell = result.length > 0 ? result[0].totalSell : 0;

    res.status(200).json({ totalSell });
  } catch (error) {
    console.error('Error getting total sell:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//================================hotel booking API ========================
const getConfirmedBookingsHotel = async (req, res) => {
  const { id } = req.params;
  const booking = await bookingModel.find({ user: id }).sort({ createdAt: -1 }); // hotel
  const details = booking.filter(
    (confirmed) => confirmed.bookingStatus === "success"
  );
  res.json(details);
};
//=================================
const getFailedBookingsHotel = async (req, res) => {
  const { id } = req.params;
  const bookings = await bookingModel
    .find({ user: id })
    .sort({ createdAt: -1 });
  const details = bookings.filter(
    (failed) => failed.bookingStatus === "failed"
  );
  res.json(details);
};

const getCancelledBookingHotel = async (req, res) => {
  const { id } = req.params;
  const booking = await bookingModel.find({ user: id }).sort({ createdAt: -1 });
  const details = booking.filter(
    (failed) => failed.bookingStatus === "cancelled"
  );
  if (!booking)
    res
      .status(404)
      .json({ success: false, message: "No any booking are here" });

  res.json(details);
};
const getCheckedInHotel = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await bookingModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found" });
    }

    const checkedIn = bookings.filter(
      (booking) => booking.bookingStatus === "checkedIn"
    );

    res.json(checkedIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCheckedOutHotel = async (req, res) => {
  const { userId } = req.params;
  const bookings = await bookingModel
    .find({ user: userId })
    .sort({ createdAt: -1 });
  const checkedOut = bookings.filter(
    (checkedOut) => checkedOut.bookingStatus === "checkedOut"
  );
  if (!bookings) {
    res
      .status(404)
      .json({ success: false, message: "No such type of booking here" });
  }
  res.json(checkedOut);
};
//============================================================================================

const getFailedBookings = async (req, res) => {
  const bookings = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user");
  const failedBooking = bookings.filter(
    (booking) => booking.bookingStatus === "failed"
  );
  res.json(failedBooking);
};

const getCancelledBookings = async (req, res) => {
  const bookings = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user");
  const failedBooking = bookings.filter(
    (booking) => booking.bookingStatus === "cancelled"
  );
  res.json(failedBooking);
};

const getNoShowBookings = async (req, res) => {
  const bookings = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user");
  const failedBooking = bookings.filter(
    (booking) => booking.bookingStatus === "noshow"
  );
  res.json(failedBooking);
};

//==================================================================================

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const cancelledAt = new Date();

    const updatedBooking = await bookingModel.findOneAndUpdate(
      { bookingId },
      { $set: { bookingStatus: "cancelled", cancelledAt } },
      { new: true }
    );

    console.log(updatedBooking);

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//===================================================================================

const getCancelledBooking = async (req, res) => {
  const booking = await bookingModel.find().sort({ createdAt: -1 });
  const cancellledBooking = booking.filter(
    (cancelled) => cancelled.bookingStatus === "cancelled"
  );
  if (!booking)
    res
      .status(404)
      .json({ success: false, message: "No any booking are here" });

  res.json(cancellledBooking);
};
//================================================================================
const getCheckedIn = async (req, res) => {
  const booking = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user");
  const checkedIn = booking.filter(
    (checkedIn) => checkedIn.bookingStatus === "checkedIn"
  );
  if (!booking) {
    res.status(404).json({ success: false, message: "No any booking found" });
  }
  res.json(checkedIn);
};
//========================================================================================
const getCheckedOut = async (req, res) => {
  const booking = await bookingModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user");
  const checkedOut = booking.filter(
    (checkedOut) => checkedOut.bookingStatus === "checkedOut"
  );
  if (!booking) {
    res
      .status(404)
      .json({ success: false, message: "No such type of booking here" });
  }
  res.json(checkedOut);
};
//====================================================================================
const getCheckingBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingModel.findOne({ bookingId }).populate("user");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//========================================================================
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const data = req.body;
  const updatedData = await bookingModel.findOneAndUpdate(
    { bookingId: bookingId },
    { $set: data },
    { new: true }
  );
  res.json(updatedData);
};
//==========================================================getallBookingByID=======================
const getAllFilterBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookingStatus } = req.query;
    const filter = { userId, bookingStatus };

    const bookings = await bookingModel.find(filter);
    if (bookings.length === 0) {
      return res
        .status(400)
        .json({ message: `No any ${bookingStatus} bookings found` });
    }
    res.json(bookings);
  } catch (error) {
    console.error("Error in getAllFilterBookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  getCancelledBookings,
  getNoShowBookings,
  getAllFilterBookings,
  perMonthPrice,
  getAll,
  getBookingCounts,
  getTotalSell
};
