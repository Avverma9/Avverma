import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { useLocation } from "react-router-dom";
import styles from "./bookings.module.css";
import noImage from "../../assets/noImage.jpg";

export const ConfirmBooking = ({ toast }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("success");
  const [alertMessage, setAlertMessage] = useState(null);

  const handleClose = () => {
    setModalData([]);
    setShow(false);
  };

  const handleShow = (value) => {
    setModalData(value);
    setShow(true);
  };

  const handlePrint = () => {
    // Create a link element for the print stylesheet
    const printStylesheet = document.createElement("link");
    printStylesheet.rel = "stylesheet";
    printStylesheet.type = "text/css";
    printStylesheet.href = "path-to-your-print-stylesheet.css";

    // Append the link element to the head of the document
    document.head.appendChild(printStylesheet);

    // Trigger the print window
    window.print();

    // Remove the link element after printing
    document.head.removeChild(printStylesheet);
  };

  const showAlert = (severity, message) => {
    setAlertMessage({ severity, message });
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    axios
      .get(`https://hotel-backend-tge7.onrender.com/get/${id}`)
      .then((res) => setUserData(res?.data?.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.message
            ? error.response.data.message
            : "Error fetching user details";
        
        showAlert("error", errorMessage);
      });
  }, []);

  const fetchBookingDetails = useCallback(async () => {
    const user = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `https://hotel-backend-tge7.onrender.com/get/all/filtered/booking/by/${user}`,
        {
          params: {
            bookingStatus: selectedStatus,
          },
        }
      );

      const bookings = response.data;
      console.log(bookings, "backend data");
      setBookingDetails(bookings);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      const errorMessage =
        error.response &&
        error.response.data &&
        error.response.data.message
          ? error.response.data.message
          : "Error fetching booking details";
      
      showAlert("error", errorMessage);
    }
  }, [selectedStatus, setBookingDetails]);

  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails, selectedStatus]);

  if (location.pathname !== "/bookings") {
    return null;
  }

  return (
    <>
        <Stack sx={{ width: '100%' }} spacing={2}>
        {alertMessage && (
          <Alert severity={alertMessage.severity} onClose={handleAlertClose}>
            <AlertTitle>{alertMessage.severity.charAt(0).toUpperCase() + alertMessage.severity.slice(1)}</AlertTitle>
            {alertMessage.message}
          </Alert>
        )}
      </Stack>
      <div className={styles.bookingHeader}>
        <h2>Booking History</h2>
      </div>
      <div className={styles.bookingsContainer}>
      <div className={styles.selectContainer}>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className={styles.selectOption}
        >
          <option value="success">Confirmed</option>
          <option value="failed">Failed</option>
          <option value="checkedIn">Checked In</option>
          <option value="checkedOut">Checked Out</option>
          <option value="cancelled">Cancelled</option>
          <option value="noshow">No show</option>
        </select>
      </div>

      {bookingDetails && bookingDetails.length > 0 ? (
        <>
          {bookingDetails.map((bookingDetails) => {
            return (
              <div
                key={bookingDetails.bookingId}
                className={`${styles.bookingDetails} ${styles.pageBreak}`}
              >
                <img
                  src={
                    bookingDetails &&
                    bookingDetails?.images &&
                    bookingDetails?.images
                      ? bookingDetails.images
                      : noImage
                  }
                  alt=""
                />

                <div className={styles.bookingRowOne}>
                  <h5>{bookingDetails?.hotelName}</h5>
                  {bookingDetails?.checkInDate &&
                    bookingDetails?.checkOutDate && (
                      <h6>
                        <>
                        From  {bookingDetails?.checkInDate &&
                            bookingDetails?.checkInDate.substring(0, 10)}
                          {"  "}
                        </>
                        {"  "}
                        to
                        {"  "}
                        <>
                          {"  "}
                          {bookingDetails?.checkOutDate &&
                            bookingDetails?.checkOutDate.substring(0, 10)}
                        </>
                      </h6>
                    )}
                 
                </div>
                <div className={styles.bookingRowOne}>
                  <h6>{bookingDetails?.bookingId}</h6>
                  {bookingDetails?.guests && bookingDetails?.rooms && (
                    <h6>
                      <>
                        {bookingDetails?.guests}{" "}
                        <span>
                          {bookingDetails?.guests > 1
                            ? " - Guests"
                            : " - Guest"}{" "}
                          ,
                        </span>
                      </>

                      <>
                        {bookingDetails?.rooms}
                        <span>
                          {bookingDetails?.rooms > 1 ? " - Rooms" : " - Room"}
                        </span>
                      </>
                    </h6>
                  )}
                </div>
                <div className={styles.bookingRowTwo}>
                  <h6>{bookingDetails?.price}</h6>
                  <button
                    className={styles.link}
                    onClick={() => handleShow(bookingDetails)}
                  >
                    More
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p>No Data Found...</p>
      )}
</div>
      <Modal show={show} onHide={handleClose} centered size="xl">
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <button onClick={handlePrint} className={styles.print}>
              <span>Print</span>
            </button>
            <button onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.body}>
              <div>
                <h4>Booking Id</h4>
                <p>{modalData?.bookingId}</p>
              </div>
              {userData && userData?.name && (
                <p>
                  Booked by {userData?.name} on{" "}
                  <span>
                    {modalData &&
                    modalData?.createdAt &&
                    moment(modalData?.createdAt).isoWeekday() === 1
                      ? "Mon"
                      : moment(modalData?.createdAt).isoWeekday() === 2
                      ? "Tue"
                      : moment(modalData?.createdAt).isoWeekday() === 3
                      ? "Wed"
                      : moment(modalData?.createdAt).isoWeekday() === 4
                      ? "Thu"
                      : moment(modalData?.createdAt).isoWeekday() === 5
                      ? "Fri"
                      : moment(modalData?.createdAt).isoWeekday() === 6
                      ? "Sat"
                      : "Sun"}
                  </span>
                  {", "}
                  <span>
                    {modalData &&
                      modalData?.createdAt &&
                      moment(
                        modalData?.createdAt.substring(0, 10).replace(/-/g, "")
                      ).format("Do MMMM YYYY")}
                  </span>
                </p>
              )}
            </div>
            <div className={styles.borderBottom} />
            <div className={styles.body}>
              <div>
                <h6>
                  Hotel Name: <span>{modalData?.hotelName}</span>
                </h6>
                <h6>
                  Booking Status: <span>{modalData?.bookingStatus}</span>
                </h6>
                <h6>
                  Price: <span>{modalData?.price}</span>
                </h6>
              </div>
              <img
                src={
                  modalData && modalData?.images && modalData?.images
                    ? modalData.images
                    : noImage
                }
                alt=""
              />
            </div>
            <div className={styles.borderBottom} />
            <div className={styles.body}>
              <div>
                <span>Primary Guest</span>
                <h6>{userData?.name}</h6>
                <span>Mobile Number</span>
                <h6>{userData?.mobile}</h6>
                <span>Email</span>
                <h6>{userData?.email}</h6>
              </div>
              {modalData &&
                modalData?.checkInDate &&
                modalData?.checkOutDate && (
                  <div>
                    <span>Check In</span>
                    <h6>
                      {modalData &&
                        modalData?.checkInDate &&
                        modalData?.checkInDate.substring(0, 10)}
                    </h6>
                    <span>Check Out</span>
                    <h6>
                      {modalData &&
                        modalData?.checkOutDate &&
                        modalData?.checkOutDate.substring(0, 10)}
                    </h6>
                  </div>
                )}
              {modalData && modalData?.rooms && modalData?.guests && (
                <div>
                  <span>Rooms</span>
                  <h6>{modalData?.rooms}</h6>
                  <span>Guests</span>
                  <h6>{modalData?.guests}</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
