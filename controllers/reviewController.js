const hotelModel = require("../models/Hotel/hotelModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");

//======================================hotel review============================================
const createReview = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;

    const { comment,rating } = req.body;


    const user = await userModel.findOne({userId});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const review = new reviewModel({
      hotelId,
      userId,
      comment,
      rating
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
const getReviewsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const reviews = await reviewModel.find({ hotel: hotelId }).sort({createdAt: -1})
 let countRating = reviews.length
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    reviews.sort((a, b) => b.createdAt-1 - a.createdAt-1);

    const hotel = await hotelModel.findById(hotelId).select("hotelName");

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const userIds = reviews.map((review) => review.user);
    const users = await userModel.find({ _id: { $in: userIds } }).select(["name", "images"]);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const reviewData = reviews.map((review) => {
      const user = users.find((user) => user._id.toString() === review.user.toString());
      return {
        review,
        user: {
          name: user.name,
          images: user.images
        }
      };
    });

    res.status(200).json({
      hotel: hotel.hotelName,
      reviews: reviewData,
      countRating
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


//=======================================================================================================
const getReviewsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;

    const reviews = await reviewModel.find({ userId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const user = await userModel.findOne({ userId: userId }).select(["userName", "images"]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reviewData = [];

    for (const review of reviews) {
      const hotel = await hotelModel.findOne({ hotelId: review.hotelId }).select(["hotelName", "images"]);

      reviewData.push({
        review,
        user: {
          name: user.userName,
          images: user.images,
        },
        hotel: hotel ? {
          hotelName: hotel.hotelName,
          images: hotel.images,
        } : null,
      });
    }

    res.status(200).json(reviewData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//=================================================================================================
const updateReview = async (req, res) => {
  try {
    const { userId, hotelId, reviewId } = req.params;
    const { comment,rating } = req.body;

    const review = await reviewModel.findOne({ user: userId, hotel: hotelId, _id: reviewId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.comment = comment;
    review.rating= rating;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//==========================================================================================================

const deleteReview = async (req, res) => {
  const {reviewId } = req.params;

  try {
    const result = await reviewModel.deleteOne({_id: reviewId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' })
  }
};
//===========================get all  reviews ==========================================

module.exports = {
  createReview,
  getReviewsByHotelId,  
  getReviewsByUserId,
  updateReview,
  deleteReview,
};
