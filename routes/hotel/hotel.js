const express = require('express');
const router = express.Router();
const { upload } = require('../../aws/upload');
const hotelController = require('../../controllers/hotel/hotel');
const auth = require('../../authentication/auth');

// Routes with authentication
router.post('/data/hotels-new/post/upload/data', auth, upload, hotelController.createHotel);
router.patch('/hotels/update/:hotelId', auth, hotelController.UpdateHotelStatus); // isAccepted, onFront
router.patch('/hotels/update/info/:hotelId', auth, hotelController.UpdateHotelInfo); // basic details
router.get('/get/all/hotels', auth, auth, hotelController.getAllHotels); // on panel
router.delete('/delete/hotels/by/:hotelId', auth, hotelController.deleteHotelById); // on panel
router.get('/get/main/get/hotels', auth, hotelController.getHotels);
router.get('/get/offers/main/hotels', auth, hotelController.setOnFront); // on site
router.get('/hotels/get-by-id/:hotelId', auth, hotelController.getHotelsById);
router.get('/hotelsLocalId', auth, hotelController.getHotelsByLocalID);
router.get('/hotels/filters', auth, hotelController.getHotelsByFilters);
router.get('/hotels/destination/get/all', auth, hotelController.getCity);
router.get('/hotels/query/get/by', auth, hotelController.getByQuery);
router.get('/see-all/hotels-state/get/all/hotels', auth, hotelController.getHotelsState);
router.get('/see-all/hotels-city/get/city', auth, hotelController.getHotelsCity);
router.get('/get-hotels/count', auth, hotelController.getCount);
router.get('/get-pending-hotels/count', auth, hotelController.getCountPendingHotels);
router.patch('/update-hotels-image-by-hotel-id/:hotelId', auth, upload, hotelController.updateHotelImage); // on panel
router.delete('/hotels/:hotelId/images/imageUrl', auth, hotelController.deleteHotelImages); // on panel
router.put('/change-monthly-price/hotel-room', auth, hotelController.monthlyPrice);

module.exports = router;
