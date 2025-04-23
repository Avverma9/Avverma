const hotelModel = require('../models/hotel/basicDetails');
const couponModel = require('../models/booking/coupon');

exports.removeCoupon = async (req, res) => {
    const { hotelIds } = req.body;

    if (!hotelIds) {
        return res.status(400).json({ message: 'hotelId is required.' });
    }

    try {
        const hotel = await hotelModel.findOne({ hotelId: hotelIds });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        if (!hotel.rooms || hotel.rooms.length === 0) {
            return res.status(200).json({ message: 'No rooms found for this hotel.' });
        }

        const bulkUpdates = hotel.rooms
            .filter(room => room.isOffer)
            .map(room => ({
                updateOne: {
                    filter: { hotelId: hotelIds, 'rooms.roomId': room.roomId },
                    update: {
                        $set: {
                            'rooms.$.isOffer': false,
                            'rooms.$.offerPriceLess': 0,
                            'rooms.$.offerExp': '',
                            'rooms.$.offerName': '',
                            'rooms.$.price': room.price + room.offerPriceLess,
                        },
                    },
                },
            }));

        if (bulkUpdates.length > 0) {
            await hotelModel.bulkWrite(bulkUpdates);
        }

        const couponUpdates = await couponModel.updateMany(
            { hotelId: hotelIds, expired: false },
            { $set: { expired: true } }
        );

        const modifiedCount = (bulkUpdates.length > 0 ? bulkUpdates.length : 0) + couponUpdates.modifiedCount;

        if (modifiedCount === 0) {
            return res.status(200).json({ message: 'No active coupons or room offers found for this hotel.' });
        }

        res.status(200).json({ message: 'Active coupons and room offers removed successfully.' });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};