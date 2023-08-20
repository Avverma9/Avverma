import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import './searchResult.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInr, faStar, faLocationDot, faPerson, faHotel, faTv, faCamera, faSnowflake, faCreditCard, faElevator, faFire, faParking, faWifi, faPaw, faKitchenSet, faCheck, faGlassMartini, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import RangeSlider from '../Hotel/Rangeslider/range';
import Imgslide from "../Hotel/slider/sliderimage";
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
  return (
    
    <div className='whole-data'>
    <div className={styles["vertical-bar"]}>
          <div className="filt-1st">
            <h3 className="filterhead">Filters</h3>
            <br />
            <h5 className="filterprice">Price</h5>
            <RangeSlider
              minValue={minValue}
              maxValue={maxValue}
              set_minValue={set_minValue}
              set_maxValue={set_maxValue}
            />
          </div>
          <hr />
          <div className="filt-2nd">
            <h5 className="colle">Collections</h5>
            <label>
              {" "}
              <input type="checkbox" />
              Family Oyo
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              For Group Travellers
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Local ID Accepted
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Welcomes Couple
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              International Guest
            </label>
          </div>
          <hr />
          <div className="filt-3rd">
            <h5 className="colle">Categroies</h5>
            <label>
              {" "}
              <input type="checkbox" />
              Townhouse
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Home
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Hotel
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Flagship
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Family Oyo
            </label>
          </div>
          <hr />
          <div className="filt-4th">
            <h5 className="colle">Accomodation Type</h5>
            <label>
              {" "}
              <input type="checkbox" />
              Hostel
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Hotel
            </label>
          </div>
          <hr />
          <div className="filt-5th">
            <h5 className="colle">Hotel Facilities</h5>
            <label>
              {" "}
              <input type="checkbox" />
              Sitting Area
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Balcony
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Full Sized Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              King Sized Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Queen Sized Bed
            </label>
          </div>
          <hr />
          <div className="filt-6th">
            <h5 className="colle">Check In Feature</h5>
            <label>
              {" "}
              <input type="checkbox" />
              Pay At Hotel
            </label>
          </div>
        </div>
    <div className="search-results-display">
      {searchResults.map((result) => (
        <div key={result._id} className="search-result">
        <Imgslide/>
          
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
    </div>
    </div>
  );
}