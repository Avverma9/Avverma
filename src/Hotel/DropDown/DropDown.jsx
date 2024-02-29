import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DropDown.css';

const StateItem = ({ state, cities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleCityClick = (city) => {
    navigate(`/cities/${city}`); 
  };

  return (
    <div
      className="stateItem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="stateName" onClick={() => setIsOpen(!isOpen)}>
        {state}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="cityDropdown">
          {cities.map((city, index) => (
            <div
              key={index}
              className="cityName"
              onClick={() => handleCityClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Dropdownbar = () => {
  const stateData = [
    {
      state: 'Rajasthan',
      cities: ['Jaipur', 'Kota', 'Udaipur', 'Jodhpur','Bikaner','Sawai Madhopur'],
    },
    {
      state: 'Uttar Pradesh',
      cities: ['Noida', 'Kanpur', 'Prayagraj', 'Mathura','Lucknow','Varanasi','Agra'],
    },
    {
      state: 'Madhya Pradesh',
      cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior','Ujjain','Ratlam'],
    },
    {
      state: 'Gujarat',
      cities: ['Surat', 'Ahmedabad', 'Rajkot', 'Vadodara','Porbandar','Jamnagar'],
    },
    {
      state: 'Bihar',
      cities: ['Patna', 'Nalanda', 'Bhagalpur', 'Darbhanga','Gaya','Darbhanga']
    },
    {
      state: 'Maharashtra',
      cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik','Kolhapur','Akola','Ratnagiri','Amravati','Latur','Ahmadnagar','Aurangabad']
    },
    {
      state: 'Uttarakhand',
      cities: ['Dehradun', 'Nainital', 'Rishikesh', 'Mussoorie','Haridwar']
    }
  ];
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  if (!isHomePage){
    return null;
  }

  return (
    <div className="menu">
    <div className='stateinrow'>
      {stateData.map((item, index) => (
        <StateItem key={index} state={item.state} cities={item.cities} />
      ))}
      </div>
    </div>
  );
};

export default Dropdownbar;