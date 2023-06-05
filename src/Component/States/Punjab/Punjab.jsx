/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Punjab.css";

const PunjabPage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/punjab"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipPyReQAaR6k9s-8a9JI5Ah7tg5mba34zm5BQyMF=s680-w680-h510"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Sri Harmandir Sahib</h2>
            <p>
              The Golden Temple is a gurdwara located in the city of Amritsar,
              Punjab, India. It is the preeminent spiritual site of Sikhism. It
              is one of the holiest sites in Sikhism, alongside the Gurdwara
              Darbar Sahib Kartarpur in Kartarpur, and Gurdwara Janam Asthan in
              Nankana Sahib
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Jalianwala Bagh</h2>
            <p>
              Jallianwala Bagh is a historic garden and memorial of national
              importance close to the Golden Temple complex in Amritsar, Punjab,
              India, preserved in the memory of those wounded and killed in the
              Jallianwala Bagh Massacre that took place on the site on the
              festival of Baisakhi, 13 April 1919
            </p>
          </div>
          <div className="image">
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipNWR3VX64Qvd-1XYnpQ2q-sBXOBhdgK_q_R7GEX=s680-w680-h510"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://images.thrillophilia.com/image/upload/s--mm8dPj8A--/c_fill,g_center,h_642,q_auto,w_1280/f_auto,fl_strip_profile/v1/images/photos/000/179/309/original/1597152601_shutterstock_570946444.jpg.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Kapurthala</h2>
            <p>Kapurthala is a city in Punjab state of India. It is the administrative headquarters of Kapurthala District. It was the capital of the Kapurthala State, a princely state in British India</p>
          </div>
        </div>
      </div>
    );
};

export default PunjabPage;
