import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Grid, TextField, IconButton } from '@mui/material';
import { CiLocationArrow1, CiSearch } from 'react-icons/ci';
import { styled } from '@mui/material/styles';

// Styled Paper component, now without sticky positioning
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '12px 16px',
    margin: '16px',
    borderRadius: '24px',
    // Removed position: 'sticky', top: '80px', and zIndex: 100
    backgroundColor: '#ffffff',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(2px)',
    },
}));

// Styled TextField component for consistent styling
const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
            borderColor: '#e0e0e0',
            transition: 'border-color 0.3s ease-in-out',
        },
        '&:hover fieldset': {
            borderColor: '#9e9e9e',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3f51b5',
            borderWidth: '2px',
        },
    },
    '& .MuiInputBase-input': {
        padding: '12px 16px',
        fontSize: '16px',
    },
}));

// Styled IconButton component for the search and location buttons
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    borderRadius: '50%',
    padding: '12px',
    '&:hover': {
        backgroundColor: '#303f9f',
        transform: 'scale(1.05)',
    },
    '& .MuiSvgIcon-root': {
        fontSize: '28px',
    },
}));

const MobileSearchBox = () => {
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook to get current location pathname
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // State to manage search input and parameters
    const [searchData, setSearchData] = useState({
        search: '',
        checkInDate: currentDate,
        checkOutDate: currentDate,
        countRooms: 1,
        guests: 2,
        latitude: '',
        longitude: '',
    });

    // Handles changes in the text input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchData((prevSearchData) => ({
            ...prevSearchData,
            [name]: value,
        }));
    };

    // Constructs the query string and navigates to the search page
    const handleSearch = () => {
        const queryString = Object.entries({
            ...searchData,
            latitude: '', // Clear latitude for text search
            longitude: '', // Clear longitude for text search
        })
            // Filter out empty values, but keep countRooms and guests even if 0 (though defaults are 1 and 2)
            .filter(([key, value]) => value || key === 'countRooms' || key === 'guests')
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        navigate(`/search?${queryString}`);
    };

    // Triggers search when Enter key is pressed
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission behavior
            handleSearch();
        }
    };

    // Gets the user's current geolocation and navigates to search with coordinates
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
                    // Navigate directly with latitude and longitude
                    navigate(`/search?latitude=${latitude}&longitude=${longitude}`);
                },
                (error) => {
                    console.error('Error getting location: ', error);
                    // In a real app, you might show a user-friendly message here
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            // In a real app, you might show a user-friendly message here
        }
    };

    // Only render the search box if the current path is '/search' or '/search/hotels'
    if (location.pathname !== '/search' && location.pathname !== '/search/hotels') {
        return null;
    }

    return (
        <StyledPaper onKeyDown={handleKeyPress}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <StyledTextField
                        fullWidth
                        placeholder="Search for a city or hotel..."
                        variant="outlined"
                        name="search"
                        value={searchData.search}
                        onChange={handleInputChange}
                        inputProps={{ maxLength: 50 }} // Limit input length
                        InputProps={{
                            startAdornment: (
                                <CiSearch style={{ color: '#9e9e9e', fontSize: '20px', marginRight: '8px' }} />
                            ),
                            endAdornment: (
                                <IconButton
                                    onClick={getLocation}
                                    style={{ color: '#3f51b5', fontSize: '20px' }}
                                >
                                    <CiLocationArrow1 />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <StyledIconButton onClick={handleSearch}>
                        <CiSearch />
                    </StyledIconButton>
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default MobileSearchBox;
