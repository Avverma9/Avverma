import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, TextField, Button, Link, SvgIcon } from '@mui/material';

// SVG Icons
const PhoneIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </SvgIcon>
);

const MailIcon = (props) => (
  <SvgIcon {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </SvgIcon>
);

const MapPinIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </SvgIcon>
);

const ContactPage = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ submitting: false, message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitting: true, message: '' });
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
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus({ submitting: false, message: 'Oops! Something went wrong. Please try again.', type: 'error' });
        }
    };

    return (
        <Box sx={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <Box sx={{ background: '#1f2937', color: 'white', py: { xs: 6, md: 10 }, textAlign: 'center' }}>
                <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 'bold', mb: 2 }}>Get In Touch</Typography>
                <Typography sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#d1d5db', mt: 2, maxWidth: '768px', mx: 'auto', px: 2 }}>We'd love to hear from you. Whether you have a question about our services, partnerships, or anything else, our team is ready to answer all your questions.</Typography>
            </Box>
            <Box component="main" sx={{ py: { xs: 4, md: 8 }, background: 'white' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 4, md: 6 }}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, background: '#f9fafb', height: '100%' }}>
                                <Typography variant="h4" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 'bold', color: '#111827', mb: { xs: 2, md: 3 } }}>Contact Information</Typography>
                                <Box display="flex" flexDirection="column" gap={{ xs: 2, md: 3 }}>
                                    {[
                                        { icon: <PhoneIcon />, title: "Phone Number", text: "9917991758", href: "tel:9917991758" },
                                        { icon: <MailIcon />, title: "Email Address", text: "info@hotelroomsstay.com", href: "mailto:info@hotelroomsstay.com" },
                                        { icon: <MapPinIcon />, title: "Our Office", text: "Surya Vihar Colony, Aligarh, Uttar Pradesh, 202001" }
                                    ].map(item => (
                                        <Box key={item.title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                                            <Box>
                                                <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 600, color: '#111827', mb: 0.5 }}>{item.title}</Typography>
                                                {item.href ? (
                                                    <Link href={item.href} underline="hover" sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#4b5563' }}>{item.text}</Link>
                                                ) : (
                                                    <Typography sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#4b5563' }}>{item.text}</Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{ mt: { xs: 3, md: 4 }, borderRadius: '8px', overflow: 'hidden' }}>
                                    <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.782501377852!2d78.07949431505697!3d27.8778931826359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5769d32306d%3A0x3b5f5f5f5f5f5f5f!2sSurya%20Vihar%20Colony%2C%20Aligarh%2C%20Uttar%20Pradesh%20202001!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin" 
                                    width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade" title="HRS Office Location" />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, background: '#f9fafb', height: '100%' }}>
                                <Typography variant="h4" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 'bold', color: '#111827', mb: { xs: 2, md: 3 } }}>Send us a Message</Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="First Name" id="firstName" name="firstName" value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))} required />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Last Name" id="lastName" name="lastName" value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))} required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Email Address" type="email" id="email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Message" id="message" name="message" multiline rows={4} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" fullWidth disabled={formStatus.submitting} sx={{ py: 1.5, borderRadius: '9999px', fontWeight: 'bold' }}>
                                                {formStatus.submitting ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {formStatus.message && (
                                        <Typography sx={{ mt: 2, textAlign: 'center', color: formStatus.type === 'success' ? 'success.main' : 'error.main' }}>
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
    );
};

export default ContactPage;