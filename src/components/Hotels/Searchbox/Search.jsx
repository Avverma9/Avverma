import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  Grid,
  Button,
  Tooltip,
  Typography,
  Paper,
  Container
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().toISOString().split("T")[0];

  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [data, setData] = useState({
    search: "",
    checkInDate: today,
    checkOutDate: today,
    countRooms: 1,
    guests: 2,
    latitude: "",
    longitude: ""
  });

  if (location.pathname !== "/") return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const handleSearch = () => {
    const qs = Object.entries(data)
      .filter(([, v]) => v !== "")
      .map(([k, v]) => k + "=" + encodeURIComponent(v))
      .join("&");
    navigate("/search?" + qs);
  };

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude
          );
          const json = await res.json();
          const name =
            json.address.city ||
            json.address.town ||
            json.address.village ||
            "Current Location";
          setData((p) => ({ ...p, search: name }));
        } catch {}
        setFetchingLocation(false);
      },
      () => setFetchingLocation(false)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 0.5, sm: 1 } }}>
      {/* Compact Header for Mobile */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 1, md: 2 },
          mt: { xs: 1, md: 2 }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.3rem', md: '2rem' },
            mb: { xs: 0.5, md: 1 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5
          }}
        >
          <TravelExploreIcon sx={{ fontSize: { xs: '1.3rem', md: '2rem' }, color: '#667eea' }} />
          Start Your Journey
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#6b7280',
            fontWeight: 500,
            fontSize: { xs: '0.75rem', md: '0.9rem' },
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Best prices guaranteed
        </Typography>
      </Box>

      {/* Compact Search Form */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
          backdropFilter: 'blur(15px)',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.12)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.15)',
            transform: 'translateY(-1px)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
            backgroundSize: '200% 100%',
            animation: 'gradientMove 2s ease-in-out infinite'
          },
          '@keyframes gradientMove': {
            '0%, 100%': { backgroundPosition: '0% 0%' },
            '50%': { backgroundPosition: '100% 0%' }
          }
        }}
      >
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 1.5, md: 2 }} alignItems="flex-end">
            {/* Search Location - Full Width on Mobile */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <LocationOnIcon sx={{ fontSize: '0.9rem', color: '#667eea' }} />
                Destination
              </Typography>
              <TextField
                fullWidth
                name="search"
                value={data.search}
                onChange={handleChange}
                placeholder="City or hotel..."
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleSearch())
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: '1rem', color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Current location">
                        <IconButton
                          onClick={getLocation}
                          size="small"
                          disabled={fetchingLocation}
                          sx={{
                            color: '#667eea',
                            p: 0.5,
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            }
                          }}
                        >
                          {fetchingLocation ? (
                            <CircularProgress 
                              size={16} 
                              sx={{ color: '#667eea' }}
                              thickness={4}
                            />
                          ) : (
                            <MyLocationIcon sx={{ fontSize: '1rem' }} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                  sx: {
                    height: { xs: 44, md: 48 },
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,1)',
                      boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }
                }}
              />
            </Grid>

            {/* Dates - Side by Side on Mobile */}
            <Grid item xs={6} md={2.5}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <CalendarMonthIcon sx={{ fontSize: '0.9rem', color: '#10b981' }} />
                Check-in
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="checkInDate"
                value={data.checkInDate}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    height: { xs: 44, md: 48 },
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,1)',
                      boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      fontWeight: 500,
                      color: '#374151'
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={6} md={2.5}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <CalendarMonthIcon sx={{ fontSize: '0.9rem', color: '#f59e0b' }} />
                Check-out
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="checkOutDate"
                value={data.checkOutDate}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    height: { xs: 44, md: 48 },
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,1)',
                      boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.2)'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      fontWeight: 500,
                      color: '#374151'
                    }
                  }
                }}
              />
            </Grid>

            {/* Rooms & Guests - Compact on Mobile */}
            <Grid item xs={4} md={1}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 0.5,
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <MeetingRoomIcon sx={{ fontSize: '0.8rem', color: '#8b5cf6' }} />
                Rooms
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="countRooms"
                value={data.countRooms}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 1, max: 10 },
                  sx: {
                    height: { xs: 44, md: 48 },
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,1)',
                      boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      fontWeight: 600,
                      color: '#374151',
                      textAlign: 'center'
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={4} md={1}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 0.5,
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <GroupIcon sx={{ fontSize: '0.8rem', color: '#ef4444' }} />
                Guests
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="guests"
                value={data.guests}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 1, max: 20 },
                  sx: {
                    height: { xs: 44, md: 48 },
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,1)',
                      boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.2)'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      fontWeight: 600,
                      color: '#374151',
                      textAlign: 'center'
                    }
                  }
                }}
              />
            </Grid>

            {/* Search Button - Compact on Mobile */}
            <Grid item xs={4} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />}
                sx={{
                  height: { xs: 44, md: 56 },
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.75rem', md: '0.9rem' },
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Compact Quick Suggestions for Mobile */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2, md: 3 },
            pb: { xs: 1.5, sm: 2, md: 3 },
            pt: 0
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: '#6b7280',
              mb: 1,
              fontSize: { xs: '0.7rem', md: '0.75rem' },
              display: 'block'
            }}
          >
           🔥 Popular destinations:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, md: 0.75 } }}>
            {['Mumbai', 'Delhi', 'Goa', 'Jaipur'].map((city) => (
              <Button
                key={city}
                size="small"
                variant="text"
                onClick={() => setData(prev => ({ ...prev, search: city }))}
                sx={{
                  borderRadius: 2,
                  px: { xs: 1, md: 1.5 },
                  py: 0.25,
                  fontSize: { xs: '0.65rem', md: '0.7rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  color: '#667eea',
                  bgcolor: 'rgba(102, 126, 234, 0.05)',
                  minWidth: 'auto',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                {city}
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SearchForm;