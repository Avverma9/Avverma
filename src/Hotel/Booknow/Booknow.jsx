/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccordionSummary from "@mui/material/AccordionSummary";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea, CardActions } from "@mui/material";

import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IconContext } from "react-icons";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import {
  FaCoffee,
  FaTv,
  FaWifi,
  FaDumbbell,
  FaShuttleVan,
  FaBed,
  FaUtensils,
  FaPhone,
  FaHotTub,
  FaDoorOpen,
} from "react-icons/fa";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Boxes from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import "./Booknow.css";
import baseURL from "../../baseURL";

const BookNow = () => {
  const [hotelData, setHotelData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const hotelId = path.substring(path.lastIndexOf("/") + 1);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`${baseURL}/hotels/get-by-id/${hotelId}`);
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        // Handle error state
      }
    };

    fetchHotelData();
  }, [hotelId]);

  if (!path.includes("/book-hotels/")) {
    return null;
  }
  const amenityIcons = {
    "Continental Breakfast": <FaUtensils />,
    "Room Service": <FaPhone />,
    "Coffee Maker": <FaCoffee />,
    Balcony: <FaDoorOpen />,
    Jacuzzi: <FaHotTub />,
    TV: <FaTv />,
    "Free Wi-Fi": <FaWifi />,
    Gym: <FaDumbbell />,
    "24-Hour Front Desk": <FaShuttleVan />,
    "Shuttle Service": <FaShuttleVan />,
  };
  const defaultIcon = <FaBed />;
  return (
    <div className="book-now-container">
      {hotelData ? (
        <>
          <div
            id="carouselExample"
            className="carousel slide mb-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {hotelData.images &&
                hotelData.images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={`Hotel Image ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
            aria-label="Previous"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
            aria-label="Next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
          <div className="extras">
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "5px" }}>
                <div
                  className="price"
                  style={{ marginLeft: "5px", fontSize: "28px" }}
                >
                  {" "}
                  <CurrencyRupeeIcon />
                  {hotelData.rooms[0][0].price}
                </div>
              </div>
            </div>
            <h5 className="hotel-name">
              {hotelData.starRating}
              <StarHalfIcon /> {hotelData.hotelName}{" "}
            </h5>
            <div className="hote-address">
              {" "}
              <p>
                {hotelData.city}, {hotelData.destination}, {hotelData.state},{" "}
                {hotelData.zip}
              </p>
            </div>
          </div>{" "}
          <div className="extras">
            <p>{hotelData.description}</p>
          </div>
          <div className="extras">
            <div className="amenities-container">
              <h6>Our amenities</h6>
              {hotelData.amenities.map((amenityArray, index) => (
                <div key={amenityArray[0]._id}>
                  {amenityArray[0].amenities
                    .slice(0, 5)
                    .map((amenity, innerIndex) => (
                      <div key={innerIndex}>
                        {" "}
                        <IconContext.Provider value={{ size: "1.2em" }}>
                          {amenityIcons[amenity] || defaultIcon} {amenity}
                        </IconContext.Provider>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className="hotel-policies-container">
              {hotelData.amenities.map((amenityArray, index) => (
                <Accordion
                  key={amenityArray[0]._id}
                  expanded={expanded}
                  onChange={handleExpansion}
                  slotProps={{ transition: { timeout: 400 } }}
                  sx={{
                    "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
                    "& .MuiAccordionDetails-root": {
                      display: expanded ? "block" : "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      See +{" "}
                      <Typography>
                        {" "}
                        {amenityArray[0].amenities.length - 5} more amenities
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {amenityArray[0].amenities.map((amenity, innerIndex) => (
                        <div
                          key={innerIndex}
                          style={{
                            marginBottom: "8px",
                            flexBasis: "33%",
                            boxSizing: "border-box",
                          }}
                        >
                          <IconContext.Provider value={{ size: "1.2em" }}>
                            {amenityIcons[amenity] || defaultIcon} {amenity}
                          </IconContext.Provider>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
          {/* Rooms */}
          <div className="extras">
            <h6>Our Special rooms</h6>
            {hotelData.rooms.map((roomArray, index) =>
              roomArray.map((room, roomIndex) => (
                <Card key={roomIndex} sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      src={
                        room.images && room.images.length > 0
                          ? room.images[0]
                          : hotelData.images[0]
                      }
                      alt={`Food ${index + 1} Image 1`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {room.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bed: {room.bedTypes}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${room.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Select
                    </Button>
                  </CardActions>
                </Card>
              ))
            )}
          </div>
          {/* Policies */}
          <div className="extras">
            <div>
              <h6>Add Meals During Your Stay</h6>
              {hotelData.foods.map((foodArray, index) => (
                <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      src={
                        foodArray[0].images && foodArray[0].images.length > 0
                          ? foodArray[0].images[0]
                          : hotelData.images[0]
                      }
                      alt={`Food ${index + 1} Image 1`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {foodArray[0].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        About: {foodArray[0].about}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${foodArray[0].price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="danger">
                      Add
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
          <div className="extras">
            <div className="hotel-policies-container">
              {hotelData.policies.map((policyArray, index) => (
                <Accordion
                  key={index}
                  expanded={expanded}
                  onChange={handleExpansion}
                  slotProps={{ transition: { timeout: 400 } }}
                  sx={{
                    "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
                    "& .MuiAccordionDetails-root": {
                      display: expanded ? "block" : "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography>Hotel Policies</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div className="policy-container">
                        <p>Local ID:</p>

                        {hotelData.localId}
                        <hr />
                        {policyArray.map((policy, index) => (
                          <React.Fragment key={index}>
                            <p>Hotel's Policy</p>
                            {policy.hotelsPolicy}
                            <hr />
                            <div className="checkIn-policy">
                              <p>Check In Policy:</p>

                              {policy.checkInPolicy}

                              <p>Check Out Policy:</p>

                              {policy.checkOutPolicy}
                            </div>
                            <hr />
                            <p>Outside Food Policy:</p>

                            {policy.outsideFoodPolicy}
                            <hr />
                            <p>Cancellation Policy:</p>

                            {policy.cancellationPolicy}
                            <hr />
                            <p>Payment Mode:</p>

                            {policy.paymentMode}
                            <hr />
                            <p>Pets Allowed:</p>

                            {policy.petsAllowed}
                            <hr />
                            <p>Bachelor Allowed:</p>

                            {policy.bachelorAllowed}
                            <hr />
                            <p>Smoking Allowed:</p>

                            {policy.smokingAllowed}
                            <hr />
                            <p>Alcohol Allowed:</p>

                            {policy.alcoholAllowed}
                            <hr />
                            <p>Unmarried Couples Allowed:</p>

                            {policy.unmarriedCouplesAllowed}
                            <hr />
                            <p>International Guest Allowed:</p>

                            {policy.internationalGuestAllowed}
                            <hr />
                            <p>Return Policy:</p>

                            {policy.returnPolicy}
                            <hr />
                          </React.Fragment>
                        ))}
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
};

export default BookNow;
