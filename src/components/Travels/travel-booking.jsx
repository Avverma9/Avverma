import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, Divider, Stack, Grid, Tabs, Tab, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DayWiseItinerary from './pages/DayWise';
import OverView from './pages/Overview';
import InclusionExclusion from './pages/InclusionExclusion';
import TermsAndCondition from './pages/Terms&Condition';
import iconsList from '../../utils/icons'; // Make sure this is correctly imported
import { useDispatch, useSelector } from 'react-redux';
import { getTravelById } from '../../redux/reducers/travelSlice';

const TravelBooking = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const path = window.location.pathname;
    const pathParts = path.split('/');
    const id = pathParts[pathParts.length - 1];

    const { travelById } = useSelector((state) => state.travel);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getTravelById(id));
        }
    }, [dispatch, id]);

    const getAmenityIcon = (amenity) => {
        const iconObj = iconsList.find((icon) => icon.label.toLowerCase() === amenity.toLowerCase());
        return iconObj ? iconObj.icon : null;
    };

    if (!travelById) return <Typography>Loading...</Typography>; // Add a better loading spinner or skeleton loader for better UX.

    const item = travelById;

    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: '0 auto', fontFamily: 'Arial' }}>
            {/* Header Section */}
            <Typography variant="h4" fontWeight="bold">
                {item?.travelAgencyName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {item?.nights} Nights / {item?.days} Days{' '}
                <Box component="span" sx={{ fontSize: 12, color: '#f3ba1f' }}>
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
                        <Tabs
                            style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}
                            value={activeTab}
                            onChange={handleTabChange}
                            centered
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Overview" />
                            <Tab label="Day wise Itinerary" />
                            <Tab label="Inclusion/Exclusions" />
                            <Tab label="Additional Info" />
                        </Tabs>

                        <Box sx={{ p: 3 }}>
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
                    <Card sx={{ padding: 3, backgroundColor: '#f9f9f9', mb: 3, position: 'sticky', top: 0, zIndex: 10 }}>
                        <Typography variant="subtitle1" color="primary" fontWeight="bold">
                            Starting from
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="error" sx={{ mt: 1 }}>
                            ₹{item?.price}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mt: 0.5 }}>
                            Per Person
                        </Typography>
                        {/* <Typography variant="body2" sx={{ mt: 1 }}>
                            No Cost EMI starts from <b>₹3,856</b>
                        </Typography> */}
                        <Button variant="contained" color="warning" fullWidth sx={{ mt: 3 }}>
                            BOOK NOW
                        </Button>
                        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                            SUBMIT YOUR QUERY
                        </Button>
                    </Card>

                    {/* Duration and Places */}
                    <Card sx={{ padding: 3, backgroundColor: '#ffffff', mb: 3, position: 'sticky', top: 270, zIndex: 9 }}>
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
                        <Grid container spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
                            {/* Show only the first 4 amenities */}
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

                            {/* Show "Show More" button only if there are more than 4 amenities */}
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
                    <Card sx={{ padding: 3, backgroundColor: '#f5f5f5', position: 'sticky', top: 580, zIndex: 8 }}>
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
        </Box>
    );
};

export default TravelBooking;
