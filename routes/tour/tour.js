const express = require('express');
const { createTravel, getTravelList, getTravelById, sortByOrder, sortByPrice, sortByDuration, sortBythemes, updateTour } = require('../../controllers/tour/tour');
const { upload } = require('../../aws/upload');

const router = express.Router();
router.post('/create-travel', upload, createTravel);
router.get('/get-travel-list', getTravelList);
router.get('/get-travel/:id', getTravelById);
router.get('/sort-travel/by-order', sortByOrder);
router.get('/sort-travel/by-price', sortByPrice);
router.get('/sort-travel/by-duration', sortByDuration);
router.get('/sort-travel/by-themes', sortBythemes);

router.patch('/update-tour/data/:id', updateTour)

module.exports = router;
