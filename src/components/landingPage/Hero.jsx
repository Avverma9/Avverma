import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Skeleton,
  Fade,
  Slide,
  LinearProgress
} from '@mui/material';
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

  const slides = bannerImage.map((src, idx) => ({
    src,
    mainText: animatedTexts[idx % animatedTexts.length].mainText,
    subText: animatedTexts[idx % animatedTexts.length].subText,
  }));

  // Preload images
  useEffect(() => {
    Promise.all(
      slides.map(
        (s) =>
          new Promise((res) => {
            const img = new Image();
            img.src = s.src;
            img.onload = res;
            img.onerror = res;
          })
      )
    ).then(() => setTimeout(() => setLoading(false), 300));
  }, []);

  // Auto-slide and progress
  useEffect(() => {
    if (loading) return;
    const D = 4000;
    let progInt;
    const slideInt = setInterval(() => {
      setCurrentImageIndex((p) => (p + 1) % slides.length);
      setProgress(0);
      startProgress();
    }, D);

    function startProgress() {
      const start = Date.now();
      progInt = setInterval(() => {
        const pct = ((Date.now() - start) / D) * 100;
        if (pct >= 100) clearInterval(progInt);
        else setProgress(pct);
      }, 30);
    }

    startProgress();
    return () => {
      clearInterval(slideInt);
      clearInterval(progInt);
    };
  }, [loading, slides.length]);

  const handleNavClick = (i) => {
    setCurrentImageIndex(i);
    setProgress(0);
  };

  if (location.pathname !== '/') return null;

  if (loading) {
    return (
      <Box sx={{ p: { xs: 1, md: 4 } }}>
        <Skeleton
          variant="rectangular"
          sx={{
            height: { xs: 200, sm: 300, md: '80vh' },
            borderRadius: '20px'
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 4 } }}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 200, sm: 300, md: '80vh' },
          width: '100%',
          overflow: 'hidden',
          borderRadius: '20px'
        }}
      >
        {slides.map((slide, idx) => (
          <Fade
            in={currentImageIndex === idx}
            timeout={1200}
            key={slide.src}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: 'kenburns 20s ease-out both infinite',
                '@keyframes kenburns': {
                  '0%': { transform: 'scale(1) translate(0,0)' },
                  '100%': { transform: 'scale(1.1) translate(-2%,2%)' }
                }
              }}
            />
          </Fade>
        ))}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.2) 50%,transparent 100%)'
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: { xs: '30%', sm: '35%', md: '40%' },
            left: '50%',
            transform: 'translate(-50%,-50%)',
            color: '#fff',
            textAlign: 'center',
            width: '90%',
            '@keyframes slideIn': {
              '0%': {
                transform: 'translateY(-600px) rotateX(-30deg) scale(0)',
                opacity: 0
              },
              '100%': {
                transform: 'translateY(0) rotateX(0) scale(1)',
                opacity: 1
              }
            }
          }}
        >
          <Typography
            key={currentImageIndex}
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '4rem' },
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              animation: 'slideIn 1s ease both'
            }}
          >
            {slides[currentImageIndex].mainText}
          </Typography>
          <Typography
            key={currentImageIndex + '-sub'}
            variant="h5"
            sx={{
              mt: 0.5,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 300,
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
              animation: 'slideIn 1s ease 0.2s both'
            }}
          >
            {slides[currentImageIndex].subText}
          </Typography>
        </Box>

        {/* Moved up: bottom as percentage */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '25%', sm: '20%', md: '15%' },
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#fff',
            px: 2
          }}
        >
          <Slide in={!loading} direction="up" timeout={800}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.7rem', md: '1rem' },
                textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
              }}
            >
              Discover and book unique places to stay and enjoy an unforgettable holiday experience.
            </Typography>
          </Slide>
          <Slide in={!loading} direction="up" timeout={1000}>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/travellers')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: '50px',
                px: { xs: 2, md: 5 },
                py: { xs: 0.5, md: 1 },
                fontSize: { xs: '0.7rem', md: '1rem' },
                fontWeight: 600,
                background: 'linear-gradient(45deg,#FE6B8B 30%,#FF8E53 90%)',
                boxShadow: '0 3px 5px rgba(255,105,135,0.3)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 10px rgba(255,105,135,0.4)'
                }
              }}
            >
              Book Your Stay
            </Button>
          </Slide>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 0, md: 20 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 0.5,
            bgcolor: 'rgba(0,0,0,0.3)',
            py: 0.5,
            px: 1,
            borderRadius: '12px',
            backdropFilter: 'blur(6px)'
          }}
        >
          {slides.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => handleNavClick(idx)}
              sx={{
                width: { xs: 20, sm: 30, md: 40 },
                height: 4,
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'rgba(255,255,255,0.2)',
                cursor: 'pointer'
              }}
            >
              <LinearProgress
                variant="determinate"
                value={
                  currentImageIndex === idx
                    ? progress
                    : currentImageIndex > idx
                    ? 100
                    : 0
                }
                sx={{
                  height: '100%',
                  backgroundColor: 'transparent',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(45deg,#fff 30%,#eee 90%)'
                  }
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
