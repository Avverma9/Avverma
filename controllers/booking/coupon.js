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
    const currentIST = moment.tz("Asia/Kolkata");
    const formattedIST = currentIST.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    const currentDate = formattedIST.slice(0, -6) + "+00:00";

    const validityDate = coupon.validity;

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
          (room) => roomIds.includes(room.roomId) && room.isOffer !== true,
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
        },
      );

      finalAppliedRoomIds.push(selectedRoom.roomId);
      finalAppliedHotelIds.push(hotelId);
    }

    if (finalAppliedRoomIds.length === 0) {
      return res.status(400).json({
        message:
          "Coupon has already been applied to all eligible rooms in the selected hotels",
      });
    }

    // Update coupon document
    coupon.roomId = [
      ...new Set([...(coupon.roomId || []), ...finalAppliedRoomIds]),
    ];
    coupon.hotelId = [
      ...new Set([...(coupon.hotelId || []), ...finalAppliedHotelIds]),
    ];
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
//===============================delete coupon automatically=================================


const deleteCouponAutomatically = async () => {
  try {
    const currentIST = moment.tz("Asia/Kolkata");
    const formattedIST = currentIST.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const utcFormatted = formattedIST.slice(0, -6) + "+00:00";
    
    const expiredCoupons = await couponModel.find({
      expired: false,
      validity: { $lte: utcFormatted },
    });

    if (expiredCoupons.length > 0) {
      for (const coupon of expiredCoupons) {
        const { hotelId, roomId, discountPrice } = coupon;

        // Loop through each hotel-room pair
        for (let i = 0; i < hotelId.length; i++) {
          const hId = hotelId[i];
          const rId = roomId[i];

          const hotel = await hotelModel.findOne({
            hotelId: hId,
            "rooms.roomId": rId,
          });

          if (!hotel) continue;

          const room = hotel.rooms.find((r) => r.roomId === rId);
          if (!room) continue;

          const updatedPrice = room.price + discountPrice;

          await hotelModel.updateOne(
            { hotelId: hId, "rooms.roomId": rId },
            {
              $set: {
                "rooms.$.isOffer": false,
                "rooms.$.offerName": "",
                "rooms.$.offerPriceLess": 0,
                "rooms.$.offerExp": "",
                "rooms.$.price": updatedPrice,
              },
            },
          );
        }
      }

      // Optionally, mark as expired before deleting
      await couponModel.updateMany(
        { _id: { $in: expiredCoupons.map((c) => c._id) } },
        { $set: { expired: true } },
      );

      const result = await couponModel.deleteMany({
        _id: { $in: expiredCoupons.map((c) => c._id) },
      });

      console.log(`${result.deletedCount} expired coupons deleted.`);
    } else {
      console.log("No expired coupons to delete.");
    }
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
};

cron.schedule("* * * * *", async () => {
  console.log(
    "⏰ Cron started at:",
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  );
  await deleteCouponAutomatically();
  console.log("✅ Cron finished");
});

const GetAllCoupons = async (req, res) => {
  try {
    // Get the current date in IST timezone
    const currentDate = new Date();
    const currentDateIST = currentDate.getTime() + 5.5 * 60 * 60 * 1000; // Convert to IST
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
};
