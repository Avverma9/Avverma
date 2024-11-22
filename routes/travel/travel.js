const express = require('express');
const { createTravel, getTravelList, getTravelById } = require('../../controllers/travel/travel');
const { upload } = require('../../aws/upload');
const router = express.Router();
router.post('/create-travel', upload, createTravel);
router.get('/get-travel-list', getTravelList);
router.get('/get-travel/:id', getTravelById);

module.exports = router;
