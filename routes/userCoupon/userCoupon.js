const express = require('express');
const { newCoupon, ApplyCoupon, GetAllCoupons } = require('../../controllers/userCoupon/userCoupon');
const router = express.Router()

router.post("/coupon/create-a-new/coupon", newCoupon);           // on panel
router.patch(
    "/apply/a/coupon-to-room", ApplyCoupon // on panel
);
router.get("/coupon/get/all", GetAllCoupons); // on panel
module.exports = router