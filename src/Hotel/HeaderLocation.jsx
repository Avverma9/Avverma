import React, { useEffect, useState } from "react";
import baseURL from "../baseURL";
import "./HeaderTravel.css"; // Import the provided CSS file
import { useLocation } from "react-router-dom";

const HeaderTravel = () => {
  const [locations, setLocations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const path = useLocation();

  useEffect(() => {
    // Fetch travel locations and images when the component mounts
    fetch(`${baseURL}/get-all/travel/location`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array of locations with 'location' and 'images' keys
        setLocations(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault(); // Prevent the default behavior of the wheel event

      const delta = event.deltaY;

      if (delta > 0) {
        // Scrolling down
        setCurrentIndex((prevIndex) =>
          prevIndex < locations.length - 1 ? prevIndex + 1 : 0
        );
      } else if (delta < 0) {
        // Scrolling up
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : locations.length - 1
        );
      }
    };

    // Attach the event listener to the container
    const container = document.querySelector(".header");

    if (container) {
      container.addEventListener("wheel", handleWheel);

      // Cleanup the event listener on component unmount
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [locations, currentIndex]);
  const location = useLocation();
  const paths = ["/search/hotels", "/search", "/"];

  if (!paths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="header">
      {locations.map((location, index) => (
        <div
          key={index}
          className={`city ${index === currentIndex ? "active" : ""}`}
        >
          <div className="image-container">
            {/* Assuming 'images' is an array of image URLs */}
            {location.images.map((image, imageIndex) => (
              <img
                key={imageIndex}
                className="circle"
                src={image}
                alt={`City Image ${imageIndex + 1}`}
              />
            ))}
          </div>
          <div className="city-name">{location.location}</div>
        </div>
      ))}
    </div>
  );
};

export default HeaderTravel;
