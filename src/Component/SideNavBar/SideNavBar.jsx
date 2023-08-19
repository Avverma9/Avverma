import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";

import {
  homeIcon,
  profileIcon,
  notificationIcon,
  mannageAuctionIcon,
  mannageBuyerIcon,
  mannageAdminIcon,
  dashboardIcon,
  settingsIcon,
  searchIcon,
  filterIcon,
} from "../../assets";
import "./SideNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useCollapse } from "react-collapsed";
import { upperCase } from "../../utils";
import { Logout } from "../Login/Logout";

const Home = () => {
  return (
    <>
      <li>
        <Link to="/">
          {" "}
          <img src={homeIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/">
          <p>{upperCase("Home")}</p>
        </Link>
      </li>
    </>
  );
};

const Profile = () => {
  return (
    <>
      <li>
        <Link to="/profile">
          {" "}
          <img src={profileIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/profile">
          <p>{upperCase("Profile")}</p>
        </Link>
      </li>
    </>
  );
};

const PushNotification = () => {
  return (
    <>
      <li>
        <Link to="/push-notification">
          {" "}
          <img src={notificationIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/push-notification">
          <p>{upperCase("Push Notification")}</p>
        </Link>
      </li>
    </>
  );
};

const Dashboard2 = () => {
  return (
    <>
      <li>
        <Link to="/">
          {" "}
          <img src={dashboardIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/dashboard">
          <p>{upperCase("Dashboard")}</p>
        </Link>
      </li>
    </>
  );
};
const Setting2 = () => {
  return (
    <>
      <li>
        <Link to="/settings">
          {" "}
          <img src={settingsIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/settings">
          <p>{upperCase("Settings")}</p>
        </Link>
      </li>
    </>
  );
};

const Auction = () => {
  // const [isExpanded, setExpanded] = useState(false);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <>
      <li
      // {...getToggleProps({
      //   onClick: () => setExpanded((prevExpanded) => !prevExpanded),
      // })}
      >
        <Link>
          {" "}
          <img src={mannageAuctionIcon} alt="icon" srcset="" />
        </Link>
        <Link>
          <p>Auction</p>
        </Link>
      </li>
      {/* <div {...getCollapseProps()}>
        <ul>
          <li>
            <Link to="/search">
              {" "}
              <img src={searchIcon} alt="icon" srcset="" />
            </Link>
            <Link to="/search">
              <p>Search</p>
            </Link>
          </li>
          <li>
            <Link to="/filter-auction">
              {" "}
              <img src={filterIcon} alt="icon" srcset="" />
            </Link>
            <Link to="/filter-auction">
              <p>Filter Auction</p>
            </Link>
          </li>
          <li>
            <Link to="/add-auction">
              {" "}
              <img src={mannageAuctionIcon} alt="icon" srcset="" />
            </Link>
            <Link to="/add-auction">
              <p>Add New Auction</p>
            </Link>
          </li>
          <li>
            <Link to="/import-auction">
              {" "}
              <img src={mannageAuctionIcon} alt="icon" srcset="" />
            </Link>
            <Link to="/import-auction">
              <p>Import Bulk Auction</p>
            </Link>
          </li>
        </ul>
      </div> */}
    </>
  );
};

const MannageAuction = () => {
  // const [isExpanded, setExpanded] = useState(false);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <>
      <li
      // {...getToggleProps({
      //   onClick: () => setExpanded((prevExpanded) => !prevExpanded),
      // })}
      >
        <Link to="/mannage-auction">
          {" "}
          <img src={mannageAuctionIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/mannage-auction">
          <p>{upperCase("Mannage Auction")}</p>
        </Link>
      </li>
      {/* <div {...getCollapseProps()}>
        <ul className="sub_list-ul">
          <li>
            <Link to="/dashboard">
              {" "}
              <img src={dashboardIcon} alt="icon" srcset="" />
            </Link>
            <Link to="/dashboard">
              <p>Dashboard</p>
            </Link>
          </li>
          <Auction />
          <li>
            <Link to="/settings">
              {" "}
              <img src={settingsIcon} alt="icon" srcset="" />
            </Link>
            <Link to="/settings">
              <p>Settings</p>
            </Link>
          </li>
        </ul>
      </div> */}
    </>
  );
};

const MannageBuyer = () => {
  return (
    <>
      <li>
        <Link to="/mannage-buyer">
          {" "}
          <img src={mannageAdminIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/mannage-buyer">
          <p>{upperCase("Mannage Buyer")}</p>
        </Link>
      </li>
    </>
  );
};

const MannageAdmin = () => {
  return (
    <>
      <li>
        <Link to="/register-sub-admin">
          {" "}
          <img src={mannageBuyerIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/register-sub-admin">
          <p>{upperCase("Mannage Admin")}</p>
        </Link>
      </li>
    </>
  );
};

export const SideNavBar = () => {
  return (
    <section className="side_nav_container">
      <div className="side_nav_header">
        <h1>Dashboard</h1>
      </div>
      <div className="side_nav_body">
        <ul>
          <Home />

          <Dashboard2 />
          <MannageAuction />
          <Setting2 />
          <MannageBuyer />
          <MannageAdmin />

          <Profile />
          <PushNotification />
          <Logout />
        </ul>
      </div>
    </section>
  );
};
