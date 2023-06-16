import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './searchResult.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInr,faStar,faLocationDot,faPerson,faHotel } from '@fortawesome/free-solid-svg-icons';
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
            <h5 className='hotel-rating'>{result.rating}<FontAwesomeIcon icon={faStar} className={styles['fastar']} /></h5>
            </div>
            <hr />
            <p className="search-result-destination"><FontAwesomeIcon icon={faLocationDot} className='hotel-location' />{result.destination}</p>
           
           
            <p className="search-result-guests"><FontAwesomeIcon icon={faPerson} className='guest' /> {result.guests}Guest</p>
            <p className='search-result-rooms'><FontAwesomeIcon icon={faHotel} className='room' />{result.numRooms} Room <span style={{color:'#5963ff',fontWeight:'502'}}>Available</span></p>
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
                    {result.moreOptions.map((more) => (
                      <li key={more}>{more}</li>
                    ))}
                  </ul>
                </div>
                <hr />
                <div className="amenities">
                  <h6>Amenities:</h6>
                  <ul>
                    {result.amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
