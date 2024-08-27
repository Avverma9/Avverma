import React, { useState, useEffect } from "react";
import baseURL from "../../baseURL";
import { Star } from "@mui/icons-material";
import Button from "@mui/material/Button"; // Import Button component from MUI
import "./BookingReview.css"; // Import the CSS file
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";

const BookingReview = ({ hotelId }) => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false); // New state for toggling reviews visibility

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${baseURL}/getReviews/hotelId?hotelId=${hotelId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (hotelId) {
      fetchReviews();
    }
  }, [hotelId]);

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

  const reviewsToShow = showAll ? data : data.slice(0, 2);

  return (
    <div className="review-container">
      {reviewsToShow.length > 0 ? (
        reviewsToShow.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review?.userImage} alt="User" className="user-avatar" />
            <div className="review-card-content">
              <div className="user-info">
                <p className="user-name">{review?.userName}</p>
                <p className="review-date">
                  {formatDateWithOrdinal(review?.createdAt)}
                </p>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="star-rating">{getStarRating(review.rating)}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews available.</p>
      )}
      {data.length > 2 && (
        <div className="show-more-less-container">
          {!showAll ? (
            <button
              className="custom-button"
              onClick={handleShowMoreClick}
             
            >
              Show More Reviews
            </button>
          ) : (
            <button className="custom-button" onClick={handleShowLessClick}>
              Show Less Reviews
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingReview;
