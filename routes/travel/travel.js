const express = require('express');
const { createTravel } = require('../../controllers/travel/travel');
const { upload } = require('../../aws/upload');
const router = express.Router();
router.post('/create-travel', upload, createTravel);

module.exports = router;
