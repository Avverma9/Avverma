//CREATE COUPON
const couponModel = require('../../models/booking/coupon');
const hotelModel = require('../../models/hotel/basicDetails');
const cron = require('node-cron');
const moment = require('moment-timezone');
const rooms = require('../../models/hotel/rooms');

const newCoupon = async (req, res) => {
  try {
      const { couponName, discountPrice, validity } = req.body;

      // Parse the validity in UTC and convert to IST (+5:30)
      const validityDate = new Date(validity);
      const istOffset = 5.5 * 60; // IST offset in minutes
      const utcOffset = validityDate.getTimezoneOffset(); // UTC offset in minutes
      const validityInIST = new Date(validityDate.getTime() + (istOffset + utcOffset) * 60 * 1000);

      // Create the coupon with the IST validity
      const createdCoupon = await couponModel.create({
          couponName,
          discountPrice,
          validity: validityInIST,
      });

      res.status(201).json({ message: 'Coupon code created', coupon: createdCoupon });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};


//VALIDATE AND APPLY COUPON
const ApplyCoupon = async (req, res) => {
    try {
        const { hotelId, roomId, couponCode } = req.query;

        // Check if both hotelId and roomId are provided
        if (!hotelId || !roomId) {
            return res.status(400).json({ message: 'Both hotelId and roomId are required.' });
        }

        // Find the coupon by couponCode
        const coupon = await couponModel.findOne({ couponCode });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon code not found' });
        }

        // Check if the coupon has already been used
        if (coupon.roomId) {
            return res.status(400).json({ message: 'Coupon already used' });
        }

        const currentDate = new Date().toISOString().slice(0, 10); // Get the current date as YYYY-MM-DD
        const validityDate = new Date(coupon.validity).toISOString().slice(0, 10); // Get the coupon validity date as YYYY-MM-DD
        if (currentDate > validityDate) {
            return res.status(400).json({ message: 'Coupon code has expired' });
        }

        // Retrieve the current room details
        const hotel = await hotelModel.findOne({
            'rooms.roomId': roomId,
            hotelId: hotelId,
        });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const room = hotel.rooms.find((r) => r.roomId === roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Calculate new price
        const newPrice = room.price - coupon.discountPrice;

        // Update the room with new offer details
        const updatedHotel = await hotelModel.findOneAndUpdate(
            { 'rooms.roomId': roomId, hotelId: hotelId },
            {
                $set: {
                    'rooms.$.offerName': coupon.couponName,
                    'rooms.$.offerPriceLess': coupon.discountPrice,
                    'rooms.$.offerExp': coupon.validity,
                    'rooms.$.isOffer': true,
                    'rooms.$.price': newPrice,
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedHotel) {
            return res.status(404).json({ message: 'Room or hotel not found or update failed' });
        }

        // Mark the coupon as used by updating the roomId field
        coupon.roomId = roomId; // Use the roomId to mark the coupon as used
        coupon.hotelId = hotelId;
        await coupon.save();

        res.status(200).json({
            message: `Your coupon code ${coupon.couponCode} applied successfully`,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//=============================remove coupon=================================
const checkAndUpdateOffers = async () => {
    try {
        // Find hotels with expired offers
        const expiredOffers = await hotelModel.find({
            'rooms.offerExp': { $lt: new Date() },
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
                        offerExp: '',
                        offerName: '',
                        price: room.price + room.offerPriceLess, // Revert to original price
                    };
                }
                return room;
            });

            // Update the hotel document with the modified rooms array
            hotel.rooms = updatedRooms;
            await hotel.save();
        }

        console.log('Expired offers processed successfully.');
    } catch (error) {
        console.error('Error processing expired offers:', error);
    }
};

cron.schedule('30 18 * * *', async () => {
    const now = moment().tz('Asia/Kolkata');
    if (now.hour() === 0 && now.minute() === 0) {
        await checkAndUpdateOffers();
    }
});
//GET ALL

const GetAllCoupons = async (req, res) => {
    try {
        // Get the current date in IST timezone
        const currentDateIST = moment().tz('Asia/Kolkata').startOf('day').toDate();

        // Fetch coupons where `roomId` does not exist and validity is greater than or equal to the current date
        const coupons = await couponModel
            .find({
                roomId: { $exists: false },
                validity: { $gte: currentDateIST },
            })
            .sort({ validity: -1 });

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const removeCoupon = async (req, res) => {
    const { roomId } = req.body;

    if (!roomId) {
        return res.status(400).json({ message: 'roomId is required.' });
    }

    try {
        // Find the hotel and room that needs to be updated
        const hotel = await hotelModel.findOne({
            'rooms.roomId': roomId,
        });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel or room not found.' });
        }

        // Update the room to revert offer details
        const updatedHotel = await hotelModel.findOneAndUpdate(
            { 'rooms.roomId': roomId },
            {
                $set: {
                    'rooms.$.isOffer': false,
                    'rooms.$.offerPriceLess': 0,
                    'rooms.$.offerExp': '',
                    'rooms.$.offerName': '',
                    'rooms.$.price':
                        hotel.rooms.find((r) => r.roomId === roomId).price + hotel.rooms.find((r) => r.roomId === roomId).offerPriceLess, // Revert to original price
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedHotel) {
            return res.status(404).json({ message: 'Update failed.' });
        }

        // Find and update the coupon to set expired to true
        const couponUpdate = await couponModel.findOneAndUpdate(
            { roomId: roomId, expired: false }, // Ensure we are updating the correct coupon
            { $set: { expired: true } },
            { new: true } // Return the updated coupon
        );

        if (!couponUpdate) {
            return res.status(404).json({ message: 'Coupon not found or already expired.' });
        }

        res.status(200).json({ message: 'Coupon removed successfully.' });
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
    removeCoupon, // Ensure to export the removeCoupon function
};
