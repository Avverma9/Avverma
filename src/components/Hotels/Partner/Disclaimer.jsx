import React, { useState } from 'react';
import { Modal, Box, Button, IconButton, Typography, Paper, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Disclaimer = () => {
    const [open, setOpen] = useState(true);
    const [accepted, setAccepted] = useState(false);

    const handleClose = () => setOpen(false);

    const handleMarkAsRead = () => {
        setAccepted(true);
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                aria-labelledby="disclaimer-title"
                aria-describedby="disclaimer-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        width: { xs: '95%', sm: 600, md: 700 },
                        maxWidth: '90%',
                        maxHeight: '90vh',
                        borderRadius: 3,
                        outline: 'none',
                        p: { xs: 2, sm: 4 },
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h6"
                            component="h5"
                            id="disclaimer-title"
                            sx={{ fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            👉 Partners Terms & Conditions
                        </Typography>
                        <IconButton onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Welcome to the Partner Portal of Roomstay!
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Scrollable Content */}
                    <Box
                        id="disclaimer-description"
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            pr: 2,
                            // Custom scrollbar for modern feel
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#bdbdbd',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                    >
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mt: 2, color: 'text.primary' }}>
                            🏨 Hotel Partner
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1, color: 'text.secondary' }}>
                            If you own or manage a hotel, guesthouse, homestay, or any form of accommodation, Roomstay provides you with a powerful platform to increase visibility, attract more bookings, and streamline guest management.
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, listStyleType: 'disc', color: 'text.secondary', fontSize: '0.9rem' }}>
                            <li>📈 Reach thousands of daily travelers</li>
                            <li>💼 List your property in just a few steps</li>
                            <li>⚙️ Manage bookings easily via our dashboard</li>
                            <li>📞 Get dedicated partner support</li>
                        </Box>

                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mt: 2, color: 'text.primary' }}>
                            🌍 Travel Partner
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1, color: 'text.secondary' }}>
                            Are you a travel agent, local guide, or organizer of holiday experiences? As a Roomstay Travel Partner, you can showcase your packages, connect with a wider audience, and earn more while helping customers create unforgettable trips.
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, listStyleType: 'disc', color: 'text.secondary', fontSize: '0.9rem' }}>
                            <li>🧭 Publish your travel packages</li>
                            <li>🚗 Offer transportation, tours, and more</li>
                            <li>📊 Track customer leads and engagement</li>
                            <li>🤝 Collaborate with hotels and agencies</li>
                        </Box>

                        <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', mt: 2, color: 'text.primary' }}>
                            📜 Terms & Conditions
                        </Typography>
                        <Box component="ol" sx={{ pl: 2, listStyleType: 'decimal', color: 'text.secondary', fontSize: '0.9rem' }}>
                            <li>All listings are subject to verification and approval by the Roomstay team.</li>
                            <li>Partners must provide accurate and up-to-date information about their services.</li>
                            <li>Roomstay reserves the right to delist partners who do not comply with service standards or legal requirements.</li>
                            <li>Any disputes related to bookings must be handled professionally; our team may assist in mediation if needed.</li>
                            <li>Commission structures or listing fees (if any) will be communicated transparently before onboarding.</li>
                            <li>Data shared with Roomstay will be handled per our <a href="/privacy-policy" style={{ color: '#4f46e5', textDecoration: 'none' }}>Privacy Policy</a>.</li>
                        </Box>
                    </Box>

                    {/* Action Button */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleMarkAsRead}
                            size="large"
                            sx={{
                                textTransform: 'none',
                                borderRadius: 8,
                                px: 4,
                                py: 1,
                                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 6px 16px rgba(79, 70, 229, 0.4)',
                                },
                            }}
                        >
                            Yes I Accept
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </div>
    );
};

export default Disclaimer;