const PartnerCoupon = require("../../models/coupons/partnerCoupon");
const cron = require("node-cron");
const moment = require("moment-timezone");
const hotelModel = require("../../models/hotel/basicDetails");

const newCoupon = async (req, res) => {
  try {
    const { couponName, discountPrice, validity, quantity } = req.body;
    const createdCoupon = await PartnerCoupon.create({
      couponName,
      discountPrice,
      validity,
      quantity,
    });

    res
      .status(201)
      .json({ message: "Coupon code created", coupon: createdCoupon });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const ApplyCoupon = async (req, res) => {
  try {
    const { hotelIds, roomIds = [], couponCode, userIds } = req.body;

    const coupon = await PartnerCoupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    const currentIST = moment.tz("Asia/Kolkata");
    const formattedIST = currentIST.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const currentDate = formattedIST.slice(0, -6) + "+00:00";

    if (currentDate > coupon.validity) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    let discountDetails = [];
    let allRoomIds = [];
    let allHotelIds = [];

    for (const hotelId of hotelIds) {
      const hotel = await hotelModel.findOne({ hotelId });
      if (!hotel) continue;

      let applicableRooms = [];

      if (roomIds.length > 0) {
        applicableRooms = hotel.rooms.filter(
          (room) => roomIds.includes(room.roomId) && room.isOffer !== true,
        );
      } else {
        applicableRooms = hotel.rooms.filter((room) => room.isOffer !== true);
      }

      if (applicableRooms.length === 0) continue;

      const selectedRoom = applicableRooms[0];
      const discountedPrice = selectedRoom.price - coupon.discountPrice;

      discountDetails.push({
        hotelId,
        roomId: selectedRoom.roomId,
        originalPrice: selectedRoom.price,
        discountPrice: coupon.discountPrice,
        finalPrice: discountedPrice,
      });

      allRoomIds.push(selectedRoom.roomId);
      allHotelIds.push(hotelId);
    }

    if (discountDetails.length === 0) {
      return res
        .status(400)
        .json({ message: "No eligible rooms found for discount" });
    }

    // ✅ Update coupon fields
    coupon.userIds = [...new Set([...(coupon.userIds || []), userIds])]; // unique
    coupon.roomId = [...(coupon.roomId || []), ...allRoomIds]; // duplicates allowed
    coupon.hotelId = [...(coupon.hotelId || []), ...allHotelIds]; // duplicates allowed
    await coupon.save();

    return res.status(200).json(discountDetails);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCouponAutomatically = async () => {
  try {
    const moment = require("moment-timezone");

    const currentIST = moment.tz("Asia/Kolkata");
    const formattedIST = currentIST.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const utcFormatted = formattedIST.slice(0, -6) + "+00:00";

    const result = await PartnerCoupon.deleteMany({
      expired: false,
      validity: { $lte: utcFormatted },
    });
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
};

cron.schedule("* * * * *", async () => {
  await deleteCouponAutomatically();
});

const GetAllCoupons = async (req, res) => {
  try {
    // Get the current date in IST timezone
    const currentDate = new Date();
    const currentDateIST = currentDate.getTime() + 5.5 * 60 * 60 * 1000; // Convert to IST
    const coupons = await PartnerCoupon.find({
      expired: false, // Ensure expired is false
      validity: { $gte: currentDateIST },
    }).sort({ validity: -1 });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  GetAllCoupons,
  ApplyCoupon,
  newCoupon,
};
