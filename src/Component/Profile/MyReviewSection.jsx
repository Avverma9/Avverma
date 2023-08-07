import { useEffect } from "react";
import { useState } from "react";
import { formatDate } from "../../utils/_dateFuntions";

export const MyReviewSection = () => {
  const userId = localStorage.getItem("userId");
  const [currentUserReviews, setCurrentUserReviews] = useState([]);

  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/reviewDatas/${userId}`, {
      method: "GET",
    }).then((response) => {
      try {
        if (response.status === 200) {
          const data = response.json();
          data.then((res) => setCurrentUserReviews(res.reviews));
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [userId]);

  console.log(currentUserReviews, "FCCTCTYZEZCRXZERTXCTYOCTYO");
  return (
    <>
      <div className="_title">
        <h1>My Reviews</h1>
      </div>

      <>
        {currentUserReviews && currentUserReviews.length !== 0
          ? [...currentUserReviews].reverse().map((review) => (
              <div className="review_container" key={review.review._id}>
                <div className="hotel_image">
                  <img src={review.hotelImages} alt={review.hotelName} />
                </div>
                <div className="review_content">
                  <div className="review_content_header">
                    <h4>{review.hotelName}</h4>
                    <p>{formatDate(review.review.createdAt)}</p>
                  </div>
                  <div className="review_content_body">
                    <p>{review.review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          : "NO Reviews Posted Yet"}
      </>
    </>
  );
};
