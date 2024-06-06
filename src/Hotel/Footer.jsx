// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'; // Import social and location icons
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Footer.css'; // Import the CSS file

// const Footer = () => {
//     const navigate = useNavigate();
//     const handleRedirect = () => {
//         navigate("/");
//     };

//     const location = useLocation();
//     if (location.pathname === "/login" || location.pathname === "/register") {
//         return null;
//     }

//     // Define Indian cities
//     const indianCities = [
//         { name: "Mumbai", id: 1 },
//         { name: "Delhi", id: 2 },
//         { name: "Bangalore", id: 3 },
//         { name: "Chennai", id: 4 },
//         { name: "Kolkata", id: 5 },
//         { name: "Hyderabad", id: 6 },
//         { name: "Pune", id: 7 },
//         { name: "Ahmedabad", id: 8 },
//         { name: "Jaipur", id: 9 },
//         { name: "Surat", id: 10 },
//         { name: "Lucknow", id: 11 },
//         { name: "Kanpur", id: 12 },
//         { name: "Nagpur", id: 13 },
//         { name: "Indore", id: 14 },
//         { name: "Thane", id: 15 },
//         { name: "Bhopal", id: 16 }
//     ];

//     // Divide cities into four sections
//     const sections = [];
//     for (let i = 0; i < 4; i++) {
//         sections.push(indianCities.slice(i * 4, i * 4 + 4));
//     }

//     return (
//         <footer className="custom-footer">
//             <Container>
//                 <Row className="align-items-start">
//                     {/* Logo on the left */}
//                     <Col md={3} className="text-md-left" onClick={handleRedirect} style={{ cursor: "pointer" }}>
//                         <img
//                             src="https://www.reshot.com/preview-assets/icons/4DE7B2XR9S/hotel-sign-4DE7B2XR9S.svg"
//                             alt="Hotel Logo"
//                             height="80"
//                             className="d-inline-block align-top"
//                         />
//                         Hotel roomsstay
//                     </Col>

//                     {/* Social icons at the top-middle */}
//                     <Col md={6} className="text-md-center">
//                         {/* Social icons with added margin between them */}
//                         <div className="mt-3 d-flex justify-content-center">
//                             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black mx-2">
//                                 <FaFacebook size={35} />
//                             </a>
//                             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black mx-2">
//                                 <FaTwitter size={35} />
//                             </a>
//                             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black mx-2">
//                                 <FaInstagram size={35} />
//                             </a>
//                         </div>
//                     </Col>
//                 </Row>

//                 {/* Four Sections with Indian Cities */}
//                 <Row className="mt-3">
//                     {sections.map((section, index) => (
//                         <Col key={index} md={3}>
//                             {/* <h5>Section {index + 1}</h5> */}
//                             <ul className="list-unstyled">
//                                 {section.map(city => (
//                                     <li key={city.id}><FaMapMarkerAlt /> Hotels in {city.name}</li>
//                                 ))}
//                             </ul>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </footer>
//     );
// };

// export default Footer;
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
    <footer className="footer">
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
            <p className="footer-copy">© 2013-2022 Oravel Stays Limited</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
