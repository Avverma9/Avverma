import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";
import { Carousel } from "react-bootstrap";
import baseURL from "../baseURL";

const CarouselPage = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/second/carousel`);
        setCarouselData(response.data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchCarouselData();
  }, []);
  const location = useLocation();
  if (location.pathname !== "/") {
    return null;
  }
  return (
    <Carousel>
      {carouselData.map((item, index) =>
        item.images.map((image, imgIndex) => (
          <Carousel.Item key={imgIndex}>
            <img
              className="d-block w-100"
              src={image}
              alt={`${item.description} - Image ${imgIndex + 1}`}
            />
            <Carousel.Caption>
              <h5>{item.description}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
};

export default CarouselPage;
