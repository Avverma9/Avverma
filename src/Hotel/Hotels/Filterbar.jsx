import React, { useState } from "react";
import {
  Slider,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Stack,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import amenityIcons from "../../utils/amenities";
import { LiaRupeeSignSolid } from "react-icons/lia";
import {
  roomTypes,
  propertyTypes,
  bedTypes,
  starRatings,
} from "../../utils/filterOptions";

const Filterbar = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [starRating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedBedType, setSelectedBedType] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreRoomTypes, setShowMoreRoomTypes] = useState(false);
  const [showMoreBedTypes, setShowMoreBedTypes] = useState(false);
  const [showMorePropertyTypes, setShowMorePropertyTypes] = useState(false);
  const [showMoreRatings, setShowMoreRatings] = useState(false);

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
      roomType: selectedRoomType,
      bedType: selectedBedType,
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
      roomType: selectedRoomType,
      bedType: selectedBedType,
      propertyType: selectedPropertyType,
    });
  };

  const handleAmenitiesChange = (event) => {
    const value = event.target.value;
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((amenity) => amenity !== value)
        : [...prev, value]
    );
    onFilterChange({
      minPrice,
      maxPrice,
      starRating,
      amenities: [...selectedAmenities, value],
      roomType: selectedRoomType,
      bedType: selectedBedType,
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
      roomType: event.target.value,
      bedType: selectedBedType,
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
      roomType: selectedRoomType,
      bedType: event.target.value,
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
      roomType: selectedRoomType,
      bedType: selectedBedType,
      propertyType: event.target.value,
    });
  };

  const handleShowMoreClick = (filterType) => {
    switch (filterType) {
      case "amenities":
        setShowMoreAmenities((prev) => !prev);
        break;
      case "roomTypes":
        setShowMoreRoomTypes((prev) => !prev);
        break;
      case "bedTypes":
        setShowMoreBedTypes((prev) => !prev);
        break;
      case "propertyTypes":
        setShowMorePropertyTypes((prev) => !prev);
        break;
      case "ratings":
        setShowMoreRatings((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setRating("");
    setSelectedAmenities([]);
    setSelectedRoomType("");
    setSelectedBedType("");
    setSelectedPropertyType("");
    setShowMoreAmenities(false);
    setShowMoreRoomTypes(false);
    setShowMoreBedTypes(false);
    setShowMorePropertyTypes(false);
    setShowMoreRatings(false);
    onFilterChange({
      minPrice: 0,
      maxPrice: 10000,
      starRating: "",
      amenities: [],
      roomType: "",
      bedType: "",
      propertyType: "",
    });
  };

  return (
    <Box sx={{ width: { xs: "100%", sm: 280 }, padding: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filter
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearFilters}
        sx={{ mb: 2, width: "100%" }}
      >
        Clear Filters
      </Button>
      <Stack spacing={2}>
        <Card sx={{ mb: 2 }}>
          <Typography style={{ marginLeft: "15px", marginTop: "15px" }}>
            Price range
          </Typography>
          <CardContent sx={{ padding: 2 }}>
            <Slider
              value={[minPrice, maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              sx={{ mb: 1 }}
            />

            <Typography>
              Price: <LiaRupeeSignSolid />
              {minPrice} - <LiaRupeeSignSolid />
              {maxPrice}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <Typography style={{ marginLeft: "15px", marginTop: "15px" }}>
            Rating
          </Typography>
          <CardContent sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {starRatings
                .slice(0, showMoreRatings ? starRatings.length : 5)
                .map((r) => (
                  <FormControlLabel
                    key={r}
                    control={
                      <Checkbox
                        value={r}
                        onChange={handleRatingChange}
                        checked={starRating === r}
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "primary.dark" },
                        }}
                      />
                    }
                    label={`${r}`}
                  />
                ))}
            </Stack>
            <Button
              onClick={() => handleShowMoreClick("ratings")}
              variant="text"
              endIcon={
                showMoreRatings ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{ mt: 1 }}
            >
              {showMoreRatings ? "Show Less" : "Show More"}
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <Typography style={{ marginLeft: "15px", marginTop: "15px" }}>
            Room Types
          </Typography>
          <CardContent sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {roomTypes
                .slice(0, showMoreRoomTypes ? roomTypes.length : 5)
                .map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        value={type}
                        onChange={handleRoomTypeChange}
                        checked={selectedRoomType === type}
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "primary.dark" },
                        }}
                      />
                    }
                    label={type}
                  />
                ))}
            </Stack>
            <Button
              onClick={() => handleShowMoreClick("roomTypes")}
              variant="text"
              endIcon={
                showMoreRoomTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{ mt: 1 }}
            >
              {showMoreRoomTypes ? "Show Less" : "Show More"}
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <Typography style={{ marginLeft: "15px", marginTop: "15px" }}>
            Bed types
          </Typography>
          <CardContent sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {bedTypes
                .slice(0, showMoreBedTypes ? bedTypes.length : 5)
                .map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        value={type}
                        onChange={handleBedTypeChange}
                        checked={selectedBedType === type}
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "primary.dark" },
                        }}
                      />
                    }
                    label={type}
                  />
                ))}
            </Stack>
            <Button
              onClick={() => handleShowMoreClick("bedTypes")}
              variant="text"
              endIcon={
                showMoreBedTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{ mt: 1 }}
            >
              {showMoreBedTypes ? "Show Less" : "Show More"}
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <Typography style={{ marginLeft: "15px", marginTop: "15px" }}>
            Property Type
          </Typography>
          <CardContent sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {propertyTypes
                .slice(0, showMorePropertyTypes ? propertyTypes.length : 5)
                .map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        value={type}
                        onChange={handlePropertyTypeChange}
                        checked={selectedPropertyType === type}
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "primary.dark" },
                        }}
                      />
                    }
                    label={type}
                  />
                ))}
            </Stack>
            <Button
              onClick={() => handleShowMoreClick("propertyTypes")}
              variant="text"
              endIcon={
                showMorePropertyTypes ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{ mt: 1 }}
            >
              {showMorePropertyTypes ? "Show Less" : "Show More"}
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <Typography style={{ marginLeft: "15px", marginTop: "15px" }}>
            Amenities
          </Typography>
          <CardContent sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {amenityItems
                .slice(0, showMoreAmenities ? amenityItems.length : 5)
                .map(({ name, icon }) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Checkbox
                        value={name}
                        onChange={handleAmenitiesChange}
                        checked={selectedAmenities.includes(name)}
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "primary.dark" },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
                        {name}
                      </Box>
                    }
                  />
                ))}
            </Stack>
            <Button
              onClick={() => handleShowMoreClick("amenities")}
              variant="text"
              endIcon={
                showMoreAmenities ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{ mt: 1 }}
            >
              {showMoreAmenities ? "Show Less" : "Show More"}
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Filterbar;
