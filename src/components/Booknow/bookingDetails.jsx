import React, { useState, useCallback, useEffect } from "react";
import useBookingMail from "./bookingMailConfirmation";
import "react-datepicker/dist/react-datepicker.css";
import { userEmail, userId, userMobile, userName } from "../../utils/Unauthorized";
import { applyCouponCode } from "../../redux/reducers/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../../utils/loader";
import { format } from "date-fns";
import baseURL from "../../utils/baseURL";
import { popup } from "../../utils/custom_alert/pop";
import { getGst } from "../../redux/reducers/gstSlice";
import BookingPage from "./bookingPage";

const BookingDetails = ({
  hotelId,
  hotelData,
  monthlyData,
  selectedRooms,
  roomsCount,
  guestsCount,
  checkInDate,
  checkOutDate,
  handleIncrementRooms,
  handleDecrementRooms,
  handleIncrementGuests,
  handleDecrementGuests,
  handleCheckInDateChange,
  handleCheckOutDateChange,
  scrollToRooms,
}) => {
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();
  const [showCouponField, setShowCouponField] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [selectedFood, setSelectedFood] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const gstData = useSelector((state) => state.gst.gst);
  const sendMail = useBookingMail()
  const toBeCheckRoomNumber =
    parseInt(localStorage.getItem("toBeCheckRoomNumber")) || 0;
  const compareRoomId = selectedRooms?.[0]?.roomId;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleToggleCoupon = () => setShowCouponField((prev) => !prev);

  const handleSelectFood = (foodItem) => {
    const isAlreadySelected = selectedFood.some(
      (item) => item.foodId === foodItem.foodId,
    );
    if (!isAlreadySelected) {
      setSelectedFood((prev) => [...prev, { ...foodItem, quantity: 1 }]);
    }
  };

  const handleRemoveFood = (foodItem) => {
    setSelectedFood((prev) =>
      prev.filter((item) => item.foodId !== foodItem.foodId),
    );
  };

  const handleCouponSubmit = () => {
    if (couponCode.trim() !== "") {
      handleApplyCoupon(hotelId, compareRoomId, couponCode);
      setShowCouponField(false);
    }
  };

  const handleApplyCoupon = useCallback(
    async (hotelId, roomId, couponCode) => {
      const payload = { hotelId, roomId, couponCode, userId };
      try {
        const response = await dispatch(applyCouponCode(payload));
        setDiscountPrice(response.payload.discountPrice || 0);
        sessionStorage.setItem(
          "discountPrice",
          response.payload.discountPrice || 0,
        );
        setIsCouponApplied(true);
      } catch (error) {
        console.error("Error applying coupon:", error);
        alert("Error applying coupon");
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const gstThreshold = calculateBasePrice();
    if (gstThreshold > 0) {
      const payload = {
        type: "Hotel",
        gstThreshold,
      };
      dispatch(getGst(payload));
    }
  }, [checkInDate, checkOutDate, selectedRooms, roomsCount, selectedFood]);

  const calculateTotalWithGST = () => {
    const singleRoom = selectedRooms[0];
    if (!singleRoom) return 0;

    const roomPricePerNight = singleRoom.price || 0;
    const gstPercent = parseFloat(gstData?.gstPrice || 0);

    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 1) return 0;

    const baseRoomPrice = roomPricePerNight * daysDifference;

    // GST is applied ONLY on one room per night × number of nights
    const gstAmount = (roomPricePerNight * daysDifference * gstPercent) / 100;


    const totalWithGST = baseRoomPrice + gstAmount;

    const discountedTotal = totalWithGST - (discountPrice || 0);

    return Math.round(discountedTotal > 0 ? discountedTotal : 0);
  };


  const calculateBasePrice = () => {
    let totalPrice = 0;

    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
    );
    if (daysDifference < 1) return 0;

    selectedRooms?.forEach((room) => {
      totalPrice += room.price * roomsCount;
    });

    totalPrice *= daysDifference;

    monthlyData?.forEach((bookingData) => {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);

      if (
        checkInDate < endDate &&
        checkOutDate > startDate &&
        compareRoomId === bookingData.roomId
      ) {
        totalPrice = bookingData.monthPrice * daysDifference;
      }
    });

    const foodPrice = selectedFood.reduce(
      (total, food) => total + food.price * (food.quantity || 1),
      0,
    );

    totalPrice += foodPrice;
    return totalPrice;
  };


  const getFinalPrice = () => {
    const roomPrice = selectedRooms.reduce(
      (total, room) => total + room.price * roomsCount,
      0,
    );
    return roomPrice - discountPrice;
  };

  const handleBookNow = async () => {
    try {
      showLoader();

      const bookingData = {
        hotelId,
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
        price: calculateTotalWithGST(),
        pm: "Offline",
        couponCode,
        gstPrice: gstData?.gstPrice,
        discountPrice: sessionStorage.getItem("discountPrice"),
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      if (toBeCheckRoomNumber > 0) {
        const response = await fetch(`${baseURL}/booking/${userId}/${hotelId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        const bookedDetails = await response.json();

        if (response.status === 201) {
          popup(
            `🎉 Booking Confirmed!\n\n📌 Booking ID: ${bookedDetails.data.bookingId}\n` +
            `📅 Check in Date: ${format(new Date(bookedDetails.data.checkInDate), "dd MMM yyyy")}\n` +
            `📅 Check out Date: ${format(new Date(bookedDetails.data.checkOutDate), "dd MMM yyyy")}`,
            () => {
              window.location.href = "/bookings";
            },
            6
          );
          sendMail(bookedDetails.data); // ✅ using the hook

          sessionStorage.removeItem("discountPrice");
          setSelectedFood([]);
          setIsCouponApplied(false);
          setDiscountPrice(0);
        } else {
          alert(bookedDetails?.message || "Booking failed");
        }
      } else {
        alert("This room is already fully booked");
      }
    } catch (error) {
      console.error("Error booking:", error);
    } finally {
      hideLoader();
    }
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      showLoader();
      const bookingData = {
        hotelId,
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
        price: calculateTotalWithGST(),
        pm: "Online",
        couponCode: couponCode,
        gstPrice: gstData?.gstPrice,
        discountPrice: sessionStorage.getItem("discountPrice"),
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      if (toBeCheckRoomNumber <= 0) {
        alert("This room is already fully booked");
        return;
      }
      const response = await fetch(`${baseURL}/booking/${userId}/${hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.status === 201) {
        sendMail(data.data);
      }


      if (response.status !== 200 && response.status !== 201) {
        alert(data.message || "Booking failed during payment setup");
        return;
      }
      const options = {
        key: "rzp_test_7xbcyn4tIZfQPE",
        amount: calculateTotalWithGST() * 100, // Convert ₹ to paise
        currency: "INR",
        name: "Hotel Booking",
        description: "Room + Food Booking",
        order_id: data.bookingId,
        handler: function (response) {
          popup(
            `🎉 Booking Confirmed!\n\n📌 Booking ID: ${data?.bookingId}\n` +
            `📅 Check in Date: ${format(new Date(data?.checkInDate), "dd MMM yyyy")}\n` +
            `📅 Check out Date: ${format(new Date(data?.checkOutDate), "dd MMM yyyy")}`,
            () => {
              window.location.href = "/bookings";
            }
          );

          sessionStorage.removeItem("discountPrice");
          setSelectedFood([]);
          setIsCouponApplied(false);
          setDiscountPrice(0);
        },
        prefill: {
          name: userName.displayName,
          email: userEmail,
          contact: userMobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment.");
    } finally {
      hideLoader();
    }
  };

  const handlePartialPayment = async () => {
    try {
      showLoader();
      const bookingData = {
        hotelId,
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
        price: calculateTotalWithGST(),
        pm: "Online",
        couponCode: couponCode,
        gstPrice: gstData?.gstPrice,
        isPartialBooking: true,
        bookingStatus: "Pending",
        partialAmount: (calculateTotalWithGST() * 0.5).toFixed(0), // 50% of total
        discountPrice: sessionStorage.getItem("discountPrice"),
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      if (toBeCheckRoomNumber <= 0) {
        alert("This room is already fully booked");
        return;
      }
      const response = await fetch(`${baseURL}/booking/${userId}/${hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.status === 201) {
        sendMail(data.data);
      }
      if (response.status !== 200 && response.status !== 201) {
        alert(data.message || "Booking failed during payment setup");
        return;
      }
      const options = {
        key: "rzp_test_7xbcyn4tIZfQPE",
        amount: (calculateTotalWithGST() * 0.5 * 100).toFixed(0), // 50% of total
        currency: "INR",
        name: "Hotel Booking",
        description: "Room + Food Booking",
        order_id: data.bookingId,
        handler: function (response) {
          popup(
            `🎉 Booking Confirmed!\n\n📌 Booking ID: ${data?.bookingId}\n` +
            `📅 Check in Date: ${format(new Date(data?.checkInDate), "dd MMM yyyy")}\n` +
            `📅 Check out Date: ${format(new Date(data?.checkOutDate), "dd MMM yyyy")}`,
            () => {
              window.location.href = "/bookings";
            }
          );

          sessionStorage.removeItem("discountPrice");
          setSelectedFood([]);
          setIsCouponApplied(false);
          setDiscountPrice(0);
        },
        prefill: {
          name: userName.displayName,
          email: userEmail,
          contact: userMobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment.");
    } finally {
      hideLoader();
    }
  };


  return (
    <>
      <BookingPage
        selectedRooms={selectedRooms}
        scrollToRooms={scrollToRooms}
        roomsCount={roomsCount}
        guestsCount={guestsCount}
        handleDecrementRooms={handleDecrementRooms}
        handleIncrementRooms={handleIncrementRooms}
        handleDecrementGuests={handleDecrementGuests}
        handleIncrementGuests={handleIncrementGuests}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        handleCheckInDateChange={handleCheckInDateChange}
        handleCheckOutDateChange={handleCheckOutDateChange}
        isCouponApplied={isCouponApplied}
        showCouponField={showCouponField}
        handleToggleCoupon={handleToggleCoupon}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        handleCouponSubmit={handleCouponSubmit}
        discountPrice={discountPrice}
        getFinalPrice={getFinalPrice}
        calculateBasePrice={calculateBasePrice}
        calculateTotalWithGST={calculateTotalWithGST}
        gstData={gstData}
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        handleCloseModal={handleCloseModal}

        selectedFood={selectedFood}
        hotelData={hotelData}
        handleRemoveFood={handleRemoveFood}
        handleSelectFood={handleSelectFood}
        handlePayment={handlePayment}
        handlePartialPayment={handlePartialPayment}
        handleBookNow={handleBookNow}
      />
    </>
  );
};

export default BookingDetails;
