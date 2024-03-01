import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ArchiveIcon from '@mui/icons-material/Archive';
import LoginIcon from '@mui/icons-material/Login';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Bottom() {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed
  const [value, setValue] = React.useState(0);

  if (isSmallScreen) {
    return (
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction href='/login' label="Login/register" icon={<LoginIcon />} />
            <BottomNavigationAction href='/partner' label="Be a partner" icon={<HandshakeIcon />} />
            <BottomNavigationAction href='/' label="Home" icon={<HomeWorkTwoToneIcon />} />
            <BottomNavigationAction href='/profile' label="Profile" icon={<AccountCircleIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }

  return null; // Don't render anything on larger screens
}
