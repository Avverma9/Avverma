import React, { useState, useEffect } from "react";
import { Button, TextField, InputAdornment, CircularProgress, IconButton } from "@mui/material";
import { CiLocationArrow1, CiSearch } from "react-icons/ci"; // 🔘 Location Icon
import { useNavigate, useLocation } from "react-router-dom";
import "./Search.css";

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [fetchingLocation, setFetchingLocation] = useState(false); // Optional loader state for location fetch

  const [searchData, setSearchData] = useState({
    search: "",
    checkInDate: currentDate,
    checkOutDate: currentDate,
    countRooms: 1,
    guests: 2,
    localId: "",
    unmarriedCouplesAllowed: "",
    latitude: "",
    longitude: "",
  });

  // ⛔ Removed automatic location fetch on mount
  useEffect(() => {
    setLoading(false); // Only used to simulate loading effect
  }, []);

  if (location.pathname !== "/") {
    return null;
  }
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    const inputValue = type === "checkbox" ? (checked ? "Accepted" : "") : value;

    setSearchData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSearch = () => {
    const finalGuests = Math.min(parseInt(searchData.guests) || 0, 3);

    const queryString = Object.entries({
      ...searchData,
      guests: finalGuests,
      latitude: searchData.latitude || "",
      longitude: searchData.longitude || "",
    })
      .filter(([key, value]) => {
        return value || key === "countRooms" || key === "guests";
      })
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

  // 📍 Manually fetch location and reverse geocode when icon is clicked
  const getLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    setFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const residentialName = data.address?.residential || "";

          setSearchData((prev) => ({
            ...prev,
            latitude,
            longitude,
            search: residentialName,
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
    <div className="search-bar">
      <TextField
        type="date"
        name="checkInDate"
        value={searchData.checkInDate}
        onChange={handleInputChange}
        className="date-picker"
        label="Check-in Date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        type="date"
        name="checkOutDate"
        value={searchData.checkOutDate}
        onChange={handleInputChange}
        className="date-picker"
        label="Check-out Date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="countRooms"
        value={searchData.countRooms}
        onChange={handleInputChange}
        className="dropdowns"
        label="Rooms"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="guests"
        value={searchData.guests}
        onChange={handleInputChange}
        className="dropdowns"
        label="Guests"
        InputLabelProps={{ shrink: true }}
      />
      <div className="search-input">
        <TextField
          variant="outlined"
          placeholder="Search for city, location, hotel"
          name="search"
          value={searchData.search}
          onChange={handleInputChange}
          className="search-field"
          label="Search for hotel"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {fetchingLocation ? (
                  <CircularProgress size={20} />
                ) : (
                  <CiLocationArrow1
                    onClick={getLocation}
                    style={{ cursor: "pointer", fontSize: "20px", color: "blue" }}
                    title="Use current location"
                  />
                )}
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          onKeyPress={handleKeyPress}
        />
      </div>
   <IconButton
  onClick={handleSearch}
  style={{
    backgroundColor: 'transparent',
    padding: 4,
  }}
>
  <CiSearch size={28} color="#007bff" />
</IconButton>

    </div>
  );
};

export default SearchForm;
