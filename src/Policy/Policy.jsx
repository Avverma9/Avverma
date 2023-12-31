import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./Policy.css";

const Policy = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const id = path.substring(path.lastIndexOf("/") + 1);

  useEffect(() => {
    console.log("Fetching data for id:", id);

    fetch(`https://hotel-backend-tge7.onrender.com/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        setData(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [id]); // Include 'id' as a dependency

  if (location.pathname !== `/policy-page/${id}`) {
    return null;
  }
  const renderPolicyIcon = (value) => {
    if (value === "allowed") {
      return (
        <p>
          <FaCheck style={{ color: "green" }} /> Allowed
        </p>
      );
    } else if (value === "notAllowed") {
      return <FaTimes style={{ color: "red" }} />;
    } else if (value === null) {
      return <FaTimes style={{ color: "red" }} />;
    } else {
      return null;
    }
  };

  const handleExit = () => {
    navigate(`/hotels/${id}`);
  };
  return (
    <div className="policy-container">
      <button className="exit-button" onClick={handleExit}>
        Exit
      </button>
      <div className="hotelName">
        <p>Hotel Rooms-stay</p>
      </div>
      <hr />

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
        <p className="policy-item">
          Out Side food Policy{renderPolicyIcon(data.outsideFoodPolicy)}
        </p>
        <br />
        <p className="policy-item">
          Cancellation Policy{renderPolicyIcon(data.cancellationPolicy)}{" "}
        </p>
        <br />
        <p className="policy-item">
          Unmarried Couples{renderPolicyIcon(data.unmarriedCouplesAllowed)}
        </p>
        <br />
        <p className="policy-item">Pets{renderPolicyIcon(data.petsAllowed)}</p>
        <br />
        <p className="policy-item">
          Smoking{renderPolicyIcon(data.smokingAllowed)}
        </p>
        <br />
        <p className="policy-item">
          Bachelor{renderPolicyIcon(data.bachelorAllowed)}
        </p>
        <br />
        <p className="policy-item">
          Alcohal{renderPolicyIcon(data.alcohalAllowed)}{" "}
        </p>
        <br />
        <p className="policy-item">
          International Guest{renderPolicyIcon(data.internationalGuestAllowed)}
        </p>
        <br />
      </ul>
      <hr />
      <th>Welcome Note</th>
      <p>{data.customerWelcomeNote}</p>
      <hr />
      <th>Hotel Policy</th>
      <p>
        {data.hotelsPolicy && data.hotelsPolicy.includes("\n")
          ? data.hotelsPolicy.split("\n").map((point, index) => (
              <span key={index}>
                {index > 0 && <br />}{" "}
                {/* Add line break if not the first line */}
                {point.trim()}
              </span>
            ))
          : data.hotelsPolicy}
      </p>
      <hr />
      <th>Return-Policy</th>
      <br />
      {data.returnPolicy && data.returnPolicy.includes("\n")
        ? data.returnPolicy.split("\n").map((point, index) => (
            <span key={index}>
              {index > 0 && <br />} {/* Add line break if not the first line */}
              {point.trim()}
            </span>
          ))
        : data.returnPolicy}
    </div>
  );
};

export default Policy;
