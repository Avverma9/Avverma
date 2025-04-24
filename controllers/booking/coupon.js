//CREATE COUPON
const couponModel = require("../../models/booking/coupon");
const hotelModel = require("../../models/hotel/basicDetails");
const cron = require("node-cron");
const moment = require("moment-timezone");
const rooms = require("../../models/hotel/rooms");

const newCoupon = async (req, res) => {
  try {
    const { couponName, discountPrice, validity } = req.body;

    const validityDate = new Date(validity);
    const istOffset = 5.5 * 60;
    const utcOffset = validityDate.getTimezoneOffset(); // UTC offset in minutes
    const validityInIST = new Date(
      validityDate.getTime() + (istOffset + utcOffset) * 60 * 1000,
    );
    const createdCoupon = await couponModel.create({
      couponName,
      discountPrice,
      validity: validityInIST,
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
    const { hotelIds, roomIds, couponCode } = req.body;

    const coupon = await couponModel.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date as YYYY-MM-DD
    const validityDate = new Date(coupon.validity).toISOString().slice(0, 10); // Get the coupon validity date as YYYY-MM-DD
    if (currentDate > validityDate) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    // Filter out already used hotelIds and roomIds
    const unusedHotelIds = hotelIds.filter(
      (hotelId) => !coupon.hotelId?.includes(hotelId),
    );
    const unusedRoomIds = roomIds.filter(
      (roomId) => !coupon.roomId?.includes(roomId),
    );

    if (unusedHotelIds.length === 0 && unusedRoomIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Coupon code used in selected hotel create another one" });
    }

    // Apply coupon to unused hotelIds and roomIds
    for (let i = 0; i < unusedRoomIds.length; i++) {
      const roomId = unusedRoomIds[i];
      const hotelId = unusedHotelIds[i];

      const hotel = await hotelModel.findOne({
        "rooms.roomId": roomId,
        hotelId: hotelId,
      });

      if (!hotel) {
        continue; // Skip if the hotel or room is not found
      }

      const room = hotel.rooms.find((r) => r.roomId === roomId);
      if (!room) {
        continue; // Skip if the room is not found
      }

      // Calculate new price
      const newPrice = room.price - coupon.discountPrice;

      // Update the room with new offer details
      await hotelModel.findOneAndUpdate(
        { "rooms.roomId": roomId, hotelId: hotelId },
        {
          $set: {
            "rooms.$.offerName": coupon.couponName,
            "rooms.$.offerPriceLess": coupon.discountPrice,
            "rooms.$.offerExp": coupon.validity,
            "rooms.$.isOffer": true,
            "rooms.$.price": newPrice,
          },
        },
        { new: true }, // Return the updated document
      );
    }

    // Update the coupon with the newly applied IDs
    coupon.roomId = [...new Set([...(coupon.roomId || []), ...unusedRoomIds])]; // Avoid duplicates
    coupon.hotelId = [
      ...new Set([...(coupon.hotelId || []), ...unusedHotelIds]),
    ]; // Avoid duplicates
    await coupon.save();

    res.status(200).json({
      message: `Coupon applied successfully to unused rooms and hotels.`,
      appliedRoomIds: unusedRoomIds,
      appliedHotelIds: unusedHotelIds,
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

cron.schedule("30 18 * * *", async () => {
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
