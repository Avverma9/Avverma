const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");

const offersModel = require("../models/offersModel");
//==================================create review for offer================================================
const createOfferReview = async (req, res) => {
  try {
    const { userId, offerId } = req.params;

    const { comment, rating } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = new reviewModel({
      offer: offerId,
      user: userId,
      comment: comment,
      rating: rating,
    });
    const savedReview = await reviewModel.create(review);

    const responseData = {
      _id: savedReview._id,
      offer: savedReview.offer,
      user: {
        _id: user._id,
        name: user.name,
        images: user.images,
      },
      comment: savedReview.comment,
      rating: savedReview.rating,
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

//====================================getOfferReview===========================================
const getReviewsByOfferId = async (req, res) => {
  const { offerId } = req.params;
  const fetchData = await reviewModel.find({ offer: offerId });
  const countRating = fetchData.length;
  const hotelname = await offersModel.findById(offerId).select("hotelName");

  const userIds = fetchData.map((review) => review.user);
  const users = await userModel
    .find({ _id: { $in: userIds } })
    .select(["name", "images"]);

  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  const reviewData = fetchData.map((review) => {
    const user = users.find(
      (user) => user._id.toString() === review.user.toString()
    );
    return {
      review,
      user: {
        name: user.name,
        images: user.images,
      },
    };
  });
  res.json({ fetchData, countRating, hotelname, reviewData });
};
//=================================update offer review============================================
const updateOfferReview = async function (req, res) {
  const { offerId, userId, reviewId } = req.params;
  const { comment, rating } = req.body;
  const findData = await reviewModel.findOneAndUpdate(
    { offer: offerId, user: userId, _id: reviewId },
    { comment, rating },
    { new: true }
  );

  res.json(findData);
};
//=======================================delete============================================
const deleteOfferReview= async(req,res)=>{
    const{userId,offerId,reviewId}=req.params
    const deletedData= await reviewModel.findOneAndDelete({user:userId,offer:offerId,_id:reviewId})
    res.json(deletedData)
}
module.exports = { createOfferReview, getReviewsByOfferId, updateOfferReview,deleteOfferReview };
