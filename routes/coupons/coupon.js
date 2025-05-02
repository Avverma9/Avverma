const express = require('express');
const { newCoupon, ApplyCoupon, GetAllCoupons } = require('../../controllers/coupons/partnerCoupon');
const { newUserCoupon, ApplyUserCoupon, GetAllUserCoupons } = require('../../controllers/coupons/userCoupon');
const router = express.Router()


//===============================Partner coupon=============================================
router.post("/coupon/create-a-new/coupon", newCoupon);           // on panel
router.patch(
    "/apply/a/coupon-to-room", ApplyCoupon // on panel
);
router.get("/coupon/get/all", GetAllCoupons); // on panel


//=====================================Customer/User coupon==================================

router.post("/coupon/create-a-new/coupon/user", newUserCoupon);           // on panel
router.patch(
    "/apply/a/coupon-to-room/user", ApplyUserCoupon // on panel
);
router.get("/coupon/get/all/user", GetAllUserCoupons); // on panel
module.exports = router