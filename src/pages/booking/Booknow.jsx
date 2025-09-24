import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { addDays } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BsClockHistory } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchBookingData,
  fetchMonthlyData,
} from "../../redux/reducers/bookingSlice";
import amenityIcons from "../../utils/extrasList";
import BookingDetails from "./bookingDetails";
import BookingReview from "./BookingReview";
import Rooms from "./rooms";

import { StarHalfSharp } from "@mui/icons-material";

import { useToast } from "../../utils/toast";
import BookNowSkeleton from "./BookNowSkeleton";
import HotelPolicyCard from "./policy-card";
import AdvancedImageGallery from "./ImageGallery";

const BookNow = () => {
  const dispatch = useDispatch();
  const toast = useToast();
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
  const navigate = useNavigate();
  const [guestsCount, setGuestsCount] = useState(3);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const roomsRef = useRef(null);
  const foodsRef = useRef(null);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  const { bookingData, monthlyData } = useSelector((state) => state.booking);
  const compareRoomId = localStorage.getItem("toBeUpdatedRoomId");

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
      (selected) => selected._id === food._id
    );
    if (existingFoodIndex !== -1) {
      const updatedFood = selectedFood.map((item, index) =>
        index === existingFoodIndex ? { ...food, quantity: 1 } : item
      );
      setSelectedFood(updatedFood);
    } else {
      setSelectedFood([...selectedFood, { ...food, quantity: 1 }]);
    }
    toast.info(`${food.name} is added`);
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
    setSelectedRooms([room]);
    localStorage.setItem("toBeUpdatedRoomId", room.roomId);
    localStorage.setItem("toBeCheckRoomNumber", room.countRooms);
    toast.info(`${room.type} is selected`);
  };

  const handleRemoveRoom = (room) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.length === 1) {
        toast.info("You must have at least one room selected.");
        return prevSelectedRooms;
      }
      return prevSelectedRooms.filter(
        (selectedRoom) => selectedRoom.roomId !== room.roomId
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
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
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
          (item) => item.offerPriceLess > 0
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

  const currentRoom = selectedRooms[0];

  useEffect(() => {
    if (currentRoom?.offerExp) {
      const countdownDate = new Date(currentRoom.offerExp).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime() + 5.5 * 60 * 60 * 1000;
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
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
    toast.info("Currently we are accepting only Pay at Hotel method");
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
      toast.info("Checkout date must be after the check-inp date.");
      return;
    }
    setCheckOutDate(date);
  };
  const amenities =
    hotelData?.amenities?.flatMap((amenityArray) => amenityArray.amenities) ||
    [];
  const visibleAmenities = amenities.slice(0, 10);
  const remainingAmenitiesCount = amenities.length - visibleAmenities.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      {!hotelData ? (
        <BookNowSkeleton />
      ) : (
        <>
          {/* Hotel Name, Rating, and Address */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {hotelData?.hotelName}
              </h1>
              <span className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md text-sm font-semibold w-fit mt-1 sm:mt-0">
                <StarHalfSharp fontSize="small" />
                {hotelData?.starRating}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <PlaceIcon fontSize="small" />
              <p className="text-sm">
                {hotelData?.landmark}, {hotelData?.city}, {hotelData?.state},{" "}
                {hotelData?.pinCode}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            {/* Left Column: Gallery and Details */}
            <div className="lg:col-span-2">
              <AdvancedImageGallery hotelData={hotelData} />

              <div className="py-6 border-b border-gray-200">
                {currentRoom?.offerPriceLess > 0 ? (
                  <div>
                    {/* Price & Discount Row */}
                    <div className="flex items-center gap-3">
                      <p className="text-base text-gray-500 line-through">
                        ₹{currentRoom.price + currentRoom.offerPriceLess}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{currentRoom.price}
                      </p>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Save ₹{currentRoom.offerPriceLess}
                      </span>
                    </div>

                    {/* Subtext */}
                    <p className="text-sm text-gray-600 mt-1">
                      Special offer on {currentRoom.type}
                    </p>

                    {/* Timer */}
                    <div className="mt-2 flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md w-fit">
                      <BsClockHistory className="text-gray-600 text-sm" />
                      <span className="text-xs text-gray-700 font-mono">{timeLeft}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{currentRoom?.price}
                    </p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                )}

                {/* Hotel Description */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {hotelData?.description}
                </p>
              </div>

              {/* Amenities section */}
              {/* Amenities Heading */}
              <Typography
                variant="h6"
                component="h2"
                ref={roomsRef}
                className="font-semibold text-gray-900 bg-amber-500 rounded-md px-3 py-1 inline-block shadow-sm"
              >
                Amenities
              </Typography>
              <div className="mt-4 w-full max-w-none px-0">

                {/* Visible Amenities Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-2">
                  {visibleAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <IconContext.Provider
                        value={{ size: "1.2em", className: "text-gray-700" }}
                      >
                        {amenityIcons[amenity] || defaultIcon}
                      </IconContext.Provider>
                      <span className="text-sm text-gray-800">{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Show More link */}
                {remainingAmenitiesCount > 0 && (
                  <button
                    onClick={handleExpansion}
                    className="mt-2 text-sm font-semibold text-red-600 hover:underline"
                  >
                    {expanded
                      ? "Show Less"
                      : `Show More`}
                  </button>
                )}

                {/* Hidden Amenities List */}
                {expanded && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mt-3">
                    {amenities.slice(10).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <IconContext.Provider
                          value={{ size: "1.2em", className: "text-gray-700" }}
                        >
                          {amenityIcons[amenity] || defaultIcon}
                        </IconContext.Provider>
                        <span className="text-sm text-gray-800">{amenity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Amenities section end*/}

              <div className="py-6 border-b border-gray-200">
                <Typography
                  variant="h6"
                  component="h2"
                  ref={roomsRef}
                  className="font-semibold text-gray-900 bg-amber-500 rounded-md px-3 py-1 inline-block shadow-sm"
                >
                  Select our special rooms
                </Typography>
                <div className="mt-4 w-full max-w-none px-0">
                  <Rooms
                    hotelData={hotelData}
                    selectedRooms={selectedRooms}
                    handleAddRoom={handleAddRoom}
                    handleRemoveRoom={handleRemoveRoom}
                  />
                </div>

              </div>

              <div className="py-6 border-b border-gray-200">
                <HotelPolicyCard hotelData={hotelData} />
              </div>

             
            </div>

            {/* Right Column: Booking Details */}
            <div className="mt-8 lg:mt-0">
              <div className="sticky top-4">
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
             
          </div><div className="mt-6">
                <BookingReview hotelId={hotelData?.hotelId} />
              </div>
        </>
      )}
    </div>
  );
};

export default BookNow;
