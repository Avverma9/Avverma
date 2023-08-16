import axios from "axios";
import { useEffect, useState } from "react";


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

export const FailedBooking = () => {
  const [failedBookings, setFailedBookings] = useState([]);

  const fetchFailedBookings = async () => {
    const id = localStorage.getItem("userId")
    try {
      const response = await axios.get(`https://hotel-backend-tge7.onrender.com/bookingFailed/${id}`);

      if (response.data.success) {
        setFailedBookings(response.data.bookings);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFailedBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
     <div className="_title">
  <h1>Failed Booking</h1>
</div>
{failedBookings.length > 0 ? (
  <div style={styles.tableContainer}>
    <table style={styles.table}>
      <thead>
        <tr>
        <th style={styles.cell}>Sr</th>
          <th style={styles.cell}>Booking ID</th>
          <th style={styles.cell}>User Email</th>
          <th style={styles.cell}>Hotel Name</th>
          <th style={styles.cell}>Price</th>
          <th style={styles.cell}>Check-in Date</th>
          <th style={styles.cell}>Check-out Date</th>
          <th style={styles.cell}>Status</th>
        </tr>
      </thead>
      <tbody>
        {failedBookings.map((booking,index) => (
          <tr key={booking.bookingId}>
             <td style={styles.cell}>{index+1}</td>
             <td style={styles.cell}>{booking.bookingId}</td>
            <td style={styles.cell}>{booking.user.email}</td>
            <td style={styles.cell}>{booking.hotel.hotelName}</td>
            <td style={styles.cell}>{booking.price}</td>
            <td style={styles.cell}>{formatDate(booking.checkInDate)}</td>
            <td style={styles.cell}>{formatDate(booking.checkOutDate)}</td>
            <td style={{ ...styles.cell, color: "red" }}>
              {booking.bookingStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className="sub_Title">No Data Found</div>
)}
    </>
  );
};
