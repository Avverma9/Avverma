import React from "react";
import styles from "./BookingDetails.module.css";
import axios from "axios";

const BookingDetails = ({
  price,
  foodPrice,
  hotelId,
  userId,
  currency,
  userData,
}) => {
  const handleOpenRazorpay = (data) => {
    const options = {
      name: "Hotel Booking",
      key: "rzp_test_CE1nBQFs6SwXnC",
      amount: (price + foodPrice) * 100,
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

  const handleBooking = (paymentStatus) => {
    //  const bookingData = {
    //    userId: userId,
    //    hotelId: hotelId,
    //    hotelName: hotelName,
    //    checkIn: checkIn,
    //    checkOut: checkOut,
    //    guests: guests,
    //    rooms: rooms,
    //    price: amount,
    //    paymentStatus: paymentStatus,
    //    images: hotelimage,
    //    destination: destination,
    //  };
    console.log(paymentStatus);
  };

  const handlePayment = async () => {
    const data = {
      hotelId: hotelId,
      userId: userId,
      amount: price + foodPrice,
      currency: currency,
    };
    try {
      const response = await axios.post(
        "https://hotel-backend-tge7.onrender.com/payments",
        data
      );
      handleOpenRazorpay(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="new-booking-details">
        <div className={styles.main}>
          <h5>Booking Summary</h5>
          <div className={styles.details}>
            <p>
              <span className={styles.gray}>Rooms:</span>{" "}
              <span className={styles.spanprice}>{price}</span>
            </p>
            <p>
              <span className={styles.gray}>Extra Person:</span>{" "}
              <span className={styles.spanprice}>0</span>
            </p>
            <p>
              <span className={styles.gray}>Food Price:</span>{" "}
              <span className={styles.spanprice}>{foodPrice}</span>
            </p>
            <p>
              <span className={styles.gray}>Subtotal:</span>{" "}
              <span className={styles.spanprice}>0</span>
            </p>
            <p>
              <span className={styles.gray}>Final Price:</span>{" "}
              <span className={styles.spanprice}>{price + foodPrice}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.btn_payment}>
        <button className="payment-btn" onClick={handlePayment}>
          Make Payment
        </button>
      </div>
    </>
  );
};

export default BookingDetails;
