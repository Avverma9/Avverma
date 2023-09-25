/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./_profile.css";
import { getLocalStorage } from "../../hooks/useLocalStorage";

import { Sidebar } from "./Sidebar";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const userDetails = getLocalStorage("loggedUser");

    if (!isSignedIn) {
      navigate("/signin");
    } else {
      if (!userDetails) {
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
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [navigate]);

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

  return (
    <>
      <div className="profile_container">
        <div className="profile_sidebar">
          <Sidebar
            userData={userData}
            isSignedIn={isSignedIn}
            userDetails={userDetails}
            logOut={logOut}
            selectedNav={selectedNav}
            setSelectedNav={setselectedNav}
          />
        </div>
        <div className="profile_body">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
