/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './hotel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSnowflake, faDumbbell, faParking, faSwimmingPool, faPaw, faGlassMartini, faSmoking, faStar, faKitchenSet, faTv, faFire, faPowerOff, faCamera, faElevator, faCreditCard, faCheck, faInr, faLocationDot} from '@fortawesome/free-solid-svg-icons';

import RangeSlider from './Rangeslider/range';
import axios from 'axios';
import Imgslide from './slider/sliderimage';



function HotelList() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);  // list of hotels initially when page loaded
  const [expandedResultId, setExpandedResultId] = useState(null);
  const navigate = useNavigate();

  const [minValue, set_minValue] = useState(400);
  const [maxValue, set_maxValue] = useState(4000);


  useEffect(() => {
    if (minValue > 400 || maxValue < 4000) {
      axios.get(`https://hotel-backend-tge7.onrender.com/hotels/price/get/by?minPrice=${minValue}&maxPrice=${maxValue}`)
        .then(data => {
          if (data.status === 200) {
            setHotels(data.data);
          }
        })
        .catch(error => console.log(error));
    } else {
      axios.get('https://hotel-backend-tge7.onrender.com/get/all/hotels')
        .then(data => {
          if (data.status === 200) {
            setHotels(data.data);
          }
        })
        .catch(error => console.log(error));
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

  if (location.pathname !== '/home') {
    return null;
  }

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

  return (
    <>
      <div className='whole-data d-flex'>
        <div className={styles['vertical-bar']}>
          <div className='filt-1st'>
            <h3 className='filterhead'>Filters</h3>
            <br />
            <h5 className='filterprice'>Price</h5>
            <RangeSlider minValue={minValue} maxValue={maxValue} set_minValue={set_minValue} set_maxValue={set_maxValue} />

          </div>
          <hr />
          <div className='filt-2nd'>
            <h5 className='colle'>Collections</h5>
            <label> <input type='checkbox' />Family Oyo</label>
            <label> <input type='checkbox' />For Group Travellers</label>
            <label> <input type='checkbox' />Local ID Accepted</label>
            <label> <input type='checkbox' />Welcomes Couple</label>
            <label> <input type='checkbox' />International Guest</label>

          </div>
          <hr />
          <div className='filt-3rd'>
            <h5 className='colle'>Categroies</h5>
            <label> <input type='checkbox' />Family Oyo</label>
            <label> <input type='checkbox' />Family Oyo</label>
            <label> <input type='checkbox' />Family Oyo</label>
            <label> <input type='checkbox' />Family Oyo</label>
            <label> <input type='checkbox' />Family Oyo</label>

          </div>
          <hr />
          <div className='filt-4th'>
            <h5 className='colle'>Accomodation Type</h5>
            <label> <input type='checkbox' />Hostel</label>
            <label> <input type='checkbox' />Hotel</label>
          </div>
          <hr />
          <div className='filt-5th'>
            <h5 className='colle'>Hotel Facilities</h5>
            <label> <input type='checkbox' />Sitting Area</label>
            <label> <input type='checkbox' />Balcony</label>
            <label> <input type='checkbox' />Full Sized Bed</label>
            <label> <input type='checkbox' />King Sized Bed</label>
            <label> <input type='checkbox' />Queen Sized Bed</label>

          </div>
          <hr />
          <div className='filt-6th'>
            <h5 className='colle'>Check In Feature</h5>
            <label> <input type='checkbox' />Pay At Hotel</label>

          </div>
        </div>

        <div className={styles['search-results']}>


          {hotels.map((result) => (
            <div key={result._id} className={`${styles['search-result']} ${expandedResultId === result._id ? styles['expanded'] : ''}`}>

              <Imgslide/>
              <div className={styles['search-result-content']}>
                <div className={styles['hotel-info']}>
                  <h3 className={styles['search-result-title']}>{result.hotelName}</h3>
                  <p className={styles['search-result-destination']}><FontAwesomeIcon icon={faLocationDot} className={styles['location']} />{result.destination}</p>
                </div>
                <h5 className={styles['hotel-rating']}>{result.rating}<FontAwesomeIcon icon={faStar} className={styles['fastar']} /></h5>




                <div className={styles['amenities']} >

                  <ul>
                    {result.amenities.slice(0, 3).map((amenity) => (
                      <li key={amenity}>
                        {amenity === 'Free WIFI' && <FontAwesomeIcon icon={faWifi} className={styles['fonticon']} />}
                        {amenity === 'AC' && <FontAwesomeIcon icon={faSnowflake} className={styles['fonticon']} />}
                        {amenity === 'GYM' && <FontAwesomeIcon icon={faDumbbell} className={styles['fonticon']} />}
                        {amenity === 'Parking' && <FontAwesomeIcon icon={faParking} className={styles['fonticon']} />}
                        {amenity === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} className={styles['fonticon']} />}
                        {amenity === 'Kitchen' && <FontAwesomeIcon icon={faKitchenSet} className={styles['fonticon']} />}
                        {amenity === 'TV' && <FontAwesomeIcon icon={faTv} className={styles['fonticon']} />}
                        {amenity === 'Geyser' && <FontAwesomeIcon icon={faFire} className={styles['fonticon']} />}
                        {amenity === 'Power_backup' && <FontAwesomeIcon icon={faPowerOff} className={styles['fonticon']} />}
                        {amenity === 'CCTV' && <FontAwesomeIcon icon={faCamera} className={styles['fonticon']} />}
                        {amenity === 'Fire-Extinguisher' && <FontAwesomeIcon icon={faFire} className={styles['fonticon']} />}
                        {amenity === 'Elevator' && <FontAwesomeIcon icon={faElevator} className={styles['fonticon']} />}
                        {amenity === 'Card-payment' && <FontAwesomeIcon icon={faCreditCard} className={styles['fonticon']} />}
                        {amenity !== 'Free WIFI' && amenity !== 'AC' && amenity !== 'GYM' && amenity !== 'Parking' && amenity !== 'Swimming Pool' && amenity !== 'Kitchen' && amenity !== 'TV' && amenity !== 'Geyser' && amenity !== 'Power_backup' && amenity !== 'CCTV' && amenity !== 'Fire-Extinguisher' && amenity !== 'Elevator' && amenity !== 'Card-payment' && (
                          <>
                            <FontAwesomeIcon icon={faCheck} className={styles['fonticon']} />

                          </>)}
                        {amenity}

                      </li>

                    ))}


                  </ul>
                </div>





                <div className='mixrupeebutton' style={{ display: 'flex', justifyContent: 'space-between', marginTop: "6px" }}>
                  <div className='rupeedetail'>

                    <p className={styles['search-result-price']}><FontAwesomeIcon icon={faInr} className={styles['rupees']} /> {result.price}<span className={styles['detail']}>per room per night</span></p></div>
                  <div className='flex-button' style={{ display: "flex", flexDirection: "row", gap: "15%" }}>
                    <button className={styles['view-details-button']} onClick={() => handleBuy(result._id)}>
                      View Details
                    </button>
                    <button className={styles['book-now-button']} onClick={() => handleBuy(result._id)}>
                      Book Now
                    </button>
                  </div>
                </div>

                <p className={styles['search-result-availability']}>Local ID: {result.availability}</p>
                <hr />



                {expandedResultId === result._id && (
                  <div>
                    <div className={styles['amenities']}>
                      <h6>More:</h6>
                      <ul>
                        {result.moreOptions.map((more) => (
                          <li key={more}>
                            {more === 'Pets Allowed' && <FontAwesomeIcon icon={faPaw} className={styles['fonticon']} />}
                            {more === 'Alcohol Allowed' && <FontAwesomeIcon icon={faGlassMartini} className={styles['fonticon']} />}
                            {more === 'Smoking Allowed' && <FontAwesomeIcon icon={faSmoking} className={styles['fonticon']} />}
                            {more}</li>
                        ))}
                      </ul>
                    </div>
                    <hr />

                    <div className={styles['amenities']}>
                      <h6>Amenities:</h6>
                      <ul>
                        {result.amenities.map((amenity) => (
                          <li key={amenity}>
                            {amenity === 'Free WIFI' && <FontAwesomeIcon icon={faWifi} className={styles['fonticon']} />}
                            {amenity === 'AC' && <FontAwesomeIcon icon={faSnowflake} className={styles['fonticon']} />}
                            {amenity === 'GYM' && <FontAwesomeIcon icon={faDumbbell} className={styles['fonticon']} />}
                            {amenity === 'Parking' && <FontAwesomeIcon icon={faParking} className={styles['fonticon']} />}
                            {amenity === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} className={styles['fonticon']} />}
                            {amenity === 'Kitchen' && <FontAwesomeIcon icon={faKitchenSet} className={styles['fonticon']} />}
                            {amenity === 'TV' && <FontAwesomeIcon icon={faTv} className={styles['fonticon']} />}
                            {amenity === 'Geyser' && <FontAwesomeIcon icon={faFire} className={styles['fonticon']} />}
                            {amenity === 'Power_backup' && <FontAwesomeIcon icon={faPowerOff} className={styles['fonticon']} />}
                            {amenity === 'CCTV' && <FontAwesomeIcon icon={faCamera} className={styles['fonticon']} />}
                            {amenity === 'Fire-Extinguisher' && <FontAwesomeIcon icon={faFire} className={styles['fonticon']} />}
                            {amenity === 'Elevator' && <FontAwesomeIcon icon={faElevator} className={styles['fonticon']} />}
                            {amenity === 'Card-payment' && <FontAwesomeIcon icon={faCreditCard} className={styles['fonticon']} />}
                            {amenity !== 'Free WIFI' && amenity !== 'AC' && amenity !== 'GYM' && amenity !== 'Parking' && amenity !== 'Swimming Pool' && amenity !== 'Kitchen' && amenity !== 'TV' && amenity !== 'Geyser' && amenity !== 'Power_backup' && amenity !== 'CCTV' && amenity !== 'Fire-Extinguisher' && amenity !== 'Elevator' && amenity !== 'Card-payment' && (
                              <>
                                <FontAwesomeIcon icon={faCheck} className={styles['fonticon']} />

                              </>)}
                            {amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HotelList;