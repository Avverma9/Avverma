import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookNow, getTravelById } from "../../redux/reducers/travelSlice";
import { getGst } from "../../redux/reducers/gstSlice";
import { useLoader } from "../../utils/loader";
import { userId } from "../../utils/Unauthorized";
import { popup } from "../../utils/custom_alert/pop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Box, Typography, Stack, Paper, styled, useTheme, Grid, Button,
    CardMedia, IconButton, Dialog, Container, Popover,
    useMediaQuery, Tabs, Tab, DialogContent, DialogTitle, Chip as MuiChip
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    InfoOutlined as InfoOutlinedIcon,
    ListAlt as ListAltIcon,
    Policy as PolicyIcon,
    Close as CloseIcon,
    Style as StyleIcon,
    CalendarMonth as CalendarMonthIcon,
    LocationOn as LocationOnIcon,
    Cancel as CancelIcon,
    ReceiptLong as ReceiptLongIcon,
    Payment as PaymentIcon
} from '@mui/icons-material';
import { FaRupeeSign } from "react-icons/fa";

// --- FIX: Set this to the height of your app's top navigation bar ---
const APP_BAR_HEIGHT = '56px';

const PageContainer = styled(Container)(({ theme }) => ({
    padding: 0,
    paddingBottom: theme.spacing(10), // For your app's bottom nav
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    }
}));

const HeroContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '250px', // Compact height for mobile (xs)
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
        zIndex: 1,
    },
    [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius * 3,
        overflow: 'hidden',
        height: '350px', // More expansive height for tablet/desktop (md and up)
        maxHeight: '550px',
    }
}));

const HeroContent = styled(Stack)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    padding: theme.spacing(2),
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    }
}));

const BookingCard = styled(Paper)(({ theme }) => ({
    position: 'sticky',
    top: `calc(${APP_BAR_HEIGHT} + ${theme.spacing(2)})`,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: '0 10px 35px rgba(0,0,0,0.08)',
}));

const PillTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 'auto',
    paddingBottom: '1px',
    '& .MuiTabs-flexContainer': {
        gap: theme.spacing(1),
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
}));

const PillTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.85rem',
    borderRadius: '99px',
    minHeight: 'auto',
    padding: theme.spacing(1, 2),
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.3s ease',
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `1px solid ${theme.palette.primary.main}`,
    },
}));

const PackageOverview = ({ data }) => (
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
        {data?.overview || "No overview is available for this package."}
    </Typography>
);

const DayWiseItinerary = ({ data }) => {
    if (!data?.dayWise || data.dayWise.length === 0) {
        return <Typography variant="body2" color="text.secondary">Itinerary details not available.</Typography>;
    }
    return (
        <Stack spacing={2}>
            {data.dayWise.map((item) => (
                <Box key={item.day}>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
                        Day {item.day}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                        {item.description}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
};

const InclusionExclusion = ({ data }) => {
    const renderList = (items, type) => (
        items.map((item, index) => (
            <Stack key={`${type}-${index}`} direction="row" alignItems="center" spacing={1.5}>
                <CheckCircleIcon sx={{ color: type === 'inclusion' ? 'success.main' : 'error.main', fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">{item}</Typography>
            </Stack>
        ))
    );

    return (
        <Stack spacing={2.5}>
            <Box>
                <Typography variant="h6" fontWeight={600} fontSize="1rem" gutterBottom>Inclusions</Typography>
                <Stack spacing={1}>
                    {data?.inclusion?.length > 0 ? renderList(data.inclusion, 'inclusion') : <Typography variant="body2" color="text.disabled">Not specified.</Typography>}
                </Stack>
            </Box>
            <Box>
                <Typography variant="h6" fontWeight={600} fontSize="1rem" gutterBottom>Exclusions</Typography>
                <Stack spacing={1}>
                    {data?.exclusion?.length > 0 ? renderList(data.exclusion, 'exclusion') : <Typography variant="body2" color="text.disabled">Not specified.</Typography>}
                </Stack>
            </Box>
        </Stack>
    );
};

const TermsAndCondition = ({ data }) => {
    const getPolicyIcon = (key) => {
        const lowerCaseKey = key.toLowerCase();
        if (lowerCaseKey.includes('cancellation')) return <CancelIcon color="error" />;
        if (lowerCaseKey.includes('refund')) return <PaymentIcon color="success" />;
        if (lowerCaseKey.includes('booking')) return <ReceiptLongIcon color="primary" />;
        return <PolicyIcon color="action" />;
    };
    
    if (!data?.termsAndConditions || Object.keys(data.termsAndConditions).length === 0) {
        return <Typography color="text.secondary">Details not available.</Typography>;
    }
    const terms = data.termsAndConditions;
    const termKeys = Object.keys(terms);
    
    return (
        <Stack spacing={2}>
            {termKeys.map(key => {
                const policyText = terms[key];
                const isNA = !policyText || policyText.trim().toUpperCase() === 'NA';
                return (
                    <Paper key={key} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                            {getPolicyIcon(key)}
                            <Typography variant="subtitle1" fontWeight={600}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color={isNA ? "text.disabled" : "text.secondary"} fontStyle={isNA ? 'italic' : 'normal'}>
                            {isNA ? "Details not available for this policy." : policyText}
                        </Typography>
                    </Paper>
                );
            })}
        </Stack>
    );
};

const TourBookingPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [anchorEl, setAnchorEl] = useState(null);
    const [finalPrice, setFinalPrice] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { showLoader, hideLoader } = useLoader();
    const { travelById } = useSelector((state) => state.travel);
    const gstData = useSelector((state) => state.gst.gst);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const path = window.location.pathname;
    const id = path.split("/").pop();

    useEffect(() => {
        if (id) dispatch(getTravelById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (travelById?.price) dispatch(getGst({ type: "Tour", gstThreshold: travelById.price }));
    }, [dispatch, travelById]);
    
    useEffect(() => {
        travelById ? hideLoader() : showLoader();
    }, [travelById, showLoader, hideLoader]);

    useEffect(() => {
        if (gstData && travelById) {
            setFinalPrice(travelById.price + (travelById.price * gstData.gstPrice / 100));
        }
    }, [gstData, travelById]);
    
    const handleTabChange = useCallback((event, newValue) => setActiveTab(newValue), []);
    const handleDateChange = useCallback((dates) => {
        const [start, end] = dates;
        setDateRange({ startDate: start, endDate: end });
        if (start && end) setAnchorEl(null);
    }, []);

    const handleClickPopover = useCallback((event) => setAnchorEl(event.currentTarget), []);
    const handleClosePopover = useCallback(() => setAnchorEl(null), []);
    const openPopover = Boolean(anchorEl);

    const formatDate = useCallback((date) => date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "Select Date", []);
    
    const handleBooking = async () => {
        if (!userId) return popup("Please log in to book.");
        if (!dateRange.startDate || !dateRange.endDate) return popup("Please select travel dates.");

        const bookingData = { userId, travelId: travelById._id, price: finalPrice || travelById.price, from: dateRange.startDate, to: dateRange.endDate };

        try {
            showLoader();
            const res = await dispatch(bookNow(bookingData)).unwrap();
            popup(`✅ Booking Confirmed! ID: ${res?.bookingId || "N/A"}`);
            setTimeout(() => navigate("/tour-bookings"), 3000);
        } catch (err) {
            popup(`❌ Booking failed: ${err?.message || "An unknown error occurred."}`);
        } finally {
            hideLoader();
        }
    };
    
    if (!travelById) return null;
    
    let themesArray = [];
    if (travelById?.themes) {
        themesArray = Array.isArray(travelById.themes) ? travelById.themes : typeof travelById.themes === 'string' ? travelById.themes.split(',').map(t => t.trim().replace(/^"|"$/g, '')) : [];
    }

    const bookingContent = (
        <Stack spacing={2}>
            <Box>
                <Typography variant="h5" fontWeight={700}>
                    <FaRupeeSign size={20} style={{ marginRight: 4, verticalAlign: 'middle' }}/>
                    {finalPrice?.toFixed(0) || '...'}
                    <Typography variant="body2" component="span" color="text.secondary"> / person</Typography>
                </Typography>
                <Typography variant="caption" color="text.secondary">(Inc. {gstData?.gstPrice}% GST)</Typography>
            </Box>
            <Button fullWidth variant="outlined" onClick={handleClickPopover} startIcon={<CalendarMonthIcon />} sx={{ justifyContent: "space-between", p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" fontWeight="medium">{`${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`}</Typography>
                <Typography variant="body2" color="primary" fontWeight={600}>Change</Typography>
            </Button>
            <Popover open={openPopover} anchorEl={anchorEl} onClose={handleClosePopover} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} PaperProps={{sx: {borderRadius: 4}}}>
                <DatePicker selected={dateRange.startDate} onChange={handleDateChange} startDate={dateRange.startDate} endDate={dateRange.endDate} selectsRange inline />
            </Popover>
            <Button variant="contained" size="large" fullWidth onClick={handleBooking} sx={{ p: 1.5, borderRadius: 2, background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)` }}>Confirm Booking</Button>
        </Stack>
    );

    const tabContent = [
        { label: "Overview", component: <PackageOverview data={travelById} /> },
        { label: "Itinerary", component: <DayWiseItinerary data={travelById} /> },
        { label: "Inclusions", component: <InclusionExclusion data={travelById} /> },
        { label: "Policies", component: <TermsAndCondition data={travelById} /> },
    ];

    return (
        <Box sx={{ paddingTop: { xs: APP_BAR_HEIGHT, md: 0 } }}>
            <PageContainer maxWidth={isMobile ? false : 'lg'}>
                <HeroContainer>
                    {/* Fixed CardMedia size for mobile */}
                    <CardMedia 
                        component="img" 
                        image={travelById.images?.[0]} 
                        sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }} 
                    />
                    <HeroContent>
                        <Typography variant="h4" component="h1" fontWeight="bold" >{travelById.travelAgencyName}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                            <LocationOnIcon fontSize="small" />
                            <Typography variant="body1">{travelById.city}, {travelById.state}</Typography>
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" gap={1} mt={1.5}>
                            {themesArray.slice(0, 3).map((themeTxt, index) => 
                                <MuiChip key={`${themeTxt}-${index}`} label={themeTxt} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(4px)' }}/>
                            )}
                        </Stack>
                        <Button
                            variant="contained"
                            onClick={() => setIsBookingPanelOpen(true)}
                            sx={{
                                mt: 2,
                                display: { xs: 'inline-flex', md: 'none' }, // Only show on mobile
                                alignSelf: 'flex-start'
                            }}
                        >
                            Book Now
                        </Button>
                    </HeroContent>
                </HeroContainer>

                <Grid container spacing={{ xs: 0, md: 5 }} sx={{ mt: { md: 4 } }}>
                    <Grid item xs={12} md={7} lg={8}>
                        <Box sx={{
                            position: { xs: 'sticky', md: 'static' },
                            top: APP_BAR_HEIGHT,
                            zIndex: 10,
                            backgroundColor: theme.palette.background.default,
                            p: { xs: 2, md: 0 },
                            borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },
                            mb: { xs: 2, md: 0 }
                        }}>
                           <PillTabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                                {tabContent.map(tab => <PillTab key={tab.label} label={tab.label} />)}
                            </PillTabs>
                        </Box>
                        <Box sx={{ p: { xs: 2, md: 0 }, pt: 0 }}>
                            {tabContent[activeTab].component}
                        </Box>
                    </Grid>
                    {!isMobile && (
                        <Grid item xs={12} md={5} lg={4}>
                            <BookingCard>{bookingContent}</BookingCard>
                        </Grid>
                    )}
                </Grid>

                <Dialog 
                    open={isBookingPanelOpen} 
                    onClose={() => setIsBookingPanelOpen(false)} 
                    fullWidth 
                    maxWidth="sm"
                    PaperProps={{ sx: { position: 'fixed', bottom: 0, m: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80vh' }}}
                >
                    <DialogTitle>
                        Plan Your Trip
                        <IconButton aria-label="close" onClick={() => setIsBookingPanelOpen(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        {bookingContent}
                    </DialogContent>
                </Dialog>
            </PageContainer>
        </Box>
    );
};

export default TourBookingPage;