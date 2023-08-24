/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./hotel.module.css";
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
  const [reviewCount, setReviewCount] = useState([]);
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

  //Filter Api
  useEffect(() => {
    const propertyTypeQueryParam = selectedPropertyTypes.join(",");
    const roomtypeQueryParam = roomtype.join(",");
    const starRatingQueryParam = starrating.join(",");
    const bedtypeQueryparam = bedtype.join(",");
    const amenitiesQueryparams = amenity.join(",");

    axios
      .get(
        `https://hotel-backend-tge7.onrender.com/hotels/query/get/by?propertyType=${propertyTypeQueryParam}&roomTypes=${roomtypeQueryParam}&starRating=${starRatingQueryParam}&bedTypes=${bedtypeQueryparam}&amenities=${amenitiesQueryparams}`
      )
      .then((data) => {
        if (data.status === 200) {
          setHotels(data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [selectedPropertyTypes, roomtype, starrating, bedtype, amenity]);

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
            const response = await fetch(
              `https://hotel-backend-tge7.onrender.com/getReviews/${hotel._id}`
            );
            const data = await response.json();

            if (!data || !data.reviews || !Array.isArray(data.reviews)) {
              console.log(`Invalid data structure for hotelId: ${hotel._id}`);
              return { hotelId: hotel._id, count: 0 };
            }

            return { hotelId: hotel._id, count: data.reviews.length };
          } catch (error) {
            console.error(
              `Error fetching data for hotelId ${hotel._id}:`,
              error
            );
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
          <div className={styles.filt_1st}>
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
          <div className={styles.filt_2nd}>
            <h5 className={styles.colle}>Property Type</h5>
            {showall ? (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Apartment", e.target.checked)
                    }
                  />
                  Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Guest house", e.target.checked)
                    }
                  />
                  Guest House
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Holiday home", e.target.checked)
                    }
                  />
                  Holiday Home
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Homestay", e.target.checked)
                    }
                  />
                  Homes Stay
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Hostel", e.target.checked)
                    }
                  />
                  Hostel
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Hotel", e.target.checked)
                    }
                  />
                  Hotel
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange(
                        "Hotel Apartment",
                        e.target.checked
                      )
                    }
                  />
                  Hotel Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Resort", e.target.checked)
                    }
                  />
                  Resort
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Villa", e.target.checked)
                    }
                  />
                  Villa
                </label>
              </>
            ) : (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Apartment", e.target.checked)
                    }
                  />
                  Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Guest house", e.target.checked)
                    }
                  />
                  Guest House
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Holiday home", e.target.checked)
                    }
                  />
                  Holiday Home
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlePropertyTypeChange("Homestay", e.target.checked)
                    }
                  />
                  Homes Stay
                </label>
              </>
            )}
            <button
              className={styles.showless_btn}
              onClick={() => setShowall(!showall)}
            >
              {showall ? "Less" : "More"}
            </button>
          </div>
          <hr />
          <div className={styles.filt_3rd}>
            <h5 className={styles.colle}>Star Rating</h5>
            {showallstar ? (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("1", e.target.checked)}
                  />
                  1 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("2", e.target.checked)}
                  />
                  2 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("3", e.target.checked)}
                  />
                  3 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("4", e.target.checked)}
                  />
                  4 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("5", e.target.checked)}
                  />
                  5 Star
                </label>
              </>
            ) : (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("1", e.target.checked)}
                  />
                  1 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("2", e.target.checked)}
                  />
                  2 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("3", e.target.checked)}
                  />
                  3 Star
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleRatingChange("4", e.target.checked)}
                  />
                  4 Star
                </label>
              </>
            )}
            <button
              className={styles.showless_btn}
              onClick={() => setShowallstar(!showallstar)}
            >
              {showallstar ? "Less" : "More"}
            </button>
          </div>
          <hr />
          <div className={styles.filt_4th}>
            <h5 className={styles.colle}>Room Type</h5>
            {showroomtype ? (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Business Double Room", e.target.checked)
                    }
                  />
                  Business Double Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Deluxe King Room", e.target.checked)
                    }
                  />
                  Deluxe King Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Deluxe One Bed Room Suite",
                        e.target.checked
                      )
                    }
                  />
                  Deluxe One Bed Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Deluxe Room", e.target.checked)
                    }
                  />
                  Deluxe Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Deluxe Twin Room", e.target.checked)
                    }
                  />
                  Deluxe Twin Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Double or Twin", e.target.checked)
                    }
                  />
                  Double or Twin
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Double Room", e.target.checked)
                    }
                  />
                  Double Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Execcutive Studio", e.target.checked)
                    }
                  />
                  Executive Studio
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Executive Suites", e.target.checked)
                    }
                  />
                  Executive Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Executive room", e.target.checked)
                    }
                  />
                  Executive Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Family Room", e.target.checked)
                    }
                  />
                  Family Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Free stay", e.target.checked)
                    }
                  />
                  Free Stay
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Junior Suite", e.target.checked)
                    }
                  />
                  Junior Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("One Bedroom Suite", e.target.checked)
                    }
                  />
                  One Bedroom Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("One-Bedroom Apartment", e.target.checked)
                    }
                  />
                  One Bedroom Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Partition Room", e.target.checked)
                    }
                  />
                  Partition Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Quadruple", e.target.checked)
                    }
                  />
                  Quadrupel
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Royal Two Bedroom Suit", e.target.checked)
                    }
                  />
                  Royal Two Bedroom Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Single Room", e.target.checked)
                    }
                  />
                  Single Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Six Bed", e.target.checked)
                    }
                  />
                  Six Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Small Private Patition Room",
                        e.target.checked
                      )
                    }
                  />
                  Small Private Partition Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Standard One-Bedroom Apartment",
                        e.target.checked
                      )
                    }
                  />
                  Standard One Bedroom Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Standard Studio with King Bed",
                        e.target.checked
                      )
                    }
                  />
                  Standard Studio With King Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Standard Studio with Twin beds",
                        e.target.checked
                      )
                    }
                  />
                  Standard Studio with Twin Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Standard Three-Bedroom Apartment",
                        e.target.checked
                      )
                    }
                  />
                  Standard Three Bedroom Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Standard Two-Bedroom Apartment",
                        e.target.checked
                      )
                    }
                  />
                  Standard Two Bedroom Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Standard room", e.target.checked)
                    }
                  />
                  Standard Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Standard King Room", e.target.checked)
                    }
                  />
                  Standard King Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Studio Apartment", e.target.checked)
                    }
                  />
                  Studio Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Studio Deluxe", e.target.checked)
                    }
                  />
                  Studio Deluxe
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleroomtype("Suite", e.target.checked)}
                  />
                  Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Suite Standard", e.target.checked)
                    }
                  />
                  Suite Standard
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Superior", e.target.checked)
                    }
                  />
                  Superior
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Superior King Room", e.target.checked)
                    }
                  />
                  Superior King Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Superior Room", e.target.checked)
                    }
                  />
                  Superior Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Superior Twin Room", e.target.checked)
                    }
                  />
                  Superior Twin Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Three Bedroom Apartment",
                        e.target.checked
                      )
                    }
                  />
                  Three Bedroom Apartment
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleroomtype("Triple", e.target.checked)}
                  />
                  Triple
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleroomtype("Twin", e.target.checked)}
                  />
                  Twin
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Two Bedroom Suite", e.target.checked)
                    }
                  />
                  Two Bedroom Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Two-Bedroom Apartment", e.target.checked)
                    }
                  />
                  Two Bedroom Apartment
                </label>
              </>
            ) : (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Business Double Room", e.target.checked)
                    }
                  />
                  Business Double Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Deluxe King Room", e.target.checked)
                    }
                  />
                  Deluxe King Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype(
                        "Deluxe One Bed Room Suite",
                        e.target.checked
                      )
                    }
                  />
                  Deluxe One Bed Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleroomtype("Deluxe Room", e.target.checked)
                    }
                  />
                  Deluxe Room
                </label>
              </>
            )}
            <button
              className={styles.showless_btn}
              onClick={() => setShowroomtype(!showroomtype)}
            >
              {showroomtype ? "Less" : "More"}
            </button>
          </div>
          <hr />
          <div className={styles.filt_5th}>
            <h5 className={styles.colle}>Bed Types</h5>
            {showbedtype ? (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("Bunk Bed", e.target.value)}
                  />
                  Bunk Bed
                </label>{" "}
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("Daybed", e.target.value)}
                  />
                  DayBed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("King Size", e.target.value)}
                  />
                  King Size
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("King bed or Queen bed", e.target.value)
                    }
                  />
                  King Bed Or Queen Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("King or Twin", e.target.value)
                    }
                  />
                  King or Twin
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("King size + Queen bed", e.target.value)
                    }
                  />
                  King Size + Queen Size
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("King+Twin", e.target.value)}
                  />
                  King+Twin
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("Murphy bed", e.target.value)
                    }
                  />
                  Murphy Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("Queen Size", e.target.value)
                    }
                  />
                  Queen Size
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("Single Bed", e.target.value)
                    }
                  />
                  Single Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("Trundle bed", e.target.value)
                    }
                  />
                  Trundle Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("Twin+King+Queen", e.target.value)
                    }
                  />
                  Twin+King+Queen
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("Twin Bed", e.target.value)}
                  />
                  Twin Bed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype(
                        "Twin bed or Kingbed or Queen bed",
                        e.target.value
                      )
                    }
                  />
                  King Bed or Queen Bed or Twin Bed
                </label>
              </>
            ) : (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("Bunk Bed", e.target.value)}
                  />
                  Bunk Bed
                </label>{" "}
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("Daybed", e.target.value)}
                  />
                  DayBed
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handlebedtype("King Size", e.target.value)}
                  />
                  King Size
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handlebedtype("King bed or Queen bed", e.target.value)
                    }
                  />
                  King Bed Or Queen Bed
                </label>
              </>
            )}
            <button
              className={styles.showless_btn}
              onClick={() => setShowbedtype(!showbedtype)}
            >
              {showbedtype ? "Less" : "More"}
            </button>
          </div>
          <hr />
          <div className={styles.filt_6th}>
            <h5 className={styles.colle}>Amenities</h5>
            {showamenities ? (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity(
                        "24-hour front desk service",
                        e.target.value
                      )
                    }
                  />
                  24-hour Front Desk Service
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("ATM on site", e.target.value)
                    }
                  />
                  ATM on Site
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Air Conditioning", e.target.value)
                    }
                  />
                  Air Conditioning
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Airport shuttle(free)", e.target.value)
                    }
                  />
                  Airport Shuttle (Free)
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("", e.target.value)}
                  />
                  Airport Shuttle Service (Surcharge)
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("BBQ/Picnic area", e.target.value)
                    }
                  />
                  BBQ/picnic area
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Baby sitting", e.target.value)
                    }
                  />
                  Baby sitting
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Baggage Storage", e.target.value)
                    }
                  />
                  Baggage Storage
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Bar", e.target.value)}
                  />
                  Bar
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Bathrobe", e.target.value)}
                  />
                  Bathrobe
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Beach", e.target.value)}
                  />
                  Beach
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Beachfront", e.target.value)
                    }
                  />
                  BeachFront
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Billiard", e.target.value)}
                  />
                  Billiard
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Business center", e.target.value)
                    }
                  />
                  Business Center
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Cable TV", e.target.value)}
                  />
                  Cable TV
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Car rental", e.target.value)
                    }
                  />
                  Car Rental
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Casino", e.target.value)}
                  />
                  Casino
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Clean & Disinfect", e.target.value)
                    }
                  />
                  Clean & Disinfect
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Coffee/Tea", e.target.value)
                    }
                  />
                  Coffee/Tea
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Coffeemaker", e.target.value)
                    }
                  />
                  Coffee Maker
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity(
                        "Complimentart Bottled Water",
                        e.target.value
                      )
                    }
                  />
                  Complimentary Bottled Water
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Complimentary Toiletries", e.target.value)
                    }
                  />
                  Complimentary Toiletries
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Complimentary breakfast", e.target.value)
                    }
                  />
                  Complimentary Breakfast
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Concierge desk", e.target.value)
                    }
                  />
                  Conclerge Desk
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Continental Breakfast", e.target.value)
                    }
                  />
                  Continental Breakfast
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Currency exchange", e.target.value)
                    }
                  />
                  Currency Exchange
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Dinner", e.target.value)}
                  />
                  Dinner
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Dry cleaning", e.target.value)
                    }
                  />
                  Dry Cleaning
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Elevators", e.target.value)}
                  />
                  Elevators
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Executive Suite", e.target.value)
                    }
                  />
                  Executive Suite
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Fishing", e.target.value)}
                  />
                  Fishing
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Fitness Center", e.target.value)
                    }
                  />
                  Fitness Center
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Free Parking", e.target.value)
                    }
                  />
                  Free Parking
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Free Wireless Internet", e.target.value)
                    }
                  />
                  Free Wireless Internet
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Game room", e.target.value)}
                  />
                  Game Room
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Good Showers", e.target.value)
                    }
                  />
                  Good Showers
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity(
                        "Grocery shopping service available",
                        e.target.value
                      )
                    }
                  />
                  Grocery shopping service available
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Hair Dryer", e.target.value)
                    }
                  />
                  Hair Dryer
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Housekeeping", e.target.value)
                    }
                  />
                  House Keeping
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Indoor parking", e.target.value)
                    }
                  />
                  Indoor Parking
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Indoor pool", e.target.value)
                    }
                  />
                  Indoor Pool
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Ironing service", e.target.value)
                    }
                  />
                  Ironing Service
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Jacuzzi(Hot Tub)", e.target.value)
                    }
                  />
                  Jacuzzi (hot tub)
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Kitchen Facility", e.target.value)
                    }
                  />
                  Kitchen Facility
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Laundry", e.target.value)}
                  />
                  Laundary
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Library", e.target.value)}
                  />
                  Library
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Lockers", e.target.value)}
                  />
                  Lockers
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Lunch", e.target.value)}
                  />
                  Lunch
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity(
                        "Meeting/Banquet Facilities",
                        e.target.value
                      )
                    }
                  />
                  Meeting/Banquet Facilities
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Microwave", e.target.value)}
                  />
                  Microwave
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Newspaper", e.target.value)}
                  />
                  Newspaper
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Nightclub/DJ", e.target.value)
                    }
                  />
                  Nightclub/DJ
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Non-smoking rooms", e.target.value)
                    }
                  />
                  Non Smoking Rooms
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("On-site Restaurant", e.target.value)
                    }
                  />
                  On Site Restaurant
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Paid Parking", e.target.value)
                    }
                  />
                  Paid Parking
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Pet-friendly", e.target.value)
                    }
                  />
                  Pet Friendly
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Playground", e.target.value)
                    }
                  />
                  Playground
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Private brach area", e.target.value)
                    }
                  />
                  Private Beach area
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Refrigerator", e.target.value)
                    }
                  />
                  Refrigerator
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Room Service", e.target.value)
                    }
                  />
                  Room Service
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Safe", e.target.value)}
                  />
                  Safe
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("SatelliteTV", e.target.value)
                    }
                  />
                  Satellite Tv
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Shoeshine", e.target.value)}
                  />
                  Shoeshine
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Shops(on site)", e.target.value)
                    }
                  />
                  Shops (on Site)
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Social Distancing", e.target.value)
                    }
                  />
                  Social Distancing
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Souvenir/Gift Shop", e.target.value)
                    }
                  />
                  Gift Shop
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Spa", e.target.value)}
                  />
                  Spa
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Swimming Pool", e.target.value)
                    }
                  />
                  Swimming Pool
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Table tennis", e.target.value)
                    }
                  />
                  Table tennis
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Telephone", e.target.value)}
                  />
                  Telephone
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Television", e.target.value)
                    }
                  />
                  Television
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Tennis court", e.target.value)
                    }
                  />
                  Tennis court
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Tour Desk", e.target.value)}
                  />
                  Tour Desk
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("Towels", e.target.value)}
                  />
                  Towels
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Turkish/Steam Bath", e.target.value)
                    }
                  />
                  Turkish/Steam bath
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Valet Parking", e.target.value)
                    }
                  />
                  valet parking
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Vending Machine(snacks)", e.target.value)
                    }
                  />
                  Vending Machine(snakes)
                </label>
              </>
            ) : (
              <>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity(
                        "24-hour front desk service",
                        e.target.value
                      )
                    }
                  />
                  24-hour Front Desk Service
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("ATM on site", e.target.value)
                    }
                  />
                  ATM on Site
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Air Conditioning", e.target.value)
                    }
                  />
                  Air Conditioning
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Airport shuttle(free)", e.target.value)
                    }
                  />
                  Airport Shuttle (Free)
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) => handleamenity("", e.target.value)}
                  />
                  Airport Shuttle Service (Surcharge)
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("BBQ/Picnic area", e.target.value)
                    }
                  />
                  BBQ/picnic area
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Baby sitting", e.target.value)
                    }
                  />
                  Baby sitting
                </label>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleamenity("Baggage Storage", e.target.value)
                    }
                  />
                  Baggage Storage
                </label>
              </>
            )}

            <button
              className={styles.showless_btn}
              onClick={() => setShowamenities(!showamenities)}
            >
              {showamenities ? "Less" : "More"}
            </button>
          </div>
        </div>

        <div className={styles["search-results"]}>
          {currentData.map((result) => (
            <div
              key={result._id}
              className={`${styles["search-result"]} ${
                expandedResultId === result._id ? styles["expanded"] : ""
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
                <p className={styles["search-result-reviews"]}>
                  {reviewCount.find((review) => review.hotelId === result._id)
                    ?.count || "No"}{" "}
                  Reviews
                </p>

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
              className={`_pagination-button ${
                currentPage === 1
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
                className={`_pagination-button ${
                  page === currentPage
                    ? "_pagination-active"
                    : "_pagination-inactive"
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`_pagination-button ${
                currentPage === totalPages
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
