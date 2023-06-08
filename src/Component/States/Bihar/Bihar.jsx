/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Bihar.css";

const Biharpage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/bihar"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/BODH-GAYA.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Bodh Gaya</h2>
            <p>
              

Bodh Gaya is a Buddhist pilgrimage site in Gaya District of Bihar. Famous for the Mahabodhi Temple, It was here under the Bodhi tree that Gautama Buddha attained enlightenment.

It is now one of the UNESCO World Heritage Sites, and a lot of foreign countries, including Japan and China, have helped the Indian government in building facilities for the Buddhist pilgrims. The place is bustling with pilgrims all through the year from India and abroad who come to pay their homage in monasteries, temples and remnants of Bodhi Tree.

Located near the river Neranjana, Bodh Gaya was earlier known as Uruwela. It was also known as Sambodhi, Vajrasana or Mahabodhi until the 18th century CE. It is one of the four important Buddhist sites that include: Kushinagar, Lumbini and Sarnath.

            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Patna</h2>
            <p>
            patna is Originally called as Pataliputra, Patna is currently a hot-bed for the culminating political fortunes. One of the oldest continuously inhabited places in the world, it is the quintessential North Indian town  - West of the city lies the area called Bankipur, while towards the southwest is the new area with wide roads and swanky buildings. The cultural heritage of Bihar is reflected in the many monuments housed in Patna, the most famous ones being Patna Sahib Gurudwara, Patna Planetarium, the Highcourt, Golghar, Secretariat Building and Padri ki Haveli among numerous other attractions. Typical of an Indian city, the riverside city of Patna is also known for some palatable dishes - litti chokha being the king of all! 
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/PATNA.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/bgImages/NALANDA.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Nalanda</h2>
            <p>This city houses one of the world's oldest and finest residential universities which itself was an architectural masterpiece. Although in ruins, the entire complex presents a pretty picture and is flocked by tourists day in and day out. It has “viharas” or monasteries to the east and “chaiyas” or temples to the west. In addition to this, the complex houses a charming little museum, which has a collection of several of original Buddhist stupas, Hindu and Buddhist bronzes, coins, terracotta jars, a sample of burnt rice etc. The district is believed to be a cradle of religions. Apart from Buddhism, it is an important center for Jainism, Hinduism, and Sufism as well. Considering the rich heritage and the historical importance, it is a hot tourist destination.</p>
          </div>
        </div>
      </div>
    );
};

export default Biharpage;
