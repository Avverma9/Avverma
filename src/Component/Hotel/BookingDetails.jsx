import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookingDetails.module.css";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { BsPencil } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { AiOutlineCodepenCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BiBed } from "react-icons/bi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDetails = ({
  hotelOwnerName,
  hotelName,
  foodPrice,
  hotelID,
  userId,
  currency,
  userData,
  selectedRooms,
  selectedGuests,
  hotelimage,
  destination,
  foodIdArr,
  setFoodIdArr,
  roomPrice,
  roomType,
  bedtype,
  isOffer,
  offerDetails,
  offerPriceLess,
  toast,
  changeScrollPos,
  bookingRef,
  selectRoomRef,
  positionTop,
  meals,
}) => {
  // console.log(scrollPos);
  const [openPaymentModule, setOpenPaymentModule] = useState(false);
  const navigate = useNavigate()
  const handleOpenRazorpay = (data) => {
    console.log(data);
    const options = {
      name: hotelName,
      key: "rzp_test_CE1nBQFs6SwXnC",
      amount: data?.payment.amount * 100,
      currency: data?.payment.currency,
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



  const totalAccommodationPrice = roomPrice * selectedRooms;

  const totalPrice = totalAccommodationPrice + foodPrice;


  const handleBooking = (paymentStatus) => {
    const bookingData = {
      hotelName: hotelName,
      hotelOwnerName: hotelOwnerName,
      checkIn: selectdate,
      checkOut: selectdatecheckout,
      guests: selectedGuests,
      rooms: selectedRooms,
      price: roomPrice,
      paymentStatus: paymentStatus,
      images: hotelimage,
      destination: destination,
      foodItems: foodIdArr,
    };
    if (userData && userData.email && paymentStatus === "success") {
      axios
        .post(
          `https://hotel-backend-tge7.onrender.com/booking/${userId}/${hotelID}`,
          bookingData
        )
        .then((res) => {
          console.log(res.status);
          setFoodIdArr([]);

          if (res.status === 201) {
            toast.success("Booking created successfully");
            alert("Your booking is done !")
            navigate("profile/confirm-booking")
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      console.log("User data, email, or payment status is not valid");
    }
  };

  const handlePayment = async () => {
    const data = {
      // hotelOwnerName: hotelOwnerName,
      hotelId: hotelID,
      userId: userId,
      amount: roomPrice * selectedRooms + foodPrice,
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
  const initialCheckInDate = new Date();
  initialCheckInDate.setDate(initialCheckInDate.getDate() + 1);

  // Set default check-out date to one day after check-in date
  const initialCheckOutDate = new Date(initialCheckInDate);
  initialCheckOutDate.setDate(initialCheckOutDate.getDate() + 1);

  const [selectdate, setSelectdate] = useState(initialCheckInDate);
  const [selectdatecheckout, setSelectdatecheckout] = useState(initialCheckOutDate);

  const handledatechange = (date) => {
    setSelectdate(date);
  };

  const handledatechange2 = (date) => {
    setSelectdatecheckout(date);
  };


  const paymentSelect = () => {
    setOpenPaymentModule(true);
  };

  const handlePayatCheckin = () => {
    handleBooking("success");
  };

  return (
    <>
      <div
        className="new-booking-details"
        style={{
          position: "sticky",
          top: Math.round(positionTop * 1),
        }}
      >
        <div className={styles.main}>
          <div className={styles.headupper}>
            <div className={styles.head}>
            <span>
                <FaRupeeSign className={styles.rupee_sign} />
               
                  <span className={styles.roomPrice}>
                    {roomPrice}
                  </span>
            
              </span>
            
            </div>
            <div className={styles.inclusive_tex}>Inclusive of all taxes</div>
          </div>
          <div className={styles.check_room}>
            <div className={styles.check_in}>
              <div className={styles.check_in_in}>
                <div
                  className={styles.check_in_in_in}
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "600" }}>
                      Check In{" "}
                    </h4>
                    <span className={styles.check_in_real}>
                      <DatePicker
                        selected={selectdate}
                        onChange={handledatechange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Check-in Date"
                      />
                      {selectdate && <p> {selectdate.toDateString()}</p>}
                    </span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "600" }}>
                      Check Out{" "}
                    </h4>
                    <span className={styles.check_out_real}>
                      <DatePicker
                        selected={selectdatecheckout}
                        onChange={handledatechange2}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Check-out Date"
                      />
                      {selectdatecheckout && (
                        <p> {selectdatecheckout.toDateString()}</p>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.guest}>
              <div className={styles.guest_in}>
                <div
                  className={styles.guest_in_in}
                  onClick={() => {
                    changeScrollPos(bookingRef.current);
                  }}
                >
                  {selectedRooms} Room , {selectedGuests} Guest
                </div>
              </div>
            </div>
          </div>
          <div className={styles.facilities}>
            <div className={styles.pen_icon}>
              <span className={styles.icon_pen}>
                <BiBed />
              </span>
              <div className={styles.textnew}>
         
                <span className={styles.textc}>{roomType}-{bedtype}</span>
              </div>
            </div>
            <div className={styles.pencil_icon}>
              <span
                className={styles.penci_ico}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeScrollPos(selectRoomRef.current);
                }}
              >
                <BsPencil />
              </span>
            </div>
          </div>
          
          

          <div className={styles.pricechart}>
            <div className={styles.pri}>
              <div className={styles.pri1}>Accomodation:</div>
              <div className={styles.pri2}>
              <span className={styles.p}>
                  <FaRupeeSign />
                  {totalAccommodationPrice}
                </span>
              </div>
            </div>
            {meals && meals.length > 0 ? (
              <div className={styles.pri}>
                <div className={styles.pri1}>Food Items:</div>
                <div className={styles.pri2}>
                <span className={styles.p}>
                    <FaRupeeSign />
                    {foodPrice}
                  </span>
                </div>
              </div>
            ) : null}
       
            <div className={styles.pri}>
              <div className={styles.pri1}>Total Price</div>
              <div className={styles.pri2}>
              <span className={styles.p}>
                  <FaRupeeSign />
                  {totalPrice}
                </span>
              </div>
            </div>
           
           
          </div>

          {openPaymentModule === false ? (
            <div className={styles.btn_payment}>
              <button className="payment-btn" onClick={paymentSelect}>
                Make Payment
              </button>
            </div>
          ) : (
            <>
              <div
                className={styles.btn_payment}
                style={{ marginBottom: "15px" }}
              >
                <button onClick={handlePayment}>Pay Now</button>
              </div>
              <div
                className={styles.btn_payment}
                style={{ marginBottom: "15px" }}
              >
                <button onClick={handlePayatCheckin}>Pay at Hotel</button>
              </div>
              <div className={styles.btn_payment}>
                <button
                  style={{ backgroundColor: "#ff0000" }}
                  onClick={() => setOpenPaymentModule(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
