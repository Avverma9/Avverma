import React from "react";
import "./Footer.css"; // Import your custom styles for the footer

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Company</h2>
          <ul>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Hotels</h2>
          <ul>
            <li>
              <a href="/search/results/jaipur">Hotels in Jaipur</a>
            </li>
            <li>
              <a href="/search/results/agra">Hotels in Agra</a>
            </li>
            {/* Add more hotel links as needed */}
          </ul>
        </div>

        <div className="footer-section">
          <h2>More Hotels</h2>
          <ul>
            <li>
              <a href="/search/results/dehradun">Hotels in Dehradun</a>
            </li>
            <li>
              <a href="/search/results/haridwar">Hotels in Haridwar</a>
            </li>
            {/* Add more hotel links as needed */}
          </ul>
        </div>

        <div className="footer-section">
          <h2>Services</h2>
          <ul>
            <li>
              <a href="#!">Hotel & Rooms</a>
            </li>
            <li>
              <a href="#!">Locations & Tour</a>
            </li>
            {/* Add more service links as needed */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright © HotelRoomsStay, 2023<br />
          All Rights Reserved, Developed By Avverma.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
