/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Assam.css";

const Assampage = () => {
  const URL = "https://hotel-backend-tge7.onrender.com/statesData?state=Assam";
  const [data, setData] = useState({});
  const location = useLocation();



// fetch nearby hotels ---------
const fetchNearbyHotels = (destination) => {
  const nearbyHotelsEndpoint = 'https://hotel-backend-tge7.onrender.com/hotels/destination/get/all';

  fetch(nearbyHotelsEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      destination: destination,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
      
    })
    
    .then((data) => {
      console.log(data);
      
    })
    .catch((error) => {
      console.error('Error fetching nearby hotels:', error);
    });
};





  useEffect(() => {
    if(location.pathname !== "/state/assam"){
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }
}, [location.pathname]);

  

  if (location.pathname !== "/state/assam") {
    return null;
  }

  return (
    <div>
      <div className="image-text-container">
        <div className="image">
          <img src={data[0]?.images[0]} alt="Image 1" />
        </div>
        <div className="text">
          <p>{data[0]?.text[0]}</p>
          <button onClick={() => fetchNearbyHotels('Patna')}>get nearby hotels</button>
        </div>
      </div>

      <div className="image-text-container">
        <div className="text">
          <p>{data[0]?.text[1]}</p>
        </div>
        <div className="image">
          <img src={data[0]?.images[1]} alt="Image 2" />
        </div>
      </div>

      <div className="image-text-container">
        <div className="image">
          <img src={data[0]?.images[2]} alt="Image 3" />
        </div>
        <div className="text">
          <h2>Majuli</h2>
          <p>{data[0]?.text[2]}</p>
        </div>
      </div>
    </div>
  );
};

export default Assampage;
