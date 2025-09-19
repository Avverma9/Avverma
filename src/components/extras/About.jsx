import React from 'react';
import { Box, Paper, SvgIcon, Typography } from '@mui/material';

// SVG Icons
const UsersIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </SvgIcon>
);

const HeartHandshakeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.96-2.96a2.17 2.17 0 0 0 0-3.08v0c-.82-.82-2.13-.82-2.94 0l-.06.06L12 5Z"/>
  </SvgIcon>
);

const AboutPage = () => {

    return (
        <>
            <Box component="header" sx={{
                position: 'relative',
                height: { xs: '50vh', md: '60vh' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                overflow: 'hidden',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 10
                }} />
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" 
                    alt="A serene travel destination with a pool and palm trees" 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <Box sx={{
                    position: 'relative',
                    zIndex: 20,
                    p: 2,
                    maxWidth: '1024px',
                    mx: 'auto'
                }}>
                    <Typography variant="h1" component="h1" sx={{
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem', lg: '4.5rem' },
                        fontWeight: 'bold',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.1,
                        mb: { xs: 1.5, md: 2 },
                        animation: 'fadeInDown 0.6s ease-out',
                    }}>
                        Your Journey, Our Platform.
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        maxWidth: '512px',
                        mx: 'auto',
                        color: '#e5e7eb',
                        animation: 'fadeInUp 0.6s ease-out',
                    }}>
                        Welcome to Hotel Room Stay (HRS), your trusted Online Travel Agency (OTA).
                    </Typography>
                </Box>
            </Box>
            <Box component="main">
                <Box component="section" sx={{ py: { xs: 6, md: 12 }, background: 'white' }}>
                    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, maxWidth: '768px', mx: 'auto' }}>
                            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 'bold', color: '#111827' }}>
                                Our Role as an OTA Platform
                            </Typography>
                            <Typography sx={{ mt: 2, fontSize: { xs: '1.125rem', md: '1.25rem' }, color: '#4b5563', lineHeight: 1.75 }}>
                                We are not a hotel, cab company, or tour operator. Instead, HRS works as an <strong>Online Travel Agency (OTA)</strong> platform, acting as a bridge of trust between you and our verified partners in the hospitality and travel industry.
                            </Typography>
                            <Box sx={{ mt: 3, width: '96px', height: '6px', background: '#3b82f6', mx: 'auto', borderRadius: '9999px' }} />
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 5 } }}>
                            <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: '12px', borderLeft: '4px solid', background: '#eff6ff', borderLeftColor: '#3b82f6' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <UsersIcon sx={{ width: 40, height: 40, color: '#3b82f6' }} />
                                    <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 'bold', color: '#1f2937' }}>
                                        For Customers
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#374151' }}>
                                    Our vision is to provide a reliable booking experience, transparent pricing, and completely hassle-free travel, ensuring you make memories, not worries.
                                </Typography>
                            </Paper>
                            <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: '12px', borderLeft: '4px solid', background: '#f0fdf4', borderLeftColor: '#10b981' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <HeartHandshakeIcon sx={{ width: 40, height: 40, color: '#10b981' }} />
                                    <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 'bold', color: '#1f2937' }}>
                                        For Partners
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#374151' }}>
                                    We offer a powerful digital platform for hotels, cab services, and tour operators to showcase their services, receive bookings, and grow their business with fair commission.
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Box>

                <Box component="section" sx={{ py: { xs: 6, md: 12 }, background: '#f9fafb' }}>
                    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', lg: 'row' },
                            alignItems: 'center',
                            gap: { xs: 4, md: 6 },
                            background: 'linear-gradient(to right, #1f2937, #111827)',
                            color: 'white',
                            borderRadius: '8px',
                            p: { xs: 3, md: 6 },
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        }}>
                            <Box sx={{ width: { xs: '100%', lg: '33.333333%' }, flexShrink: 0 }}>
                                <Box
                                    component="img"
                                    src="https://placehold.co/400x400/E2E8F0/4A5568?text=Naveen+K" 
                                    alt="Naveen Kumar, Co-Founder of HRS" 
                                    sx={{
                                        borderRadius: '50%',
                                        width: { xs: '192px', md: '256px' },
                                        height: { xs: '192px', md: '256px' },
                                        mx: 'auto',
                                        objectFit: 'cover',
                                        border: '8px solid #374151',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                        display: 'block'
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: { xs: '100%', lg: '66.666667%' }, textAlign: { xs: 'center', lg: 'left' } }}>
                                <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 'bold', mb: 2 }}>
                                    A Message From Our Founder
                                </Typography>
                                <Typography component="p" sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, color: '#d1d5db', fontStyle: 'italic', mb: 3, lineHeight: 1.75 }}>
                                    "As a traveler myself, I know how much trust matters. That's why we built HRS—it's not just a platform, but a promise. A promise of a great experience, whether you are our guest or our partner. Our roots are deep in hospitality, but our thinking is new. We use technology to connect people, and with every booking, we're delivering not just a room, but a happy memory."
                                </Typography>
                                <Typography variant="h3" sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, fontWeight: 'bold', color: 'white' }}>
                                    Naveen Kumar
                                </Typography>
                                <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#93c5fd', fontWeight: '600' }}>
                                    Co-Founder, HRS
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AboutPage;