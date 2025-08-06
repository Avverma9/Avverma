import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Careers = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                p: 3,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: '24px',
                    textAlign: 'center',
                    maxWidth: '600px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    animation: 'fadeInUp 0.8s ease-in-out',
                    '@keyframes fadeInUp': {
                        '0%': { opacity: 0, transform: 'translateY(30px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        color: 'white',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(255, 105, 135, .35)',
                    }}
                >
                    <WorkHistoryIcon sx={{ fontSize: 40 }} />
                </Box>
                
                <Typography 
                    variant="h4" 
                    component="h1" 
                    fontWeight="bold" 
                    sx={{ color: 'text.primary' }}
                >
                    Careers at Roomsstay
                </Typography>
                
                <Typography 
                    variant="h6" 
                    sx={{ color: 'text.secondary', my: 1 }}
                >
                    No Opportunities Available Yet
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ color: 'text.secondary', maxWidth: '450px' }}
                >
                    We're always looking for talented people to join our team. Please check back in the future for openings.
                </Typography>
                
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        mt: 3,
                        borderRadius: '50px',
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
                        }
                    }}
                >
                    Go Back Home
                </Button>
            </Paper>
        </Box>
    );
};

export default Careers;
