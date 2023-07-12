import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel'; // Import carousel component
import './Offers.css'; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheck, faCube, faDesktop, faDotCircle, faHospital, faHotel, faInr, faLocation, faPeopleGroup, faRestroom, faStar } from '@fortawesome/free-solid-svg-icons';

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
        <Carousel className="carousel">
            {offer.images.map((image, imageIndex) => (
              <div key={imageIndex}>
                <img src={image} alt="Hotel" className="hotel-image" />
              </div>
            ))}
          </Carousel>
          <h2>{offer.hotelName}</h2>
          <p><FontAwesomeIcon icon={faCheck} />Offer: {offer.offers}</p>
          <p><FontAwesomeIcon icon={faDesktop} />Description: {offer.description}</p>
          <p><FontAwesomeIcon icon={faDotCircle} />Destination: {offer.destination}</p>
          <p>Price: <FontAwesomeIcon icon={faInr} />{offer.price}</p>
          <p>Start Date: {new Date(offer.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(offer.endDate).toLocaleDateString()}</p>
           <p><FontAwesomeIcon icon={faPeopleGroup} />Guests:{offer.guests}</p>
          <p><FontAwesomeIcon icon={faHotel} />Number of Rooms: {offer.numRooms}</p>
          <p><FontAwesomeIcon icon={faHospital} />Room Type: {offer.roomType}</p>
          <p><FontAwesomeIcon icon={faCheck} />Availability: {offer.availability}</p>
          <p><FontAwesomeIcon icon={faCheck} />Hotels Policy: {offer.hotelsPolicy}</p>
          <p><FontAwesomeIcon icon={faCheck} />More Options: {offer.moreOptions.join(', ')}</p>
          <p><FontAwesomeIcon icon={faCube} />Amenities: {offer.amenities.join(', ')}</p>
          <p><FontAwesomeIcon icon={faStar} />Reviews: {offer.reviews}</p>
          <p><FontAwesomeIcon icon={faStar} />Rating: {offer.rating}</p>
          <p><FontAwesomeIcon icon={faCheck} />Collections: {offer.collections.join(', ')}</p>
          <p><FontAwesomeIcon icon={faBars} />Categories: {offer.categories.join(', ')}</p>
          <p><FontAwesomeIcon icon={faHotel} />Accommodation Type: {offer.accommodationType.join(', ')}</p>
          <p><FontAwesomeIcon icon={faCheck} />Check-in Feature: {offer.checkInFeature ? 'Available' : 'Not Available'}</p>
          <hr />
          {/* Render the carousel */}
         
        </div>
      ))}
    </div>
  );
};

export default Offers;
