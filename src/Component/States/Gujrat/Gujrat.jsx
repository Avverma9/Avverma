/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Gujrat.css";

const Gujratpage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/gujrat"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/GIR-NATIONAL-PARK.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Gir National park</h2>
            <p>
            Gir National Park and Wildlife Sanctuary is the only remaining home for the Asiatic Lions. Located in Talala Gir in Gujarat, the Sanctuary is a part of Kathiawar- Gir dry deciduous forests ecoregion. Gir National Park is closed from 16 June to 15 October every year and the best time for wildlife spotting is April and May.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Somnath</h2>
            <p>
            Somnath is literally meaning 'lord of the moon' is a pilgrim center and is home to one of the 12 Jyotirlingas. It is a town which derives much of its identity from the mythology, religion, and legends that surround it.

Primarily a temple town, Somnath is a place where a strong scent of religion and legends lingers around tourism and even daily life.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/SOMNATH.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/cmsuploads/compressed/shutterstock_700625821_20191205140715.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Kutch</h2>
            <p>Virtually an island that resembles the shape of a tortoise, Kutch is an erstwhile princely state of India holding onto its grandeur nature from the past. Kutch is probably one of the most beautiful, yet surreal places in India with the vast expanses of the white salt desert.  The place comes to life during the winters when the Rann Festival is held during December-February everywhere in which there are huge camp settlements with cultural programs, functions and adventure activities like hot-air ballooning. </p>
          </div>
        </div>
      </div>
    );
};

export default Gujratpage;
