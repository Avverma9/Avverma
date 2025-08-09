import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "@mui/material/Accordion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

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

  useEffect(() => {
    if (bookingData) {
      setHotelData(bookingData);

      if (selectedRooms.length === 0 && bookingData.rooms?.length > 0) {
        const eligibleRooms = bookingData.rooms.filter(
          (item) => item.offerPriceLess > 0,
        );
        let initialRoom;

        if (eligibleRooms.length > 0) {
          initialRoom = eligibleRooms[0];
        } else {
          initialRoom = bookingData.rooms.reduce((lowest, current) => {
            return lowest.price < current.price ? lowest : current;
          });
        }

        if (initialRoom) {
          setSelectedRooms([initialRoom]);
          localStorage.setItem("toBeUpdatedRoomId", initialRoom.roomId);
          localStorage.setItem(
            "toBeCheckRoomNumber",
            initialRoom.countRooms,
          );
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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {!hotelData ? (
        <BookNowSkeleton />
      ) : (
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12}>
            <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} spacing={1} sx={{ mb: { xs: 1, md: 2 } }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                {hotelData?.hotelName}
              </Typography>
              <Chip
                icon={<StarHalfSharp />}
                label={hotelData?.starRating}
                color="success"
                size="small"
                sx={{ fontSize: "0.85rem", fontWeight: 500 }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", mb: { xs: 2, md: 3 } }}>
              <PlaceIcon fontSize="small" />
              <Typography variant="body2">
                {hotelData?.landmark}, {hotelData?.city}, {hotelData?.state},{" "}
                {hotelData?.pinCode}
              </Typography>
            </Stack>
          </Grid>

          {hotelData?.images?.length > 0 && (
            <Grid item xs={12}>
              <Carousel>
                {hotelData.images.map((image, index) => (
                  <Carousel.Item key={index} interval={2000}>
                    <Box
                      component="img"
                      src={image}
                      alt={`Hotel ${index + 1}`}
                      onClick={() => openLightbox(index)}
                      sx={{
                        width: "100%",
                        height: { xs: 250, sm: 350, md: 450 },
                        objectFit: "cover",
                        cursor: "pointer",
                        borderRadius: 2,
                        boxShadow: 2,
                      }}
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
                      position: "absolute", top: 8, right: 8, color: "white",
                      bgcolor: "rgba(0,0,0,0.5)", "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    component="img"
                    src={hotelData.images[currentImageIndex]}
                    alt={`Lightbox ${currentImageIndex + 1}`}
                    sx={{
                      maxWidth: "95%",
                      maxHeight: "95%",
                      objectFit: "contain",
                      borderRadius: 1,
                    }}
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
            </Grid>
          )}

          <Grid item xs={12} md={8}>
            <Box sx={{ py: 3, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}>
                Pricing and Details
              </Typography>
              {currentRoom?.offerPriceLess > 0 ? (
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1" color="error" sx={{ textDecoration: "line-through" }}>
                      ₹{currentRoom.price + currentRoom.offerPriceLess}
                    </Typography>
                    <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
                      ₹{currentRoom.price}
                    </Typography>
                    <Chip label={`₹${currentRoom.offerPriceLess} Discount`} color="warning" size="small" />
                  </Stack>
                  <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                    Offer price on {currentRoom.type}
                  </Typography>
                  <Box sx={{ p: 0.5, mt: 1, display: "flex", alignItems:"center", gap: 1, width: "fit-content", bgcolor: "grey.100", borderRadius: 1 }}>
                    <BsClockHistory />
                    <Typography variant="caption">{timeLeft}</Typography>
                  </Box>
                </Box>
              ) : (
                <Stack direction="row" alignItems="baseline" spacing={0.5}>
                  <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
                    ₹{currentRoom?.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    per night
                  </Typography>
                </Stack>
              )}
              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                {hotelData?.description}
              </Typography>
            </Box>

            <Box sx={{ py: 3, borderBottom: 1, borderColor: "divider" }}>
              <HotelPolicyCard hotelData={hotelData} />
            </Box>

            <Box sx={{ py: 3, borderBottom: 1, borderColor: "divider" }}>
              <Paper elevation={0} sx={{ p: 2, mb: 2, border: 1, borderColor: "grey.300", borderRadius: 1, backgroundColor: "transparent" }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                  What this place offers
                </Typography>
                <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 1 }}>
                  {visibleAmenities.map((amenity, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconContext.Provider value={{ size: "1.2em", style: { color: "#666" } }}>
                          {amenityIcons[amenity] || defaultIcon}
                        </IconContext.Provider>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{amenity}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                {remainingAmenitiesCount > 0 && (
                  <Accordion expanded={expanded} onChange={handleExpansion} sx={{ mt: 2, boxShadow: "none", "&:before": { display: "none" } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: "38px", "& .MuiAccordionSummary-content": { my: 1, ml: -2 } }}>
                      <Typography variant="body2" color="primary">Show all {amenities.length} amenities</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1, pt: 0, ml: -2 }}>
                      <Grid container spacing={1}>
                        {amenities.slice(10).map((amenity, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <IconContext.Provider value={{ size: "1.2em", style: { color: "#666" } }}>
                                {amenityIcons[amenity] || defaultIcon}
                              </IconContext.Provider>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{amenity}</Typography>
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Paper>
            </Box>

            <Box sx={{ py: 3, borderBottom: 1, borderColor: "divider" }}>
              <Paper elevation={0} sx={{ p: 2, border: 1, borderColor: "grey.300", borderRadius: 1, backgroundColor: "transparent" }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: "#ff8c00" }} ref={roomsRef}>
                  Select our special rooms
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Rooms hotelData={hotelData} selectedRooms={selectedRooms} handleAddRoom={handleAddRoom} handleRemoveRoom={handleRemoveRoom} />
                </Box>
              </Paper>
            </Box>
            <Box sx={{ mt: { xs: 2, md: 3 } }}>
              <BookingReview hotelId={hotelData?.hotelId} />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: { xs: 0, md: 16 } }}>
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
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookNow;