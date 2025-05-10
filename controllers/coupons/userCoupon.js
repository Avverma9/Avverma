const UserCoupon = require("../../models/coupons/userCoupon");
const cron = require("node-cron");
const moment = require("moment-timezone");
const hotelModel = require("../../models/hotel/basicDetails");

const newUserCoupon = async (req, res) => {
  try {
    const { couponName, discountPrice, validity, quantity } = req.body;
    const createdCoupon = await UserCoupon.create({
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

const ApplyUserCoupon = async (req, res) => {
  try {
    const { hotelIds = [], roomIds = [], couponCode, userId } = req.body;

    const coupon = await UserCoupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const currentIST = moment().tz("Asia/Kolkata");
    const couponExpiry = moment(coupon.validity);

    if (currentIST.isAfter(couponExpiry) || coupon.expired === true) {
      return res.status(400).json({ message: "Coupon code has expired or already used" });
    }

    if (coupon.userIds.length > 0) {
      return res.status(400).json({ message: "Coupon has already been used" });
    }

    const hotel = await hotelModel.findOne({ hotelId: { $in: hotelIds } });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const selectedRooms = hotel.rooms.filter(room => roomIds.includes(String(room.roomId)));
    if (selectedRooms.length === 0) {
      return res.status(404).json({ message: "No matching rooms found" });
    }

    const discountDetails = selectedRooms.map(room => {
      const originalPrice = room.price;
      const discountPrice = coupon.discountPrice;
      const finalPrice = originalPrice - discountPrice;

      return {
        hotelId: hotel.hotelId,
        roomId: room.roomId,
        userId,
        originalPrice,
        discountPrice,
        finalPrice,
      };
    });

    // Add userId, roomIds, and hotelId to coupon before marking it used
    coupon.userIds.push(userId);

    // Ensure arrays are initialized before pushing
    coupon.roomId = [...new Set([...(coupon.roomId || []), ...selectedRooms.map(r => r.roomId)])];
    coupon.hotelId = [...new Set([...(coupon.hotelId || []), hotel._id.toString()])];

    coupon.expired = true;
    await coupon.save();

    return res.status(200).json(discountDetails);
  } catch (error) {
    console.error("Error applying coupon:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




const deleteUserCouponAutomatically = async () => {
  try {
    const moment = require("moment-timezone");

    const currentIST = moment.tz("Asia/Kolkata");
    const formattedIST = currentIST.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const utcFormatted = formattedIST.slice(0, -6) + "+00:00";

    const result = await UserCoupon.deleteMany({
      expired: false,
      validity: { $lte: utcFormatted },
    });
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
};

cron.schedule("* * * * *", async () => {
  await deleteUserCouponAutomatically();
});

const GetAllUserCoupons = async (req, res) => {
  try {
    // Get the current date in IST timezone
    const currentDate = new Date();
    const currentDateIST = currentDate.getTime() + 5.5 * 60 * 60 * 1000; // Convert to IST
    const coupons = await UserCoupon.find({
      expired: false, // Ensure expired is false
      validity: { $gte: currentDateIST },
    }).sort({ validity: -1 });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  GetAllUserCoupons,
  ApplyUserCoupon,
  newUserCoupon,
};
