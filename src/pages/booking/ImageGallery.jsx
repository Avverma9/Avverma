import React, { useState } from "react";
import {
  Close,
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

const AdvancedImageGallery = ({ hotelData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = hotelData?.images || [];

  if (images.length === 0) {
    return null; // Don't render anything if there are no images
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full">
      <div className="shadow-lg p-2 rounded-xl overflow-hidden bg-white">
        <div className="flex flex-col gap-4">
          {/* Main Featured Image */}
          <div
            className="group relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openLightbox(currentImageIndex)}
          >
            <img
              src={images[currentImageIndex]}
              alt={`Hotel image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            >
              <button className="bg-black/60 hover:bg-black/80 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                View All Photos
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-[70px] h-[50px] sm:w-[90px] sm:h-[60px] object-cover rounded-md cursor-pointer flex-shrink-0
                    transition-all duration-200 hover:opacity-100
                    ${
                      currentImageIndex === index
                        ? "border-2 border-blue-500 opacity-100"
                        : "border-2 border-transparent opacity-60"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white z-50"
          >
            <Close fontSize="large" />
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image/buttons
          >
            <img
              src={images[currentImageIndex]}
              alt={`Lightbox image ${currentImageIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ArrowBackIosNew />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ArrowForwardIos />
                </button>
                <div className="absolute bottom-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedImageGallery;
