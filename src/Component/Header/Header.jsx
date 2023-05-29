import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsHouse, BsPerson, BsEnvelope, BsBoxArrowInRight } from 'react-icons/bs';
import styles from  './header.module.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header>
        <nav className={`${styles.nav} ${showMenu ? styles.show : ''}`}>
          <div className={styles.logo}>
            <img src="https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/1685090244811-Hotel-removebg-preview.png" alt="Logo" />
          </div>
          <div className={styles['search-bar']}></div>
          <div className={styles['menu-toggle']} onClick={toggleMenu}>
            <div className={styles.hamburger}></div>
          </div>
          <ul>
            <li>
              <a href="/register">
                <BsBoxArrowInRight /> Register/Login
              </a>
            </li>
            <li>
              <a href="/about">
                <BsPerson /> Become a Partner
              </a>
            </li>
            <li>
              <a href="/">
                <BsHouse /> Home
              </a>
            </li>
            <li>
              <a href="/profile">
                <BsPerson /> Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
