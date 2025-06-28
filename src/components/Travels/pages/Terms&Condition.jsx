import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GavelIcon from '@mui/icons-material/Gavel';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Helper function to format the object keys into readable titles
const formatTermKey = (key) => {
    const spaced = key.replace(/([A-Z])/g, ' $1');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

// Helper function to assign a relevant icon to each policy type
const getTermIcon = (key) => {
    const lowerCaseKey = key.toLowerCase();
    if (lowerCaseKey.includes('cancellation')) {
        return <CancelIcon color="primary" />;
    }
    if (lowerCaseKey.includes('payment') || lowerCaseKey.includes('refund')) {
        return <PaymentIcon color="primary" />;
    }
    if (lowerCaseKey.includes('policy')) {
        return <GavelIcon color="primary" />;
    }
    return <InfoOutlinedIcon color="primary" />;
};

const TermsAndCondition = ({ data }) => {
    if (!data?.termsAndConditions || Object.keys(data.termsAndConditions).length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center', border: 1, borderColor: 'grey.300', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>Terms & Conditions</Typography>
                <Typography color="text.secondary">Details are not currently available.</Typography>
            </Box>
        );
    }

    const terms = data.termsAndConditions;
    const termKeys = Object.keys(terms);

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, sm: 2 } }}>
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    mb: 2,
                    color: 'text.primary',
                }}
            >
                Terms & Conditions
            </Typography>

            <Box>
                {termKeys.map((key, index) => (
                    <Accordion
                        key={key}
                        defaultExpanded={index === 0} // Expand the first item by default
                        sx={{
                            // Use variant outlined for clean borders
                            border: 1,
                            borderColor: 'divider',
                            boxShadow: 'none',
                            '&:not(:last-child)': {
                                borderBottom: 0,
                            },
                            '&:before': {
                                display: 'none', // Remove default top border
                            },
                            '&.Mui-expanded': {
                                margin: '0 0',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${key}-content`}
                            id={`${key}-header`}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                {getTermIcon(key)}
                                <Typography sx={{ fontWeight: 500 }}>
                                    {formatTermKey(key)}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', lineHeight: 1.6, overflowWrap: 'break-word' }}
                            >
                                {terms[key] || `Details for ${formatTermKey(key)} are not available.`}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default TermsAndCondition;