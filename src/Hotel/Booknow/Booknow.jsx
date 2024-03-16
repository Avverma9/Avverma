/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
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
  const [guestsCount, setGuestsCount] = useState(3);
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);

  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const suffixes = ["th", "st", "nd", "rd"];
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

    // Calculate the number of days between checkInDate and checkOutDate
    const daysDifference = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    // Multiply the room price by the updated roomsCount and daysDifference
    const updatedRoomPrice = roomPrice * roomsCount * daysDifference;

    return updatedRoomPrice + foodPrice;
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`${baseURL}/hotels/get-by-id/${hotelId}`);
        const data = await response.json();
        setHotelData(data);
        // Set the first room of the first hotel as the default selected room
        const defaultRoom = data.rooms;
        setSelectedRooms(defaultRoom);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        // Handle error state
      }
    };

    fetchHotelData();
  }, [hotelId]);
  // booking details

  const calculateGuests = (roomsCount) => {
    // Assuming each room accommodates 3 guests
    return roomsCount * 3;
  };

  // Update the handleIncrementRooms function to increase both rooms and guests count
  const handleIncrementRooms = () => {
    setRoomsCount((prevCount) => prevCount + 1);
    // Increase guests count whenever rooms count increases
    setGuestsCount(calculateGuests(roomsCount + 1));
  };

  // Update the handleDecrementRooms function to decrease both rooms and guests count
  const handleDecrementRooms = () => {
    if (roomsCount > 1) {
      setRoomsCount((prevCount) => prevCount - 1);
      // Decrease guests count whenever rooms count decreases
      setGuestsCount(calculateGuests(roomsCount - 1));
    }
  };

  // Handle changes in the guests input field
  const handleGuestsChange = (event) => {
    const newGuestsCount = parseInt(event.target.value);
    // Ensure that the new guests count is at least 1 or set to 1 if input is empty
    const validGuestsCount = newGuestsCount > 0 ? newGuestsCount : 1;
    setGuestsCount(validGuestsCount);
    // Calculate rooms count based on the new guests count
    const newRoomsCount = Math.ceil(validGuestsCount / 3);
    setRoomsCount(newRoomsCount);
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

  // Ensure that checkInDate and checkOutDate are different
  const handleCheckInDateChange = (date) => {
    if (date.toDateString() !== checkOutDate.toDateString()) {
      setCheckInDate(date);
    } else {
      alert("Check-in and Check-out dates cannot be the same.");
    }

    // Set checkOutDate to the next day of checkInDate
    const nextDay = addDays(date, 1);
    setCheckOutDate(nextDay);
  };

  // Ensure that checkInDate and checkOutDate are different
  const handleCheckOutDateChange = (date) => {
    if (date.toDateString() !== checkInDate.toDateString()) {
      setCheckOutDate(date);
    } else {
      alert("Check-in and Check-out dates cannot be the same.");
    }
  };
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
                  {hotelData.rooms?.[0]?.price || 0}
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
                <div key={index}>
                  {amenityArray.amenities
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
                      See +
                      <Typography>
                        {amenityArray.amenities.length - 5} more amenities
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
                      {amenityArray.amenities
                        .slice(5)
                        .map((amenity, innerIndex) => (
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
                      {hotelData.rooms.map((room, index) => (
                        <Card
                          key={index}
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
                            <Typography variant="body2" color="text.secondary">
                              Bed: {room.bedTypes}
                              <BedOutlinedIcon />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Price: <CurrencyRupeeIcon />
                              {room.price}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {/* Check if the room is already selected */}
                            {selectedRooms.findIndex(
                              (selected) => selected._id === room._id
                            ) !== -1 ? (
                              // If the room is selected, show a disabled "Selected" button
                              <Button
                                size="small"
                                color="success"
                                variant="outlined"
                                disabled
                              >
                                Selected
                              </Button>
                            ) : (
                              // If the room is not selected, show the "Select" button
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => handleAddRoom(room[0])}
                              >
                                Select
                              </Button>
                            )}
                          </CardActions>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                {/* For desktop view */}
                <div className="col-md-4 d-none d-sm-block">
                  <div
                    className="booking-details-container container mt-3 border p-3"
                    style={{
                      position: "sticky",
                      top: "0",
                      width: "100%",
                      zIndex: "1000",
                    }}
                  >
                    <h5>Booking details</h5>
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
                          onChange={handleCheckInDateChange}
                          dateFormat="d MMMM yyyy"
                          className="form-control"
                          placeholderText={formatDate(checkInDate)}
                          selectsStart
                          startDate={checkInDate}
                          endDate={checkOutDate}
                          onChangeRaw={(e) => e.preventDefault()}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="checkOut" className="form-label">
                          Check-out
                        </label>
                        <DatePicker
                          selected={checkOutDate}
                          onChange={handleCheckOutDateChange}
                          dateFormat="d MMMM yyyy"
                          className="form-control"
                          placeholderText={formatDate(checkOutDate)}
                          selectsEnd
                          startDate={checkInDate}
                          endDate={checkOutDate}
                          onChangeRaw={(e) => e.preventDefault()}
                        />
                      </div>
                      {/* Selected Food */}
                      <div className="col-md-6">
                        <div>
                          <h6>Selected Meals</h6>
                          {selectedFood.length > 0 ? (
                            selectedFood.map((selected, index) => (
                              <Card key={index} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    height="80"
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
                            ))
                          ) : (
                            // Render a default image and content when selectedFood is empty
                            <Card sx={{ maxWidth: 345 }}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  height="142"
                                  src="https://static.vecteezy.com/system/resources/previews/025/325/284/original/add-vegetables-in-pan-flat-semi-flat-colour-object-food-preparation-in-steel-pot-editable-cartoon-clip-art-icon-on-white-background-simple-spot-illustration-for-web-graphic-design-vector.jpg" // Replace with your default image path
                                  alt="Default Image"
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="p"
                                    component="div"
                                  >
                                    Add crispy foods during your stay
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          )}
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
                                  height="90"
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
                              <CardActions></CardActions>
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
                            <RemoveIcon />
                          </button>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: "50px" }}
                            placeholder="Rooms"
                            value={roomsCount}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleIncrementRooms}
                          >
                            <AddIcon />
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
                          onChange={(e) => handleGuestsChange(e)}
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
                        foodArray.images && foodArray.images.length > 0
                          ? foodArray.images
                          : hotelData.images[0]
                      }
                      alt={`Food ${index + 1} Image 1`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {foodArray.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        About: {foodArray.about}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: <CurrencyRupeeIcon />
                        {foodArray.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="danger"
                      onClick={() => handleAddFood(foodArray)}
                    >
                      Add +1
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
          {/* for mobile view */}
          <div className="col-md-4 d-block d-md-none">
            <div
              className="booking-details-container"
              style={{
                position: "sticky",
                top: "0",
                width: "100%",
                zIndex: "1000",
                padding: "20px",
              }}
            >
              <h5>Booking details</h5>
              <hr />
              <div
                className="booking-details-container"
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
              <hr />
              <div class="date-selection">
                {/* Check-in */}
                <div className="checkIn">
                  <p>Check-in</p>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInDateChange}
                    dateFormat="d MMMM yyyy"
                    placeholderText={formatDate(checkInDate)}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    onChangeRaw={(e) => e.preventDefault()}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="datepicker-input"
                  />
                </div>
                {/* Check-out */}
                <div className="checkOut">
                  <p>Check-out</p>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutDateChange}
                    dateFormat="d MMMM yyyy"
                    placeholderText={formatDate(checkOutDate)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    onChangeRaw={(e) => e.preventDefault()}
                    className="datepicker-input"
                  />
                </div>
              </div>

              {/* Rooms and Guests */}
              <hr />
              <div className="row g-3 align-items-center mt-3">
                <div className="col-md-6">
                  <label className="form-label">Rooms</label>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleDecrementRooms}
                    >
                    <RemoveIcon />  
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: "50px" }}
                      placeholder="Rooms"
                      value={roomsCount}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleIncrementRooms}
                    >
                      <AddIcon />
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
                    onChange={(e) => handleGuestsChange(e)}
                  />
                </div>

                <hr />
              </div>
              {/* Selected Food */}
              <div className="selected-cotainer">
                <div>
                  <h6>Selected Meals</h6>
                  {selectedFood.length > 0 ? (
                    selectedFood.map((selected, index) => (
                      <Card key={index} sx={{ maxWidth: 170 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="68"
                            src={
                              selected.images && selected.images.length > 0
                                ? selected.images[0]
                                : hotelData.images[0]
                            }
                            alt={`Selected Food ${index + 1} Image 1`}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="p"
                              component="div"
                            >
                              {selected.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Quantity: {selected.quantity}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
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
                    ))
                  ) : (
                    <Card sx={{ maxWidth: 170 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="142"
                          src="https://static.vecteezy.com/system/resources/previews/025/325/284/original/add-vegetables-in-pan-flat-semi-flat-colour-object-food-preparation-in-steel-pot-editable-cartoon-clip-art-icon-on-white-background-simple-spot-illustration-for-web-graphic-design-vector.jpg"
                          alt="Default Image"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="p" component="div">
                            Add crispy foods during your stay
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  )}
                </div>
                <div>
                  <h6>Selected Rooms</h6>
                  {selectedRooms.map((selected, index) => (
                    <Card key={index} sx={{ maxWidth: 170 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="90"
                          src={
                            selected.images && selected.images.length > 0
                              ? selected.images[0]
                              : hotelData.images[0]
                          }
                          alt={`Selected Room ${index + 1} Image 1`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="p" component="div">
                            {selected.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Bed: {selected.bedTypes}
                            <BedOutlinedIcon />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: <CurrencyRupeeIcon />
                            {selected.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions></CardActions>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="col-md-12 mt-3">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: "35%" }}
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
          <div className="extras">
            <div className="hotel-policies-container">
              {hotelData.policies.map((policy, index) => (
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
