import React, { useState, useEffect } from "react";
import baseURL from "../../baseURL";
import { Star } from "@mui/icons-material";
import "./BookingReview.css"; // Import the CSS file
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";

const BookingReview = ({ hotelId }) => {
  const [data, setData] = useState([]);

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

  return (
    <div className="review-container">
      {data.length > 0 ? (
        data.map((review, index) => (
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
    </div>
  );
};

export default BookingReview;
