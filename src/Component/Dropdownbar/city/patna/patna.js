import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSnowflake, faDumbbell, faParking, faSwimmingPool, faPaw, faGlassMartini, faSmoking, faStar, faKitchenSet, faTv, faFire, faPowerOff, faCamera, faElevator, faCreditCard, faCheck, faInr, faLocationDot, faHotel, faPerson } from '@fortawesome/free-solid-svg-icons';

// import RangeSlider from './Rangeslider/range';
import Imgslide from '../slider/sliderimage';






function Patna() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [expandedResultId, setExpandedResultId] = useState(null);
  const navigate = useNavigate();
 
  
 
  

  useEffect(() => {
    fetch('https://hotel-backend-tge7.onrender.com/hotels?destination=Patna')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Logging the received data
        setHotels(data);
        console.log(hotels);
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
    <div className='whole-data' style={{display:"flex"}}>
    <div className="vertical-bar" style={{flex:"0 0 25%"}}>
    <div className='filt-1st'>
            <h3 className='filterhead'>Filters</h3>
            <h5 className='filterprice'>price</h5>
            
            {/* <RangeSlider/> */}
            </div>
            <hr/>
            <div className='filt-2nd'>
              <h5 className='colle'>Collections</h5>
              <label> <input type='checkbox'/>Family Oyo</label>
              <label> <input type='checkbox'/>For Group Travellers</label>
              <label> <input type='checkbox'/>Local ID Accepted</label>
              <label> <input type='checkbox'/>Welcomes Couple</label>
              <label> <input type='checkbox'/>International Guest</label>
              
            </div>
            <hr/>
            <div className='filt-3rd'>
              <h5 className='colle'>Categroies</h5>
              <label> <input type='checkbox'/>Family Oyo</label>
              <label> <input type='checkbox'/>Family Oyo</label>
              <label> <input type='checkbox'/>Family Oyo</label>
              <label> <input type='checkbox'/>Family Oyo</label>
              <label> <input type='checkbox'/>Family Oyo</label>

            </div>
            <hr/>
            <div className='filt-4th'>
              <h5 className='colle'>Accomodation Type</h5>
              <label> <input type='checkbox'/>Hostel</label>
              <label> <input type='checkbox'/>Hotel</label>
            </div>
            <hr/>
            <div className='filt-5th'>
              <h5 className='colle'>Hotel Facilities</h5>
              <label> <input type='checkbox'/>Sitting Area</label>
              <label> <input type='checkbox'/>Balcony</label>
              <label> <input type='checkbox'/>Full Sized Bed</label>
              <label> <input type='checkbox'/>King Sized Bed</label>
              <label> <input type='checkbox'/>Queen Sized Bed</label>

            </div>
            <hr/>
            <div className='filt-6th'>
              <h5 className='colle'>Check In Feature</h5>
              <label> <input type='checkbox'/>Pay At Hotel</label>

            </div>
          </div>
         
      <div className="search-results" style={{flex:"0 0 70%"}}>
      




                  











        {hotels.map((result) => (
          <div key={result._id} className={`search-result ${expandedResultId === result._id ? 'expanded' : ''}`}>
  
          
           <Imgslide/>
      
    
            
            <div className='search-result-content'>
              <div className='hotel-info00'>
                <h3 className='search-result-title'>{result.hotelName}</h3>
                <p className='search-result-destination'><FontAwesomeIcon icon={faLocationDot} className='location' />{result.destination}</p>
              </div>
              <h5 className='hotel-rating'>{result.rating}<FontAwesomeIcon icon={faStar} className='fastar' /></h5>




              <div className='amenities'>
              
                <ul>
                  {result.amenities.slice(0, 3).map((amenity) => (
                    <li key={amenity}>
                    {amenity === 'Free WIFI' && <FontAwesomeIcon icon={faWifi} className='fonticon' />}
                          {amenity === 'AC' && <FontAwesomeIcon icon={faSnowflake} className='fonticon' />}
                          {amenity === 'GYM' && <FontAwesomeIcon icon={faDumbbell} className='fonticon' />}
                          {amenity === 'Parking' && <FontAwesomeIcon icon={faParking} className='fonticon' />}
                          {amenity === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} className='fonticon' />}
                          {amenity === 'Kitchen' && <FontAwesomeIcon icon={faKitchenSet} className='fonticon' />}
                          {amenity === 'TV' && <FontAwesomeIcon icon={faTv} className='fonticon' />}
                          {amenity === 'Geyser' && <FontAwesomeIcon icon={faFire} className='fonticon' />}
                          {amenity === 'Power_backup' && <FontAwesomeIcon icon={faPowerOff} className='fonticon' />}
                          {amenity === 'CCTV' && <FontAwesomeIcon icon={faCamera} className='fonticon' />}
                          {amenity === 'Fire-Extinguisher' && <FontAwesomeIcon icon={faFire} className='fonticon' />}
                          {amenity === 'Elevator' && <FontAwesomeIcon icon={faElevator} className='fonticon'/>}
                          {amenity === 'Card-payment' && <FontAwesomeIcon icon={faCreditCard} className='fonticon' />}
                          {amenity !== 'Free WIFI' && amenity !== 'AC' && amenity !== 'GYM' && amenity !== 'Parking' && amenity !== 'Swimming Pool' && amenity !== 'Kitchen' && amenity !== 'TV' && amenity !== 'Geyser' && amenity !== 'Power_backup' && amenity !== 'CCTV' && amenity !== 'Fire-Extinguisher' && amenity !== 'Elevator' && amenity !== 'Card-payment' && (
                            <>
                              <FontAwesomeIcon icon={faCheck} className='fonticon' />

                            </>)}
                      {amenity}
                      
                    </li>
                    
                  ))}
                  
                  
                </ul>
              </div>





              <div className='mixrupeebutton' style={{display:'flex',justifyContent:'space-between',marginTop:"60px"}}>
              <div className='rupeedetail'>
              
              <p className='search-result-price'><FontAwesomeIcon icon={faInr} className='rupees' /> {result.price}<span className='detail'>per room per night</span></p></div>
              <div className='flex-button' style={{display:"flex",flexDirection:"row",gap:"15%",width:"46%"}}>
              <button className='view-details-button' onClick={() => toggleDetails(result._id)}>
                View Details
              </button>
              <button className='book-now-button' onClick={() => handleBuy(result._id)}>
                Book Now
              </button>
              </div>
              </div>
              
              <p className='search-result-availability'>Local ID: {result.availability}</p>
              <hr/>

              

              {expandedResultId === result._id && (
                <div>
                  <div className='amenities'>
                    <h6>More:</h6>
                    <ul>
                      {result.moreOptions.map((more) => (
                        <li key={more}>
                          {more === 'Pets Allowed' && <FontAwesomeIcon icon={faPaw} className='fonticon' />}
                          {more === 'Alcohol Allowed' && <FontAwesomeIcon icon={faGlassMartini} className='fonticon' />}
                          {more === 'Smoking Allowed' && <FontAwesomeIcon icon={faSmoking} className='fonticon' />}
                          {more}</li>
                      ))}
                    </ul>
                  </div>
                  <hr />

                  <div className='amenities'>
                    <h6>Amenities:</h6>
                    <ul>
                      {result.amenities.map((amenity) => (
                        <li key={amenity}>
                          {amenity === 'Free WIFI' && <FontAwesomeIcon icon={faWifi} className='fonticon' />}
                          {amenity === 'AC' && <FontAwesomeIcon icon={faSnowflake} className='fonticon' />}
                          {amenity === 'GYM' && <FontAwesomeIcon icon={faDumbbell} className='fonticon' />}
                          {amenity === 'Parking' && <FontAwesomeIcon icon={faParking} className='fonticon' />}
                          {amenity === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} className='fonticon' />}
                          {amenity === 'Kitchen' && <FontAwesomeIcon icon={faKitchenSet} className='fonticon' />}
                          {amenity === 'TV' && <FontAwesomeIcon icon={faTv} className='fonticon' />}
                          {amenity === 'Geyser' && <FontAwesomeIcon icon={faFire} className='fonticon' />}
                          {amenity === 'Power_backup' && <FontAwesomeIcon icon={faPowerOff} className='fonticon' />}
                          {amenity === 'CCTV' && <FontAwesomeIcon icon={faCamera} className='fonticon' />}
                          {amenity === 'Fire-Extinguisher' && <FontAwesomeIcon icon={faFire} className='fonticon' />}
                          {amenity === 'Elevator' && <FontAwesomeIcon icon={faElevator} className='fonticon' />}
                          {amenity === 'Card-payment' && <FontAwesomeIcon icon={faCreditCard} className='fonticon' />}
                          {amenity !== 'Free WIFI' && amenity !== 'AC' && amenity !== 'GYM' && amenity !== 'Parking' && amenity !== 'Swimming Pool' && amenity !== 'Kitchen' && amenity !== 'TV' && amenity !== 'Geyser' && amenity !== 'Power_backup' && amenity !== 'CCTV' && amenity !== 'Fire-Extinguisher' && amenity !== 'Elevator' && amenity !== 'Card-payment' && (
                            <>
                              <FontAwesomeIcon icon={faCheck} className='fonticon' />

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

export default Patna;
