import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import baseURL from "../../baseURL";
import { Star } from "@mui/icons-material";
import "./Reviews.css";

export default function Reviews() {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `${baseURL}/reviewDatas/userId?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
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
          fontSize: "1.5rem",
        }}
      />
    ));
  };

  if (location.pathname !== "/reviews") {
    return null;
  }

  const userId = localStorage.getItem("userId");
  if (!userId) {
    return (
      <div className="unauthorized">
        <img
          src="https://arkca.com/assets/img/login.gif"
          alt="Login required"
        />
        <p>
          Unauthorized
          <br />
          Please log in
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading">
        <img
          src="https://assets-v2.lottiefiles.com/a/dad9a054-116e-11ee-aef8-9bf427a69ce4/rMSD8h3gzM.gif"
          alt="Loading"
        />
      </div>
    );
  }
  /* .image-container {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ddd;
  margin-right: 20px;
  background: #eee;
} */
  return (
    <div className="review-container">
      {data.map((reviewData, index) => (
        <div key={index} className="review-card">
          <div
            className="image-container"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: "0",
              marginRight:"20px",
              background:"#eee"
            }}
          >
            <img src={reviewData?.hotelImage} alt="Hotel" loading="lazy" />
          </div>
          <div className="review-content">
            <div className="hotel-name">{reviewData?.hotelName}</div>
            <div className="comment">{reviewData?.comment}</div>
            <div className="rating">{getStarRating(reviewData?.rating)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
