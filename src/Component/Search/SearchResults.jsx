import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './searchResult.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInr, faStar, faLocationDot, faPerson, faHotel, faTv, faCamera, faSnowflake, faCreditCard, faElevator, faFire, faParking, faWifi, faPaw, faKitchenSet, faCheck, faGlassMartini, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
export default function SearchResults() {
  const searchResults = useSelector((state) => state.searchState);
  const [expandedResultId, setExpandedResultId] = useState(null);

  const toggleDetails = (resultId) => {
    if (expandedResultId === resultId) {
      setExpandedResultId(null);
    } else {
      setExpandedResultId(resultId);
    }
  };

  return (
    <div className="search-results">
      {searchResults.map((result) => (
        <div key={result._id} className="search-result">
          <img src={result.images[0]} alt="hotel-pic" className="search-result-image" />
          <div className="search-result-content">
            <div className='hotel-info'>
              <h3 className="search-result-title">{result.hotelName}</h3>
              <h5 className='hotel-rating'>{result.rating}<FontAwesomeIcon icon={faStar} className='fastaricon' /></h5>
            </div>
            <hr />
            <p className="search-result-destination"><FontAwesomeIcon icon={faLocationDot} className='hotel-location' />{result.destination}</p>


            <p className="search-result-guests"><FontAwesomeIcon icon={faPerson} className='guest' /> {result.guests}Guest</p>
            <p className='search-result-rooms'><FontAwesomeIcon icon={faHotel} className='room' />{result.numRooms} Room <span style={{ color: '#5963ff', fontWeight: '502' }}>Available</span></p>
            <p className='search-result-price'><FontAwesomeIcon icon={faInr} className='rupees' /> {result.price}<span className='detail'>per room per night</span></p>
            <hr />
            <p className="search-result-availability">Local ID: {result.availability}</p>
            <hr />

            <div className="button-container">
              <button className="view-details-button" onClick={() => toggleDetails(result._id)}>
                View Details
              </button>
              <button className="book-now-button">Book Now</button>
            </div>

            {expandedResultId === result._id && (
              <div>
                <div className="amenities">
                  <h6>More:</h6>


                  <ul>
                    {result.moreOptions.map((option) => {
                      let icon;
                      switch (option) {
                        case 'Pets Allowed':
                          icon = faPaw;
                          break;
                        case 'Alcohol Allowed':
                          icon = faGlassMartini;
                          break;
                        case 'Bachelor Allowed':
                          icon = faPeopleGroup;
                          break;
                        default:
                          icon = faCheck;



                      }
                      return (
                        <li key={option}>
                          {icon && <FontAwesomeIcon icon={icon} className="option-icon" />} {option}
                        </li>
                      );
                    })}
                  </ul>

                </div>
                <hr />
                <div className="amenities">
                  <h6>Amenities:</h6>
                  <ul>
                    {result.amenities.map((amenity) => {
                      let icon;
                      switch (amenity) {

                        case 'Free WIFI':
                          icon = faWifi;
                          break;
                        case 'GYM':
                          icon = faPaw;
                          break;
                        case 'Geyser':
                          icon = faFire;
                          break;
                        case 'TV':
                          icon = faTv;
                          break;
                        case 'CCTV':
                          icon = faCamera;
                          break;
                        case 'AC':
                          icon = faSnowflake;
                          break;
                        case 'Card-payment':
                          icon = faCreditCard;
                          break;

                        case 'Parking':
                          icon = faParking;
                          break;
                        case 'Elevator':
                          icon = faElevator;
                          break;
                        case 'Kitchen':
                          icon = faKitchenSet;
                          break;
                        default:
                          icon = faCheck;
                      }
                      return (
                        <li key={amenity}>
                          {icon && <FontAwesomeIcon icon={icon} className="amenity-icon" />} {amenity}
                        </li>
                        
                      );
                    })}

                  </ul>
                </div>
              </div>
            )}
            {result.disclaimer ? (
                <div className="please-note-container">
                  <p className="please-note-heading">Please Note !!!</p>
                  <p className="please-note-text">{result.disclaimer}</p>
                  <p className="please-note-contact">Contact Number: {result.contact}</p>
                </div>
              ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
