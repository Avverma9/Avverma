/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BiSolidOffer } from "react-icons/bi";
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

import Imgslide from "./slider/sliderimage";
import Sidebar from "./filtersidebar/Sidebar";

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
  const [dataAvailable, setDataAvailable] = useState(true);

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
    setExpandedResultId((prevResultId) =>
      prevResultId === resultId ? null : resultId
    );
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
        <Sidebar
          minValue={minValue}
          set_minValue={set_minValue}
          maxValue={maxValue}
          set_maxValue={set_maxValue}
          setHotels={setHotels}
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
          setDataAvailable={setDataAvailable}
        />
        {dataAvailable ? (
          <div className={styles["search-results"]}>
            {currentData && currentData.length !== 0
              ? currentData.map((result) => (
                  <div
                    key={result._id}
                    className={`${styles["search-result"]} ${
                      expandedResultId === result._id ? styles["expanded"] : ""
                    }`}
                  >
                    {result.images.length > 0 && ( // Check if images are available
                      <Imgslide resultId={result._id} />
                    )}
                    <div className={styles["search-result-content"]}>
                      <div className={styles["hotel-info"]}>
                        {result.roomDetails.length > 0 && (
                          <div>
                            {result.roomDetails.some(
                              (room) => room.offerDetails !== "N/A"
                            ) ? (
                              <>
                               
                                <p
                                  style={{ color: "red", fontWeight: "bold" }}
                                > <BiSolidOffer /> {" "}
                                  Offer !
                                </p>
                              </>
                            ) : (
                              result.roomDetails.map((room, index) => (
                                <div key={index}>
                                  {room.offerDetails === "N/A" ? null : (
                                    <>
                                      <BiSolidOffer />
                                      <p
                                        style={{
                                          color: "blue",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {room.offerDetails}
                                      </p>
                                    </>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        )}

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
                        {result.starRating}
                        <FontAwesomeIcon
                          icon={faStar}
                          className={styles["fastar"]}
                        />
                      </h5>
                      <p className={styles["search-result-reviews"]}>
                        {reviewCount.find(
                          (review) => review.hotelId === result._id
                        )?.count || "No"}{" "}
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
  <span className={styles["detail"]}>
    per room per night
  </span>
  {result.roomDetails && result.roomDetails.length > 0 ? (() => {
    let regularPrice = null;
    let offerPrice = null;

    result.roomDetails.forEach((room, index) => {
      if (room.originalPrice > room.price && !offerPrice) {
        regularPrice = room.originalPrice;
        offerPrice = room.price;
      }
    });

    if (offerPrice) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faInr}
            className={styles["rupees"]}
          />
          <del>{regularPrice}</del>
          <p
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            Offer Price: {offerPrice}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <FontAwesomeIcon
            icon={faInr}
            className={styles["rupees"]}
          />
          {result.roomDetails[0].price}
        </div>
      );
    }
  })() : "N/A"}
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
  Local ID: {result.localId ? 'Available' : 'Not available'}
</p>

                      <hr />

                      {expandedResultId === result._id && (
                        <div>
                          <div className={styles["amenities"]}>
                            <h6>More:</h6>
                            <ul>
                              {result.moreOptions.map((more) => (
                                <li key={more}>
                                  {more === "Pet Friendly" && (
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
                                  {amenity === "Free Wireless Internet" && (
                                    <FontAwesomeIcon
                                      icon={faWifi}
                                      className={styles["fonticon"]}
                                    />
                                  )}
                                  {amenity === "Air Conditioning" && (
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
                                  {amenity === "Kitchen Facility" && (
                                    <FontAwesomeIcon
                                      icon={faKitchenSet}
                                      className={styles["fonticon"]}
                                    />
                                  )}
                                  {amenity === "Television" && (
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
                ))
              : "NO DATA FOUND"}
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
        ) : (
          <div className={styles.loading_gif}>
            <img
              src="https://assets-v2.lottiefiles.com/a/1484087e-68bf-11ee-abd7-87c3830dcafb/VkYL5tIdNO.png"
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
}

export default HotelList;
