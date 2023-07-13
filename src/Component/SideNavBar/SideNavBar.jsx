import React, { useState } from "react";
import {
  homeIcon,
  profileIcon,
  notificationIcon,
  mannageAuctionIcon,
  mannageBuyerIcon,
  dashboardIcon,
  settingsIcon,
  searchIcon,
  filterIcon,
} from "../../assets";
import "./SideNavBar.css";
import { Link } from "react-router-dom";
import { useCollapse } from "react-collapsed";

const Home = () => {
  return (
    <>
      <li>
        <Link to="/">
          {" "}
          <img src={homeIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/">
          <p>Home</p>
        </Link>
      </li>
    </>
  );
};

const Profile = () => {
  return (
    <>
      <li>
        <Link to="/">
          {" "}
          <img src={profileIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/">
          <p>Profile</p>
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
          <p>Push Notification</p>
        </Link>
      </li>
    </>
  );
};

const Auction = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <>
      <li
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <Link>
          {" "}
          <img src={mannageAuctionIcon} alt="icon" srcset="" />
        </Link>
        <Link>
          <p>Auction</p>
        </Link>
      </li>
      <div {...getCollapseProps()}>
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
      </div>
    </>
  );
};

const MannageAuction = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <>
      <li
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <Link>
          {" "}
          <img src={mannageAuctionIcon} alt="icon" srcset="" />
        </Link>
        <Link>
          <p>Mannage Auction</p>
        </Link>
      </li>
      <div {...getCollapseProps()}>
        <ul>
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
      </div>
    </>
  );
};

const MannageBuyer = () => {
  return (
    <>
      <li>
        <Link to="/mannage-buyer">
          {" "}
          <img src={mannageBuyerIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/mannage-buyer">
          <p>Mannage Buyer</p>
        </Link>
      </li>
    </>
  );
};

const MannageAdmin = () => {
  return (
    <>
      <li>
        <Link to="/mannage-admin">
          {" "}
          <img src={mannageBuyerIcon} alt="icon" srcset="" />
        </Link>
        <Link to="/mannage-admin">
          <p>Mannage Admin</p>
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
          <MannageAuction />
          <MannageAdmin />
          <MannageBuyer />
          <Profile />
          <PushNotification />
        </ul>
      </div>
    </section>
  );
};
