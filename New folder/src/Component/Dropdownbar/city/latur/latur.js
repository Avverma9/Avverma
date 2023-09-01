import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  faHotel,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import RangeSlider from "../Rangeslider/range";
import Imgslide from "../slider/sliderimage";
import Sidebar from "../../../Hotel/filtersidebar/Sidebar";

function Latur() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]); // list of hotels initially when page loaded
  const [expandedResultId, setExpandedResultId] = useState(null);
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
        .get("https://hotel-backend-tge7.onrender.com/hotels?destination=Latur")
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
  if (hotels.length === 0) {
    return <div>NO DATA FOUND</div>;
  }

  return (
    <>
      <div className="whole-data" style={{ display: "flex" }}>
        {/* <div className="vertical-bar" style={{flex:"0 0 25%"}}> */}
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
        />
        {/* </div> */}

        <div className="search-results" style={{ flex: "0 0 70%" }}>
          {hotels.map((result) => (
            <div
              key={result._id}
              className={`search-result ${
                expandedResultId === result._id ? "expanded" : ""
              }`}
            >
              <Imgslide />

              <div className="search-result-content">
                <div className="hotel-info00">
                  <h3 className="search-result-title">{result.hotelName}</h3>
                  <p className="search-result-destination">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="location"
                    />
                    {result.destination}
                  </p>
                </div>
                <h5 className="hotel-rating">
                  {result.rating}
                  <FontAwesomeIcon icon={faStar} className="fastar" />
                </h5>

                <div className="amenities">
                  <ul>
                    {result.amenities.slice(0, 3).map((amenity) => (
                      <li key={amenity}>
                        {amenity === "Free WIFI" && (
                          <FontAwesomeIcon icon={faWifi} className="fonticon" />
                        )}
                        {amenity === "AC" && (
                          <FontAwesomeIcon
                            icon={faSnowflake}
                            className="fonticon"
                          />
                        )}
                        {amenity === "GYM" && (
                          <FontAwesomeIcon
                            icon={faDumbbell}
                            className="fonticon"
                          />
                        )}
                        {amenity === "Parking" && (
                          <FontAwesomeIcon
                            icon={faParking}
                            className="fonticon"
                          />
                        )}
                        {amenity === "Swimming Pool" && (
                          <FontAwesomeIcon
                            icon={faSwimmingPool}
                            className="fonticon"
                          />
                        )}
                        {amenity === "Kitchen" && (
                          <FontAwesomeIcon
                            icon={faKitchenSet}
                            className="fonticon"
                          />
                        )}
                        {amenity === "TV" && (
                          <FontAwesomeIcon icon={faTv} className="fonticon" />
                        )}
                        {amenity === "Geyser" && (
                          <FontAwesomeIcon icon={faFire} className="fonticon" />
                        )}
                        {amenity === "Power_backup" && (
                          <FontAwesomeIcon
                            icon={faPowerOff}
                            className="fonticon"
                          />
                        )}
                        {amenity === "CCTV" && (
                          <FontAwesomeIcon
                            icon={faCamera}
                            className="fonticon"
                          />
                        )}
                        {amenity === "Fire-Extinguisher" && (
                          <FontAwesomeIcon icon={faFire} className="fonticon" />
                        )}
                        {amenity === "Elevator" && (
                          <FontAwesomeIcon
                            icon={faElevator}
                            className="fonticon"
                          />
                        )}
                        {amenity === "Card-payment" && (
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            className="fonticon"
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
                                className="fonticon"
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
                    marginTop: "60px",
                  }}
                >
                  <div className="rupeedetail">
                    <p className="search-result-price">
                      <FontAwesomeIcon icon={faInr} className="rupees" />{" "}
                      {result.price}
                      <span className="detail">per room per night</span>
                    </p>
                  </div>
                  <div
                    className="flex-button"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15%",
                      width: "46%",
                    }}
                  >
                    <button
                      className="view-details-button"
                      onClick={() => toggleDetails(result._id)}
                    >
                      View Details
                    </button>
                    <button
                      className="book-now-button"
                      onClick={() => handleBuy(result._id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <p className="search-result-availability">
                  Local ID: {result.availability}
                </p>
                <hr />

                {expandedResultId === result._id && (
                  <div>
                    <div className="amenities">
                      <h6>More:</h6>
                      <ul>
                        {result.moreOptions.map((more) => (
                          <li key={more}>
                            {more === "Pets Allowed" && (
                              <FontAwesomeIcon
                                icon={faPaw}
                                className="fonticon"
                              />
                            )}
                            {more === "Alcohol Allowed" && (
                              <FontAwesomeIcon
                                icon={faGlassMartini}
                                className="fonticon"
                              />
                            )}
                            {more === "Smoking Allowed" && (
                              <FontAwesomeIcon
                                icon={faSmoking}
                                className="fonticon"
                              />
                            )}
                            {more}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr />

                    <div className="amenities">
                      <h6>Amenities:</h6>
                      <ul>
                        {result.amenities.map((amenity) => (
                          <li key={amenity}>
                            {amenity === "Free WIFI" && (
                              <FontAwesomeIcon
                                icon={faWifi}
                                className="fonticon"
                              />
                            )}
                            {amenity === "AC" && (
                              <FontAwesomeIcon
                                icon={faSnowflake}
                                className="fonticon"
                              />
                            )}
                            {amenity === "GYM" && (
                              <FontAwesomeIcon
                                icon={faDumbbell}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Parking" && (
                              <FontAwesomeIcon
                                icon={faParking}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Swimming Pool" && (
                              <FontAwesomeIcon
                                icon={faSwimmingPool}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Kitchen" && (
                              <FontAwesomeIcon
                                icon={faKitchenSet}
                                className="fonticon"
                              />
                            )}
                            {amenity === "TV" && (
                              <FontAwesomeIcon
                                icon={faTv}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Geyser" && (
                              <FontAwesomeIcon
                                icon={faFire}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Power_backup" && (
                              <FontAwesomeIcon
                                icon={faPowerOff}
                                className="fonticon"
                              />
                            )}
                            {amenity === "CCTV" && (
                              <FontAwesomeIcon
                                icon={faCamera}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Fire-Extinguisher" && (
                              <FontAwesomeIcon
                                icon={faFire}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Elevator" && (
                              <FontAwesomeIcon
                                icon={faElevator}
                                className="fonticon"
                              />
                            )}
                            {amenity === "Card-payment" && (
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                className="fonticon"
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
                                    className="fonticon"
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
        </div>
      </div>
    </>
  );
}

export default Latur;
