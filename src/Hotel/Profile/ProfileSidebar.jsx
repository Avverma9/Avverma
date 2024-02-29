import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaComment,
  FaUserEdit,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./ProfileSidebar.css";
import Profile from "./Profile";
const ProfileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLinkClick = () => {
    // Close the sidebar when a link is clicked
    closeSidebar();
  };
const redirect = ()=>{
  navigate("/profile")
}
  if (
    !location.pathname.startsWith("/profile/") &&
    location.pathname !== "/profile"
  ) {
    return null;
  }

  return (
    <div className={`profile-container ${sidebarOpen ? "toggled" : ""}`}>
      <Profile/>
      <div className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <nav id="sidebar" className={sidebarOpen ? "active" : ""}>
        <div onClick={redirect} className="profile-header">
          <FaUser className="profile-icon" />
          <span className="profile-header-text">Profile</span>
        </div>
        
        <hr />
        <ul className="list-unstyled components">
          <li>
            <Link to="/profile/bookings" onClick={handleLinkClick}>
              <FaBook className="option-icon" />
              Bookings
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/profile/complaints" onClick={handleLinkClick}>
              <FaComment className="option-icon" />
              Complaints
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/profile/update-profile" onClick={handleLinkClick}>
              <FaUserEdit className="option-icon" />
              Update Profile
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/logout" onClick={handleLinkClick}>
              <FaSignOutAlt className="option-icon" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {/* Add an additional container for content inside the sidebar */}
      <div className="sidebar-content">
        {/* Your sidebar content goes here */}
      </div>
    </div>
  );
};

export default ProfileSidebar;
