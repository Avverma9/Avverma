import React, { useState, useEffect } from "react";
import "./sliderimg.css";
import { Link } from "react-router-dom";

function Imgslide({ resultId }) {
  const [images, setImages] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://hotel-backend-tge7.onrender.com/get/main/get/hotels"
        );
        const data = await response.json();

        // Find the hotel with the matching resultId
        const hotel = data.find((result) => result._id === resultId);

        // Set images for the specific hotel only
        if (hotel) {
          setImages(hotel.images);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, [resultId]); // Add resultId as a dependency to trigger the effect when it changes

  const goToNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousSlide = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="slider-img">
      {images.length > 0 && (
        <div className="slider-container01">
          <Link to={`/hotels/${resultId}`}>
            <img
              src={images[slideIndex]}
              alt={`Slide ${slideIndex + 1}`}
              style={{ display: "block" }}
            />
          </Link>
          <div className="slider-arrows01">
            <div
              className="slider-arrow-left-arrow"
              onClick={goToPreviousSlide}
            >
              &lt;
            </div>
            <div className="slider-arrow-right-arrow" onClick={goToNextSlide}>
              &gt;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Imgslide;
