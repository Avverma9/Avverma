const express = require('express');
const { addTravelAmenities, getTravelAmenities } = require('../../controllers/addtionalSettings/travelAmenities');
const { addMenuBulk, getAllMenuItems } = require('../../controllers/addtionalSettings/menuItems');
const router = express.Router();

//==================================amenities=============================
router.post ("/add/travel-amenities",addTravelAmenities)
router.get("/get/travel-amenities",getTravelAmenities)
//=====================================MenuItems==============================
router.post('/bulk-add-menuItems',addMenuBulk)
router.get("/get-menu-items",getAllMenuItems)



module.exports = router


// 