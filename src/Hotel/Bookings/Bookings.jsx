import React, { useState, useEffect, useCallback } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import JoyBox from "@mui/joy/Box";
import JoyButton from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Rating from "@mui/material/Rating";
import Modals from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { useLocation } from "react-router-dom";
import styles from "./bookings.module.css";
import noImage from "../../assets/noImage.jpg";
import { toast } from "react-toastify";
import baseURL from "../../baseURL";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredBooking } from "../../redux/bookingSlice";
import { formatDate, formatDateWithOrdinal } from "../../utils/_dateFunctions";

export const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Confirmed");
  const { data, loading, error } = useSelector((state) => state.booking);
  // Fetch user data and booking details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("You are not logged in!");
        }

        // Fetch user data
        const userResponse = await axios.get(`${baseURL}/get/${userId}`);
        setUserData(userResponse.data.data);

        // Fetch booking details using the fetchFilteredBooking thunk
        dispatch(fetchFilteredBooking({ selectedStatus, userId }));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error fetching data";
        toast.error(errorMessage);
      }
    };

    if (location.pathname === "/bookings") {
      fetchData();
    }
  }, [dispatch, location.pathname, selectedStatus]);
  useEffect(() => {
    if (data) {
      setBookingDetails(data);
    }
  }, [data]);
  if (location.pathname !== "/bookings") {
    return null;
  }
  // console.log("redux data ", fetchFilteredBooking);

  if (!userData) {
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
        />
        <p style={{ marginTop: "10px" }}>
          Unauthorized
          <br />
          Please log in
        </p>
      </div>
    );
  }

  const handleShow = (value) => {
    setModalData(value);
    setShow(true);
  };

  const handleClose = () => {
    setModalData([]);
    setShow(false);
  };

  const handlePrint = () => {
    const printStylesheet = document.createElement("link");
    printStylesheet.rel = "stylesheet";
    printStylesheet.type = "text/css";
    printStylesheet.href = "path-to-your-print-stylesheet.css";

    document.head.appendChild(printStylesheet);
    window.print();
    document.head.removeChild(printStylesheet);
  };

  const handleReview = (hotelId) => {
    localStorage.setItem("hotelId_review", hotelId);
    setShowReviewForm(true);
  };

  const postReview = async () => {
    const userId = localStorage.getItem("userId");
    const hotelId = localStorage.getItem("hotelId_review");
    try {
      const response = await axios.post(
        `${baseURL}/reviews/${userId}/${hotelId}`,
        { comment, rating }
      );
      if (response.status === 201) {
        setComment("");
        setRating(0);
        toast.success("Your review has been added");
        setShowReviewForm(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error posting review";
      toast.error(errorMessage);
    }
  };

  const handleCloseReview = () => {
    setComment("");
    setRating(0);
    setShowReviewForm(false);
  };

  return (
    <>
      <div className={styles.bookingHeader}>
        <h4>Your bookings</h4>
      </div>
      <div className={styles.bookingsContainer}>
        <div className={styles.selectContainer}>
          <FormControl
            variant="outlined"
            style={{ marginLeft: "12px", marginBottom: "10px" }}
          >
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              label="Status"
              className={styles.selectOption}
            >
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Checked-in">Checked In</MenuItem>
              <MenuItem value="Checked-out">Checked Out</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="No-Show">No show</MenuItem>
            </Select>
          </FormControl>
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
                <MDBInput
                  label="Give stars"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />

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
        {bookingDetails &&
          bookingDetails.map((bookingDetail) => (
            <div key={bookingDetail.bookingId}>
              <JoyBox
                sx={{
                  width: "100%",
                  position: "relative",
                  overflow: { xs: "auto", sm: "initial" },
                }}
              >
                <JoyBox />
                <Card
                  orientation="horizontal"
                  sx={{
                    width: "100%",
                    flexWrap: "wrap",
                    [`& > *`]: {
                      "--stack-point": "500px",
                      minWidth:
                        "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                    },
                    // make the card resizable for demo
                    overflow: "auto",
                    resize: "horizontal",
                  }}
                >
                  {" "}
                  <AspectRatio
                    flex
                    ratio="1"
                    maxHeight={182}
                    sx={{ minWidth: 182 }}
                  >
                    <img
                      src={
                        bookingDetails?.user?.profile[0]
                          ? bookingDetails?.images
                          : noImage
                      }
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent>
                    <Typography fontSize="xl" fontWeight="lg">
                      {bookingDetail.hotelName}
                    </Typography>
                    <Typography
                      level="body-sm"
                      fontWeight="lg"
                      textColor="text.tertiary"
                    >
                      <>
                        <CalendarMonthIcon /> From{" "}
                        {formatDateWithOrdinal(bookingDetail.checkInDate)} to {" "}
                        {formatDateWithOrdinal(bookingDetail.checkOutDate)}
                      </>
                    </Typography>
                    <Sheet
                      sx={{
                        bgcolor: "background.level1",
                        borderRadius: "sm",
                        p: 1.5,
                        my: 1.5,
                        display: "flex",
                        gap: 2,
                        "& > div": { flex: 1 },
                      }}
                    >
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          ID <StickyNote2Icon /> {bookingDetail.bookingId}
                        </Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          {bookingDetail.guests}{" "}
                          <span>
                            {bookingDetail.guests > 1
                              ? " - Guests"
                              : " - Guest"}
                            ,
                          </span>{" "}
                          {bookingDetail.rooms}{" "}
                          <span>
                            {bookingDetail.rooms > 1 ? " - Rooms" : " - Room"}
                          </span>
                        </Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          <CurrencyRupeeIcon /> {bookingDetail.price}
                        </Typography>
                      </div>
                    </Sheet>
                    <JoyBox
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        "& > button": { flex: 1 },
                      }}
                    >
                      <button
                        className={styles.link}
                        onClick={() => handleShow(bookingDetail)}
                      >
                        More
                      </button>
                      <JoyButton
                        onClick={() => handleReview(bookingDetail.hotelId)}
                      >
                        Review
                      </JoyButton>
                    </JoyBox>
                  </CardContent>
                </Card>
              </JoyBox>
            </div>
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
