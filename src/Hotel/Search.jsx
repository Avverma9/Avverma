import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get the next day's date
  const getTomorrowDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().split("T")[0];
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const [searchData, setSearchData] = useState({
    city: "",
    startDate: currentDate,
    endDate: getTomorrowDate(currentDate),
    countRooms: 1,
    guests: 2,
    localId: "",
    unmarriedCouplesAllowed: "",
  });

  useEffect(() => {
    setSearchData((prevSearchData) => {
      const newEndDate = new Date(prevSearchData.startDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      const formattedEndDate = newEndDate.toISOString().split("T")[0];
      return {
        ...prevSearchData,
        endDate: formattedEndDate,
      };
    });
  }, [searchData.startDate]);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    const inputValue =
      type === "checkbox" ? (checked ? "Accepted" : "") : value.trim();

    setSearchData((prevSearchData) => {
      const updatedData = { ...prevSearchData, [name]: inputValue };

      if (
        name === "startDate" &&
        new Date(updatedData.endDate) < new Date(updatedData.startDate)
      ) {
        updatedData.endDate = getTomorrowDate(updatedData.startDate);
      }

      if (
        name === "endDate" &&
        new Date(updatedData.endDate) < new Date(updatedData.startDate)
      ) {
        updatedData.endDate = getTomorrowDate(updatedData.startDate);
      }

      return updatedData;
    });
  };

  const handleRoomsChange = (value) => {
    const newRooms = parseInt(value, 10);

    setSearchData((prevSearchData) => {
      const minGuestsRequired = newRooms * 3;
      return {
        ...prevSearchData,
        countRooms: Math.max(1, newRooms), // Ensure at least 1 room
        guests: Math.max(minGuestsRequired, prevSearchData.guests),
      };
    });
  };

  const handleGuestsChange = (value) => {
    const newGuests = parseInt(value, 10);

    setSearchData((prevSearchData) => {
      const minRoomsRequired = Math.ceil(newGuests / 3);
      return {
        ...prevSearchData,
        guests: Math.max(1, newGuests), // Ensure at least 1 guest
        countRooms: Math.max(minRoomsRequired, prevSearchData.countRooms),
      };
    });
  };

  const handleSearch = () => {
    const queryString = Object.entries(searchData)
      .filter(([key]) => key !== "countRooms" && key !== "guests") // Exclude countRooms and guests
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    navigate(`/search?${queryString}`);
  };

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        marginTop: "2px",
        marginBottom: "2px",
        backgroundImage:
          "url(https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-searching-hostel-banner-hotel-journey-image_1091602.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px", // Adjust the height as needed
      }}
    >
      <Container
        className="border border-primary rounded p-3 mt-2"
        style={{
          maxWidth: "400px",
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search by city, hotel, or neighbourhood"
              variant="outlined"
              name="city"
              value={searchData.city}
              onChange={handleInputChange}
              style={{ fontSize: "14px" }}
            />
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
              onChange={(e) => handleGuestsChange(e.target.value)}
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
              onChange={(e) => handleRoomsChange(e.target.value)}
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
