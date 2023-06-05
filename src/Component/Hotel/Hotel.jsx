import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './hotel.module.css';

function HotelList() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch('https://hotel-backend-tge7.onrender.com/get/all/hotels')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Logging the received data
        setHotels(data);
      })
      .catch(error => console.log(error));
  }, []);

  if (location.pathname !== '/') {
    return null;
  }

  const handleBuy = (hotelName) => {
    // Replace with the logic to handle the buy action
    console.log(`Buy ${hotelName}`);
  };

  return (
    <div className={styles['hotel-list']}>
      {Array.isArray(hotels) ? (
        hotels.map((hotel, index) => (
          <div className={styles.card} key={index}>
            <img src={hotel.images} alt={hotel.name} />
            <div className={styles['card-info']}>
              <h2-h>{hotel.name}</h2-h>
              <p>{hotel.location}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '15px' }}>
                <p>Rating: {hotel.rating}</p>
                <span style={{ color: 'green', marginLeft: '10px' }}>
                  <i className="fa fa-star" key="star"></i>
                </span>
              </div>
              <p>Amenities: {hotel.amenties}</p>
              <p>Reviews: {hotel.review}</p>
              <button className={styles.buybutton} onClick={() => handleBuy(hotel.name)}>Book Now</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
}

export default HotelList;
