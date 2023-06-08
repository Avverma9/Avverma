/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import '../Maharashtra/Maharashtra.css';

const Maharashtrapage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/maharashtra"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.fabhotels.com/blog/wp-content/uploads/2019/04/Venna-Lake-2.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Mahabaleshwar</h2>
            <p>
            Mahabaleshwar is a picturesque hill station nestled in the Western Ghats of Maharashtra, India. With its breathtaking landscapes, verdant hills, and cascading waterfalls, it is a popular tourist destination. Known for its pleasant climate, Mahabaleshwar offers mesmerizing viewpoints like Arthur's Seat and Wilson Point. Visitors can indulge in strawberry picking, explore ancient temples, and visit attractions such as Pratapgad Fort. It is a serene retreat for nature lovers and an ideal getaway from bustling city life.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Lonavala</h2>
            <p>
            Lonavala, a scenic hill station in Maharashtra, offers a tranquil escape from city life. Nestled amidst the Sahyadri Mountains, it boasts breathtaking landscapes, lush valleys, and majestic waterfalls. Immerse yourself in nature's beauty as you explore attractions like Tiger's Point, Bhushi Dam, and Karla Caves. Indulge in outdoor activities, trekking, and hiking adventures. At the end of the day, relax in comfortable accommodations and savor local cuisine. Lonavala is the perfect destination for rejuvenation and reconnecting with nature.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.fabhotels.com/blog/wp-content/uploads/2018/09/Lonavala.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/compressed/4566.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Khandala</h2>
            <p>Locate at Midway between Lonavala and Khandala is a fort by the name of Rajmachi Fort, a prominent landmark that watches over some of the most breathtakingly beautiful and wide sceneries of the region.This place is a fascinating historical fortress that provides a glimpse into the region's rich past. Surrounded by lush greenery, it offers breathtaking views of the surrounding valleys. Trekking enthusiasts are attracted to Rajmachi Fort for its scenic trails and the chance to explore its ancient ruins, including the fortified peaks of Shrivardhan and Manaranjan. The fort is a popular destination for nature lovers and history enthusiasts looking for adventure and cultural discovery.  </p>
          </div>
        </div>
      </div>
    );
};

export default Maharashtrapage;
