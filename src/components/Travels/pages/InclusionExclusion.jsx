import React from 'react';
import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const InclusionExclusion = ({ data }) => {
    console.log('InclusionExclusion', data);

    return (
        <Box className="booking-container" sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#333',
                    border: '2px solid #dedcdc',
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
                            height: '250px', // Fixed height for Inclusions
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
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
                            height: '250px', // Fixed height for Exclusions
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
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
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InclusionExclusion;
