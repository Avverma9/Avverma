import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social icons
import './Footer.css'; // Import the CSS file
import { useNavigate,useLocation } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
   const  handleRedirect =()=>{
    navigate("/")
   }

   const location = useLocation()
   if(location.pathname ==="/login" || location.pathname ==="/register"){
     return null
 }
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="align-items-start">
          {/* Logo on the left */}
          <Col md={3} className="text-md-left" onClick={handleRedirect} style={{cursor:"pointer"}}>
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

        {/* Sections with added margin-top */}
        <Row className="mt-3">
          {/* Section 1 */}
          <Col md={3}>
            <h5>Section 1</h5>
            <ul className="list-unstyled">
              <li>Hotel in City 1</li>
              <li>Hotel in City 2</li>
              <li>Hotel in City 1</li>
              <li>Hotel in City 2</li>
              <li>Hotel in City 1</li>
              <li>Hotel in City 2</li>
              <li>Hotel in City 1</li>
              <li>Hotel in City 2</li>
            </ul>
          </Col>

          {/* Section 2 */}
          <Col md={3}>
            <h5>Section 2</h5>
            <ul className="list-unstyled">
              <li>Hotel in City 3</li>
              <li>Hotel in City 4</li>
            </ul>
          </Col>

          {/* Section 3 */}
          <Col md={3}>
            <h5>Section 3</h5>
            <ul className="list-unstyled">
              <li>Hotel in City 5</li>
              <li>Hotel in City 6</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Section 4</h5>
            <ul className="list-unstyled">
              <li>Hotel in City 5</li>
              <li>Hotel in City 6</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
