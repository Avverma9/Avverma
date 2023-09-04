import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faChevronLeft,
  faChevronRight,
  faSnowflake,
  faDumbbell,
  faParking,
  faSwimmingPool,
  faPaw,
  faGlassMartini,
  faSmoking,
  faStar,
  faKitchenSet,
  faTv,
  faFire,
  faPowerOff,
  faCamera,
  faElevator,
  faCreditCard,
  faCheck,
  faInr,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { MdLocationOn } from "react-icons/md";
// import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Cards } from "../Cards/Cards";
import "./Offers.css";

const Offers = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const isSignedIn = localStorage.getItem("isSignedIn")
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://hotel-backend-tge7.onrender.com/get/offers/main/hotels")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  if (location.pathname !== "/") {
    return null;
  }
if(!isSignedIn){
  return null
}
  const handleBookNow = (offerId) => {
    navigate(`/book-now/${offerId}`);
  };

  return (
    <div className="offers-container">
      {data && data.map((offer) => <Cards offer={offer} key={offer._id} />)}
    </div>
  );
};

export default Offers;
