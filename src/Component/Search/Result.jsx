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
import FilterSidebar from "./FilterSidebar";

export default function Result() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const location = useLocation();
  const navigate = useNavigate();
  const [minValue, set_minValue] = useState(400);
  const [maxValue, set_maxValue] = useState(4000);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [starrating, setStarrating] = useState([]);
  const [roomtype, setRoomtype] = useState([]);
  const [bedtype, setBedtype] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [showall, setShowall] = useState(false);
  const [showallstar, setShowallstar] = useState(false);
  const [showroomtype, setShowroomtype] = useState(false);
  const [showbedtype, setShowbedtype] = useState(false);
  const [showamenities, setShowamenities] = useState(false); 
  const path = location.pathname;
 const city = path.substring(path.lastIndexOf("/") + 1);
  useEffect(() => {
   
    
    let apiUrl = `https://hotel-backend-tge7.onrender.com/search?city=${city}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [location.pathname, location.search]);

  if (!location.pathname.includes(`/search/results/${city}`)) {
    return null;
  }

  const handleBook = (id) => {
    navigate(`/hotels/${id}`);
  };

  const calculateDiscountedPrice = (hotel) => {
    const discountedPrice =
      hotel.roomDetails?.[0]?.price - (hotel.roomDetails?.[0]?.price * hotel.offerPriceLess) / 100;
    return discountedPrice;
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);



  //Filter functions
  const handlePropertyTypeChange = (propertyType, checked) => {
    if (checked) {
      setSelectedPropertyTypes((prevSelected) => [
        ...prevSelected,
        propertyType,
      ]);
    } else {
      setSelectedPropertyTypes((prevSelected) =>
        prevSelected.filter((type) => type !== propertyType)
      );
    }
  };
  const handleRatingChange = (starRating, checked) => {
    if (checked) {
      setStarrating((prevSelected) => [...prevSelected, starRating]);
    } else {
      setStarrating((prevSelected) =>
        prevSelected.filter((type) => type !== starRating)
      );
    }
  };
  const handleroomtype = (roomTypes, checked) => {
    if (checked) {
      setRoomtype((prevSelected) => [...prevSelected, roomTypes]);
    } else {
      setRoomtype((prevSelected) =>
        prevSelected.filter((type) => type !== roomTypes)
      );
    }
  };
  const handlebedtype = (bedTypes, checked) => {
    if (checked) {
      setBedtype((prevSelected) => [...prevSelected, bedTypes]);
    } else {
      setBedtype((prevSelected) =>
        prevSelected.filter((type) => type !== bedTypes)
      );
    }
  };
  const handleamenity = (amenities, checked) => {
    if (checked) {
      setAmenity((prevSelected) => [...prevSelected, amenities]);
    } else {
      setAmenity((prevSelected) =>
        prevSelected.filter((type) => type !== amenities)
      );
    }
  };

  const clearFilters = () => {
    setSelectedPropertyTypes([]);
    setRoomtype([]);
    setStarrating([]);
    setBedtype([]);
    setAmenity([]);
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };


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
          {hotel.roomDetails.originalPrice > hotel.roomDetails.price && (
            <div className="offer-intro">
                
              <p>{hotel.offerDetails} get {hotel.offerPriceLess}% less </p>
            </div>
          )}
          <div className="price-tag">
            <h5>
              <FaRupeeSign /> {hotel.isOffer ? calculateDiscountedPrice(hotel) : hotel.roomDetails?.[0]?.price}{" "}
            </h5>
         
              <del>
                <FaRupeeSign /> {hotel.roomDetails?.[0]?.price}
              </del>
           
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
    <div className="search-filter-container">
    <FilterSidebar
          minValue={minValue}
          set_minValue={set_minValue}
          maxValue={maxValue}
          set_maxValue={set_maxValue}
          setData={setData}
          selectedPropertyTypes={selectedPropertyTypes}
          setSelectedPropertyTypes={setSelectedPropertyTypes}
          starrating={starrating}
          setStarrating={setStarrating}
          roomtype={roomtype}
          setRoomtype={setRoomtype}
          bedtype={bedtype}
          setBedtype={setBedtype}
          amenity={amenity}
          setAmenity={setAmenity}
          showall={showall}
          setShowall={setShowall}
          showallstar={showallstar}
          setShowallstar={setShowallstar}
          showroomtype={showroomtype}
          setShowroomtype={setShowroomtype}
          showbedtype={showbedtype}
          setShowbedtype={setShowbedtype}
          showamenities={showamenities}
          setShowamenities={setShowamenities}
          handlePropertyTypeChange={handlePropertyTypeChange}
          handleRatingChange={handleRatingChange}
          handleroomtype={handleroomtype}
          handlebedtype={handlebedtype}
          handleamenity={handleamenity}
          clearFilters={clearFilters}
          displayData={displayData}
        /></div>
    <>

      <div className="lucknow-page-container">
        {data.length === 0 ? (
          <img
            src="https://media.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif"
            alt="No hotels found"
          />
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
    </> </>
  );
}
