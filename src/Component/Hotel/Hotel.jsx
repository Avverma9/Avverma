import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './hotel.module.css';

function HotelList() {
  const location=useLocation()
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
if(location.pathname !=="/"){
  return null
}
  return (
    <div className={styles['hotel-list']}>
      {Array.isArray(hotels) ? (
        hotels.map((hotel, index) => (
          <div className={styles.card} key={index}>
            <img src={hotel.images} alt={hotel.name} />
            <div className={styles['card-info']}>
              <h2>{hotel.name}</h2>
              <p>{hotel.location}</p>
              <div  style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" , height:"15px" }}>
                <p>Rating: {hotel.rating}</p>
                <span style={{ color: "green", marginLeft:"10px" }}>
                  {Array.from({ length: Math.floor(hotel.rating) }, (_, i) => (
                    <i className="fa fa-star" key={i} ></i>
                  ))}
                </span>
                {hotel.rating % 1 !== 0 && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '16px',
                      overflow: 'hidden',
                     
                    }}
                  >
                    <span style={{ color: 'green', }}>
                      <i className="fa fa-star-half-alt" key="half"></i>
                    </span>
                  </span>
                )}
              </div>
              <p>Reviews: {hotel.review}</p>
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
