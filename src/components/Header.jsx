import React from 'react';
import { FaSuitcase, FaBuilding, FaPhoneAlt, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Ensure to include the CSS file for styles
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MdOutlineTravelExplore } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const location = useLocation();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoClick = () => {
        window.location.href = '/';
        handleClose();
    };

    const handleLoginLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
        handleClose();
    };

    const handleRedirect = (path) => {
        window.location.href = path;
        handleClose();
    };

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const handleAuth = localStorage.getItem('isSignedIn', true);

    return (
        <header className="header d-flex align-items-center justify-content-between p-3 border-bottom">
            <div className="logo">
                <img
                    onClick={logoClick}
                    src="https://avverma.s3.ap-south-1.amazonaws.com/image-removebg-preview.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARRSTFGSV74HCL27W%2F20250322%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250322T063913Z&X-Amz-Expires=300&X-Amz-Signature=af6239615530f7b104108820b1a3283ac4a258b20a3c048eb5c5d901bd7104fd&X-Amz-SignedHeaders=host"
                    alt="Hotel Roomsstay"
                    className="img-fluid"
                />
            </div>
            <nav className="d-flex align-items-center">
                <div className="nav-item mx-1 d-none d-md-flex flex-column align-items-center">
                    <a href="/travellers" className="nav-link text-dark">
                        <MdOutlineTravelExplore size={24} />
                        <br />
                        Holidays
                        <br />
                        <small className="text-muted">Check our holiday packages</small>
                    </a>
                </div>
                <div className="separator"></div>
                <div className="nav-item mx-1 d-none d-md-flex flex-column align-items-center">
                    <FaBuilding size={24} />
                    <a href="/partner" className="nav-link text-dark">
                        List your property
                    </a>
                    <small className="text-muted">Start earning in 30 mins</small>
                </div>
                <div className="separator"></div>
                <div className="nav-item mx-1 d-flex flex-column align-items-center">
                    <FaPhoneAlt size={24} />
                    <span className="nav-link text-dark">9917991758</span>
                    <small className="text-muted">Call us to Book now</small>
                </div>
                <div className="separator"></div>
                <div className="nav-item mx-1 dropdown d-flex align-items-center">
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 12 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <FaUser />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    padding: 2,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => handleRedirect('/profile')}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleRedirect('/')}>
                            <ListItemIcon>
                                <HomeIcon fontSize="small" />
                            </ListItemIcon>
                            Home
                        </MenuItem>
                        <MenuItem onClick={() => handleRedirect('/partner')}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Hotel Partner
                        </MenuItem>
                        <MenuItem onClick={() => handleRedirect('/travel-partner')}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Travel Partner
                        </MenuItem>
                        <MenuItem onClick={handleLoginLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            {handleAuth && handleAuth ? 'Logout' : 'Login'}
                        </MenuItem>
                    </Menu>
                </div>
            </nav>
        </header>
    );
};

export default Header;
