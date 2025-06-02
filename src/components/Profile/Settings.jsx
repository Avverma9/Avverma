import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import Profile from './Profile';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PiTicketThin } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineRateReview } from 'react-icons/md';
import { ConfirmBooking } from '../Bookings/Bookings';
import Reviews from './Review';
import UpdatePage from './UpdatePage';
import Complaint from './complaint/form';
import { Info } from '@mui/icons-material';

const Settings = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const paths = [
    '/bookings',
    '/reviews',
    '/complaints',
    '/profile',
    '/profile-update/user-data/page',
  ];
  if (!paths.includes(location.pathname)) return null;

  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <nav className={styles.nav}>
          <ul className={`${styles.menu} ${isMenuOpen ? styles.menuVisible : styles.menuHidden}`}>
            <li className={styles.menuItem}>
              <a href="/profile" onClick={() => setMenuOpen(false)}>
                <CgProfile style={{ marginRight: '6px' }} /> Profile
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="/bookings" onClick={() => setMenuOpen(false)}>
                <PiTicketThin style={{ marginRight: '6px' }} /> Hotel Bookings
              </a>
            </li>
             <li className={styles.menuItem}>
              <a href="/tour-bookings" onClick={() => setMenuOpen(false)}>
                <PiTicketThin style={{ marginRight: '6px' }} /> Tour Bookings
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="/complaints" onClick={() => setMenuOpen(false)}>
                <Info style={{ marginRight: '6px' }} /> Complaint
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="/reviews" onClick={() => setMenuOpen(false)}>
                <MdOutlineRateReview style={{ marginRight: '6px' }} /> Reviews
              </a>
            </li>
          </ul>
        </nav>
        <button className={styles.toggleButton} onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <AiOutlineCloseCircle size={24} /> : <HiOutlineMenuAlt2 size={24} />}
        </button>
      </header>

      <main className={`${styles.content} ${!isMenuOpen ? styles.fullWidth : ''}`}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<ConfirmBooking />} />
           <Route path="/tour-bookings" element={<ConfirmBooking />} />
          <Route path="/complaints" element={<Complaint />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile-update/user-data/page" element={<UpdatePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Settings;
