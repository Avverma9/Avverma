//CREATE COUPON
const couponModel = require("../../models/booking/coupon");
const hotelModel = require("../../models/hotel/basicDetails");
const cron = require("node-cron");
const moment = require("moment-timezone");
const rooms = require("../../models/hotel/rooms");

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
    const { hotelIds, roomIds = [], couponCode } = req.body;

    const coupon = await couponModel.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    const validityDate = new Date(coupon.validity).toISOString().slice(0, 10);
    if (currentDate > validityDate) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    let finalAppliedRoomIds = [];
    let finalAppliedHotelIds = [];

    for (const hotelId of hotelIds) {
      const hotel = await hotelModel.findOne({ hotelId });
      if (!hotel) continue;

      let applicableRooms = [];

      if (roomIds.length > 0) {
        // Filter only user-provided roomIds with isOffer !== true
        applicableRooms = hotel.rooms.filter(
          (room) => roomIds.includes(room.roomId) && room.isOffer !== true
        );
      } else {
        // Get all rooms without offer
        applicableRooms = hotel.rooms.filter((room) => room.isOffer !== true);
      }

      if (applicableRooms.length === 0) continue;

      // Select only the first applicable room for each hotel
      const selectedRoom = applicableRooms[0];
      const newPrice = selectedRoom.price - coupon.discountPrice;

      await hotelModel.findOneAndUpdate(
        { "rooms.roomId": selectedRoom.roomId, hotelId },
        {
          $set: {
            "rooms.$.offerName": coupon.couponName,
            "rooms.$.offerPriceLess": coupon.discountPrice,
            "rooms.$.offerExp": coupon.validity,
            "rooms.$.isOffer": true,
            "rooms.$.price": newPrice,
          },
        }
      );

      finalAppliedRoomIds.push(selectedRoom.roomId);
      finalAppliedHotelIds.push(hotelId);
    }

    if (finalAppliedRoomIds.length === 0) {
      return res.status(400).json({
        message: "Coupon has already been applied to all eligible rooms in the selected hotels",
      });
    }

    // Update coupon document
    coupon.roomId = [...new Set([...(coupon.roomId || []), ...finalAppliedRoomIds])];
    coupon.hotelId = [...new Set([...(coupon.hotelId || []), ...finalAppliedHotelIds])];
    await coupon.save();

    res.status(200).json({
      message: "Coupon applied successfully to one room per eligible hotel.",
      appliedRoomIds: finalAppliedRoomIds,
      appliedHotelIds: finalAppliedHotelIds,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//=============================remove coupon automatically=================================
const checkAndUpdateOffers = async () => {
  try {
    // Find hotels with expired offers
    const expiredOffers = await hotelModel.find({
      "rooms.offerExp": { $lt: new Date() },
    });

    for (const hotel of expiredOffers) {
      // Iterate through each room and update expired offers
      let updatedRooms = hotel.rooms.map((room) => {
        if (room.offerExp && new Date(room.offerExp) < new Date()) {
          // Revert to original price by adding offerPriceLess back
          return {
            ...room,
            isOffer: false,
            expired: false,
            offerPriceLess: 0,
            offerExp: "",
            offerName: "",
            price: room.price + room.offerPriceLess, // Revert to original price
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

cron.schedule("* * * * *", async () => {
  const now = moment().tz("Asia/Kolkata");
  if (now.hour() === 0 && now.minute() === 0) {
    await checkAndUpdateOffers();
  }
});
//GET ALL

const GetAllCoupons = async (req, res) => {
  try {
    // Get the current date in IST timezone
    const currentDateIST = moment().tz("Asia/Kolkata").startOf("day").toDate();

    // Fetch coupons where `roomId` does not exist and validity is greater than or equal to the current date
    const coupons = await couponModel
      .find({
        expired: false, // Ensure expired is false
        validity: { $gte: currentDateIST },
      })
      .sort({ validity: -1 });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const GetValidCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find({
      roomId: { $exists: true },
      expired: false, // Ensure expired is false
    });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  newCoupon,
  ApplyCoupon,
  GetValidCoupons,
  GetAllCoupons,
  checkAndUpdateOffers,

};
