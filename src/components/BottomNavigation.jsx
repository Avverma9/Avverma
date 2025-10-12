import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI Core Components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import useMediaQuery from "@mui/material/useMediaQuery";

// MUI Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';


export default function ModernBottomNavigation() {
  const isSmallScreen = useMediaQuery("(max-width:768px)"); // Show on tablets as well
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  // Map routes to navigation values
  const routeMap = {
    "/holidays": 0,
    "/": 1,
    "/cabs": 2, // New route for Cabs
    "/profile": 3,
  };

  // Sync active state with the current URL
  React.useEffect(() => {
    const currentPath = location.pathname;
    const correspondingValue = routeMap[currentPath];
    if (correspondingValue !== undefined) {
      setValue(correspondingValue);
    }
  }, [location.pathname]);

  // Hide navigation on login/register pages
  if (location.pathname === "/login" || location.pathname.includes("/register")) {
    return null;
  }
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  if (isSmallScreen) {
    return (
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Paper
          sx={{
            // Added modern styling with transparency and rounded corners
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            boxShadow: '0px -4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue); // Update state for immediate visual feedback
            }}
            sx={{
              // Make the navigation itself transparent to show the Paper's background
              backgroundColor: 'transparent',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              "& .MuiBottomNavigationAction-root": {
                color: '#4B5563', // Bolder inactive color
                transition: 'all 0.3s ease',
              },
              "& .Mui-selected": {
                color: 'primary.main', // Keep active color bold
                "& .MuiSvgIcon-root, .MuiBottomNavigationAction-label": {
                  color: 'primary.main',
                },
                "& .MuiBottomNavigationAction-label": {
                  fontWeight: 'bold', // Bolder text for active item
                }
              },
            }}
          >
            <BottomNavigationAction
              label="Holidays"
              icon={<LandscapeRoundedIcon />}
              onClick={() => handleNavigation("/holidays")}
            />
            <BottomNavigationAction
              label="Home"
              icon={<HomeRoundedIcon />}
              onClick={() => handleNavigation("/")}
            />
            <BottomNavigationAction
              label="Cabs"
              icon={<DirectionsCarFilledRoundedIcon />}
              onClick={() => handleNavigation("/cabs")}
            />
            <BottomNavigationAction
              label="Profile"
              icon={<AccountCircleRoundedIcon />}
              onClick={() => handleNavigation("/profile")}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }

  return null; // Don't render anything on larger screens
}