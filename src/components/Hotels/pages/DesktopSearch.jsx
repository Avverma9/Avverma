import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, TextField, IconButton } from '@mui/material';
import { CiLocationArrow1, CiSearch } from 'react-icons/ci';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '12px 16px',
  margin: '16px',
  borderRadius: '24px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(2px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    '& fieldset': {
      borderColor: '#e0e0e0',
      transition: 'border-color 0.3s ease-in-out',
    },
    '&:hover fieldset': {
      borderColor: '#9e9e9e',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '16px',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  color: '#ffffff',
  borderRadius: '50%',
  padding: '12px',
  '&:hover': {
    backgroundColor: '#303f9f',
    transform: 'scale(1.05)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '28px',
  },
}));

const DesktopSearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date().toISOString().split('T')[0];

  const [searchData, setSearchData] = useState({
    search: '',
    checkInDate: currentDate,
    checkOutDate: currentDate,
    countRooms: 1,
    guests: 2,
    latitude: '',
    longitude: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const queryString = Object.entries({
      ...searchData,
      latitude: '',
      longitude: '',
    })
      .filter(([key, value]) => value || key === 'countRooms' || key === 'guests')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    navigate(`/search?${queryString}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
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
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  if (location.pathname !== '/search' && location.pathname !== '/search/hotels') {
    return null;
  }

  return (
    <StyledPaper
      onKeyDown={handleKeyPress}
      sx={{
        width: 'calc(100% - 250px - 32px)',
        minWidth: 400,
        marginLeft: 'auto',
        marginRight: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
      }}
    >
      <StyledTextField
        fullWidth
        placeholder="Search for a city or hotel..."
        variant="outlined"
        name="search"
        value={searchData.search}
        onChange={handleInputChange}
        inputProps={{ maxLength: 50 }}
        sx={{ marginRight: 2 }}
        InputProps={{
          startAdornment: (
            <CiSearch style={{ color: '#9e9e9e', fontSize: '20px', marginRight: '8px' }} />
          ),
        }}
      />
      <IconButton
        onClick={getLocation}
        style={{ color: '#3f51b5', fontSize: '20px', marginRight: '8px' }}
      >
        <CiLocationArrow1 />
      </IconButton>
      <StyledIconButton onClick={handleSearch}>
        <CiSearch />
      </StyledIconButton>
    </StyledPaper>
  );
};

export default DesktopSearchBox;