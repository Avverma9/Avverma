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
    const { hotelIds, roomIds = [], couponCode, userIds } = req.body;

    const coupon = await UserCoupon.findOne({ couponCode });
    if (!coupon) return res.status(404).json({ message: "Coupon code not found" });

    const alreadyUsedByUser = (coupon.usages || []).some(
      (usage) => usage.userId === userIds
    );
    if (alreadyUsedByUser) {
      return res.status(400).json({ message: "Coupon already used by you" });
    }

    const currentIST = moment.tz("Asia/Kolkata");
    const currentDate = currentIST.format("YYYY-MM-DDTHH:mm:ssZ");
    if (currentDate > coupon.validity) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    let discountDetails = [];
    let newUsages = [];

    for (const hotelId of hotelIds) {
      const hotel = await hotelModel.findOne({ hotelId });
      if (!hotel) continue;

      const applicableRooms = hotel.rooms.filter(
        (room) =>
          (roomIds.length === 0 || roomIds.includes(room.roomId)) &&
          room.isOffer !== true
      );

      for (const room of applicableRooms) {
        const discountedPrice = room.price - coupon.discountPrice;

        discountDetails.push({
          hotelId,
          roomId: room.roomId,
          originalPrice: room.price,
          discountPrice: coupon.discountPrice,
          finalPrice: discountedPrice,
        });

        newUsages.push({
          userId: userIds,
          hotelId,
          roomId: room.roomId,
        });

        break;
      }
    }

    if (discountDetails.length === 0) {
      return res.status(400).json({ message: "No eligible rooms found for discount" });
    }

    coupon.usages = [...(coupon.usages || []), ...newUsages];
    await coupon.save();

    res.status(200).json(discountDetails);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
  await deleteCouponAutomatically();
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
