const bookingModel = require("../../models/booking/booking");
const hotelModel = require("../../models/hotel/basicDetails");
const userModel = require("../../models/user");
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
      pm,
      bookingSource,
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
      1000000000 + Math.random() * 9000000000,
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

      hotelDetails: {
        hotelId,
        hotelName,
        hotelEmail,
        hotelOwnerName,
        destination,
      },
      foodDetails,
      numRooms,
      checkInDate,
      checkOutDate,
      guests,
      price,
      pm,
      bookingSource,
      destination,
      roomDetails,
    });

    // Save the booking
    const savedBooking = await booking.save();
    await hotelModel.findOneAndUpdate(
      { hotelId: hotelId },
      { $inc: { "rooms.$[].countRooms": -numRooms } },
      { new: true },
    );
    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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

  try {
    const updatedData = await bookingModel.findOneAndUpdate(
      { bookingId: bookingId },
      { $set: data },
      { new: true },
    );
    if (updatedData && updatedData.bookingStatus === "Cancelled") {
      const roomId = updatedData?.roomDetails[0]?.roomId; // Extract roomId from the booking

      const findHotel = await hotelModel.findOne({
        hotelId: updatedData.hotelDetails.hotelId,
      });
      if (findHotel) {
        const roomIndex = findHotel.rooms.findIndex(
          (room) => room.roomId === roomId,
        );

        if (roomIndex !== -1) {
          findHotel.rooms[roomIndex].countRooms += 1;
          findHotel.markModified(`rooms.${roomIndex}.countRooms`); // 👈 tell Mongoose this field was changed
          await findHotel.save();
        }
        
      }
    }
    res.json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
    const { bookingStatus, userId, bookingId, hotelEmail, date } = req.query;
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

    // Include date filters if provided
    if (date) {
      // Create a date object for the provided date string
      const queryDate = new Date(date);

      // Calculate the start and end of the day for the date
      const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

      // Match for checkInDate, checkOutDate, and createdAt
      filter.$or = [
        { checkInDate: date }, // Exact match for checkInDate string
        { checkOutDate: date }, // Exact match for checkOutDate string
        { createdAt: { $gte: startOfDay, $lte: endOfDay } }, // CreatedAt range for the entire day
      ];
    }

    const bookings = await bookingModel.find(filter);

    if (bookings.length === 0) {
      return res.status(400).json({ message: "No bookings found" });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error in getAllFilterBookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getAllFilterBookings,
  getBookingCounts,
  getTotalSell,
  getAllFilterBookingsByQuery,
};
