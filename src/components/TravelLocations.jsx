import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocation } from '../redux/reducers/locationSlice';

// --- MUI Imports ---
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useLoader } from '../utils/loader';

export default function HeaderTravel ()  {
    const location = useLocation();
    const dispatch = useDispatch();
    const { data: locations, loading, error } = useSelector((state) => state.location);
    const scrollContainerRef = useRef(null);
    const [showNav, setShowNav] = useState({ left: false, right: false });
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            try {
                await dispatch(fetchLocation()).unwrap();
            } catch (err) {
                // Handle error if needed
            } finally {
                hideLoader();
            }
        };

        if (!locations || locations.length === 0) {
            fetchData();
        }
    }, [dispatch, locations, showLoader, hideLoader]);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
            const isAtStart = scrollLeft === 0;
            const canScroll = scrollWidth > clientWidth;

            setShowNav({
                left: !isAtStart && canScroll,
                right: !isAtEnd && canScroll
            });
        }
    };
    
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const resizeObserver = new ResizeObserver(handleScroll);
            resizeObserver.observe(container);
            container.addEventListener('scroll', handleScroll, { passive: true });
            return () => {
                resizeObserver.unobserve(container);
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [locations]);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -container.clientWidth * 0.8 : container.clientWidth * 0.8;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const allowedPaths = ['/search/hotels', '/search', '/', '/travellers'];
    if (!allowedPaths.includes(location.pathname)) {
        return null;
    }

    if (error) {
        return <Typography color="error" sx={{ my: 2, textAlign: 'center' }}>Error: {error}</Typography>;
    }

    return (
        <Box sx={{ position: 'relative', py: { xs: 1.5, sm: 2 }, my: 1, px: { xs: 2, sm: 3 } }}>
            {/* Left Navigation Arrow */}
            {showNav.left && (
                <IconButton
                    onClick={() => scroll('left')}
                    size="small"
                    sx={{
                        position: 'absolute', // Positioned relative to the parent Box
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)',
                        color: 'text.secondary',
                        '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            color: 'text.primary'
                        },
                        // Adding a small circle for better visibility on complex backgrounds
                        '&::before': {
                          content: '""', position: 'absolute', width: 32, height: 32,
                          borderRadius: '50%', bgcolor: 'background.paper', zIndex: -1,
                          boxShadow: 1,
                        }
                    }}
                >
                    <ChevronLeft sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </IconButton>
            )}

            {/* Scrollable Location List */}
            <Box
                ref={scrollContainerRef}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none'
                }}
            >
                <Stack
                    direction="row"
                    spacing={{ xs: 2.5, sm: 4 }}
                    sx={{ px: { xs: 1, sm: 2 } }}
                > 
                    {loading
                        ? Array.from({ length: 12 }).map((_, index) => (
                              <Stack key={index} spacing={1} alignItems="center">
                                  <Skeleton variant="circular" sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 } }} />
                                  <Skeleton variant="text" sx={{ width: { xs: 50, sm: 60 } }} />
                              </Stack>
                          ))
                        : locations?.map((loc) => (
                              <Link to={`/search?search=${loc.location}`} key={loc.location} style={{ textDecoration: 'none', color: 'inherit' }}>
                                  <Stack 
                                    spacing={1} 
                                    alignItems="center" 
                                    sx={{
                                      minWidth: { xs: '65px', sm: '80px' },
                                      '&:hover': {
                                          '& .MuiAvatar-root': { transform: 'scale(1.08)', boxShadow: 3 },
                                          '& .MuiTypography-root': { color: 'primary.main' }
                                      },
                                      transition: 'all 0.2s ease-in-out',
                                  }}>
                                      <Avatar
                                          src={loc.images[0]}
                                          alt={loc.location}
                                          sx={{
                                              width: { xs: 60, sm: 80 },
                                              height: { xs: 60, sm: 80 },
                                              border: '2px solid #e0e0e0',
                                              transition: 'transform 0.2s, box-shadow 0.2s'
                                          }}
                                      />
                                      <Typography variant="caption" fontWeight="medium" noWrap>
                                          {loc?.location === 'Uttar Pradesh' ? 'UP' : loc?.location}
                                      </Typography>
                                  </Stack>
                              </Link>
                          ))}
                </Stack>
            </Box>

            {/* Right Navigation Arrow */}
            {showNav.right && (
                <IconButton
                    onClick={() => scroll('right')}
                    size="small"
                    sx={{ 
                        position: 'absolute', // Positioned relative to the parent Box
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)',
                        color: 'text.secondary',
                        '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            color: 'text.primary'
                        },
                        '&::before': {
                          content: '""', position: 'absolute', width: 32, height: 32,
                          borderRadius: '50%', bgcolor: 'background.paper', zIndex: -1,
                          boxShadow: 1,
                        }
                    }}
                >
                    <ChevronRight sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </IconButton>
            )}
        </Box>
    );
};

