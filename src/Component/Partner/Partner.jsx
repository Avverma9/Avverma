import React, { useState } from "react";
import "./partner.css";
import { useLocation } from "react-router-dom";

const Partner = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(
    "Hotel Contact Information"
  );
  const [images, setImages] = useState([]);

  const navItems = [
    "Hotel Contact Information",
    "Basic Information",
    "Hotel Policy",
    "Hotel Tariff",
  ];

  const handleNavItemClick = (navItem) => {
    if (navItem === "Basic Information") {
      setActiveNavItem(navItem);
      setImages([]);
    } else {
      setActiveNavItem(navItem);
    }
  };

  const handleNextClick = () => {
    const currentIndex = navItems.indexOf(activeNavItem);
    const nextIndex = currentIndex + 1;

    if (nextIndex < navItems.length) {
      setActiveNavItem(navItems[nextIndex]);
    }
  };

  const handlePrevClick = () => {
    const currentIndex = navItems.indexOf(activeNavItem);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setActiveNavItem(navItems[prevIndex]);
    }
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = e.target.result;
      const updatedImages = [...images];
      updatedImages[index] = image;
      setImages(updatedImages.slice(0, 6));
    };

    reader.readAsDataURL(file);
  };

  const handleCheckboxChange = (event) => {
    // Handle checkbox change logic here
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
              className={activeNavItem === navItem ? "active" : ""}
              onClick={() => handleNavItemClick(navItem)}
            >
              {navItem}
            </li>
          ))}
        </ul>
      </nav>

      <div className="content">
        {activeNavItem === "Hotel Contact Information" && (
          <div>
            <h3>Hotel Listed Request</h3>
            <div className="group1">
            <label htmlFor="hotelOwnerName">Hotel Owner Name</label>
            <input type="text" id="hotelOwnerName" />

            <label htmlFor="ownerContactDetails">Owner Contact Details:</label>
            <input type="text" id="ownerContactDetails" />

            <label htmlFor="receptionContactDetails">
              Reception Contact Details:
            </label>
            <input type="text" id="receptionContactDetails" />
            </div>
            <br />
            <label htmlFor="hotelEmail">Hotel Email Address:</label>
            <input type="email" id="hotelEmail" />

            <label htmlFor="generalManagerContact">
              General Manager Contact Details:
            </label>
            <input type="text" id="generalManagerContact" />

            <label htmlFor="salesManagerContact">
              Sales Manager Contact Details:
            </label>
            <input type="text" id="salesManagerContact" />

            <h3>Hotel Details & Location</h3>

            <label htmlFor="hotelDetails">Hotel Details:</label>
            <input type="text" id="hotelDetails"></input>

            <label htmlFor="street">Street:</label>
            <input type="text" id="street" />

            <label htmlFor="city">City:</label>
            <input type="text" id="city" />
            <br />
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

            <h3>Your Property Type</h3>
            <input type="radio" id="apartment" name="propertyType" value="type1" />
            <label htmlFor="apartment">Apartment</label>
            <br />
            <input type="radio" id="guesthouse" name="propertyType" value="type2" />
            <label htmlFor="guesthouse">Guest House</label>
            <br />
            <input type="radio" id="holiday" name="propertyType" value="type3" />
            <label htmlFor="holiday">Holiday Home</label>
            <br />
            <input type="radio" id="homestay" name="propertyType" value="type3" />
            <label htmlFor="homestay">Homestay</label>
            <br />

            <input type="radio" id="hostel" name="propertyType" value="type3" />
            <label htmlFor="hostel">Hostel</label>
            <br />
            <input type="radio" id="hotel" name="propertyType" value="type3" />
            <label htmlFor="hotel">Hotel</label>
            <br />
            <input
              type="radio"
              id="hotelapartment"
              name="propertyType"
              value="type3"
            />
            <label htmlFor="hotelaprtment">Hotel Aprtment</label>
            <br />
            <input type="radio" id="resort" name="propertyType" value="type3" />
            <label htmlFor="resort">Resort</label>
            <br />
            <input type="radio" id="villa" name="propertyType" value="type3" />
            <label htmlFor="villa">Villa</label>
          </div>
        )}

        {activeNavItem === "Basic Information" && (
          <div>
            <h3>Basic Information</h3>
            <div>
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <label htmlFor={`imageUpload${index}`}>
                    Upload Image {index + 1}:
                  </label>
                  <input
                    type="file"
                    id={`imageUpload${index}`}
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, index)}
                  />
                  {images[index] && (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={images[index]} alt={`Image ${index + 1}`} />
                  )}
                </div>
              ))}
            </div>
            <div>
              <h3>Amenities</h3>
              <label>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  value="Free Wireless Internet"
                />
                Free Wireless Internet
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  value="Air Conditioning"
                />
                Air Conditioning
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  value="Room Services"
                />
                Room Services
              </label>
              
            </div>
          </div>
        )}

{activeNavItem === "Hotel Policy" && (
  <div>
    <h3>Hotel Policy</h3>
    <div>
      <label>Outside Food</label>
      <br />
      <label>
        <input
          type="radio"
          name="outsideFoodPolicy"
          value="allowed"
        />
       

        Allowed
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="outsideFoodPolicy"
          value="notAllowed"
        />
        Not Allowed
      </label>
      <br />
      <label htmlFor="returnPolicy">Describe your return policy:</label>
      <input type="text" id="returnPolicy" />

      <label htmlFor="checkInOut">Check-In and Check-Out:</label>
      <input type="text" id="checkInOut" />
    </div>
  </div>
)}
{activeNavItem === "Hotel Tariff" && (
  <div>
    <h3>Hotel Tariff</h3>
    <div>
      <label htmlFor="roomType">Room Type:</label>
      <input type="text" id="roomType" />

      <label htmlFor="roomRate">Room Rate:</label>
      <input type="text" id="roomRate" />

      <label htmlFor="discount">Discount:</label>
      <input type="text" id="discount" />

      <label htmlFor="availability">Availability:</label>
      <input type="text" id="availability" />
    </div>
    
  </div>
)}




        <div className="button-container">
          {activeNavItem !== navItems[0] && (
            <button onClick={handlePrevClick}>Previous</button>
          )}
          {activeNavItem !== navItems[navItems.length - 1] && (
            <button onClick={handleNextClick}>Next</button>
          )}
          {activeNavItem === "Hotel Tariff" && (
  <button onClick={""}>Submit</button>
)}
        </div>
      </div>
    </div>
  );
};

export default Partner;
