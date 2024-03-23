import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'; // Import social and location icons
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/");
    };

    const location = useLocation();
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    // Define Indian cities
    const indianCities = [
        { name: "Mumbai", id: 1 },
        { name: "Delhi", id: 2 },
        { name: "Bangalore", id: 3 },
        { name: "Chennai", id: 4 },
        { name: "Kolkata", id: 5 },
        { name: "Hyderabad", id: 6 },
        { name: "Pune", id: 7 },
        { name: "Ahmedabad", id: 8 },
        { name: "Jaipur", id: 9 },
        { name: "Surat", id: 10 },
        { name: "Lucknow", id: 11 },
        { name: "Kanpur", id: 12 },
        { name: "Nagpur", id: 13 },
        { name: "Indore", id: 14 },
        { name: "Thane", id: 15 },
        { name: "Bhopal", id: 16 }
    ];

    // Divide cities into four sections
    const sections = [];
    for (let i = 0; i < 4; i++) {
        sections.push(indianCities.slice(i * 4, i * 4 + 4));
    }

    return (
        <footer className="custom-footer">
            <Container>
                <Row className="align-items-start">
                    {/* Logo on the left */}
                    <Col md={3} className="text-md-left" onClick={handleRedirect} style={{ cursor: "pointer" }}>
                        <img
                            src="https://www.reshot.com/preview-assets/icons/4DE7B2XR9S/hotel-sign-4DE7B2XR9S.svg"
                            alt="Hotel Logo"
                            height="80"
                            className="d-inline-block align-top"
                        />
                        Hotel roomsstay
                    </Col>

                    {/* Social icons at the top-middle */}
                    <Col md={6} className="text-md-center">
                        {/* Social icons with added margin between them */}
                        <div className="mt-3 d-flex justify-content-center">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black mx-2">
                                <FaFacebook size={35} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black mx-2">
                                <FaTwitter size={35} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black mx-2">
                                <FaInstagram size={35} />
                            </a>
                        </div>
                    </Col>
                </Row>

                {/* Four Sections with Indian Cities */}
                <Row className="mt-3">
                    {sections.map((section, index) => (
                        <Col key={index} md={3}>
                            {/* <h5>Section {index + 1}</h5> */}
                            <ul className="list-unstyled">
                                {section.map(city => (
                                    <li key={city.id}><FaMapMarkerAlt /> Hotels in {city.name}</li>
                                ))}
                            </ul>
                        </Col>
                    ))}
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
