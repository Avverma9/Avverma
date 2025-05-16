import React, { useState, useEffect } from "react";
import { Star } from "@mui/icons-material";
import "./BookingReview.css"; // Import the CSS file
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookingReview } from "../../redux/reducers/reviewSlice";
import { Divider, Typography } from "@mui/material";

const BookingReview = ({ hotelId }) => {
  const [showAll, setShowAll] = useState(false);
  const { data = [], loading, error } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchBookingReview(hotelId));
    }
  }, [hotelId, dispatch]);

  const getStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        style={{
          color: index < rating ? "#ffbb33" : "#e0e0e0",
          fontSize: "1rem",
        }}
      />
    ));
  };

  const handleShowMoreClick = () => {
    setShowAll(true);
  };

  const handleShowLessClick = () => {
    setShowAll(false);
  };

  // Ensure `data` is treated as an array
  const reviewsToShow = Array.isArray(data)
    ? showAll
      ? data
      : data.slice(0, 2)
    : [];

  return (
    <div className="review-container">
      {reviewsToShow.length > 0 && (
        <Typography variant="h6" component="h6" className="testimonial-title">
          Here’s what our customers say...
        </Typography>
      )}
      {loading && <p>Loading reviews...</p>}

      {!loading &&
        !error &&
        (reviewsToShow.length > 0 ? (
          reviewsToShow.map((review, index) => (
            <div key={index} className="review-card">
              <img
                src={review?.userImage || "default-image-url"}
                alt="User"
                className="user-avatar"
              />
              <div className="review-card-content">
                <div className="user-info">
                  <p className="user-name">{review?.userName || "Anonymous"}</p>
                  <p className="review-date">
                    {formatDateWithOrdinal(review?.createdAt)}
                  </p>
                </div>
                <p className="review-comment">
                  {review.comment || "No comment provided."}
                </p>
                <div className="star-rating">
                  {getStarRating(review.rating || 0)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews available.</p>
        ))}
      {Array.isArray(data) && data.length > 2 && (
        <div className="show-more-less-container">
          <button
            className="custom-button"
            onClick={showAll ? handleShowLessClick : handleShowMoreClick}
          >
            {showAll ? "Show Less Reviews" : "Show More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingReview;
