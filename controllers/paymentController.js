const paymentModel = require('../models/paymentModel');
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: " rzp_test_CE1nBQFs6SwXnC",
    key_secret: "PTYR3RDbVaNrpkmRqMhX7CKA",
  });
  
const createPayment = async (req, res) => {
  try {
    const { hotelId, userId, amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: 'razorUser@gmail.com',
    };

    const payment = {
      hotelId,
      userId,
      amount,
      currency,
    };

    await paymentModel.create();

    res.json({
      success: true,
      payment: {
        hotelId: payment.hotelId,
        userId: payment.userId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        createdAt: payment.createdAt,
      },
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

module.exports = {
  createPayment,
};
