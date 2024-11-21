import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, Divider, Paper, Stack, Grid, Tabs, Tab, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DayWiseItinerary from './pages/DayWise';
import OverView from './pages/Overview';
import InclusionExclusion from './pages/InclusionExclusion';
import TermsAndCondition from './pages/Terms&Condition';

const TravelBooking = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: '0 auto', fontFamily: 'Arial' }}>
            {/* Header Section */}
            <Typography variant="h4" fontWeight="bold">
                Colourful Kerala
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                5 Nights / 6 Days{' '}
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
                        <CardMedia
                            component="img"
                            height="350"
                            image="https://www.kayak.co.in/rimg/dimg/30/0c/6318617a-city-35982-163ff913019.jpg?width=1200&height=630&xhint=2421&yhint=1876&crop=true" // Replace with actual image
                            alt="Colourful Kerala Landscape"
                        />
                    </Card>

                    {/* Tabs Section */}
                    <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered indicatorColor="primary" textColor="primary">
                            <Tab label="Overview" />
                            <Tab label="Day wise Itinerary" />
                            <Tab label="Inclusion/Exclusions" />
                            <Tab label="Additional Info" />
                        </Tabs>

                        <Box sx={{ p: 3 }}>
                            {activeTab === 0 && (
                                <Typography>
                                    {/* Package Overview */}
                                    <OverView />
                                </Typography>
                            )}
                            {activeTab === 1 && (
                                <Typography>
                                    <DayWiseItinerary />
                                </Typography>
                            )}
                            {activeTab === 2 && (
                                <Typography>
                                    <InclusionExclusion />
                                </Typography>
                            )}
                            {activeTab === 3 && (
                                <Typography>
                                    <TermsAndCondition />
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Grid>

                {/* Right Info Section */}
                <Grid item xs={12} md={4}>
                    {/* Price Card */}
                    <Card sx={{ padding: 3, backgroundColor: '#f9f9f9', mb: 3 }}>
                        <Typography variant="subtitle1" color="primary" fontWeight="bold">
                            Starting from
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="error" sx={{ mt: 1 }}>
                            ₹18,599
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mt: 0.5 }}>
                            Per Person
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            No Cost EMI starts from <b>₹3,856</b>
                        </Typography>
                        <Button variant="contained" color="warning" fullWidth sx={{ mt: 3 }}>
                            BOOK NOW
                        </Button>
                        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                            SUBMIT YOUR QUERY
                        </Button>
                    </Card>

                    {/* Duration and Places */}
                    <Card sx={{ padding: 3, backgroundColor: '#ffffff', mb: 3 }}>
                        <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                            Duration: 5 Nights & 6 Days
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <LocationOnIcon color="error" />
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                1N Cochin | 2N Munnar | 1N Thekkady | 1N Alleppey
                            </Typography>
                        </Stack>

                        {/* Package Includes */}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" fontWeight="bold" align="center">
                            Package Includes
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
                            {/* Hotel Feature */}
                            <Grid item xs={3} textAlign="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <IconButton sx={{ p: 0, fontSize: 30 }}>
                                    <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                                <Typography variant="body2" sx={{ fontSize: 14, fontWeight: '500' }}>
                                    Hotel
                                </Typography>
                            </Grid>

                            {/* Sightseeing Feature */}
                            <Grid item xs={3} textAlign="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <IconButton sx={{ p: 0, fontSize: 30 }}>
                                    <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                                <Typography variant="body2" sx={{ fontSize: 14, fontWeight: '500' }}>
                                    Sightseeing
                                </Typography>
                            </Grid>

                            {/* Transfer Feature */}
                            <Grid item xs={3} textAlign="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <IconButton sx={{ p: 0, fontSize: 30 }}>
                                    <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                                <Typography variant="body2" sx={{ fontSize: 14, fontWeight: '500' }}>
                                    Transfer
                                </Typography>
                            </Grid>

                            {/* Meal Feature */}
                            <Grid item xs={3} textAlign="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <IconButton sx={{ p: 0, fontSize: 30 }}>
                                    <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                                <Typography variant="body2" sx={{ fontSize: 14, fontWeight: '500' }}>
                                    Meal
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Help Section */}
                    <Card sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <HelpOutlineIcon color="primary" />
                            <Typography variant="body1" fontWeight="bold">
                                Need Help?
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Call us: <b>011-43030303 | 43131313</b>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Mail us: <b>Holidays@easemytrip.com</b>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TravelBooking;
