import React, { useState, useEffect } from 'react';
import './sliderimg.css';

function Imgslide() {
  const [images, setImages] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://hotel-backend-tge7.onrender.com/get/all/hotels');
        const data = await response.json();
        const allImages = data.map(result => result.images).flat();
        setImages(allImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  const goToNextSlide = () => {
    setSlideIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const goToPreviousSlide = () => {
    setSlideIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider01">
      {images.length > 0 && (
        <div className="slider-container01">
          <img
            src={images[slideIndex]}
            alt={`Slide ${slideIndex + 1}`}
            style={{ display: 'block' }}
          />
          <div className="slider-arrows01">
            <div className="slider-arrow-left01" onClick={goToPreviousSlide}>
              &lt;
            </div>
            <div className="slider-arrow-right01" onClick={goToNextSlide}>
              &gt;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Imgslide;
