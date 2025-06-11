const express = require('express');
const { createTravel, getTravelList, getTravelById, sortByOrder, sortByPrice, sortByDuration, sortBythemes, updateTour, getRequests } = require('../../controllers/tour/tour');
const { upload } = require('../../aws/upload');
const { createBooking, getBookings, getBookingByUser, getBookingsByBookingId, getTotalSell, updateBooking, deleteBooking } = require('../../controllers/tour/booking');

const router = express.Router();
router.post('/create-tour', upload, createTravel);
router.get('/get-requests',getRequests)
router.get('/get-tour-list', getTravelList);
router.get('/get-tour/:id', getTravelById);
router.get('/sort-tour/by-order', sortByOrder);
router.get('/sort-tour/by-price', sortByPrice);
router.get('/sort-tour/by-duration', sortByDuration);
router.get('/sort-tour/by-themes', sortBythemes);
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
