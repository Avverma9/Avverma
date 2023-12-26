import React, { useState, useEffect,useRef } from "react";
import styles from "../hotel.module.css";
import RangeSlider from "../Rangeslider/range";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
// import { type } from "@testing-library/user-event/dist/type";

const Sidebar = ({
  minValue,
  set_minValue,
  maxValue,
  set_maxValue,
  setHotels,
  selectedPropertyTypes,
  setSelectedPropertyTypes,
  starrating,
  setStarrating,
  roomtype,
  setRoomtype,
  bedtype,
  setBedtype,
  amenity,
  setAmenity,
  showall,
  setShowall,
  showallstar,
  setShowallstar,
  showroomtype,
  setShowroomtype,
  showbedtype,
  setShowbedtype,
  showamenities,
  setShowamenities,
  handlePropertyTypeChange,
  handleRatingChange,
  handleroomtype,
  handlebedtype,
  handleamenity,
  clearFilters,
  setDataAvailable,
}) => {
  const location = useLocation();
  console.log(location.pathname.slice(8));
  const [city, setCity] = useState("");
  //Filter Api
  const firstRender = useRef(true);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = () => {
      const propertyTypeQueryParam = selectedPropertyTypes.join(',');
      const roomtypeQueryParam = roomtype.join(',');
      const starRatingQueryParam = starrating.join(',');
      const bedtypeQueryparam = bedtype.join(',');
      const amenitiesQueryparams = amenity.join(',');

      const priceFilterUrl = `https://hotel-backend-tge7.onrender.com/hotels/query/get/by?propertyType=${propertyTypeQueryParam}&roomTypes=${roomtypeQueryParam}&starRating=${starRatingQueryParam}&bedTypes=${bedtypeQueryparam}&amenities=${amenitiesQueryparams}`;

      // Add price range parameters if they are set
      if (minValue > 400 || maxValue < 4000) {
        priceFilterUrl += `&minPrice=${minValue}&maxPrice=${maxValue}`;
      }

      axios
        .get(priceFilterUrl)
        .then((data) => {
          if (data.status === 200) {
            setHotels(data.data);
            setDataAvailable(data.data.length > 0);
          } else {
            setHotels([]);
          }
        })
        .catch((error) => console.log(error));
    };

    // Check if it's the first render
    if (firstRender.current) {
      // Make the API call on the first render
      firstRender.current = false;
      fetchData();
    } else {
      // Check if all query parameters are empty
      if (
        selectedPropertyTypes.length === 0 &&
        roomtype.length === 0 &&
        starrating.length === 0 &&
        bedtype.length === 0 &&
        amenity.length === 0
      ) {
        // No need to make the API call if all query parameters are empty
        setHotels([]);
        setDataAvailable(false);
        return;
      }

      // Make the API call with updated parameters
      fetchData();
    }
  }, [
    selectedPropertyTypes,
    roomtype,
    starrating,
    bedtype,
    amenity,
    minValue,
    maxValue,
  ]);
  const queryString = localStorage.getItem("searchQuery");

  useEffect(() => {
    console.log(queryString);
    setHotels([]);
    if (minValue > 400 || maxValue < 4000) {
      axios
        .get(
          `https://hotel-backend-tge7.onrender.com/hotels/price/get/by?minPrice=${minValue}&maxPrice=${maxValue}`
        )
        .then((data) => {
          let hotelData = data.data;
          if (data.status === 200) {
            setHotels(null);
            setHotels(hotelData);
          } else setHotels([]);
        })
        .catch((error) => console.log(error));
    } else if (
      (location.pathname === "/search/results"
       ) &&
      queryString !== (null || undefined || "")
    ) 
     {
      axios
        .get(`https://hotel-backend-tge7.onrender.com/search?${queryString}`)
        .then((data) => {
          let hotelData = data.data;
          if (data.status === 200) {
            setHotels(null);
            setHotels(hotelData);
            console.log(hotelData);
          } else setHotels([]);
        })
        .catch((error) => console.log(error));
    } else if (location.pathname.slice(1, 7) === "cities") {
      setCity(location.pathname.slice(8));
      axios
        .get(
          `https://hotel-backend-tge7.onrender.com/hotels/destination/get/all?city=${city}`
        )
        .then((data) => {
          console.log(data.data);
          let hotelData = data.data;
          if (data.status === 200) {
            setHotels(null);
            setHotels(hotelData);
          } else setHotels([]);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get("https://hotel-backend-tge7.onrender.com/get/all/hotels")
        .then((data) => {
          let hotelData = data.data;
          if (data.status === 200) {
            setHotels(hotelData);
            console.log(hotelData);
          } else setHotels([]);
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
  }, [maxValue, minValue, location.pathname, setHotels, queryString, city]);
  return (
    <div className={`${styles["vertical-bar"]} ${styles["sticky-sidebar"]}`}>
      <div className={styles.filt_1st}>
        <div className={styles.clear_btn_flex}>
          <h3 className="filterhead">Filters</h3>
          <button onClick={clearFilters}>clear</button>
        </div>
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
                  handlePropertyTypeChange("Hotel Apartment", e.target.checked)
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
                onChange={(e) => handleRatingChange("1 star", e.target.checked)}
              />
              1 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("2 star", e.target.checked)}
              />
              2 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("3 star", e.target.checked)}
              />
              3 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("4 star", e.target.checked)}
              />
              4 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("5 star", e.target.checked)}
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
                onChange={(e) => handleRatingChange("1 star", e.target.checked)}
              />
              1 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("2 star", e.target.checked)}
              />
              2 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("3 star", e.target.checked)}
              />
              3 Star
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleRatingChange("4 star", e.target.checked)}
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
                  handleroomtype("Deluxe One Bed Room Suite", e.target.checked)
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
                onChange={(e) => handleroomtype("Free stay", e.target.checked)}
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
                onChange={(e) => handleroomtype("Quadruple", e.target.checked)}
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
                onChange={(e) => handleroomtype("Six Bed", e.target.checked)}
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
                onChange={(e) => handleroomtype("Superior", e.target.checked)}
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
                  handleroomtype("Three Bedroom Apartment", e.target.checked)
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
                onChange={(e) => handlebedtype("DayBed", e.target.value)}
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
                onChange={(e) => handlebedtype("King or Twin", e.target.value)}
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
                onChange={(e) => handlebedtype("Murphy bed", e.target.value)}
              />
              Murphy Bed
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handlebedtype("Queen Size", e.target.value)}
              />
              Queen Size
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handlebedtype("Single Bed", e.target.value)}
              />
              Single Bed
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handlebedtype("Trundle bed", e.target.value)}
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
                  handleamenity("24-hour Front Desk Service", e.target.value)
                }
              />
              24-hour Front Desk Service
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("ATM on Site", e.target.value)}
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
                  handleamenity("Airport Shuttle (Free)", e.target.value)
                }
              />
              Airport Shuttle (Free)
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity(
                    "Airport Shuttle Service (Surcharge)",
                    e.target.value
                  )
                }
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
                onChange={(e) => handleamenity("Baby sitting", e.target.value)}
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
                onChange={(e) => handleamenity("Beachfront", e.target.value)}
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
                  handleamenity("Business Center", e.target.value)
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
                onChange={(e) => handleamenity("Car Rental", e.target.value)}
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
                onChange={(e) => handleamenity("Coffee/Tea", e.target.value)}
              />
              Coffee/Tea
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Coffee Maker", e.target.value)}
              />
              Coffee Maker
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Complimentart Bottled Water", e.target.value)
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
                  handleamenity("Complimentary Breakfast", e.target.value)
                }
              />
              Complimentary Breakfast
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Concierge Desk", e.target.value)
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
                  handleamenity("Currency Exchange", e.target.value)
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
                onChange={(e) => handleamenity("Dry Cleaning", e.target.value)}
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
                onChange={(e) => handleamenity("Free Parking", e.target.value)}
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
                onChange={(e) => handleamenity("Game Room", e.target.value)}
              />
              Game Room
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Good Showers", e.target.value)}
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
                onChange={(e) => handleamenity("Hair Dryer", e.target.value)}
              />
              Hair Dryer
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("House Keeping", e.target.value)}
              />
              House Keeping
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Indoor Parking", e.target.value)
                }
              />
              Indoor Parking
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Indoor Pool", e.target.value)}
              />
              Indoor Pool
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Ironing Service", e.target.value)
                }
              />
              Ironing Service
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Jacuzzi (hot tub)", e.target.value)
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
                onChange={(e) => handleamenity("Laundary", e.target.value)}
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
                  handleamenity("Meeting/Banquet Facilities", e.target.value)
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
                onChange={(e) => handleamenity("Nightclub/DJ", e.target.value)}
              />
              Nightclub/DJ
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Non Smoking Rooms", e.target.value)
                }
              />
              Non Smoking Rooms
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("On Site Restaurant", e.target.value)
                }
              />
              On Site Restaurant
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Paid Parking", e.target.value)}
              />
              Paid Parking
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Pet Friendly", e.target.value)}
              />
              Pet Friendly
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Playground", e.target.value)}
              />
              Playground
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("Private Beach area", e.target.value)
                }
              />
              Private Beach area
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Refrigerator", e.target.value)}
              />
              Refrigerator
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Room Service", e.target.value)}
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
                onChange={(e) => handleamenity("Satellite Tv", e.target.value)}
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
                  handleamenity("Shops (on Site)", e.target.value)
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
                onChange={(e) => handleamenity("Gift Shop", e.target.value)}
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
                onChange={(e) => handleamenity("Swimming Pool", e.target.value)}
              />
              Swimming Pool
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Table tennis", e.target.value)}
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
                onChange={(e) => handleamenity("Television", e.target.value)}
              />
              Television
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Tennis court", e.target.value)}
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
                onChange={(e) => handleamenity("Valet parking", e.target.value)}
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
                  handleamenity("24-hour Front Desk Service", e.target.value)
                }
              />
              24-hour Front Desk Service
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("ATM on Site", e.target.value)}
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
                  handleamenity("Airport Shuttle (Free)", e.target.value)
                }
              />
              Airport Shuttle (Free)
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity(
                    "Airport Shuttle Service (Surcharge)",
                    e.target.value
                  )
                }
              />
              Airport Shuttle Service (Surcharge)
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  handleamenity("BBQ/picnic area", e.target.value)
                }
              />
              BBQ/picnic area
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => handleamenity("Baby sitting", e.target.value)}
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
  );
};

export default Sidebar;
