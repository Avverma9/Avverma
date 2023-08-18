import React, { useEffect,useState } from 'react';
import './Home.css'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const[data,setData]=useState([])
  useEffect(()=>{
    fetch("https://hotel-backend-tge7.onrender.com/get/second/carousel")
    .then(res=>res.json())
    .then(data=>setData(data))
  })
  const location=useLocation()
  if( location.pathname !== "/"){
    return null
    }
  return (
    <div>
     
      {data.map(e=>(
        <div key={e._id}>
          <img src={e.images[0]} alt="" />
          <img src={e.images[1]} alt="" />
          <img src={e.images[2]} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Home;
