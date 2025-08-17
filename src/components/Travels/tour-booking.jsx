import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookNow, getTravelById } from "../../redux/reducers/travelSlice";
import { useLoader } from "../../utils/loader";
import { userId } from "../../utils/Unauthorized";
import { popup } from "../../utils/custom_alert/pop";
import iconsList from "../../utils/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QueryForm from "./pages/QueryForm";
import DayWiseItinerary from "./pages/DayWise";
import OverView from "./pages/Overview";
import InclusionExclusion from "./pages/InclusionExclusion";
import TermsAndCondition from "./pages/Terms&Condition";
import {
  Box,
  Typography,
  Button,
  Paper,
  CardMedia,
  Divider,
  Stack,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  Container,
  Popover,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import { FaRupeeSign } from "react-icons/fa";
import { getGst } from "../../redux/reducers/gstSlice";

// Styled Components for a more compact and professional look
const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const StickySidebar = styled(Paper)(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(10),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[6],
  zIndex: 100,
  height: 'fit-content',
}));

const ImageGallery = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  position: "relative",
}));

const MainImage = styled(CardMedia)(({ theme }) => ({
  height: '450px',
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    height: '250px',
  },
}));

const ImageThumbnail = styled(CardMedia)(({ theme, isActive }) => ({
  height: 60,
  width: "100%",
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  opacity: isActive ? 1 : 0.7,
  border: `2px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
  transition: "opacity 0.3s, border-color 0.3s, transform 0.3s",
  objectFit: "cover",
  "&:hover": {
    opacity: 1,
    transform: 'scale(1.03)',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 35,
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: 14,
  minHeight: 35,
  padding: theme.spacing(1, 1.5),
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const TravelBooking = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);
  const gstData = useSelector((state) => state.gst.gst);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { showLoader, hideLoader } = useLoader();
  const { travelById } = useSelector((state) => state.travel);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = window.location.pathname;
  const id = path.split("/").pop();

  const [finalPrice, setFinalPrice] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getTravelById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (travelById && travelById.price) {
      dispatch(getGst({ type: "Tour", gstThreshold: travelById.price }));
    }
  }, [dispatch, travelById, id]);

  useEffect(() => {
    if (!travelById) {
      showLoader();
    } else {
      hideLoader();
      setMainImage(travelById.images?.[0] || "");
    }
  }, [travelById, showLoader, hideLoader]);

  useEffect(() => {
    if (gstData && travelById) {
      const startingPrice = travelById.price;
      const gstPercentage = gstData.gstPrice;
      const gstAmount = (startingPrice * gstPercentage) / 100;
      const calculatedFinalPrice = startingPrice + gstAmount;
      setFinalPrice(calculatedFinalPrice);
    }
  }, [gstData, travelById]);

  const handleTabChange = useCallback(
    (event, newValue) => setActiveTab(newValue),
    []
  );
  const toggleQueryForm = useCallback(
    () => setIsQueryFormOpen((prev) => !prev),
    []
  );
  const handleCloseForm = useCallback(() => setIsQueryFormOpen(false), []);
  const handleDateChange = useCallback((dates) => {
    const [start, end] = dates;
    setDateRange({ startDate: start, endDate: end });
    if (start && end) {
      handleClosePopover();
    }
  }, []);
  const handleClickPopover = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );
  const handleClosePopover = useCallback(() => setAnchorEl(null), []);
  const open = Boolean(anchorEl);

  const formatDate = useCallback(
    (date) =>
      date
        ? new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })
        : "Select Date",
    []
  );

  const getAmenityIcon = useCallback(
    (amenity) =>
      iconsList.find(
        (icon) => icon.label.toLowerCase() === amenity.toLowerCase()
      )?.icon || null,
    []
  );

  const handleBooking = async () => {
    if (!userId) {
      popup("Please log in to book this travel package.");
      return;
    }
    if (!dateRange.startDate || !dateRange.endDate) {
      popup("Please select your travel dates before booking.");
      return;
    }

    const bookingData = {
      userId: userId,
      travelId: travelById._id,
      travelAgencyName: travelById.travelAgencyName,
      price: finalPrice || travelById.price,
      visitingPlaces: travelById.visitingPlaces,
      nights: travelById.nights,
      days: travelById.days,
      images: travelById.images ?? [],
      amenities: travelById.amenities ?? [],
      from: dateRange.startDate,
      to: dateRange.endDate,
      themes: travelById.themes ?? [],
      state: travelById.state,
      country: travelById.country,
      city: travelById.city,
      inclusion: travelById.inclusion ?? [],
      exclusion: travelById.exclusion ?? [],
      termsAndCondition: travelById.termsAndConditions,
      dayWise:
        travelById.dayWise?.map(({ day, description }) => ({
          day,
          description,
        })) ?? [],
    };

    try {
      showLoader();
      const res = await dispatch(bookNow(bookingData)).unwrap();
      const bookingId = res?.bookingId || res?.data?._id || "N/A";
      popup(
        `✅ Booking Confirmed!\n\n📍 City: ${
          bookingData.city
        }\n📅 From: ${formatDate(bookingData.from)}\n📅 To: ${formatDate(
          bookingData.to
        )}\n🆔 Booking ID: ${bookingId}`
      );
      setTimeout(() => {
        navigate("/tour-bookings");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err?.message || err?.toString() || "An unknown error occurred.";
      popup(`❌ Booking failed.\n\nReason: ${errorMessage}`);
    } finally {
      hideLoader();
    }
  };

  if (!travelById) {
    return null;
  }

  return (
    <MainContainer maxWidth="lg">
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Left Column: Main Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Header */}
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {travelById.travelAgencyName}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <LocationOnIcon color="action" fontSize="small" />
                <Typography variant="subtitle1" color="text.secondary">
                  {travelById.city}, {travelById.state}, {travelById.country}
                </Typography>
              </Stack>
              <Typography variant="subtitle2" color="text.secondary" mt={0.5}>
                {travelById.nights} Nights / {travelById.days} Days
              </Typography>
            </Box>

            {/* Image Gallery */}
            <ImageGallery elevation={2}>
              <MainImage
                component="img"
                image={mainImage}
                alt="Main travel view"
              />
              <Grid
                container
                spacing={1}
                sx={{ p: 1, bgcolor: "rgba(0,0,0,0.05)" }}
              >
                {travelById.images?.slice(0, 4).map((img, idx) => (
                  <Grid item xs={3} key={idx}>
                    <ImageThumbnail
                      component="img"
                      image={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setMainImage(img)}
                      isActive={mainImage === img}
                    />
                  </Grid>
                ))}
              </Grid>
            </ImageGallery>

            {/* Content Tabs */}
            <SectionPaper elevation={2}>
              <StyledTabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <StyledTab label="Overview" />
                <StyledTab label="Day wise Itinerary" />
                <StyledTab label="Inclusion/Exclusions" />
                <StyledTab label="Additional Info" />
              </StyledTabs>
              <Box sx={{ pt: 1, pb: 1 }}>
                {activeTab === 0 && <OverView data={travelById} />}
                {activeTab === 1 && <DayWiseItinerary data={travelById} />}
                {activeTab === 2 && <InclusionExclusion data={travelById} />}
                {activeTab === 3 && <TermsAndCondition data={travelById} />}
              </Box>
            </SectionPaper>
          </Stack>
        </Grid>

        {/* Right Column: Sticky Sidebar */}
        <Grid item xs={12} md={4}>
          <StickySidebar>
            <Stack spacing={2}>
              {/* Compact Price Section */}
              <Box>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  Price
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <FaRupeeSign size={14} color={theme.palette.text.secondary} />
                    <Typography 
                      variant="h6" 
                      fontWeight="regular" 
                      color="text.secondary" 
                      sx={{ textDecoration: 'line-through' }}
                    >
                      {travelById.price}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <FaRupeeSign size={24} color={theme.palette.success.main} />
                    <Typography variant="h4" fontWeight="bold" color="success.main">
                      {finalPrice?.toFixed(0) || "Calculating..."}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{mt: 0.5}}>
                  (Inclusive of {gstData?.gstPrice}% GST)
                </Typography>
              </Box>
              
              <Divider />

              <Box>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleClickPopover}
                  startIcon={<CalendarMonthIcon />}
                  sx={{ justifyContent: "flex-start", py: 1 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {formatDate(dateRange.startDate)} -{" "}
                      {formatDate(dateRange.endDate)}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Modify
                    </Typography>
                  </Stack>
                </Button>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Box sx={{ p: 1 }}>
                    <DatePicker
                      selected={dateRange.startDate}
                      onChange={handleDateChange}
                      startDate={dateRange.startDate}
                      endDate={dateRange.endDate}
                      selectsRange
                      inline
                    />
                  </Box>
                </Popover>
              </Box>

              <Stack spacing={1} sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={toggleQueryForm}
                >
                  Submit Query
                </Button>
              </Stack>

              <Divider />

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{mb: 1}}>
                  Package Benefits
                </Typography>
                <Grid container spacing={1}>
                  {travelById.amenities?.slice(0, 4).map((amenity, idx) => (
                    <Grid item xs={6} key={idx}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ color: "primary.main", fontSize: "1rem" }}>
                          {getAmenityIcon(amenity)}
                        </Box>
                        <Typography variant="body2">{amenity}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Paper
                variant="outlined"
                sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50", mt: 1.5 }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <HelpOutlineIcon color="primary" />
                  <Typography variant="subtitle2" fontWeight="bold">
                    Need Help?
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Call us: <b>+91-9917991758</b>
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Mail us: <b>info@hotelroomsstay.com</b>
                </Typography>
              </Paper>
            </Stack>
          </StickySidebar>
        </Grid>
      </Grid>

      <Dialog open={isQueryFormOpen} onClose={handleCloseForm}>
        <Box position="relative" p={3}>
          <IconButton
            aria-label="close"
            onClick={handleCloseForm}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <QueryForm onClose={handleCloseForm} />
        </Box>
      </Dialog>
    </MainContainer>
  );
};

export default TravelBooking;