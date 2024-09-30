import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, TextField, FormControlLabel, Checkbox, IconButton, Typography } from '@mui/material';
import { CiLocationArrow1 } from "react-icons/ci";

const SearchForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentDate = new Date().toISOString().split('T')[0];
    const [searchData, setSearchData] = useState({
        city: '',
        checkInDate: currentDate,
        checkOutDate: currentDate,
        countRooms: 1,
        guests: 2,
        localId: '',
        unmarriedCouplesAllowed: '',
        latitude: '',
        longitude: '',
    });

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'Accepted' : '') : value; // Allow spaces

        setSearchData((prevSearchData) => ({
            ...prevSearchData,
            [name]: inputValue,
        }));
    };

    const handleSearch = () => {
        // Ensure guests is capped at 3
        const finalGuests = Math.min(parseInt(searchData.guests) || 0, 3);

        const queryString = Object.entries({
            ...searchData,
            guests: finalGuests,
            latitude: '',
            longitude: '',
        })
            .filter(([key, value]) => {
                return value || key === 'countRooms' || key === 'guests';
            })
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Properly encode
            .join('&');

        navigate(`/search?${queryString}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
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

    if (location.pathname !== '/') {
        return null;
    }

    return (
        <div
            style={{
                position: 'relative',
                marginTop: '12px',
                backgroundImage: 'url(https://www.hotelsugar.in/images/rooms-banner.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '380px',
            }}
        >
            <Container
                className="border border-primary rounded p-3 mt-2"
                style={{
                    maxWidth: '400px',
                    position: 'absolute',
                    top: '52%',
                    left: '50%',
                    marginBottom: '10%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                }}
                onKeyDown={handleKeyPress} // Add the keyDown event listener here
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                label="Search by city, hotel, or neighbourhood"
                                variant="outlined"
                                name="city"
                                value={searchData.city}
                                onChange={handleInputChange}
                                style={{ fontSize: '14px' }}
                            />
                            <IconButton onClick={getLocation} style={{ marginLeft: '8px', color: 'blue' }}>
                                <CiLocationArrow1 style={{ fontSize: '45px' }} />
                                <Typography variant="caption" style={{ display: 'block', fontSize: '12px', textAlign: 'center' }}>
                                    Nearby
                                </Typography>
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Check-in"
                            variant="outlined"
                            type="date"
                            name="checkInDate"
                            value={searchData.checkInDate}
                            onChange={handleInputChange}
                            style={{ fontSize: '14px' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Check-out"
                            variant="outlined"
                            type="date"
                            name="checkOutDate"
                            value={searchData.checkOutDate}
                            onChange={handleInputChange}
                            style={{ fontSize: '14px' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Enter number of adults (max 3)"
                            variant="outlined"
                            type="number"
                            name="guests"
                            value={searchData.guests}
                            onChange={handleInputChange}
                            style={{ fontSize: '14px' }}
                            inputProps={{ max: 3 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Enter number of rooms"
                            variant="outlined"
                            type="number"
                            name="countRooms"
                            value={searchData.countRooms}
                            onChange={handleInputChange}
                            style={{ fontSize: '14px' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={searchData.localId === 'Accepted'}
                                    onChange={handleInputChange}
                                    name="localId"
                                    style={{ fontSize: '14px' }}
                                />
                            }
                            label="Local ID"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={searchData.unmarriedCouplesAllowed === 'Accepted'}
                                    onChange={handleInputChange}
                                    name="unmarriedCouplesAllowed"
                                    style={{ fontSize: '14px' }}
                                />
                            }
                            label="Unmarried"
                        />
                    </Grid>
                    <Grid item xs={12} className="d-flex align-items-end">
                        <Button variant="contained" color="primary" onClick={handleSearch} className="w-100">
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default SearchForm;
