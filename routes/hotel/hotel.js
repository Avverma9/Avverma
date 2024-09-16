const express = require("express");
const router = express.Router();
const { upload } = require("../../aws/upload");
const hotelController = require("../../controllers/hotel/hotel");

router.post(
  "/data/hotels-new/post/upload/data",
  upload,
  hotelController.createHotel
);
router.patch("/hotels/update/:hotelId", hotelController.UpdateHotelStatus); //isAccepted,onFront
router.patch("/hotels/update/info/:hotelId", hotelController.UpdateHotelInfo); //basic details
router.get("/get/all/hotels", hotelController.getAllHotels); // on panel
router.get("/get/all/rejected/hotels", hotelController.getAllRejectedHotels);
router.delete("/delete/hotels/by/:hotelId", hotelController.deleteHotelById); // on panel
router.get("/get/main/get/hotels", hotelController.getHotels);
router.get("/get/offers/main/hotels", hotelController.getOffers);
router.get("/hotels/get-by-id/:hotelId", hotelController.getHotelsById);
router.get("/hotelsLocalId", hotelController.getHotelsByLocalID);
router.get("/hotels/filters", hotelController.getHotelsByFilters);
router.get("/hotels/destination/get/all", hotelController.getCity);
router.get("/hotels/query/get/by", hotelController.getByQuery);
router.patch(
  "/update/new/created/hotel/room/:hotelid/:roomid",
  upload,
  hotelController.updateRoom
);
router.post("/increase/room/:id", hotelController.increaseRoomToHotel);
router.post("/decrease/room/minus/:id", hotelController.decreaseRoomToHotel);
router.post("/:hotelId/roomDetails", upload, hotelController.addRoomToHotel);
router.delete(
  "/:hotelId/delete/a/create/room/from/db",
  hotelController.deleteRoom
);
router.patch("/hotels/update/amenity/:id", hotelController.updateAmenity);
router.patch(
  "/hotels/update/coupon/by/:hotelId/:roomId",
  hotelController.ApplyCoupon
);
router.patch(
  "/remove/hotels-offer/update/coupon/by/:id/:roomid",
  hotelController.expireOffer
);
router.get(
  "/see-all/hotels-state/get/all/hotels",
  hotelController.getHotelsState
);
router.get("/see-all/hotels-city/get/city", hotelController.getHotelsCity);
router.get("/get-hotels/by-room/:roomType", hotelController.getByRoom);
router.get("/get-hotels/count", hotelController.getCount);
router.get("/get-pending-hotels/count", hotelController.getCountPendingHotels);
router.patch(
  "/update-hotels-image-by-hotel-id/:hotelId",
  upload,
  hotelController.updateHotelImage //on panel
);
router.delete(
  "/hotels/:hotelId/images/imageUrl",

  hotelController.deleteHotelImages //on panel
);
router.put("/change-monthly-price/hotel-room", hotelController.monthlyPrice);
module.exports = router;
