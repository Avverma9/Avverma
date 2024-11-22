import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa'; // Import FaInfo icon

const TermsAndCondition = ({ data }) => {
    // Check if data is loaded correctly
    if (!data || !data.termsAndConditions) {
        return (
            <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <Typography variant="h6">Terms & Conditions Not Available</Typography>
            </Box>
        );
    }

    console.log('Data in Terms and Conditions:', data); // For debugging

    // Iterate over the termsAndConditions keys
    const terms = data?.termsAndConditions;
    const termKeys = Object.keys(terms);  // Get keys (e.g., cancellation, refund, bookingPolicy)

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
            <Typography
                className="itinerary-title"
                sx={{
                    textAlign: 'center',
                    color: '#333',
                    border: '2px solid #dedcdc',
                    borderRadius: '40px',
                    padding: '10px 20px',
                    marginBottom: '20px',
                }}
            >
                Terms & Conditions
            </Typography>
            <Stack spacing={2}>
                {termKeys.map((key) => (
                    <Paper
                        key={key}
                        elevation={3}
                        sx={{
                            padding: 2,
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <FaInfoCircle size={24} color="#0277BD" />
                            <Typography variant="body1" fontWeight="bold" sx={{ color: '#0277BD', ml: 1 }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the key name */}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {terms[key] || `${key.charAt(0).toUpperCase() + key.slice(1)} details are not available.`}
                        </Typography>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default TermsAndCondition;
