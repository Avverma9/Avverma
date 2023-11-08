import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
function Home() {
  const location = useLocation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://hotel-backend-tge7.onrender.com/get/second/carousel"
        );
        const data = await response.json();
        const allImages = data.map((result) => result.images).flat();
        setImages(allImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="img_wrapper">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 2500 }}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {images &&
          images.map((item, idx) => (
            <SwiperSlide key={idx}>
              <img src={item} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Home;
