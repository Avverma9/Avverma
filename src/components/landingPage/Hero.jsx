import React, { useEffect, useState } from 'react';
import './Hero.css'; // Ensure this CSS file is correctly linked
import { useLocation } from 'react-router-dom';

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const location = useLocation();
    // Array of images to be displayed
    const images = [
        'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/cpp1K1hP15N5RJ0QGo.png?Expires=1731418631&Signature=JTXExPsJRJVErh76K783gLfXIL-wVKXAopolswrQE1BzrBufYaHhYYjaSr3JSBqJLPZE~QyOu14FKqy2Bm3NdUG6QeR4Bt9ai3ud~g2wSLwPNqM002omCzz7mGED9zx6nAt~v53p0PJX117d5xX73X~oCkwfBZ6fGoay5ZPEpWMmmo23FKO~08vltBOHCdbtrlPK7~wMHymjkEJvjvuTBL09Pf09s1dv~4tfJyzLsXzeSyBFoP7~m2RRVGj4tydiXb1pPg7EhFk5KISQqCs8QaxrMv69zEGPipKE50NG0V4V9fRV5E8FakKcaqEsfElGD5CH~LuUrbhrPCqccgiLsQ__&Key-Pair-Id=K2YEDJLVZ3XRI',
        'https://www.shutterstock.com/image-vector/hotel-review-rating-service-user-600nw-2239490417.jpg',
        'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/49M8bA3Ob73Hijly1e.png?Expires=1731418631&Signature=lfpErdpQKRLvEk1nBTs26ZTrqXpVPP9UPlHEW0mqZvon3Xoz2QTfkoVWf6UJS3FToKz8~~hGPqZMpoKkGKUkw3xIP7WZ8169FqValAzltwVXVYwqPTyNIGBCdVb3WNjova173JsmN~Bciqbi08BXJjxCdIG~0bog4goOB~aImIqLn5XFtfmpkgcNVHRwgD-QTMVff9c2s4iXa4jGbv369KnleKouMdA8OpMOIzXzmc19Ajs3bgXdWHhqaTcEEs28hYzB9o0-vncRaFetmLuh2M1LahEUz6nfyPJqYUou~2jvIN1F4bceXggtrsbJdFwKZUNZldmo91sW26miA3rRGw__&Key-Pair-Id=K2YEDJLVZ3XRI',
    ];

    // Change image every second (1000ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Loop through images
        }, 5000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, [images.length]);
    if (location.pathname !== '/') {
        return null;
    }
    return (
        <section className="hero">
            {/* Image container with background images */}
            <div className="hero-images">
                <div
                    className={`hero-image fade ${currentImage === 0 ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${images[0]})` }}
                ></div>
                <div
                    className={`hero-image fade ${currentImage === 1 ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${images[1]})` }}
                ></div>
                <div
                    className={`hero-image fade ${currentImage === 2 ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${images[2]})` }}
                ></div>
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
