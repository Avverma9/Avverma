import React from 'react';
import { Box, TextField, MenuItem, Button, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* Location Input */}
      <TextField
        select
        fullWidth
        label="Location"
        defaultValue="Tokyo, Japan"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value="Tokyo, Japan">Tokyo, Japan</MenuItem>
        <MenuItem value="New York, USA">New York, USA</MenuItem>
        <MenuItem value="Paris, France">Paris, France</MenuItem>
      </TextField>

      {/* Check-in and Check-out Input */}
      <TextField
        fullWidth
        label="Check In - Check Out"
        defaultValue="4 Jan 2023 - 6 Jan 2023"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Room & Guest Input */}
      <TextField
        select
        fullWidth
        label="Room & Guest"
        defaultValue="1 Room, 2 Guests"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value="1 Room, 1 Guest">1 Room, 1 Guest</MenuItem>
        <MenuItem value="1 Room, 2 Guests">1 Room, 2 Guests</MenuItem>
        <MenuItem value="2 Rooms, 4 Guests">2 Rooms, 4 Guests</MenuItem>
      </TextField>

      {/* Search Button */}
      <Button
        variant="contained"
        color="success"
        sx={{
          minWidth: '50px',
          height: '56px',
          borderRadius: '50%',
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default Search;
