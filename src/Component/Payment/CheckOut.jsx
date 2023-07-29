import axios from "axios";
import React from "react";

export default function CheckOut({
  hotelId,
  userId,
  amount,
  currency,
  userData,
  checkIn,
  checkOut,
  guests,
  rooms,
  hotelName,
  hotelimage,
  destination,
}) {
  const handleOpenRazorpay = (data) => {
    const options = {
      name: "Hotel Booking",
      key: "rzp_test_CE1nBQFs6SwXnC",
      amount: amount * 100 * rooms,
      currency: data.currency,
      prefill: {
        name: userData.name,
        email: userData.email,
      },
      remember: true,
      handler: function (response) {
        if (response.razorpay_payment_id) {
          handleBooking("success");
        } else {
          handleBooking("failed");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      handleBooking("failed");
    });

    rzp.open();
  };

  console.log(userData, "USERDATA CHECKOUTPAGE");

  const handlePayment = async () => {
    const data = {
      hotelId: hotelId,
      userId: userId,
      amount: amount,
      currency: currency,
    };

    try {
      const response = await axios.post("http://localhost:5000/payments", data);
      handleOpenRazorpay(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBooking = (paymentStatus) => {
    const bookingData = {
      userId: userId,
      hotelId: hotelId,
      hotelName: hotelName,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      rooms: rooms,
      price: amount,
      paymentStatus: paymentStatus,
      images: hotelimage,
      destination: destination,
    };

    if (userData && userData.email && paymentStatus === "success") {
      axios
        .post(`http://localhost:5000/booking/${userId}/${hotelId}`, bookingData)
        .then((res) => {
          console.log(res.data, "Booking created successfully", bookingData);

          if (userData.email) {
            axios
              .post("http://localhost:5000/SendBookingEmail", {
                bookingData: bookingData,
                email: userData.email,
              })
              .then((res) => {
                console.log("Email sent successfully");
              })
              .catch((err) => {
                console.log("Failed to send email", err);
              });
          } else {
            console.log("User data does not have a valid email");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("User data, email, or payment status is not valid");
    }
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut || guests < 1 || rooms < 1) {
      alert("Please fill in all the required information before booking.");
    } else {
      handlePayment();
    }
  };

  return (
    <>
      <button
        onClick={handleBookNow}
        style={{
          padding: "10px 15px",
          backgroundColor: "#0056b3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        Book Now
      </button>
    </>
  );
}
