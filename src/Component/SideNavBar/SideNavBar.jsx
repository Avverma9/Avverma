import React from 'react'
import { FaUserCircle } from "react-icons/fa"
import "./SideNavBar.css"

export const SideNavBar = () => {

    const navLists = [{ "name": "Profile", "icon": <FaUserCircle /> }, { "name": "Live Auction", "icon": <FaUserCircle /> }, { "name": "Upcoming Auction", "icon": <FaUserCircle /> }, { "name": "User", "icon": <FaUserCircle /> }, { "name": "Auction", "icon": <FaUserCircle /> }, { "name": "Your Wins", "icon": <FaUserCircle /> }, { "name": "Bidding Status", "icon": <FaUserCircle /> }]

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
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
