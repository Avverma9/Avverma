const express = require('express');
const { createTravel, getTravelList, getTravelById, sortByOrder, sortByPrice, sortByDuration, sortBythemes } = require('../../controllers/travel/tour');
const { upload } = require('../../aws/upload');
const { bookCar } = require('../../controllers/travel/booking');
const router = express.Router();
router.post('/create-travel', upload, createTravel);
router.get('/get-travel-list', getTravelList);
router.get('/get-travel/:id', getTravelById);
router.get('/sort-travel/by-order', sortByOrder);
router.get('/sort-travel/by-price', sortByPrice);
router.get('/sort-travel/by-duration', sortByDuration);
router.get('/sort-travel/by-themes', sortBythemes);
router.post("/create-travel/booking",bookCar);

module.exports = router;
