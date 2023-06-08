import React from 'react';
import { useSelector } from 'react-redux';
import './searchResult.css'
export default function SearchResults() {
  const searchResults = useSelector((state) => state.searchState);

  return (
    <div className="search-results">
      {searchResults.map((result) => (
        <div key={result._id} className="card">
          <img src={result.images} alt="hotel-pic" className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{result.hotelName}</h3>
            <hr />
            <p className="card-destination">{result.destination}</p>
            <p className="card-price">Price: {result.price}</p>
            <p className="card-rating">Rating: {result.rating}</p>
            <p className="card-guests">Guests: {result.guests}</p>
            <p className="card-rooms">Rooms: {result.numRooms}</p>
            <hr />
            <p className="card-availablity">Availability: {result.availability}</p>
            <hr />
            
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
        </div>
      ))}
    </div>
  );
}
