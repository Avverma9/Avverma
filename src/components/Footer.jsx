import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Stack, Button, Modal, Fade, Backdrop } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { hotelList } from '../utils/extrasList';

const Footer = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
    };
    
    const handleHotelClick = (hotelName) => {
        // Split hotelName into words and take the last word
        const lastWord = hotelName.trim().split(" ").pop();
        
        // Encode for URL (in case it has spaces or special chars)
        const searchPath = encodeURIComponent(lastWord);
    
        navigate(`/search?search=${searchPath}`);
        handleCloseModal(); // Close modal after navigation
    };
    

    const companyLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Careers', path: '/careers' },
        { name: 'List your property', path: '/partner' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: <Facebook />, href: '#' },
        { name: 'Instagram', icon: <Instagram />, href: '#' },
        { name: 'Twitter', icon: <Twitter />, href: '#' },
        { name: 'YouTube', icon: <YouTube />, href: '#' },
    ];

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', md: '60%' },
        maxHeight: '80vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#141414',
                color: 'grey.500',
                py: { xs: 5, md: 8 },
                mt: 8,
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    {/* Brand and Social Section */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ mb: 2 }}>
                                <img src="/logo.png" alt="Roomsstay Logo" style={{ height: '45px', filter: 'brightness(0) invert(1)' }} />
                            </Box>
                            <Typography variant="body2" sx={{ mb: 3, maxWidth: '300px' }}>
                                Your one-stop destination for finding the perfect stay. Explore, book, and enjoy your holidays with us.
                            </Typography>
                            <Box sx={{ mt: 'auto' }}>
                                <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Follow Us
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {socialLinks.map((social) => (
                                        <IconButton
                                            key={social.name}
                                            href={social.href}
                                            aria-label={`Follow us on ${social.name}`}
                                            sx={{ color: 'grey.500', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                        >
                                            {social.icon}
                                        </IconButton>
                                    ))}
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Links Sections */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={5}>
                            <Grid item xs={6} sm={4}>
                                <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Company</Typography>
                                <Stack spacing={1.5}>
                                    {companyLinks.map((link) => (
                                        <Link key={link.name} href="#" onClick={(e) => { e.preventDefault(); handleNavigation(link.path); }} sx={{ color: 'grey.500', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                                            {link.name}
                                        </Link>
                                    ))}
                                </Stack>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Top Destinations</Typography>
                                <Stack spacing={1.5}>
                                    {hotelList.slice(0, 4).map((hotel) => (
                                        <Link key={hotel.hotel} href="#" onClick={(e) => { e.preventDefault(); handleHotelClick(hotel.hotel); }} sx={{ color: 'grey.500', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                                            {hotel.hotel}
                                        </Link>
                                    ))}
                                </Stack>
                                <Box sx={{ mt: 2, p: '2px', borderRadius: '16px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', display: 'inline-block', animation: 'pulse-glow 2s infinite alternate', '@keyframes pulse-glow': { '0%': { boxShadow: '0 0 5px #FF8E53' }, '100%': { boxShadow: '0 0 20px #FE6B8B' } } }}>
                                    <Button
                                        onClick={handleOpenModal}
                                        sx={{
                                            background: '#141414',
                                            borderRadius: '15px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            px: 2,
                                            py: 1,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: '#2a2a2a'
                                            }
                                        }}
                                    >
                                        See All Locations
                                    </Button>
                                </Box>
                            </Grid>
                             <Grid item xs={6} sm={4}>
                                <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Legal</Typography>
                                <Stack spacing={1.5}>
                                    {legalLinks.map((link) => (
                                        <Link key={link.name} href="#" onClick={(e) => { e.preventDefault(); handleNavigation(link.path); }} sx={{ color: 'grey.500', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                                            {link.name}
                                        </Link>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'grey.600', textAlign: 'center' }}>
                        © {new Date().getFullYear()} Hotel-roomsstay Pvt Limited. All Rights Reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Link href="#" aria-label="Download on the App Store">
                            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height: 40 }} />
                        </Link>
                        <Link href="#" aria-label="Get it on Google Play">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: 40 }} />
                        </Link>
                    </Box>
                </Box>
            </Container>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen}>
                    <Box sx={modalStyle}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                All Destinations
                            </Typography>
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={2}>
                            {hotelList.map((hotel) => (
                                <Grid item xs={6} sm={4} md={3} key={hotel.hotel}>
                                    <Link 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); handleHotelClick(hotel.hotel); }}
                                        sx={{ 
                                            display: 'block',
                                            p: 1.5,
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            color: 'text.primary',
                                            fontWeight: 500,
                                            transition: 'background-color 0.3s, transform 0.2s',
                                            '&:hover': {
                                                bgcolor: 'action.hover',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        {hotel.hotel}
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default Footer;
