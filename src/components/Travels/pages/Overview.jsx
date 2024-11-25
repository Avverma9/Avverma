import React from 'react';
import { Box, Typography, Paper, Stack, Divider } from '@mui/material';
import DayWiseItinerary from './DayWise';
import InclusionExclusion from './InclusionExclusion';
import TermsAndCondition from './Terms&Condition';

const OverView = ({ data }) => {
    console.log('object', data);
    return (
        <>
            <Box sx={{ mt: 2, padding: 1 }}>
                <Typography className="itinerary-title">Package Overview</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                    {data?.overview}
                </Typography>
            </Box>
            <hr />
            <DayWiseItinerary data={data} />
            <InclusionExclusion data={data} />
            <TermsAndCondition data={data} />
        </>
    );
};

export default OverView;
