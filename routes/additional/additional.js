const express = require('express');
const { addTravelAmenities, getTravelAmenities } = require('../../controllers/addtionalSettings/travelAmenities');
const { addMenuBulk, getAllMenuItems } = require('../../controllers/addtionalSettings/menuItems');
const { addBed, addBedBulk, getBed } = require('../../controllers/addtionalSettings/bedList');
const { addRoom, getRooms, addRoomBulk } = require('../../controllers/addtionalSettings/roomList');
const { addAmenities, addBulkAmenities, getAmenities, deleteAmenityById } = require('../../controllers/addtionalSettings/hotelAmenities');
const { addRole, getRole, deleteRoleById } = require('../../controllers/addtionalSettings/role');
const router = express.Router();

//==================================amenities=============================
router.post("/add/travel-amenities", addTravelAmenities)
router.get("/get/travel-amenities", getTravelAmenities)
//=====================================MenuItems==============================
router.post('/bulk-add-menuItems', addMenuBulk)
router.get("/get-menu-items", getAllMenuItems)
//========================================Bed list=============================
router.post("/add-bed", addBed)
router.get("/get-bed", getBed)
router.post("/add-bed-bulk", addBedBulk)
//=====================================Room List ===========================
router.post("/add-room", addRoom)
router.get("/get-room", getRooms)
router.post("/add-room-bulk", addRoomBulk)
//==================================Hotel Amenities===============================
router.post("/add-amenities", addAmenities)
router.get("/get-amenities", getAmenities)
router.post("/add-amenities-bulk", addBulkAmenities)
router.delete("/delete-amenity/:id",deleteAmenityById)
//================================ role========================================
router.post('/roles', addRole);
router.get('/roles', getRole);
router.delete('/roles/:id', deleteRoleById);
module.exports = router


// 