import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

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

  const fetchCanceledBookings = useCallback(() => {
    axios
      .get(
        "https://hotel-backend-tge7.onrender.com/booking/getCancelledBooking"
      )
      .then((res) => {
        console.log(res.data, "CancelledData");
        setCanceledBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch canceled bookings.");
      });
  }, [toast]);

  // const fetchCanceledBookings = useCallback(() => {
  //   const id = localStorage.getItem("userId")
  //   console.log(id, "myId")
  //   axios
  //     .get(
  //       `http://localhost:5000/booking/getCancelledBooking/${id}`
  //     )
  //     .then((res) => {
  //       console.log(res.data, "CancelledData");
  //       setCanceledBookings(res.data.canceledBookings);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Failed to fetch canceled bookings.");
  //     });
  // }, [toast]);

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

      {/* {0 > 0 && ( */}
      <>
        <div className="_title">
          <h1>Canceled Booking History</h1>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.cell}>Sr</th>
                <th style={styles.cell}>Hotel Image</th>
                <th style={styles.cell}>Booking ID</th>
                <th style={styles.cell}>Hotel Name</th>
                <th style={styles.cell}>Destination</th>
                <th style={styles.cell}>Cancelled at</th>
                <th style={styles.cell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {canceledBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td style={styles.cell}>{index + 1}</td>
                  <td style={styles.cell}>
                    <div style={styles.circularImage}>
                      <img
                        className="hotelimage"
                        src={booking.images}
                        alt="Hotel"
                        style={styles.circularImageImg}
                      />
                    </div>
                  </td>
                  <td style={styles.cell}>{booking.bookingId}</td>
                  <td style={styles.cell}>{booking.hotelName}</td>
                  <td style={styles.cell}>{booking.destination}</td>
                  {/* <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
          <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td> */}
                  <td style={styles.cell}>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ ...styles.cell, color: "red" }}>
                    {booking.bookingStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
      {/* )} */}
    </>
  );
};
