const express = require('express');
const { addTravelAmenities, getTravelAmenities } = require('../../controllers/addtionalSettings/travelAmenities');
const { addMenuBulk, getAllMenuItems } = require('../../controllers/addtionalSettings/menuItems');
const { addBed, addBedBulk, getBed } = require('../../controllers/addtionalSettings/bedList');
const { addRoom, getRooms, addRoomBulk } = require('../../controllers/addtionalSettings/roomList');
const router = express.Router();

//==================================amenities=============================
router.post ("/add/travel-amenities",addTravelAmenities)
router.get("/get/travel-amenities",getTravelAmenities)
//=====================================MenuItems==============================
router.post('/bulk-add-menuItems',addMenuBulk)
router.get("/get-menu-items",getAllMenuItems)

//========================================Bed list=============================
router.post("/add-bed",addBed)
router.get("/get-bed",getBed)
router.post("/add-bed-bulk",addBedBulk)

//=====================================Room List ===========================

router.post("/add-room",addRoom)
router.get("/get-room",getRooms)
router.post("/add-room-bulk",addRoomBulk)


module.exports = router


// 