/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Tamilnadu.css";

const Tamilnadupage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/tamilnadu"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/MADURAI.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Madurai</h2>
            <p>
            Madurai is the cultural capital of Tamil Nadu it is one of the oldest continuously inhabited cities of India and Ruled by Pandya kings for the longest time in its history. it is called as the 'Lotus City' as it was planned and built in the shape of a lotus. Madurai is known for Meenakshi Amman Temple, dedicated to the goddess Meenakshi with a sanctum for her consort, Sundareshwarar. 
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Alagar koil</h2>
            <p>
              

Alagar Koil is an exquisite temple situated in the north east of Madurai. The temple is the rest place of Lord Vishnu and is the sacred place for several followers of Lord Vishnu in the region.

It is situated in the Alagar hills and is also known as Azhagarkovil. The statue of the lord is made entirely of stone and is a splendid masterpiece created from kallalgar.A variety of statues in different postures of the Lord are all kept in the temple under the same roof and is the best form of distinct temples in southern India. H73The people of the region consider Lord Vishnu to be an extremely knowledgable,humble yet powerful king and the ruler of the earth. The devotees offer holy prayers from the bottom of their hearts. The temple has spectacular halls and other facilities to perform different rituals with sacred mantras in the holy environ.

            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1308338176_20200219152706_20200219152732.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/compressed/2649.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Chettinad</h2>
            <p>Chettinad is Located in the Sivaganga district of Tamil Nadu, Chettinad Showcases the rich heritage, striking art and grand architecture of the state. Apart from being known as a temple town, the Chettinad Cuisine is the most renowned in the repertoire of Tamil Nadu. The word "Chetti" is a Sanskrit term meaning wealth. It is derived from the original traders of the region who dealt in salt and spices for marbles and other decorative items used in the construction of their properties. It has an elaborately vibrant culture and an over the top extortionate township comprising of ridiculously opulent mansions, palatial homes, magnificent temples and fascinating museums.</p>
          </div>
        </div>
      </div>
    );
};

export default Tamilnadupage;
