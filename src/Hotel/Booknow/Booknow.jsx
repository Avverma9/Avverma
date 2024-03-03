/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays } from "date-fns";

import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import { RiArrowUpDownFill } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
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
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const location = useLocation();
  const [selectedFood, setSelectedFood] = useState([]);
  const [roomsCount, setRoomsCount] = useState(1);
  const path = location.pathname;
  const hotelId = path.substring(path.lastIndexOf("/") + 1);
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);

  const formatDate = (date) => {
    if (!date) return '';

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix = day % 10 <= 3 ? suffixes[day % 10] : suffixes[0];

    return `${day}${suffix} ${month} ${year}`;
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleAddFood = (food) => {
    // Check if the food item is already in selectedFood
    const existingFood = selectedFood.find(
      (selected) => selected._id === food._id
    );

    if (existingFood) {
      // If already selected, update the quantity
      const updatedFood = selectedFood.map((selected) =>
        selected._id === food._id
          ? { ...selected, quantity: selected.quantity + 1 }
          : selected
      );
      setSelectedFood(updatedFood);
    } else {
      // If not selected, add with quantity 1
      setSelectedFood([...selectedFood, { ...food, quantity: 1 }]);
    }
  };

  // Function to remove food from selectedFood state
  const handleRemoveFood = (food) => {
    const updatedFood = selectedFood
      .map((selected) =>
        selected._id === food._id
          ? { ...selected, quantity: selected.quantity - 1 }
          : selected
      )
      .filter((selected) => selected.quantity > 0);

    setSelectedFood(updatedFood);
  };
  const handleAddRoom = (room) => {
    // Check if the room is already selected
    const existingRoomIndex = selectedRooms.findIndex(
      (selected) => selected._id === room._id
    );

    if (existingRoomIndex !== -1) {
      // If room already selected, replace it
      const updatedRooms = [...selectedRooms];
      updatedRooms[existingRoomIndex] = room;
      setSelectedRooms(updatedRooms);
    } else {
      // If room not selected, add it
      setSelectedRooms([room]);
    }
  };

  // Function to remove room from selectedRooms state
  const handleRemoveRoom = (room) => {
    // Check if the room is the default room
    const isDefaultRoom = room.isDefault;

    // Check if the room is already selected
    const existingRoomIndex = selectedRooms.findIndex(
      (selected) => selected._id === room._id
    );

    if (existingRoomIndex !== -1 && !isDefaultRoom) {
      // If room already selected and it's not the default room, remove it
      const updatedRooms = selectedRooms.filter(
        (selected) => selected !== room
      );
      setSelectedRooms(updatedRooms);
    }
  };

  const calculateTotalPrice = () => {
    const roomPrice = selectedRooms.reduce(
      (total, room) => total + room.price,
      0
    );
    const foodPrice = selectedFood.reduce(
      (total, food) => total + food.price * food.quantity,
      0
    );

    // Multiply the room price by the updated roomsCount
    const updatedRoomPrice = roomPrice * roomsCount;

    return updatedRoomPrice + foodPrice;
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`${baseURL}/hotels/get-by-id/${hotelId}`);
        const data = await response.json();
        setHotelData(data);
        // Set the first room of the first hotel as the default selected room
        const defaultRoom = data.rooms[0][0];
        setSelectedRooms([defaultRoom]);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        // Handle error state
      }
    };

    fetchHotelData();
  }, [hotelId]);
  // booking details

  const calculateGuests = (roomsCount) => {
    // Assuming each room accommodates 2 guests
    return roomsCount * 2;
  };
  const guestsCount = calculateGuests(roomsCount);
  const handleIncrementRooms = () => {
    setRoomsCount((prevCount) => prevCount + 1);
  };

  const handleDecrementRooms = () => {
    if (roomsCount > 1) {
      setRoomsCount((prevCount) => prevCount - 1);
    }
  };

  const handleBookNow = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // Check if userMobile is available in localStorage
      const userMobile = localStorage.getItem("userMobile");

      if (!userMobile) {
        // If userMobile is not available, show an alert and navigate to the profile page
        alert(
          "Action required: Please update your mobile number in the profile."
        );
        navigate("/profile");
        return;
      }

      // Prepare data for API request
      const bookingData = {
        checkInDate: format(checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
        guests: guestsCount,
        numRooms: roomsCount,
        roomDetails: selectedRooms.map((room) => ({
          type: room.type,
          bedTypes: room.bedTypes,
          price: room.price,
        })),
        foodDetails: selectedFood.map((food) => ({
          name: food.name,
          price: food.price,
          quantity: food.quantity,
        })),
        price: calculateTotalPrice(),
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
      };

      console.log("Booking Payload:", bookingData); // Log the payload to check its structure

      // Make API request to book
      const response = await fetch(`${baseURL}/booking/${userId}/${hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.status === 201) {
        // Handle success, e.g., redirect to a confirmation page
        alert("Booking successful");
        navigate("/bookings");
      } else {
        // Handle error
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  //==============================
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
                  {hotelData.rooms?.[0]?.[0]?.price || 0}
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
            <div className="container-fluid">
              <div className="row">
                {/* Booking details */}

                {/* Special rooms */}
                <div className="col-md-8">
                  <div className="container mt-3">
                    <h6>Our Special rooms</h6>
                    <div className="d-flex flex-wrap gap-3">
                      {hotelData.rooms.map((roomArray, index) =>
                        roomArray.map((room, roomIndex) => (
                          <Card
                            key={roomIndex}
                            sx={{
                              maxWidth: 345,
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <CardActionArea style={{ flex: 1 }}>
                              <CardMedia
                                component="img"
                                height="140"
                                width="200px"
                                style={{ objectFit: "cover" }}
                                src={
                                  room.images && room.images.length > 0
                                    ? room.images[0]
                                    : hotelData.images[0]
                                }
                                alt={`Room ${index + 1} Image 1`}
                              />
                            </CardActionArea>
                            <CardContent style={{ flex: "none" }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {room.type}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Bed: {room.bedTypes}
                                <BedOutlinedIcon />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: <CurrencyRupeeIcon />
                                {room.price}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                size="small"
                                color="danger"
                                onClick={() => handleAddRoom(roomArray[0])}
                              >
                                Select
                              </Button>
                            </CardActions>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="booking-details-container container mt-3 border p-3"
                    style={{
                      position: "sticky",
                      top: "0",
                      width: "100%",
                      zIndex: "1000",
                    }}
                  >
                    <div
                      className="booking-details-container container mt-3 border p-3"
                      style={{
                        position: "sticky",
                        top: "0",
                        width: "100%",
                        zIndex: "1000",
                      }}
                    >
                      <h3>
                        <CurrencyRupeeIcon />
                        {calculateTotalPrice()}
                      </h3>
                    </div>
                    <div className="row g-3">
                    <div className="col-md-6">
      <label htmlFor="checkIn" className="form-label">
        Check-in
      </label>
      <DatePicker
        selected={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        dateFormat="d MMMM yyyy"
        className="form-control"
        placeholderText={formatDate(checkInDate)}
      />
    </div>
                      <div className="col-md-6">
                        <label htmlFor="checkOut" className="form-label">
                          Check-out
                        </label>
                        <DatePicker
                          selected={checkOutDate}
                          onChange={(date) => setCheckOutDate(date)}
                          dateFormat="d MMMM yyyy"
                          className="form-control"
                          placeholderText={formatDate(checkOutDate)}
                        />
                      </div>
                      {/* Selected Food */}
                      <div className="col-md-6">
                        <div>
                          <h6>Selected Meals</h6>
                          {selectedFood.map((selected, index) => (
                            <Card key={index} sx={{ maxWidth: 345 }}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  src={
                                    selected.images &&
                                    selected.images.length > 0
                                      ? selected.images[0]
                                      : hotelData.images[0]
                                  }
                                  alt={`Selected Food ${index + 1} Image 1`}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {selected.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Quantity: {selected.quantity}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Price: <CurrencyRupeeIcon />
                                    {selected.price * selected.quantity}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions>
                                <Button
                                  size="small"
                                  color="danger"
                                  onClick={() => handleRemoveFood(selected)}
                                >
                                  Remove
                                </Button>
                              </CardActions>
                            </Card>
                          ))}
                        </div>
                      </div>
                      {/* Selected Food End */}
                      <div className="col-md-6">
                        <div>
                          <h6>Selected Rooms</h6>
                          {selectedRooms.map((selected, index) => (
                            <Card key={index} sx={{ maxWidth: 345 }}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  src={
                                    selected.images &&
                                    selected.images.length > 0
                                      ? selected.images[0]
                                      : hotelData.images[0]
                                  }
                                  alt={`Selected Room ${index + 1} Image 1`}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {selected.type}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Bed: {selected.bedTypes}
                                    <BedOutlinedIcon />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Price: <CurrencyRupeeIcon />
                                    {selected.price}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions>
                                {!selected.isDefault && (
                                  <Button
                                    size="small"
                                    color="danger"
                                    onClick={() => handleRemoveRoom(selected)}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </CardActions>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center mt-3">
                      <div className="col-md-6">
                        <label className="form-label">Rooms</label>
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleDecrementRooms}
                          >
                            <RiArrowUpDownFill />
                          </button>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: "50px" }}
                            placeholder="Rooms"
                            value={roomsCount}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleIncrementRooms}
                          >
                            <RiArrowUpDownFill />
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="guests" className="form-label">
                          Guests
                        </label>
                        <input
                          type="number"
                          style={{ width: "100%" }}
                          className="form-control"
                          id="guests"
                          value={guestsCount}
                          readOnly
                        />
                      </div>

                      <div className="col-md-12 mt-3">
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: "55%" }}
                        >
                          Pay now
                        </Button>

                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleBookNow}
                        >
                          Pay at hotel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* booking details end */}
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
                        Price: <CurrencyRupeeIcon />
                        {foodArray[0].price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="danger"
                      onClick={() => handleAddFood(foodArray[0])}
                    >
                      Add +1
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
