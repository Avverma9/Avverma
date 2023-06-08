/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Rajasthan.css";

const Rajasthanpage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/rajasthan"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/cmsuploads/compressed/13515941894_d1880b9937_o_20190529165118.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Jaipur</h2>
            <p>
            Jaipur is called the Pink City, Jaipur is the capital of the royal state of Rajasthan. Along with Delhi and Agra, Jaipur forms the Golden Triangle and hails as one of the most famous tourist circuits in the country.

Rajputs ruled Jaipur for many centuries and developed as a planned city in the 17th century AD. With the old city surrounded by walls and gates decorated with drawings on the backdrop of a beautiful pink hue, Jaipur, the pink city, successfully retains its old-world charm. Home to a few UNESCO World Heritage sites, including Amer Fort and Jantar Mantar, Jaipur holds many magnificent forts, palaces, temples and museums and brims with bustling local bazaars where you can shop to your heart's content. The city is also very well known for its local food, and the most famous dishes include the Ghewar, Pyaaz Kachori and Dal Baati Churma. The city also hosts the Jaipur Literary Festival, which is Asia's biggest festival of its kind.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Udaipur</h2>
            <p>
            Udaipur, also known as the City of Lakes, is one of the most visited tourist places in Rajasthan. Located around stunning water lakes and enveloped by the Aravalli Hills in all directions, Udaipur is known for its azure lakes, magnificent palaces, vibrant culture and delectable food. Along with being a must-visit destination, it is also one of the best places to experience luxury in India. 
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/UDAIPUR.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/bgImages/JAISALMER.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Jaisalmer</h2>
            <p>Jaisalmer is a prominent tourist spot located in the northwestern state of Rajasthan in India. It is known as the 'golden city' due to its golden dunes and castles clad in golden honey sandstone. Jaisalmer is adorned with lakes, ornate Jain temples and havelis. Climb onto the camel saddle and make your way through this desert to camp under the starry night sky for an unforgettable experience.</p>
          </div>
        </div>
      </div>
    );
};

export default Rajasthanpage;
