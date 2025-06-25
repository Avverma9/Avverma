import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTravelList } from '../../redux/reducers/travelSlice';
import { useLoader } from '../../utils/loader';
import NotFoundPage from '../../utils/Not-found';
import iconsList from '../../utils/icons';

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
} from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Filter from './travel-filter';
import './travel-page.css';
import { FaRupeeSign } from 'react-icons/fa';

const TravelPackages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { data } = useSelector((state) => state.travel);
  const [loading, setLoading] = useState(true);
  const [filterParams, setFilterParams] = useState({});

  const handleApplyFilters = useCallback((filters) => {
    if (JSON.stringify(filters) !== JSON.stringify(filterParams)) {
      setFilterParams(filters);
    }
  }, [filterParams]);

  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      setLoading(true);
      try {
        await dispatch(getTravelList(filterParams));
      } catch (error) {
        console.error('Error fetching travel packages:', error);
      } finally {
        hideLoader();
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, filterParams]);

  const getAmenityIcon = useCallback((amenity) => {
    const iconObj = iconsList.find((icon) => icon.label.toLowerCase() === amenity.toLowerCase());
    return iconObj ? iconObj.icon : <CheckCircleOutlineIcon fontSize="small" />;
  }, []);

  const handleBooking = useCallback((id) => {
    navigate(`/travellers/booking/${id}`);
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Filter onApplyFilters={handleApplyFilters} />

      {loading ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="rectangular" height={180} />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Skeleton variant="text" width="90%" height={25} />
                  <Skeleton variant="text" width="50%" />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={80} height={24} />
                  </Box>
                  <Skeleton variant="text" width="40%" height={25} sx={{ mt: 2 }} />
                  <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : !data || data.length === 0 ? (
        <NotFoundPage />
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {data.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea onClick={() => handleBooking(pkg._id)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={pkg.images[0] || 'https://via.placeholder.com/400x180?text=No+Image'}
                    alt={pkg.travelAgencyName}
                    sx={{ objectFit: 'cover', width: '100%' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2, width: '100%' }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                        {pkg.travelAgencyName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {pkg.location || 'Unknown Location'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <NightsStayIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {pkg?.nights} Nights & {pkg?.days} Days
                      </Typography>
                    </Stack>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1 }}>
                      <Chip label={`${pkg.nights} Nights`} color="primary" size="small" />
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 2 }}>
                      {pkg.price && (
                        <Typography variant="h5" color="primary" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', lineHeight: 1 }}>
                          <FaRupeeSign sx={{ mr: 0.5 }} />
                          {pkg.price}
                        </Typography>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => { e.stopPropagation(); handleBooking(pkg._id); }}
                        size="medium"
                        sx={{ ml: 1 }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TravelPackages;