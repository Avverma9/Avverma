import axios from "axios";
import { useEffect, useState } from "react";

export const FailedBooking = () => {
  const [failedBookings, setFailedBookings] = useState([]);

  const fetchFailedBookings = async () => {
    try {
      const response = await axios.get("https://hotel-backend-tge7.onrender.com/bookingFailed");

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
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Email</th>
              <th>Hotel Name</th>
              <th>Price</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {failedBookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.user.email}</td>
                <td>{booking.hotel.hotelName}</td>
                <td>{booking.price}</td>
                <td>{formatDate(booking.checkInDate)}</td>
                <td>{formatDate(booking.checkOutDate)}</td>
                <td style={{ color: "red" }}>{booking.bookingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="sub_Title">Booking failed. Please try again later</div>
      )}
    </>
  );
};
