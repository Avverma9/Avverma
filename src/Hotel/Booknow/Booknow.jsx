/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Face4TwoToneIcon from "@mui/icons-material/Face4TwoTone";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import { FaPlus, FaMinus } from "react-icons/fa";
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
import { CardActionArea, CardActions, Grid } from "@mui/material";
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
  const roomsRef = useRef(null);
  const foodsRef = useRef(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
  const handleIncrementGuests = () => {
    setGuestsCount(guestsCount + 1);
    const newRoomsCount = Math.ceil((guestsCount + 1) / 3);
    setRoomsCount(newRoomsCount);
  };

  const handleDecrementGuests = () => {
    if (guestsCount > 1) {
      setGuestsCount(guestsCount - 1);
      const newRoomsCount = Math.ceil((guestsCount - 1) / 3);
      setRoomsCount(newRoomsCount);
    }
  };
  const handleBookNow = async () => {
    try {
      const userId = localStorage.getItem("userId");
      
      // Check if userMobile is available in localStorage
      const userMobile = localStorage.getItem("userMobile");
      
      if (!userMobile) {
        // If userMobile is not available, show an alert and navigate to the profile page
        alert("Action required: Please update your mobile number in the profile.");
        navigate("/profile");
        return;
      }
  
      // Prepare data for API request
      const bookingData = {
        user: userId, // Include userId in the payload
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
  
  const scrollToRooms = () => {
    roomsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToFood = () => {
    foodsRef.current.scrollIntoView({ behavior: "smooth" });
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

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="book-now-container">
      {hotelData ? (
        <>
        <div
  id="carouselExample"
  className="carousel slide mb-4"
  data-bs-ride="carousel"
  data-bs-interval="2000" // Set auto-slide interval to 2 seconds (2000 milliseconds)
  style={{ maxHeight: "500px" }} // Set maximum height for the carousel
>
  <div className="carousel-inner">
    {hotelData?.images &&
      hotelData?.images?.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
          style={{ maxHeight: "500px" }} // Set maximum height for each carousel item
        >
          <img
            src={image}
            className="d-block w-100"
            alt={`Hotel Image ${index + 1}`}
            style={{ maxHeight: "500px", objectFit: "cover" }} // Adjust image height and maintain aspect ratio
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
                  {hotelData?.rooms?.[0]?.price || 0}
                </div>
              </div>
            </div>
            <h5 className="hotel-name">
              {hotelData?.starRating}
              <StarHalfIcon /> {hotelData?.hotelName}{" "}
              
            </h5>
            <div className="hote-address">
              {" "}
              <p>
                {hotelData?.city}, {hotelData?.destination}, {hotelData?.state},{" "}
                {hotelData?.zip}
              </p>
            </div>
          </div>{" "}
          <div className="extras">
            <p>{hotelData?.description}</p>
          </div>
          <div className="extras">
            <div className="amenities-container">
              <h6>Our amenities</h6>
              {hotelData?.amenities?.map((amenityArray, index) => (
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
         
             <Accordion
             expanded={expanded}
             onChange={handleExpansion}
             slotProps={{ transition: { timeout: 400 } }}
             sx={{
               "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
               "& .MuiAccordionDetails-root": {
                 display: expanded ? "block" : "none",
               },
               width: "100%", // Make Accordion fill the container's width
             }}
           >
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls={`panel-content`}
               id={`panel-header`}
               sx={{
                 display: "flex",
                 flexDirection: "row",
                 width: "100%", // Make AccordionSummary fill the container's width
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
                   {/* Calculate total number of amenities */}
                   {hotelData?.amenities?.flatMap(amenityArray => amenityArray.amenities).length - 5} more amenities
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
                 {/* Flatten the array of amenities */}
                 {hotelData?.amenities?.flatMap(amenityArray => amenityArray.amenities).slice(5).map((amenity, index) => (
                   <div
                     key={index}
                     style={{
                       marginBottom: "8px",
                       flexBasis: "33%",
                       boxSizing: "border-box",
                       flexGrow: 1, // Add this line
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
           
            
          
            </div>
          </div>
          {/* Rooms */}
          <h6
            style={{
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(to right, #ff8c00, #ffc300)",
              padding: "10px",
            }}
            ref={roomsRef}
          >
            Select our special rooms
          </h6>
          <div
            className="extras"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            <div className="container-fluid">
              <div className="row">
                {/* Booking details */}

                {/* Special rooms  desktop view*/}
                <div className="col-md-8 d-none d-sm-block">
                  <div className="container mt-3">
                    <Grid container spacing={2}>
                      {hotelData?.rooms?.map((room, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card sx={{ display: "flex", width: "250%" }}>
                            <CardMedia
                              component="img"
                              height="130px"
                              style={{ objectFit: "cover", width: "300px" }}
                              src={
                                room.images && room.images.length > 0
                                  ? room.images[0]
                                  : hotelData?.images[0]
                              }
                              alt={`Room ${index + 1} Image 1`}
                            />
                            <CardContent sx={{ flex: "1 0 auto" }}>
                              <Typography
                                gutterBottom
                                variant="subtitle2"
                                component="div"
                              >
                                {room.type}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Bed: {room.bedTypes}
                                <BedOutlinedIcon
                                  style={{
                                    fontSize: "small",
                                    verticalAlign: "middle",
                                    marginLeft: "5px",
                                  }}
                                />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price:{" "}
                                <CurrencyRupeeIcon
                                  style={{
                                    fontSize: "small",
                                    verticalAlign: "middle",
                                  }}
                                />
                                {room.price}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              {selectedRooms.findIndex(
                                (selected) => selected._id === room._id
                              ) !== -1 ? (
                                <Button
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  disabled
                                >
                                  Selected
                                </Button>
                              ) : (
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
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
                {/* mobile view section for special rooms  */}
                <div className="col-md-4 d-block d-md-none">
                  <div className="container mt-3">
                    <Grid container spacing={2}>
                      {hotelData?.rooms?.map((room, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card sx={{ display: "flex" }}>
                            <CardMedia
                              component="img"
                              height="150px"
                              style={{ objectFit: "cover", width: "120px" }} // Set width explicitly
                              src={
                                room.images && room.images.length > 0
                                  ? room.images[0]
                                  : hotelData?.images[0]
                              }
                              alt={`Room ${index + 1} Image 1`}
                            />

                            <CardContent sx={{ flex: "1 0 auto" }}>
                              <Typography
                                gutterBottom
                                variant="subtitle2"
                                component="div"
                              >
                                {room.type}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Bed: {room.bedTypes}
                                <BedOutlinedIcon
                                  style={{
                                    fontSize: "small",
                                    verticalAlign: "middle",
                                    marginLeft: "5px",
                                  }}
                                />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price:{" "}
                                <CurrencyRupeeIcon
                                  style={{
                                    fontSize: "small",
                                    verticalAlign: "middle",
                                  }}
                                />
                                {room.price}
                              </Typography>
                              <CardActions>
                                {selectedRooms.findIndex(
                                  (selected) => selected._id === room._id
                                ) !== -1 ? (
                                  <Button
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                    disabled
                                  >
                                    Selected
                                  </Button>
                                ) : (
                                  <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleAddRoom(room[0])}
                                  >
                                    Select
                                  </Button>
                                )}
                              </CardActions>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
                {/* end of special rooms mobile view */}
                {/* For desktop view */}
                <div className="col-md-4 d-none d-sm-block">
                  <div
                    className="booking-details-container"
                    style={{
                      position: "sticky",
                      top: "0",
                      width: "100%",
                      zIndex: "1000",
                      padding: "20px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      border: "2px solid green",
                      borderRadius: "20px",
                    }}
                  >
                    <h5>
                      {" "}
                      <ConfirmationNumberTwoToneIcon /> Booking Details{" "}
                    </h5>
                    <hr />

                    {/* Selected Food */}
                    <div
                      className="selected-container"
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {selectedFood.length > 0 ? (
                          <div>
                            <CardContent>
                              {selectedFood.map((selected, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="div"
                                  >
                                    {selected.quantity} {selected.name}
                                  </Typography>
                                  <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() => handleRemoveFood(selected)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </CardContent>
                          </div>
                        ) : (
                          <div style={{ height: "50px" }}>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                              >
                                Add crispy food during your stay{" "}
                                <LunchDiningTwoToneIcon />
                              </Typography>
                            </CardContent>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outlined"
                        color="danger"
                        style={{ marginLeft: "10px", flexShrink: 0 }}
                        onClick={scrollToFood}
                      >
                        <DriveFileRenameOutlineIcon />
                      </Button>
                    </div>

                    {/* Selected Rooms */}
                    <div
                      className="selected-container"
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {selectedRooms?.map((selected, index) => (
                          <div
                            key={index}
                            style={{ height: "50px", marginRight: "10px" }}
                          >
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                              >
                                {selected.type} & {selected.bedTypes}{" "}
                                <BedOutlinedIcon />
                              </Typography>
                            </CardContent>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={scrollToRooms}
                      >
                        <DriveFileRenameOutlineIcon />
                      </Button>
                    </div>

                    {/* Rooms and Guests */}

                    <hr />
                    <label
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "14px",
                        color: "#555",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Rooms <MeetingRoomTwoToneIcon />& Guests{" "}
                      <Face4TwoToneIcon />
                    </label>

                    <div className="date-selection mt-3">
                      <div
                        className="check-in"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleDecrementRooms}
                          style={{ minWidth: "25px" }} // Adjusted min width
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "90px", textAlign: "center" }} // Center align input
                          placeholder="Rooms"
                          value={roomsCount}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleIncrementRooms}
                          style={{ minWidth: "25px" }} // Adjusted min width
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div
                        className="check-out"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleDecrementGuests}
                          style={{ minWidth: "25px" }} // Adjusted min width
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "90px", textAlign: "center" }} // Center align input
                          placeholder="Guests"
                          value={guestsCount}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleIncrementGuests}
                          style={{ minWidth: "25px" }} // Adjusted min width
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <hr />
                    <div className="container mt-3">
                      <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
                        <div className="check-in">
                          <p>
                            Check-in <InventoryTwoToneIcon />
                          </p>
                          <DatePicker
                            selected={checkInDate}
                            onChange={handleCheckInDateChange}
                            dateFormat="d MMMM yyyy"
                            placeholderText={formatDate(checkInDate)}
                            selectsStart
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            onChangeRaw={(e) => e.preventDefault()}
                            className="datepicker-input"
                          />
                        </div>
                        <div className="check-out">
                          <p>
                            Check-out <InventoryTwoToneIcon />
                          </p>
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
                    </div>

                    {/* Total Price */}
                    <div
                      className="total-price mt-3"
                      style={{ marginTop: "3rem" }}
                    >
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          color: "red",
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        <CurrencyRupeeIcon />
                        {calculateTotalPrice()}
                      </h3>
                    </div>

                    {/* Payment Buttons */}
                    <div className="payment-buttons mt-3">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "100%", marginBottom: "10px" }}
                      >
                        Pay Now
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={handleBookNow}
                      >
                        Pay at Hotel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* booking details end */}
          {/* foods section */}
          <h6
            style={{
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(to right, #ff8c00, #ffc300)",
              padding: "10px",
            }}
            ref={foodsRef}
          >
            Add Meals During Your Stay
          </h6>
          <div
            className="extras"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {hotelData?.foods.map((foodArray, index) => (
              <Card key={index} sx={{ width: 500 }}>
                <CardActionArea style={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    width="100px"
                    src={
                      foodArray.images && foodArray.images.length > 0
                        ? foodArray.images[0]
                        : hotelData?.images[0]
                    }
                    alt={`Food ${index + 1} Image 1`}
                  />
                  <CardContent style={{ flex: "1 0 auto" }}>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {foodArray.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontSize: "0.7rem" }}
                    >
                      About: {foodArray.about}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Price: <CurrencyRupeeIcon style={{ fontSize: "small" }} />
                      {foodArray.price}
                      <CardActions>
                        <Button
                          size="small"
                          color="danger"
                          onClick={() => handleAddFood(foodArray)}
                        >
                          Add +1
                        </Button>
                      </CardActions>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
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
                backgroundColor: "#fff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                border: "2px solid green",
                borderRadius: "20px",
              }}
            >
              <h5 style={{ marginBottom: "20px" }}>
                <ConfirmationNumberTwoToneIcon /> Booking Details{" "}
              </h5>
              <hr />

              {/* Selected Food */}
              <div
                className="selected-container"
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  {selectedFood.length > 0 ? (
                    <div
                      style={{
                        marginBottom: "10px",
                        height: "50px",
                        overflow: "auto",
                      }}
                    >
                      <CardContent>
                        {selectedFood.map((selected, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="div"
                            >
                              <p style={{ fontSize: "12px" }}>
                                {" "}
                                {selected.quantity} {selected.name}{" "}
                              </p>
                            </Typography>
                            <Button
                              style={{ fontSize: "9px" }}
                              size="small"
                              color="secondary"
                              onClick={() => handleRemoveFood(selected)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </div>
                  ) : (
                    <div style={{ height: "50px" }}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                        >
                          <p style={{ fontSize: "12px" }}>
                            Add crispy food during your stay{" "}
                            <LunchDiningTwoToneIcon />
                          </p>
                        </Typography>
                      </CardContent>
                    </div>
                  )}
                </div>

                <Button
                  variant="outlined"
                  color="danger"
                  style={{ marginLeft: "10px", flexShrink: 0 }}
                  onClick={scrollToFood}
                >
                  <DriveFileRenameOutlineIcon />
                </Button>
              </div>

              {/* Selected Rooms */}
              <div
                className="selected-container"
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  {selectedRooms.map((selected, index) => (
                    <div
                      key={index}
                      style={{ height: "50px", marginRight: "10px" }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                        >
                          <p style={{ fontSize: "12px" }}>
                            {selected.type} & {selected.bedTypes}{" "}
                            <BedOutlinedIcon />
                          </p>
                        </Typography>
                      </CardContent>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={scrollToRooms}
                >
                  <DriveFileRenameOutlineIcon />
                </Button>
              </div>

              {/* Rooms and Guests */}

              <hr />

              <label>
                Rooms <MeetingRoomTwoToneIcon /> & Guests <Face4TwoToneIcon />
              </label>
              <div className="date-selection mt-3">
                <div
                  className="check-in"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleDecrementRooms}
                    style={{ minWidth: "25px" }} // Adjusted min width
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "50px", textAlign: "center" }} // Center align input
                    placeholder="Rooms"
                    value={roomsCount}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleIncrementRooms}
                    style={{ minWidth: "25px" }} // Adjusted min width
                  >
                    <FaPlus />
                  </button>
                </div>
                <div
                  className="check-out"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleDecrementGuests}
                    style={{ minWidth: "25px" }} // Adjusted min width
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "50px", textAlign: "center" }} // Center align input
                    placeholder="Guests"
                    value={guestsCount}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleIncrementGuests}
                    style={{ minWidth: "25px" }} // Adjusted min width
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              {/* Date Selection */}
              <hr />
              <div className="container mt-3">
                <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
                  <div className="check-in">
                    <p>
                      Check-in <InventoryTwoToneIcon />
                    </p>
                    <DatePicker
                      selected={checkInDate}
                      onChange={handleCheckInDateChange}
                      dateFormat="d MMMM yyyy"
                      placeholderText={formatDate(checkInDate)}
                      selectsStart
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      onChangeRaw={(e) => e.preventDefault()}
                      className="datepicker-input"
                    />
                  </div>
                  <div className="check-out">
                    <p>
                      Check-out <InventoryTwoToneIcon />
                    </p>
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
              </div>

              {/* Total Price */}
              <div className="total-price mt-3" style={{ marginTop: "3rem" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "red",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <CurrencyRupeeIcon /> {calculateTotalPrice()}
                </h3>
              </div>

              {/* Payment Buttons */}
              <div className="payment-buttons mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  Pay Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={handleBookNow}
                >
                  Pay at Hotel
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <React.Fragment>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ marginRight: "8px" }}></span>
              <Button variant="outlined" onClick={handleClickOpen}>
                Read our policies, Terms & conditios ...
              </Button>
            </div>

            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              PaperProps={{
                sx: {
                  width: "100%", // Set width to 100%
                  maxWidth: "none", // Override BootstrapDialog's default maxWidth
                },
              }}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Our Policies
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                {hotelData?.policies.map((policy, index) => (
                  <React.Fragment key={index}>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: isSmallScreen ? "0.8rem" : "inherit" }}
                    >
                      <p>Local ID- {hotelData?.localId}</p>
                      <hr />
                      <p>Hotel's Policy - {policy.hotelsPolicy}</p>
                      <hr />
                      <div className="checkIn-policy">
                        <p>Check In Policy - {policy.checkInPolicy}</p>
                        <p>Check Out Policy - {policy.checkOutPolicy}</p>
                      </div>
                      <hr />
                      <p>Outside Food Policy: {policy.outsideFoodPolicy}</p>
                      <hr />
                      <p>Cancellation Policy: {policy.cancellationPolicy}</p>
                      <hr />
                      <p>Payment Mode - {policy.paymentMode}</p>
                      <hr />
                      <p>Pets Allowed - {policy.petsAllowed}</p>
                      <hr />
                      <p>Bachelor Allowed - {policy.bachelorAllowed}</p>
                      <hr />
                      <p>Smoking Allowed - {policy.smokingAllowed}</p>
                      <hr />
                      <p>Alcohol Allowed - {policy.alcoholAllowed}</p>
                      <hr />
                      <p>
                        Unmarried Couples Allowed -{" "}
                        {policy.unmarriedCouplesAllowed}
                      </p>
                      <hr />
                      <p>
                        International Guest Allowed -{" "}
                        {policy.internationalGuestAllowed}
                      </p>
                      <hr />
                      <p>Return Policy - {policy.returnPolicy}</p>
                      <hr />
                    </Typography>
                  </React.Fragment>
                ))}
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  I read
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </React.Fragment>
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
