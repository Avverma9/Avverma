/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Goa.css'

const Goapage = () => {
  const location = useLocation();
  const URL = "https://hotel-backend-tge7.onrender.com/statesData?state=Goa";
  const [data, setData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    
    fetchData();
  }, []);
  
  if (location.pathname !== "/state/goa") {
    return null;
  }
  
  return (
    <div>
      <div className="image-text-container">
        <div className="image">
          <img src={data[0]?.images[0]} alt="Image 1" />
        </div>
        <div className="text">
       <h2>Calangute Beach</h2>
          <p>{data[0]?.text[0]}</p>
        </div>
      </div>

      <div className="image-text-container">
        <div className="text">
          <h2>Fort Aguada</h2> 
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
        <h2>Anjuna Beach</h2> 
          <p>{data[0]?.text[2]}</p>
        </div>
      </div>
    </div>
  );
};

export default Goapage;
