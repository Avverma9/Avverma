import React, { useState, useEffect } from "react";
import { MDBTextArea } from "mdb-react-ui-kit";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Modal as BootstrapModal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Rating,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Divider,
  Pagination,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredBooking } from "../../redux/reducers/bookingSlice";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import { Unauthorized, userId } from "../../utils/Unauthorized";
import alert from "../../utils/custom_alert/custom_alert";
import baseURL from "../../utils/baseURL";
import styles from "./bookings.module.css";
import { Stack } from "@mui/system";
import { TuneRounded } from "@mui/icons-material";
import NotFoundPage from "../../utils/Not-found";
import BookingSkeleton from "./bookingSkeleton";

export const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const bookingsPerPage = 3;
  const [selectedStatus, setSelectedStatus] = useState("Confirmed");
  const { data } = useSelector((state) => state.booking);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const userId = localStorage.getItem("rsUserId");
        if (!userId) throw new Error("You are not logged in!");
        setBookingDetails([]);
        const userResponse = await axios.get(`${baseURL}/get/${userId}`);
        setUserData(userResponse.data.data);
        dispatch(fetchFilteredBooking({ selectedStatus, userId }));
      } catch (error) {
        alert(
          error.response?.data?.message ||
          error.message ||
          "Error fetching data",
        );
      } finally {
        setLoading(false); // Stop loading no matter success or failure
      }
    };

    if (location.pathname === "/bookings") fetchData();
  }, [dispatch, location.pathname, selectedStatus]);

  useEffect(() => {
    if (data) setBookingDetails(data);
  }, [data]);

  const handleShow = (value) => {
    setModalData(value);
    setShow(true);
  };

  const handleClose = () => {
    setModalData(null);
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
    const userId = localStorage.getItem("rsUserId");
    const hotelId = localStorage.getItem("hotelId_review");
    try {
      const response = await axios.post(
        `${baseURL}/reviews/${userId}/${hotelId}`,
        { comment, rating },
      );
      if (response.status === 201) {
        setComment("");
        setRating(0);
        alert("Your review has been added");
        setShowReviewForm(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error posting review");
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBooking = bookingDetails.slice(
    indexOfFirstBooking,
    indexOfLastBooking,
  );

  const totalPages = Math.ceil(bookingDetails.length / bookingsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseReview = () => {
    setComment("");
    setRating(0);
    setShowReviewForm(false);
  };

  if (!userId) {
    return <Unauthorized />;
  }
  // Calculate food total
  const foodTotal = Array.isArray(modalData?.foodDetails)
    ? modalData.foodDetails.reduce((acc, f) => acc + (Number(f.price) || 0), 0)
    : 0;

  // Calculate room total (raw)
  const rawRoomTotal = Array.isArray(modalData?.roomDetails)
    ? modalData.roomDetails.reduce((acc, r) => acc + (Number(r.price) || 0), 0)
    : 0;

  // Final total
  const finalTotal = Number(modalData?.price) || 0;

  // Adjusted room total
  const adjustedRoomTotal =
    rawRoomTotal > finalTotal - foodTotal
      ? finalTotal - foodTotal
      : rawRoomTotal;
  return (
    <div style={{ overflowY: "auto", maxWidth: "100%", marginLeft: "10px" }}>
      <div className={styles.bookingHeader}></div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
            px: 1,
          }}
        >
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: 160,
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "30px",
              px: 1.5,
              py: 0.5,
              boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover": {
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              },
            }}
          >
            <InputLabel
              id="status-select-label"
              sx={{
                fontSize: "0.85rem",
                pl: 1,
                color: "#555",
              }}
            >
              <TuneRounded sx={{ mt: 4, fontSize: 18 }} />
            </InputLabel>

            <Select
              labelId="status-select-label"
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              label="Filter"
              sx={{
                fontSize: "0.9rem",
                pl: 3.5,
              }}
            >
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Checked-in">Checked In</MenuItem>
              <MenuItem value="Checked-out">Checked Out</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="No-show">No Show</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <BookingSkeleton />
        ) : currentBooking.length > 0 ? (
          <>
            <BootstrapModal
              show={showReviewForm}
              onHide={handleCloseReview}
              centered
              size="lg"
            >
              <Box
                sx={{
                  position: "relative",
                  p: 2,
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Write about your experience</Typography>
                  <CloseIcon
                    onClick={handleCloseReview}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
                <MDBTextArea
                  label="Comment"
                  id="formControlLg"
                  size="lg"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
                <Button
                  variant="contained"
                  onClick={postReview}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  <SendIcon style={{ marginRight: "5px" }} /> Send Review
                </Button>
              </Box>
            </BootstrapModal>

            <div className={styles.bookingsContainer}>
              {currentBooking.map((bookingDetail) => (
                <Paper
                  key={bookingDetail.bookingId}
                  sx={{
                    width: "100%",
                    mb: 2,
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "transparent",
                    }}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {bookingDetail?.hotelDetails?.hotelName}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarMonthIcon fontSize="small" />
                          {formatDateWithOrdinal(bookingDetail.checkInDate)} —{" "}
                          {formatDateWithOrdinal(bookingDetail.checkOutDate)}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <StickyNote2Icon fontSize="small" />
                          Booking ID: {bookingDetail.bookingId}
                        </Typography>

                        <Typography variant="body2">
                          {bookingDetail.guests}{" "}
                          {bookingDetail.guests > 1 ? "Guests" : "Guest"} |{" "}
                          {bookingDetail.rooms}{" "}
                          {bookingDetail.rooms > 1 ? "Rooms" : "Room"}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CurrencyRupeeIcon fontSize="small" />
                          {bookingDetail.price}
                        </Typography>

                        <Divider sx={{ my: 1 }} />

                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            fullWidth
                            variant="outlined"
                            onClick={() => handleShow(bookingDetail)}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            fullWidth
                            variant="contained"
                            onClick={() => handleReview(bookingDetail.hotelId)}
                          >
                            Review
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Paper>
              ))}
            </div>
          </>
        ) : (
          // This is the fallback when there are no bookings
          setTimeout(()=>{
              <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            You have no current bookings.
          </Typography>
          },0)
        
        )}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          sx={{ marginTop: 8 }}
        />
      </div>

      <BootstrapModal show={show} onHide={handleClose} centered size="lg">
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <button
              onClick={handlePrint}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Print
            </button>

            <button onClick={handleClose} className={styles.closeBtn}>
              <AiOutlineClose />
            </button>
          </div>

          <div className={styles.modalBody}>
            {/* Booking Summary */}
            <section className={styles.section}>
              <h5>Booking Summary</h5>
              <div className={styles.grid}>
                <div>
                  <label>Booking ID</label>
                  <p>{modalData?.bookingId}</p>
                </div>
                <div>
                  <label>Booked By</label>
                  <p>{modalData?.user?.name}</p>
                </div>
                <div>
                  <label>Booking Date</label>
                  <p>{moment(modalData?.createdAt).format("Do MMM YYYY")}</p>
                </div>
                <div>
                  <label>Status</label>
                  <p>{modalData?.bookingStatus}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h5>Hotel Info</h5>
              <div className={styles.grid}>
                <div>
                  <label>Hotel</label>
                  <p>{modalData?.hotelDetails?.hotelName}</p>
                </div>
                <div>
                  <label>Location</label>
                  <p>{modalData?.destination}</p>
                </div>
              </div>
            </section>

            {/* Room Info */}
            <section className={styles.section}>
              <h5>Room Details</h5>
              {modalData?.roomDetails?.map((room, index) => (
                <div key={index} className={styles.grid}>
                  <div>
                    <label>Room Type</label>
                    <p>{room?.type}</p>
                  </div>
                  <div>
                    <label>Bed Type</label>
                    <p>{room?.bedTypes}</p>
                  </div>
                  <div>
                    <label>Room Price</label>
                    <p>₹{room?.price}</p>
                  </div>



                </div>
              ))}
            </section>


            {/* Food Details */}
            {modalData?.foodDetails?.length > 0 && (
              <>
                <section className={styles.section}>
                  <h5>Food Ordered</h5>
                  {modalData?.foodDetails?.map((food, index) => (
                    <div key={index} className={styles.grid}>
                      <div>
                        <label>Food</label>
                        <p>{food?.type ? food?.type : "Breakfast"}</p>
                      </div>
                      <div>
                        <label>Price</label>
                        <p>₹{food.price}</p>
                      </div>
                    </div>
                  ))}
                </section>
              </>
            )}

            {/* Guest Info */}
            <section className={styles.section}>
              <h5>Guest Info</h5>
              <div className={styles.grid}>
                <div>
                  <label>Name</label>
                  <p>{modalData?.user?.name}</p>
                </div>
                <div>
                  <label>Mobile</label>
                  <p>{modalData?.user?.mobile}</p>
                </div>
                <div>
                  <label>Guests</label>
                  <p>{modalData?.guests}</p>
                </div>
                <div>
                  <label>Rooms</label>
                  <p>{modalData?.numRooms}</p>
                </div>
              </div>
              <div className={styles.grid}>
                <div>
                  <label>Check-In</label>
                  <p>{modalData?.checkInDate}</p>
                </div>
                <div>
                  <label>Check-Out</label>
                  <p>{modalData?.checkOutDate}</p>
                </div>
              </div>
            </section>

            {/* Price Summary */}
            <section className={styles.section}>
              <h5>Price Summary</h5>
              <div className={styles.grid}>
                {/* Room Total */}
                <div>
                  <label>Room Total</label>
                  <p>
                    ₹
                    {(() => {
                      const checkIn = new Date(modalData?.checkInDate);
                      const checkOut = new Date(modalData?.checkOutDate);

                      const timeDiff = checkOut.getTime() - checkIn.getTime();
                      const dayDiff = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Ensure at least 1 day

                      const total = modalData?.roomDetails?.reduce((acc, room) => {
                        const pricePerDay = Number(room?.price) || 0;
                        return acc + pricePerDay * dayDiff;
                      }, 0);

                      return total;
                    })()}
                  </p>
                </div>


                {/* Food Total */}
                <div>
                  <label>Food Total</label>
                  <p>
                    ₹
                    {(() => {
                      return modalData?.foodDetails?.reduce((acc, food) => {
                        const price = Number(food.price) || 0;
                        const quantity = Number(food.quantity) || 1;
                        return acc + price * quantity;
                      }, 0);
                    })()}
                  </p>
                </div>

                {/* GST */}
                <div>
                  <label>GST ({modalData?.gstPrice || 0}%)</label>
                  <p>
                    ₹
                    {(() => {
                      const roomTotal = modalData?.roomDetails?.reduce(
                        (acc, room) => acc + (Number(room?.price) || 0),
                        0
                      );
                      const foodTotal = modalData?.foodDetails?.reduce((acc, food) => {
                        const price = Number(food.price) || 0;
                        const quantity = Number(food.quantity) || 1;
                        return acc + price * quantity;
                      }, 0);
                      const gst = ((roomTotal + foodTotal) * (Number(modalData?.gstPrice) || 0)) / 100;
                      return gst.toFixed(2); // keep decimal precision
                    })()}
                  </p>
                </div>

                {/* Discount */}
                <div>
                  <label>Discount</label>
                  <p>
                    {Number(modalData?.discountPrice) > 0
                      ? `- ₹${modalData?.discountPrice}`
                      : "No Discount"}
                  </p>
                </div>

                {/* Final Total */}
                <div className={styles.totalWrap}>
                  <label className={styles.totalLabel}>Final Total</label>
                  <p className={styles.total}>
                    ₹
                    {/* {(() => {
                      const roomTotal = modalData?.roomDetails?.reduce(
                        (acc, room) => acc + (Number(room?.price) || 0),
                        0
                      );
                      const foodTotal = modalData?.foodDetails?.reduce((acc, food) => {
                        const price = Number(food.price) || 0;
                        const quantity = Number(food.quantity) || 1;
                        return acc + price * quantity;
                      }, 0);
                      const gst = ((roomTotal + foodTotal) * (Number(modalData?.gstPrice) || 0)) / 100;
                      const discount = Number(modalData?.discountPrice) || 0;

                      return Math.round(roomTotal + foodTotal + gst - discount);
                    })()} */}

                    {modalData?.price}
                  </p>
                </div>
                {modalData?.isPartialBooking && (
                  <>
                    <div>
                      <label>Partial Booking</label>
                      {modalData.isPartialBooking ? <p>Yes</p> : <p>No</p>}
                    </div>
                    <div>
                      <label
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "1px solid darkred",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "inline-block"
                        }}
                      >
                        Partially Paid Amount
                      </label>

                      {modalData?.partialAmount ? (
                        <p>₹{modalData.partialAmount}</p>
                      ) : (
                        <p>₹0</p>
                      )}
                    </div>
                  </>
                )}

              </div>
            </section>
          </div>
        </div>
      </BootstrapModal>
    </div>
  );
};
