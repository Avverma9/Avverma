
//CREATE COUPON
const couponModel = require("../models/couponModel");

const MakeCoupon = async (req, res) => {
  try {
    const newCoupon = req.body;
    const createdCoupon = await couponModel.create(newCoupon);
    res.status(201).json({ message: "Coupon code created", coupon: createdCoupon });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




//VALIDATE AND APPLY COUPON
const ApplyCoupon = async (req, res) => {
  try {
    const couponCode = req.params.code;
    const coupon = await couponModel.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon code not found' });
    }

    const currentDate = new Date();
    const validityDate = new Date(coupon.validity);

    if (currentDate > validityDate) {
      return res.status(400).json({ message: 'Coupon code has expired' });
    }

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//GET ALL 
const GetAllCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find().sort({ validity: -1 });
    res.status(200).json(coupons);
  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  MakeCoupon,
  ApplyCoupon,
  GetAllCoupons,
};
