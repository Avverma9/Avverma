import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const FALLBACK_IMAGE = 'https://placehold.co/800x600/e2e8f0/475569?text=Holiday+Preview';

const clampHeightClass = (heightClass) => (heightClass && heightClass.trim().length > 0
  ? heightClass
  : 'h-56 sm:h-64 lg:h-72');

const HolidayImageSlider = ({
  images = [],
  autoPlayInterval = 0,
  heightClass = 'h-56 sm:h-64 lg:h-72',
  rounded = true,
  showIndicators = true,
  showThumbnails = false,
  className = '',
  imageClassName = '',
  onImageClick
}) => {
  const normalizedImages = useMemo(() => {
    const validImages = images?.filter(Boolean) ?? [];
    return validImages.length > 0 ? validImages : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [normalizedImages.length]);

  useEffect(() => {
    if (!autoPlayInterval || normalizedImages.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % normalizedImages.length);
    }, autoPlayInterval);

    return () => window.clearInterval(intervalId);
  }, [autoPlayInterval, normalizedImages.length]);

  const goTo = (offset) => {
    setActiveIndex((prev) => {
      const nextIndex = (prev + offset + normalizedImages.length) % normalizedImages.length;
      return nextIndex;
    });
  };

  const sliderHeightClass = clampHeightClass(heightClass);

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative overflow-hidden bg-slate-100 ${rounded ? 'rounded-2xl' : ''} ${sliderHeightClass}`}>
        {normalizedImages.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`holiday slide ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${imageClassName}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
            onClick={() => onImageClick?.(index, src)}
          />
        ))}

        {normalizedImages.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={() => goTo(-1)}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={() => goTo(1)}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}

        {showIndicators && normalizedImages.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
            {normalizedImages.map((_, index) => (
              <span
                key={`indicator-${index}`}
                className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white shadow' : 'w-3 bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>

      {showThumbnails && normalizedImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {normalizedImages.map((src, index) => (
            <button
              type="button"
              key={`thumb-${src}-${index}`}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${index === activeIndex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View slide ${index + 1}`}
            >
              <img
                src={src}
                alt={`holiday thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

HolidayImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  autoPlayInterval: PropTypes.number,
  heightClass: PropTypes.string,
  rounded: PropTypes.bool,
  showIndicators: PropTypes.bool,
  showThumbnails: PropTypes.bool,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  onImageClick: PropTypes.func
};

export default HolidayImageSlider;
