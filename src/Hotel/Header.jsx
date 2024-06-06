import React from "react";
import { FaSuitcase, FaBuilding, FaPhoneAlt, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // Ensure to include the CSS file for styles
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define the navigation functions
  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handlePartner = () => {
    navigate("/partner");
    handleClose();
  };
  const logoClick = () => {
    navigate("/");
    handleClose();
  };
  const handleLoginLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
    handleClose();
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  
  return (
    <header className="header d-flex align-items-center justify-content-between p-3 border-bottom">
      <div className="logo">
        <img
          onClick={logoClick}
          src="https://www.reshot.com/preview-assets/icons/4DE7B2XR9S/hotel-sign-4DE7B2XR9S.svg"
          alt="Hotel Roomsstay"
          className="img-fluid"
        />
      </div>
      <nav className="d-flex align-items-center">
        <div className="nav-item mx-3 d-none d-md-flex flex-column align-items-center">
          <FaSuitcase size={24} />
          <a href="#" className="nav-link text-dark">
            Roomsstay for Business
          </a>
          <small className="text-muted">Trusted by Our Corporates</small>
        </div>
        <div className="nav-item mx-3 d-none d-md-flex flex-column align-items-center">
          <FaBuilding size={24} />
          <a href="#" className="nav-link text-dark">
            List your property
          </a>
          <small className="text-muted">Start earning in 30 mins</small>
        </div>
        <div className="nav-item mx-3 d-flex flex-column align-items-center">
          <FaPhoneAlt size={24} />
          <span className="nav-link text-dark">9917991758</span>
          <small className="text-muted">Call us to Book now</small>
        </div>

        <div className="nav-item mx-3 dropdown d-flex align-items-center">
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
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
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfile}>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handlePartner}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Become a Partner
            </MenuItem>
            <MenuItem onClick={handleLoginLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
