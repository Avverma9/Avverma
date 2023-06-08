/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Westbengal.css";

const Westbengalpage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/westbengal") {
    return null
  }
  return (
    <div>
      <div className="image-text-container">
        <div className="image">
          <img
            src="https://www.holidify.com/images/bgImages/DARJEELING.jpg"
            alt="Image 1"
          />
        </div>
        <div className="text">
          <h2>Darjeeling</h2>
          <p>


            Darjeeling is the former summer capital of India under the British Raj it has evolved into one of India's most sought-after hill stations. This picturesque hill destination in West Bengal is ideal for a romantic honeymoon. Darjeeling, nestled among acres of tea estates, it is 2,050 metres above sea level and thus has a cool climate all year.

            The third highest peak in the world and the highest in India, the Kanchenjunga peak, is visible from here, and you can enjoy a panoramic view of the peak. Some of Darjeeling's most popular attractions include monasteries, botanical gardens, a zoo, and the Darjeeling-Rangeet Valley Passenger Ropeway cable car, which is the longest Asian cable car. Tiger Hill is a fantastic spot to see the sunrise over the mountains in all its fiery glory.

          </p>
        </div>
      </div>

      <div className="image-text-container">
        <div className="text">
          <h2>Digha</h2>
          <p>
            Digha is a popular tourist destination known for its untouched beaches and scenic views, especially among people in West Bengal.

            Digha is a one-stop destination for families looking forward to spend a pleasurable weekend. One of the best features of this hamlet is its varied and diverse tourist attraction spots. Known for its magnificent beaches, religious temples and high-tech research centers and museums, this most popular sea resort of West Bengal has a lot to offer for people of all age groups. Digha's sceneries can also offer you the pleasure experienced in witnessing areas that have minimal human impact and are relatively untouched.
          </p>
        </div>
        <div className="image">
          <img
            src="https://www.holidify.com/images/compressed/1321.jpg"
            alt="Image 2"
          />
        </div>
      </div>

      <div className="image-text-container">
        <div className="image">
          <img src="https://www.holidify.com/images/compressed/2253.JPG" alt="Image 3" />
        </div>
        <div className="text">
          <h2>Murshidabad</h2>
          <p> From the Nawabs of the pre-British era to the Lords from England, Murshidabad has seen history from its core. This small tourist haven in West Bengal serves as a place that manages to combine the beauty of the past with the beliefs of the present.

            Calling it a religious town or a monument city would mean limiting its beauty and restricting it magnificence. This town reminds you that no matter how forward technology has brought us, some things are best experienced on foot. The city will transport you to a beautiful, ancient time and give you a great sense of peace </p>
        </div>
      </div>
    </div>
  );
};

export default Westbengalpage;
