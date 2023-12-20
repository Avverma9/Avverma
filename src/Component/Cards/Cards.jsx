import React from "react";
import "./Cards.css";
import { IoIosArrowForward } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { MdLocationOn, MdRoomPreferences } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const Cards = ({ offer }) => {
  console.log(offer);
  const navigate = useNavigate();

  const handleBookNow = (offerId) => {
    navigate(`/book-now/${offerId}`);
  };

  return (
    <div className="_card" onClick={() => handleBookNow(offer._id)}>
      <header
        className="_card-header"
        style={{
          background: `linear-gradient(to top, rgba(57, 57, 57, 0.5),rgba(138, 137, 137, 0.5)), url(${offer.images[0]})`,
          backgroundSize: "cover",
        }}
      >
        <h4 className="_card-header--title">{offer.hotelName}</h4>
      </header>
      <div className="_card-body">
        <div className="d-flex align-items-center justify-content-between">
          <p class="_date">
            <MdLocationOn /> {offer?.city}
          </p>
          <p class="_date">
            <BsStarFill /> {offer?.starRating}
          </p>
        </div>
        <p class="_date">
          <MdRoomPreferences /> {offer.roomDetails && offer?.roomDetails[0]?.type}
        </p>
        <p class="_date">
          <BiRupee /> {offer.roomDetails && offer?.roomDetails[0]?.price}
        </p>
        {offer.roomDetails.originalPrice > offer.roomDetails.price && (
  
    <div className="offer-intro">

    <p>{offer.offerDetails} Get {offer.offerPriceLess}% Less</p>
    </div>
  
)}


        <h2 style={{ color: "#3e4152" }}>{offer.offers}</h2>
        <p class="_body-content">{offer.description}</p>
        <button className="_card-button">
          <IoIosArrowForward /> View Details
        </button>
      </div>
    </div>
  );
};
