import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { CiLocationOn } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { MdRoomService } from "react-icons/md";
import { WiDirectionRight } from "react-icons/wi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Result.css";


export default function Result() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const location = useLocation();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const path = location.pathname;
        const city = path.substring(path.lastIndexOf("/") + 1);
        let apiUrl = `https://hotel-backend-tge7.onrender.com/search?city=${city}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error(error));
    }, [location.pathname, location.search]);
    
    
    if (!location.pathname.includes("/search/results/")) {
        return null;
    }

    const handleBook = (id) => {
        navigate(`/hotels/${id}`);
    };
 
    

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const displayData = data
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((hotel) => (
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
                            <h6>
                                <CiLocationOn /> {hotel.city}, {hotel.destination},{" "}
                                {hotel.landmark},{hotel.state}, {hotel.zip}
                            </h6>
                        </div>
                    </div>
                    <div className="price-tag">
    <h5>
        <FaRupeeSign /> {hotel.roomDetails?.[0]?.price}{" "}
    </h5>
    <p>Per room per night</p>
</div>
                    <div className="amenities">
                        <MdRoomService /> Amenities <WiDirectionRight />{" "}
                        {hotel.amenities.slice(0, 5).join(" , ")}
                        {hotel.amenities.length > 5 && (
                            <span> + {hotel.amenities.length - 5} more</span>
                        )}
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
        ));

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
        <div className="lucknow-page-container">

        {data.length === 0 ? (
            <img src="https://media.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif" alt="No hotels found" />
        ) : (
            <>
                {displayData}
                <div className="pagination">
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => changePage(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handleNext} disabled={currentPage === pageCount}>
                        Next
                    </button>
                </div>
            </>
        )}
    </div>
    </>
    

    );
}
