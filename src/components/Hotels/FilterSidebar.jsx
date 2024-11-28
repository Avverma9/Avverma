import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Slider,
    Stack,
    Typography,
    Drawer,
    IconButton,
    Divider,
    Tooltip,
    styled,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import amenityIcons from '../../utils/extrasList';
import { roomTypes, propertyTypes, bedTypes, starRatings } from '../../utils/extrasList';
import { CiFilter } from 'react-icons/ci';

// Convert amenityIcons object to an array
const amenityItems = Object.entries(amenityIcons).map(([name, icon]) => ({
    name,
    icon,
}));

// Styled components
const CustomSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: 8,
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        },
    },
    '& .MuiSlider-track': {
        height: 8,
    },
    '& .MuiSlider-rail': {
        height: 8,
        backgroundColor: theme.palette.grey[300],
    },
}));

const FilterSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [roomType, setRoomType] = useState([]);
    const [propertyType, setPropertyType] = useState([]);
    const [bedType, setBedType] = useState([]);
    const [starRating, setStarRating] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showMoreAmenities, setShowMoreAmenities] = useState(false);
    const [showMoreRoomTypes, setShowMoreRoomTypes] = useState(false);
    const [showMorePropertyTypes, setShowMorePropertyTypes] = useState(false);
    const [showMoreBedTypes, setShowMoreBedTypes] = useState(false);
    const [showMoreStarRatings, setShowMoreStarRatings] = useState(false);

    useEffect(() => {
        window.history.pushState({}, '', window.location.href);
    }, []);

    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
    };

    const filterByAll = () => {
        const filterQuery =
            `?minPrice=${minPrice}&maxPrice=${maxPrice}` +
            `&amenities=${amenities.join(',')}` +
            `&propertyType=${propertyType.join(',')}` +
            `&roomType=${roomType.join(',')}` +
            `&bedType=${bedType.join(',')}` +
            `&starRating=${starRating.join(',')}`;

        navigate(`/search/hotels${filterQuery}`);
        toggleDrawer(); // Close the drawer after applying filters
    };

    const handleAmenityChange = (selectedAmenity) => {
        setAmenities((prev) =>
            prev.includes(selectedAmenity) ? prev.filter((amenity) => amenity !== selectedAmenity) : [...prev, selectedAmenity]
        );
    };

    const handleRoomTypeChange = (selectedRoomType) => {
        setRoomType((prev) =>
            prev.includes(selectedRoomType) ? prev.filter((type) => type !== selectedRoomType) : [...prev, selectedRoomType]
        );
    };

    const handlePropertyTypeChange = (selectedPropertyType) => {
        setPropertyType((prev) =>
            prev.includes(selectedPropertyType) ? prev.filter((type) => type !== selectedPropertyType) : [...prev, selectedPropertyType]
        );
    };

    const handleBedTypeChange = (selectedBedType) => {
        setBedType((prev) =>
            prev.includes(selectedBedType) ? prev.filter((type) => type !== selectedBedType) : [...prev, selectedBedType]
        );
    };

    const handleStarRatingChange = (selectedRating) => {
        setStarRating((prev) =>
            prev.includes(selectedRating) ? prev.filter((rating) => rating !== selectedRating) : [...prev, selectedRating]
        );
    };

    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setAmenities([]);
        setRoomType([]);
        setPropertyType([]);
        setBedType([]);
        setStarRating([]);
        navigate(window.location.pathname);
        toggleDrawer();
    };

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    useEffect(() => {
        window.history.pushState({}, '', window.location.href);
    }, []);

    const paths = ['/search', '/search/hotels'];

    if (!paths.includes(location.pathname)) {
        return null;
    }

    return (
        <div>
            <Drawer
                anchor={isMobile ? 'bottom' : 'left'}
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{
                    width: isMobile ? '100%' : 420,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '100%' : 420,
                        boxSizing: 'border-box',
                        padding: 3,
                        bgcolor: 'background.paper',
                    },
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="subtitle1" gutterBottom>
                        <Button variant="outlined" color="error" onClick={clearFilters}>
                            Clear
                        </Button>{' '}
                        <Button
                            variant="contained"
                            onClick={filterByAll}
                            style={{ marginLeft: 25 }} // Adds spacing between the buttons
                        >
                            Apply
                        </Button>
                        <IconButton edge="end" onClick={toggleDrawer} color="inherit" variant="outlined" style={{ marginLeft: 25 }}>
                            <CloseIcon />
                        </IconButton>
                    </Typography>

                    <CustomSlider
                        value={[minPrice, maxPrice]}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                        step={1}
                        sx={{ mb: 2 }}
                    />

                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                            Min: <LiaRupeeSignSolid /> {minPrice}
                        </Typography>
                        <Typography variant="body2">
                            Max: <LiaRupeeSignSolid />
                            {maxPrice}
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1" gutterBottom>
                        Amenities:
                    </Typography>
                    <FormGroup>
                        {amenityItems.slice(0, showMoreAmenities ? undefined : 7).map(({ name, icon }) => (
                            <Tooltip key={name} title={name} arrow>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={amenities.includes(name)}
                                            onChange={() => handleAmenityChange(name)}
                                            sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                                        />
                                    }
                                    label={
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {icon}
                                            <Typography>{name}</Typography>
                                        </Stack>
                                    }
                                />
                            </Tooltip>
                        ))}
                        {amenityItems.length > 7 && (
                            <Button
                                onClick={() => setShowMoreAmenities((prev) => !prev)}
                                sx={{ mt: 1, textTransform: 'none' }}
                                endIcon={showMoreAmenities ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {showMoreAmenities ? 'Show Less' : 'Show More'}
                            </Button>
                        )}
                    </FormGroup>
                    <Divider />
                    <Typography variant="subtitle1" gutterBottom>
                        Room Type:
                    </Typography>
                    <FormGroup>
                        {Object.entries(roomTypes).map(([key, value]) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={roomType.includes(key)} // Adjust to use keys
                                        onChange={() => handleRoomTypeChange(key)} // Adjust to use keys
                                    />
                                }
                                label={value}
                            />
                        ))}

                        {roomTypes.length > 7 && (
                            <Button
                                onClick={() => setShowMoreRoomTypes((prev) => !prev)}
                                sx={{ mt: 1, textTransform: 'none' }}
                                endIcon={showMoreRoomTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {showMoreRoomTypes ? 'Show Less' : 'Show More'}
                            </Button>
                        )}
                    </FormGroup>
                    <Divider />
                    <Typography variant="subtitle1" gutterBottom>
                        Property Type:
                    </Typography>
                    <FormGroup>
                        {propertyTypes.slice(0, showMorePropertyTypes ? undefined : 7).map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={propertyType.includes(type)}
                                        onChange={() => handlePropertyTypeChange(type)}
                                        sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                                    />
                                }
                                label={type}
                            />
                        ))}
                        {propertyTypes.length > 7 && (
                            <Button
                                onClick={() => setShowMorePropertyTypes((prev) => !prev)}
                                sx={{ mt: 1, textTransform: 'none' }}
                                endIcon={showMorePropertyTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {showMorePropertyTypes ? 'Show Less' : 'Show More'}
                            </Button>
                        )}
                    </FormGroup>
                    <Divider />
                    <Typography variant="subtitle1" gutterBottom>
                        Bed Type:
                    </Typography>
                    <FormGroup>
                        {bedTypes.slice(0, showMoreBedTypes ? undefined : 7).map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={bedType.includes(type)}
                                        onChange={() => handleBedTypeChange(type)}
                                        sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                                    />
                                }
                                label={type}
                            />
                        ))}
                        {bedTypes.length > 7 && (
                            <Button
                                onClick={() => setShowMoreBedTypes((prev) => !prev)}
                                sx={{ mt: 1, textTransform: 'none' }}
                                endIcon={showMoreBedTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {showMoreBedTypes ? 'Show Less' : 'Show More'}
                            </Button>
                        )}
                    </FormGroup>
                    <Divider />
                    <Typography variant="subtitle1" gutterBottom>
                        Star Rating:
                    </Typography>
                    <FormGroup>
                        {starRatings.slice(0, showMoreStarRatings ? undefined : 7).map((rating) => (
                            <FormControlLabel
                                key={rating}
                                control={
                                    <Checkbox
                                        checked={starRating.includes(rating)}
                                        onChange={() => handleStarRatingChange(rating)}
                                        sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                                    />
                                }
                                label={rating}
                            />
                        ))}
                        {starRatings.length > 7 && (
                            <Button
                                onClick={() => setShowMoreStarRatings((prev) => !prev)}
                                sx={{ mt: 1, textTransform: 'none' }}
                                endIcon={showMoreStarRatings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {showMoreStarRatings ? 'Show Less' : 'Show More'}
                            </Button>
                        )}
                    </FormGroup>
                    <Divider />
                </Stack>
            </Drawer>
            <Button
                style={{ background: '#fff' }}
                variant="contained"
                startIcon={<CiFilter />}
                onClick={toggleDrawer}
                sx={{
                    borderRadius: '50%',
                    padding: '10px 20px',
                    color: 'black',
                    position: 'fixed',
                    bottom: 60, // Adjust distance from the bottom
                    right: 20, // Adjust distance from the right
                    zIndex: 1000, // Ensure it appears above other components
                }}
            ></Button>
        </div>
    );
};

export default FilterSidebar;
