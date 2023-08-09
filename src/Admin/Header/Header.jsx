import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiMobile1 } from "react-icons/ci";
import { BsHouse, BsPlay } from "react-icons/bs";
import { FiTool } from "react-icons/fi";

import { FaRegBell } from "react-icons/fa";

import {AiOutlineLogin} from "react-icons/ai"
import './Header.css'

function NavScrollExample() {
 

  return (
     <Navbar
      expand="lg"
      className="bg-body-tertiary header fixed-top" // Add the 'fixed-top' class to make the header fixed
    >
      <Container fluid>
         <Navbar.Brand href="/">
          <img
            src={"https://avvermabucket.s3.ap-south-1.amazonaws.com/1691152186859-logo512-removebg-preview.png"}
             alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/videos" className="home-nav">
              <BsHouse className="home-logo" />
              Home
            </Nav.Link>
            <Nav.Link href="/videos" className="videos-nav">
              <BsPlay className="video-logo" />
              Recents
            </Nav.Link>
            <NavDropdown title="Hotel" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/gethotels" className="drop-menu">
                <CiMobile1 />
                Add Hotel
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/viewhotels" className="drop-menu">
                <CiMobile1 /> View Hotels
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tools" className="drop-menu">
                <FiTool /> Delete Hotel
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tools" className="drop-menu">
                <FiTool /> Tools
              </NavDropdown.Item>
            </NavDropdown>
            {/* second dropdown of become a partner */}
            <NavDropdown title="Partners" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/gethotels" className="drop-menu">
                <CiMobile1 />
                View Partners
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/viewhotels" className="drop-menu">
                <CiMobile1 /> View Hotels
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tools" className="drop-menu">
                <FiTool /> Delete Hotel
              </NavDropdown.Item>
    
      
            </NavDropdown>
            {/* end of partner */}
            {/* offers */}
            <NavDropdown title="Offers" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/addoffers" className="drop-menu">
                <CiMobile1 />
                Add Offers
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/checkoffers" className="drop-menu">
                <CiMobile1 /> Check Offers
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tools" className="drop-menu">
                <FiTool /> Delete Hotel
              </NavDropdown.Item>
           
            </NavDropdown>
            {/* Offers */}
         
          
          
    <Nav.Link href="/login" >
              <AiOutlineLogin className="link-logo" /> Login/register
            </Nav.Link>
            <Nav.Link href="/notification" disabled>
              <FaRegBell className="link-logo" />
            </Nav.Link>
            <Nav.Link>
    </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;