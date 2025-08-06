import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Paper, Slider, Typography, FormControlLabel, Checkbox, Stack, Button,
    useMediaQuery, Drawer, Grid, CircularProgress, Divider, Container, Fab, FormGroup,
    Collapse, ButtonGroup
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaBed, FaBuilding, FaStar, FaCheckCircle } from 'react-icons/fa';
import { BiSolidOffer } from 'react-icons/bi';
import { MdOutlineRoomService, MdRoom } from "react-icons/md";
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconContext } from 'react-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useLoader } from '../../../utils/loader';
import baseURL from '../../../utils/baseURL';
import amenityIcons, { propertyTypes, starRatings } from '../../../utils/extrasList';
import { userId } from '../../../utils/Unauthorized';
import NotFoundPage from '../../../utils/Not-found';
import { getGst } from '../../../redux/reducers/gstSlice';
import { useBedTypes } from '../../../utils/additional-fields/bedTypes';
import { useRoomTypes } from '../../../utils/additional-fields/roomTypes';

const HotelPageContent = () => {
    const [hotelData, setHotelData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    
    const [filters, setFilters] = useState({
        minPrice: 400, maxPrice: 10000, starRating: '',
        amenities: [], type: [], bedTypes: [], propertyType: [],
    });

    const [expandedFilters, setExpandedFilters] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const gstData = useSelector((state) => state.gst.gst);

    const bedTypes = useBedTypes();
    const roomTypes = useRoomTypes();
    const amenityItems = Object.entries(amenityIcons).map(([name, icon]) => ({ name, icon }));
    
    const observer = useRef();
    const lastHotelElementRef = useCallback(node => {
        if (isLoading || isFetchingMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingMore, hasMore]);
    
    const fetchData = useCallback(async () => {
        if (page === 1) setIsLoading(true); else setIsFetchingMore(true);
        
        const params = new URLSearchParams(location.search);
        params.set('page', String(page));
        params.set('limit', '5');
        const apiUrl = `${baseURL}/hotels/filters?${params.toString()}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            
            setHotelData(prevData => page === 1 ? data.data : [...prevData, ...data.data]);
            setTotalPages(data.totalPages);
            setHasMore(data.data.length > 0 && page < data.totalPages);

            if (data.data?.length > 0) {
                const maxRoomPrice = Math.max(...data.data.flatMap(h => h.rooms?.map(r => r.price) || [0]));
                if (maxRoomPrice) dispatch(getGst({ type: "Hotel", gstThreshold: maxRoomPrice }));
            }
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        } finally {
            if (page === 1) setIsLoading(false); else setIsFetchingMore(false);
        }
    }, [location.search, page, dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setFilters({
            minPrice: Number(params.get('minPrice')) || 400,
            maxPrice: Number(params.get('maxPrice')) || 10000,
            starRating: params.get('starRating') || '',
            amenities: params.getAll('amenities') || [],
            type: params.getAll('type') || [],
            bedTypes: params.getAll('bedTypes') || [],
            propertyType: params.getAll('propertyType') || [],
        });
        setPage(1);
        setHotelData([]);
        setHasMore(true);
    }, [location.search]);

    useEffect(() => {
        fetchData();
    }, [page, location.search]);

    const applyFilters = (newFilters) => {
        const params = new URLSearchParams();
        if (newFilters.minPrice !== 400) params.set('minPrice', String(newFilters.minPrice));
        if (newFilters.maxPrice !== 10000) params.set('maxPrice', String(newFilters.maxPrice));
        if (newFilters.starRating) params.set('starRating', newFilters.starRating);
        newFilters.amenities.forEach(a => params.append('amenities', a));
        newFilters.type.forEach(t => params.append('type', t));
        newFilters.bedTypes.forEach(b => params.append('bedTypes', b));
        newFilters.propertyType.forEach(p => params.append('propertyType', p));
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    const handleFilterChange = (filterName, value, isMultiSelect = false) => {
        const newFilters = { ...filters };
        if (isMultiSelect) {
            const currentValues = newFilters[filterName];
            newFilters[filterName] = currentValues.includes(value) ? currentValues.filter(item => item !== value) : [...currentValues, value];
        } else {
            newFilters[filterName] = newFilters[filterName] === value ? '' : value;
        }
        applyFilters(newFilters);
    };
    
    const handleClearFilters = () => applyFilters({ minPrice: 400, maxPrice: 10000, starRating: '', amenities: [], type: [], bedTypes: [], propertyType: [] });
    const handleBuy = (hotelID) => navigate(`/book-hotels/${userId}/${hotelID}`);
    const calculateGstAmount = (price) => (gstData && price >= gstData.gstMinThreshold && price <= gstData.gstMaxThreshold) ? (price * gstData.gstPrice) / 100 : 0;
    const toggleFilterExpansion = (key) => setExpandedFilters(prev => ({...prev, [key]: !prev[key]}));
    
    const renderFilters = () => (
        <Paper elevation={0} sx={{ p: {xs: 2, md: 3}, height: '100%', overflowY: 'auto', bgcolor: '#f9fafb', borderRadius: 4 }}>
            <Stack spacing={3} divider={<Divider flexItem />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">Filters</Typography>
                    <Button variant="text" color="secondary" onClick={handleClearFilters} sx={{ textTransform: 'none' }}>Clear All</Button>
                </Box>
                <Box>
                    <Typography fontWeight="bold" gutterBottom>Price Range</Typography>
                    <Slider value={[filters.minPrice, filters.maxPrice]}
                        onChange={(e, val) => setFilters(prev => ({...prev, minPrice: val[0], maxPrice: val[1]}))}
                        onChangeCommitted={() => applyFilters(filters)}
                        valueLabelDisplay="auto" min={400} max={10000} step={100} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2">₹{filters.minPrice}</Typography><Typography variant="body2">₹{filters.maxPrice}</Typography></Box>
                </Box>
                <Box>
                    <Typography fontWeight="bold" gutterBottom>Hotel Rating</Typography>
                    <ButtonGroup fullWidth variant="outlined">
                        {starRatings.map(r => (<Button key={r} onClick={() => handleFilterChange('starRating', r)} variant={String(filters.starRating) === String(r) ? "contained" : "outlined"}>{r}★</Button>))}
                    </ButtonGroup>
                </Box>
                <FilterCollapseGroup title="Amenities" filterKey="amenities" items={amenityItems} onChange={(val) => handleFilterChange('amenities', val, true)} />
                <FilterCollapseGroup title="Property Type" filterKey="propertyType" items={propertyTypes.map(p => ({ name: p, icon: <FaBuilding /> }))} onChange={(val) => handleFilterChange('propertyType', val, true)} />
                <FilterCollapseGroup title="Room Type" filterKey="type" items={roomTypes.map(r => ({...r, icon: <MdOutlineRoomService/>}))} onChange={(val) => handleFilterChange('type', val, true)} />
                <FilterCollapseGroup title="Bed Type" filterKey="bedTypes" items={bedTypes.map(b => ({...b, icon: <FaBed/>}))} onChange={(val) => handleFilterChange('bedTypes', val, true)} />
            </Stack>
        </Paper>
    );

    const FilterCollapseGroup = ({ title, filterKey, items, onChange }) => {
        const isExpanded = !!expandedFilters[filterKey];
        const visibleCount = 5;
        return (
            <Box>
                <Typography fontWeight="bold" gutterBottom>{title}</Typography>
                <FormGroup>
                    {items.slice(0, visibleCount).map(item => (
                        <FormControlLabel key={item.name} control={<Checkbox size="small" value={item.name} checked={filters[filterKey].includes(item.name)} onChange={() => onChange(item.name)}/>} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IconContext.Provider value={{size: '1.1em'}}>{item.icon}</IconContext.Provider>{item.name}</Box>}/>
                    ))}
                </FormGroup>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <FormGroup>
                    {items.slice(visibleCount).map(item => (
                        <FormControlLabel key={item.name} control={<Checkbox size="small" value={item.name} checked={filters[filterKey].includes(item.name)} onChange={() => onChange(item.name)}/>} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IconContext.Provider value={{size: '1.1em'}}>{item.icon}</IconContext.Provider>{item.name}</Box>}/>
                    ))}
                    </FormGroup>
                </Collapse>
                {items.length > visibleCount && (<Button size="small" onClick={() => toggleFilterExpansion(filterKey)} sx={{mt: 1}}>{isExpanded ? 'Show Less' : `Show ${items.length - visibleCount} More`}</Button>)}
            </Box>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            {isMobile && <Fab color="dark" sx={{ position: 'fixed', bottom: 65, left: 16, zIndex: 1000 }} onClick={() => setMobileFiltersOpen(true)}><FilterListIcon /></Fab>}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {!isMobile && <Box sx={{ width: '300px', flexShrink: 0, position: 'sticky', top: 80, height: 'calc(100vh - 100px)' }}>{renderFilters()}</Box>}
                <Drawer anchor="left" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
                    <Box sx={{ width: '300px', overflowY: 'auto' }}>{renderFilters()}</Box>
                </Drawer>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    {isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress size={50} /></Box>
                     : hotelData.length > 0 ? (
                        <Stack spacing={3}>
                            {hotelData.map((hotel, index) => {
                                const minPriceRoom = hotel.rooms?.length > 0 ? hotel.rooms.reduce((min, room) => parseFloat(room.price) < parseFloat(min.price) ? room : min) : null;
                                const minPrice = minPriceRoom ? parseFloat(minPriceRoom.price) : 0;
                                const gstAmount = calculateGstAmount(minPrice);
                                const allAmenities = hotel.amenities?.flatMap(a => a.amenities) || [];
                                const cardRef = hotelData.length === index + 1 ? lastHotelElementRef : null;

                                return (
                                    <Paper ref={cardRef} elevation={4} key={`${hotel.hotelId}-${index}`} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                                        <Grid container>
                                            <Grid item xs={12} sm={4}><Box sx={{ position: 'relative', width: '100%', height: { xs: 220, sm: 280 } }}>
                                                <Box component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} src={hotel?.images?.[0] || 'https://via.placeholder.com/400x280'} alt={hotel.hotelName} />
                                                {minPriceRoom?.isOffer && (<Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'error.main', color: 'white', px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.8rem', fontWeight: 'bold' }}><BiSolidOffer style={{ verticalAlign: 'middle', marginRight: 4 }} />{minPriceRoom.offerName}</Box>)}
                                            </Box></Grid>
                                            <Grid item xs={12} sm={5} sx={{ p: { xs: 2, sm: 3 } }}><Stack spacing={1.5}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="h5" component="div" fontWeight="bold">{hotel.hotelName}</Typography>
                                                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5, bgcolor: 'success.main', color: 'white', px: 1, borderRadius: 1 }}>{hotel.starRating || 'N/A'} <FaStar size="0.8em"/></Box>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MdRoom /> {`${hotel.landmark}, ${hotel.city}`}</Typography>
                                                <Divider />
                                                <Grid container spacing={1}>{allAmenities.slice(0, 4).map((amenity, i) => (<Grid item xs={12} sm={6} key={i}><Typography variant="body2" sx={{display:'flex', alignItems: 'center', gap: 1}}><FaCheckCircle color={theme.palette.success.main} /> {amenity}</Typography></Grid>))}</Grid>
                                            </Stack></Grid>
                                            <Grid item xs={12} sm={3} sx={{ p: { xs: 2, sm: 3 }, textAlign: { xs: 'left', sm: 'right' }, display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, justifyContent: 'space-between', alignItems: 'center', borderTop: { xs: '1px solid #f0f0f0', sm: 'none' }, borderLeft: { xs: 'none', sm: '1px solid #f0f0f0' }, bgcolor: { sm: '#fafafa' } }}>
                                                <Box><Typography variant="h5" fontWeight="bold">₹{(minPrice + gstAmount).toFixed(0)}</Typography><Typography variant="caption" color="text.secondary">per night (incl. GST)</Typography></Box>
                                                <Button variant="contained" onClick={() => handleBuy(hotel.hotelId)} sx={{ mt: { sm: 1.5 }, py: { sm: 1.5 }, minWidth: '120px' }}>View Details</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    ) : <NotFoundPage />}
                    {isFetchingMore && <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress /></Box>}
                </Box>
            </Box>
        </Container>
    );
};

const Hotel = () => {
    const location = useLocation();
    const validPaths = ['/search/hotels', '/search'];
    if (!validPaths.includes(location.pathname)) {
        return null;
    }
    return <HotelPageContent />;
};

export default Hotel;