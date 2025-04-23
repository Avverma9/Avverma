const express = require("express");
const router = express.Router();
const bulk = require('../controllers/bulkOperation')

router.patch("/remove-bulk-coupons-from-hotels/by-hotel/id",bulk.removeCoupon)
router.patch("/remove-bulk-hotel-from-hotels/by-hotel/ids",bulk.changeStatus)

module.exports=router