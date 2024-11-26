import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Button, Grid, TextField, IconButton } from '@mui/material';
import { CiLocationArrow1, CiSearch } from 'react-icons/ci';

const MobileSearchBox = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentDate = new Date().toISOString().split('T')[0];
    const [searchData, setSearchData] = useState({
        search: '',
        checkInDate: currentDate,
        checkOutDate: currentDate,
        countRooms: 1,
        guests: 2,
        latitude: '',
        longitude: '',
    });

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'Accepted' : '') : value;

        setSearchData((prevSearchData) => ({
            ...prevSearchData,
            [name]: inputValue,
        }));
    };

    const handleSearch = () => {
        const queryString = Object.entries({
            ...searchData,
            latitude: '',
            longitude: '',
        })
            .filter(([key, value]) => {
                return value || key === 'countRooms' || key === 'guests';
            })
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        navigate(`/search?${queryString}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setSearchData((prevData) => ({
                        ...prevData,
                        latitude,
                        longitude,
                    }));
                    navigate(`/search?latitude=${latitude}&longitude=${longitude}`);
                },
                (error) => {
                    console.error('Error getting location: ', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    if (location.pathname !== '/search' && location.pathname !== '/search/hotels') {
        return null;
    }

    return (
        <div>
            <Paper
                style={{
                    padding: '8px',
                    maxWidth: '100%',
                    margin: 'auto',
                    position: 'sticky',
                    bottom: '20px', // Position 20px from the bottom of the screen
                    zIndex: 100, // Ensures it's above other content
                }}
                onKeyDown={handleKeyPress}
            >
                <Grid container spacing={2} direction="row" alignItems="center">
                    <Grid item xs={9} sm={8}>
                        <TextField
                            fullWidth
                            label="Search"
                            variant="outlined"
                            name="search"
                            value={searchData.search}
                            onChange={handleInputChange}
                            style={{
                                fontSize: '14px',
                                borderRadius: '8px',
                            }}
                            inputProps={{ maxLength: 50 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={getLocation}
                                        style={{
                                            marginLeft: '8px',
                                            color: '#3f51b5', // Blue color
                                            fontSize: '24px',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <CiLocationArrow1 />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={2} sm={4}>
                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            style={{
                                fontSize: '14px',
                                padding: '12px 16px',
                                backgroundColor: '#3f51b5', // Primary Blue
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                            fullWidth
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default MobileSearchBox;
