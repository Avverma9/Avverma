import React, { useState, useCallback, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  userEmail,
  userId,
  userMobile,
  userName,
} from "../../utils/Unauthorized";
import { applyCouponCode } from "../../redux/reducers/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../../utils/loader";
import { format } from "date-fns";
import baseURL from "../../utils/baseURL";
import { popup } from "../../utils/custom_alert/pop";
import BookingPage from "./bookingPage";
import { getGstForHotelData } from "../../redux/reducers/gstSlice";

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
  const gstData = useSelector((state) => state.gst.gstData);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
  const fetchGst = async () => {
    // Step 1: Create price string
    const roomPrices = selectedRooms.map((room) => room.price).join(',');

    // Step 2: First GST call based on roomPrices
    const response = await dispatch(
      getGstForHotelData({ type: "Hotel", gstThreshold: [roomPrices] })
    );

    const gstData = response?.payload;
    const gstPrice = gstData?.gstPrice;
    const gstMinThreshold = gstData?.gstMinThreshold;

    if (gstPrice && gstMinThreshold) {
      // Step 3: Now calculate total price for booking
      const daysDifference = Math.max(
        1,
        Math.ceil(
          (new Date(checkOutDate) - new Date(checkInDate)) /
            (1000 * 60 * 60 * 24)
        )
      );

      if (
        selectedRooms &&
        selectedRooms.length > 0 &&
        roomsCount > 0
      ) {
        const basePrice = selectedRooms[0].price || 0;
        const totalBookingPrice = basePrice * daysDifference * roomsCount;

        // Step 4: Call GST API again with totalBookingPrice
        const secondResponse = await dispatch(
          getGstForHotelData({
            type: "Hotel",
            gstThreshold: [totalBookingPrice],
          })
        );

        const secondGstData = secondResponse?.payload;
        const secondGstPrice = secondGstData?.gstPrice;
        const secondGstMinThreshold = secondGstData?.gstMinThreshold;

        if (secondGstPrice && secondGstMinThreshold) {
          const gstRate = secondGstPrice / secondGstMinThreshold;
          const calculatedGstAmount = totalBookingPrice * gstRate;
          setGstAmount(calculatedGstAmount);
        }
      }
    }
  };

  fetchGst();
}, [dispatch, selectedRooms, roomsCount, checkInDate, checkOutDate]);
const gstAmount = gstData?.gstPrice || 0;
  const calculateTotal = () => {
    if (!selectedRooms || selectedRooms.length === 0 || !selectedRooms[0]) {
      return { total: 0 };
    }

    const singleRoomPrice = selectedRooms[0].price || 0;

    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference < 1) {
      return { total: 0 };
    }

    const baseRoomPriceForAllRooms =
      singleRoomPrice * daysDifference * roomsCount;

    const foodPrice = selectedFood.reduce(
      (total, food) => total + food.price * (food.quantity || 1),
      0,
    );

    const total = baseRoomPriceForAllRooms + foodPrice;

    const discountedTotal = total - (discountPrice || 0);

    return {
      total: Math.round(discountedTotal > 0 ? discountedTotal : 0),
    };
  };

  const bookingDetails = calculateTotal();
  const finalTotal = bookingDetails.total;

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
        price: finalTotal,
        pm: "Offline",
        couponCode,
        discountPrice: sessionStorage.getItem("discountPrice"),
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      if (toBeCheckRoomNumber > 0) {
        const response = await fetch(
          `${baseURL}/booking/${userId}/${hotelId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          },
        );

        const bookedDetails = await response.json();

        if (response.status === 201) {
          popup(
            `🎉 Booking Confirmed!\n\n📌 Booking ID: ${bookedDetails.data.bookingId}\n` +
            `📅 Check in Date: ${format(
              new Date(bookedDetails.data.checkInDate),
              "dd MMM yyyy",
            )}\n` +
            `📅 Check out Date: ${format(
              new Date(bookedDetails.data.checkOutDate),
              "dd MMM yyyy",
            )}`,
            () => {
              window.location.href = "/bookings";
            },
            6,
          );

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
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
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

      if (toBeCheckRoomNumber <= 0) {
        alert("This room is already fully booked");
        return;
      }

      const totalAmount = finalTotal;

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
        price: totalAmount,
        pm: "Online",
        couponCode,
        discountPrice: sessionStorage.getItem("discountPrice"),
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const orderRes = await fetch(`${baseURL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100 }), // amount in paisa
      });

      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        console.error("Order creation failed:", errorText);
        alert("Failed to initiate payment. Try again.");
        return;
      }

      const orderData = await orderRes.json();

      const options = {
        key: "rzp_test_0UMxKeTqqehh1o",
        amount: totalAmount * 100,
        currency: "INR",
        name: "Hotel Booking",
        description: "Room + Food Booking",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            bookingData.paymentId = response.razorpay_payment_id;

            const bookingRes = await fetch(
              `${baseURL}/booking/${userId}/${hotelId}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
              },
            );

            if (!bookingRes.ok) {
              const errorText = await bookingRes.text();
              console.error("Booking failed:", errorText);
              alert("Booking failed after payment. Please contact support.");
              return;
            }

            const bookingRespData = await bookingRes.json();

            popup(
              `🎉 Booking Confirmed!\n\n📌 Booking ID: ${bookingRespData.data.bookingId}\n` +
              `📅 Check-in: ${format(
                new Date(bookingRespData.data.checkInDate),
                "dd MMM yyyy",
              )}\n` +
              `📅 Check-out: ${format(
                new Date(bookingRespData.data.checkOutDate),
                "dd MMM yyyy",
              )}`,
              () => (window.location.href = "/bookings"),
              6,
            );

            sessionStorage.removeItem("discountPrice");
            setSelectedFood([]);
            setIsCouponApplied(false);
            setDiscountPrice(0);
          } catch (err) {
            console.error("Error booking after payment:", err);
            alert("Something went wrong while finalizing your booking.");
          }
        },
        prefill: {
          name: userName?.displayName || "",
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

      if (toBeCheckRoomNumber <= 0) {
        alert("This room is already fully booked");
        return;
      }

      const totalAmount = finalTotal;
      const partialAmount = Math.round(totalAmount * 0.5);
      const partialAmountPaise = partialAmount * 100;

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
        price: totalAmount,
        pm: "Online",
        couponCode,
        isPartialBooking: true,
        bookingStatus: "Pending",
        partialAmount,
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

      const orderRes = await fetch(`${baseURL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: partialAmountPaise }),
      });

      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        console.error("Order creation failed:", errorText);
        alert("Failed to initiate payment. Try again.");
        return;
      }

      const orderData = await orderRes.json();

      const options = {
        key: "rzp_test_7xbcyn4tIZfQPE",
        amount: partialAmountPaise,
        currency: "INR",
        name: "Hotel Booking",
        description: "50% Advance Payment - Room + Food",
        order_id: orderData.orderId,
        handler: async function (paymentResponse) {
          try {
            bookingData.paymentId = paymentResponse.razorpay_payment_id;

            const response = await fetch(
              `${baseURL}/booking/${userId}/${hotelId}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
              },
            );

            if (!response.ok) {
              const errText = await response.text();
              console.error("Booking failed:", errText);
              alert("Booking failed after payment. Please contact support.");
              return;
            }

            const data = await response.json();

            popup(
              `🎉 Booking Confirmed!\n\n📌 Booking ID: ${data?.data?.bookingId}\n` +
              `📅 Check-in: ${format(
                new Date(data?.data?.checkInDate),
                "dd MMM yyyy",
              )}\n` +
              `📅 Check-out: ${format(
                new Date(data?.data?.checkOutDate),
                "dd MMM yyyy",
              )}`,
              () => {
                window.location.href = "/bookings";
              },
            );

            sessionStorage.removeItem("discountPrice");
            setSelectedFood([]);
            setIsCouponApplied(false);
            setDiscountPrice(0);
          } catch (bookingError) {
            console.error("Booking failed after payment:", bookingError);
            alert("Something went wrong while finalizing your booking.");
          }
        },
        prefill: {
          name: userName?.displayName || "",
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
        gstAmount={gstAmount}
        finalTotal={finalTotal}
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
