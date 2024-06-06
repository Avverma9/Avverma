import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWifi, FaTv, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";

const HotelCard = () => {
  return (
    <div className="container mt-4">
      <div className="row border p-3 bg-white">
        <div className="col-md-4">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Hotel"
            className="img-fluid rounded"
            // Replace the src with your actual image URL
          />
        </div>
        <div className="col-md-5">
          <h4>FabHotel Prime Sarala Crown With Pool</h4>
          <p className="text-muted">Calangute, Goa</p>
          <span className="badge bg-warning text-dark">
            100% Safe Place to Stay™
          </span>
          <div className="mt-2">
            <span className="badge bg-primary">4.6/5</span>
            <span className="text-muted ms-2">1,745 Reviews</span>
          </div>
          <div className="mt-2">
            <FaWifi /> Free Wifi
            <FaTv className="ms-3" /> LCD TV
            <FaShieldAlt className="ms-3" /> 24X7 Security
          </div>
          <a href="#" className="text-primary mt-2 d-block">
            + all other amenities
          </a>
          <p className="mt-2">
            FabHotel Sarala Crown With Pool, Calangute Beach is known to provide
            a memora...
          </p>
          <div className="mt-2">
            <GiPerson /> 4 people looking right now
          </div>
        </div>
        <div className="col-md-3 text-center">
          <ul className="list-unstyled">
            <li>
              <FaCheckCircle className="text-success" /> Free Cancellation
            </li>
            <li>
              <FaCheckCircle className="text-success" /> FREE Breakfast
            </li>
            <li>
              <FaCheckCircle className="text-success" /> Pay @ Hotel
            </li>
          </ul>
          <p className="text-muted text-decoration-line-through">₹5,750</p>
          <p className="text-danger">40% off</p>
          <h3>
            ₹3,408 <small className="text-muted">/night</small>
          </h3>
          <p className="text-muted">for 1 guest (Ex. GST)</p>
          <button className="btn btn-warning btn-block text-white">
            Select Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
