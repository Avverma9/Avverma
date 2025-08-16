import React, { useState } from "react";
import { 
    Box, 
    TextField, 
    InputAdornment, 
    CircularProgress, 
    IconButton, 
    Grid,
    Button,
    Tooltip 
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const SearchForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentDate = new Date().toISOString().split("T")[0];

    const [fetchingLocation, setFetchingLocation] = useState(false);
    const [searchData, setSearchData] = useState({
        search: "",
        checkInDate: currentDate,
        checkOutDate: currentDate,
        countRooms: 1,
        guests: 2,
        latitude: "",
        longitude: "",
    });

    if (location.pathname !== "/") {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        const queryString = Object.entries(searchData)
            .filter(([_, value]) => value !== "" && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
        navigate(`/search?${queryString}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        setFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log("Current position:", position);
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    const locationName = data.address?.city || data.address?.town || data.address?.village || "Current Location";
                    setSearchData((prev) => ({
                        ...prev,
                        // latitude,
                        // longitude,
                        search: locationName,
                    }));
                } catch (error) {
                    console.error("Reverse geocoding failed:", error);
                } finally {
                    setFetchingLocation(false);
                }
            },
            (error) => {
                console.error("Error getting location: ", error);
                setFetchingLocation(false);
            }
        );
    };

    return (
        <Box 
            sx={{
                p: { xs: 2, md: 3 },
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                position: 'relative',
                mt: 4, // Added positive margin to move it down
                zIndex: 10,
                width: { xs: '90%', md: '85%', lg: '80%' },
                mx: 'auto'
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3.5}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for city, location, or hotel"
                        name="search"
                        value={searchData.search}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Use current location">
                                        <IconButton onClick={getLocation} edge="end">
                                            {fetchingLocation ? <CircularProgress size={24} /> : <MyLocationIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '16px', bgcolor: 'background.paper' }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        fullWidth
                        type="date"
                        name="checkInDate"
                        label="Check-in"
                        value={searchData.checkInDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '16px', bgcolor: 'background.paper' }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                     <TextField
                        fullWidth
                        type="date"
                        name="checkOutDate"
                        label="Check-out"
                        value={searchData.checkOutDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '16px', bgcolor: 'background.paper' }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={1.25}>
                    <TextField
                        fullWidth
                        type="number"
                        name="countRooms"
                        label="Rooms"
                        value={searchData.countRooms}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                             inputProps: { min: 1 },
                             startAdornment: (
                                <InputAdornment position="start">
                                    <MeetingRoomIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '16px', bgcolor: 'background.paper' }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={1.25}>
                    <TextField
                        fullWidth
                        type="number"
                        name="guests"
                        label="Guests"
                        value={searchData.guests}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                             inputProps: { min: 1 },
                             startAdornment: (
                                <InputAdornment position="start">
                                    <GroupIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '16px', bgcolor: 'background.paper' }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleSearch}
                        startIcon={<SearchIcon />}
                        sx={{
                            height: '56px',
                            borderRadius: '16px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchForm;
