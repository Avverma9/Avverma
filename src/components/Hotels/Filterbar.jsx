import React, { useState } from 'react';
import { Slider, Typography, FormControlLabel, Checkbox, Box, Stack, Button, Card, CardContent, CardHeader, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import amenityIcons from '../../utils/extrasList';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { roomTypes, propertyTypes, bedTypes, starRatings } from '../../utils/extrasList';
import { useNavigate } from 'react-router-dom';

const Filterbar = ({ onFilterChange }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [starRating, setRating] = useState('');
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedBedType, setSelectedBedType] = useState('');
    const [selectedPropertyType, setSelectedPropertyType] = useState('');
    const [showMoreAmenities, setShowMoreAmenities] = useState(false);
    const [showMoreRoomTypes, setShowMoreRoomTypes] = useState(false);
    const [showMoreBedTypes, setShowMoreBedTypes] = useState(false);
    const [showMorePropertyTypes, setShowMorePropertyTypes] = useState(false);
    const [showMoreRatings, setShowMoreRatings] = useState(false);
    const navigate = useNavigate();
    const amenityItems = Object.entries(amenityIcons).map(([name, icon]) => ({
        name,
        icon,
    }));

    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
        onFilterChange({
            minPrice: newValue[0],
            maxPrice: newValue[1],
            starRating,
            amenities: selectedAmenities,
            type: selectedRoomType,
            bedTypes: selectedBedType,
            propertyType: selectedPropertyType,
        });
    };

    const handleRatingChange = (event) => {
        const value = event.target.value;
        setRating(value);
        onFilterChange({
            minPrice,
            maxPrice,
            starRating: value,
            amenities: selectedAmenities,
            type: selectedRoomType,
            bedTypes: selectedBedType,
            propertyType: selectedPropertyType,
        });
    };

    const handleAmenitiesChange = (event) => {
        const value = event.target.value;
        setSelectedAmenities((prev) => (prev.includes(value) ? prev.filter((amenity) => amenity !== value) : [...prev, value]));
        onFilterChange({
            minPrice,
            maxPrice,
            starRating,
            amenities: [...selectedAmenities, value],
            type: selectedRoomType,
            bedTypes: selectedBedType,
            propertyType: selectedPropertyType,
        });
    };

    const handleRoomTypeChange = (event) => {
        setSelectedRoomType(event.target.value);
        onFilterChange({
            minPrice,
            maxPrice,
            starRating,
            amenities: selectedAmenities,
            type: event.target.value,
            bedTypes: selectedBedType,
            propertyType: selectedPropertyType,
        });
    };

    const handleBedTypeChange = (event) => {
        setSelectedBedType(event.target.value);
        onFilterChange({
            minPrice,
            maxPrice,
            starRating,
            amenities: selectedAmenities,
            type: selectedRoomType,
            bedTypes: event.target.value,
            propertyType: selectedPropertyType,
        });
    };

    const handlePropertyTypeChange = (event) => {
        setSelectedPropertyType(event.target.value);
        onFilterChange({
            minPrice,
            maxPrice,
            starRating,
            amenities: selectedAmenities,
            type: selectedRoomType,
            bedTypes: selectedBedType,
            propertyType: event.target.value,
        });
    };

    const handleShowMoreClick = (filterType) => {
        switch (filterType) {
            case 'amenities':
                setShowMoreAmenities((prev) => !prev);
                break;
            case 'roomTypes':
                setShowMoreRoomTypes((prev) => !prev);
                break;
            case 'bedTypes':
                setShowMoreBedTypes((prev) => !prev);
                break;
            case 'propertyTypes':
                setShowMorePropertyTypes((prev) => !prev);
                break;
            case 'ratings':
                setShowMoreRatings((prev) => !prev);
                break;
            default:
                break;
        }
    };

    const handleClearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setRating('');
        setSelectedAmenities([]);
        setSelectedRoomType('');
        setSelectedBedType('');
        setSelectedPropertyType('');
        setShowMoreAmenities(false);
        setShowMoreRoomTypes(false);
        setShowMoreBedTypes(false);
        setShowMorePropertyTypes(false);
        setShowMoreRatings(false);

        onFilterChange({
            minPrice: 400,
            maxPrice: 10000,
            starRating: '',
            amenities: [],
            type: '',
            page: '',
            bedTypes: '',
            propertyType: '',
        });
        navigate(window.location.pathname);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 1,
                position: 'sticky',
                top: 20, // Adjust this to control how far down it sticks
                zIndex: 10,
                height: 'calc(100vh - 20px)', // Ensure it occupies the desired height
                overflowY: 'auto', // Allow vertical scrolling
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for a clean look
                '&::-webkit-scrollbar': {
                    width: '6px', // Thinner scrollbar
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f0f0f0', // Lighter track background
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888', // Color of the scrollbar thumb
                    borderRadius: '10px', // Rounded corners for thumb
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555', // Color when hovering
                },
                scrollbarWidth: 'thin', // For Firefox
                scrollbarColor: '#0D6EFD #CFE2FF', // Thumb and track color for Firefox
            }}
        >
            <Button
                variant="contained"
                color="secondary"
                onClick={handleClearFilters}
                sx={{ mb: 2, width: '100%', borderRadius: '20px', fontWeight: 'bold', '&:hover': { backgroundColor: '#d32f2f' } }}
            >
                Clear Filters
            </Button>

            <Stack spacing={2}>
                {/* Price Range */}
                <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Typography sx={{ ml: 2, mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>Filter Price</Typography>
                    <CardContent sx={{ padding: 1.5 }}>
                        <Slider
                            value={[minPrice, maxPrice]}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={400}
                            max={10000}
                            step={100}
                            sx={{ mb: 1, color: '#1976d2' }}
                        />
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Min
                            <LiaRupeeSignSolid />
                            {minPrice} - Max
                            <LiaRupeeSignSolid />
                            {maxPrice}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Amenities */}
                <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Typography sx={{ ml: 2, mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>Amenities</Typography>
                    <CardContent sx={{ padding: 1.5 }}>
                        <Stack spacing={0.5}>
                            {amenityItems.slice(0, showMoreAmenities ? amenityItems.length : 5).map(({ name, icon }) => (
                                <FormControlLabel
                                    key={name}
                                    control={
                                        <Checkbox
                                            value={name}
                                            onChange={handleAmenitiesChange}
                                            checked={selectedAmenities.includes(name)}
                                            sx={{
                                                p: 0.5, // Checkbox padding
                                                mr: 1,
                                                '& .MuiSvgIcon-root': { fontSize: 18 }, // Checkbox icon size
                                                color: 'black',
                                                '&.Mui-checked': { color: 'black' },
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
                                            {name}
                                        </Box>
                                    }
                                />
                            ))}
                        </Stack>
                        <Button
                            onClick={() => handleShowMoreClick('amenities')}
                            variant="text"
                            color="primary"
                            endIcon={showMoreAmenities ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ mt: 1, fontSize: '0.9rem', fontWeight: 'bold', '&:hover': { color: '#1976d2' } }}
                        >
                            {showMoreAmenities ? 'Show Less' : 'Show More'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Room Types */}
                <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Typography sx={{ ml: 2, mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>Room Types</Typography>
                    <CardContent sx={{ padding: 1.5 }}>
                        <Stack spacing={0.5}>
                            {roomTypes.slice(0, showMoreRoomTypes ? roomTypes.length : 5).map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            value={type}
                                            onChange={handleRoomTypeChange}
                                            checked={selectedRoomType === type}
                                            sx={{
                                                p: 0.5, // Checkbox padding
                                                mr: 1,
                                                '& .MuiSvgIcon-root': { fontSize: 18 }, // Checkbox icon size
                                                color: 'black',
                                                '&.Mui-checked': { color: 'black' },
                                            }}
                                        />
                                    }
                                    label={type}
                                />
                            ))}
                        </Stack>
                        <Button
                            onClick={() => handleShowMoreClick('roomTypes')}
                            variant="text"
                            color="primary"
                            endIcon={showMoreRoomTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ mt: 1, fontSize: '0.9rem', fontWeight: 'bold', '&:hover': { color: '#1976d2' } }}
                        >
                            {showMoreRoomTypes ? 'Show Less' : 'Show More'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Bed Types */}
                <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Typography sx={{ ml: 2, mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>Bed Types</Typography>
                    <CardContent sx={{ padding: 1.5 }}>
                        <Stack spacing={0.5}>
                            {bedTypes.slice(0, showMoreBedTypes ? bedTypes.length : 5).map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            value={type}
                                            onChange={handleBedTypeChange}
                                            checked={selectedBedType === type}
                                            sx={{
                                                p: 0.5, // Checkbox padding
                                                mr: 1,
                                                '& .MuiSvgIcon-root': { fontSize: 18 }, // Checkbox icon size
                                                color: 'black',
                                                '&.Mui-checked': { color: 'black' },
                                            }}
                                        />
                                    }
                                    label={type}
                                />
                            ))}
                        </Stack>
                        <Button
                            onClick={() => handleShowMoreClick('bedTypes')}
                            variant="text"
                            color="primary"
                            endIcon={showMoreBedTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ mt: 1, fontSize: '0.9rem', fontWeight: 'bold', '&:hover': { color: '#1976d2' } }}
                        >
                            {showMoreBedTypes ? 'Show Less' : 'Show More'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Property Type */}
                <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Typography sx={{ ml: 2, mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>Property Type</Typography>
                    <CardContent sx={{ padding: 1.5 }}>
                        <Stack spacing={0.5}>
                            {propertyTypes.slice(0, showMorePropertyTypes ? propertyTypes.length : 5).map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            value={type}
                                            onChange={handlePropertyTypeChange}
                                            checked={selectedPropertyType === type}
                                            sx={{
                                                p: 0.5, // Checkbox padding
                                                mr: 1,
                                                '& .MuiSvgIcon-root': { fontSize: 18 }, // Checkbox icon size
                                                color: 'black',
                                                '&.Mui-checked': { color: 'black' },
                                            }}
                                        />
                                    }
                                    label={type}
                                />
                            ))}
                        </Stack>
                        <Button
                            onClick={() => handleShowMoreClick('propertyTypes')}
                            variant="text"
                            color="primary"
                            endIcon={showMorePropertyTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ mt: 1, fontSize: '0.9rem', fontWeight: 'bold', '&:hover': { color: '#1976d2' } }}
                        >
                            {showMorePropertyTypes ? 'Show Less' : 'Show More'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Rating */}
                <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Typography sx={{ ml: 2, mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>Rating</Typography>
                    <CardContent sx={{ padding: 1.5 }}>
                        <Stack spacing={0.5}>
                            {starRatings.slice(0, showMoreRatings ? starRatings.length : 5).map((r) => (
                                <FormControlLabel
                                    key={r}
                                    control={
                                        <Checkbox
                                            value={r}
                                            onChange={handleRatingChange}
                                            checked={starRating === r}
                                            sx={{
                                                p: 0.5, // Checkbox padding
                                                mr: 1,
                                                '& .MuiSvgIcon-root': { fontSize: 18 }, // Checkbox icon size
                                                color: 'black',
                                                '&.Mui-checked': { color: 'black' },
                                            }}
                                        />
                                    }
                                    label={`${r}`}
                                />
                            ))}
                        </Stack>
                        <Button
                            onClick={() => handleShowMoreClick('ratings')}
                            variant="text"
                            color="primary"
                            endIcon={showMoreRatings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ mt: 1, fontSize: '0.9rem', fontWeight: 'bold', '&:hover': { color: '#1976d2' } }}
                        >
                            {showMoreRatings ? 'Show Less' : 'Show More'}
                        </Button>
                    </CardContent>
                </Card>
            </Stack>
        </Paper>
    );
};

export default Filterbar;
