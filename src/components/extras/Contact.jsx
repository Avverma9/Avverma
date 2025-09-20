import React, { useState } from 'react';
import {
    Box, Typography, Container, Grid, Paper, TextField, Button, Link, SvgIcon,
    createTheme, ThemeProvider, CssBaseline, GlobalStyles
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// --- THEME & STYLING (Unchanged) ---
const modernTheme = createTheme({
    palette: {
        primary: { main: '#0052D4' },
        background: { default: '#f4f6f8', paper: '#ffffff' },
        text: { primary: '#172B4D', secondary: '#5E6C84' },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.5px',
            '@media (min-width:600px)': { fontSize: '3.2rem' },
        },
        h4: {
            fontWeight: 700,
            fontSize: '1.5rem',
             '@media (min-width:600px)': { fontSize: '1.75rem' },
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': { boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': { color: '#0052D4' },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&.Mui-focused fieldset': { borderColor: '#0052D4' },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '9999px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1rem',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    boxShadow: 'none',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(0, 82, 212, 0.3)',
                    },
                },
            },
        },
    },
});
const fadeInUpAnimation = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- SVG ICONS (Unchanged) ---
const PhoneIcon = (props) => ( <SvgIcon {...props}> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path> </SvgIcon> );
const MailIcon = (props) => ( <SvgIcon {...props}> <rect width="20" height="16" x="2" y="4" rx="2"></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path> </SvgIcon> );
const MapPinIcon = (props) => ( <SvgIcon {...props}> <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/> <circle cx="12" cy="10" r="3"/> </SvgIcon> );


// --- COMPONENT ---
const ContactPage = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ submitting: false, message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitting: true, message: '', type: '' });
        const formspreeUrl = 'https://formspree.io/f/mpwjgyqq';
        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormStatus({ submitting: false, message: 'Thank you! Your message has been sent.', type: 'success' });
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else { throw new Error('Failed to send message.'); }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus({ submitting: false, message: 'Oops! Something went wrong. Please try again.', type: 'error' });
        }
    };

    return (
        <ThemeProvider theme={modernTheme}>
            <CssBaseline />
            <GlobalStyles styles={fadeInUpAnimation} />
            <Box sx={{ animation: 'fadeInUp 0.8s ease-out' }}>
                <Box sx={{ background: 'linear-gradient(45deg, #0052D4 30%, #4364F7 90%)', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
                    <Container maxWidth="md">
                        <Typography variant="h1" component="h1" sx={{ mb: 2, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                            Get In Touch
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, color: 'rgba(255,255,255,0.9)', mt: 2, maxWidth: '700px', mx: 'auto' }}>
                            We'd love to hear from you. Whether you have a question, a proposal, or just want to say hello, our team is ready to answer all your questions.
                        </Typography>
                    </Container>
                </Box>
                
                <Box component="main" sx={{ py: { xs: 6, md: 10 } }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={{ xs: 5, md: 8 }}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h4" component="h2" color="text.primary" sx={{ mb: 4 }}>
                                        Contact Information
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={4}>
                                        {[
                                            { icon: <PhoneIcon />, title: "Phone Number", text: "9917991758", href: "tel:9917991758" },
                                            { icon: <MailIcon />, title: "Email Address", text: "info@hotelroomsstay.com", href: "mailto:info@hotelroomsstay.com" },
                                            { icon: <MapPinIcon />, title: "Our Office", text: "Surya Vihar Colony, Aligarh, UP, 202001" }
                                        ].map(item => (
                                            <Box key={item.title} sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                <Box sx={{
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    background: 'rgba(0, 82, 212, 0.08)',
                                                    color: 'primary.main',
                                                }}>
                                                    {item.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'text.primary' }}>{item.title}</Typography>
                                                    {item.href ? (
                                                        <Link href={item.href} underline="hover" sx={{ fontSize: '1rem', color: 'primary.main', fontWeight: 500 }}>{item.text}</Link>
                                                    ) : (
                                                        <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>{item.text}</Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box sx={{ mt: 'auto', pt: 5, borderRadius: '12px', overflow: 'hidden' }}>
                                        {/* --- MAP FIX IS HERE --- */}
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.815252878145!2d78.09338681501438!3d27.88371298276024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5a5e3e2c36b%3A0x3f5c5b8d2d6c35c!2sSurya%20Vihar%20Colony%2C%20Aligarh%2C%20Uttar%20Pradesh%20202001!5e0!3m2!1sen!2sin!4v1663772418991!5m2!1sen!2sin"
                                            width="100%"
                                            height="280"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Office Location on Google Maps"
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: { xs: 3, md: 5 }, height: '100%' }}>
                                    <Typography variant="h4" component="h2" color="text.primary" sx={{ mb: 4 }}>
                                        Send us a Message
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmit} noValidate>
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))} required />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))} required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Message" name="message" multiline rows={5} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button type="submit" variant="contained" fullWidth disabled={formStatus.submitting} endIcon={<SendIcon />}>
                                                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        {formStatus.message && (
                                            <Typography sx={{ mt: 2.5, textAlign: 'center', fontWeight: 500, color: formStatus.type === 'success' ? 'green' : 'red' }}>
                                                {formStatus.message}
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default ContactPage;