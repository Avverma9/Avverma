import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { format, isValid } from 'date-fns';
import axios from 'axios';

import {
    AppBar, Box, Button, Container, Paper, Typography, Grid, TextField,
    Divider, Card, CardContent, CardMedia, CardActions, Chip, Skeleton, Stack, Drawer,
    IconButton, Collapse, Grow, InputLabel, Accordion, AccordionSummary, AccordionDetails,
    ToggleButtonGroup, ToggleButton
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
    Search, FilterList, Close, ArrowForward, AcUnit, Luggage,
    LocationOn, Map, ErrorOutline, EventSeat, LocalGasStation, ExpandMore,
    SwapVert, ArrowUpward, ArrowDownward
} from '@mui/icons-material';

import SeatData from './Seats';
import baseURL from '../../utils/baseURL';
import { getAllCars } from '../../redux/reducers/car';
import { useLoader } from '../../utils/loader';

const theme = createTheme({
    palette: {
        primary: { main: '#6C63FF' },
        secondary: { main: '#FF6584' },
        background: { default: '#F4F7FC', paper: '#FFFFFF' },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h3: { fontWeight: 700 },
        h6: { fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: '12px', textTransform: 'none', fontWeight: 600 },
                contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
            },
        },
        MuiPaper: {
            styleOverrides: { root: { boxShadow: '0px 8px 32px rgba(140, 149, 159, 0.15)' } }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { margin: 0 },
                }
            }
        }
    },
});

const ExpandMoreIcon = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest }),
}));

const CarCard = ({ car, onBookNow }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => setExpanded(!expanded);
    const handleCarImage = (carData) => carData?.images?.[0] || "https://placehold.co/600x400/e0e0e0/757575?text=Car";

    return (
        <Card sx={{
            bgcolor: 'background.paper', borderRadius: 5, p: 1, mb: 3, border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
            transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)', boxShadow: '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff' },
        }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <CardMedia component="img" sx={{ width: { xs: '100%', sm: 200 }, height: 180, borderRadius: 4, objectFit: 'cover' }} image={handleCarImage(car)} alt={`${car.make} ${car.model}`} />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, py: 1, pr: 1 }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Box>
                            <Typography variant="h6" component="div">{car.make} {car.model}</Typography>
                            <Stack direction="row" spacing={1} mt={0.5}>
                                <Chip icon={<EventSeat sx={{fontSize: '1rem'}} />} label={`${car.seater} Seater`} size="small" variant="outlined" />
                                <Chip icon={<LocalGasStation sx={{fontSize: '1rem'}} />} label={car.fuelType} size="small" variant="outlined" />
                            </Stack>
                        </Box>
                        <Box textAlign="right">
                            <Typography variant="h5" fontWeight={700} color="primary">₹{car.price.toLocaleString('en-IN')}</Typography>
                            <Typography variant="caption" color="text.secondary">Total price</Typography>
                        </Box>
                    </Stack>
                     <Divider sx={{ my: 1.5 }} />
                     <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                        <LocationOn fontSize="small"/>
                        <Typography variant="body2" fontWeight={500}>{car.pickupP}</Typography>
                        <ArrowForward sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2" fontWeight={500}>{car.dropP}</Typography>
                    </Stack>
                    <CardActions sx={{ p: 0, mt: 'auto', pt: 1}}>
                        <Typography variant="caption" color="success.main" fontWeight={500}>{car.seatConfig?.filter(s => !s.bookedBy).length} seats left</Typography>
                        <ExpandMoreIcon expand={expanded} onClick={handleExpandClick}><ExpandMore /></ExpandMoreIcon>
                        <Button variant="contained" size="medium" onClick={onBookNow}>View Deal</Button>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box sx={{ pt: 2 }}>
                            <Grid container spacing={1.5} color="text.secondary">
                                <Grid item xs={6}><Stack direction="row" spacing={1} alignItems="center"><AcUnit fontSize="small" /><Typography variant="body2">Air Conditioning</Typography></Stack></Grid>
                                <Grid item xs={6}><Stack direction="row" spacing={1} alignItems="center"><Luggage fontSize="small" /><Typography variant="body2">{car.luggage} Luggage</Typography></Stack></Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </Box>
            </Stack>
        </Card>
    );
};
CarCard.propTypes = { car: PropTypes.object.isRequired, onBookNow: PropTypes.func.isRequired };

const CarCardSkeleton = () => (<Paper sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 3, borderRadius: 5, p: 2, bgcolor: '#fff' }}><Skeleton variant="rectangular" animation="wave" sx={{ width: { xs: '100%', sm: 200 }, height: 180, borderRadius: 4 }} /><Box sx={{ flex: 1, ml: { sm: 2 }, mt: { xs: 2, sm: 0 } }}><Skeleton animation="wave" height={30} width="50%" /><Skeleton animation="wave" height={20} width="70%" /><Divider sx={{ my: 2 }} /><Stack direction="row" justifyContent="space-between" alignItems="center"><Skeleton animation="wave" height={40} width="30%" /><Skeleton variant="rounded" animation="wave" width={100} height={40} sx={{borderRadius: 3}} /></Stack></Box></Paper>);
const NoResults = () => (<Paper sx={{ textAlign: 'center', p: { xs: 4, sm: 8 }, borderRadius: 5, bgcolor: '#fff' }}><ErrorOutline sx={{ fontSize: 60, color: 'text.secondary' }} /><Typography variant="h6" mt={2}>No Rides Found</Typography><Typography color="text.secondary">Try adjusting your search to find your perfect ride.</Typography></Paper>);

const SearchFields = ({ searchCriteria, handleCriteriaChange, handleSwapLocations }) => (
    <Grid container  alignItems="center">
        <Grid item xs={12} md={5.5}>
            <InputLabel sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>Locations</InputLabel>
            <Stack direction="row" alignItems="center" spacing={1}>
                <TextField fullWidth placeholder="Leaving from..." value={searchCriteria.pickupP} onChange={(e) => handleCriteriaChange('pickupP', e.target.value)} />
                <IconButton onClick={handleSwapLocations} sx={{ border: '1px solid', borderColor: 'divider' }}><SwapVert /></IconButton>
                <TextField fullWidth placeholder="Going to..." value={searchCriteria.dropP} onChange={(e) => handleCriteriaChange('dropP', e.target.value)} />
            </Stack>
        </Grid>
        <Grid item xs={12} md={6.5}>
            <InputLabel sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>Dates</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={1}>
                    <Grid item xs={6}><DatePicker sx={{width: '100%'}} label="Pickup" value={searchCriteria.fromDate} onChange={(d) => handleCriteriaChange('fromDate', d)} /></Grid>
                    <Grid item xs={6}><DatePicker sx={{width: '100%'}} label="Dropoff" value={searchCriteria.toDate} onChange={(d) => handleCriteriaChange('toDate', d)} /></Grid>
                </Grid>
            </LocalizationProvider>
        </Grid>
    </Grid>
);
SearchFields.propTypes = { searchCriteria: PropTypes.object.isRequired, handleCriteriaChange: PropTypes.func.isRequired, handleSwapLocations: PropTypes.func.isRequired };

const FilterContent = ({ inDrawer = false, searchCriteria, uniqueMakes, uniqueFuelTypes, handleCheckboxChange, handleClearFilters, setFilterDrawerOpen }) => {
    const noFiltersApplied = searchCriteria.make.length === 0 && searchCriteria.fuelType.length === 0;
    return (
        <Box sx={{ p: inDrawer ? 2 : 0, width: inDrawer ? 280 : 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: inDrawer ? 1 : 0, px: inDrawer ? 0 : 2, pt: inDrawer ? 0 : 2 }}>
                <Typography variant="h6">Filters</Typography>
                <Box>
                    <Button variant="text" size="small" onClick={handleClearFilters} disabled={noFiltersApplied}>Clear All</Button>
                    {inDrawer && <IconButton onClick={() => setFilterDrawerOpen(false)}><Close /></IconButton>}
                </Box>
            </Stack>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}><Typography fontWeight={600}>Car Make</Typography></AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                        {uniqueMakes.map(m => <Chip key={m} label={m} onClick={() => handleCheckboxChange('make', m)} variant={searchCriteria.make.includes(m) ? 'filled' : 'outlined'} color={searchCriteria.make.includes(m) ? 'primary' : 'default'} />)}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}><Typography fontWeight={600}>Fuel Type</Typography></AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                        {uniqueFuelTypes.map(f => <Chip key={f} label={f} onClick={() => handleCheckboxChange('fuelType', f)} variant={searchCriteria.fuelType.includes(f) ? 'filled' : 'outlined'} color={searchCriteria.fuelType.includes(f) ? 'primary' : 'default'} />)}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
};
FilterContent.propTypes = {
    inDrawer: PropTypes.bool, searchCriteria: PropTypes.object.isRequired, uniqueMakes: PropTypes.array.isRequired,
    uniqueFuelTypes: PropTypes.array.isRequired, handleCheckboxChange: PropTypes.func.isRequired,
    handleClearFilters: PropTypes.func.isRequired, setFilterDrawerOpen: PropTypes.func
};

const CarsPage = () => (<ThemeProvider theme={theme}><Cars /></ThemeProvider>);

const Cars = () => {
    const dispatch = useDispatch();
    const { showLoader, hideLoader, isLoading } = useLoader();
    const [carData, setCarData] = useState([]);
    const [uniqueMakes, setUniqueMakes] = useState([]);
    const [uniqueFuelTypes, setUniqueFuelTypes] = useState([]);
    const [initialSearchState] = useState({ pickupP: '', dropP: '', fromDate: null, toDate: null, make: [], fuelType: [] });
    const [searchCriteria, setSearchCriteria] = useState(initialSearchState);
    const [openSeatData, setOpenSeatData] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [sortBy, setSortBy] = useState('price_asc');
    const isInitialMount = useRef(true);

    const handleSearch = useCallback(async (criteria) => {
        showLoader();
        setIsSearchExpanded(false);
        try {
            const params = new URLSearchParams();
            Object.entries(criteria).forEach(([key, value]) => {
                if(value) {
                    if (Array.isArray(value) && value.length > 0) value.forEach(v => params.append(key, v));
                    else if (key.includes('Date') && isValid(value)) params.append(key, format(value, 'yyyy-MM-dd'));
                    else if (typeof value === 'string' && value.trim() !== '' && !key.includes('Date')) params.append(key, value);
                }
            });
            const response = await axios.get(`${baseURL}/travel/filter-car/by-query?${params.toString()}`);
            setCarData(response.data);
        } catch (error) { console.error('Search failed:', error); setCarData([]); } 
        finally { hideLoader(); }
    }, [dispatch]);

    useEffect(() => {
        const fetchInitialData = async () => {
            showLoader();
            try {
                const response = await dispatch(getAllCars());
                const allCars = response.payload || [];
                setCarData(allCars);
                setUniqueMakes(Array.from(new Set(allCars.map(c => c.make))));
                setUniqueFuelTypes(Array.from(new Set(allCars.map(c => c.fuelType))));
            } catch (error) { console.error("Initial fetch failed:", error); } 
            finally { hideLoader(); }
        };
        fetchInitialData();
    }, [dispatch]);
    
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const handler = setTimeout(() => {
            handleSearch(searchCriteria);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchCriteria.make, searchCriteria.fuelType]);

    const sortedCarData = useMemo(() => {
        return [...carData].sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            return 0;
        });
    }, [carData, sortBy]);
    
    const handleCriteriaChange = (field, value) => setSearchCriteria(prev => ({ ...prev, [field]: value }));
    const handleCheckboxChange = (key, value) => {
        setSearchCriteria(prev => {
            const currentValues = prev[key];
            const newValues = currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];
            return { ...prev, [key]: newValues };
        });
    };
    
    const handleClearFilters = useCallback(async () => {
        showLoader();
        isInitialMount.current = true; // Prevent debounced search from firing
        try {
            setSearchCriteria(initialSearchState);
            const response = await dispatch(getAllCars());
            setCarData(response.payload || []);
        } catch (error) {
            console.error("Failed to clear filters and re-fetch all cars:", error);
        } finally {
            hideLoader();
            setTimeout(() => { isInitialMount.current = false; }, 100); // Re-enable after a short delay
        }
    }, [dispatch, initialSearchState]);
    
    const handleSwapLocations = () => setSearchCriteria(prev => ({...prev, pickupP: prev.dropP, dropP: prev.pickupP}));
    const handleSeatDataOpen = (car) => { setSelectedCar(car); setOpenSeatData(true); };
    const handleSeatDataClose = () => { setOpenSeatData(false); setSelectedCar(null); };
    const handleSortChange = (event, newSortBy) => { if(newSortBy !== null) setSortBy(newSortBy); };

    return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'linear-gradient(135deg, #7F72FF 0%, #6C63FF 100%)', pt: { xs: 4, md: 6 }, pb: { xs: 4, md: 6 }, borderRadius: '0 0 40px 40px', transition: 'padding-bottom 0.3s ease-in-out' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" color="white" textAlign="center" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' } }}>Find Your Perfect Ride</Typography>
                <Typography variant="h6" component="p" color="white" fontWeight={300} textAlign="center" mt={1} mb={4} sx={{ opacity: 0.8 }}>Seamless travel, unbeatable prices.</Typography>
                <Paper sx={{ p: 2, borderRadius: 4, display: { xs: 'none', md: 'block' }, mt: 4 }}>
                    <Stack direction="row" spacing={1} alignItems="flex-end">
                        <Box flexGrow={1}><SearchFields searchCriteria={searchCriteria} handleCriteriaChange={handleCriteriaChange} handleSwapLocations={handleSwapLocations} /></Box>
                        <Button variant="contained" onClick={() => handleSearch(searchCriteria)} sx={{ height: 56, px: 3, borderRadius: 3 }}><Search /></Button>
                    </Stack>
                </Paper>
                <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
                    <Paper onClick={() => setIsSearchExpanded(!isSearchExpanded)} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 4, cursor: 'pointer', bgcolor: 'background.paper', color: 'text.secondary' }}>
                        <Search sx={{ mr: 1.5 }} /><Typography fontWeight={500} noWrap>{searchCriteria.pickupP ? `${searchCriteria.pickupP} → ${searchCriteria.dropP}` : 'Search for a ride...'}</Typography>
                    </Paper>
                    <Collapse in={isSearchExpanded}>
                        <Paper sx={{ p: 2, mt: 1, borderRadius: 4 }}>
                           <Stack spacing={2}>
                             <SearchFields searchCriteria={searchCriteria} handleCriteriaChange={handleCriteriaChange} handleSwapLocations={handleSwapLocations}/>
                             <Button fullWidth variant="contained" size="large" onClick={() => handleSearch(searchCriteria)} startIcon={<Search />}>Search Cars</Button>
                           </Stack>
                        </Paper>
                    </Collapse>
                </Box>
            </Container>
        </AppBar>
        
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Paper sx={{ borderRadius: 5, position: 'sticky', top: 20 }}>
                        <FilterContent searchCriteria={searchCriteria} uniqueMakes={uniqueMakes} uniqueFuelTypes={uniqueFuelTypes} handleCheckboxChange={handleCheckboxChange} handleClearFilters={handleClearFilters} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2, px: 2, py: 1, bgcolor: 'background.paper', borderRadius: 4 }}>
                        <Typography variant="h6" fontWeight={600}>{isLoading ? 'Searching...' : `${sortedCarData.length} Rides Available`}</Typography>
                        <ToggleButtonGroup value={sortBy} exclusive onChange={handleSortChange} aria-label="sort by price">
                            <ToggleButton value="price_asc" aria-label="price low to high">Price <ArrowUpward fontSize="small" sx={{ml: 0.5}} /></ToggleButton>
                            <ToggleButton value="price_desc" aria-label="price high to low">Price <ArrowDownward fontSize="small" sx={{ml: 0.5}} /></ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    {isLoading ? ([...Array(3)].map((_, i) => <CarCardSkeleton key={i} />)
                    ) : sortedCarData.length > 0 ? (
                        sortedCarData.map((car, index) => (
                            <Grow in={true} key={car._id} timeout={index * 200 + 300}>
                                <div><CarCard car={car} onBookNow={() => handleSeatDataOpen(car)} /></div>
                            </Grow>
                        ))
                    ) : ( <NoResults /> )}
                </Grid>
            </Grid>
        </Container>
        
        <Drawer anchor="left" open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} PaperProps={{ sx: { borderTopRightRadius: 20, borderBottomRightRadius: 20 } }}>
            <FilterContent inDrawer={true} setFilterDrawerOpen={setFilterDrawerOpen} searchCriteria={searchCriteria} uniqueMakes={uniqueMakes} uniqueFuelTypes={uniqueFuelTypes} handleCheckboxChange={handleCheckboxChange} handleClearFilters={handleClearFilters} />
        </Drawer>
        {selectedCar && <SeatData open={openSeatData} onClose={handleSeatDataClose} id={selectedCar._id} carData={selectedCar} />}
    </Box>
    );
};

export default CarsPage;