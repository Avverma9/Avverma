/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Karnataka.css";

const Kernatakapage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/karnataka"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/COORG.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Coorg</h2>
            <p>
           coorg is Located amidst imposing mountains in Karnataka with a perpetually misty landscape, Coorg is a popular coffee producing hill station. It is popular for its beautiful green hills and the streams cutting right through them. It also stands as a popular destination because of its culture and people. The Kodavas, a local clan specializing in martial arts, are especially notable for their keen hospitality.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Maysore</h2>
            <p>
            Famously known as The City of Palaces, it wouldn’t be wrong to say that Mysore, currently Mysuru, is one of the most important places in the country regarding ancient reigns. It is replete with the history of its dazzling royal heritage, intricate architecture, its famed silk sarees, yoga, and sandalwood, to name just a few. Located in the foothills of the Chamundi Hills, Mysore is the third most populated city in Karnataka, and its rich heritage draws millions of tourists all year round. The highlight is the majestic Mysore Palace, a UNESCO World Heritage Site, which is a must-visit.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/MYSORE.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/bgImages/HAMPI.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Hampi</h2>
            <p>Hampi is the city of ruins, is a UNESCO World Heritage Site. Situated in the shadowed depth of hills and valleys in the state of Karnataka, this place is a historical delight for travellers. Surrounded by 500 ancient monuments, beautiful temples, bustling street markets, bastions, treasury building and captivating remains of Vijayanagar Empire, Hampi is a backpacker's delight. Hampi is an open museum with 100+ locations to explore and a favourite way to see the city from the perspective of its history.</p>
          </div>
        </div>
      </div>
    );
};

export default Kernatakapage;
