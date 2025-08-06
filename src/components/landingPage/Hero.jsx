import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Skeleton, Fade, Slide, LinearProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { bannerImage } from '../../utils/extrasList';

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const animatedTexts = [
        { mainText: 'Hotel', subText: 'Luxury & Comfort' },
        { mainText: 'Travel', subText: 'Explore & Discover' },
        { mainText: 'Tour', subText: 'Tour & Memories' },
        { mainText: 'Stay', subText: 'Relax & Unwind' },
    ];

    const slides = bannerImage.map((imageSrc, index) => ({
        src: imageSrc,
        mainText: animatedTexts[index % animatedTexts.length].mainText,
        subText: animatedTexts[index % animatedTexts.length].subText,
    }));

    useEffect(() => {
        const preloadImages = slides.map((slide) =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = slide.src;
                img.onload = resolve;
                img.onerror = resolve;
            })
        );

        Promise.all(preloadImages).then(() => {
            setTimeout(() => setLoading(false), 500);
        });
    }, []);

    useEffect(() => {
        if (!loading) {
            const slideDuration = 5000; // 5 seconds
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, slideDuration);

            let progressInterval;
            const startProgress = () => {
                setProgress(0);
                const startTime = Date.now();
                progressInterval = setInterval(() => {
                    const elapsedTime = Date.now() - startTime;
                    const newProgress = (elapsedTime / slideDuration) * 100;
                    if (newProgress >= 100) {
                        clearInterval(progressInterval);
                    } else {
                        setProgress(newProgress);
                    }
                }, 50);
            };

            startProgress();

            return () => {
                clearInterval(interval);
                clearInterval(progressInterval);
            };
        }
    }, [loading, slides.length, currentImageIndex]);

    const handleNavClick = (index) => {
        setCurrentImageIndex(index);
        setProgress(0);
    };

    if (location.pathname !== '/') return null;

    if (loading) {
        return (
            <Box sx={{ p: { xs: 2, md: 4 } }}>
                 <Skeleton variant="rectangular" sx={{ height: { xs: '65vh', md: '85vh' }, width: '100%', borderRadius: '24px' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
            <Box sx={{ position: 'relative', height: { xs: '65vh', md: '85vh' }, width: '100%', overflow: 'hidden', borderRadius: '24px' }}>
                {/* Background Images Container */}
                {slides.map((slide, index) => (
                    <Fade in={currentImageIndex === index} timeout={1500} key={slide.src}>
                        <Box
                            sx={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundImage: `url(${slide.src})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                animation: 'kenburns 20s ease-out both infinite',
                                '@keyframes kenburns': {
                                    '0%': { transform: 'scale(1) translate(0, 0)' },
                                    '100%': { transform: 'scale(1.15) translate(-2%, 2%)' },
                                },
                            }}
                        />
                    </Fade>
                ))}

                {/* Gradient Overlay */}
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                }} />

                {/* Animated Text Overlays */}
                <Box sx={{
                    position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'white', textAlign: 'center', width: '90%',
                    '@keyframes slide-in-elliptic-top-fwd': {
                        '0%': { transform: 'translateY(-600px) rotateX(-30deg) scale(0)', transformOrigin: '50% 100%', opacity: 0 },
                        '100%': { transform: 'translateY(0) rotateX(0) scale(1)', transformOrigin: '50% 1400px', opacity: 1 }
                    }
                }}>
                    <Typography
                        key={currentImageIndex} // Key to re-trigger animation
                        variant="h1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
                            textShadow: '3px 3px 15px rgba(0,0,0,0.5)',
                            animation: `slide-in-elliptic-top-fwd 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                        }}
                    >
                        {slides[currentImageIndex].mainText}
                    </Typography>
                    <Typography
                        key={currentImageIndex + '-sub'} // Different key for subtext
                        variant="h5"
                        sx={{
                            mt: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            fontWeight: 300,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            animation: `slide-in-elliptic-top-fwd 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both`,
                        }}
                    >
                        {slides[currentImageIndex].subText}
                    </Typography>
                </Box>

                {/* Content */}
                <Box sx={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white',
                    pb: { xs: 12, md: 10 }, // Increased padding bottom to make space for nav
                    px: 4,
                }}>
                    <Slide direction="up" in={!loading} timeout={1000} mountOnEnter unmountOnExit>
                        <Typography
                            variant="h6" component="p"
                            sx={{ mb: 3, maxWidth: '700px', fontWeight: 400, fontSize: { xs: '0.9rem', md: '1.1rem' }, textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
                        >
                            Discover and book unique places to stay and enjoy an unforgettable holiday experience.
                        </Typography>
                    </Slide>
                    <Slide direction="up" in={!loading} timeout={1200} mountOnEnter unmountOnExit>
                        <Button
                            variant="contained" size="large" onClick={() => navigate('/travellers')}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                borderRadius: '50px', px: {xs: 4, md: 5}, py: 1.5, fontSize: {xs: '0.9rem', md: '1rem'}, fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': { transform: 'scale(1.05)', boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)' },
                            }}
                        >
                            Book Your Stay
                        </Button>
                    </Slide>
                </Box>

                {/* Advanced Navigation with Progress Bar */}
                <Box sx={{
                    position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', // Moved down
                    display: 'flex', gap: 2, alignItems: 'center',
                    bgcolor: 'rgba(0,0,0,0.4)', p: 1.2, borderRadius: '20px',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => handleNavClick(index)}
                            sx={{
                                width: '50px', height: '6px', cursor: 'pointer',
                                borderRadius: '6px', overflow: 'hidden',
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <LinearProgress
                                variant="determinate"
                                value={currentImageIndex === index ? progress : (currentImageIndex > index ? 100 : 0)}
                                sx={{
                                    height: '100%',
                                    '& .MuiLinearProgress-bar': {
                                        background: 'linear-gradient(45deg, #fff 30%, #eee 90%)',
                                    },
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
