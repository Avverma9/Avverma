import React, { useState, useEffect } from "react";
import { userId } from "../../../utils/Unauthorized";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
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
  Paper,
  Alert,
  Fade,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  InfoOutlined as InfoOutlinedIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplaints,
  postComplaint,
  deleteComplaint,
  fetchHotelNamesByBookingId,
} from "../../../redux/reducers/complaintSlice";
import ComplaintsList from "./complaints";
import FeedbackDialog from "./FeedBackDialog";

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
  const [fetchTimer, setFetchTimer] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // New state to control form visibility

  const { data, loading, error } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(fetchComplaints(userId));
  }, [dispatch]);

  useEffect(() => {
    if (fetchTimer) {
      clearTimeout(fetchTimer);
    }

    if (bookingId) {
      const timer = setTimeout(async () => {
        setLoadingHotels(true);
        try {
          const response = await dispatch(
            fetchHotelNamesByBookingId(bookingId)
          ).unwrap();
          setHotels(response);
          if (response.length === 1) {
            setHotelId(response[0].hotelDetails.hotelId);
            setHotelName(response[0].hotelDetails.hotelName);
            setHotelEmail(response[0].hotelDetails.hotelEmail);
          }
        } catch (error) {
          console.error("Error fetching hotel data:", error);
          setHotels([]);
        } finally {
          setLoadingHotels(false);
        }
      }, 1000);

      setFetchTimer(timer);
    } else {
      setHotels([]);
      setHotelId("");
      setHotelName("");
      setHotelEmail("");
      setLoadingHotels(false);
    }

    return () => {
      if (fetchTimer) {
        clearTimeout(fetchTimer);
      }
    };
  }, [bookingId, dispatch]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleRemoveFile = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("regarding", regarding);
    formData.append("hotelName", hotelName);
    formData.append("hotelId", hotelId);
    formData.append("hotelEmail", hotelEmail);
    formData.append("bookingId", bookingId);
    formData.append("issue", issue);
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await dispatch(postComplaint(formData)).unwrap();
      dispatch(fetchComplaints(userId));

      setRegarding("");
      setHotelId("");
      setHotelName("");
      setHotelEmail("");
      setBookingId("");
      setIssue("");
      setImages([]);
      setIsFormVisible(false); // Hide the form on successful submission
    } catch (error) {
      console.error("Error posting complaint:", error);
    } finally {
      setIsSubmitting(false);
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
      (hotel) => hotel.hotelDetails.hotelId === event.target.value
    );
    if (selectedHotel) {
      setHotelId(selectedHotel.hotelDetails.hotelId);
      setHotelName(selectedHotel.hotelDetails.hotelName);
      setHotelEmail(selectedHotel.hotelDetails.hotelEmail);
    } else {
      setHotelId("");
      setHotelName("");
      setHotelEmail("");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Hide Form" : "Raise a Complaint"}
        </Button>
      </Grid>

      <Fade in={isFormVisible} timeout={500}>
        <Box sx={{ display: isFormVisible ? 'block' : 'none' }}>
          {/* Complaint Box Form */}
          <Paper
            elevation={6}
            sx={{
              mb: 4,
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              bgcolor: (theme) => theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: { xs: 2, md: 3 },
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  letterSpacing: 1,
                }}
              >
                Submit a New Complaint
              </Typography>
              <InfoOutlinedIcon color="primary" />
            </Box>
            <Divider sx={{ mb: { xs: 2, md: 3 } }} />
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required size="small" variant="outlined">
                    <Select
                      value={regarding}
                      onChange={(e) => setRegarding(e.target.value)}
                      displayEmpty
                      inputProps={{ "aria-label": "Regarding" }}
                    >
                      <MenuItem disabled value="">
                        Regarding
                      </MenuItem>
                      <MenuItem value="Booking">Booking</MenuItem>
                      <MenuItem value="Hotel">Hotel</MenuItem>
                      <MenuItem value="Website">Website</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Booking ID"
                    variant="outlined"
                    required
                    fullWidth
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    size="small"
                    type="text"
                    helperText="Enter your booking ID to find your hotel."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">#</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    required
                    size="small"
                    variant="outlined"
                    disabled={!bookingId}
                  >
                    <Select
                      value={hotelId}
                      onChange={handleHotelChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Hotel Name" }}
                    >
                      <MenuItem disabled value="">
                        Hotel Name
                      </MenuItem>
                      {loadingHotels ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          <Typography variant="body2">Fetching...</Typography>
                        </MenuItem>
                      ) : hotels.length > 0 ? (
                        hotels.map((hotel) => (
                          <MenuItem
                            key={hotel?.hotelDetails?.hotelId}
                            value={hotel?.hotelDetails?.hotelId}
                          >
                            {hotel?.hotelDetails?.hotelName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          {bookingId ? "No hotels found" : "Enter Booking ID"}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Issue Details"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    size="small"
                    required
                    placeholder="Describe your issue here..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<AttachFileIcon />}
                    sx={{
                      color: "text.primary",
                      borderColor: "divider",
                      "&:hover": { borderColor: "primary.main" },
                    }}
                  >
                    Upload Attachments
                    <input
                      type="file"
                      multiple
                      hidden
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Button>
                  {images.length > 0 && (
                    <Fade in={images.length > 0}>
                      <Box mt={2}>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Selected files:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {images.map((file, index) => (
                            <Chip
                              key={index}
                              label={file.name}
                              variant="filled"
                              color="primary"
                              onDelete={() => handleRemoveFile(index)}
                              deleteIcon={<CloseIcon />}
                              sx={{ fontSize: "0.75rem" }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Fade>
                  )}
                </Grid>

                <Grid item xs={12} container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    disabled={isSubmitting}
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Fade>

      <Divider sx={{ my: { xs: 4, md: 6 } }} />

      {/* Complaints List */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          An error occurred while fetching your complaints.
        </Alert>
      )}
      <ComplaintsList
        complaints={data}
        loading={loading}
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
        <DialogContent dividers>
          {dialogImages.length > 0 ? (
            <Grid container spacing={2}>
              {dialogImages.map((image, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`attachment-${index}`}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No attachments found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
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