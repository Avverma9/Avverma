const hotelModel = require("../models/hotel/basicDetails");
const couponModel= require("../models/booking/coupon")

exports.removeCoupon = async (req, res) => {
  const { hotelIds } = req.body; // Expecting hotelId

  if (!hotelIds) {
    return res.status(400).json({ message: "hotelId is required." });
  }

  try {
    // Find the hotel that needs to be updated
    const hotel = await hotelModel.findOne({ hotelId: hotelIds });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    // Prepare updates for all rooms in the hotel
    const bulkUpdates = hotel.rooms.map(room => ({
      updateOne: {
        filter: { hotelId: hotelIds, "rooms.roomId": room.roomId },
        update: {
          $set: {
            "rooms.$.isOffer": false,
            "rooms.$.offerPriceLess": 0,
            "rooms.$.offerExp": "",
            "rooms.$.offerName": "",
            "rooms.$.price": room.price + room.offerPriceLess // Revert to original price
          }
        }
      }
    }));

    // Perform bulk update for rooms
    await hotelModel.bulkWrite(bulkUpdates);

    // Update all coupons for the given hotelId
    const couponUpdates = await couponModel.updateMany(
      { hotelId: hotelIds, expired: false }, // Ensure we are updating coupons for the hotel
      { $set: { expired: true } }
    );

    if (couponUpdates.modifiedCount === 0) {
      return res.status(404).json({ message: "No coupons found or all already expired." });
    }

    res.status(200).json({ message: "Coupons removed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
