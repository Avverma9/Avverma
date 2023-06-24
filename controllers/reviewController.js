const reviewModel = require("../models/reviewModel");

const createReview = async (req, res) => {
  try {
    const { hotel, user, comment } = req.body;

    const review = new reviewModel({
      hotel,
      user,
      comment,
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
const getAllReviews = async (req, res) => {
  try {
    // Retrieve all reviews from the database
    const reviews = await reviewModel.find();

    res.status(200).json({
      success: true,
      message: "All reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reviews",
      error: error.message,
    });
  }
};

//===================================================================================================
const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve review",
      error: error.message,
    });
  }
};


module.exports = { createReview, getAllReviews, getReviewById };
