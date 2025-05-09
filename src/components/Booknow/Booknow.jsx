import React, { useState, useEffect, useRef, useCallback } from "react";
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
import "react-image-lightbox/style.css"; // Import the CSS for lightbox
import Lightbox from "react-image-lightbox";

import { useLoader } from "../../utils/loader";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { format, addDays } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { BsClockHistory } from "react-icons/bs";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IconContext } from "react-icons";

import { FaBed, FaWifi } from "react-icons/fa";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import "./Booknow.css";
import baseURL from "../../utils/baseURL";
import Policies from "./policies";
import BookingDetails from "./bookingDetails";
import Rooms from "./rooms";
import Foods from "./foods";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingData,
  fetchMonthlyData,
} from "../../redux/reducers/bookingSlice";
import amenityIcons from "../../utils/extrasList";
import BookingReview from "./BookingReview";
import axios from "axios";
import { Divider, Grid } from "@mui/material";
import alert from "../../utils/custom_alert/custom_alert";
import { popup } from "../../utils/custom_alert/pop";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import { token } from "../../utils/Unauthorized";
import { toast } from "react-toastify";

const BookNow = () => {
  const dispatch = useDispatch();
  const [hotelData, setHotelData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const location = useLocation();
  const [selectedFood, setSelectedFood] = useState([]);
  const [roomsCount, setRoomsCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(null);
  const path = location.pathname; // Get the current path
  const parts = path.split("/"); // Split the path by '/'
  const newhotelId = parts[parts.length - 1]; // Last element is newHotelId
  const userId = parts[parts.length - 2]; // Second last element is userId
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [guestsCount, setGuestsCount] = useState(3);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const roomsRef = useRef(null);
  const foodsRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false); // New state
  const theme = useTheme();
  const toBeCheckRoomNumber = localStorage.getItem("toBeCheckRoomNumber");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { bookingData } = useSelector((state) => state.booking);
  const { monthlyData, loading, error } = useSelector((state) => state.booking);
  const showLowestPrice = localStorage.getItem("lowestPrice");
  const compareRoomId = localStorage.getItem("toBeUpdatedRoomId");
  const { showLoader, hideLoader } = useLoader();
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  useEffect(() => {
    if (userId === "null") {
      window.location.href = "/login";
    }
  }, [userId, navigate]);
  const handleAddFood = (food) => {
    const existingFoodIndex = selectedFood.findIndex(
      (selected) => selected._id === food._id,
    );
    if (existingFoodIndex !== -1) {
      const updatedFood = selectedFood.map((item, index) =>
        index === existingFoodIndex ? { ...food, quantity: 1 } : item,
      );
      setSelectedFood(updatedFood);
    } else {
      // If the food item is not already selected, add it to the list
      setSelectedFood([...selectedFood, { ...food, quantity: 1 }]);
    }
    alert(`One ${food.name} is added`);
  };

  const handleRemoveFood = (food) => {
    const updatedFood = selectedFood
      ?.map((selected) =>
        selected._id === food._id
          ? { ...selected, quantity: selected.quantity - 1 }
          : selected,
      )
      .filter((selected) => selected.quantity > 0);

    setSelectedFood(updatedFood);
  };

  const handleAddRoom = (room) => {
    setSelectedRooms([room]); // Replace the previously selected room with the new one
    localStorage.setItem("toBeUpdatedRoomId", room.roomId);
    localStorage.setItem("toBeCheckRoomNumber", room.countRooms);
    alert(`${room.type} is selected`);
  };

  const handleRemoveRoom = (room) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.length === 1) {
        return [];
      }
      return prevSelectedRooms.filter(
        (selectedRoom) => selectedRoom.roomId !== room.roomId,
      );
    });
  };

  // const handleApplyCoupon = useCallback(
  //   async (hotelId, roomId) => {
  //     showLoader();
  //     try {
  //       const url = `${localUrl}/user-coupon/apply/a/coupon-to-room`;

  //       const response = await axios.patch(url, payload, {
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/json",
  //         },
  //       });
  
  //     } catch (error) {
  //       console.error("Error in applyCoupon thunk:", error);
  //       const errorMessage = error.response?.data?.message || error.message;
  //       toast.error(`Error: ${errorMessage}`);
  //       return rejectWithValue(error.response?.data || errorMessage);
  //     }
  //   },

  //   [dispatch, showLoader, hideLoader, couponCode],
  // );

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Calculate room price
    selectedRooms?.forEach((room) => {
      totalPrice += room.price * roomsCount;
    });

    // Calculate food price
    const foodPrice = selectedFood.reduce(
      (total, food) => total + food.price * food.quantity,
      0,
    );

    // Calculate the number of days for the stay
    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference < 1) {
      return 0; // If the dates are invalid, return 0
    }

    totalPrice *= daysDifference; // Multiply by the number of days
    totalPrice += foodPrice; // Add food price

    // Check against monthly bookingData
    monthlyData?.forEach((bookingData) => {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);

      // code me monthly bookingData ko each se map karke month bookingData ki validity and roomid ko localStorage me selected
      // roomId se match karake room ka month price nikala ja raha hai

      if (
        selectedRooms &&
        checkInDate < endDate &&
        checkOutDate > startDate &&
        compareRoomId === bookingData.roomId
      ) {
        if (bookingData) {
          totalPrice = bookingData.monthPrice * daysDifference; // Add monthly price
        }
      }
    });

    return totalPrice;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setCurrentPrice(totalPrice);
  }, [
    selectedRooms,
    selectedFood,
    checkInDate,
    checkOutDate,
    roomsCount,
    guestsCount,
    monthlyData,
  ]);
  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const localDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000); // Adjust for UTC+5:30
    return localDate.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  // Example check-in and check-out dates
  const setcheckInDate = checkInDate; // Replace with your actual check-in date
  const setcheckOutDate = checkOutDate; // Replace with your actual check-out date

  // Set the formatted dates in localStorage
  localStorage.setItem("selectedCheckInDate", formatDate(setcheckInDate));
  localStorage.setItem("selectedCheckOutDate", formatDate(setcheckOutDate));

  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchBookingData(newhotelId));
    }
  }, [dispatch, newhotelId]);

  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchMonthlyData(newhotelId));
    }
  }, [dispatch, newhotelId]);

  useEffect(() => {
    if (bookingData) {
      setHotelData(bookingData);

      if (selectedRooms?.length === 0 && bookingData?.rooms?.length > 0) {
        const defaultRoom = bookingData?.rooms[0];
        localStorage.setItem("toBeUpdatedRoomId", defaultRoom.roomId);
        localStorage.setItem("toBeCheckRoomNumber", defaultRoom.countRooms);
        setSelectedRooms([defaultRoom]);
      }
    }
  }, [bookingData, selectedRooms]);

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo(0, 0);
      setShouldScrollToTop(false); // Reset the flag
    }
  }, [shouldScrollToTop]);
  const calculateGuests = (roomsCount) => {
    return roomsCount * 3;
  };
  const eligibleRooms =
    hotelData?.rooms?.filter((item) => item.offerPriceLess > 0) || [];

  // Step 2: Determine the room to display based on the conditions
  let roomToShow;

  if (eligibleRooms.length > 0) {
    // If there are eligible rooms, take the first one
    roomToShow = eligibleRooms[0];
  } else {
    // If no eligible rooms, find the room with the lowest price
    roomToShow =
      hotelData?.rooms?.reduce((lowest, current) => {
        return lowest.price < current.price ? lowest : current;
      }, hotelData.rooms[0]) || null; // Fallback to null if no rooms exist
  }
  useEffect(() => {
    if (roomToShow?.offerExp) {
      const countdownDate = new Date(roomToShow.offerExp).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime() + 5.5 * 60 * 60 * 1000; // Adjust for UTC+5:30
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(interval);
          setTimeLeft("Offer expired");
        } else {
          // Construct time left string based on days
          let timeLeft;
          if (days > 0) {
            timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            timeLeft = `${hours}h ${minutes}m ${seconds}s`;
          }
          setTimeLeft(timeLeft);
        }
      }, 1000); // Update every second

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [roomToShow]);

  useEffect(() => {
    if (bookingData) {
      setHotelData(bookingData);

      // If roomToShow is available, set it as the default selected room
      if (roomToShow) {
        setSelectedRooms([roomToShow]);
        localStorage.setItem("toBeUpdatedRoomId", roomToShow.roomId);
        localStorage.setItem("toBeCheckRoomNumber", roomToShow.countRooms);
      } else if (bookingData.rooms?.length > 0) {
        // Fallback in case roomToShow is not set
        const defaultRoom = bookingData.rooms[0]; // Or any other logic to pick a room
        setSelectedRooms([defaultRoom]);
        localStorage.setItem("toBeUpdatedRoomId", defaultRoom.roomId);
        localStorage.setItem("toBeCheckRoomNumber", defaultRoom.countRooms);
      }
    }
  }, [bookingData, roomToShow]);

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
      showLoader();
      const bookingData = {
        hotelId: newhotelId,
        user: userId,
        checkInDate: format(checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
        guests: guestsCount,
        numRooms: roomsCount,
        roomDetails: selectedRooms?.map((room) => ({
          roomId: room.roomId,
          type: room.type,
          bedTypes: room.bedTypes,
          price: room.price,
        })),
        foodDetails: selectedFood?.map((food) => ({
          foodId: food.foodId,
          name: food.name,
          price: food.price,
          quantity: food.quantity,
        })),
        price: calculateTotalPrice(),
        pm: "Offline",
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };
      if (toBeCheckRoomNumber > 0) {
        const response = await fetch(
          `${baseURL}/booking/${userId}/${newhotelId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          },
        );
        const bookedDetails = await response.json();
        if (response.status === 201) {
          popup(
            `🎉 Congratulations! Your booking is confirmed.\n` +
              `For more details go for profile section and select bookings\n\n` +
              `📌 Booking ID: ${bookedDetails?.data?.bookingId}\n` +
              `📅 Check-in Date: ${formatDateWithOrdinal(
                bookedDetails?.data?.checkInDate,
              )}\n` +
              `📅 Check-out Date: ${formatDateWithOrdinal(
                bookedDetails?.data?.checkOutDate,
              )}`,
          );
        }
        console.log("Booking response:", JSON.stringify(response.json));
      } else {
        alert("This room is already fully booked");
      }
    } catch (error) {
      console.error("Error booking:", error);
    } finally {
      hideLoader();
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
    alert("Currently we are accepting only Pay at Hotel method");
  };

  const defaultIcon = <FaBed />;

  const handleCheckInDateChange = (date) => {
    if (checkOutDate && date >= checkOutDate) {
      // If the new check-in date is on or after the current checkout date, reset checkout date
      setCheckOutDate(null);
    }
    setCheckInDate(date);

    // Automatically set checkout date to the next day after check-in date
    const nextDay = addDays(date, 1);
    setCheckOutDate(nextDay);
  };

  const handleCheckOutDateChange = (date) => {
    // Check if the selected date is after the check-in date
    if (date <= checkInDate) {
      alert("Checkout date must be after the check-in date.");
      return; // Prevent setting an invalid checkout date
    }
    setCheckOutDate(date);
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
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const amenities =
    hotelData?.amenities?.flatMap((amenityArray) => amenityArray.amenities) ||
    [];

  // Display the first 10 amenities and track how many are left
  const visibleAmenities = amenities.slice(0, 10);
  const remainingAmenitiesCount = amenities.length - visibleAmenities.length;

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
                    style={{ cursor: "pointer" }}
                    onClick={() => openLightbox(index)} // Open lightbox on click
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          {isOpen && (
            <Lightbox
              mainSrc={hotelData.images[currentImageIndex]}
              nextSrc={
                hotelData.images[
                  (currentImageIndex + 1) % hotelData.images.length
                ]
              }
              prevSrc={
                hotelData.images[
                  (currentImageIndex + hotelData.images.length - 1) %
                    hotelData.images.length
                ]
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setCurrentImageIndex(
                  (currentImageIndex + hotelData.images.length - 1) %
                    hotelData.images.length,
                )
              }
              onMoveNextRequest={() =>
                setCurrentImageIndex(
                  (currentImageIndex + 1) % hotelData.images.length,
                )
              }
            />
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

              {roomToShow?.offerPriceLess > 0 ? (
                <>
                  <del>
                    <strong style={{ color: "red" }}>
                      ₹{roomToShow.price + roomToShow.offerPriceLess}
                    </strong>{" "}
                  </del>
                  <strong style={{ fontSize: "18px" }}>
                    ₹{roomToShow?.offerPriceLess} Discount
                  </strong>
                  <p>
                    ₹{roomToShow.price}{" "}
                    <strong style={{ fontSize: "14px", color: "red" }}>
                      Offer price on {roomToShow.type}{" "}
                      <p
                        style={{
                          color: "black",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          backgroundColor: "#f8f8f8",
                          padding: "10px",
                          marginTop: "10px",
                          width: "200px",
                        }}
                      >
                        <BsClockHistory /> {timeLeft}
                      </p>
                    </strong>
                  </p>
                </>
              ) : (
                <p>
                  <strong>₹{showLowestPrice}</strong>{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "5px",
                    }}
                  >
                    Starting price{" "}
                  </span>
                </p>
              )}
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
                {hotelData?.landmark}, {hotelData?.city}, {hotelData?.state},{" "}
                {hotelData?.pinCode}
              </p>{" "}
              <p>{hotelData?.description}</p>
            </div>
          </div>{" "}
          {hotelData?.policies?.map((policy, index) => (
            <Box
              key={index}
              sx={{
                width: "100%", // Set fixed width
                maxWidth: "420px",
                marginBottom: 1,
                paddingX: 2,
                paddingY: 2,
                marginLeft: 0, // Align to the left
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                backgroundColor: "transparent",
              }}
            >
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ marginBottom: 1, fontWeight: "bold", fontSize: "1rem" }}
              >
                Hotel Policies
              </Typography>

              <Grid container spacing={1} sx={{ marginBottom: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    <strong>Check-in:</strong>{" "}
                    {policy?.checkInPolicy.substring(0, 80)}...
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    <strong>Check-out:</strong>{" "}
                    {policy?.checkOutPolicy.substring(0, 80)}...
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginY: 1 }} />

              <Typography
                variant="body2"
                sx={{ marginBottom: 0.5, fontSize: "0.85rem" }}
              >
                <strong>Hotel's Policy:</strong>
              </Typography>
              <ul style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
                {policy?.hotelsPolicy &&
                  policy.hotelsPolicy.split("•").map((sentence, index) => {
                    const trimmedSentence = sentence.trim();
                    return trimmedSentence ? (
                      <li key={index} style={{ fontSize: "0.85rem" }}>
                        {trimmedSentence}
                      </li>
                    ) : null; // Avoid rendering empty list items
                  })}
              </ul>

              <Divider sx={{ marginY: 1 }} />

              <Typography
                variant="body2"
                sx={{ marginBottom: 0.5, fontSize: "0.85rem" }}
              >
                <strong>Couples Friendly:</strong>
              </Typography>
              <ul style={{ marginLeft: "1rem", marginBottom: 0.5 }}>
                <li style={{ fontSize: "0.85rem" }}>
                  {" "}
                  {policy.unmarriedCouplesAllowed
                    ? "Yes we allow couples"
                    : "Current not accepting couples"}
                </li>
              </ul>

              <Divider sx={{ marginY: 1 }} />

              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                <strong>Local ID:</strong>{" "}
                {hotelData?.localId === true
                  ? "Local and outstation IDs are accepted."
                  : "Local and outstation IDs are not accepted."}
              </Typography>

              <Divider sx={{ marginY: 1 }} />

              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                <strong>Cancellation Policy: </strong>{" "}
                {policy?.cancellationPolicy}
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ marginRight: "200px" }}></span>
                    <hr />
                    <button className="custom-button" onClick={handleClickOpen}>
                      ... View more
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
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
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
              </Typography>
            </Box>
          ))}
          <div className="amenities-and-policies">
            <h6 className="amenities-title">
              Amenities <FaWifi />
            </h6>
            <div className="amenities-list">
              {visibleAmenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <IconContext.Provider
                    value={{
                      size: "1.5em",
                      style: { marginRight: "8px", color: "black" },
                    }}
                  >
                    {amenityIcons[amenity] || defaultIcon}
                  </IconContext.Provider>
                  <span style={{ color: "black" }}>{amenity}</span>
                </div>
              ))}
            </div>

            {remainingAmenitiesCount > 0 && (
              <div className="hotel-policies-container">
                <Accordion
                  expanded={expanded}
                  onChange={handleExpansion}
                  className="accordion"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className="accordion-summary"
                  >
                    <Typography className="accordion-title">
                      See + {remainingAmenitiesCount} more amenities
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="amenities-list">
                    {amenities.slice(10).map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <IconContext.Provider
                          value={{
                            size: "1.5em",
                            style: { marginRight: "8px", color: "black" },
                          }}
                        >
                          {amenityIcons[amenity] || defaultIcon}
                        </IconContext.Provider>
                        <Typography variant="body2" style={{ color: "black" }}>
                          {amenity}
                        </Typography>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
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
