import React, { useState, useEffect } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import SearchSkeleton from "./SearchSkeleton";
import "./Search.css";

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
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

  // Fetch current location on mount and reverse geocode
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

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
            // latitude,
            // longitude,
            search: residentialName,
          }));
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location: ", error);
        setLoading(false);
      }
    );
  }, []);

  if (location.pathname !== "/") {
    return null;
  }

  if (loading) {
    return <SearchSkeleton />;
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

  // On clicking location icon, get fresh location & reverse geocode
  const getLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
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

          // navigate(`/search?latitude=${latitude}&longitude=${longitude}`);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
        }
      },
      (error) => {
        console.error("Error getting location: ", error);
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
                <CiLocationArrow1
                  onClick={getLocation}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className="search-btn"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchForm;
