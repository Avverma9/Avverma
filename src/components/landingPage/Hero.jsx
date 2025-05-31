import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import './Hero.css';

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const images = [
        'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/cpp1K1hP15N5RJ0QGo.png',
        'https://www.shutterstock.com/image-vector/hotel-review-rating-service-user-600nw-2239490417.jpg',
        'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/49M8bA3Ob73Hijly1e.png',
    ];

    // Preload images and stop showing skeletons after loading
    useEffect(() => {
        const preloadImages = images.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve;
                })
        );

        Promise.all(preloadImages).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    if (location.pathname !== '/') return null;

    if (loading) {
        return (
          <section className="hero hero-skeleton-wrapper">
    <div className="hero-images">
      <div className="hero-image-skeleton skeleton-box"></div>
    </div>
    <div className="hero-content">
      <div className="skeleton-title skeleton-box"></div>
      <div className="skeleton-text skeleton-box"></div>
      <div className="skeleton-button skeleton-box"></div>
    </div>
  </section>

        );
    }

    return (
        <section className="hero">
            <div className="hero-images">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className={`hero-image fade ${currentImage === idx ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
            </div>

            <div className="hero-content">
                <h1 className="animate-title">Welcome to Roomsstay</h1>
                <p className="animate-text">A place where you can stay and enjoy your holiday</p>
                <a href="/travellers" className="cta-btn animate-btn">
                    Book Your Stay
                </a>
            </div>
        </section>
    );
};

export default Hero;
