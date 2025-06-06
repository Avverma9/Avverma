import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { hotelList } from '../utils/extrasList';

// Utility to split into chunks
const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const Footer = () => {
    const navigate = useNavigate();
    const chunks = chunkArray(hotelList, 10); // now hotelList is array of objects
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
                    {chunks.map((chunk, index) => (
                        <div key={index} className="col-md-3">
                            <h5>&nbsp;</h5>
                            <ul className="list-unstyled">
                                {chunk.map((hotel, subIndex) => (
                                    <li key={subIndex}>
                                        <a
                                            href="#"
                                            className="footer-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/search?search=${hotel.path.replace('/', '').replace(/\s+/g, '+')}`);
                                                ;
                                            }}
                                        >
                                            {hotel.hotel}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="row mb-4">
                    <div className="col-md-12 d-flex justify-content-center">
                        <a href="#" className="social-icon mx-2"><FaFacebook size={24} /></a>
                        <a href="#" className="social-icon mx-2"><FaInstagram size={24} /></a>
                        <a href="#" className="social-icon mx-2"><FaTwitter size={24} /></a>
                        <a href="#" className="social-icon mx-2"><FaYoutube size={24} /></a>
                        <a href="#" className="social-icon mx-2"><FaPinterest size={24} /></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="footer-copy">© 2023-2024 Hotel-roomsstay Pvt Limited</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
