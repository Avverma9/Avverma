import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Info as InfoIcon } from '@mui/icons-material';

const TermsAndCondition = () => {
    const terms = [
        {
            title: 'Easy Cancellation',
            content:
                '31 days or more before departure: Initial Booking Amount forfeited. Between 30–16 days: 75% of total cost charged as penalty. Less than 15 days: 100% charged.',
            icon: <InfoIcon sx={{ color: '#2c3e50' }} />,
        },
        {
            title: 'Travel Validity',
            content: 'Valid for travel until 31 March 2025.',
            icon: <CheckCircleIcon sx={{ color: '#2c3e50' }} />,
        },
        {
            title: 'Guaranteed Dates',
            content:
                'Your selected dates are guaranteed. If seats sell out, we will offer dates +/- 1/2 days from your preference.',
            icon: <CheckCircleIcon sx={{ color: '#2c3e50' }} />,
        },
    ];

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
            <Typography
                className="itinerary-title"
                sx={{
                    textAlign: 'center',
                    color: '#333',
                    border: '2px solid #2c3e50',
                    borderRadius: '40px',
                    padding: '10px 20px',
                    marginBottom: '20px',
                }}
            >
                Terms & Conditions
            </Typography>
            <Stack spacing={2}>
                {terms.map((term, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            padding: 2,
                            backgroundColor: '#ffff',
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        {/* Icon Section */}
                        <Box sx={{ mr: 2 }}>
                            {term.icon}
                        </Box>

                        {/* Content Section */}
                        <Box>
                            <Typography variant="body1" fontWeight="bold" sx={{ color: '#0277BD', mb: 0.5 }}>
                                {term.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {term.content}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default TermsAndCondition;
