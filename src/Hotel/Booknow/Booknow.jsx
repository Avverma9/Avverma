import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Carousel from "react-bootstrap/Carousel";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "@mui/material/Rating";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useLoader } from "../../utils/loader";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { format, addDays } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IconContext } from "react-icons";

import { FaBed } from "react-icons/fa";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import "./Booknow.css";
import baseURL from "../../baseURL";
import { toast } from "react-toastify";
import Policies from "./policies";
import BookingDetails from "./bookingDetails";
import Rooms from "./rooms";
import Foods from "./foods";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingData } from "../../redux/reducers/bookingSlice";
import amenityIcons from "../../utils/filterOptions";
import BookingReview from "./BookingReview";

const BookNow = () => {
  const dispatch = useDispatch();
  const [hotelData, setHotelData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const location = useLocation();
  const [selectedFood, setSelectedFood] = useState([]);
  const [roomsCount, setRoomsCount] = useState(1);
  const path = location.pathname;
  const newhotelId = path.substring(path.lastIndexOf("/") + 1);
  const today = new Date();
  const { showLoader, hideLoader } = useLoader();
  const tomorrow = addDays(today, 1);
  const [guestsCount, setGuestsCount] = useState(3);
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const roomsRef = useRef(null);
  const foodsRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false); // New state
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, loading, error } = useSelector((state) => state.booking);
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleAddFood = (food) => {
    // Check if the food item is already selected
    const existingFoodIndex = selectedFood.findIndex(
      (selected) => selected._id === food._id
    );

    if (existingFoodIndex !== -1) {
      // If the food item is already selected, replace it with the new one
      const updatedFood = selectedFood.map((item, index) =>
        index === existingFoodIndex ? { ...food, quantity: 1 } : item
      );
      setSelectedFood(updatedFood);
    } else {
      // If the food item is not already selected, add it to the list
      setSelectedFood([...selectedFood, { ...food, quantity: 1 }]);
    }
    toast.info(`One ${food.name} is added`);
  };

  const handleRemoveFood = (food) => {
    const updatedFood = selectedFood
      ?.map((selected) =>
        selected._id === food._id
          ? { ...selected, quantity: selected.quantity - 1 }
          : selected
      )
      .filter((selected) => selected.quantity > 0);

    setSelectedFood(updatedFood);
  };
  const handleAddRoom = (room) => {
    setSelectedRooms([room]); // Replace the previously selected room with the new one
    toast.info(`${room.type} is selected`); // Show toast notification
  };

  const handleRemoveRoom = (room) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.length === 1) {
        return [];
      }
      return prevSelectedRooms.filter(
        (selectedRoom) => selectedRoom._id !== room._id
      );
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedRooms.forEach((room) => {
      totalPrice += room.price * roomsCount;
    });

    const foodPrice = selectedFood.reduce(
      (total, food) => total + food.price * food.quantity,
      0
    );

    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );

    totalPrice *= daysDifference;
    totalPrice += foodPrice;

    return totalPrice;
  };

  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchBookingData(newhotelId));
    }
  }, [dispatch, newhotelId]);

  useEffect(() => {
    if (data) {
      setHotelData(data);

      if (selectedRooms?.length === 0 && data?.rooms?.length > 0) {
        const defaultRoom = data?.rooms[0];
        setSelectedRooms([defaultRoom]);
      }
    }
  }, [data, selectedRooms]);

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo(0, 0);
      setShouldScrollToTop(false); // Reset the flag
    }
  }, [shouldScrollToTop]);
  const calculateGuests = (roomsCount) => {
    return roomsCount * 3;
  };

  const handleIncrementRooms = () => {
    setRoomsCount((prevCount) => prevCount + 1);
    setGuestsCount(calculateGuests(roomsCount + 1));
  };

  const handleDecrementRooms = () => {
    if (roomsCount > 1) {
      setRoomsCount((prevCount) => prevCount - 1);
      setGuestsCount(calculateGuests(roomsCount - 1));
    }
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
      const userMobile = localStorage.getItem("userMobile");

      if (!userMobile) {
        alert(
          "Action required: Please update your mobile number in the profile."
        );
        navigate("/profile");
        return;
      }

      const bookingData = {
        hotelId: newhotelId,
        user: userId,
        checkInDate: format(checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
        guests: guestsCount,
        numRooms: roomsCount,
        roomDetails: selectedRooms?.map((room) => ({
          type: room.type,
          bedTypes: room.bedTypes,
          price: room.price,
        })),
        foodDetails: selectedFood?.map((food) => ({
          name: food.name,
          price: food.price,
          quantity: food.quantity,
        })),
        price: calculateTotalPrice(),
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      const response = await fetch(
        `${baseURL}/booking/${userId}/${newhotelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.status === 201) {
        alert("Booking successful");
        window.location.href = "/bookings";
      } else {
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

  if (!path.includes("/book-hotels/")) {
    return null;
  }
  const handlePay = () => {
    toast.warning("Currently we are accepting only Pay at Hotel method");
  };

  const defaultIcon = <FaBed />;

  const handleCheckInDateChange = (date) => {
    if (date.toDateString() !== checkOutDate.toDateString()) {
      setCheckInDate(date);
      const nextDay = addDays(date, 1);
      setCheckOutDate(nextDay);
    } else {
      toast.warning("Check-in and Check-out dates cannot be the same.");
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (date.toDateString() !== checkInDate.toDateString()) {
      setCheckOutDate(date);
    } else {
      toast.warning("Check-in and Check-out dates cannot be the same.");
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

  function getResponsiveImageStyle() {
    const styles = {
      height: 550,
    };

    if (window.innerWidth < 468) {
      styles.height = "200px";
    }

    return styles;
  }

  return (
    <div className="book-now-container">
      {hotelData ? (
        <>
          {hotelData?.images && (
            <Carousel>
              {hotelData?.images?.map((image, index) => (
                <Carousel.Item key={index} interval={1000}>
                  <img
                    src={image}
                    alt={`Hotel Image ${index + 1}`}
                    className="d-block w-100 h-300 object-fit-cover"
                    style={getResponsiveImageStyle()}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <div className="extras">
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "5px" }}>
                <div
                  className="price"
                  style={{ marginLeft: "5px", fontSize: "28px" }}
                >
                  {" "}
                </div>
              </div>
            </div>
            <h5 className="hotel-name">
              <span
                style={{
                  fontSize: "1.3rem",
                  marginRight: "10px",
                  color: "green",
                }}
              >
                {hotelData?.hotelName}
              </span>
              <CurrencyRupeeIcon /> {hotelData?.rooms?.[0]?.price || 0}
            </h5>
            <Box
              key={hotelData._id}
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="hotel-rating"
                value={hotelData?.starRating}
                readOnly
              />
            </Box>
            <div className="hote-address">
              {" "}
              <p>
                <PlaceIcon />
                {hotelData?.city}, {hotelData?.destination}, {hotelData?.state},{" "}
                {hotelData?.zip}
              </p>{" "}
              <p>{hotelData?.customerWelcomeNote}</p>
            </div>
          </div>{" "}
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
                      {hotelData?.amenities?.flatMap(
                        (amenityArray) => amenityArray.amenities
                      ).length - 5}{" "}
                      more amenities
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
                    {hotelData?.amenities
                      ?.flatMap((amenityArray) => amenityArray.amenities)
                      .slice(5)
                      .map((amenity, index) => (
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
          <div ref={foodsRef}>
            {" "}
            <Foods hotelData={hotelData} handleAddFood={handleAddFood} />
          </div>
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
                {/* Special rooms view */}
                <div className="rooms" ref={roomsRef}>
                  <Rooms
                    hotelData={hotelData}
                    selectedRooms={selectedRooms}
                    handleAddRoom={handleAddRoom}
                    handleRemoveRoom={handleRemoveRoom}
                  />
                </div>

                <div className="booking-details">
                  <BookingDetails
                    selectedFood={selectedFood}
                    selectedRooms={selectedRooms}
                    roomsCount={roomsCount}
                    guestsCount={guestsCount}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    handleAddFood={handleAddFood}
                    handleRemoveFood={handleRemoveFood}
                    handleAddRoom={handleAddRoom}
                    handleRemoveRoom={handleRemoveRoom}
                    handleIncrementRooms={handleIncrementRooms}
                    handleDecrementRooms={handleDecrementRooms}
                    handleIncrementGuests={handleIncrementGuests}
                    handleDecrementGuests={handleDecrementGuests}
                    handleCheckInDateChange={handleCheckInDateChange}
                    handleCheckOutDateChange={handleCheckOutDateChange}
                    scrollToFood={scrollToFood}
                    scrollToRooms={scrollToRooms}
                    calculateTotalPrice={calculateTotalPrice}
                    handlePay={handlePay}
                    handleBookNow={handleBookNow}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* foods section */}
          <BookingReview hotelId={hotelData?.hotelId} />
          <React.Fragment>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ marginRight: "8px" }}></span>
              <button className="custom-button" onClick={handleClickOpen}>
                Read our policies, Terms & conditios ...
              </button>
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
                <Policies
                  hotelData={hotelData}
                  policies={hotelData.policies}
                  isSmallScreen={isSmallScreen}
                />
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
