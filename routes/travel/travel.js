const express = require('express');
const { createTravel, getTravelList, getTravelById, sortByOrder, sortByPrice, sortByDuration } = require('../../controllers/travel/travel');
const { upload } = require('../../aws/upload');
const router = express.Router();
router.post('/create-travel', upload, createTravel);
router.get('/get-travel-list', getTravelList);
router.get('/get-travel/:id', getTravelById);
router.get('/sort-travel/by-order', sortByOrder);
router.get('/sort-travel/by-price', sortByPrice);
router.get('/sort-travel/by-duration', sortByDuration);

module.exports = router;
