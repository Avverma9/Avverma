import React, { useState } from 'react';
import './partner.css';
import { useLocation } from 'react-router-dom';

const Partner = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('Hotel Contact Information');

  const navItems = [
    'Hotel Contact Information',
    'Basic Information',
    'Hotel Policy',
    'Hotel Tariff'
  ];

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleNextClick = () => {
    // Get the index of the current activeNavItem
    const currentIndex = navItems.indexOf(activeNavItem);

    // Increment the index to move to the next item
    const nextIndex = currentIndex + 1;

    // Check if nextIndex is within bounds
    if (nextIndex < navItems.length) {
      setActiveNavItem(navItems[nextIndex]);
    }
  };

  const handlePrevClick = () => {
    // Get the index of the current activeNavItem
    const currentIndex = navItems.indexOf(activeNavItem);

    // Decrement the index to move to the previous item
    const prevIndex = currentIndex - 1;

    // Check if prevIndex is within bounds
    if (prevIndex >= 0) {
      setActiveNavItem(navItems[prevIndex]);
    }
  };

  if (location.pathname !== "/partner") {
    return null;
  }

  return (
    <div>
      <nav>
        <ul className="navbar">
          {navItems.map((navItem) => (
            <li
              key={navItem}
              className={activeNavItem === navItem ? 'active' : ''}
              onClick={() => handleNavItemClick(navItem)}
            >
              {navItem}
            </li>
          ))}
        </ul>
      </nav>
    
      <div className="content">
        {activeNavItem === 'Hotel Contact Information' && (
          <div>
            <div>
              <h3>Hotel Listed Request</h3>
              <label htmlFor="hotelOwnerName">Hotel Owner Name:</label>
              <input type="text" id="hotelOwnerName" />

              <label htmlFor="ownerContactDetails">Owner Contact Details:</label>
              <input type="text" id="ownerContactDetails" />

              <label htmlFor="receptionContactDetails">Reception Contact Details:</label>
              <input type="text" id="receptionContactDetails" />

              <label htmlFor="hotelEmail">Hotel Email Address:</label>
              <input type="email" id="hotelEmail" />

              <label htmlFor="generalManagerContact">General Manager Contact Details:</label>
              <input type="text" id="generalManagerContact" />

              <label htmlFor="salesManagerContact">Sales Manager Contact Details:</label>
              <input type="text" id="salesManagerContact" />
              <h3>Hotel Details & Location</h3>
              <label htmlFor="hotelDetails">Hotel Details:</label>
              <textarea id="hotelDetails" rows="4"></textarea>
              <label htmlFor="street">Street:</label>
              <input type="text" id="street" />
              <label htmlFor="city">City:</label>
              <input type="text" id="city" />
              <label htmlFor="state">State:</label>
              <input type="text" id="state" />
              <label htmlFor="zip">ZIP Code:</label>
              <input type="text" id="zip" />
              <label htmlFor="landmark">Landmark</label>
              <input type="text" id="landmark" />
              <h3>Hotel Star Rating</h3>
              <input type="radio" id="starone" name="starType" value="type1" />
              <label htmlFor="starone">1 Star</label>
              <br />
              <input type="radio" id="startwo" name="starType" value="type2" />
              <label htmlFor="startwo">2 Star</label>
              <br />
              <input type="radio" id="starthree" name="starType" value="type3" />
              <label htmlFor="starthree">3 Star</label>
              <br />
              <input type="radio" id="starfour" name="starType" value="type3" />
              <label htmlFor="starfour">4 Star</label>
              <br />
              <input type="radio" id="starfive" name="starType" value="type3" />
              <label htmlFor="starfive">5 Star</label>
              {/* Your Property Type */}
              <h3>Your Property Type</h3>
              <input type="radio" id="propertyType1" name="propertyType" value="type1" />
              <label htmlFor="propertyType1">Property Type 1</label>
              <br />
              <input type="radio" id="propertyType2" name="propertyType" value="type2" />
              <label htmlFor="propertyType2">Property Type 2</label>
              <br />
              <input type="radio" id="propertyType3" name="propertyType" value="type3" />
              <label htmlFor="propertyType3">Property Type 3</label>
            </div>
          </div>
        )}
        {/* Next and Previous buttons */}
        <div className="button-container">
        {activeNavItem !== navItems[0] && (
          <button onClick={handlePrevClick}>Previous</button>
        )}
        {activeNavItem !== navItems[navItems.length - 1] && (
          <button onClick={handleNextClick}>Next</button>
        )}
      </div>
      </div>
    </div>
  );
};

export default Partner;
