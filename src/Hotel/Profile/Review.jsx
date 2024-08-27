import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import baseURL from "../../baseURL";
import { Star } from "@mui/icons-material";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import axios from "axios";
import "../Booknow/BookingReview.css";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";

export default function Reviews() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("Unauthorized");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${baseURL}/reviewDatas/userId?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(`${baseURL}/delete/${reviewId}`);
      if (response.status === 200) {
        toast.success("You have deleted a review");
        setData((prevData) => prevData.filter((item) => item._id !== reviewId));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Error deleting review");
    }
  };

  if (location.pathname !== "/reviews") {
    return null;
  }

  if (loading) {
    return (
      <div className="loading">
        <img
          src="https://assets-v2.lottiefiles.com/a/dad9a054-116e-11ee-aef8-9bf427a69ce4/rMSD8h3gzM.gif"
          alt="Loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="unauthorized">
        <img
          src="https://arkca.com/assets/img/login.gif"
          alt="Login required"
        />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="review-container">
      {data.length > 0 ? (
        data.map((reviewData, index) => (
          <div key={index} className="review-card">
            <div className="userImage-container">
              <img src={reviewData?.userImage} alt="User" loading="lazy" />
            </div>
            <div className="review-content">
              <div className="user-info">
                <p className="user-name">{reviewData?.userName}</p>
                <p className="review-date">
                  {formatDateWithOrdinal(reviewData?.createdAt)}
                </p>
              </div>
              <p className="review-comment">{reviewData.comment}</p>
              <div className="star-rating">
                {getStarRating(reviewData.rating)}
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(reviewData._id)}
                style={{
                  alignSelf: "flex-end",
                  marginTop:"10px" // Aligns the button to the right
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews available.</p>
      )}
    </div>
  );
}
