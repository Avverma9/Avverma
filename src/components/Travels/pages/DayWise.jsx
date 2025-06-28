import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

const DayWiseItinerary = ({ data }) => {
    if (!data?.dayWise || data.dayWise.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center', border: 1, borderColor: 'grey.300', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                    Day by Day Plan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Itinerary details are not currently available.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: { xs: 1, sm: 2 } }}>
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    mb: 3,
                    color: 'text.primary',
                }}
            >
                Day by Day Plan
            </Typography>

            <Stack
                spacing={2.5}
                sx={{
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '5px',
                        left: '8px',
                        height: 'calc(100% - 10px)',
                        width: '2px',
                        bgcolor: 'grey.200',
                    },
                }}
            >
                {data.dayWise.map((item) => (
                    <Box
                        key={item.day}
                        sx={{
                            display: 'flex',
                            position: 'relative',
                            pl: '30px',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '8px',
                                top: '5px',
                                transform: 'translateX(-50%)',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                zIndex: 1,
                            }}
                        />

                        <Box
                            sx={{
                                flex: 1,
                                p: 1.5,
                                borderRadius: '6px',
                                border: '1px solid',
                                borderColor: 'grey.200',
                                bgcolor: 'background.paper',
                                minWidth: 0,
                            }}
                        >
                            <Stack spacing={0.5}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 'bold', color: 'text.primary' }}
                                >
                                    Day {item.day}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        // This property ensures long words without spaces will wrap
                                        overflowWrap: 'break-word',
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default DayWiseItinerary;