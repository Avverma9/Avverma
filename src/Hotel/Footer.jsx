import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Custom styles for the footer

const Footer = () => {
  return (
    <footer className="footer" style={{ marginTop: "140px" }}>
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
          <div className="col-md-3">
            <h5>Roomsstay Hotels</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Hotels near me
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Manali
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Nainital
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Mount Abu
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Agra
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Haridwar
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Gurgaon
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Coimbatore
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Roomsstay Hotel UK
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Roomsstay Vacation Homes in Europe
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>&nbsp;</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Hotels in Goa
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Udaipur
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Lonavala
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Kodaikanal
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Gangtok
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Kolkata
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Mandarmoni
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Kasauli
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Roomsstay Hotel USA
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Homes in Scandinavia
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>&nbsp;</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Hotels in Puri
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Mussoorie
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Munnar
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Hyderabad
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Coorg
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Ahmedabad
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Daman
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Dehradun
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Roomsstay Hotel Mexico
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Homes in Southern Europe
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>&nbsp;</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Hotels in Shimla
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Mumbai
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Darjeeling
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Shirdi
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Dalhousie
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Varanasi
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Hotels in Madurai
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Coupons
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Roomsstay Hotel Indonesia
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Traum Holiday Homes
                </a>
              </li>
            </ul>
          </div>
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
