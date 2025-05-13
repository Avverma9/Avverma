import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Collapse,
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    useMediaQuery,
    Tooltip,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const open = Boolean(menuAnchor);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const isLoggedIn = localStorage.getItem('isSignedIn');

    const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleRedirect = (path) => {
        window.location.href = path;
        handleMenuClose();
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
        handleMenuClose();
    };

    if (['/login', '/register'].includes(location.pathname)) return null;

    const navLinks = [
        { text: 'Holidays', icon: <TravelExploreIcon />, path: '/travellers' },
        { text: 'List Property', icon: <BusinessIcon />, path: '/partner' },
        { text: 'Travel Partner', icon: <BusinessIcon />, path: '/travel-partner' },
        { text: 'Call: 9917991758', icon: <PhoneIcon />, path: null },
    ];

    return (
        <>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box onClick={() => handleRedirect('/')} sx={{ cursor: 'pointer' }}>
                        <img src="/logo.png" alt="Logo" height={40} />
                    </Box>

                    {/* Right Side */}
                    <Box display="flex" alignItems="center">
                        {isMobile ? (
                            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            navLinks.map((link, idx) => (
                                <Button
                                    key={idx}
                                    onClick={() => link.path && handleRedirect(link.path)}
                                    startIcon={link.icon}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        mx: 1,
                                    }}
                                >
                                    {link.text}
                                </Button>

                            ))
                        )}

                        {/* Avatar Menu */}
                        <Tooltip title="Account Settings">
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={menuAnchor}
                            open={open}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    backgroundColor: '#ffffff',
                                    minWidth: 180,
                                    mt: 1.5,
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    '& .MuiMenuItem-root': {
                                        fontWeight: 500,
                                        color: '#333',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            color: '#1976d2',
                                        },
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: '#1976d2',
                                        minWidth: '36px',
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleRedirect('/profile')}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => handleRedirect('/')}>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" />
                                </ListItemIcon>
                                Home
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                {isLoggedIn ? 'Logout' : 'Login'}
                            </MenuItem>
                        </Menu>

                    </Box>
                </Toolbar>
            </AppBar>

            {/* Slide-down mobile menu */}
            {isMobile && (
                <Collapse in={mobileMenuOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ bgcolor: '#f5f5f5', px: 2, py: 1 }}>
                        {navLinks.map((link, idx) => (
                            <Box
                                key={idx}
                                onClick={() => link.path && handleRedirect(link.path)}
                                sx={{ display: 'flex', alignItems: 'center', py: 1, cursor: 'pointer' }}
                            >
                                {link.icon}
                                <Typography sx={{ ml: 1 }}>{link.text}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Collapse>
            )}
        </>
    );
};

export default Header;
