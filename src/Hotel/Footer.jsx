import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Custom styles for the footer
import { hotelList } from "../utils/FooterList";

// Utility function to split array into chunks
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine marginTop based on the path
  let marginTop;
  switch (path) {
    case "/bookings":
      marginTop = "400px"; // Example value for '/login'
      break;
    case "/profile":
      marginTop = "300px"; // Example value for '/register'
      break;
    case "/partner":
      marginTop = "200px"; // Example value for '/partner'
      break;
    // Add more cases as needed
    default:
      marginTop = "250px"; // Default margin for other paths
  }

  const chunks = chunkArray(hotelList, 10); // Split hotelList into chunks of 10

  return (
    <footer className="footer" style={{ marginTop }}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6 text-center text-md-start">
            <a href="#" className="app-store-link">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
              />
            </a>
            <a href="#" className="app-store-link">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
              />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr className="footer-divider" />
          </div>
        </div>
        <div className="row mb-4">
          {chunks.map((chunk, index) => (
            <div key={index} className="col-md-3">
              <h5>&nbsp;</h5>
              <ul className="list-unstyled">
                {chunk.map((hotel, subIndex) => (
                  <li key={subIndex}>
                    <a href="#" className="footer-link">
                      {hotel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="row mb-4">
          <div className="col-md-12 d-flex justify-content-center">
            <a href="#" className="social-icon mx-2">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="social-icon mx-2">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="social-icon mx-2">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="social-icon mx-2">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="social-icon mx-2">
              <FaPinterest size={24} />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="footer-copy">
              © 2023-2024 Hotel-roomsstay Pvt Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
