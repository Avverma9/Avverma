const UserCoupon = require("../../models/userCoupon/userCoupon");
const cron = require("node-cron");
const moment = require("moment-timezone");
const hotelModel = require('../../models/hotel/basicDetails')

const newCoupon = async (req, res) => {
    try {
        const { couponName, discountPrice, validity, quantity } = req.body;
        const createdCoupon = await UserCoupon.create({
            couponName,
            discountPrice,
            validity,
            quantity
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

        const coupon = await UserCoupon.findOne({ couponCode });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon code not found" });
        }

        // Check if the coupon has already been used by this user
        if ((coupon.userIds || []).includes(userIds)) {
            return res.status(400).json({ message: "Coupon already used by this user" });
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

        coupon.userIds = [...new Set([...(coupon.userIds || []), userIds])];
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


const deleteCouponAutomatically = async () => {
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
    await deleteCouponAutomatically();
});






const GetAllCoupons = async (req, res) => {
    try {
        // Get the current date in IST timezone
        const currentDate = new Date();
        const currentDateIST = currentDate.getTime() + 5.5 * 60 * 60 * 1000; // Convert to IST
        const coupons = await UserCoupon
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

module.exports = {
    GetAllCoupons,
    ApplyCoupon,
    newCoupon
}