const UserCoupon = require("../../models/coupons/userCoupon");
const cron = require("node-cron");
const moment = require("moment-timezone");
const hotelModel = require("../../models/hotel/basicDetails");

const newUserCoupon = async (req, res) => {
  try {
    const { couponName, discountPrice, validity } = req.body;
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
    const { hotelIds = [], roomIds = [], couponCode, userIds = [] } = req.body;

    // Basic validation
    if (!couponCode || hotelIds.length === 0 || userIds.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch coupon
    const coupon = await UserCoupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    // Check if any user already used this coupon
    const usedUserIds = (coupon.usages || []).map(usage => usage.userId.toString());
    const alreadyUsed = userIds.filter(userId => usedUserIds.includes(userId.toString()));
    if (alreadyUsed.length > 0) {
      return res.status(400).json({
        message: "One or more users have already used this coupon",
        usedBy: alreadyUsed
      });
    }

    // Check coupon expiration
    const currentIST = moment().tz("Asia/Kolkata");
    const couponExpiry = moment(coupon.validity);
    if (currentIST.isAfter(couponExpiry)) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    // Check coupon usage limit
    const totalUsage = (coupon.usages || []).length;
    if (totalUsage + 1 > coupon.quantity) {
      return res.status(400).json({ message: "Coupon usage limit exceeded" });
    }

    // Apply coupon to eligible rooms
    const discountDetails = [];
    const newUsages = [];

    for (const hotelId of hotelIds) {
      const hotel = await hotelModel.findOne({ hotelId });
      if (!hotel || !Array.isArray(hotel.rooms)) continue;

      const eligibleRooms = hotel.rooms.filter(
        (room) =>
          (roomIds.length === 0 || roomIds.includes(room.roomId)) &&
          room.isOffer !== true
      );

      for (const room of eligibleRooms) {
        const finalPrice = Math.max(0, room.price - coupon.discountPrice);

        discountDetails.push({
          hotelId,
          roomId: room.roomId,
          originalPrice: room.price,
          discountPrice: coupon.discountPrice,
          finalPrice,
        });

        // Add usage for all users
        userIds.forEach(userId => {
          newUsages.push({
            userId,
            hotelId,
            roomId: room.roomId,
          });
        });

        break; // Apply coupon to one room per hotel
      }
    }

    if (discountDetails.length === 0) {
      return res.status(400).json({ message: "No eligible rooms found for discount" });
    }

    // Save coupon usages
    coupon.usages = [...(coupon.usages || []), ...newUsages];
    await coupon.save();

    return res.status(200).json(discountDetails);
  } catch (error) {
    console.error("Error applying coupon:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



const deleteUserCouponAutomatically = async () => {
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
  await deleteUserCouponAutomatically();
});

const GetAllUserCoupons = async (req, res) => {
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
  GetAllUserCoupons,
  ApplyUserCoupon,
  newUserCoupon,
};
