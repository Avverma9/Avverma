const express = require('express')
const router = express.Router()

const admin = require('../../controller/Admin/admin.controller')
const category = require('../../controller/Admin/category.controller')
const regionController = require('../../controller/Admin/region.controller'); // Import the region controller
const sellerController = require('../../controller/Admin/seller.controller'); // Import the region controller
const auctionController = require('../../controller/Admin/auction.controller'); // Import the region controller
const { verifyToken } = require('../../middleware/auth')

router.post('/create', admin.createAdmin)
router.post('/login', admin.login)
router.get('/getAll', verifyToken, admin.getAllAdmins)
router.get('/getCount', verifyToken, admin.getCount)
router.get('/get/:adminId', verifyToken, admin.getAdmin)
router.put('/update/:adminId', verifyToken, admin.updateAdmin)

router.post('/category/add', verifyToken, category.addCategory)
router.get('/category/getAll', category.getAll)
router.get('/category/get/:catId', category.get)
router.put('/category/update/:catId', verifyToken, category.updateCategory)
router.delete('/category/delete/:catId', verifyToken, category.delete)

// Region routes
router.post('/region/add', verifyToken, regionController.addRegion);
router.get('/region/getAll', regionController.getAllRegions);
router.get('/region/get/:regionId', regionController.getRegion);
router.put('/region/update/:regionId', verifyToken, regionController.updateRegion);
router.delete('/region/delete/:regionId', verifyToken, regionController.deleteRegion);

// Seller routes
router.post('/seller/add', verifyToken, sellerController.add);
router.get('/seller/getAll', verifyToken, sellerController.getAll);
router.get('/seller/get/:sellerId', verifyToken, sellerController.get);
router.put('/seller/update/:sellerId', verifyToken, sellerController.update);
router.delete('/seller/delete/:sellerId', verifyToken, sellerController.delete);
router.get('/seller/getByRegion/:regionId', verifyToken, sellerController.getSellerByRegion);

// Auction routes
router.post('/auction/add', verifyToken, auctionController.add);
router.get('/auction/getAll', auctionController.getAll);
router.get('/auction/get/:auctionId', auctionController.get);
router.put('/auction/update/:auctionId', verifyToken, auctionController.update);
router.delete('/auction/delete/:auctionId', verifyToken, auctionController.delete);
router.get('/auction/getByCategory/:categoryId', auctionController.getAuctionByCategory);


module.exports = router