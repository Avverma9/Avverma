import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "@mui/material/Accordion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { addDays } from "date-fns";
import { BsClockHistory } from "react-icons/bs";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IconContext } from "react-icons";
import { FaBed, FaWifi } from "react-icons/fa";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import "./Booknow.css";
import BookingDetails from "./bookingDetails";
import Rooms from "./rooms";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingData,
  fetchMonthlyData,
} from "../../redux/reducers/bookingSlice";
import amenityIcons from "../../utils/extrasList";
import BookingReview from "./BookingReview";
import { Modal } from "@mui/material";
import alert from "../../utils/custom_alert/custom_alert";
import { StarHalfSharp } from "@mui/icons-material";
import HotelPolicyCard from "./policy-card";
import BookNowSkeleton from "./BookNowSkeleton";

const BookNow = () => {
  const dispatch = useDispatch();
  const [hotelData, setHotelData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const location = useLocation();
  const [selectedFood, setSelectedFood] = useState([]);
  const [roomsCount, setRoomsCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(null);
  const path = location.pathname;
  const parts = path.split("/");
  const newhotelId = parts[parts.length - 1];
  const userId = parts[parts.length - 2];
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
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { bookingData, monthlyData } = useSelector((state) => state.booking);
  const compareRoomId = localStorage.getItem("toBeUpdatedRoomId");

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

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
      setSelectedFood([...selectedFood, { ...food, quantity: 1 }]);
    }
    alert(`${food.name} is added`);
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
    setSelectedRooms([room]);
    localStorage.setItem("toBeUpdatedRoomId", room.roomId);
    localStorage.setItem("toBeCheckRoomNumber", room.countRooms);
    alert(`${room.type} is selected`);
  };

  const handleRemoveRoom = (room) => {
    // This logic ensures that the user cannot deselect the last room,
    // maintaining a selection.
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.length === 1) {
        alert("You must have at least one room selected.");
        return prevSelectedRooms;
      }
      return prevSelectedRooms.filter(
        (selectedRoom) => selectedRoom.roomId !== room.roomId,
      );
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (selectedRooms.length === 0) return 0;

    selectedRooms.forEach((room) => {
      totalPrice += room.price * roomsCount;
    });

    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference < 1) {
      return 0;
    }

    totalPrice *= daysDifference;

    monthlyData?.forEach((bookingData) => {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);
      if (
        checkInDate < endDate &&
        checkOutDate > startDate &&
        compareRoomId === bookingData.roomId
      ) {
        if (bookingData) {
          totalPrice = bookingData.monthPrice * daysDifference;
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

  const formatDate = (date) => {
    const localDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  localStorage.setItem("selectedCheckInDate", formatDate(checkInDate));
  localStorage.setItem("selectedCheckOutDate", formatDate(checkOutDate));

  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchBookingData(newhotelId));
      dispatch(fetchMonthlyData(newhotelId));
    }
  }, [dispatch, newhotelId]);

  // This consolidated useEffect handles setting the initial selected room
  // when the component loads and booking data becomes available.
  useEffect(() => {
    if (bookingData) {
      setHotelData(bookingData);

      // Only set the initial room if no room is selected yet.
      // This prevents overwriting the user's selection on subsequent re-renders.
      if (selectedRooms.length === 0 && bookingData.rooms?.length > 0) {
        const eligibleRooms = bookingData.rooms.filter((item) => item.offerPriceLess > 0);
        let initialRoom;

        if (eligibleRooms.length > 0) {
          // If there are rooms with offers, pick the first one.
          initialRoom = eligibleRooms[0];
        } else {
          // Otherwise, find the room with the lowest price.
          initialRoom = bookingData.rooms.reduce((lowest, current) => {
            return lowest.price < current.price ? lowest : current;
          });
        }
        
        if (initialRoom) {
          setSelectedRooms([initialRoom]);
          localStorage.setItem("toBeUpdatedRoomId", initialRoom.roomId);
          localStorage.setItem("toBeCheckRoomNumber", initialRoom.countRooms);
        }
      }
    }
  }, [bookingData, selectedRooms.length]);


  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo(0, 0);
      setShouldScrollToTop(false);
    }
  }, [shouldScrollToTop]);

  const calculateGuests = (roomsCount) => {
    return roomsCount * 3;
  };

  // The currently selected room is the single source of truth.
  const currentRoom = selectedRooms[0];

  useEffect(() => {
    if (currentRoom?.offerExp) {
      const countdownDate = new Date(currentRoom.offerExp).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime() + 5.5 * 60 * 60 * 1000;
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
          let timeLeftStr;
          if (days > 0) {
            timeLeftStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            timeLeftStr = `${hours}h ${minutes}m ${seconds}s`;
          }
          setTimeLeft(timeLeftStr);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentRoom]);

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
      setCheckOutDate(null);
    }
    setCheckInDate(date);
    const nextDay = addDays(date, 1);
    setCheckOutDate(nextDay);
  };

  const handleCheckOutDateChange = (date) => {
    if (date <= checkInDate) {
      alert("Checkout date must be after the check-in date.");
      return;
    }
    setCheckOutDate(date);
  };
  const amenities =
    hotelData?.amenities?.flatMap((amenityArray) => amenityArray.amenities) ||
    [];
  const visibleAmenities = amenities.slice(0, 10);
  const remainingAmenitiesCount = amenities.length - visibleAmenities.length;
  const navButtonStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: 16,
    transform: "translateY(-50%)",
    bgcolor: "rgba(0,0,0,0.4)",
    color: "white",
    zIndex: 10,
    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
  });
// console.log("selected rooms",selectedRooms.map((room) => room.price));
  return (
    <div className="book-now-container">
      {!hotelData ? <BookNowSkeleton /> : (
        <div className="book-now-container">
          <Box display="flex" alignItems="center" marginBottom="10px">
            <span
              style={{
                fontSize: "1.5rem",
                color: "grey",
                fontWeight: "bold",
                marginTop: "20px",
                marginRight: "10px",
              }}
            >
              {hotelData?.hotelName}
            </span>

            <span
              style={{
                backgroundColor: "#008009",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "20px",
                marginRight: "10px",
                padding: "2px 4px",
              }}
            >
              <StarHalfSharp />
              {hotelData?.starRating}
            </span>
          </Box>
          <div className="hotel-address">
            <p>
              <PlaceIcon />
              {hotelData?.landmark}, {hotelData?.city}, {hotelData?.state},{" "}
              {hotelData?.pinCode}
            </p>
          </div>
          {hotelData?.images?.length > 0 && (
            <>
              <Carousel>
                {hotelData.images.map((image, index) => (
                  <Carousel.Item key={index} interval={2000}>
                    <img
                      src={image}
                      alt={`Hotel ${index + 1}`}
                      className="d-block w-100 object-fit-cover"
                      style={{
                        height: 500,
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onClick={() => openLightbox(index)}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Box
                  sx={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    bgcolor: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center",
                    justifyContent: "center", zIndex: 1300,
                  }}
                >
                  <IconButton
                    onClick={() => setIsOpen(false)}
                    sx={{
                      position: "absolute", top: 16, right: 16, color: "white",
                      bgcolor: "rgba(0,0,0,0.5)", "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src={hotelData.images[currentImageIndex]}
                    alt={`Lightbox ${currentImageIndex + 1}`}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4 }}
                  />
                  {hotelData.images.length > 1 && (
                    <>
                      <IconButton
                        onClick={() => setCurrentImageIndex((currentImageIndex + hotelData.images.length - 1) % hotelData.images.length)}
                        sx={navButtonStyle("left")}
                      >
                        {"<"}
                      </IconButton>
                      <IconButton
                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % hotelData.images.length)}
                        sx={navButtonStyle("right")}
                      >
                        {">"}
                      </IconButton>
                    </>
                  )}
                </Box>
              </Modal>
            </>
          )}
          <div className="extras">
            <h5 className="hotel-name">
              {currentRoom?.offerPriceLess > 0 ? (
                <>
                  <del>
                    <strong style={{ color: "red" }}>
                      ₹{currentRoom.price + currentRoom.offerPriceLess}
                    </strong>
                  </del>
                  <strong style={{ fontSize: "18px", marginLeft: '10px' }}>
                    ₹{currentRoom?.offerPriceLess} Discount
                  </strong>
                  <p>
                    ₹{currentRoom.price}{" "}
                    <strong style={{ fontSize: "14px", color: "red" }}>
                      Offer price on {currentRoom.type}
                      <p style={{ color: "black", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f8f8f8", padding: "10px", marginTop: "10px", width: "200px" }}>
                        <BsClockHistory /> {timeLeft}
                      </p>
                    </strong>
                  </p>
                </>
              ) : (
                <p>
                  <strong>₹{currentRoom?.price}</strong>
                  <span style={{ color: "grey", fontSize: "12px", marginLeft: "5px" }}>
                    per night
                  </span>
                </p>
              )}
            </h5>
            <p>{hotelData?.description}</p>
          </div>
          <div className="hotel-page">
            <div className="main-content">
              <HotelPolicyCard hotelData={hotelData} />
              <div className="amenities-and-policies">
                <h6 className="amenities-title">Amenities <FaWifi /></h6>
                <div className="amenities-list">
                  {visibleAmenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <IconContext.Provider value={{ size: "1.5em", style: { marginRight: "8px", color: "black" } }}>
                        {amenityIcons[amenity] || defaultIcon}
                      </IconContext.Provider>
                      <span style={{ color: "black" }}>{amenity}</span>
                    </div>
                  ))}
                </div>
                {remainingAmenitiesCount > 0 && (
                  <div className="hotel-policies-container">
                    <Accordion expanded={expanded} onChange={handleExpansion} className="accordion">
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
                        <Typography className="accordion-title">See +{remainingAmenitiesCount} more amenities</Typography>
                      </AccordionSummary>
                      <AccordionDetails className="amenities-list">
                        {amenities.slice(10).map((amenity, index) => (
                          <div key={index} className="amenity-item">
                            <IconContext.Provider value={{ size: "1.5em", style: { marginRight: "8px", color: "black" } }}>
                              {amenityIcons[amenity] || defaultIcon}
                            </IconContext.Provider>
                            <Typography variant="body2" style={{ color: "black" }}>{amenity}</Typography>
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </div>
              <h6 style={{ color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px", fontWeight: "bold", textTransform: "uppercase", backgroundImage: "linear-gradient(to right, #ff8c00, #ffc300)", padding: "10px" }} ref={roomsRef}>
                Select our special rooms
              </h6>
              <div className="extras" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="rooms" ref={roomsRef}>
                      <Rooms hotelData={hotelData} selectedRooms={selectedRooms} handleAddRoom={handleAddRoom} handleRemoveRoom={handleRemoveRoom} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="booking-sidebar">
              <BookingDetails
                hotelId={newhotelId}
                monthlyData={monthlyData}
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
                hotelData={hotelData}
              />
            </div>
          </div>
          <BookingReview hotelId={hotelData?.hotelId} />
        </div>
      )}
    </div>
  );
};

export default BookNow;
