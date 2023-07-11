import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel'; // Import carousel component
import './Offers.css'; // Import the CSS file

const Offers = () => {
  const location = useLocation()
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch API data
    fetch('https://hotel-backend-tge7.onrender.com/offers')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);
if(location.pathname !== "/new"){
  return null
}
  return (
    <div className="offers-container"> {/* Apply a class name to the container */}
      {data.map((offer, index) => (
        <div className={`offer offer-${index}`} key={offer._id}> {/* Apply a class name to each offer */}
          <h2>{offer.hotelName}</h2>
          <p>Offer: {offer.offers}</p>
          <p>Description: {offer.description}</p>
          <p>Destination: {offer.destination}</p>
          <p>Price: ${offer.price}</p>
          <p>Start Date: {new Date(offer.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(offer.endDate).toLocaleDateString()}</p>
          <p>Guests: {offer.guests}</p>
          <p>Number of Rooms: {offer.numRooms}</p>
          <p>Room Type: {offer.roomType}</p>
          <p>Availability: {offer.availability}</p>
          <p>Hotels Policy: {offer.hotelsPolicy}</p>
          <p>More Options: {offer.moreOptions.join(', ')}</p>
          <p>Amenities: {offer.amenities.join(', ')}</p>
          <p>Reviews: {offer.reviews}</p>
          <p>Rating: {offer.rating}</p>
          <p>Collections: {offer.collections.join(', ')}</p>
          <p>Categories: {offer.categories.join(', ')}</p>
          <p>Accommodation Type: {offer.accommodationType.join(', ')}</p>
          <p>Check-in Feature: {offer.checkInFeature ? 'Available' : 'Not Available'}</p>
          <hr />
          {/* Render the carousel */}
          <Carousel className="carousel">
            {offer.images.map((image, imageIndex) => (
              <div key={imageIndex}>
                <img src={image} alt="Hotel" className="hotel-image" />
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default Offers;
