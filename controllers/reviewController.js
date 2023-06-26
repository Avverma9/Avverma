const hotelModel = require("../models/hotelModel");
const reviewModel = require("../models/reviewModel");

const createReview = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;

    const { comment } = req.body;

    const review = new reviewModel({
      hotel: hotelId,
      user: userId,
      comment: comment,
    });
    const savedReview = await reviewModel.create(review);
    return res.status(201).send({
      status: true,
      data: savedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//===============================================================================================
const getHotelByUserIdAndHotelId = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;

    const review = await reviewModel.findOne({ user: userId, hotel: hotelId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const hotel = await hotelModel.findById(hotelId).select("hotelName");

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ hotel: hotel.hotelName, review });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//===================================================================================================
const getReviewsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const reviews = await reviewModel.find({ hotel: hotelId });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//=================================================================================================
const updateReview = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;
    const { comment } = req.body;

    const review = await reviewModel.findOne({ user: userId, hotel: hotelId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.comment = comment;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createReview,
  getHotelByUserIdAndHotelId,
  getReviewsByHotelId,
  updateReview,
};
