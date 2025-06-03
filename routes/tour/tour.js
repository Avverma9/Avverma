const express = require('express');
const { createTravel, getTravelList, getTravelById, sortByOrder, sortByPrice, sortByDuration, sortBythemes, updateTour } = require('../../controllers/tour/tour');
const { upload } = require('../../aws/upload');
const { createBooking, getBookings, getBookingByUser, getBookingsByBookingId, getTotalSell, updateBooking, deleteBooking } = require('../../controllers/tour/booking');

const router = express.Router();
router.post('/create-travel', upload, createTravel);
router.get('/get-travel-list', getTravelList);
router.get('/get-travel/:id', getTravelById);
router.get('/sort-travel/by-order', sortByOrder);
router.get('/sort-travel/by-price', sortByPrice);
router.get('/sort-travel/by-duration', sortByDuration);
router.get('/sort-travel/by-themes', sortBythemes);
router.patch('/update-tour/data/:id', updateTour)


//==========================================Booking Routes==========================================
router.post("/tour-booking/create-tour-booking", createBooking);
router.get("/tour-booking/get-bookings",getBookings)
router.get("/tour-booking/get-users-booking",getBookingByUser)
router.get("/tour-booking/get-users-booking/by/:bookingId",getBookingsByBookingId)
router.get("/tour-booking/get-total-sell",getTotalSell)
router.patch("/tour-booking/update-tour-booking/:bookingId",updateBooking)
router.patch("/tour-booking/delete-tour-booking/:bookingId",deleteBooking)


module.exports = router;
