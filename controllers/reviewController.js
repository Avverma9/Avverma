const hotelModel = require("../models/hotelModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");


const createReview = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;

    const { comment } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const review = new reviewModel({
      hotel: hotelId,
      user: userId,
      comment: comment,
    });
    const savedReview = await reviewModel.create(review);

    const responseData = {
      _id: savedReview._id,
      hotel: savedReview.hotel,
      user: {
        _id: user._id,
        name: user.name,
        images: user.images,
      },
      comment: savedReview.comment,
      createdAt: savedReview.createdAt,
    };
    return res.status(201).send({
      status: true,
      data: responseData,
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

    const user = await userModel.findById(userId).select(["name", "images"]);


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      hotel: hotel.hotelName,
      review,
      user: {
        name: user.name,
        images: user.images
      }
    });
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

//=======================================================================================================
const getReviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await reviewModel.find({ user: userId });

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

//==========================================================================================================

const deleteReview = async (req, res) => {
  const { userId, hotelId } = req.params;

  try {

    const result = await reviewModel.deleteOne({ user: userId, hotel: hotelId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }


    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createReview,
  getHotelByUserIdAndHotelId,
  getReviewsByHotelId,
  getReviewsByUserId,
  updateReview,
  deleteReview,

};
