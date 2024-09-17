import React, { useState, useEffect } from "react";
import { userId } from "../../../utils/Unauthorized";
import "../../Booknow/Booknow.css";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Box,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplaints,
  postComplaint,
  deleteComplaint,
  fetchHotelNamesByBookingId, // Action to fetch hotel info
} from "../../../redux/reducers/complaintSlice";
import ComplaintsList from "./complaints"; // Import the ComplaintsList component
import FeedbackDialog from "./FeedBackDialog"; // Import the FeedbackDialog component

const Complaint = () => {
  const dispatch = useDispatch();
  const [regarding, setRegarding] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [issue, setIssue] = useState("");
  const [images, setImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImages, setDialogImages] = useState([]);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [fetchTimer, setFetchTimer] = useState(null); // Timer state
  const [hotels, setHotels] = useState([]); // State to store fetched hotels
  const [loadingHotels, setLoadingHotels] = useState(false); // State for loading hotels
  const { data, loading, error } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(fetchComplaints(userId));
  }, [dispatch]);

  useEffect(() => {
    // Clear any existing timer if bookingId changes
    if (fetchTimer) {
      clearTimeout(fetchTimer);
    }

    if (bookingId) {
      // Set a new timer to fetch hotel data after 3 seconds
      const timer = setTimeout(async () => {
        setLoadingHotels(true); // Start loading spinner
        try {
          const response = await dispatch(
            fetchHotelNamesByBookingId(bookingId)
          ).unwrap();
          setHotels(response); // Assuming response contains an array of hotels
        } catch (error) {
          console.error("Error fetching hotel data:", error);
          setHotels([]);
        } finally {
          setLoadingHotels(false); // Stop loading spinner
        }
      }, 3000); // Delay of 3 seconds

      setFetchTimer(timer);
    } else {
      setHotels([]);
      setLoadingHotels(false); // Stop loading spinner if bookingId is empty
    }

    return () => {
      // Cleanup timer on component unmount or bookingId change
      if (fetchTimer) {
        clearTimeout(fetchTimer);
      }
    };
  }, [bookingId, dispatch]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("regarding", regarding);
    formData.append("hotelName", hotelName);
    formData.append("hotelId", hotelId); // Add hotelId to the form data
    formData.append("hotelEmail", hotelEmail);
    formData.append("bookingId", bookingId);
    formData.append("issue", issue);
    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });

    try {
      await dispatch(postComplaint(formData)).unwrap();
      dispatch(fetchComplaints(userId));

      // Reset the form
      setRegarding("");
      setHotelName("");
      setHotelId("");
      setHotelEmail("");
      setBookingId("");
      setIssue("");
      setImages([]);
    } catch (error) {
      console.error("Error posting complaint:", error);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteComplaint(id)).unwrap();
    dispatch(fetchComplaints(userId));
  };

  const handleOpenDialog = (complaintImages) => {
    setDialogImages(complaintImages);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenFeedbackDialog = (feedBack) => {
    setFeedbackContent(feedBack);
    setOpenFeedbackDialog(true);
  };

  const handleCloseFeedbackDialog = () => {
    setOpenFeedbackDialog(false);
  };

  const handleHotelChange = (event) => {
    const selectedHotel = hotels.find(
      (hotel) => hotel.hotelId === event.target.value
    );
    setHotelId(event.target.value);
    setHotelName(selectedHotel ? selectedHotel.hotelName : "");
    setHotelEmail(selectedHotel ? selectedHotel.hotelEmail : ""); // Set the hotel email
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Complaint Box Form */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="p"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#3f51b5",
            textTransform: "uppercase",
            letterSpacing: 1.5,
            background: "black",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            fontFamily: "Roboto, Arial, sans-serif",
          }}
        >
          Complaint Box
        </Typography>
        <hr />
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Regarding</InputLabel>
                <Select
                  value={regarding}
                  onChange={(e) => setRegarding(e.target.value)}
                  label="Regarding"
                >
                  <MenuItem value="Booking">Booking</MenuItem>
                  <MenuItem value="Hotel">Hotel</MenuItem>
                  <MenuItem value="Website">Website</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Booking ID"
                variant="outlined"
                required
                fullWidth
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                size="small"
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Hotel Name</InputLabel>
                {loadingHotels ? (
                  <CircularProgress size={24} />
                ) : (
                  <Select
                    value={hotelId}
                    onChange={handleHotelChange}
                    label="Hotel Name"
                  >
                    {hotels?.map((hotel) => (
                      <MenuItem key={hotel.hotelId} value={hotel.hotelId}>
                        {hotel.hotelName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Issue"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: "100%" }}
                >
                  Upload Attachments
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                <Box mt={1}>
                  {images.length > 0 && (
                    <Box>
                      {Array.from(images).map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          variant="outlined"
                          color="primary"
                          sx={{ mr: 1, mb: 1, fontSize: "0.75rem" }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12} container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                sx={{
                  width: "130px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Complaints List */}
      <ComplaintsList
        complaints={data}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onViewAttachments={handleOpenDialog}
        onViewFeedback={handleOpenFeedbackDialog}
      />

      {/* Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Attachments</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            {dialogImages.map((image, index) => (
              <Box key={index} mb={2}>
                <img
                  src={image}
                  alt={`attachment-${index}`}
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <FeedbackDialog
        open={openFeedbackDialog}
        onClose={handleCloseFeedbackDialog}
        feedbackContent={feedbackContent}
      />
    </Container>
  );
};

export default Complaint;
