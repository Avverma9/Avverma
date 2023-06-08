/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";


const Goapage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/goa"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1314723038_20190822145625.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Calangute Beach</h2>
            <p>
            Calangute Beach, located in North Goa, is a popular and vibrant coastal destination in India. With its golden sand, turquoise waters, and palm-fringed shores, it offers a picturesque setting for beach lovers. Calangute Beach is known for its lively atmosphere, water sports activities, and beach shacks serving delicious Goan cuisine. It attracts both domestic and international tourists who come to enjoy sunbathing, swimming, and indulging in the vibrant beach culture. The nearby bustling market and nightlife scene add to the allure of Calangute Beach as a top tourist hotspot in Goa.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Fort Aguada</h2>
            <p>
            Aguada Fort is situated in Goa it is a historic Portuguese fortress that stands as a testament to the region's colonial past Fort Aguada is a 17th-century Portuguese fort looking out at the confluence of Mandovi River and the Arabian Sea. The crumbling ramparts of the fort stand on the Sinquerim Beach, approximately 18 km from Panjim. The highlight of the fort is a lone four-storey lighthouse (which is one-of-its-kind in Asia )and a stunning view of the sunset.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1065727913_20190822150731.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1065723824_20190822151024.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Anjuna Beach</h2>
            <p>Anjuna beach is Located near Panjim at a distance of 21 km, Anjuna Beach is among the most popular beaches in North Goa, stretching almost 2km. A hippie paradise of sorts it is characterized by its rocky outcrops. From family outings to adrenaline-filled adventures Anjuna Beach is famed for its golden coastline, nightclubs, beach shacks, watersports, full-moon parties and flea markets.</p>
          </div>
        </div>
      </div>
    );
};

export default Goapage;
