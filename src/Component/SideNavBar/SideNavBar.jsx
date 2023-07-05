import React from "react";
import {
  auction,
  bid,
  liveauction,
  upcomingauction,
  profile,
  win,
  user,
} from "../../assets";
import "./SideNavBar.css";
import { Link } from "react-router-dom";

export const SideNavBar = () => {
  const navLists = [
    {
      name: "Profile",
      icon: <img src={user} alt="icon" srcset="" />,
      path: "/",
    },
    {
      name: "Live Auction",
      icon: <img src={liveauction} alt="icon" srcset="" />,
      path: "/live-auction",
    },
    {
      name: "Upcoming Auction",
      icon: <img src={upcomingauction} alt="icon" srcset="" />,
      path: "/upcoming-auction",
    },
    {
      name: "User",
      icon: <img src={profile} alt="icon" srcset="" />,
      path: "/user",
    },
    {
      name: "Auction",
      icon: <img src={auction} alt="icon" srcset="" />,
      path: "/auction",
    },
    {
      name: "Your Wins",
      icon: <img src={win} alt="icon" srcset="" />,
      path: "/wins",
    },
    {
      name: "Bidding Status",
      icon: <img src={bid} alt="icon" srcset="" />,
      path: "/bidding-status",
    },
  ];

  return (
    <section className="side_nav_container">
      <div className="side_nav_header">
        <h1>Dashboard</h1>
      </div>
      <div className="side_nav_body">
        <ul>
          {navLists.map((item, index) => (
            <li key={index}>
              <Link to={item.path}> {item.icon}</Link>
              <Link to={item.path}>
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
