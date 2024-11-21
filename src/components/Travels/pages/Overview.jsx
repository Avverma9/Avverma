import React from 'react';
import { Box, Typography, Paper, Stack, Divider } from '@mui/material';
import DayWiseItinerary from './DayWise';
import InclusionExclusion from './InclusionExclusion';
import TermsAndCondition from './Terms&Condition';

const OverView = () => {
    return (
        <>
            <Box sx={{ mt: 2, padding: 2, borderRadius: 2 }}>
                <Typography className="itinerary-title">Package Overview</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                    Kerala provides the best travel experiences to its visitors with its paradise-like atmosphere, especially for
                    honeymooners. It ensures that you enjoy some dream holidays with peace of mind. Holidays in Kerala offer sightseeing,
                    traveling, and relaxing experiences. Make your trip a rejuvenating experience with a Kerala vacation.
                </Typography>
            </Box>
            <DayWiseItinerary />
            <InclusionExclusion />
            <TermsAndCondition />
        </>
    );
};

export default OverView;
