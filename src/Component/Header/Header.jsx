import React, { useState } from "react";
import { BsHouse, BsPerson, BsBoxArrowInRight } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";
import  {FcCallback} from 'react-icons/fc'
import { Link, useNavigate } from "react-router-dom";
import {CiMail} from 'react-icons/ci'

import "./Header.css";

const Header = () => {
  const isSignedIn = localStorage.getItem("isSignedIn") === "true";
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="_nav-logo"
              src="https://avverma.s3.ap-south-1.amazonaws.com/1700594386565-Untitled-removebg-preview.png"
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
            <ul className="navbar-nav gap-3">
              {!isSignedIn && (
                <li className="nav-item p-0">
                  <div className="d-flex gap-3">
                    <Link
                      className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                      to="/register"
                    >
                      <BsBoxArrowInRight /> <>Register</>
                    </Link>
                    <Link
                      className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                      to="/signin"
                    >
                      <BsBoxArrowInRight /> <>Login</>
                    </Link>
                  </div>
                </li>
              )}

              <>
                <li className="nav-item dropdown p-0">
                  <Link
                    className="fw-normal nav-link dropdown-toggle d-flex justify-content-center-lg align-items-center p-0 gap-1"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaHandHoldingMedical />
                    <>Become a Partner</>
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
                    className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                    to="/profile"
                  >
                    <BsPerson /> <>Profile</>
                  </Link>
                </li>
                <li className="nav-item p-0">
                  <Link
                    className="fw-normal nav-link d-flex justify-content-center-lg align-items-center p-0 gap-1"
                    to="/home"
                  >
                    <BsHouse /> <>Home</>
                  </Link>
                </li>
              </>
            </ul>
          </div>
          <div className="call-details">  <p> Call us <FcCallback/> 9917991758 </p> <hr /> <p> Write us on <CiMail/> info@hotelroomsstay.com</p> </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
