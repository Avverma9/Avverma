const express = require('express')
const router = express.Router();
const couponController = require('../../controllers/booking/coupon')
router.post("/coupon/create-a-new/coupon", couponController.newCoupon);
router.patch(
  "/apply/a/coupon-to-room",
  couponController.ApplyCoupon
);
router.get("/coupon/get/all", couponController.GetAllCoupons);
router.patch(
  "/remove-an-ongoing/offer/from/hotel",
  couponController.checkAndUpdateOffers
);
router.get("/valid-coupons",couponController.GetValidCoupons)

module.exports = router