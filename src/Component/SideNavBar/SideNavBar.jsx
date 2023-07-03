import React from 'react'
import "./SideNavBar.css"

export const SideNavBar = () => {

    const navLists = ["Profile", "Live Auction", "Upcoming Auction", "User", "Auction", "Your Wins", "Bidding Status"]

    return (
        <section className="side_nav_container">
            <div className="side_nav_header">
                <h1>Dashboard</h1>
            </div>
            <div className="side_nav_body">
                <ul>
                    {navLists.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
