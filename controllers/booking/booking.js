const bookingModel = require("../../models/booking/booking");
const hotelModel = require("../../models/hotel/basicDetails");
const userModel = require("../../models/user");
const month = require("../../models/booking/monthly");
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
      hotelEmail,
      hotelOwnerName,
      destination,
    } = req.body;

    // Fetch user details based on userId
    const user = await userModel.findOne({ userId: userId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate a random bookingId
    const bookingId = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    // Create the booking object
    const booking = new bookingModel({
      bookingId,
      user: {
        userId: user.userId,
        profile: user.images,
        name: user.userName,
        email: user.email,
        mobile: user.mobile,
      },
      hotelId,
      hotelName,
      hotelEmail,
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
const getBookingCounts = async function (req, res) {
  const getCount = await bookingModel.countDocuments({});
  res.json(getCount);
};

const getTotalSell = async function (req, res) {
  try {
    const result = await bookingModel.aggregate([
      {
        $group: {
          _id: null,
          totalSell: { $sum: "$price" },
        },
      },
    ]);

    // Extract the totalSell value from the result
    const totalSell = result.length > 0 ? result[0].totalSell : 0;

    res.status(200).json({ totalSell });
  } catch (error) {
    console.error("Error getting total sell:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const { bookingStatus, userId } = req.query;
    const bookings = await bookingModel.find({
      "user.userId": userId,
      bookingStatus,
    });
    if (bookings.length === 0) {
      return res
        .status(400)
        .json({ message: `Seems you have No ${bookingStatus} booking` });
    }
    res.json(bookings);
  } catch (error) {
    console.error("Error in getAllFilterBookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFilterBookingsByQuery = async (req, res) => {
  try {
    const { bookingStatus, userId, bookingId, hotelEmail, checkInDate } =
      req.query;
    const filter = {};

    // Include userId and bookingStatus filters if provided
    if (userId) {
      filter.userId = userId;
    }
    if (bookingStatus) {
      filter.bookingStatus = bookingStatus;
    }
    if (hotelEmail) {
      filter.hotelEmail = { $regex: hotelEmail, $options: "i" };
    }
    // Include bookingId filter if provided
    if (bookingId) {
      filter.bookingId = bookingId;
    }
    if (checkInDate) {
      filter.checkInDate = checkInDate;
    }
    const bookings = await bookingModel.find(filter);

    if (bookings.length === 0) {
      return res.status(400).json({ message: `No bookings found` });
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
  updateBooking,
  getAllFilterBookings,
  getAll,
  getBookingCounts,
  getTotalSell,
  getAllFilterBookingsByQuery,
};
