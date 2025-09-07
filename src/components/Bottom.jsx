import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useLocation } from "react-router-dom";

export default function Bottom() {
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Adjust the breakpoint as needed
  const [value, setValue] = React.useState(2);
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname.includes("/register"))
    return null;

  if (isSmallScreen) {
    return (
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              href="/travellers"
              label="Holidays"
              icon={<MdOutlineTravelExplore size={24} />}
            />
            <BottomNavigationAction
              href="/"
              label="Home"
              icon={<HomeWorkTwoToneIcon />}
            />
            <BottomNavigationAction
              href="/profile"
              label="Profile"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }

  return null; // Don't render anything on larger screens
}
