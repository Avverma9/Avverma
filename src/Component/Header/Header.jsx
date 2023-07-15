/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import { BsHouse, BsPerson, BsBoxArrowInRight } from "react-icons/bs";
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";
import { Link } from "react-router-dom";
// import styles from "./header.module.css";
import "./Header.css";

const Header = () => {
  // const [showMenu, setShowMenu] = useState(false);

  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };

  return (
    <>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="_nav-logo"
              src="https://www.freepnglogos.com/uploads/hotel-logo-png/download-building-hotel-clipart-png-33.png"
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item p-0">
              <Link
                  className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                  to="/home"
                >
                  <BsHouse /> <>Home</>
                </Link>
              </li>
              <li className="nav-item dropdown p-0">
              <Link
                  className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                  to="/profile"
                >
                  <BsPerson /> <>Profile</>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/partner">
                      Hotel Partner
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="">
                      Tour Partner
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown p-0">
                <Link
                  className="fw-normal nav-link dropdown-toggle d-flex justify-content-center-lg align-items-center p-0 gap-1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdOutlineUnfoldMoreDouble />
                  <>More</>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Complaints
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Option 2
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item p-0">
              <Link
                  className="fw-normal nav-link dropdown-toggle d-flex justify-content-center-lg align-items-center p-0 gap-1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsPerson />
                  <>Become a Partner</>
                </Link>
              </li>
              <li className="nav-item p-0">
              <Link
                  className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                  to="/register"
                >
                  <BsBoxArrowInRight /> <>Register/Login</>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
