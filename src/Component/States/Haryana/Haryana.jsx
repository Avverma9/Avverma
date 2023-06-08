/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Haryana.css";

const Haryanapage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/haryana"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/PANCHKULA.jpg"
              alt="Image 1"
//https://hotel-backend-tge7.onrender.com/statesData?state=Haryana
            />
          </div>
          <div className="text">
            <h2>Panchkula</h2>
            <p>
           panchkula Presents on the way to hills of Shimla, Panchkula is famous for the ruins of the Chandels and trekking on Morni Hills teemed with peacocks.

One of the most planned towns of Haryana, Panchkula is a satellite town that forms the tricity with Chandigarh and Mohali. Ruled by the Chandels from 9th-12th Century, this hill-city derives its name from the five irrigation canals or 'kuls' which draw water from the uphill Ghagghar. Sector 5 in Panchkula is popular for its variety of entertainment and eating out options.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Karnal</h2>
            <p>
            Karnal, a city in the Indian state of Haryana, boasts of a history reaching into the period of the Mahabharata. Nestled in the banks of the sacred Yamuna River, Karnal today is popularly called the ‘Rice Bowl of India’ for its vast rice fields.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/KARNAL.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/bgImages/ROHTAK.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Rohtak</h2>
            <p>The Heart of Haryana, Rohtak is situated just 70 kms away from the Heart of the India, Delhi and happens to be a part of the National Capital Region (NCR). There have been many rumours regarding the name of the city and its origins. With evidence suggesting that the old town is as old as the Indus Valley Civilization, Rohtak has turned out to be a city of fascination.</p>
          </div>
        </div>
      </div>
    );
};

export default Haryanapage;
