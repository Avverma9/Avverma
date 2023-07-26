const hotelModel = require("../models/hotelModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");
const offerModel = require("../controllers/offersController");


//======================================hotel review============================================
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
//==================================create review for offer================================================
const createOfferReview = async (req, res) => {
  try {
    const { userId, offersId } = req.params;

    const { comment } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const review = new reviewModel({
      offers: offersId,
      user: userId,
      comment: comment,
    });
    const savedReview = await reviewModel.create(review);

    const responseData = {
      _id: savedReview._id,
      offers: savedReview.offers,
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
const getReviewsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const reviews = await reviewModel.find({ hotel: hotelId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    reviews.sort((a, b) => b.createdAt - a.createdAt);

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
      reviews: reviewData
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
//====================================getOfferReview===========================================
const  getReviewsByOfferId= async (req, res) => {
  try {
    const { offersId } = req.params;

    const reviews = await reviewModel.find({ offers: offersId});

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const offers = await offerModel.findById(offersId).select("hotelName");

    if (!offers) {
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
      offers: offers.hotelName,
      reviews: reviewData
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



//=======================================================================================================
const getReviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await reviewModel.find({ user: userId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const hotelIds = reviews.map((review) => review.hotel);
    const hotels = await hotelModel.find({ _id: { $in: hotelIds } }).select(["hotelName", "images"]);

    const reviewData = reviews.map((review) => {
      const hotel = hotels.find((hotel) => hotel._id.toString() === review.hotel.toString());
      return {
        review,
        hotelName: hotel.hotelName,
        hotelImages: hotel.images[0]
      };
    });

    res.status(200).json({ reviews: reviewData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//=================================================================================================
const updateReview = async (req, res) => {
  try {
    const { userId, hotelId, reviewId } = req.params;
    const { comment } = req.body;

    const review = await reviewModel.findOne({ user: userId, hotel: hotelId, _id: reviewId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.comment = comment;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//==========================================================================================================

const deleteReview = async (req, res) => {
  const { userId, hotelId, reviewId } = req.params;

  try {
    const result = await reviewModel.deleteOne({ user: userId, hotel: hotelId, _id: reviewId });

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
  getReviewsByHotelId,  
  getReviewsByUserId,
  updateReview,
  deleteReview,
  createOfferReview,
  getReviewsByOfferId

};
