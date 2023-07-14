import React from 'react';
import './Home.css'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const location=useLocation()
  if( location.pathname !== "/"){
    return null
    }
  return (
    <div>
     
      <img src="https://png.pngtree.com/template/20220421/ourmid/pngtree-woman-buying-clothes-in-hotel-banner-image_1313910.jpg" alt="Home" />
    </div>
  );
};

export default Home;
