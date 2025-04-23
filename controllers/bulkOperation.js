const hotelModel = require('../models/hotel/basicDetails');
const couponModel = require('../models/booking/coupon');

exports.removeCoupon = async (req, res) => {
    const { hotelIds } = req.body;

    if (!Array.isArray(hotelIds) || hotelIds.some(isNaN)) {
        return res.status(400).json({ message: 'hotelIds must be an array of numeric hotel IDs.' });
    }

    try {
        const hotels = await hotelModel.find({ hotelId: { $in: hotelIds } });

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found with the provided IDs.' });
        }

        const bulkRoomUpdates = [];
        for (const hotel of hotels) {
            if (hotel.rooms && hotel.rooms.length > 0) {
                const updates = hotel.rooms
                    .filter(room => room.isOffer)
                    .map(room => ({
                        updateOne: {
                            filter: { hotelId: hotel.hotelId, 'rooms.roomId': room.roomId },
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
                bulkRoomUpdates.push(...updates);
            }
        }

        if (bulkRoomUpdates.length > 0) {
            await hotelModel.bulkWrite(bulkRoomUpdates);
        }

        const couponUpdates = await couponModel.updateMany(
            { hotelId: { $in: hotelIds }, expired: false },
            { $set: { expired: true } }
        );

        const modifiedCount = bulkRoomUpdates.length + couponUpdates.modifiedCount;

        if (modifiedCount === 0) {
            return res.status(200).json({ message: 'No active coupons or room offers found for the provided hotels.' });
        }

        res.status(200).json({ message: 'Active coupons and room offers removed successfully for the selected hotels.' });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};