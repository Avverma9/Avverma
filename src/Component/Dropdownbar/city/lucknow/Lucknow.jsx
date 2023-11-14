import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { CiLocationOn } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { MdRoomService } from "react-icons/md";
import { WiDirectionRight } from "react-icons/wi";
import "./lucknow.css";

export default function Lucknow() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/cities/Lucknow") {
      fetch(
        "https://hotel-backend-tge7.onrender.com/hotels/destination/get/all?city=lucknow"
      )
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }
  }, [location.pathname]); // Add location.pathname as a dependency

  if (location.pathname !== "/cities/Lucknow") {
    return null;
  }

  const handleBook = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="lucknow-page-container">
      {data.map((hotel) => (
        <div key={hotel._id} className="hotel-container">
            <div className="img_wrapper">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              navigation={true}
              modules={[Autoplay, Navigation]}
            >
              {hotel.images &&
                hotel.images.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={image} alt="" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="content-container">
            <div>
              
              <h3>{hotel.hotelName}</h3>
              <div className="hotel-address">
                <h6> <CiLocationOn />{" "}{hotel.city}, {hotel.destination}, {hotel.landmark},{hotel.state}, {hotel.zip}
                </h6>
              </div>
            </div>
            <div className="price-tag">
              <h5><FaRupeeSign /> {hotel.roomDetails[0].price} </h5><p>Per room per night</p>
            </div>
            <div className="amenities">
  <MdRoomService /> {" "} Amenities <WiDirectionRight /> {hotel.amenities.slice(0, 5).join(" , ")}
  {hotel.amenities.length > 5 && <span> + {hotel.amenities.length - 5} more</span>}
</div>
            <button
              className="booking-button"
              onClick={() => handleBook(hotel._id)}
            >
              Book Now
            </button>
          </div>
        
          <hr />
          <br />
        </div>
      ))}
    </div>
  );
}
