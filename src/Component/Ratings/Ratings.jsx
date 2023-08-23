import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Ratings.css";

const Ratings = ({ setMyRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    setMyRating(rating);
  }, [rating]);

  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              size={22}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </>
  );
};

export default Ratings;
