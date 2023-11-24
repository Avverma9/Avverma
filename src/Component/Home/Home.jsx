import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const location = useLocation()
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://hotel-backend-tge7.onrender.com/get/second/carousel"
        );
        const data = await response.json();
        const allImages = data.map((result) => result.images).flat();
        setImages(allImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Set up autoplay
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => {
      // Clear the interval when the component updates
      clearInterval(intervalRef.current);
    };
  }, [currentIndex, images.length]);
  if (location.pathname !== "/") {
    return null;
  }
  if (!images.length) {
    return null;
  }

  return (
    <div className="slide-container">
      <div className="swiper-container">
        {images.map((item, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentIndex ? "active" : ""}`}
          >
            <img src={item} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
