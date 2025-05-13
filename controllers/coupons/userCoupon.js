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
    const { hotelId, roomId, couponCode, userId } = req.body;

    // Fetch the coupon using the couponCode
    const coupon = await UserCoupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const currentIST = moment().tz("Asia/Kolkata");
    const couponExpiry = moment(coupon.validity);

    // Check if the coupon is expired or already used
    if (currentIST.isAfter(couponExpiry) || coupon.expired === true) {
      return res.status(400).json({ message: "Coupon code has expired or already used" });
    }

    // Check if the coupon has already been used by the user
    if (coupon.userIds.includes(userId)) {
      return res.status(400).json({ message: "Coupon has already been used by this user" });
    }

    // Find the hotel by hotelId (ensure hotelId is a string in the comparison)
    const hotel = await hotelModel.findOne({ hotelId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Ensure roomId is a string and filter the rooms by the provided roomId
    const selectedRoom = hotel.rooms.find(room => String(room.roomId) === String(roomId));
    if (!selectedRoom) {
      return res.status(404).json({ message: "No matching room found" });
    }

    // Calculate the discount for the selected room
    const originalPrice = selectedRoom.price;
    const discountPrice = coupon.discountPrice;
    const finalPrice = originalPrice - discountPrice;

    const discountDetails = {
      hotelId: hotel.hotelId,
      roomId: selectedRoom.roomId,
      userId,
      originalPrice,
      discountPrice,
      finalPrice,
    };

    // Update the coupon's used details
    coupon.userIds.push(userId); // Add userId to the list of users who used the coupon

    // Since coupon.hotelId and coupon.roomId are single string values, we check and update them
    if (String(coupon.hotelId) !== String(hotelId)) {
      coupon.hotelId = hotelId; // Update the hotelId if it's not the same
    }

    if (String(coupon.roomId) !== String(roomId)) {
      coupon.roomId = roomId; // Update the roomId if it's not the same
    }

    coupon.expired = true; // Mark the coupon as expired
    await coupon.save(); // Save the coupon with the updated details

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
