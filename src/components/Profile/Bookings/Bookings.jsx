import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredBooking } from "../../../redux/reducers/bookingSlice";
import { formatDateWithOrdinal } from "../../../utils/_dateFunctions";
import { Unauthorized, userId } from "../../../utils/Unauthorized";
import baseURL from "../../../utils/baseURL";
import { useLoader } from "../../../utils/loader";
import { toast } from "react-toastify";
import BookingSkeleton from "./bookingSkeleton";
import NotFoundPage from "../../../utils/Not-found";

import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Pagination,
  Grid,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  TextField,
  Paper,
} from "@mui/material";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 600, md: 800 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const paperCardStyle = {
  p: 0,
  borderRadius: 4,
  boxShadow: 3,
  mb: 3,
  overflow: "hidden",
  maxWidth: 720,
  width: "100%",
  mx: "auto"
};

const bookingHeaderStyle = {
  backgroundColor: "#e53e3e",
  color: "white",
  py: 2,
  px: 3,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
};

const sectionTitleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "text.primary",
  mb: 2,
  pb: 1,
};

const detailItemStyle = {
  mb: 2,
  "& .MuiTypography-body2": {
    color: "text.secondary",
    fontSize: "0.85rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  "& .MuiTypography-h6": {
    fontSize: "1rem",
    fontWeight: "regular",
    color: "text.primary",
  },
};

const PriceDetail = ({ label, value, isTotal = false }) => (
  <Box sx={detailItemStyle}>
    <Typography variant="body2">{label}</Typography>
    <Typography variant="h6" color={isTotal ? "primary.main" : "text.primary"}>
      ₹{value}
    </Typography>
  </Box>
);

const BookingModal = ({ show, handleClose, modalData }) => {
  const handlePrint = () => window.print();

  const calculateTotal = (items, key) => (items || []).reduce((acc, item) => acc + (Number(item[key]) || 0), 0);
  const roomTotal = calculateTotal(modalData?.roomDetails, "price") * (Number(modalData?.numRooms) || 1);
  const foodTotal = calculateTotal(modalData?.foodDetails, "price");
  const gstAmount = (roomTotal * (Number(modalData?.gstPrice) || 0)) / 100;
  const discountAmount = Number(modalData?.discountPrice) || 0;
  const partialAmount = Number(modalData?.partialAmount) || 0;

  return (
    <Modal open={show} onClose={handleClose}>
      <Paper sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" color="primary">
            Booking Details
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={handlePrint} variant="outlined" size="small">
              Print
            </Button>
            <Button onClick={handleClose} variant="text" color="inherit" sx={{ minWidth: "auto", p: 0 }}>
              <CloseIcon />
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ maxHeight: "70vh", overflowY: "auto", pr: 2 }}>
          {/* Booking Summary */}
          <Box mb={4}>
            <Typography variant="h6" sx={sectionTitleStyle}>Booking Summary</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2">Booking ID</Typography>
                <Typography variant="h6">{modalData?.bookingId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2">Booked By</Typography>
                <Typography variant="h6">{modalData?.user?.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2">Booking Date</Typography>
                <Typography variant="h6">{moment(modalData?.createdAt).format("Do MMM YYYY")}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2">Status</Typography>
                <Typography variant="h6">{modalData?.bookingStatus}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Hotel Info */}
          <Box mb={4}>
            <Typography variant="h6" sx={sectionTitleStyle}>Hotel Information</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Hotel</Typography>
                <Typography variant="h6">{modalData?.hotelDetails?.hotelName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Location</Typography>
                <Typography variant="h6">{modalData?.destination}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Room Details */}
          {modalData?.roomDetails?.length > 0 && (
            <Box mb={4}>
              <Typography variant="h6" sx={sectionTitleStyle}>Room Details</Typography>
              {(modalData.roomDetails || []).map((room, index) => (
                <Grid container spacing={4} key={index} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Room Type</Typography>
                    <Typography variant="h6">{room?.type}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Bed Type</Typography>
                    <Typography variant="h6">{room?.bedTypes}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Price</Typography>
                    <Typography variant="h6">₹{room?.price}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}
          <Divider sx={{ my: 2 }} />

          {/* Price Summary */}
          <Box>
            <Typography variant="h6" sx={sectionTitleStyle}>Price Summary</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <PriceDetail label="Room Total" value={roomTotal.toFixed(2)} />
                <PriceDetail label="Food Total" value={foodTotal.toFixed(2)} />
                <PriceDetail label={`GST (${modalData?.gstPrice || 0}%)`} value={gstAmount.toFixed(2)} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <PriceDetail label="Discount" value={discountAmount > 0 ? `- ₹${discountAmount}` : "No Discount"} />
                {modalData?.isPartialBooking && (
                  <PriceDetail label="Partially Paid" value={partialAmount.toFixed(2)} />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <PriceDetail label="Final Total" value={modalData?.price || 0} isTotal={true} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

const ReviewModal = ({ show, handleClose, handlePostReview, comment, setComment, rating, setRating }) => (
  <Modal open={show} onClose={handleClose}>
    <Paper sx={modalStyle}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" color="primary">Write a Review</Typography>
        <Button onClick={handleClose} variant="text" color="inherit" sx={{ minWidth: "auto", p: 0 }}>
          <CloseIcon />
        </Button>
      </Stack>
      <TextField
        label="Comment"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography component="legend" mr={1}>Rating:</Typography>
        <Rating name="simple-controlled" value={rating} onChange={(event, newValue) => setRating(newValue)} />
      </Box>
      <Button variant="contained" onClick={handlePostReview} fullWidth startIcon={<SendIcon />}>
        Send Review
      </Button>
    </Paper>
  </Modal>
);

const BookingCard = ({ bookingDetail, onShowDetails, onReview }) => (
  <Paper sx={paperCardStyle}>
    <Box sx={bookingHeaderStyle}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">My Bookings</Typography>
        <Typography variant="body2">{moment(bookingDetail?.createdAt).format("MMMM DD, YYYY")}</Typography>
      </Stack>
    </Box>

    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={1}>{bookingDetail?.hotelDetails?.hotelName}</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarMonthIcon color="action" />
            <Typography variant="body1" fontWeight="bold">{formatDateWithOrdinal(bookingDetail.checkInDate)}</Typography>
            <Typography variant="body2" color="text.secondary">-</Typography>
            <Typography variant="body1" fontWeight="bold">{formatDateWithOrdinal(bookingDetail.checkOutDate)}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <StickyNote2Icon color="action" />
            <Typography variant="body2" color="text.secondary">Booking ID:</Typography>
            <Typography variant="body1" fontWeight="bold">{bookingDetail.bookingId}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase">Guests</Typography>
          <Typography variant="body1" fontWeight="bold">{bookingDetail.guests} {bookingDetail.guests > 1 ? "Adults" : "Adult"}</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase">Rooms</Typography>
          <Typography variant="body1" fontWeight="bold">{bookingDetail.numRooms}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, color: "success.main" }}>
          <CurrencyRupeeIcon /> {bookingDetail.price}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => onShowDetails(bookingDetail)}>
            View Details
          </Button>
          <Button size="small" variant="contained" onClick={() => onReview(bookingDetail?.hotelDetails?.hotelId)}>
            Review
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Paper>
);

export const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const location = useLocation();
  const bookingsPerPage = 3;
  const [selectedStatus, setSelectedStatus] = useState("Confirmed");
  const { data, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();
        const userId = localStorage.getItem("rsUserId");
        if (!userId) throw new Error("You are not logged in!");
        setBookingDetails([]);
        dispatch(fetchFilteredBooking({ selectedStatus, userId }));
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    };
    if (location.pathname === "/bookings") fetchData();
  }, [dispatch, location.pathname, selectedStatus, showLoader, hideLoader]);

  useEffect(() => {
    if (data) setBookingDetails(data);
  }, [data]);

  const handleShowDetails = (value) => {
    setModalData(value);
    setShowModal(true);
  };

  const handleCloseDetails = () => {
    setModalData(null);
    setShowModal(false);
  };

  const handleReview = (hotelId) => {
    localStorage.setItem("hotelId_review", hotelId);
    setShowReviewForm(true);
  };

  const handleCloseReview = () => {
    setComment("");
    setRating(0);
    setShowReviewForm(false);
  };

  const postReview = async () => {
    const userId = localStorage.getItem("rsUserId");
    const hotelId = localStorage.getItem("hotelId_review");
    try {
      const response = await axios.post(`${baseURL}/reviews/${userId}/${hotelId}`, { comment, rating });
      if (response.status === 201) {
        setComment("");
        setRating(0);
        toast.info("Your review has been added");
        setShowReviewForm(false);
      }
    } catch (error) {
      toast.info(error.response?.data?.message || "Error posting review");
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingDetails.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookingDetails.length / bookingsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!userId) return <Unauthorized />;
  if (loading) return <BookingSkeleton />;

  return (
    <Box  sx={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
      <Paper  sx={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
<Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  sx={{ mb: 3, width: "100%" }}
>
  <FormControl
    size="small"
    sx={{
      minWidth: 180,
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      "& .MuiSelect-select": {
        py: 1,
        px: 2,
        fontWeight: 500,
        fontSize: "0.9rem",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      },
    }}
  >
    <InputLabel
      id="status-select-label"
      sx={{
        fontWeight: 600,
        fontSize: "0.8rem",
        color: "text.secondary",
      }}
    >
      Status
    </InputLabel>
    <Select
      labelId="status-select-label"
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      startAdornment={
        <TuneRoundedIcon
          sx={{
            mr: 1,
            color: "primary.main",
            fontSize: 20,
          }}
        />
      }
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: "8px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1,
              fontSize: "0.9rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            },
          },
        },
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
</Stack>


        <Grid container spacing={4}>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <Grid item xs={12} key={booking.bookingId} sx={{ display: 'flex', justifyContent: 'center' }}>
                <BookingCard bookingDetail={booking} onShowDetails={handleShowDetails} onReview={handleReview} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} textAlign="center">
              <NotFoundPage />
            </Grid>
          )}
        </Grid>

        {totalPages > 1 && (
          <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
          </Stack>
        )}
      </Paper>

      <BookingModal show={showModal} handleClose={handleCloseDetails} modalData={modalData} />
      <ReviewModal
        show={showReviewForm}
        handleClose={handleCloseReview}
        handlePostReview={postReview}
        comment={comment}
        setComment={setComment}
        rating={rating}
        setRating={setRating}
      />
    </Box>
  );
};