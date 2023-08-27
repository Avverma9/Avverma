import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import HotelList from '../Hotel';

function ParentComponent() {
  const [hotels, setHotels] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hotel-backend-tge7.onrender.com/get/all/hotels');
        if (response.status === 200) {
          const data = await response.json();
          setHotels(data);
          console.log(data, "PARENT");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
   

    console.log(hotels, "PARENT COMP")

  return (
    <div>
      <Sidebar setHotels={setHotels} />
      <HotelList hotels={hotels} />
      <h1>Hiiii</h1>
    </div>
  );
}

export default ParentComponent;
