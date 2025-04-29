const express = require('express');
const { bookCar, getTravelBookings, updateBooking } = require('../../controllers/travel/booking');
const router = express.Router();

router.post("/create-travel/booking", bookCar);
router.get('/get-travels-bookings', getTravelBookings)
router.patch('/update-travel/booking',updateBooking)

module.exports = router;