import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get the next day's date
  const getTomorrowDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().split('T')[0];
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const [searchData, setSearchData] = useState({
    city: '',
    startDate: currentDate,
    endDate: getTomorrowDate(currentDate),
    countRooms: 1,
    guests: 2,
    localId: '',
    unmarriedCouplesAllowed: '',
  });

  useEffect(() => {
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      endDate: getTomorrowDate(prevSearchData.startDate),
    }));
  }, [searchData.startDate]);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
  
    // If the input is a checkbox, set the value to 'Accepted' or 'Not Accepted'
    const inputValue = type === 'checkbox' ? (checked ? 'Accepted' : '') : value.trim();
  
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: inputValue,
    }));
  };
  const [displayedGuests, setDisplayedGuests] = useState(searchData.guests);
  const [displayedRooms, setDisplayedRooms] = useState(searchData.countRooms);

  useEffect(() => {
    setDisplayedGuests(searchData.guests);
    setDisplayedRooms(searchData.countRooms);
  }, [searchData.guests, searchData.countRooms]);

  const handleSearch = () => {
    const queryString = Object.entries(searchData)
      .filter(([key]) => key !== 'countRooms' && key !== 'guests') // Exclude countRooms and guests
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    navigate(`/search?${queryString}`);
  };

  // Adjust the number of rooms when the number of adults is increased
  const handleAdultsChange = (value) => {
    const newAdults = parseInt(value, 10);
    setSearchData({
      ...searchData,
      guests: newAdults,
    });
  };

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div
      style={{
        position: 'relative',
        marginTop: '2px',
        marginBottom: '2px',
        backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-searching-hostel-banner-hotel-journey-image_1091602.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px', // Adjust the height as needed
      }}
    >
      <Container
        className="border border-primary rounded p-3 mt-2"
        style={{ maxWidth: '400px', position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
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
              style={{ fontSize: '14px' }}
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
              style={{ fontSize: '14px' }}
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
              style={{ fontSize: '14px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Enter number of adults"
              variant="outlined"
              type="number"
              name="adults"
              value={displayedGuests}
              onChange={(e) => {
                handleAdultsChange(e.target.value);
                setDisplayedGuests(e.target.value);
              }}
              style={{ fontSize: '14px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Enter number of rooms"
              variant="outlined"
              type="number"
              name="rooms"
              value={displayedRooms}
              onChange={(e) => {
                handleInputChange(e);
                setDisplayedRooms(e.target.value);
              }}
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
