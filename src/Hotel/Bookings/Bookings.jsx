import React, { useState, useEffect, useCallback } from "react";
import { MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AspectRatio from '@mui/joy/AspectRatio';
import JoyBox from '@mui/joy/Box';
import JoyButton from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import Rating from "@mui/material/Rating";
import Modals from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./bookings.module.css";
import noImage from "../../assets/noImage.jpg";
import baseURL from "../../baseURL";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { alignProperty } from "@mui/material/styles/cssUtils";
export const ConfirmBooking = ({ toast }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [value, setValue] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Confirmed");
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
      .get(`${baseURL}/get/${id}`)
      .then((res) => setUserData(res?.data?.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Error fetching user details";

        showAlert("error", errorMessage);
      });
  }, []);

  const fetchBookingDetails = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `${baseURL}/get/all/users-filtered/booking/by`,
        {
          params: {
            bookingStatus: selectedStatus,
            userId: userId,
          },
        }
      );

      const bookings = response.data;
      console.log(bookings, "backend data");
      setBookingDetails(bookings);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
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

  const handleReview = (hotelId) => {
    localStorage.setItem("hotelId_review", hotelId);
    setShowReviewForm(true);
  };

  const postReview = async () => {
    const userId = localStorage.getItem("userId");
    const hotelId = localStorage.getItem("hotelId_review");
    try {
      const response = await axios.post(`${baseURL}/reviews/${userId}/${hotelId}`, {
        comment: comment,
        rating: rating
      });
      if (response.status === 201) {
        // Optionally, you can reset the comment and rating fields after posting the review
        setComment('');
        setRating(0);
        // Close the review form
        setShowReviewForm(false);
      }
    } catch (error) {
      console.error("Error posting review:", error);
      // Handle error if needed
    }
  };


  const userId = localStorage.getItem("userId");
  if (!userId) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <img
          src="https://arkca.com/assets/img/login.gif"
          alt="Login required"
          style={{ maxWidth: "200px", maxHeight: "150px" }}
        />{" "}
        {/* Mobile-friendly image size */}
        <p style={{ marginTop: "10px" }}>
          Unauthorized
          <br />
          Please log in
        </p>{" "}
        {/* Clearer message with spacing */}
      </div>
    );
  }
  const handleCloseReview = () => {
    // Reset comment and rating fields
    setComment("");
    setRating(0);
    // Close the review form
    setShowReviewForm(false);
  };

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alertMessage && (
          <Alert severity={alertMessage.severity} onClose={handleAlertClose}>
            <AlertTitle>
              {alertMessage.severity.charAt(0).toUpperCase() +
                alertMessage.severity.slice(1)}
            </AlertTitle>
            {alertMessage.message}
          </Alert>
        )}
      </Stack>
      <div className={styles.bookingHeader}>
        <h4>Your bookings</h4>
      </div>
      <div className={styles.bookingsContainer}>
        <div className={styles.selectContainer}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.selectOption}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Failed">Failed</option>
            <option value="Checked-in">Checked In</option>
            <option value="Checked-out">Checked Out</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No-Show">No show</option>
          </select>
        </div>

        {bookingDetails && bookingDetails.length > 0 ? (
          <>
            <Modals
              open={showReviewForm}
              onClose={handleCloseReview}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "90%",
                  maxWidth: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6 id="modal-modal-title">Write about your experience</h6>
                  <CloseIcon
                    onClick={handleCloseReview}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
                <MDBInput label="Give stars" id="formControlLg" type="text" size="lg" value={comment}
                  onChange={(e) => setComment(e.target.value)} style={{ marginBottom: "10px" }} />
      
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <Button
                  variant="contained"
                  onClick={postReview}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  <SendIcon style={{ marginRight: "5px" }} />
                  Send Review
                </Button>
              </Box>
            </Modals>
          </>
        ) : (
          <p>You haven't booked any hotel</p>
        )}
         {bookingDetails && bookingDetails.map((bookingDetail) => (
      <div key={bookingDetail.bookingId}>
<JoyBox
  sx={{
    width: '100%',
    position: 'relative',
    overflow: { xs: 'auto', sm: 'initial' },
  }}
>
  <JoyBox
  
  />
  <Card
    orientation="horizontal"
    sx={{
      width: '100%',
      flexWrap: 'wrap',
      [`& > *`]: {
        '--stack-point': '500px',
        minWidth:
          'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
      },
      // make the card resizable for demo
      overflow: 'auto',
      resize: 'horizontal',
    }}
  >
   
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src={bookingDetail.images ? bookingDetail.images : noImage}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {bookingDetail.hotelName}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            <>
              <CalendarMonthIcon /> From {bookingDetail.checkInDate && bookingDetail.checkInDate.substring(0, 10)} to {bookingDetail.checkOutDate && bookingDetail.checkOutDate.substring(0, 10)}
            </>
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                ID <StickyNote2Icon /> {bookingDetail.bookingId}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                {bookingDetail.guests} <span>{bookingDetail.guests > 1 ? ' - Guests' : ' - Guest'},</span> {bookingDetail.rooms} <span>{bookingDetail.rooms > 1 ? ' - Rooms' : ' - Room'}</span>
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                <CurrencyRupeeIcon /> {bookingDetail.price}
              </Typography>
            </div>
          </Sheet>
          <JoyBox sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <button className={styles.link} onClick={() => handleShow(bookingDetail)}>
              More
            </button>
            <JoyButton onClick={() => handleReview(bookingDetail.hotelId)}>
              Review
            </JoyButton>
          </JoyBox>
        </CardContent>
      
  
  </Card>
</JoyBox></div>
        ))}
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
