import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentDate = new Date().toISOString().split("T")[0];
  const [searchData, setSearchData] = useState({
    city: "",
    startDate: currentDate,
    endDate: currentDate, // Adjust to set the default end date
    countRooms: 1,
    guests: 2,
    localId: "",
    unmarriedCouplesAllowed: "",
    latitude: null,
    longitude: null,
  });

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    const inputValue =
      type === "checkbox" ? (checked ? "Accepted" : "") : value.trim();

    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: inputValue,
    }));
  };

  const handleSearch = () => {
    const queryString = Object.entries(searchData)
      .filter(([key]) => key !== "countRooms" && key !== "guests")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    navigate(`/search?${queryString}`);
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
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        marginTop: "12px",
        backgroundImage: "url(https://www.hotelsugar.in/images/rooms-banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "380px",
      }}
    >
      <Container
        className="border border-primary rounded p-3 mt-2"
        style={{
          maxWidth: "400px",
          position: "absolute",
          top: "52%",
          left: "50%",
          marginBottom: "10%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
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
                style={{ fontSize: "14px" }}
              />
              <IconButton onClick={getLocation} style={{ marginLeft: '8px', color: "blue" }}>
                <NotListedLocationIcon style={{ fontSize: "45px" }} />
                <Typography variant="caption" style={{ display: 'block', fontSize: "12px", textAlign: 'center' }}>
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
              name="startDate"
              value={searchData.startDate}
              onChange={handleInputChange}
              style={{ fontSize: "14px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Check-out"
              variant="outlined"
              type="date"
              name="endDate"
              value={searchData.endDate}
              onChange={handleInputChange}
              style={{ fontSize: "14px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Enter number of adults"
              variant="outlined"
              type="number"
              name="adults"
              value={searchData.guests}
              onChange={(e) => handleInputChange(e)}
              style={{ fontSize: "14px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Enter number of rooms"
              variant="outlined"
              type="number"
              name="rooms"
              value={searchData.countRooms}
              onChange={(e) => handleInputChange(e)}
              style={{ fontSize: "14px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchData.localId === "Accepted"}
                  onChange={handleInputChange}
                  name="localId"
                  style={{ fontSize: "14px" }}
                />
              }
              label="Local ID"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchData.unmarriedCouplesAllowed === "Accepted"}
                  onChange={handleInputChange}
                  name="unmarriedCouplesAllowed"
                  style={{ fontSize: "14px" }}
                />
              }
              label="Unmarried"
            />
          </Grid>
          <Grid item xs={12} className="d-flex align-items-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              className="w-100"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SearchForm;
