const express = require('express');
const { addTravelAmenities, getTravelAmenities } = require('../../controllers/addtionalSettings/travelAmenities');
const router = express.Router();

router.post ("/add/travel-amenities",addTravelAmenities)
router.get("/get/travel-amenities",getTravelAmenities)

module.exports = router