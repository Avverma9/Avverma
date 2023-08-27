import React from "react";
import styles from "./BookingDetails.module.css";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { BsPencil } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { AiOutlineCodepenCircle } from "react-icons/ai";

const BookingDetails = ({
  price,
  foodPrice,
  hotelId,
  userId,
  currency,
  userData,
  hotelName,
  selectedRooms,
  selectedGuests,
}) => {
  const handleOpenRazorpay = (data) => {
    const options = {
      name: hotelName,
      key: "rzp_test_CE1nBQFs6SwXnC",
      amount: (price * selectedRooms + foodPrice) * 100,
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
          <div className={styles.headupper}>
            <div className={styles.head}>
              <span>
                <FaRupeeSign className={styles.rupee_sign} />
                {price * selectedRooms + foodPrice}
              </span>
              <span>1999</span>
              <span>81% off</span>
            </div>
            <div className={styles.inclusive_tex}>Inclusive of all taxes</div>
          </div>
          <div className={styles.check_room}>
            <div className={styles.check_in}>
              <div className={styles.check_in_in}>
                <div className={styles.check_in_in_in}>
                  <span className={styles.check_in_real}>Mon,1 Oct</span>
                  <span className={styles.dash}>-</span>
                  <span className={styles.check_out_real}>Tue,2 Oct</span>
                </div>
              </div>
            </div>
            <div className={styles.guest}>
              <div className={styles.guest_in}>
                <div className={styles.guest_in_in}>
                  {selectedRooms} Room , {selectedGuests} Guest
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.facilities}>
            <div className={styles.pen_icon}>
              <span className={styles.icon_pen}>
                <CiMobile1 />
              </span>
              <div className={styles.textnew}>
                <span className={styles.textc}>Spot On Non Ac</span>
              </div>
            </div>
            <div className={styles.pencil_icon}>
              <span className={styles.penci_ico}>
                <BsPencil />
              </span>
            </div>
          </div> */}
          {/* <div className={styles.offerdata}>
            <span className={styles.percenticon}>
              <BiSolidOffer />
            </span>
            <div className={styles.textpercentage}>
              <div className={styles.fioffer}>
                <span className={styles.textoff}>First Coupen Applied</span>
                <div className={styles.textoffdiv}>More offer</div>
              </div>
              <div className={styles.seoffer}>
                <span className={styles.offerspan}>
                  <FaRupeeSign />
                  -529
                </span>
                <label htmlFor="offercheckbox">
                  <input type="checkbox" id="offercheckbox" />
                </label>
              </div>
            </div>
          </div> */}
          {/* <div className={styles.offerapplied}>
            <div className={styles.fside}>
              <span className={styles.icon_a}>
                <AiOutlineCodepenCircle />
              </span>
              <span className={styles.textf}>
                Money Applied
                <div className={styles.down_text}>
                  (<FaRupeeSign />
                  90 Extra)
                </div>
              </span>
            </div>
            <div className={styles.sside}>
              <span className={styles.labelr}>
                <FaRupeeSign />
                -89
              </span>
              <label htmlFor="checkboxr">
                <input type="checkbox" id="checkboxr" />
              </label>
            </div>
          </div> */}
          {/* <div className={styles.wizard}>
            <div className={styles.wizardf}>
              <div className={styles.wizard_in}>
                <div className={styles.wizardf1}>
                  Wizard Blue Membership Charge
                </div>
                <div className={styles.wizardf2}>
                  Get additional benefits upto <FaRupeeSign />
                  1000
                </div>
              </div>
              <div className={styles.wizard_inin}>
                <div className={styles.rightwizard}>
                  <div className={styles.rswizard}>
                    <FaRupeeSign />
                    99
                  </div>
                  <div className={styles.rs2wizard}>
                    <FaRupeeSign />
                    199
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className={styles.pricechart}>
            <div className={styles.pri}>
              <div className={styles.pri1}>Hotel Price</div>
              <div className={styles.pri2}>
                <span className={styles.p}>
                  <FaRupeeSign />
                  {price * selectedRooms}
                </span>
              </div>
            </div>
            <div className={styles.pri}>
              <div className={styles.pri1}>Food Price</div>
              <div className={styles.pri2}>
                <span className={styles.p}>
                  <FaRupeeSign />
                  {foodPrice}
                </span>
              </div>
            </div>
            <div className={styles.pri}>
              <div className={styles.pri1}>Total Price</div>
              <div className={styles.pri2}>
                <span className={styles.p}>
                  <FaRupeeSign />
                  {price * selectedRooms + foodPrice}
                </span>
              </div>
            </div>
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
