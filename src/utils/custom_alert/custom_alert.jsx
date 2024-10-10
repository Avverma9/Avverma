// CustomAlert.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Typography } from '@mui/material';
import './custom_alert.css'; // Import the CSS file

let showAlertTimeout;

const CustomAlert = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            showAlertTimeout = setTimeout(() => {
                onClose();
            }, 3000); // Auto-close after 3 seconds
        }

        return () => clearTimeout(showAlertTimeout);
    }, [message, onClose]);

    return (
        <Box
            className="custom-alert"
            sx={{
                position: 'fixed',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'white',
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
                zIndex: 1000,
                animation: 'slide-in 0.5s ease-out',
            }}
        >
            <Typography variant="body1" sx={{ display: 'inline-block' }}>
                {message}
            </Typography>
            <button onClick={onClose} className="custom-button" aria-label="Close Alert">
                &times; {/* Close icon */}
            </button>
        </Box>
    );
};

const alert = (message) => {
    const alertContainer = document.createElement('div');
    document.body.appendChild(alertContainer);

    const handleClose = () => {
        ReactDOM.unmountComponentAtNode(alertContainer);
        document.body.removeChild(alertContainer);
    };

    ReactDOM.render(<CustomAlert message={message} onClose={handleClose} />, alertContainer);
};

export default alert;
