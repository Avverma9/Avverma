import React from 'react';
import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const InclusionExclusion = () => {
    const inclusions = [
        'Accommodation in base category rooms.',
        'Breakfast served in all Hotels.',
        'All sightseeing and excursions as per itinerary.',
        'All transfers, city tours, and transport services by Ac Car.',
        'All India Tourist permit vehicle as per itinerary.',
        'All Applicable Taxes.',
    ];

    const exclusions = [
        '5% GST',
        'Personal Expenses / Optional Tours / Extra Meals',
        "Anything not specifically mentioned under 'Prices included'",
        'Vehicle service not included on leisure days or after sightseeing.',
    ];

    return (
        <Box className="booking-container" sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#333',
                    border: '2px solid #2c3e50',
                    borderRadius: '30px',
                    padding: '8px 20px',
                    marginBottom: '16px',
                }}
            >
                Inclusion & Exclusion
            </Typography>
            <Grid container spacing={2}>
                {/* Inclusions Section */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={2}
                        sx={{
                            padding: 2,
                            backgroundColor: '#E8F5E9',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        <Typography variant="h6" fontWeight="600" color="green" sx={{ mb: 1, textAlign: 'center' }}>
                            Inclusions
                        </Typography>
                        <Stack spacing={1}>
                            {inclusions.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleIcon sx={{ color: 'green', fontSize: 20, mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>

                {/* Exclusions Section */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={2}
                        sx={{
                            padding: 2,
                            backgroundColor: '#FFEBEE',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        <Typography variant="h6" fontWeight="600" color="red" sx={{ mb: 1, textAlign: 'center' }}>
                            Exclusions
                        </Typography>
                        <Stack spacing={1}>
                            {exclusions.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CancelIcon sx={{ color: 'red', fontSize: 20, mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InclusionExclusion;
