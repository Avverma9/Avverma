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
    navigate(`/hotels/${offerId}`);
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
          <MdRoomPreferences />{" "}
          {offer.roomDetails && offer?.roomDetails[0]?.type}
        </p>
        <p class="_date">
          <BiRupee /> {offer.roomDetails && offer?.roomDetails[0]?.price}
        </p>
        {offer.roomDetails.map((room, index) => {
          let hasOfferDetails = false;

          if (!hasOfferDetails && room.offerDetails !== "N/A") {
            hasOfferDetails = true;
            return (
              <div key={index}>
                {room.offerDetails !== "N/A" ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {room.offerDetails}
                  </p>
                ) : (
                  <p>No offer details available</p>
                )}
              </div>
            );
          } else {
            return null; // Skip rendering for rooms with no offer details after the first room with offer details
          }
        })}


        <h2 style={{ color: "#3e4152" }}>{offer.offers}</h2>
        <p class="_body-content">{offer.description.substring(0,100)}...</p>
        <button className="_card-button">
          <IoIosArrowForward /> View Details
        </button>
      </div>
    </div>
  );
};
