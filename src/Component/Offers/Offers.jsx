import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi,faChevronLeft,faChevronRight, faSnowflake, faDumbbell, faParking, faSwimmingPool, faPaw, faGlassMartini, faSmoking, faStar, faKitchenSet, faTv, faFire, faPowerOff, faCamera, faElevator, faCreditCard, faCheck, faInr, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Offers.css';

const Offers = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('https://hotel-backend-tge7.onrender.com/offers')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  if (location.pathname !== "/") {
    return null;
  }

  const handleViewDetails = (offerId) => {
    if (expandedOfferId === offerId) {
      setExpandedOfferId(null);
    } else {
      setExpandedOfferId(offerId);
    }
  };

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + data.length) % data.length;
    setCurrentSlide(prevSlide);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % data.length;
    setCurrentSlide(nextSlide);
  };

  return (
    <div className="offers-container">
      {data.map((offer, index) => (
        <div className={`offer offer-${index}`} key={offer._id}>
          <h2>{offer.hotelName}</h2>
                    {/* Render the slider */}
                    <div className="slider">
                    {offer.images.map((image, imageIndex) => (
        <div
          key={imageIndex}
          className={`slide ${imageIndex === currentSlide ? "active" : ""}`}
        >
          <img src={image} alt="Hotel" className="hotel-image" />
        </div>
      ))}
      <div className="slider-controls">
        <button className="slider-arrow prev" onClick={goToPrevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="slider-arrow next" onClick={goToNextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="slider-dots">
        {offer.images.map((_, imageIndex) => (
          <div
            key={imageIndex}
            className={`slider-dot ${imageIndex === currentSlide ? "active" : ""}`}
            onClick={() => handleSlideChange(imageIndex)}
          ></div>
              ))}
            </div>
          </div>
          <p>Offer: {offer.offers}</p>
          <hr />
          <p>Description: {offer.description}</p>
  
          <h6>Amenities:</h6>
          <ul>
            {offer.amenities.map((amenity) => (
              <li key={amenity}>
                {amenity === 'Free WIFI' && <FontAwesomeIcon icon={faWifi} className="fonticon" />}
                {amenity === 'Wifi' && <FontAwesomeIcon icon={faWifi} className="fonticon" />}
                {amenity === 'AC' && <FontAwesomeIcon icon={faSnowflake} className="fonticon" />}
                {amenity === 'GYM' && <FontAwesomeIcon icon={faDumbbell} className="fonticon" />}
                {amenity === 'Parking' && <FontAwesomeIcon icon={faParking} className="fonticon" />}
                {amenity === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} className="fonticon" />}
                {amenity === 'Kitchen' && <FontAwesomeIcon icon={faKitchenSet} className="fonticon" />}
                {amenity === 'TV' && <FontAwesomeIcon icon={faTv} className="fonticon" />}
                {amenity === 'Geyser' && <FontAwesomeIcon icon={faFire} className="fonticon" />}
                {amenity === 'Power_backup' && <FontAwesomeIcon icon={faPowerOff} className="fonticon" />}
                {amenity === 'CCTV' && <FontAwesomeIcon icon={faCamera} className="fonticon" />}
                {amenity === 'Fire-Extinguisher' && <FontAwesomeIcon icon={faFire} className="fonticon" />}
                {amenity === 'Elevator' && <FontAwesomeIcon icon={faElevator} className="fonticon" />}
                {amenity === 'Card-payment' && <FontAwesomeIcon icon={faCreditCard} className="fonticon" />}

                {amenity !== 'Wifi' && amenity !== 'Free WIFI' && amenity !== 'AC' && amenity !== 'GYM' && amenity !== 'Parking' && amenity !== 'Swimming Pool' && amenity !== 'Kitchen' && amenity !== 'TV' && amenity !== 'Geyser' && amenity !== 'Power_backup' && amenity !== 'CCTV' && amenity !== 'Fire-Extinguisher' && amenity !== 'Elevator' && amenity !== 'Card-payment' && (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="fonticon" />
                  </>
                )}
                {amenity}
              </li>
            ))}
          </ul>
          <button
            className="view-details-button"
            onClick={() => handleViewDetails(offer._id)}
          >
            {expandedOfferId === offer._id ? "Hide Details" : "View Details"}
          </button>
          {/* Render additional data if offer is expanded */}
          {expandedOfferId === offer._id && (
            <>
              <p>Destination: {offer.destination}</p>
              <p>Price: ${offer.price}</p>
              <p>Start Date: {new Date(offer.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(offer.endDate).toLocaleDateString()}</p>
              {/* Add more details here */}
            </>
          )}
 

        </div>
      ))}
    </div>
  );
};

export default Offers;
