import React, { useState } from 'react';
import { Modal, Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './Disclaimer.css'; // Include the custom styles

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
                        <p className="text-center mb-4">
                            Welcome to the <strong>Partner Portal</strong> of Roomstay!
                            <br />
                            Are you interested in becoming our trusted partner? Whether you run a hotel or offer travel experiences,
                            we’d love to collaborate and grow together.
                        </p>

                        <hr />

                        <h2>🏨 Hotel Partner</h2>
                        <p>
                            If you own or manage a hotel, guesthouse, homestay, or any form of accommodation, Roomstay provides you
                            with a powerful platform to increase visibility, attract more bookings, and streamline guest management.
                            By partnering with us:
                        </p>
                        <ul>
                            <li>📈 Reach thousands of daily travelers</li>
                            <li>💼 List your property in just a few steps</li>
                            <li>⚙️ Manage bookings easily via our dashboard</li>
                            <li>📞 Get dedicated partner support</li>
                        </ul>

                        <h2>🌍 Travel Partner</h2>
                        <p>
                            Are you a travel agent, local guide, or organizer of holiday experiences? As a Roomstay Travel Partner,
                            you can showcase your packages, connect with a wider audience, and earn more while helping customers
                            create unforgettable trips.
                        </p>
                        <ul>
                            <li>🧭 Publish your travel packages</li>
                            <li>🚗 Offer transportation, tours, and more</li>
                            <li>📊 Track customer leads and engagement</li>
                            <li>🤝 Collaborate with hotels and agencies</li>
                        </ul>
                        <h4>📜 Terms & Conditions</h4>
                        <ol>
                            <li>All listings are subject to verification and approval by the Roomstay team.</li>
                            <li>Partners must provide accurate and up-to-date information about their services.</li>
                            <li>Roomstay reserves the right to delist partners who do not comply with service standards or legal requirements.</li>
                            <li>Any disputes related to bookings must be handled professionally; our team may assist in mediation if needed.</li>
                            <li>Commission structures or listing fees (if any) will be communicated transparently before onboarding.</li>
                            <li>Data shared with Roomstay will be handled per our <a href="/privacy-policy">Privacy Policy</a>.</li>
                        </ol>

                        <div className="modal-actions">
                            <Button variant="contained" onClick={handleMarkAsRead} className="action-button">
                                Yes I Accept
                            </Button>
                        </div>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
};

export default Disclaimer;
