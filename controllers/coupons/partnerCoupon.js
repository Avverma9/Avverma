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
    const { hotelIds = [], roomIds = [], couponCode, userIds = [] } = req.body;

    const coupon = await PartnerCoupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    // Check expiration
    const currentIST = moment.tz("Asia/Kolkata");
    const isExpiredByDate = currentIST.isAfter(moment(coupon.validity));
    const isManuallyExpired = coupon.expired === true;

    if (isExpiredByDate || isManuallyExpired) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    // Check usage limit
    const totalUsage = coupon.userIds.length;
    const remainingUses = coupon.quantity - totalUsage;

    if (remainingUses <= 0) {
      return res.status(400).json({ message: "Coupon usage limit exceeded" });
    }

    // Check if we're exceeding remaining quantity
    if (userIds.length > remainingUses) {
      return res.status(400).json({ message: `Only ${remainingUses} use(s) remaining for this coupon` });
    }

    let discountDetails = [];
    let usedRoomIds = [];
    let usedHotelIds = [];

    for (const hotelId of hotelIds) {
      const hotel = await hotelModel.findOne({ hotelId });
      if (!hotel) continue;

      let applicableRooms = roomIds.length > 0
        ? hotel.rooms.filter(room => roomIds.includes(room.roomId) && room.isOffer !== true)
        : hotel.rooms.filter(room => room.isOffer !== true);

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

      usedRoomIds.push(selectedRoom.roomId);
      usedHotelIds.push(hotelId);
    }

    if (discountDetails.length === 0) {
      return res.status(400).json({ message: "No eligible rooms found for discount" });
    }

    // Append user IDs (allow reuse, just track usage)
    coupon.userIds = [...coupon.userIds, ...userIds];

    // Update related room and hotel IDs (no duplicates)
    coupon.roomId = [...new Set([...(coupon.roomId || []), ...usedRoomIds])];
    coupon.hotelId = [...new Set([...(coupon.hotelId || []), ...usedHotelIds])];

    await coupon.save();

    return res.status(200).json(discountDetails);
  } catch (error) {
    console.error("ApplyCoupon error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


const deletePartnerCouponAutomatically = async () => {
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
  await deletePartnerCouponAutomatically();
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
