import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import './searchResult.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInr, faStar, faLocationDot, faPerson, faHotel, faTv, faCamera, faSnowflake, faCreditCard, faElevator, faFire, faParking, faWifi, faPaw, faKitchenSet, faCheck, faGlassMartini, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import RangeSlider from '../Hotel/Rangeslider/range';
import Imgslide from "../Hotel/slider/sliderimage";
import Sidebar from "../Hotel/filtersidebar/Sidebar";
import axios from "axios";
import styles from "../Hotel/hotel.module.css";
import { useNavigate } from 'react-router-dom';

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
  const [minValue, set_minValue] = useState(400);
  const [maxValue, set_maxValue] = useState(4000);
  const [hotels, setHotels] = useState([]);
  const [reviewCount, setReviewCount] = useState([]);
   const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [starrating, setStarrating] = useState([]);
  const [roomtype, setRoomtype] = useState([]);
  const [bedtype, setBedtype] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [showall, setShowall] = useState(false);
  const [showallstar, setShowallstar] = useState(false);
  const [showroomtype, setShowroomtype] = useState(false);
  const [showbedtype, setShowbedtype] = useState(false);
  const [showamenities, setShowamenities] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);
  useEffect(() => {
    if (minValue > 400 || maxValue < 4000) {
      axios
        .get(
          `https://hotel-backend-tge7.onrender.com/hotels/price/get/by?minPrice=${minValue}&maxPrice=${maxValue}`
        )
        .then((data) => {
          if (data.status === 200) {
            setHotels(data.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get("https://hotel-backend-tge7.onrender.com/get/all/hotels")
        .then((data) => {
          if (data.status === 200) {
            setHotels(data.data);
          }
        })
        .catch((error) => console.log(error));
    }

    const labels = document.getElementsByClassName("label");
    Array.from(labels).forEach((label, index) => {
      if (index === 0) {
        label.textContent = `₹${minValue}`;
      } else if (index === 1) {
        label.textContent = `₹${maxValue}`;
      }
    });
  }, [maxValue, minValue]);
  const navigate = useNavigate();
  const handleBuy = (hotelID) => {
    // Replace with the logic to handle the booking action
    console.log(`Book Now: ${hotelID}`);
    navigate(`/hotels/${hotelID}`);
  };

 const handlePropertyTypeChange = (propertyType, checked) => {
    if (checked) {
      setSelectedPropertyTypes((prevSelected) => [
        ...prevSelected,
        propertyType,
      ]);
    } else {
      setSelectedPropertyTypes((prevSelected) =>
        prevSelected.filter((type) => type !== propertyType)
      );
    }
  };
  const handleRatingChange = (starRating, checked) => {
    if (checked) {
      setStarrating((prevSelected) => [...prevSelected, starRating]);
    } else {
      setStarrating((prevSelected) =>
        prevSelected.filter((type) => type !== starRating)
      );
    }
  };
  const handleroomtype = (roomTypes, checked) => {
    if (checked) {
      setRoomtype((prevSelected) => [...prevSelected, roomTypes]);
    } else {
      setRoomtype((prevSelected) =>
        prevSelected.filter((type) => type !== roomTypes)
      );
    }
  };
  const handlebedtype = (bedTypes, checked) => {
    if (checked) {
      setBedtype((prevSelected) => [...prevSelected, bedTypes]);
    } else {
      setBedtype((prevSelected) =>
        prevSelected.filter((type) => type !== bedTypes)
      );
    }
  };
  const handleamenity = (amenities, checked) => {
    if (checked) {
      setAmenity((prevSelected) => [...prevSelected, amenities]);
    } else {
      setAmenity((prevSelected) =>
        prevSelected.filter((type) => type !== amenities)
      );
    }
  };

  const clearFilters = () => {
    setSelectedPropertyTypes([]);
    setRoomtype([]);
    setStarrating([]);
    setBedtype([]);
    setAmenity([]);
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  useEffect(() => {
    const fetchReviewsCount = async () => {
      const reviewCounts = await Promise.all(
        hotels.map(async (hotel) => {
          try {
            const response = await fetch(
              `https://hotel-backend-tge7.onrender.com/getReviews/${hotel._id}`
            );
            const data = await response.json();

            if (!data || !data.reviews || !Array.isArray(data.reviews)) {
              console.log(`Invalid data structure for hotelId: ${hotel._id}`);
              return { hotelId: hotel._id, count: 0 };
            }

            return { hotelId: hotel._id, count: data.reviews.length };
          } catch (error) {
            console.error(
              `Error fetching data for hotelId ${hotel._id}:`,
              error
            );
            return { hotelId: hotel._id, count: 0 };
          }
        })
      );
      setReviewCount(reviewCounts);
    };

    fetchReviewsCount();
  }, [hotels]);






  return (
    

    <><div className='whole-data'>
      <Sidebar
        minValue={minValue}
        set_minValue={set_minValue}
        maxValue={maxValue}
        set_maxValue={set_maxValue}
        setHotels={setHotels}
        selectedPropertyTypes={selectedPropertyTypes}
        setSelectedPropertyTypes={setSelectedPropertyTypes}
        starrating={starrating}
        setStarrating={setStarrating}
        roomtype={roomtype}
        setRoomtype={setRoomtype}
        bedtype={bedtype}
        setBedtype={setBedtype}
        amenity={amenity}
        setAmenity={setAmenity}
        showall={showall}
        setShowall={setShowall}
        showallstar={showallstar}
        setShowallstar={setShowallstar}
        showroomtype={showroomtype}
        setShowroomtype={setShowroomtype}
        showbedtype={showbedtype}
        setShowbedtype={setShowbedtype}
        showamenities={showamenities}
        setShowamenities={setShowamenities}
        handlePropertyTypeChange={handlePropertyTypeChange}
        handleRatingChange={handleRatingChange}
        handleroomtype={handleroomtype}
        handlebedtype={handlebedtype}
        handleamenity={handleamenity}
        clearFilters={clearFilters}
        setDataAvailable={setDataAvailable} />
    </div><hr /><div className="search-results-display">
        {searchResults.map((result) => (
          <div key={result._id} className="search-result">
            <Imgslide />

            <div className="search-result-content-result">
              <div className='hotel-info'>
                <h3 className="search-result-title">{result.hotelName}</h3>
                <h5 className='hotel-rating'>{result.rating}<FontAwesomeIcon icon={faStar} className='fastaricon' /></h5>
              </div>
              <hr />
              <p className="search-result-destination-result"><FontAwesomeIcon icon={faLocationDot} className='hotel-location' />{result.destination}</p>


              <p className="search-result-guests"><FontAwesomeIcon icon={faPerson} className='guest' /> {result.guests}Guest</p>
              <p className='search-result-rooms'><FontAwesomeIcon icon={faHotel} className='room' />{result.numRooms} Room <span style={{ color: '#5963ff', fontWeight: '502' }}>Available</span></p>
              <p className='search-result-price'><FontAwesomeIcon icon={faInr} className='rupees' /> {result.price}<span className='detail'>per room per night</span></p>
              <hr />
              <p className="search-result-availability">Local ID: {result.availability}</p>
              <hr />

              <div className="button-container-searchresult">
                <button className="view-details-button-searchresult" onClick={() => toggleDetails(result._id)}>
                  View Details
                </button>
                <button className="book-now-button-searchresult"
                  onClick={() => handleBuy(result._id)}
                >Book Now</button>
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
      </div></>
    
  );
}