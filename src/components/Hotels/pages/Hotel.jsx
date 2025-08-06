import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Chip,
    Divider,
    Stack,
    Skeleton,
    Container,
    Tooltip,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import baseURL from '../../../utils/baseURL';
import amenityIcons from '../../../utils/extrasList';
import { userId } from '../../../utils/Unauthorized';
import NotFoundPage from '../../../utils/Not-found';
import FilterSidebar from '../FilterSidebar'; // For mobile floating button
import Filterbar from '../Filterbar'; // For static desktop sidebar

import { useSelector, useDispatch } from 'react-redux';
import { getGst } from '../../../redux/reducers/gstSlice';

// --- Helper Components ---

const HotelCardSkeleton = () => (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Skeleton variant="rectangular" sx={{ width: { xs: '100%', md: 300 }, height: 250 }} />
        <Grid container>
            <Grid item xs={12} md={7}><CardContent sx={{ p: { xs: 2, md: 3 } }}><Skeleton variant="text" width="80%" height={40} /><Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} /><Skeleton variant="text" width="30%" height={30} sx={{ mt: 2 }} /><Stack direction="row" spacing={1} sx={{ mt: 2 }}><Skeleton variant="rectangular" width={50} height={20} /><Skeleton variant="rectangular" width={50} height={20} /><Skeleton variant="rectangular" width={50} height={20} /></Stack></CardContent></Grid>
            <Grid item xs={12} md={5}><Box sx={{ p: { xs: 2, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' } }}><Skeleton variant="text" width="50%" height={40} /><Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }}/><Skeleton variant="rectangular" width={150} height={45} sx={{ mt: 2, borderRadius: '50px' }} /></Box></Grid>
        </Grid>
    </Card>
);

// --- Main Hotel Component ---

const Hotel = () => {
    const [hotelData, setHotelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const prevQueryRef = useRef(location.search);
    
    const dispatch = useDispatch();
    const gstData = useSelector((state) => state.gst.gst);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const fetchData = useCallback(async (currentPage, currentQuery) => {
        if (!hasMore && currentPage > 1) return;
        setLoading(true);
        try {
            const params = new URLSearchParams(currentQuery);
            params.set('page', currentPage);
            const apiUrl = `${baseURL}/hotels/filters?${params.toString()}`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            
            setHotelData(prev => currentPage === 1 ? data.data : [...prev, ...data.data]);
            setHasMore(currentPage < data.totalPages);

            if (data.data?.length > 0) {
                const allRoomPrices = data.data.flatMap(hotel => hotel.rooms?.map(room => room.price) || []);
                if (allRoomPrices.length > 0) {
                    const maxRoomPrice = Math.max(...allRoomPrices);
                    dispatch(getGst({ type: "Hotel", gstThreshold: maxRoomPrice }));
                }
            }
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, hasMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500 || loading || !hasMore || hotelData.length === 0) {
                return;
            }
            setPage(prevPage => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, hotelData.length]);

    useEffect(() => {
        const currentQuery = location.search;
        if (prevQueryRef.current !== currentQuery) {
            setHotelData([]);
            setPage(1);
            setHasMore(true);
            fetchData(1, currentQuery);
        } else {
            fetchData(page, currentQuery);
        }
        prevQueryRef.current = currentQuery;
    }, [page, location.search, fetchData]);


    const handleBuy = (hotelID) => navigate(`/book-hotels/${userId}/${hotelID}`);

    const calculateGstAmount = (price) => {
        if (gstData && price >= gstData.gstMinThreshold && price <= gstData.gstMaxThreshold) {
            return (price * gstData.gstPrice) / 100;
        }
        return 0;
    };

    const paths = ['/search/hotels', '/search'];
    if (!paths.includes(location.pathname)) return null;

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Box sx={{ position: 'sticky', top: 80 }}>
                         <Filterbar />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    {hotelData.length === 0 && loading ? (
                        Array.from(new Array(5)).map((_, index) => <HotelCardSkeleton key={index} />)
                    ) : hotelData.length > 0 ? (
                        <>
                            {hotelData.map((hotel, index) => {
                                const minPriceRoom = hotel.rooms?.length > 0 ? hotel.rooms.reduce((min, room) => parseFloat(room.price) < parseFloat(min.price) ? room : min) : null;
                                const minPrice = minPriceRoom ? parseFloat(minPriceRoom.price) : 0;
                                const gstAmount = calculateGstAmount(minPrice);
                                const totalPrice = minPrice + gstAmount;

                                return (
                                    <Card key={`${hotel.hotelId}-${index}`} sx={{ position: 'relative', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.12)' } }}>
                                        {minPriceRoom?.isOffer && (
                                            <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
                                                <Chip icon={<LocalOfferIcon />} label={minPriceRoom.offerName} color="error" size="small" sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}/>
                                            </Box>
                                        )}
                                        <CardMedia component="img" sx={{ width: { xs: '100%', md: 300 }, height: 250, objectFit: 'cover' }} image={hotel?.images?.[0] || 'https://via.placeholder.com/300x250'} alt={hotel.hotelName} />
                                        <Grid container>
                                            <Grid item xs={12} md={7}>
                                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                                    <Typography variant="h5" component="h2" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>{hotel.hotelName}</Typography>
                                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, color: 'text.secondary' }}><LocationOnIcon fontSize="small" /><Typography variant="body2">{`${hotel.landmark}, ${hotel.city}`}</Typography></Stack>
                                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.5 }}><Chip icon={<StarIcon />} label={`${hotel.starRating || 'N/A'} / 5`} color="warning" size="small" /><Typography variant="body2" color="text.secondary">{`${hotel.reviewCount || 0} Reviews`}</Typography></Stack>
                                                    <Divider sx={{ my: 2 }} />
                                                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Amenities:</Typography>
                                                    <Grid container spacing={1}>
                                                        {hotel.amenities?.flatMap(a => a.amenities).slice(0, 4).map((amenity, i) => (
                                                            <Grid item key={i}><Tooltip title={amenity} arrow><Chip icon={amenityIcons[amenity] || <CheckCircleIcon />} label={amenity} variant="outlined" size="small" /></Tooltip></Grid>
                                                        ))}
                                                    </Grid>
                                                </CardContent>
                                            </Grid>
                                            <Grid item xs={12} md={5} sx={{ borderLeft: { md: '1px solid #eee' } }}>
                                                <Box sx={{ p: { xs: 2, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' }, textAlign: { xs: 'left', md: 'center' } }}>
                                                    <Typography variant="h4" fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>₹{totalPrice.toFixed(0)}<Typography variant="body2" component="span" color="text.secondary">/night</Typography></Typography>
                                                    <Typography variant="caption" color="text.secondary">(Incl. GST ₹{gstAmount.toFixed(0)})</Typography>
                                                    <Button variant="contained" size={isMobile ? 'medium' : 'large'} onClick={() => handleBuy(hotel.hotelId)} sx={{ mt: 2, borderRadius: '50px', px: 4, fontWeight: 'bold' }}>View Details</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                );
                            })}
                            {loading && <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}><CircularProgress /></Box>}
                        </>
                    ) : (
                        <NotFoundPage />
                    )}
                </Grid>
            </Grid>
            <FilterSidebar />
        </Container>
    );
};

export default Hotel;
