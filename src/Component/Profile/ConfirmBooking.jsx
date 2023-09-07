import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import './ConfirmBooking.module.css'

const styles = {
  tableContainer: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  cell: {
    padding: "10px",
    border: "1px solid #ccc",
  },
  circularImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  circularImageImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export const ConfirmBooking = ({ toast }) => {
  const [bookingDetails, setBookingDetails] = useState(null);


  const fetchBookingDetails = useCallback(async () => {
    const id = localStorage.getItem("userId")
    console.log(id, "myId")
    try {
      const response = await axios.get(`https://hotel-backend-tge7.onrender.com/bookingsConfirm/${id}`)
      const bookings = response.data;
      console.log(bookings, "backend data");
      setBookingDetails(bookings);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching booking details");
    }
  }, [setBookingDetails, toast]);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="_title">
        <h1>Confirmed Booking</h1>
      </div>

      <div className="sub_Title">
        We are pleased to inform you that your booking has been confirmed.
      </div>

      <div className="_title">
        <h1>Booking Details</h1>
      </div>

      {bookingDetails && bookingDetails.length > 0 ? (
        <>
          {
            bookingDetails.map((bookingDetails) => {
              return (<>
 <div className="card" style={{ display: "inline-block" , width: "18rem" , marginBottom : "12px" , marginRight : "30px"}}>
            <img src={`${bookingDetails.images}`} className="card-img-top" alt="..." />
            <table className="mytable">
              <tr>
                <td><strong>Booking ID</strong></td>
                <td>{bookingDetails.bookingId}</td>
              </tr>
              <tr>
                <td><strong>Booking Date</strong></td>
                <td>{bookingDetails.createdAt.substring(0,10)}</td>
              </tr>
              <tr>
                <td><strong>Booking Time</strong></td>
                <td>{bookingDetails.createdAt.substring(11,19)}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>{bookingDetails.bookingStatus}</td>
              </tr>
              <tr>
                <td><strong>Hotel</strong></td>
                <td>{bookingDetails.hotelName}</td>
              </tr>
              <tr>
                <td><strong>Destination Name</strong></td>
                <td>{bookingDetails.destination}</td>
              </tr>
              <tr>
                <td><strong>Guests</strong></td>
                <td>{bookingDetails.guests}</td>
              </tr>
              <tr>
                <td><strong>Food Items</strong></td>
                <td>{bookingDetails.foodItems.length &&  bookingDetails.foodItems.map((e)=>{return (<><ul><li>{e.name}</li></ul></>)})}</td>
              </tr>
              <tr>
                <td><strong>Check-In Date</strong></td>
                <td>{bookingDetails.checkInDate ? bookingDetails.checkInDate.substring(0, 10) : ""}</td>
              </tr>
              <tr>
                <td><strong>Check-Out Date</strong></td>
                <td>{bookingDetails.checkOutDate ? bookingDetails.checkOutDate.substring(0, 10) : ""}</td>
              </tr>
              <tr>
                <td><strong>Check-In Time</strong></td>
                <td>{bookingDetails.checkInTime}</td>
              </tr>
              <tr>
                <td><strong>Check-Out Time</strong></td>
                <td>{bookingDetails.checkOutTime}</td>
              </tr>
              <tr>
                <td><strong>Price</strong></td>
                <td>{bookingDetails.price}</td>
              </tr>
            </table>
          </div>
              </>)
            })
          }
         
          {/* <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.cell}>Sr</th>
                  <th style={styles.cell}>Image</th>
                  <th style={styles.cell}>Hotel Name</th>
                  <th style={styles.cell}>Booking ID</th>
                  <th style={styles.cell}>Destination</th>
                  <th style={styles.cell}>Check In</th>
                  <th style={styles.cell}>Check Out</th>
                  <th style={styles.cell}>Price</th>
                  <th style={styles.cell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails
                  .filter((booking) => booking.bookingStatus === "success")
                  .map((booking,index) => (
                    <tr key={booking.bookingId}>
                      <td>{index +1}</td>
                      <td style={styles.cell}>
              <div style={styles.circularImage}>
                <img
                  className="hotelimage"
                  src={booking.hotelimage}
                  alt="Hotel"
                  style={styles.circularImageImg}
                />
              </div>
            </td>
                      <td style={styles.cell}>{booking.hotel.hotelName}</td>
                      <td style={styles.cell}>{booking.bookingId}</td>
                      <td style={styles.cell}>
                        {booking.destination ? booking.destination : "No data"}
                      </td>
                      <td style={styles.cell}>{formatDate(booking.checkInDate)}</td>
                      <td style={styles.cell}>{formatDate(booking.checkOutDate)}</td>
                      <td style={styles.cell}>{booking.price}</td>
                      <td style={{ ...styles.cell, color: "green" }}>
                        {booking.bookingStatus}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>; */}
        </>
      ) : (
        <p>No Data Found...</p>
      )}
    </>
  );
}
