import React from 'react';
import { Box, Typography, Stack, useMediaQuery, useTheme } from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa'; // Import FaInfo icon

const TermsAndCondition = ({ data }) => {
    // Check if data is loaded correctly
    if (!data || !data.termsAndConditions) {
        return (
            <Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <Typography variant="h6">Terms & Conditions Not Available</Typography>
            </Box>
        );
    }

    console.log('Data in Terms and Conditions:', data); // For debugging

    // Iterate over the termsAndConditions keys
    const terms = data?.termsAndConditions;
    const termKeys = Object.keys(terms); // Get keys (e.g., cancellation, refund, bookingPolicy)

    // Use MUI's useTheme and useMediaQuery to detect mobile devices
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

    return (
        <Box sx={{ padding: 2, maxWidth: '1000px', margin: '0 auto' }}>
            <Typography
                className="itinerary-title"
                sx={{
                    textAlign: 'center',
                    color: '#333',
                    padding: '8px 12px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    fontSize: '1.2rem', // Reduced font size
                }}
            >
                Terms & Conditions
            </Typography>
            <Stack spacing={2}>
                {termKeys.map((key) => (
                    <Box
                        key={key}
                        sx={{
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            width: isMobile ? '100%' : 'auto', // Full width on mobile, auto on larger screens
                            backgroundColor: '#fff', // Clean white background
                            borderRadius: '8px', // Soft rounded corners
                            marginBottom: 2, // Spacing between the terms
                            border: '1px solid #ddd', // Light grey border around each term
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <FaInfoCircle size={22} color="#0277BD" /> {/* Smaller icon size */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#0277BD',
                                    marginLeft: 1,
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize', // Ensure key names are capitalized
                                    fontSize: '1rem', // Reduced font size
                                }}
                            >
                                {key}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#555',
                                lineHeight: '1.4',
                                fontSize: '0.9rem', // Reduced font size for body text
                                marginBottom: 1,
                            }}
                        >
                            {terms[key] || `${key.charAt(0).toUpperCase() + key.slice(1)} details are not available.`}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default TermsAndCondition;
