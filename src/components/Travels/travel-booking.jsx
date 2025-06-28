import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
import { userId } from '../../utils/Unauthorized';
import { popup } from '../../utils/custom_alert/pop';

const TravelBooking = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [mainImage, setMainImage] = useState('');
    const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const [anchorEl, setAnchorEl] = useState(null);

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
            setMainImage(travelById.images?.[0] || '');
        }
    }, [travelById, showLoader, hideLoader]);

    if (!travelById) {
        return null; // Or a loading skeleton component
    }

    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const toggleQueryForm = () => setIsQueryFormOpen((prev) => !prev);
    const handleCloseForm = () => setIsQueryFormOpen(false);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setDateRange({ startDate: start, endDate: end });
        if (start && end) {
            handleClosePopover();
        }
    };

    const handleClickPopover = (event) => setAnchorEl(event.currentTarget);
    const handleClosePopover = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Select Date';
    const getAmenityIcon = (amenity) => iconsList.find(icon => icon.label.toLowerCase() === amenity.toLowerCase())?.icon || null;

    const handleBooking = async () => {
        if (!userId) {
            popup('Please log in to book this travel package.');
            return;
        }

        if (!dateRange.startDate || !dateRange.endDate) {
            popup('Please select your travel dates before booking.');
            return;
        }

        const bookingData = {
            userId: userId,
            travelId: travelById._id,
            travelAgencyName: travelById.travelAgencyName,
            price: travelById.price,
            visitingPlaces: travelById.visitingPlaces, // Corrected typo
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
            dayWise: travelById.dayWise?.map(({ day, description }) => ({ day, description })) ?? [],
        };

        try {
            showLoader();
            const res = await dispatch(bookNow(bookingData)).unwrap();
            const bookingId = res?.bookingId || res?.data?._id || 'N/A';

            popup(`✅ Booking Confirmed!\n\n📍 City: ${bookingData.city}\n📅 From: ${formatDate(bookingData.from)}\n📅 To: ${formatDate(bookingData.to)}\n🆔 Booking ID: ${bookingId}`);
            
            setTimeout(() => {
                window.location.href = "/tour-bookings";
            }, 3000);
        } catch (err) {
            const errorMessage = err?.message || err?.toString() || 'An unknown error occurred.';
            popup(`❌ Booking failed.\n\nReason: ${errorMessage}`);
        } finally {
            hideLoader();
        }
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {/* Left Column: Main Content */}
                <Grid item xs={12} md={8}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{travelById.travelAgencyName}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {travelById.nights} Nights / {travelById.days} Days
                            </Typography>
                        </Box>

                        <Stack spacing={1}>
                            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <CardMedia component="img" height="400" image={mainImage} alt="Main travel view" />
                            </Paper>
                            <Grid container spacing={1}>
                                {travelById.images?.slice(0, 4).map((img, idx) => (
                                    <Grid item xs={3} key={idx}>
                                        <CardMedia
                                            component="img"
                                            height="80"
                                            image={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            onClick={() => setMainImage(img)}
                                            sx={{
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                border: mainImage === img ? '2px solid' : '2px solid transparent',
                                                borderColor: 'primary.main',
                                                opacity: mainImage === img ? 1 : 0.7,
                                                transition: 'opacity 0.3s',
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>

                        <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                sx={{ borderBottom: 1, borderColor: 'divider' }}
                            >
                                <Tab label="Overview" />
                                <Tab label="Day wise Itinerary" />
                                <Tab label="Inclusion/Exclusions" />
                                <Tab label="Additional Info" />
                            </Tabs>
                            <Box sx={{ p: { xs: 1, sm: 2 } }}>
                                {activeTab === 0 && <OverView data={travelById} />}
                                {activeTab === 1 && <DayWiseItinerary data={travelById} />}
                                {activeTab === 2 && <InclusionExclusion data={travelById} />}
                                {activeTab === 3 && <TermsAndCondition data={travelById} />}
                            </Box>
                        </Paper>
                    </Stack>
                </Grid>

                {/* Right Column: Sticky Sidebar */}
                <Grid item xs={12} md={4}>
                    <Stack spacing={3} sx={{ position: 'sticky', top: '20px' }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">Starting from</Typography>
                            <Typography variant="h4" fontWeight="bold" color="error.main">₹{travelById.price}</Typography>
                            <Typography variant="caption" color="text.secondary">Per Person</Typography>

                            <Box
                                onClick={handleClickPopover}
                                sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', mt: 2 }}
                            >
                                <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                    {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
                                </Typography>
                                <Button size="small">Modify</Button>
                            </Box>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClosePopover}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <DatePicker
                                    selected={dateRange.startDate}
                                    onChange={handleDateChange}
                                    startDate={dateRange.startDate}
                                    endDate={dateRange.endDate}
                                    selectsRange
                                    inline
                                />
                            </Popover>

                            <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }} onClick={handleBooking}>Book Now</Button>
                            <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={toggleQueryForm}>Submit Query</Button>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                            <Typography variant="h6" fontWeight="bold">Package Benefits</Typography>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container spacing={2}>
                                {travelById.amenities?.slice(0, 4).map((amenity, idx) => (
                                    <Grid item xs={6} key={idx}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Box sx={{ color: 'primary.main' }}>{getAmenityIcon(amenity)}</Box>
                                            <Typography variant="body2">{amenity}</Typography>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: 'grey.50' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <HelpOutlineIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">Need Help?</Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ mt: 1 }}>Call us: <b>+91-9917991758</b></Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>Mail us: <b>info@hotelroomsstay.com</b></Typography>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>

            <Dialog open={isQueryFormOpen} onClose={toggleQueryForm}>
                <QueryForm onClose={handleCloseForm} />
            </Dialog>
        </Container>
    );
};

export default TravelBooking;