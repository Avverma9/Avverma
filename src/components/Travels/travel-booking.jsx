import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
  Stack,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Dialog,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DayWiseItinerary from './pages/DayWise';
import OverView from './pages/Overview';
import InclusionExclusion from './pages/InclusionExclusion';
import TermsAndCondition from './pages/Terms&Condition';
import 'react-datepicker/dist/react-datepicker.css';
import iconsList from '../../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { bookNow, getTravelById } from '../../redux/reducers/travelSlice';
import DatePicker from 'react-datepicker';
import QueryForm from './pages/QueryForm';
import { useLoader } from '../../utils/loader';
import './css/booking.css';
import { userId } from '../../utils/Unauthorized';
import { popup } from '../../utils/custom_alert/pop';
const TravelBooking = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const { showLoader, hideLoader } = useLoader();
  const { travelById } = useSelector((state) => state.travel);
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const id = path.split('/').pop();

  useEffect(() => {
    if (id) {
      dispatch(getTravelById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!travelById) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [travelById, showLoader, hideLoader]);

  if (!travelById) return null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSelect = (ranges) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
    setShowPicker(false);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getAmenityIcon = (amenity) => {
    const iconObj = iconsList.find(
      (icon) => icon.label.toLowerCase() === amenity.toLowerCase()
    );
    return iconObj ? iconObj.icon : null;
  };

  const toggleQueryForm = () => {
    setIsQueryFormOpen((prev) => !prev);
  };

  const handleCloseForm = () => {
    setIsQueryFormOpen(false);
  };

  const item = travelById;

const handleBooking = async () => {
  const data = {
    userId: userId,
    travelId: item._id,
    travelAgencyName: item.travelAgencyName,
    price: item.price,
    visitngPlaces: item.visitngPlaces,
    nights: item.nights,
    days: item.days,
    images: item.images,
    amenities: item.amenities,
    from: dateRange.startDate,
    to: dateRange.endDate,
    themes: item.themes,
    state: item.state,
    country: item.country,
    city: item.city,
    inclusion: item.inclusion,
    exclusion: item.exclusion,
    termsAndCondition: item.termsAndConditions,
    dayWise: item.dayWise.map(({ day, description }) => ({
      day,
      description,
    })),
  };

  if (!userId) {
    alert('Please login to book this travel package.');
    return;
  }

  try {
    const res = await dispatch(bookNow(data)).unwrap(); // ← This gives you access to the returned response directly
    const bookingId = res?.bookingId || res?.data?._id || 'N/A';

    popup(`✅ Booking is done!\n\n🆔 Booking ID: ${bookingId}`);
  } catch (err) {
    popup(`❌ Booking failed.\n\nReason: ${err}`);
  }
};
  return (
    <Box sx={{ padding: 1, maxWidth: 'calc(100vw - 20px)', margin: '0 auto', fontFamily: 'Arial' }}>
      <Typography variant="h4" fontWeight="bold">
        {item?.travelAgencyName}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {item?.nights} Nights / {item?.days} Days
        <Box component="span" sx={{ fontSize: 12, color: '#f3ba1f' }}>
          {' '}Land Only
        </Box>
      </Typography>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={item?.images?.[0]}
              alt={item?.title || 'Travel Image'}
            />
          </Card>

          <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  display: 'inline-flex',
                  minWidth: 'auto',
                  '& .MuiTab-root': {
                    flexShrink: 0,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                  },
                }}
              >
                <Tab label="Overview" />
                <Tab label="Day wise Itinerary" />
                <Tab label="Inclusion/Exclusions" />
                <Tab label="Additional Info" />
              </Tabs>
            </div>

            <Box>
              {activeTab === 0 && <OverView data={item} />}
              {activeTab === 1 && <DayWiseItinerary data={item} />}
              {activeTab === 2 && <InclusionExclusion data={item} />}
              {activeTab === 3 && <TermsAndCondition data={item} />}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Booking Card */}
          <Card
            sx={{
              padding: 4,
              maxWidth: '400px',
              backgroundColor: '#f9f9f9',
              mb: 3,
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              Starting from
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="error" sx={{ mt: 1 }}>
              ₹{item?.price}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mt: 0.5 }}>
              Per Person
            </Typography>

            <div className="date-picker-container">
              <div className="date-display">
                <span className="icon">📅</span>
                <span className="date-range">
                  {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
                </span>
                <button className="modify-button" onClick={() => setShowPicker(!showPicker)}>
                  Modify Dates
                </button>
              </div>
              <p className="subtitle">Change dates as per your comfort</p>

              {showPicker && (
                <DatePicker
                  selected={dateRange.startDate}
                  onChange={handleSelect}
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  selectsRange
                  inline
                />
              )}
            </div>

            <Button variant="contained" color="warning" fullWidth onClick={handleBooking}>
              BOOK NOW
            </Button>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={toggleQueryForm}>
              SUBMIT YOUR QUERY
            </Button>
          </Card>

          {/* Benefits Card */}
          <Card
            sx={{
              padding: 4,
              backgroundColor: '#ffffff',
              maxWidth: '400px',
              mb: 3,
              position: 'sticky',
              top: 370,
              zIndex: 9,
            }}
          >
            <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
              Duration: {item?.nights} Nights & {item?.days} Days
            </Typography>
            <Stack direction="row" alignItems="center">
              <LocationOnIcon color="error" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {item?.visitngPlaces}
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="bold" align="center">
              Package Benefits
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
              {item?.amenities?.slice(0, 4).map((amenity, idx) => (
                <Grid item xs={3} textAlign="center" key={idx}>
                  <IconButton sx={{ p: 0, fontSize: 30 }}>
                    {getAmenityIcon(amenity)}
                  </IconButton>
                  <Typography variant="body2" sx={{ fontSize: 14, fontWeight: '500' }}>
                    {amenity}
                  </Typography>
                </Grid>
              ))}
              {item?.amenities?.length > 4 && (
                <Grid item xs={12} textAlign="center" sx={{ mt: 2 }}>
                  <Button variant="outlined" sx={{ fontWeight: 'bold' }}>
                    + More benefits
                  </Button>
                </Grid>
              )}
            </Grid>
          </Card>

          {/* Help Card */}
          <Card
            sx={{
              padding: 4,
              backgroundColor: '#f5f5f5',
              maxWidth: '400px',
              position: 'sticky',
              top: 620,
              zIndex: 8,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <HelpOutlineIcon color="primary" />
              <Typography variant="body1" fontWeight="bold">
                Need Help?
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Call us: <b>+91-9917991758</b>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Mail us: <b>info@hotelroomsstay.com</b>
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={isQueryFormOpen} onClose={toggleQueryForm}>
        <QueryForm onClose={handleCloseForm} />
      </Dialog>
    </Box>
  );
};

export default TravelBooking;
