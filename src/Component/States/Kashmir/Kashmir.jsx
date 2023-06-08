/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Kashmir.css";

const Kashmirpage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/kashmir"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/GULMARG.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Gulmarg</h2>
            <p>
           gulmarg is Situated at an altitude of 2730 m above sea level, Gulmarg is a popular skiing destination located in Pir Panjal Range of Union territory of Jammu and Kashmir. Surrounded by snow-covered lofty Himalayas, meadows of flowers, deep ravines, evergreen forested valleys, Gulmarg also has the world's second-highest Gondola ride.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>pahalgam</h2>
            <p>
           pahalgam is Situated in the Anantnag district, about 90km away from Srinagar, Pahalgam is a beautiful hill station and a popular tourist attraction of Jammu & Kashmir. Pahalgam is located on the banks of the Liddar River, and the rugged terrains, green meadows, and snow-capped mountains make it a perfect spot for adventure enthusiasts. Kolahoi Glaciers trek via a beautiful village named Aru is one of the popular trekking regions.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/PAHALGAM.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/cmsuploads/compressed/attr_986_20200729162341.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Aru velley</h2>
            <p>Aru Valley, situated in the Anantnag district of Jammu and Kashmir is a serene and enchanting tourist attraction located 12 km from Pahalgam. This tranquil hill station is nestled amidst green grasslands with a stunning view of the majestic Himalayan ranges. The valley serves as a base camp for numerous treks. It also provides opportunities for skiing, heli-skiing, horse riding, wildlife and bird watching. Aru Valley's natural beauty and adventure offerings make it an appealing destination for nature lovers and thrill-seekers alike.</p>
          </div>
        </div>
      </div>
    );
};

export default Kashmirpage;
