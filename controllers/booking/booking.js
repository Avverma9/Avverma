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
      hotelCity,
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
        hotelCity,
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
    for (const bookedRoom of roomDetails) {
      const { roomId } = bookedRoom;
      await hotelModel.updateOne(
        { hotelId: hotelId, "rooms.roomId": roomId },
        { $inc: { "rooms.$.countRooms": -1 } }
      );
    }
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

//==========================================================getallBookingByID main site bookings list=======================
const getAllFilterBookings = async (req, res) => {
  try {
    const { bookingStatus, userId } = req.query;

    const bookings = await bookingModel
      .find({
        "user.userId": userId,
        bookingStatus,
      })
      .sort({ createdAt: -1 }); // ✅ Correct sort

    if (bookings.length === 0) {
      return res.status(400).json({
        message: `Seems you have no ${bookingStatus} bookings.`,
      });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error in getAllFilterBookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getAllFilterBookingsByQuery = async (req, res) => {
  try {
    const { bookingStatus, userId, bookingId, hotelEmail, date , hotelCity } = req.query;
    const filter = {};

    if (userId) {
      filter["user.userId"] = userId;
    }
    if (bookingStatus) {
      filter.bookingStatus = bookingStatus;
    }
    if (hotelEmail) {
      filter["hotelDetails.hotelEmail"] = { $regex: hotelEmail, $options: "i" };

    }
    if (bookingId) {
      filter.bookingId = bookingId;
    }
    if (hotelCity) {
      filter["hotelDetails.hotelCity"] = { $regex: new RegExp(hotelCity.trim(), "i") };
    }
    
    if (date) {
      const queryDate = new Date(date);
      const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));
    
      filter.$or = [
        { checkInDate: date },
        { checkOutDate: date },
        { createdAt: { $gte: startOfDay, $lte: endOfDay } },
      ];
    }

    const bookings = await bookingModel.find(filter).sort({createdAt: -1});

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
