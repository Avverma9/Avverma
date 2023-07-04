import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./SideNavBar.css";

export const SideNavBar = () => {
    const navLists = [
        { name: "Profile", icon: <FaUserCircle />, path: "/" },
        { name: "Live Auction", icon: <FaUserCircle />, path: "/live-auction" },
        {
            name: "Upcoming Auction",
            icon: <FaUserCircle />,
            path: "/upcoming-auction",
        },
        { name: "User", icon: <FaUserCircle />, path: "/user" },
        { name: "Auction", icon: <FaUserCircle />, path: "/auction" },
        { name: "Your Wins", icon: <FaUserCircle />, path: "/wins" },
        { name: "Bidding Status", icon: <FaUserCircle />, path: "/bidding-status" },
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
                            {item.icon}
                            <p>
                                {" "}
                                <a href={`${item.path}`}>{item.name}</a>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
