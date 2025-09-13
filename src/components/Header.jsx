import {
  LocalOffer,
  OfflineShareRounded,
  LocalTaxi as LocalTaxiIcon,
} from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  textTransform: "capitalize",
  fontSize: "1rem",
  padding: "8px 16px",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Header = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isSignedIn");

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleRedirect = (path) => {
    if (path.startsWith("tel:")) {
      window.location.href = path;
    } else {
      navigate(path);
    }
    handleMenuClose();
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    handleMenuClose();
  };

  if (["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  const navLinks = [
    { text: "Cabs", icon: <LocalTaxiIcon />, path: "/cabs" },
    { text: "Holidays", icon: <TravelExploreIcon />, path: "/travellers" },
    { text: "List Property", icon: <BusinessIcon />, path: "/partner" },
    { text: "Travel Partner", icon: <BusinessIcon />, path: "/travel-partner" },
  ];

  const contactLink = {
    text: "Call Us",
    number: "9917991758",
    icon: <PhoneIcon />,
    path: "tel:9917991758",
  };

  const userMenuItems = [
    {
      text: "Profile",
      icon: <PersonIcon fontSize="small" />,
      path: "/profile",
    },
    {
      text: "Bookings",
      icon: <LocalOffer fontSize="small" />,
      path: "/bookings",
    },
    {
      text: "Coupons",
      icon: <OfflineShareRounded fontSize="small" />,
      path: "/coupons",
    },
  ];

  const renderDesktopNav = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {navLinks.map((link) => (
        <NavButton
          key={link.text}
          onClick={() => handleRedirect(link.path)}
          startIcon={link.icon}
          variant={location.pathname === link.path ? "contained" : "text"}
          color="inherit"
          sx={{
            bgcolor: location.pathname === link.path ? 'action.selected' : 'transparent',
          }}
        >
          {link.text}
        </NavButton>
      ))}
    </Box>
  );

  const renderMobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: 280,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          borderLeft: 0,
          boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.3)',
          // Glassmorphism UI
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Profile Header */}
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
           {isLoggedIn ? (
             <Box sx={{display: 'flex', alignItems: 'center'}}>
               
                <Box onClick={() => handleRedirect("/")} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <img src="/logo.png" alt="Logo" style={{ height: 45, verticalAlign: "middle" }}/>
            </Box>
             </Box>
           ) : (
             <Box sx={{flex: 1}}>
                <Button fullWidth variant="contained" startIcon={<LoginIcon />} onClick={() => handleRedirect('/login')}>
                    Login / Sign Up
                </Button>
             </Box>
           )}
        </Box>
        <Divider />

        {/* Navigation List */}
        <List sx={{ flexGrow: 1, p: 1 }}>
          {navLinks.map((link) => (
            <ListItem key={link.text} disablePadding>
              <ListItemButton
                onClick={() => handleRedirect(link.path)}
                selected={location.pathname === link.path}
                sx={{
                  borderRadius: 3,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    }
                  }
                }}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <Typography fontWeight={500}>{link.text}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        {/* Footer with Logout */}
        <Box>
            <Divider />
            <List sx={{p: 1}}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleRedirect(contactLink.path)} sx={{borderRadius: 3}}>
                <ListItemIcon>{contactLink.icon}</ListItemIcon>
                <Typography fontWeight={500}>{contactLink.text}</Typography>
              </ListItemButton>
            </ListItem>
            {isLoggedIn && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout} sx={{borderRadius: 3}}>
                    <ListItemIcon sx={{ color: "error.main" }}><LogoutIcon /></ListItemIcon>
                    <Typography fontWeight={500} sx={{ color: "error.main" }}>Logout</Typography>
                  </ListItemButton>
                </ListItem>
            )}
            </List>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          transition: "all 0.4s ease-in-out",
          bgcolor: headerScrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
          backdropFilter: headerScrolled ? "blur(16px)" : "none",
          boxShadow: headerScrolled ? "0px 4px 30px rgba(0,0,0,0.08)" : "none",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ height: 80 }}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton onClick={toggleMobileMenu} edge="start" sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Box onClick={() => handleRedirect("/")} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <img src="/logo.png" alt="Logo" style={{ height: 45, verticalAlign: "middle" }}/>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" }, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            {renderDesktopNav()}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile && (
              <Button variant="text" onClick={() => handleRedirect(contactLink.path)} startIcon={contactLink.icon} sx={{ textTransform: "none", color: "text.secondary", mr: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Typography variant="caption" sx={{ lineHeight: 1.2 }}>{contactLink.text}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>{contactLink.number}</Typography>
                </Box>
              </Button>
            )}
            {isLoggedIn ? (
              <Tooltip title="Account Settings">
                <IconButton onClick={handleMenuOpen} size="small">
                  <Avatar sx={{ width: 42, height: 42, bgcolor: 'grey', color: 'white', transition: "transform 0.2s ease-in-out", "&:hover": { transform: "scale(1.1)" } }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              !isMobile && (
                <Button variant="contained" onClick={() => handleRedirect("/login")} startIcon={<LoginIcon />} sx={{ borderRadius: "20px", textTransform: "none", boxShadow: "none" }}>Login</Button>
              )
            )}
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.1))",
                  mt: 1.5,
                  borderRadius: "12px",
                  minWidth: 200,
                  "& .MuiMenuItem-root": { padding: "12px 16px" },
                  "&:before": { content: '""', display: "block", position: "absolute", top: 0, right: 14, width: 10, height: 10, bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0 },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {userMenuItems.map((item) => (
                <MenuItem key={item.text} onClick={() => handleRedirect(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>{item.text}
                </MenuItem>
              ))}
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon sx={{ color: "error.main" }}><LogoutIcon fontSize="small" /></ListItemIcon>
                {isLoggedIn ? "Logout" : "Login"}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileDrawer()}
    </>
  );
};

export default Header;