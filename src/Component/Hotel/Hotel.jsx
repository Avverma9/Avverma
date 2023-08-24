/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './hotel.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSnowflake,
  faDumbbell,
  faParking,
  faSwimmingPool,
  faPaw,
  faGlassMartini,
  faSmoking,
  faStar,
  faKitchenSet,
  faTv,
  faFire,
  faPowerOff,
  faCamera,
  faElevator,
  faCreditCard,
  faCheck,
  faInr,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import RangeSlider from "../Hotel/Rangeslider/range";
import axios from "axios";
import Imgslide from "./slider/sliderimage";
import { type } from "@testing-library/user-event/dist/type";

function HotelList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 6;

  const location = useLocation();
  const [hotels, setHotels] = useState([]); // list of hotels initially when page loaded
  const [expandedResultId, setExpandedResultId] = useState(null);
  const [reviewCount, setReviewCount] = useState([])
  const navigate = useNavigate();

  const [minValue, set_minValue] = useState(400);
  const [maxValue, set_maxValue] = useState(4000);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [starrating,setStarrating] = useState([]);
  const [roomtype,setRoomtype] = useState([]);
  const [bedtype,setBedtype] = useState([]);



  //Filter functions
  const handlePropertyTypeChange = (propertyType, checked) => {
    if (checked) {
      setSelectedPropertyTypes((prevSelected) => [...prevSelected, propertyType]);
    } else {
      setSelectedPropertyTypes((prevSelected) =>
        prevSelected.filter((type) => type !== propertyType)
      );
    }
  };
  const handleRatingChange = (starRating,checked) =>{
    if (checked){
      setStarrating((prevSelected)=> [...prevSelected, starRating]);
    } else {
      setStarrating((prevSelected)=>
      prevSelected.filter((type)=>type!==starRating)
      );
    }
  };
  const handleroomtype = (roomTypes,checked)=>{
    if (checked){
         setRoomtype((prevSelected)=>[...prevSelected,roomTypes]);
    }else{
      setRoomtype((prevSelected)=>
      prevSelected.filter((type)=>type!==roomTypes)
      );
    };
  };
  const handlebedtype = (bedTypes,checked)=>{
    if (checked){
      setBedtype((prevSelected)=>[...prevSelected,bedTypes]);
    }else{
      setBedtype((prevSelected)=>
      prevSelected.filter((type)=>type!==bedTypes)
      );
    };
  };





  //Filter Api
  useEffect(() => {
    const propertyTypeQueryParam = selectedPropertyTypes.join(",");
    const roomtypeQueryParam = roomtype.join(",");
    const starRatingQueryParam = starrating.join(",");
    const bedtypeQueryparam = bedtype.join(",");
    
    
    axios
      .get(
        `https://hotel-backend-tge7.onrender.com/hotels/query/get/by?propertyType=${propertyTypeQueryParam}&roomTypes=${roomtypeQueryParam}&starRating=${starRatingQueryParam}&bedTypes=${bedtypeQueryparam}`
      )
      .then((data) => {
        if (data.status === 200) {
          setHotels(data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [selectedPropertyTypes,roomtype,starrating,bedtype]);

 


 
  // ----------------------

  useEffect(() => {
    if (minValue > 400 || maxValue < 4000) {
      axios
        .get(
          `https://hotel-backend-tge7.onrender.com/hotels/price/get/by?minPrice=${minValue}&maxPrice=${maxValue}`
        )
        .then((data) => {
          if (data.status === 200) {
            setHotels(data.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get("https://hotel-backend-tge7.onrender.com/get/all/hotels")
        .then((data) => {
          if (data.status === 200) {
            setHotels(data.data);
          }
        })
        .catch((error) => console.log(error));
    }



    const labels = document.getElementsByClassName("label");
    Array.from(labels).forEach((label, index) => {
      if (index === 0) {
        label.textContent = `₹${minValue}`;
      } else if (index === 1) {
        label.textContent = `₹${maxValue}`;
      }
    });
  }, [maxValue, minValue]);


  useEffect(() => {
    const fetchReviewsCount = async () => {
      const reviewCounts = await Promise.all(
        hotels.map(async (hotel) => {
          try {
            const response = await fetch(`https://hotel-backend-tge7.onrender.com/getReviews/${hotel._id}`);
            const data = await response.json();
            
            if (!data || !data.reviews || !Array.isArray(data.reviews)) {
              console.log(`Invalid data structure for hotelId: ${hotel._id}`);
              return { hotelId: hotel._id, count: 0 };
            }
            
            return { hotelId: hotel._id, count: data.reviews.length };
          } catch (error) {
            console.error(`Error fetching data for hotelId ${hotel._id}:`, error);
            return { hotelId: hotel._id, count: 0 };
          }
        })
      );
      setReviewCount(reviewCounts);
    };
  
    fetchReviewsCount();
  }, [hotels]);


  if (location.pathname !== "/home") {
    return null;
  }

  const handleBuy = (hotelID) => {
    // Replace with the logic to handle the booking action
    console.log(`Book Now: ${hotelID}`);
    navigate(`/hotels/${hotelID}`);
  };

  const toggleDetails = (resultId) => {
    if (expandedResultId === resultId) {
      setExpandedResultId(null);
    } else {
      setExpandedResultId(resultId);
    }
  };

  // Pagination for Hotels

  const totalItems = hotels && hotels.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = hotels && hotels.slice(startIndex, endIndex);

  const visiblePages = [];
  const totalPagesToDisplay = Math.min(totalPages, maxVisiblePages);
  let startPage = 1;
  let endPage = totalPagesToDisplay;

  if (currentPage > Math.floor(maxVisiblePages / 2)) {
    startPage = currentPage - Math.floor(maxVisiblePages / 2);
    endPage = startPage + totalPagesToDisplay - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - totalPagesToDisplay + 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="whole-data d-flex">
        <div
          className={`${styles["vertical-bar"]} ${styles["sticky-sidebar"]}`}
        >
          <div className="filt-1st">
            <h3 className="filterhead">Filters</h3>
            <br />
            <h5 className="filterprice">Price</h5>
            <RangeSlider
              minValue={minValue}
              maxValue={maxValue}
              set_minValue={set_minValue}
              set_maxValue={set_maxValue}
            />
          </div>
          <hr />
          <div className="filt-2nd">
            <h5 className="colle">Property Type</h5>
            <label>
              {" "}
              <input type="checkbox"
                onChange={(e) => handlePropertyTypeChange("Apartment", e.target.checked)} />
              Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox"
              onChange={(e) => handlePropertyTypeChange("Guest house", e.target.checked)}
              />
              Guest House
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Holiday home", e.target.checked)} />
              Holiday Home
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Homestay", e.target.checked)}/>
              Homes Stay
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Hostel", e.target.checked)}/>
              Hostel
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Hotel", e.target.checked)}/>
              Hotel
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Hotel Apartment", e.target.checked)}/>
              Hotel Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Resort", e.target.checked)}/>
              Resort
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handlePropertyTypeChange("Villa", e.target.checked)}/>
              Villa
            </label>
          </div>
          <hr />
          <div className="filt-3rd">
            <h5 className="colle">Star Rating</h5>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleRatingChange("1", e.target.checked)}/>
              1 Star
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleRatingChange("2", e.target.checked)}/>
              2 Star
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleRatingChange("3", e.target.checked)}/>
              3 Star
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleRatingChange("4", e.target.checked)}/>
              4 Star
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleRatingChange("5", e.target.checked)}/>
              5 Star
            </label>
          </div>
          <hr />
          <div className="filt-4th">
            <h5 className="colle">Room Type</h5>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Business Double Room", e.target.checked)}/>
              Business Double Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Deluxe King Room", e.target.checked)}/>
              Deluxe King Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Deluxe One Bed Room Suite", e.target.checked)}/>
              Deluxe One Bed Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Deluxe Room", e.target.checked)}/>
              Deluxe Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Deluxe Twin Room", e.target.checked)}/>
              Deluxe Twin Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Double or Twin", e.target.checked)}/>
              Double or Twin
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Double Room", e.target.checked)} />
              Double Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Execcutive Studio", e.target.checked)}/>
              Executive Studio
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Executive Suites", e.target.checked)}/>
              Executive Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Executive room", e.target.checked)}/>
              Executive Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Family Room", e.target.checked)}/>
              Family Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Free stay", e.target.checked)}/>
              Free Stay
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Junior Suite", e.target.checked)}/>
              Junior Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("One Bedroom Suite", e.target.checked)}/>
              One Bedroom Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("One-Bedroom Apartment", e.target.checked)}/>
              One Bedroom Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Partition Room", e.target.checked)}/>
              Partition Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Quadruple", e.target.checked)}/>
              Quadrupel
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Royal Two Bedroom Suit", e.target.checked)}/>
              Royal Two Bedroom Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Single Room", e.target.checked)}/>
              Single Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Six Bed", e.target.checked)}/>
              Six Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Small Private Patition Room", e.target.checked)}/>
              Small Private Partition Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard One-Bedroom Apartment", e.target.checked)}/>
              Standard One Bedroom Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard Studio with King Bed", e.target.checked)}/>
              Standard Studio With King Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard Studio with Twin beds", e.target.checked)}/>
              Standard Studio with Twin Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard Three-Bedroom Apartment", e.target.checked)}/>
              Standard Three Bedroom Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard Two-Bedroom Apartment", e.target.checked)}/>
              Standard Two Bedroom Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard room", e.target.checked)}/>
              Standard Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Standard King Room", e.target.checked)}/>
              Standard King Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Studio Apartment", e.target.checked)}/>
              Studio Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Studio Deluxe", e.target.checked)}/>
              Studio Deluxe
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Suite", e.target.checked)}/>
              Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Suite Standard", e.target.checked)}/>
              Suite Standard
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Superior", e.target.checked)}/>
              Superior
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Superior King Room", e.target.checked)}/>
              Superior King Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Superior Room", e.target.checked)} />
              Superior Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Superior Twin Room", e.target.checked)}/>
              Superior Twin Room
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Three Bedroom Apartment", e.target.checked)}/>
              Three Bedroom Apartment
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Triple", e.target.checked)}/>
              Triple
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Twin", e.target.checked)}/>
              Twin
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Two Bedroom Suite", e.target.checked)}/>
              Two Bedroom Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e) => handleroomtype("Two-Bedroom Apartment", e.target.checked)}/>
              Two Bedroom Apartment
            </label>
          </div>
          <hr />
          <div className="filt-5th">
            <h5 className="colle">Bed Types</h5>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("Bunk Bed",e.target.value)}/>
              Bunk Bed
            </label>
            {" "}
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("Daybed",e.target.value)}/>
              DayBed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("King Size",e.target.value)}/>
              King Size
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              King Bed Or Queen Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              King or Twin
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              King Size + Queen Size
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              King+Twin
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("Murphy bed",e.target.value)}/>
              Murphy Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("Queen Size",e.target.value)}/>
              Queen Size
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              Single Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("Trundle bed",e.target.value)}/>
              Trundle Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              Twin+King+Queen
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              Twin Bed
            </label>
            <label>
              {" "}
              <input type="checkbox" onChange={(e)=>handlebedtype("",e.target.value)}/>
              King Bed or Queen Bed or Twin Bed
            </label>
          </div>
          <hr />
          <div className="filt-6th">
            <h5 className="colle">Amenities</h5>
            <label>
              {" "}
              <input type="checkbox" />
              24-hour Front Desk Service
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              ATM on Site
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Air Conditioning
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Airport Shuttle (Free)
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Airport Shuttle Service (Surcharge)
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              BBQ/picnic area
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Baby sitting
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Baggage Storage
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Bar
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Bathrobe
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Beach
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              BeachFront
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Billiard
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Business Center
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Cable TV
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Car Rental
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Casino
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Clean & Disinfect
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Coffee/Tea
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Coffee Maker
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Complimentary Bottled Water
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Complimentary Toiletries
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Complimentary Breakfast
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Conclerge Desk
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Continental Breakfast
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Currency Exchange
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Dinner
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Dry Cleaning
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Elevators
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Executive Suite
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Fishing
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Fitness Center
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Free Parking
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Free Wireless Internet
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Game Room
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Good Showers
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Grocery shopping service available
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Hair Dryer
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              House Keeping
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Indoor Parking
            </label>
            <label>
              {" "}
              <input type="checkbox" />
            Indoor Pool
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Ironing Service
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Jacuzzi (hot tub)
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Kitchen Facility
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Laundary
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Library
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Lockers
            </label>
            <label>
              {" "}
              <input type="checkbox" />
            Lunch
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Meeting/Banquet Facilities
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Microwave
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Newspaper
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Nightclub/DJ
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Non Smoking Rooms
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              On Site Restaurant
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Paid Parking
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Pet Friendly
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Playground
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Private Beach area
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Refrigerator
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Room Service
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Safe
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Satellite Tv
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Shoeshine
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Shops (on Site)
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Social Distancing
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Gift Shop
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Spa
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Swimming Pool
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Table tennis
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Telephone
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Television
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Tennis court
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Tour Desk
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Towels
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Turkish/Steam bath
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              valet parking
            </label>
            <label>
              {" "}
              <input type="checkbox" />
              Vending Machine(snakes)
            </label>
            

            

          </div>
        </div>

        <div className={styles["search-results"]}>
          {currentData.map((result) => (
            <div
              key={result._id}
              className={`${styles["search-result"]} ${expandedResultId === result._id ? styles["expanded"] : ""
                }`}
            >
              <Imgslide resultId={result._id} />
              <div className={styles["search-result-content"]}>
                <div className={styles["hotel-info"]}>
                  <h3 className={styles["search-result-title"]}>
                    {result.hotelName}
                  </h3>
                  <p className={styles["search-result-destination"]}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className={styles["location"]}
                    />
                    {result.destination}
                  </p>
                </div>
                <h5 className={styles["hotel-rating"]}>
                  {result.rating}
                  <FontAwesomeIcon icon={faStar} className={styles["fastar"]} />
                </h5>

                <div className={styles["amenities"]}>
                  <ul>
                    {result.amenities.slice(0, 3).map((amenity) => (
                      <li key={amenity}>
                        {amenity === "Free WIFI" && (
                          <FontAwesomeIcon
                            icon={faWifi}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "AC" && (
                          <FontAwesomeIcon
                            icon={faSnowflake}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "GYM" && (
                          <FontAwesomeIcon
                            icon={faDumbbell}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Parking" && (
                          <FontAwesomeIcon
                            icon={faParking}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Swimming Pool" && (
                          <FontAwesomeIcon
                            icon={faSwimmingPool}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Kitchen" && (
                          <FontAwesomeIcon
                            icon={faKitchenSet}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "TV" && (
                          <FontAwesomeIcon
                            icon={faTv}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Geyser" && (
                          <FontAwesomeIcon
                            icon={faFire}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Power_backup" && (
                          <FontAwesomeIcon
                            icon={faPowerOff}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "CCTV" && (
                          <FontAwesomeIcon
                            icon={faCamera}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Fire-Extinguisher" && (
                          <FontAwesomeIcon
                            icon={faFire}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Elevator" && (
                          <FontAwesomeIcon
                            icon={faElevator}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity === "Card-payment" && (
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            className={styles["fonticon"]}
                          />
                        )}
                        {amenity !== "Free WIFI" &&
                          amenity !== "AC" &&
                          amenity !== "GYM" &&
                          amenity !== "Parking" &&
                          amenity !== "Swimming Pool" &&
                          amenity !== "Kitchen" &&
                          amenity !== "TV" &&
                          amenity !== "Geyser" &&
                          amenity !== "Power_backup" &&
                          amenity !== "CCTV" &&
                          amenity !== "Fire-Extinguisher" &&
                          amenity !== "Elevator" &&
                          amenity !== "Card-payment" && (
                            <>
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={styles["fonticon"]}
                              />
                            </>
                          )}
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="mixrupeebutton"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "6px",
                  }}
                >
                  <div className="rupeedetail">
                    <p className={styles["search-result-reviews"]}>
                      {reviewCount.find((review) => review.hotelId === result._id)?.count || "No"} Reviews
                    </p>
                    <p className={styles["search-result-price"]}>
                      <FontAwesomeIcon
                        icon={faInr}
                        className={styles["rupees"]}
                      />{" "}
                      {result.price}
                      <span className={styles["detail"]}>
                        per room per night
                      </span>
                    </p>
                  </div>
                  <div
                    className="flex-button"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15%",
                    }}
                  >

                    <button
                      className={styles["view-details-button"]}
                      onClick={() => handleBuy(result._id)}
                    >
                      View Details
                    </button>
                    <button
                      className={styles["book-now-button"]}
                      onClick={() => handleBuy(result._id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <p className={styles["search-result-availability"]}>
                  Local ID: {result.availability}
                </p>
                <hr />

                {expandedResultId === result._id && (
                  <div>
                    <div className={styles["amenities"]}>
                      <h6>More:</h6>
                      <ul>
                        {result.moreOptions.map((more) => (
                          <li key={more}>
                            {more === "Pets Allowed" && (
                              <FontAwesomeIcon
                                icon={faPaw}
                                className={styles["fonticon"]}
                              />
                            )}
                            {more === "Alcohol Allowed" && (
                              <FontAwesomeIcon
                                icon={faGlassMartini}
                                className={styles["fonticon"]}
                              />
                            )}
                            {more === "Smoking Allowed" && (
                              <FontAwesomeIcon
                                icon={faSmoking}
                                className={styles["fonticon"]}
                              />
                            )}
                            {more}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr />

                    <div className={styles["amenities"]}>
                      <h6>Amenities:</h6>
                      <ul>
                        {result.amenities.map((amenity) => (
                          <li key={amenity}>
                            {amenity === "Free WIFI" && (
                              <FontAwesomeIcon
                                icon={faWifi}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "AC" && (
                              <FontAwesomeIcon
                                icon={faSnowflake}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "GYM" && (
                              <FontAwesomeIcon
                                icon={faDumbbell}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Parking" && (
                              <FontAwesomeIcon
                                icon={faParking}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Swimming Pool" && (
                              <FontAwesomeIcon
                                icon={faSwimmingPool}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Kitchen" && (
                              <FontAwesomeIcon
                                icon={faKitchenSet}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "TV" && (
                              <FontAwesomeIcon
                                icon={faTv}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Geyser" && (
                              <FontAwesomeIcon
                                icon={faFire}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Power_backup" && (
                              <FontAwesomeIcon
                                icon={faPowerOff}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "CCTV" && (
                              <FontAwesomeIcon
                                icon={faCamera}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Fire-Extinguisher" && (
                              <FontAwesomeIcon
                                icon={faFire}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Elevator" && (
                              <FontAwesomeIcon
                                icon={faElevator}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity === "Card-payment" && (
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                className={styles["fonticon"]}
                              />
                            )}
                            {amenity !== "Free WIFI" &&
                              amenity !== "AC" &&
                              amenity !== "GYM" &&
                              amenity !== "Parking" &&
                              amenity !== "Swimming Pool" &&
                              amenity !== "Kitchen" &&
                              amenity !== "TV" &&
                              amenity !== "Geyser" &&
                              amenity !== "Power_backup" &&
                              amenity !== "CCTV" &&
                              amenity !== "Fire-Extinguisher" &&
                              amenity !== "Elevator" &&
                              amenity !== "Card-payment" && (
                                <>
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className={styles["fonticon"]}
                                  />
                                </>
                              )}
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="_pagination">
            <button
              className={`_pagination-button ${currentPage === 1
                  ? "_pagination-inactive"
                  : "_pagination-active"
                }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {visiblePages.map((page) => (
              <button
                key={page}
                className={`_pagination-button ${page === currentPage
                    ? "_pagination-active"
                    : "_pagination-inactive"
                  }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`_pagination-button ${currentPage === totalPages
                  ? "_pagination-inactive"
                  : "_pagination-active"
                }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelList;