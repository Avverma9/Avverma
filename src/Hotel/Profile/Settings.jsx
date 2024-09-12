import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import styles from "./profile.module.css";
import Profile from "./Profile"; // Import the Profile component
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PiTicketThin } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaInfo } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { ConfirmBooking } from "../Bookings/Bookings";
import Reviews from "./Review";
import UpdatePage from "./UpdatePage";
import Complaint from "./Complaints";
const Settings = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Handle sidebar closing on mobile when navigating
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const paths = [
    "/bookings",
    "/reviews",
    "/complaints",
    "/profile",
    "/profile-update/user-data/page",
  ];

  if (!paths.includes(location.pathname)) {
    return null; // Render nothing if the current path is not in the specified paths
  }

  return (
    <div className={styles.container}>
      <aside
        className={`${styles.sidebar} ${!isSidebarOpen ? styles.hidden : ""}`}
      >
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isSidebarOpen ? <AiOutlineCloseCircle /> : <HiOutlineMenuAlt2 />}
        </button>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <a className={styles.menuItem}>
              <Link to="/profile" onClick={() => setSidebarOpen(false)}>
                <CgProfile
                  style={{
                    height: "22px",
                    marginRight: "10px",
                    marginTop: "4px",
                  }}
                />{" "}
                Profile
              </Link>
            </a>
            <a className={styles.menuItem}>
              <Link to="/bookings" onClick={() => setSidebarOpen(false)}>
                <PiTicketThin
                  style={{
                    height: "22px",
                    marginRight: "10px",
                    marginTop: "4px",
                  }}
                />{" "}
                Bookings
              </Link>
            </a>
            <a className={styles.menuItem}>
              <Link to="/complaints" onClick={() => setSidebarOpen(false)}>
                <FaInfo
                  style={{
                    height: "22px",
                    marginRight: "10px",
                    marginTop: "4px",
                  }}
                />{" "}
                Complaints
              </Link>
            </a>
            <a className={styles.menuItem}>
              <Link to="/reviews" onClick={() => setSidebarOpen(false)}>
                <MdOutlineRateReview
                  style={{
                    height: "22px",
                    marginRight: "10px",
                    marginTop: "4px",
                  }}
                />{" "}
                Reviews
              </Link>
            </a>
          </ul>
        </nav>
      </aside>
      <main
        className={`${styles.content} ${
          !isSidebarOpen ? styles.fullWidth : ""
        }`}
      >
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<ConfirmBooking />} />
          <Route path="/complaints" element={<Complaint />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route
            path="/profile-update/user-data/page"
            element={<UpdatePage />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default Settings;
