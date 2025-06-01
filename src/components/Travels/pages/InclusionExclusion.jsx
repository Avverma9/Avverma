import React from 'react';
import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const InclusionExclusion = ({ data }) => {

    return (
        <Box className="booking-container" sx={{ padding: 1, maxWidth: 1200, margin: '0 auto' }}>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#333',
                    padding: '8px 20px',
                    marginBottom: '16px',
                }}
            >
                Inclusion & Exclusion
            </Typography>
            <Grid container spacing={2}>
                {/* Inclusions Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            padding: 2,
                            backgroundColor: '#E8F5E9',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '250px', // Fixed height for Inclusions
                            border: '1px solid #ddd', // Light grey border around inclusions
                            borderRadius: '8px', // Rounded corners
                            boxShadow: 'none', // Remove shadow to match Paper component appearance
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="600"
                            color="green"
                            sx={{ mb: 1, textAlign: 'center', backgroundColor: '#E8F5E9' }}
                        >
                            Inclusions
                        </Typography>
                        <Stack spacing={1} sx={{ overflowY: 'auto', maxHeight: 'calc(250px - 40px)' }}>
                            {data?.inclusion?.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleIcon sx={{ color: 'green', fontSize: 20, mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>

                {/* Exclusions Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            padding: 2,
                            backgroundColor: '#FFEBEE',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '250px', // Fixed height for Exclusions
                            border: '1px solid #ddd', // Light grey border around exclusions
                            borderRadius: '8px', // Rounded corners
                            boxShadow: 'none', // Remove shadow to match Paper component appearance
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="600"
                            color="red"
                            sx={{ mb: 1, textAlign: 'center', backgroundColor: '#FFEBEE' }}
                        >
                            Exclusions
                        </Typography>
                        <Stack spacing={1} sx={{ overflowY: 'auto', maxHeight: 'calc(250px - 40px)' }}>
                            {data?.exclusion?.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CancelIcon sx={{ color: 'red', fontSize: 20, mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InclusionExclusion;
