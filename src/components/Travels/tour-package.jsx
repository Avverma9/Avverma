import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTravelList } from '../../redux/reducers/travelSlice';
import { useLoader } from '../../utils/loader';
import NotFoundPage from '../../utils/Not-found';
import iconsList from '../../utils/icons';
import Slider from 'react-slider';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Skeleton,
  Chip,
  Stack,
  CardActionArea,
  styled,
  Drawer,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Fab,
  CardActions,
} from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { FaRupeeSign } from 'react-icons/fa';
import InfoIcon from '@mui/icons-material/Info';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[3],
  border: `1px solid ${theme.palette.grey[200]}`,
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.02) translateY(-4px)',
    boxShadow: theme.shadows[15],
  },
}));

const StyledCardActionArea = styled(CardActionArea)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  padding: '16px',
});

const StyledSlider = styled(Slider)(({ theme }) => ({
  width: '100%',
  margin: '16px 0',
  height: '10px',
  '& .thumb': {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: theme.shadows[3],
    top: '50%',
    transform: 'translateY(-50%)',
    border: '2px solid white',
  },
  '& .track': {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.palette.grey[300],
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '& .track.track-1': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const StyledFilterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
}));

const StyledImageContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  height: 200,
});

const StyledCardMedia = styled(CardMedia)({
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const GradientOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
  zIndex: 1,
});

const TravelPackages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { data } = useSelector((state) => state.travel);
  const [loading, setLoading] = useState(true);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(164990);
  const [sortByOrder, setSortByOrder] = useState('asc');
  const [minNights, setMinNights] = useState(2);
  const [maxNights, setMaxNights] = useState(9);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handlePriceChange = useCallback((value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, []);

  const handleNightsChange = useCallback((value) => {
    setMinNights(value[0]);
    setMaxNights(value[1]);
  }, []);

  const handleThemeChange = (event) => {
    const theme = event.target.value;
    setSelectedThemes((prevThemes) =>
      prevThemes.includes(theme) ? prevThemes.filter((t) => t !== theme) : [...prevThemes, theme]
    );
  };

  const handleApplyFilters = useCallback(() => {
    setIsMobileDrawerOpen(false);
    setLoading(true);
    showLoader();
    const filterParams = {
      minPrice,
      maxPrice,
      sortByOrder,
      minNights,
      maxNights,
      themes: selectedThemes,
    };
    dispatch(getTravelList(filterParams)).finally(() => {
      setLoading(false);
      hideLoader();
    });
  }, [dispatch, showLoader, hideLoader, minPrice, maxPrice, sortByOrder, minNights, maxNights, selectedThemes]);

  const handleClearFilters = useCallback(() => {
    setMinPrice(500);
    setMaxPrice(164990);
    setSortByOrder('asc');
    setMinNights(2);
    setMaxNights(9);
    setSelectedThemes([]);
    setIsMobileDrawerOpen(false);
    setLoading(true);
    showLoader();
    dispatch(getTravelList({})).finally(() => {
      setLoading(false);
      hideLoader();
    });
  }, [dispatch, showLoader, hideLoader]);

  useEffect(() => {
    handleApplyFilters();
  }, []);

  const getAmenityIcon = useCallback((amenity) => {
    const iconObj = iconsList.find((icon) => icon.label.toLowerCase() === amenity.toLowerCase());
    return iconObj ? iconObj.icon : <CheckCircleOutlineIcon fontSize="small" />;
  }, []);

  const handleBooking = useCallback((id) => {
    navigate(`/travellers/booking/${id}`);
  }, [navigate]);

  const filterContent = (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-by-label">Sort By Price</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortByOrder}
          label="Sort By Price"
          onChange={(e) => setSortByOrder(e.target.value)}
        >
          <MenuItem value="asc">Low to High</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography gutterBottom>
          Price Range: ₹{minPrice} - ₹{maxPrice}
        </Typography>
        <StyledSlider
          min={500}
          max={164990}
          step={100}
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
        />
      </Box>
      <Box>
        <Typography gutterBottom>
          Duration: {minNights} - {maxNights} Nights
        </Typography>
        <StyledSlider
          min={2}
          max={9}
          step={1}
          value={[minNights, maxNights]}
          onChange={handleNightsChange}
        />
      </Box>
      <Box>
        <Typography variant="body1" fontWeight="bold" mb={1}>
          Themes
        </Typography>
        <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {['Winter', 'Summer', 'Honeymoon', 'Romantic', 'Adventure', 'Beach'].map((theme) => (
            <FormControlLabel
              key={theme}
              control={
                <Checkbox
                  checked={selectedThemes.includes(theme)}
                  onChange={handleThemeChange}
                  value={theme}
                  size="small"
                />
              }
              label={theme}
              sx={{ width: '50%' }}
            />
          ))}
        </FormGroup>
      </Box>
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" color='danger' onClick={handleClearFilters} fullWidth>
          Clear
        </Button>
        <Button variant="contained" onClick={handleApplyFilters} fullWidth>
          Apply
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Filter Sidebar (Desktop) */}
        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <StyledFilterContainer>{filterContent}</StyledFilterContainer>
          </Box>
        </Grid>
        {/* Travel Packages Grid */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h4" gutterBottom fontWeight="bold">
              Discover Your Next Adventure ✈️
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Explore a wide range of travel packages tailored just for you.
            </Typography>
          </Box>
          {loading ? (
            <Grid container spacing={4}>
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <StyledCard>
                    <Skeleton variant="rectangular" height={200} />
                    <StyledCardContent>
                      <Skeleton variant="text" width="90%" height={28} />
                      <Skeleton variant="text" width="50%" />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                        <Skeleton variant="rounded" width={80} height={24} />
                        <Skeleton variant="rounded" width={80} height={24} />
                        <Skeleton variant="rounded" width={80} height={24} />
                      </Box>
                      <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
                    </StyledCardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          ) : !data || data.length === 0 ? (
            <NotFoundPage />
          ) : (
            <Grid container spacing={4}>
              {data.map((pkg) => (
                <Grid item xs={12} sm={6} lg={4} key={pkg._id}>
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <StyledImageContainer>
                        <StyledCardMedia
                          component="img"
                          height="200"
                          image={pkg.images[0] || 'https://via.placeholder.com/400x220?text=No+Image'}
                          alt={pkg.travelAgencyName}
                        />
                      </StyledImageContainer>
                      <GradientOverlay />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          zIndex: 2,
                          display: 'flex',
                          alignItems: 'center',
                          color: 'white',
                        }}
                      >
                        <LocationOnIcon sx={{ mr: 0.5 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                          {pkg.location || 'Unknown Location'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label={`${pkg.nights}N & ${pkg.days}D`}
                          color="primary"
                          size="medium"
                          sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          }}
                        />
                      </Box>
                    </Box>
                    <StyledCardContent>
                      <Typography variant="h6" component="div" fontWeight="bold" lineHeight={1.3}>
                        {pkg.travelAgencyName}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                        {pkg.amenities?.slice(0, 3).map((amenity, idx) => (
                          <Chip
                            key={idx}
                            icon={getAmenityIcon(amenity)}
                            label={amenity}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                        {pkg.amenities?.length > 3 && (
                          <Chip label={`+${pkg.amenities.length - 3} more`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </StyledCardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pt: 0 }}>
                      {pkg.price ? (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Price from
                          </Typography>
                          <Typography variant="h5" color="primary" fontWeight="bold" lineHeight={1}>
                            <Box component="span" display="flex" alignItems="center">
                              <FaRupeeSign fontSize="small" style={{ marginRight: '4px' }} />
                              {pkg.price}
                            </Box>
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="h6" color="text.secondary" fontWeight="bold">
                          Price on request
                        </Typography>
                      )}
                      <Stack direction="row" spacing={1}>
                       
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBooking(pkg._id);
                          }}
                        >
                          Book Now
                        </Button>
                      </Stack>
                    </CardActions>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* Mobile Filter Button */}
      <Box sx={{ display: { md: 'none' }, position: 'fixed', bottom: 75, left: 24, zIndex: 100 }}>
        <Fab color="primary" variant="extended" onClick={() => setIsMobileDrawerOpen(true)}>
          <FilterListIcon sx={{ mr: 1 }} />
          Filter
        </Fab>
      </Box>
      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: '85vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton onClick={() => setIsMobileDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 2 }} />
          {filterContent}
        </Box>
      </Drawer>
    </Container>
  );
};

export default TravelPackages;