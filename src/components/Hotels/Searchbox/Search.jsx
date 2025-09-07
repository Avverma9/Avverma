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
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

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
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
    navigate(`/search?${qs}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
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
    <Box
      sx={{
        p: { xs: 1, sm: 1.5, md: 2 },
        bgcolor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid rgba(255,255,255,0.6)",
        width: { xs: "95%", sm: "90%", md: "80%" },
        mx: "auto",
        mt: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            name="search"
            value={data.search}
            onChange={handleChange}
            placeholder="City, hotel..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleSearch())
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Use current location">
                    <IconButton
                      onClick={getLocation}
                      size="small"
                      edge="end"
                      disabled={fetchingLocation}
                    >
                      {fetchingLocation ? (
                        <CircularProgress size={18} />
                      ) : (
                        <MyLocationIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5, bgcolor: "background.paper" }
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            type="date"
            name="checkInDate"
            label="Check-in"
            value={data.checkInDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5, bgcolor: "background.paper" }
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            type="date"
            name="checkOutDate"
            label="Check-out"
            value={data.checkOutDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5, bgcolor: "background.paper" }
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={4} sm={2} md={1.2}>
          <TextField
            fullWidth
            type="number"
            name="countRooms"
            label="Rooms"
            value={data.countRooms}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: { min: 1 },
              startAdornment: (
                <InputAdornment position="start">
                  <MeetingRoomIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5, bgcolor: "background.paper" }
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={4} sm={2} md={1.2}>
          <TextField
            fullWidth
            type="number"
            name="guests"
            label="Guests"
            value={data.guests}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: { min: 1 },
              startAdornment: (
                <InputAdornment position="start">
                  <GroupIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5, bgcolor: "background.paper" }
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={4} sm={4} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSearch}
            startIcon={<SearchIcon fontSize="small" />}
            sx={{
              height: { xs: 40, sm: 44, md: 56 },
              borderRadius: 1.5,
              fontWeight: 600,
              boxShadow: 2,
              textTransform: "none",
              "&:hover": { transform: "scale(1.03)" }
            }}
            size="medium"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchForm;
