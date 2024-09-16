const express = require("express");
const router = express.Router();
const { upload } = require("../../aws/upload");
const bookingController = require("../../controllers/booking/booking");

router.post(
  "/booking/:userId/:hotelId",
  upload,
  bookingController.createBooking
);
router.get("/bookingsConfirm", bookingController.getConfirmedBookings);
router.get("/bookingFailed", bookingController.getFailedBookings);
router.get("/booking/getCheckedIn", bookingController.getCheckedIn);
router.post(
  "/get-hotel-monthly-price-increase/:hotelId",
  bookingController.perMonthPrice
);
router.get("/booking/getCheckedOut", bookingController.getCheckedOut);
router.put("/booking/:bookingId", bookingController.cancelBooking);
router.get("/booking/getCancelled", bookingController.getCancelledBookings);
router.get("/booking/getNoShow", bookingController.getNoShowBookings);
router.get(
  "/booking/getCancelledBooking",
  bookingController.getCancelledBooking
);
router.get("/getbooking/:bookingId", bookingController.getCheckingBooking);
router.put("/updatebooking/:bookingId", bookingController.updateBooking);
router.get("/bookingFailed/:id", bookingController.getFailedBookingsHotel);
router.get("/bookingsConfirm/:id", bookingController.getConfirmedBookingsHotel);
router.get(
  "/bookingsCancelled/:id",
  bookingController.getCancelledBookingHotel
);
router.get("/bookingsCheckedIn/:id", bookingController.getCheckedInHotel);
router.get("/bookingsCheckedOut/:id", bookingController.getCheckedOutHotel);
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
