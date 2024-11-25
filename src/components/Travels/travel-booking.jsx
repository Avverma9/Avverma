import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, Divider, Stack, Grid, Tabs, Tab, IconButton, Dialog } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DayWiseItinerary from './pages/DayWise';
import OverView from './pages/Overview';
import InclusionExclusion from './pages/InclusionExclusion';
import TermsAndCondition from './pages/Terms&Condition';
import 'react-datepicker/dist/react-datepicker.css';
import iconsList from '../../utils/icons'; // Ensure correct import path
import { useDispatch, useSelector } from 'react-redux';
import { getTravelById } from '../../redux/reducers/travelSlice';
import './css/booking.css';
import DatePicker from 'react-datepicker';
import QueryForm from './pages/QueryForm';

const TravelBooking = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showPicker, setShowPicker] = useState(false);
    const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(), // Default to today
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Default to tomorrow
    });

    const { travelById } = useSelector((state) => state.travel);
    const dispatch = useDispatch();

    const path = window.location.pathname;
    const pathParts = path.split('/');
    const id = pathParts[pathParts.length - 1];

    useEffect(() => {
        if (id) {
            dispatch(getTravelById(id));
        }
    }, [dispatch, id]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSelect = (ranges) => {
        const start = ranges.selection.startDate;
        const end = ranges.selection.endDate;
        setDateRange({
            startDate: start,
            endDate: end,
        });
        setShowPicker(false);
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const getAmenityIcon = (amenity) => {
        const iconObj = iconsList.find((icon) => icon.label.toLowerCase() === amenity.toLowerCase());
        return iconObj ? iconObj.icon : null;
    };

    if (!travelById) return <Typography>Loading...</Typography>;

    const item = travelById;
    const toggleQueryForm = () => {
        setIsQueryFormOpen(!isQueryFormOpen); // Toggle the QueryForm visibility
    };
    const handleCloseForm = () => {
        setIsQueryFormOpen(false); // This is where you toggle the modal visibility state
    };
    return (
        <Box sx={{ padding: 1, maxWidth: 'calc(100vw - 20px)', margin: '0 auto', fontFamily: 'Arial' }}>
            {/* Header Section */}
            <Typography variant="h4" fontWeight="bold">
                {item?.travelAgencyName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {item?.nights} Nights / {item?.days} Days
                <Box component="span" sx={{ fontSize: 12, color: '#f3ba1f' }}>
                    {' '}
                    Land Only
                </Box>
            </Typography>

            {/* Layout */}
            <Grid container spacing={4} sx={{ mt: 3 }}>
                {/* Left Image and Overview Section */}
                <Grid item xs={12} md={8}>
                    {/* Main Image */}
                    <Card>
                        <CardMedia component="img" height="350" image={item?.images[0]} alt={item.title || 'Colourful Kerala Landscape'} />
                    </Card>

                    {/* Tabs Section */}
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

                {/* Right Info Section */}
                <Grid item xs={12} md={4}>
                    {/* Price Card */}
                    <Card sx={{ padding: 4, maxWidth: '400px', backgroundColor: '#f9f9f9', mb: 3, position: 'sticky', top: 0, zIndex: 10 }}>
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

                        <Button variant="contained" color="warning" fullWidth>
                            BOOK NOW
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={toggleQueryForm} // Open Query Form modal on click
                        >
                            SUBMIT YOUR QUERY
                        </Button>
                    </Card>

                    {/* Duration and Places */}
                    <Card
                        sx={{ padding: 4, backgroundColor: '#ffffff', maxWidth: '400px', mb: 3, position: 'sticky', top: 370, zIndex: 9 }}
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

                        {/* Package Includes */}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" fontWeight="bold" align="center">
                            Package Benefits
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
                            {item?.amenities.slice(0, 4).map((amenity, idx) => (
                                <Grid item xs={3} textAlign="center" key={idx}>
                                    <IconButton sx={{ p: 0, fontSize: 30 }}>
                                        {getAmenityIcon(amenity) && getAmenityIcon(amenity)}
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

                    {/* Help Section */}
                    <Card sx={{ padding: 4, backgroundColor: '#f5f5f5', maxWidth: '400px', position: 'sticky', top: 620, zIndex: 8 }}>
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
