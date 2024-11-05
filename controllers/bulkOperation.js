const hotelModel = require('../models/hotel/basicDetails');
const couponModel = require('../models/booking/coupon');

exports.removeCoupon = async (req, res) => {
    const { hotelIds } = req.body; // Expecting hotelId

    if (!hotelIds) {
        return res.status(400).json({ message: 'hotelId is required.' });
    }

    try {
        // Find the hotel that needs to be updated
        const hotel = await hotelModel.findOne({ hotelId: hotelIds });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        // Prepare updates for all rooms in the hotel
        const bulkUpdates = hotel.rooms.map((room) => ({
            updateOne: {
                filter: { hotelId: hotelIds, 'rooms.roomId': room.roomId },
                update: {
                    $set: {
                        'rooms.$.isOffer': false,
                        'rooms.$.offerPriceLess': 0,
                        'rooms.$.offerExp': '',
                        'rooms.$.offerName': '',
                        'rooms.$.price': room.price + room.offerPriceLess, // Revert to original price
                    },
                },
            },
        }));

        // Perform bulk update for rooms
        await hotelModel.bulkWrite(bulkUpdates);

        // Update all coupons for the given hotelId
        const couponUpdates = await couponModel.updateMany(
            { hotelId: hotelIds, expired: false }, // Ensure we are updating coupons for the hotel
            { $set: { expired: true } }
        );

        if (couponUpdates.modifiedCount === 0) {
            return res.status(404).json({ message: 'No coupons found or all already expired.' });
        }

        res.status(200).json({ message: 'Coupons removed successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// exports.ApplyCoupon = async (req, res) => {
//   try {
//       const { couponCode } = req.params;
//       const { hotelId, roomId } = req.query;

//       // Check if both hotelId and roomId are provided
//       if (!hotelId || !roomId) {
//           return res.status(400).json({ message: 'Both hotelId and roomId are required.' });
//       }

//       // Find the coupon by couponCode
//       const coupon = await couponModel.findOne({ couponCode });

//       if (!coupon) {
//           return res.status(404).json({ message: 'Coupon code not found' });
//       }

//       // Check if the coupon has already been used
//       if (coupon.roomId) {
//           return res.status(400).json({ message: 'Coupon already used' });
//       }

//       const currentDate = new Date().toISOString().slice(0, 10); // Get the current date as YYYY-MM-DD
//       const validityDate = new Date(coupon.validity).toISOString().slice(0, 10); // Get the coupon validity date as YYYY-MM-DD
//       if (currentDate > validityDate) {
//           return res.status(400).json({ message: 'Coupon code has expired' });
//       }

//       // Retrieve the current room details
//       const hotel = await hotelModel.findOne({
//           'rooms.roomId': roomId,
//           hotelId: hotelId,
//       });
//       if (!hotel) {
//           return res.status(404).json({ message: 'Hotel not found' });
//       }

//       const room = hotel.rooms.find((r) => r.roomId === roomId);
//       if (!room) {
//           return res.status(404).json({ message: 'Room not found' });
//       }

//       // Calculate new price
//       const newPrice = room.price - coupon.discountPrice;

//       // Update the room with new offer details
//       const updatedHotel = await hotelModel.findOneAndUpdate(
//           { 'rooms.roomId': roomId, hotelId: hotelId },
//           {
//               $set: {
//                   'rooms.$.offerName': coupon.couponName,
//                   'rooms.$.offerPriceLess': coupon.discountPrice,
//                   'rooms.$.offerExp': coupon.validity,
//                   'rooms.$.isOffer': true,
//                   'rooms.$.price': newPrice,
//               },
//           },
//           { new: true } // Return the updated document
//       );

//       if (!updatedHotel) {
//           return res.status(404).json({ message: 'Room or hotel not found or update failed' });
//       }

//       // Mark the coupon as used by updating the roomId field
//       coupon.roomId = roomId; // Use the roomId to mark the coupon as used
//       coupon.hotelId = hotelId;
//       await coupon.save();

//       res.status(200).json({
//           message: `Your coupon code ${coupon.couponCode} applied successfully`,
//       });
//   } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//   }
// };
