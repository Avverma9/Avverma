import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "@mui/material/Accordion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
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
  const [open, setOpen] = useState(false);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { bookingData } = useSelector((state) => state.booking);
  const { monthlyData } = useSelector((state) => state.booking);
  const showLowestPrice = localStorage.getItem("lowestPrice");
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
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.length === 1) {
        return [];
      }
      return prevSelectedRooms.filter(
        (selectedRoom) => selectedRoom.roomId !== room.roomId,
      );
    });
  };

  const discountPrice = Number(sessionStorage.getItem("discountPrice") || 0);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedRooms?.forEach((room) => {
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
        selectedRooms &&
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

  const setcheckInDate = checkInDate;
  const setcheckOutDate = checkOutDate;

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
      setShouldScrollToTop(false);
    }
  }, [shouldScrollToTop]);

  const calculateGuests = (roomsCount) => {
    return roomsCount * 3;
  };

  const eligibleRooms =
    hotelData?.rooms?.filter((item) => item.offerPriceLess > 0) || [];

  let roomToShow;

  if (eligibleRooms.length > 0) {
    roomToShow = eligibleRooms[0];
  } else {
    roomToShow =
      hotelData?.rooms?.reduce((lowest, current) => {
        return lowest.price < current.price ? lowest : current;
      }, hotelData.rooms[0]) || null;
  }

  useEffect(() => {
    if (roomToShow?.offerExp) {
      const countdownDate = new Date(roomToShow.offerExp).getTime();

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
          let timeLeft;
          if (days > 0) {
            timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            timeLeft = `${hours}h ${minutes}m ${seconds}s`;
          }
          setTimeLeft(timeLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [roomToShow]);

  useEffect(() => {
    if (bookingData) {
      setHotelData(bookingData);

      if (roomToShow) {
        setSelectedRooms([roomToShow]);
        localStorage.setItem("toBeUpdatedRoomId", roomToShow.roomId);
        localStorage.setItem("toBeCheckRoomNumber", roomToShow.countRooms);
      } else if (bookingData.rooms?.length > 0) {
        const defaultRoom = bookingData.rooms[0];
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

  const finalPrice = calculateTotalPrice() - discountPrice;

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

  return (
    <div className="book-now-container">
      {hotelData && (
        <>
          <Box display="flex" alignItems="center" marginBottom="10px">
            <span
              style={{
                fontSize: "1.5rem",
                color: "grey",
                fontWeight: "bold",
                marginTop: "20px",
                marginRight: "10px", // gap between hotel name and rating
              }}
            >
              {hotelData?.hotelName}
            </span>

            <span
              style={{
                backgroundColor: "#008009", // Green background like OYO
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
              {/* Carousel */}
              <Carousel>
                {hotelData.images.map((image, index) => (
                  <Carousel.Item key={index} interval={2000}>
                    <img
                      src={image}
                      alt={`Hotel Image ${index + 1}`}
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

              {/* Custom Lightbox Modal */}
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "rgba(0,0,0,0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1300,
                  }}
                >
                  {/* Close Button */}
                  <IconButton
                    onClick={() => setIsOpen(false)}
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  {/* Image */}
                  <img
                    src={hotelData.images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: 4,
                    }}
                  />

                  {/* Navigation Buttons */}
                  {hotelData.images.length > 1 && (
                    <>
                      <IconButton
                        onClick={() =>
                          setCurrentImageIndex(
                            (currentImageIndex + hotelData.images.length - 1) %
                              hotelData.images.length,
                          )
                        }
                        sx={navButtonStyle("left")}
                      >
                        {"<"}
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          setCurrentImageIndex(
                            (currentImageIndex + 1) % hotelData.images.length,
                          )
                        }
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
            <p>{hotelData?.description}</p>
          </div>{" "}
          <div className="hotel-page">
            <div className="main-content">
              <HotelPolicyCard hotelData={hotelData} />

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
                          See +{remainingAmenitiesCount} more amenities
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
                            <Typography
                              variant="body2"
                              style={{ color: "black" }}
                            >
                              {amenity}
                            </Typography>
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </div>
              <h6
                style={{
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  backgroundImage:
                    "linear-gradient(to right, #ff8c00, #ffc300)",
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
        </>
      )}
    </div>
  );
};

export default BookNow;
