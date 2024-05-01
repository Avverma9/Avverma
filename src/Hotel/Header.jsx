/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NightShelterTwoToneIcon from "@mui/icons-material/NightShelterTwoTone";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  const handleLoginLogOutButtonView = localStorage.getItem("userId");
  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userMobile");
    localStorage.removeItem("isSignedIn");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        {/* The rest of the content */}
        <a className="navbar-brand" href="/">
          <img
            src="https://www.reshot.com/preview-assets/icons/4DE7B2XR9S/hotel-sign-4DE7B2XR9S.svg"
            alt="Logo"
            width="70"
            height="50"
            className="d-inline-block align-text-top me-2"
          />
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="d-flex align-items-center ">
              {/* Social Icons */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue me-3"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue me-3"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue me-3"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>

            <li>
              <a className="nav-link" href="/profile">
                <FaUser className="me-1" />
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/partner">
                <NightShelterTwoToneIcon className="me-1" />
                Be a partner
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <NightShelterTwoToneIcon className="me-1" />
                Home
              </a>
            </li>

            {handleLoginLogOutButtonView ? (
              <a
                className="nav-link active"
                aria-current="page"
                href="/login"
                onClick={handleLogOut}
              >
                <FaSignOutAlt className="me-1" /> {/* Assuming logout icon */}
                Logout
              </a>
            ) : (
              <a className="nav-link active" aria-current="page" href="/login">
                <FaSignInAlt className="me-1" />
                Login
              </a>
            )}
          </ul>
        </div>
        {/* Move the button to the end */}
        {/* Phone and Email */}

        <div
          className="border border-danger p-2 rounded mx-3"
          style={{ maxWidth: "50%" }}
        >
          <div className="text-center d-flex flex-column align-items-end">
            <div className="mb-2">
              <span style={{ fontSize: "11px" }}>
                Book Now{" "}
                <FaPhoneAlt className="me-2" style={{ fontSize: "18px" }} />{" "}
                9917991758
              </span>
            </div>
            {/* <div>
                <FaEnvelope className="me-2" style={{ fontSize: "13px" }} />
                <span style={{ fontSize: "10px" }}>
                  info@hotelroomsstay.com
                </span>
              </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
