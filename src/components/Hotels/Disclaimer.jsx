import React, { useState } from 'react';
import { Modal, Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './Disclaimer.css'; // Include the custom styles
import alert from '../../utils/custom_alert/custom_alert';

const Disclaimer = () => {
    const [open, setOpen] = useState(true); // Modal starts as open
    const [accepted, setAccepted] = useState(false); // Track if user clicked 'I Read'

    // Open the modal
    const handleOpen = () => setOpen(true);

    // Close the modal
    const handleClose = () => setOpen(false);

    // Mark as read
    const handleMarkAsRead = () => {
        setAccepted(true);
        setOpen(false);
    };
    // if (accepted) {
    //     alert('You have accepted our partner guidlines');
    // }
    return (
        <div>
            {/* Modal with disclaimer */}
            <Modal
                open={open}
                onClose={(event, reason) => {
                    // Only close if the user presses the escape key, not if they click outside
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                aria-labelledby="disclaimer-title"
            >
                <Box className="disclaimer-modal">
                    <Paper elevation={3} className="disclaimer-paper">
                        <div className="modal-header">
                            <Typography variant="h6" id="disclaimer-title">
                                {`👉`} Partners terms & conditions
                            </Typography>
                            <IconButton onClick={handleClose} className="close-button">
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <Typography paragraph>
                            <strong>Hotel Partner Terms and Conditions</strong>
                            <br />
                            Write the terms and conditions for the Hotel Partner here. Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                        </Typography>

                        <div className="modal-divider">
                            <Typography variant="h6">Travel Partner Terms & Conditions</Typography>
                            <Typography paragraph>
                                <strong>Travel Partner Terms and Conditions</strong>
                                <br />
                                Write the terms and conditions for the Travel Partner here. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed cursus ante dapibus
                                diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante
                                dapibus diamSed cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam Sed
                                cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante dapibus
                                diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante
                                dapibus diam Sed cursus ante dapibus diamSed cursus ante dapibus diam Sed cursus ante dapibus diam Sed
                                cursus ante dapibus diam Sed cursus ante dapibus diam Sed cursus ante dapibus diam
                            </Typography>
                        </div>

                        <div className="modal-actions">
                            <Button variant="contained" onClick={handleMarkAsRead} className="action-button">
                                I Accept
                            </Button>
                        </div>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
};

export default Disclaimer;
