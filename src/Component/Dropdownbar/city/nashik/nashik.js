import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './nashik.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSnowflake, faDumbbell, faParking, faSwimmingPool, faPaw, faGlassMartini, faSmoking, faStar, faKitchenSet, faTv, faFire, faPowerOff, faCamera, faElevator, faCreditCard, faCheck, faInr, faLocationDot, faHotel, faPerson } from '@fortawesome/free-solid-svg-icons';

function Nashik() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [expandedResultId, setExpandedResultId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://hotel-backend-tge7.onrender.com/hotels?destination=Nashik')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Logging the received data
        setHotels(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleBuy = (hotelID) => {
    // Replace with the logic to handle the booking action
    console.log(`Book Now: ${hotelID}`);
    navigate(`/hotels/${hotelID}`);
  };

  const toggleDetails = (resultId) => {
    if (expandedResultId === resultId) {
      setExpandedResultId(null);
    } else {
      setExpandedResultId(resultId);
    }
  };
  if (hotels.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className="search-results0">
        {hotels.map((result) => (
          
          <div key={result._id} className={`search-result0 ${expandedResultId === result._id ? 'expanded' : ''}`}>
            <img src={result.images[0]} alt="hotel-pic" className="search-result-image0" />
            <div className="search-result-content0">
              <div className="hotel-info0">
                <h3 className="search-result-title0">{result.hotelName}</h3>
                <h5 className="hotel-rating0">{result.rating}<FontAwesomeIcon icon={faStar} className="fastar0" /></h5>
              </div>
             
              <hr />
              <p className="search-result-destination0"><FontAwesomeIcon icon={faLocationDot} className="location0" />{result.destination}</p>
              <p className="search-result-guests0"><FontAwesomeIcon icon={faPerson} className="guest0" />{result.guests} Guest</p>
              <p className="search-result-rooms0"><FontAwesomeIcon icon={faHotel} className="room0" />{result.numRooms} Room <span style={{ color: '#5963ff', fontWeight: '502' }}>Available</span></p>
              <p className="search-result-price0"><FontAwesomeIcon icon={faInr} className="rupees0" /> {result.price}<span className="detail0">per room per night</span></p>
              <hr />
              <p className="search-result-availability0">Local ID: {result.availability}</p>
              <hr />

              <button className="view-details-button0" onClick={() => toggleDetails(result._id)}>
                View Details
              </button>
              <button className="book-now-button0" onClick={() => handleBuy(result._id)}>
                Book Now
              </button>

              {expandedResultId === result._id && (
                <div>
                  <div className="amenities0">
                    <h6>More:</h6>
                    <ul>
                      {result.moreOptions.map((more) => (
                        <li key={more}>
                          {more === 'Pets Allowed' && <FontAwesomeIcon icon={faPaw} className="fonticon0" />}
                          {more === 'Alcohol Allowed' && <FontAwesomeIcon icon={faGlassMartini} className="fonticon0" />}
                          {more === 'Smoking Allowed' && <FontAwesomeIcon icon={faSmoking} className="fonticon0" />}
                          {more}</li>
                      ))}
                    </ul>
                  </div>
                  <hr />

                  <div className="amenities0">
                    <h6>Amenities:</h6>
                    <ul>
                      {result.amenities.map((amenity) => (
                        <li key={amenity}>
                          {amenity === 'Free WIFI' && <FontAwesomeIcon icon={faWifi} className="fonticon0" />}
                          {amenity === 'AC' && <FontAwesomeIcon icon={faSnowflake} className="fonticon0" />}
                          {amenity === 'GYM' && <FontAwesomeIcon icon={faDumbbell} className="fonticon0" />}
                          {amenity === 'Parking' && <FontAwesomeIcon icon={faParking} className="fonticon0" />}
                          {amenity === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} className="fonticon0" />}
                          {amenity === 'Kitchen' && <FontAwesomeIcon icon={faKitchenSet} className="fonticon0" />}
                          {amenity === 'TV' && <FontAwesomeIcon icon={faTv} className="fonticon0" />}
                          {amenity === 'Geyser' && <FontAwesomeIcon icon={faFire} className="fonticon0" />}
                          {amenity === 'Power_backup' && <FontAwesomeIcon icon={faPowerOff} className="fonticon0" />}
                          {amenity === 'CCTV' && <FontAwesomeIcon icon={faCamera} className="fonticon0" />}
                          {amenity === 'Fire-Extinguisher' && <FontAwesomeIcon icon={faFire} className="fonticon0" />}
                          {amenity === 'Elevator' && <FontAwesomeIcon icon={faElevator} className="fonticon0" />}
                          {amenity === 'Card-payment' && <FontAwesomeIcon icon={faCreditCard} className="fonticon0" />}
                          {amenity !== 'Free WIFI' && amenity !== 'AC' && amenity !== 'GYM' && amenity !== 'Parking' && amenity !== 'Swimming Pool' && amenity !== 'Kitchen' && amenity !== 'TV' && amenity !== 'Geyser' && amenity !== 'Power_backup' && amenity !== 'CCTV' && amenity !== 'Fire-Extinguisher' && amenity !== 'Elevator' && amenity !== 'Card-payment' && (
                            <>
                              <FontAwesomeIcon icon={faCheck} className="fonticon0" />
                            </>
                          )}
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Nashik;
