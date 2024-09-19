const express = require("express");
const router = express.Router();
const bulk = require('../controllers/bulkOperation')

router.patch("/remove-bulk-coupons-from-hotels/by-hotel/id",bulk.removeCoupon)

module.exports=router