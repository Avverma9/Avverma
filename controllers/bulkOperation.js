const hotelModel = require("../models/hotel/basicDetails");
const couponModel= require("../models/booking/coupon")
exports.removeCoupon = async (req, res) => {
  const { hotelIds } = req.body; // Expecting an array of hotelIds

  if (!Array.isArray(hotelIds) || hotelIds.length === 0) {
    return res
      .status(400)
      .json({ message: "An array of hotelIds is required." });
  }

  try {
    const results = [];

    for (const hotelId of hotelIds) {
      // Find the hotel and room that needs to be updated
      const hotel = await hotelModel.findOne({
        "rooms.hotelId": hotelId,
      });

      if (!hotel) {
        results.push({ hotelId, message: "Hotel or room not found." });
        continue; // Skip to the next hotelId
      }

      // Update the room to revert offer details
      const updatedHotel = await hotelModel.findOneAndUpdate(
        { "rooms.hotelId": hotelId },
        {
          $set: {
            "rooms.$[room].isOffer": false,
            "rooms.$[room].offerPriceLess": 0,
            "rooms.$[room].offerExp": "",
            "rooms.$[room].offerName": "",
            "rooms.$[room].price":
              hotel.rooms.find((r) => r.hotelId === hotelId).price +
              hotel.rooms.find((r) => r.hotelId === hotelId).offerPriceLess, // Revert to original price
          },
        },
        {
          arrayFilters: [{ "room.hotelId": hotelId }],
          new: true, // Return the updated document
        }
      );

      if (!updatedHotel) {
        results.push({ hotelId, message: "Update failed." });
        continue;
      }

      // Find and update the coupon to set expired to true
      const couponUpdate = await couponModel.findOneAndUpdate(
        { hotelId: hotelId, expired: false }, // Ensure we are updating the correct coupon
        { $set: { expired: true } },
        { new: true } // Return the updated coupon
      );

      if (!couponUpdate) {
        results.push({
          hotelId,
          message: "Coupon not found or already expired.",
        });
        continue;
      }

      results.push({ hotelId, message: "Coupon removed successfully." });
    }

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
