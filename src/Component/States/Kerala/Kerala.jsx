/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Kerala.css";

const Keralapage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/kerala"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/MUNNAR.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Munnar</h2>
            <p>
            Munnar is Famous for the tea estates, greenery, winding roads, blanket of mist, and viewpoints, Munnar is a hill station in Kerala, located in the Idukki district. Lying in the Western Ghats at 1600 metres, it is one of the most sought after and visited travel destinations globally, especially popular amongst honeymooners.The hill station is a haven for shopping for tea and spices. Cardamom, ginger, cinnamon, clove, nutmeg, coffee and a variety of homemade chocolates can be bought from the number of shops spread across the hill town.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Alleppey</h2>
            <p>
            Alleppey is palm-fringed inter-connect network of canal backwaters attracts a lot of tourists from all over the world. Kuttanad, also called the 'Rice Bowl of Kerala' covers a large part of Allapuzha and is home to lush green paddy fields, lakes and backwaters. 

There are plenty of houseboats, homestays, and rejuvenating Ayurvedic resorts that make staying in Alleppey brilliant. The houseboats pass through the serene backwaters, where you can catch glimpses of green paddy fields, choir-making activities, and witness the life of locals in Kerala. Alleppey is also dotted with famous temples like Chettikulangara Devi Temple and Mullakkal Temple.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/ALLEPPEY.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/compressed/2670.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Kochi</h2>
            <p>kochi is Lying on the Malabar coast in the southwest of India, Kochi or Cochin is a port city with a trading history that dates back to at least 600 years. Known popularly as the Queen of the Arabian Sea, the city is also Kerala's financial, commercial, and industrial capital. Exuding an old-world charm with diverse linguistics, such as the Jews, Konkinis, Gujaratis, and ethnic communities like the anglo-indians, Kochi has an indiscriminate mix of backwaters, beaches, islands, coasts, and plain terrains</p>
          </div>
        </div>
      </div>
    );
};

export default Keralapage;
