const express = require("express");
const router = express.Router();
const { upload } = require("../../aws/upload");
const bookingController = require("../../controllers/booking/booking");

router.post(
  "/booking/:userId/:hotelId",
  upload,
  bookingController.createBooking
);

router.put("/updatebooking/:bookingId", bookingController.updateBooking);

router.get(
  "/get/all/users-filtered/booking/by",
  bookingController.getAllFilterBookings
); // using on main site
router.get(
  "/get/all/filtered/booking/by/query",
  bookingController.getAllFilterBookingsByQuery
); //using on dashboard
router.get("/get-all/bookings-details", bookingController.getAll);
router.get("/get-all/bookings-count", bookingController.getBookingCounts);
router.get("/get-all/sell-count", bookingController.getTotalSell);

module.exports = router;
