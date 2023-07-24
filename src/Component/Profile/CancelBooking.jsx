import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const CancelBooking = ({ toast }) => {
  const [bookingId, setBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canceledBookings, setCanceledBookings] = useState([]);

  const handleConfirmCancel = () => {
    if (canceledBookings.some((booking) => booking.bookingId === bookingId)) {
      toast.error("This booking has already been canceled.");
    } else {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    axios
      .put(`https://hotel-backend-tge7.onrender.com/booking/${bookingId}`)
      .then((res) => {
        console.log(res.data);
        setShowModal(false);
        toast.success("Booking cancellation successful");
        fetchCanceledBookings();
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
        toast.error("Failed to cancel booking. Please check the booking ID.");
      });
  };

  // const fetchCanceledBookings = () => {
  //   axios
  //     .get("https://hotel-backend-tge7.onrender.com/booking/getCancelledBooking")
  //     .then((res) => {
  //       console.log(res.data, "CancelledData");
  //       setCanceledBookings(res.data.canceledBookings);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Failed to fetch canceled bookings.");
  //     });
  // };

  const fetchCanceledBookings = useCallback(() => {
    axios
      .get(
        "https://hotel-backend-tge7.onrender.com/booking/getCancelledBooking"
      )
      .then((res) => {
        console.log(res.data, "CancelledData");
        setCanceledBookings(res.data.canceledBookings);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch canceled bookings.");
      });
  }, [toast]);

  useEffect(() => {
    fetchCanceledBookings();
  }, [fetchCanceledBookings]);

  return (
    <>
      <div className="_title">
        <h1>Cancel Booking</h1>
      </div>

      <div className="_fields_col">
        <input type="text" onChange={(e) => setBookingId(e.target.value)} />
        <span>Provide the exact same booking ID from the database</span>
      </div>

      <button className="profile_body_button" onClick={handleConfirmCancel}>
        Confirm Cancel
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel the booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {canceledBookings.length > 0 && (
        <>
          <div className="_title">
            <h1>Canceled Booking History</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Hotel Image</th>
                <th>Booking ID</th>
                <th>Hotel Name</th>
                <th>Destination</th>
                {/* <th>Check-In Date</th>
                <th>Check-Out Date</th> */}
                <th>Cancelled at</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {canceledBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <img
                      className="hotelimage"
                      src={booking.images}
                      alt="Hotel"
                    />
                  </td>
                  <td>{booking.bookingId}</td>
                  <td>{booking.hotelName}</td>
                  <td>{booking.destination}</td>
                  {/* <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td> */}
                  <td>{new Date(booking.cancelledAt).toLocaleDateString()}</td>
                  <td style={{ color: "red" }}>{booking.bookingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
