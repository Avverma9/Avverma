import React from 'react';
import { Box, Paper, SvgIcon, Typography, Grid, createTheme, ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'; // For the testimonial

// --- THEME & STYLING ---
const modernTheme = createTheme({
    palette: {
        primary: { main: '#007A7A' }, // A professional teal
        secondary: { main: '#FFB100' }, // An accent color
        background: { default: '#F8F9FA', paper: '#FFFFFF' },
        text: { primary: '#212529', secondary: '#6C757D' },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                }
            }
        }
    }
});

const animations = `
  @keyframes fadeInDown { from { opacity: 0; transform: translate3d(0, -20px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 20px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
`;

// --- SVG ICONS (Unchanged) ---
const UsersIcon = (props) => ( <SvgIcon {...props}> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/> </SvgIcon> );
const HeartHandshakeIcon = (props) => ( <SvgIcon {...props}> <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.96-2.96a2.17 2.17 0 0 0 0-3.08v0c-.82-.82-2.13-.82-2.94 0l-.06.06L12 5Z"/> </SvgIcon> );

// --- COMPONENT ---
const AboutPage = () => {
    return (
        <ThemeProvider theme={modernTheme}>
            <CssBaseline />
            <GlobalStyles styles={animations} />
            
            {/* 1. Header: More compact for mobile */}
            <Box component="header" sx={{
                position: 'relative',
                height: { xs: '45vh', md: '60vh' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
            }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))', zIndex: 1 }} />
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" 
                    alt="A serene travel destination with a pool and palm trees" 
                    sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{ position: 'relative', zIndex: 2, p: 3, maxWidth: 'md' }}>
                    <Typography variant="h1" component="h1" sx={{
                        fontSize: { xs: '2.25rem', md: '3.75rem' },
                        fontWeight: 'bold',
                        lineHeight: 1.1,
                        mb: 2,
                        animation: 'fadeInDown 0.6s ease-out',
                    }}>
                        Your Journey, Our Platform.
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        maxWidth: 'sm',
                        mx: 'auto',
                        color: '#E0E0E0',
                        animation: 'fadeInUp 0.6s ease-out',
                    }}>
                        Welcome to Hotel Room Stay (HRS), your trusted Online Travel Agency (OTA).
                    </Typography>
                </Box>
            </Box>

            <Box component="main">
                {/* 2. Our Role Section: Redesigned info cards */}
                <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
                    <Grid container sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
                        <Grid item xs={12} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, maxWidth: 'md', mx: 'auto' }}>
                            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, color: 'text.primary' }}>
                                Our Role as an OTA Platform
                            </Typography>
                            <Typography sx={{ mt: 2, fontSize: '1.125rem', color: 'text.secondary', lineHeight: 1.7 }}>
                                We are not a hotel or tour operator. HRS is a bridge of trust between you and our verified partners in the hospitality and travel industry.
                            </Typography>
                            <Box sx={{ mt: 3, width: 80, height: 4, background: 'primary.main', mx: 'auto', borderRadius: '2px' }} />
                        </Grid>
                        
                        <Grid item xs={12} container spacing={{ xs: 3, md: 4 }}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                        <Box sx={{ p: 2, borderRadius: '50%', background: 'rgba(0, 122, 122, 0.1)', color: 'primary.main' }}>
                                            <UsersIcon sx={{ fontSize: 40 }} />
                                        </Box>
                                    </Box>
                                    <Typography variant="h3" sx={{ fontSize: '1.5rem', color: 'text.primary', mb: 1 }}>For Customers</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
                                        Our vision is to provide a reliable booking experience, transparent pricing, and completely hassle-free travel.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                        <Box sx={{ p: 2, borderRadius: '50%', background: 'rgba(255, 177, 0, 0.1)', color: 'secondary.main' }}>
                                            <HeartHandshakeIcon sx={{ fontSize: 40 }} />
                                        </Box>
                                    </Box>
                                    <Typography variant="h3" sx={{ fontSize: '1.5rem', color: 'text.primary', mb: 1 }}>For Partners</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
                                        We offer a powerful platform for hotels, cabs, and tour operators to showcase their services and grow their business with fair commission.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {/* 3. Founder Section: Redesigned as a modern testimonial card */}
                <Box component="section" sx={{ py: { xs: 6, md: 10 }, background: 'background.default' }}>
                    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
                        <Paper sx={{ p: { xs: 3, md: 5 } }}>
                            <Grid container alignItems="center" spacing={{ xs: 3, md: 6 }}>
                                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                    <Box
                                        component="img"
                                        src="https://placehold.co/400x400/007A7A/FFFFFF?text=Naveen+K"
                                        alt="Naveen Kumar, Co-Founder of HRS" 
                                        sx={{
                                            width: { xs: 160, md: 220 },
                                            height: { xs: 160, md: 220 },
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '6px solid white',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <FormatQuoteIcon sx={{ color: 'primary.main', fontSize: { xs: 48, md: 64 }, transform: 'rotate(180deg)' }} />
                                    <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.7, my: 2 }}>
                                        "As a traveler myself, I know how much trust matters. That's why we built HRS—it's not just a platform, but a promise. A promise of a great experience, whether you are our guest or our partner."
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontSize: '1.2rem', color: 'text.primary' }}>
                                        Naveen Kumar
                                    </Typography>
                                    <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>
                                        Co-Founder, HRS
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AboutPage;