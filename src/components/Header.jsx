import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  Tooltip,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalOffer, OfflineShareRounded } from "@mui/icons-material";

const Header = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Adjusted for better responsiveness
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
    { text: "Holidays", icon: <TravelExploreIcon />, path: "/travellers" },
    { text: "List Property", icon: <BusinessIcon />, path: "/partner" },
    { text: "Travel Partner", icon: <BusinessIcon />, path: "/travel-partner" },
  ];

  const contactLink = {
    text: "Call Us",
    number: "9917991758",
    icon: <PhoneIcon sx={{ mr: 1 }} />,
    path: "tel:9917991758",
  };

  const userMenuItems = [
    { text: "Profile", icon: <PersonIcon fontSize="small" />, path: "/profile" },
    { text: "Bookings", icon: <LocalOffer fontSize="small" />, path: "/bookings" },
    { text: "Coupons", icon: <OfflineShareRounded fontSize="small" />, path: "/coupons" },
  ];

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {navLinks.map((link) => (
        <Button
          key={link.text}
          onClick={() => handleRedirect(link.path)}
          sx={{
            color: "text.primary",
            fontWeight: 500,
            textTransform: "capitalize",
            fontSize: "1rem",
            py: 2,
            px: 2,
            borderRadius: '8px',
            transition: 'background-color 0.3s',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          {link.text}
        </Button>
      ))}
    </Box>
  );

  const renderMobileDrawer = () => (
    <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu} PaperProps={{ sx: { width: 280, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 } }}>
      <Box role="presentation">
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ height: 35 }} />
            <IconButton onClick={toggleMobileMenu}>
                <MenuIcon />
            </IconButton>
        </Box>
        <Divider />
        <List>
          {[...navLinks, { ...contactLink, text: `${contactLink.text}: ${contactLink.number}` }].map((link) => (
            <ListItem key={link.text} disablePadding>
              <ListItemButton onClick={() => { handleRedirect(link.path); toggleMobileMenu(); }}>
                <ListItemIcon sx={{ color: 'text.secondary' }}>{link.icon}</ListItemIcon>
                <Typography variant="body1" fontWeight={500}>{link.text}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
           <Divider sx={{ my: 1 }} />
           {isLoggedIn ? (
             <>
              {userMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton onClick={() => { handleRedirect(item.path); toggleMobileMenu(); }}>
                        <ListItemIcon sx={{ color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                        <Typography variant="body1" fontWeight={500}>{item.text}</Typography>
                    </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon sx={{ color: 'error.main' }}><LogoutIcon/></ListItemIcon>
                    <Typography variant="body1" fontWeight={500} sx={{ color: 'error.main' }}>Logout</Typography>
                </ListItemButton>
              </ListItem>
             </>
           ) : (
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleRedirect('/login')}>
                    <ListItemIcon sx={{ color: 'primary.main' }}><LoginIcon/></ListItemIcon>
                    <Typography variant="body1" fontWeight={500} sx={{ color: 'primary.main' }}>Login / Sign Up</Typography>
                </ListItemButton>
            </ListItem>
           )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          transition: 'all 0.4s ease-in-out',
          bgcolor: headerScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: headerScrolled ? 'blur(16px)' : 'none',
          boxShadow: headerScrolled ? '0px 4px 30px rgba(0,0,0,0.08)' : 'none',
          color: 'text.primary',
          borderBottomLeftRadius: headerScrolled ? '20px' : '0px',
          borderBottomRightRadius: headerScrolled ? '20px' : '0px',
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", height: 80 }}>
          <Box onClick={() => handleRedirect("/")} sx={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ height: 45, verticalAlign: 'middle' }} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {!isMobile && renderDesktopNav()}
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', md: 'block' } }} />

            {!isMobile && (
              <Button
                variant="text"
                onClick={() => handleRedirect(contactLink.path)}
                startIcon={contactLink.icon}
                sx={{ textTransform: 'none', color: 'text.secondary' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ lineHeight: 1.2 }}>{contactLink.text}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{contactLink.number}</Typography>
                </Box>
              </Button>
            )}
            
            {isLoggedIn ? (
                <Tooltip title="Account Settings">
                  <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
                    <Avatar sx={{ width: 42, height: 42, bgcolor: 'black.main', transition: 'transform 0.2s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
            ) : (
                !isMobile && (
                    <Button 
                        variant="contained" 
                        onClick={() => handleRedirect('/login')} 
                        startIcon={<LoginIcon/>}
                        sx={{ borderRadius: '20px', textTransform: 'none', boxShadow: 'none', ml: 1 }}
                    >
                        Login
                    </Button>
                )
            )}

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  borderRadius: '12px',
                  minWidth: 200,
                  '& .MuiMenuItem-root': { padding: '12px 16px' },
                  '&:before': {
                    content: '""', display: 'block', position: 'absolute', top: 0, right: 14,
                    width: 10, height: 10, bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {userMenuItems.map((item) => (
                 <MenuItem key={item.text} onClick={() => handleRedirect(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.text}
                 </MenuItem>
              ))}
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon sx={{ color: 'error.main' }}><LogoutIcon fontSize="small" /></ListItemIcon>
                {isLoggedIn ? "Logout" : "Login"}
              </MenuItem>
            </Menu>
            
            {isMobile && (
              <IconButton onClick={toggleMobileMenu} edge="end">
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileDrawer()}
    </>
  );
};

export default Header;
