import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/_dateFuntions";
import "./MyReviewSection.css";

export const MyReviewSection = () => {
  const userId = localStorage.getItem("userId");
  const [currentUserReviews, setCurrentUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hotel-backend-tge7.onrender.com/reviewDatas/${userId}`, {
          method: "GET",
        });

        if (response.status === 200) {
          const res = await response.json();
          setCurrentUserReviews(res.reviews);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch data");
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="my-review-section">
      <h4 className="section-title">My Reviews</h4>

      {isLoading ? (
        <div className="shimmer-loading-container">
          <div className="shimmer-loading-content"></div>
          <div className="shimmer-loading-content"></div>
          <div className="shimmer-loading-content"></div>
        </div>
      ) : (
        <>
          {currentUserReviews && currentUserReviews.length !== 0 ? (
            [...currentUserReviews]
              .reverse()
              .map((review) => (
                <div className="review-container" key={review.review._id}>
                  <div className="hotel-image">
                    {review.hotel.images[0] && (
                      <img
                        src={review.hotel.images[0]}
                        alt={`${review.hotel.hotelName} Image`}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    )}
                  </div>
                  <div className="review-content">
                    <div className="review-content-header">
                      <p>You gave a review on {review.hotel.hotelName} hotel at {formatDate(review.review.createdAt)}</p>
                     <hr />
                    </div>
                    <div className="review-content-body">
                      <p>{review.review.comment}</p>
                      <p>Rating: {review.review.rating}</p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            "NO Reviews Posted Yet"
          )}
        </>
      )}
    </div>
  );
};
