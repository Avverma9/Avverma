/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Assam.css";

const Assampage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/assam"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/GUWAHATI.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Guwahati</h2>
            <p>
            The capital of the state of Assam, Dispur, is located within Guwahati. Serviced by Lokpriya Gopinath International Airport towards the west and India’s first fully solar-powered railway station at its heart, the city is well connected to other regions of the state and India. Millions of people each year traverse through the city for their livelihood, travels or for religious purposes. Kamakhya Temple, located at the top of the Nilachal Hill and dedicated to Goddess Kamakhya, plays host to thousands of devotees each day. Lakhs of pilgrims and tourists throng to this holy site during the Ambubachi Mela each year. Apart from the Temple of Kamakhya, other sacred temples such as Umananda and Navagraha are also present in the city.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Kaziranga national park</h2>
            <p>
           kaziranga national park is located at Assam state.it has Home to the largest population of the one-horned rhino on earth, Kaziranga National Park is one of India’s national treasures in terms of flora and fauna. Located in the state of Assam in North-Eastern India, its total area is shared by the districts of Nagaon, Golaghat and Karbi Anglong placing it roughly at the centre of the state. Approximately around five hours by road from Guwahati, Kaziranga National Park stands tall as the epitome of successful wildlife conservation in India. In 1985, it was awarded the status of a World Heritage Site by UNESCO
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/compressed/3339.jpg?v=1.1"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/bgImages/MAJULI.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Majuli</h2>
            <p>Majuli is a lush green environment-friendly, a pristine and pollution-free freshwater island in the river Brahmaputra, just 20 km from the Jorhat city and located 347 Kms from Guwahati. With a total area of 1250 sq. km, Majuli is the world's largest river island and it attracts tourists from all over the world. Among one of the most surreal places in India, </p>
          </div>
        </div>
      </div>
    );
};

export default Assampage;
