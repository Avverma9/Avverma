//CREATE COUPON
const couponModel = require("../models/couponModel");
const hotelModel = require("../models/Hotel/hotelModel");
const cron = require("node-cron");
const newCoupon = async (req, res) => {
  try {
    const { couponName, discountPrice, validity } = req.body;
    const createdCoupon = await couponModel.create({
      couponName,
      discountPrice,
      validity,
    });
    res
      .status(201)
      .json({ message: "Coupon code created", coupon: createdCoupon });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//VALIDATE AND APPLY COUPON
const ApplyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.params;
    const { hotelId, roomId } = req.query; // Extract hotelId and roomId from query parameters

    // Check if both hotelId and roomId are provided
    if (!hotelId || !roomId) {
      return res
        .status(400)
        .json({ message: "Both hotelId and roomId are required." });
    }

    // Find the coupon by couponCode
    const coupon = await couponModel.findOne({ couponCode });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    // Check if the coupon has already been used
    if (coupon.roomId) {
      return res.status(400).json({ message: "Coupon already used" });
    }

    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date as YYYY-MM-DD
    const validityDate = new Date(coupon.validity).toISOString().slice(0, 10); // Get the coupon validity date as YYYY-MM-DD
    console.log("Current", currentDate);
    console.log("validity", validityDate);
    // Check if the coupon has expired
    if (currentDate > validityDate) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }
    // Update the offer in the hotel model
    const updatedHotel = await hotelModel.findOneAndUpdate(
      { "rooms.roomId": roomId, hotelId: hotelId }, // Query to find the correct room within the specific hotel
      {
        $set: {
          "rooms.$.offerName": coupon.couponName,
          "rooms.$.offerPriceLess": coupon.discountPrice,
          "rooms.$.offerExp": coupon.validity,
          "rooms.$.isOffer": true,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedHotel) {
      return res
        .status(404)
        .json({ message: "Room or hotel not found or update failed" });
    }

    // Mark the coupon as used by updating the roomId field
    coupon.roomId = roomId; // Use the roomId to mark the coupon as used
    await coupon.save();

    res.status(200).json({
      message: `Your coupon code ${coupon.couponCode} applied successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//=============================remove coupon=================================
const checkAndUpdateOffers = async () => {
  try {
    const expiredOffers = await hotelModel.find({
      "rooms.offerExp": { $lt: new Date() },
    });

    for (const hotel of expiredOffers) {
      // Iterate through each room and update expired offers
      let updatedRooms = hotel.rooms.map((room) => {
        if (room.offerExp && new Date(room.offerExp) < new Date()) {
          return {
            ...room,
            isOffer: false,
            offerPriceLess: 0,
            offerExp: "",
            offerName: "",
          };
        }
        return room;
      });

      // Update the hotel document with the modified rooms array
      hotel.rooms = updatedRooms;
      await hotel.save();
    }

    console.log("Expired offers processed successfully.");
  } catch (error) {
    console.error("Error processing expired offers:", error);
  }
};

// Schedule the function to run every day at midnight
cron.schedule("1 0 * * *", async () => {
  await checkAndUpdateOffers();
});
//GET ALL

const GetAllCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find().sort({ validity: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  newCoupon,
  ApplyCoupon,
  GetAllCoupons,
  checkAndUpdateOffers,
};
