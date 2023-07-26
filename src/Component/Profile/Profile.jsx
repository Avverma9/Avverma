/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./_profile.css";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import Avatar from "react-avatar";
import { FaUser, FaAddressBook, FaTelegramPlane } from "react-icons/fa";
import {
  MdFolderShared,
  MdKeyboardArrowRight,
  MdOutlineError,
  MdFactCheck,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { HiIdentification } from "react-icons/hi";
import { BsFillCalendarCheckFill, BsFillCreditCardFill } from "react-icons/bs";
import { TiCancel, TiTick } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";
import { useCollapse } from "react-collapsed";
import { convertDate } from "../../utils/convertDate";

import { Sidebar } from "./Sidebar";
import { ProfileInformation } from "./ProfileInformation";
import { AddressInformation } from "./AddressInformation";
import { GovernmentIdInformation } from "./GovernmentIdInformation";
import { CancelBooking } from "./CancelBooking";
import { ConfirmBooking } from "./ConfirmBooking";
import { CheckingBooking } from "./CheckingBooking";
import { CheckOutBooking } from "./CheckOutBooking";
import { NoShowBooking } from "./NoShowBooking";
import { FailedBooking } from "./FailedBooking";
import { MyReviewSection } from "./MyReviewSection";
import { ComplaintsSection } from "./ComplaintsSection";

const Profile = ({ reset, refresh }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);

  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const userDetails = getLocalStorage("loggedUser");

    if (!isSignedIn && !userDetails) {
      navigate("/signin");
    } else {
      const userId = localStorage.getItem("userId");
      fetch(`https://hotel-backend-tge7.onrender.com/get/${userId}`)
        .then((response) => {
          console.log(response, "RESPONSE");
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((data) => {
          console.log(data, "API CHANGES NEW LOG");
          setUserData(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [navigate, reset]);

  const userDetails = getLocalStorage("loggedUser");
  const isSignedIn = getLocalStorage("isSignedIn");

  console.log(userDetails, "USERDETAILS");
  console.log(userData, "USERDATA");

  const logOut = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  const [selectedNav, setselectedNav] = useState("Profile Information");

  // const navHandler = (e) => {
  //   setselectedNav("");
  //   console.log(e.currentTarget, "NAV HANDLER");
  //   if (
  //     e.currentTarget.innerText === "Profile Information" ||
  //     e.currentTarget.firstChild.innerText === "Profile Information"
  //   ) {
  //     setselectedNav("Profile Information");
  //   } else if (
  //     e.currentTarget.innerText === "Mannage Addresses" ||
  //     e.currentTarget.firstChild.innerText === "Mannage Addresses"
  //   ) {
  //     setselectedNav("Mannage Addresses");
  //   } else if (
  //     e.currentTarget.innerText === "Add Government id" ||
  //     e.currentTarget.firstChild.innerText === "Add Government id"
  //   ) {
  //     setselectedNav("Add Government id");
  //   } else if (
  //     e.currentTarget.innerText === "Cancel Booking" ||
  //     e.currentTarget.firstChild.innerText === "Cancel Booking"
  //   ) {
  //     setselectedNav("Cancel Booking");
  //   } else if (
  //     e.currentTarget.innerText === "Confirm Booking" ||
  //     e.currentTarget.firstChild.innerText === "Confirm Booking"
  //   ) {
  //     setselectedNav("Confirm Booking");
  //   } else if (
  //     e.currentTarget.innerText === "Checking Booking" ||
  //     e.currentTarget.firstChild.innerText === "Checking Booking"
  //   ) {
  //     setselectedNav("Checking Booking");
  //   } else if (
  //     e.currentTarget.innerText === "Check Out Booking" ||
  //     e.currentTarget.firstChild.innerText === "Check Out Booking"
  //   ) {
  //     setselectedNav("Check Out Booking");
  //   } else if (
  //     e.currentTarget.innerText === "NoShow Booking" ||
  //     e.currentTarget.firstChild.innerText === "NoShow Booking"
  //   ) {
  //     setselectedNav("NoShow Booking");
  //   } else if (
  //     e.currentTarget.innerText === "Failed Booking" ||
  //     e.currentTarget.firstChild.innerText === "Failed Booking"
  //   ) {
  //     setselectedNav("Failed Booking");
  //   } else if (
  //     e.currentTarget.innerText === "My Reviews" ||
  //     e.currentTarget.lastChild.innerText === "My Reviews"
  //   ) {
  //     setselectedNav("My Reviews");
  //   } else if (
  //     e.currentTarget.innerText === "Complaints" ||
  //     e.currentTarget.lastChild.innerText === "Complaints"
  //   ) {
  //     setselectedNav("Complaints");
  //   } else {
  //     setselectedNav("Profile Information");
  //   }
  // };

  return (
    <>
      {/* {show && <UpdateProfile userData={userData} stShow={setShow} show={show} handleClose={handleClose} setProfileUpdated={setProfileUpdated} />} */}
      <div className="profile_container">
        <div className="profile_sidebar">
          <Sidebar
            userData={userData}
            isSignedIn={isSignedIn}
            userDetails={userDetails}
            logOut={logOut}
            selectedNav={selectedNav}
            setSelectedNav={setselectedNav}
            // navHandler={navHandler}
            reset={reset}
            refresh={refresh}
          />
        </div>
        <div className="profile_body" key={refresh}>
          {/* {selectedNav === "Profile Information" ? ( */}
          {/* <ProfileInformation
              handleShow={handleShow}
              userData={userData}
              isSignedIn={isSignedIn}
              userDetails={userDetails}
              reset={reset}
              refresh={refresh}
            /> */}
          {/* ) : selectedNav === "Mannage Addresses" ? ( */}
          {/* <AddressInformation
              userData={userData}
              reset={reset}
              refresh={refresh}
            /> */}
          {/* ) : selectedNav === "Add Government id" ? ( */}
          {/* <GovernmentIdInformation
              userData={userData}
              reset={reset}
              refresh={refresh}
            /> */}
          {/* ) : selectedNav === "Cancel Booking" ? ( */}
          {/* <CancelBooking /> */}
          {/* ) : selectedNav === "Confirm Booking" ? ( */}
          {/* <ConfirmBooking /> */}
          {/* ) : selectedNav === "Checking Booking" ? ( */}
          {/* <CheckingBooking /> */}
          {/* ) : selectedNav === "Check Out Booking" ? ( */}
          {/* <CheckOutBooking /> */}
          {/* ) : selectedNav === "NoShow Booking" ? ( */}
          {/* <NoShowBooking /> */}
          {/* ) : selectedNav === "Failed Booking" ? ( */}
          {/* <FailedBooking /> */}
          {/* ) : selectedNav === "My Reviews" ? ( */}
          {/* <MyReviewSection /> */}
          {/* ) : selectedNav === "Complaints" ? ( */}
          {/* <ComplaintsSection
              userData={userData}
              reset={reset}
              refresh={refresh}
              isSignedIn={isSignedIn}
            /> */}
          {/* ) : ( */}
          {/* <ProfileInformation
              handleShow={handleShow}
              userData={userData}
              isSignedIn={isSignedIn}
              userDetails={userDetails}
              reset={reset}
              refresh={refresh}
            /> */}
          {/* )} */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
