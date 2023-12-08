import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import './Policy.css';

const Policy = () => {
  const navigate= useNavigate()
  const [data, setData] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const id = path.substring(path.lastIndexOf("/") + 1);

  useEffect(() => {
    console.log("Fetching data for id:", id);

    fetch(`https://hotel-backend-tge7.onrender.com/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Received data:", data);
        setData(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, [id]); // Include 'id' as a dependency

  if (location.pathname !== `/policy-page/${id}`) {
    return null;
  }
  const renderPolicyIcon = (value) => {
    if (value === "allowed") {
      return <p><FaCheck style={{ color: "green" }} /> Allowed</p>; 
    } else if (value === "notAllowed") {
      return <FaTimes style={{ color: "red" }} />; 
    } else if (value === null) {
        return <FaTimes style={{ color: "red" }} />
        } else {
      return null; 
    }
    
  };

const handleExit = ()=>{
  navigate(`/hotels/${id}`)
}
  return (
    <div className="policy-container">
      <button className="exit-button" onClick={handleExit}>Exit</button>
        <div className="hotelName"><p>Hotel Rooms-stay</p></div>
    
    <h3>{data.hotelName}</h3>
    <hr />
    <table>
      <tbody>
        <tr>
          <th>Check-In</th>
          <td>{data.checkInPolicy}</td>
          <th>Check-Out</th>
          <td>{data.checkOutPolicy}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <ul className="policy-list">
    <li class="policy-item">Out Side food Policy{renderPolicyIcon(data.outsideFoodPolicy)}</li>
    <br />
    <li>Cancellation Policy{renderPolicyIcon(data.cancellationPolicy)} </li>
    <br />
    <li class="policy-item">Unmarried Couples{renderPolicyIcon(data.unmarriedCouplesAllowed)}</li>
    <br />
    <li class="policy-item">Pets{renderPolicyIcon(data.petsAllowed)}</li>
    <br />
    <li class="policy-item">Smoking{renderPolicyIcon(data.smokingAllowed)}</li>
    <br />
    <li class="policy-item">Bachelor{renderPolicyIcon(data.bachelorAllowed)}</li>
    <br />
    <li class="policy-item">Alcohal{renderPolicyIcon(data.alcohalAllowed)} </li>
    <br />
    <li class="policy-item">International Guest{renderPolicyIcon(data.internationalGuestAllowed)}</li>
    <br />
    </ul>
    <hr />
    <li >{data.customerWelcomeNote}</li>
    <li>{data.hotelsPolicy}</li>
    <hr />
    <th>Return-Policy</th>
    <br />
    <li>{data.returnPolicy}</li>
  </div>
  );
};

export default Policy;
