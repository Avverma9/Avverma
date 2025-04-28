const express = require('express');
const { bookCar, getTravelBookings } = require('../../controllers/travel/booking');
const router = express.Router();

router.post("/create-travel/booking", bookCar);
router.get('/get-travels-bookings', getTravelBookings)

module.exports = router;