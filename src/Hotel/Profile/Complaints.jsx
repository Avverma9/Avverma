import React, { useState, useEffect } from "react";
import { userId } from "../../utils/Unauthorized";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import '../Booknow/Booknow.css'
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
  Chip,
  Box,
  CircularProgress,
  styled,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplaints,
  postComplaint,
  deleteComplaint,
} from "../../redux/reducers/complaintSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { PhotoCamera } from "@mui/icons-material";

// Styled components for compact UI
const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "Pending"
      ? theme.palette.warning.main
      : status === "Resolved"
      ? theme.palette.success.main
      : theme.palette.error.main,
  color: theme.palette.common.white,
  fontSize: "0.75rem",
}));

const CompactCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "relative",
}));

const CompactCardContent = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  bottom: theme.spacing(1),
}));



const Complaint = () => {
  const dispatch = useDispatch();
  const [regarding, setRegarding] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [issue, setIssue] = useState("");
  const [images, setImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImages, setDialogImages] = useState([]);
  const { data, loading, error } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(fetchComplaints(userId));
  }, [dispatch]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("regarding", regarding);
    formData.append("hotelName", hotelName);
    formData.append("bookingId", bookingId);
    formData.append("issue", issue);
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await dispatch(postComplaint(formData)).unwrap();
      dispatch(fetchComplaints(userId));

      // Reset the form
      setRegarding("");
      setHotelName("");
      setBookingId("");
      setIssue("");
      setImages([]);
    } catch (error) {
      console.error("Error posting complaint:", error);
      // Optionally handle error feedback here
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
          variant="h6"
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
                label="Hotel Name"
                variant="outlined"
                fullWidth
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Booking ID"
                variant="outlined"
                fullWidth
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                size="small"
                type="number"
              />
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
              <Button
                variant="outlined"
                component="label"
                fullWidth
                size="small"
                color="primary"
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
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h6"
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
          Your Complaints
        </Typography>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "200px" }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body2" align="center" color="error">
            {`Failed to load complaints: ${error}`}
          </Typography>
        ) : data?.length > 0 ? (
          <Box>
            {data?.map((complaint) => (
              <CompactCard key={complaint._id}>
                <StatusChip
                  label={complaint.status}
                  status={complaint.status}
                />
                <CompactCardContent>
                  <Typography variant="body2">
                    <strong>Issue:</strong> {complaint.issue}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Hotel:</strong> {complaint.hotelName} |{" "}
                    <strong>Regarding:</strong> {complaint.regarding}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDateWithOrdinal(
                      complaint.createdAt
                    )}
                  </Typography>
                  <Box mt={1}>
                    {complaint.images?.length > 0 && (
                      <button
                        variant="outlined"
                        color="primary"
                        className="custom-button"
                        onClick={() => handleOpenDialog(complaint.images)}
                      >
                        See Attachment
                      </button>
                    )}
                  </Box>
                </CompactCardContent>
                <DeleteButton
                  aria-label="delete"
                  onClick={() => handleDelete(complaint._id)}
                >
                  <DeleteIcon />
                </DeleteButton>
              </CompactCard>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" align="center" color="textSecondary">
            No complaints found.
          </Typography>
        )}
      </Box>

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
    </Container>
  );
};

export default Complaint;
