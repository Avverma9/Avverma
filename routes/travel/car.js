const express = require('express');
const { upload } = require('../../aws/upload');
const { addCar, getCarById, getAllCars, updateCar, filterCar, getSeatsData } = require('../../controllers/travel/cars');
const router = express.Router();

router.post('/add-a-car', upload, addCar);
router.get('/get-a-car/:id', getCarById);
router.get('/get-all-car', getAllCars);
router.patch('/update-a-car/:id', upload, updateCar);
router.delete('/delete-a-car/:id', updateCar);
router.get('/filter-car/by-query',filterCar);
router.get('/get-seat-data/by-id/:id',getSeatsData);

module.exports = router;
