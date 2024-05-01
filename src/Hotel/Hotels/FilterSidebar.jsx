/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./FilterSidebar.css";
const FilterSidebar = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  // State variables for checkboxes
  const [amenities, setAmenities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);

  const [starRating, setStarRating] = useState([]);

  const location = useLocation();
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(parseInt(value, 10));
    } else if (name === "maxPrice") {
      setMaxPrice(parseInt(value, 10));
    }
  };

  const filterByAll = () => {
    const filterQuery =
      `?minPrice=${minPrice}&maxPrice=${maxPrice}` +
      `&amenities=${amenities.join(",")}` +
      `&propertyType=${propertyType.join(",")}` +
      `&roomTypes=${roomTypes.join(",")}` +
      `&bedTypes=${bedTypes.join(",")}` +
      `&starRating=${starRating}`;

    const newPath = `/search/hotels${filterQuery}`;
    navigate(newPath);
  };

  // This useEffect ensures that the navigation only happens after the component is rendered
  useEffect(() => {
    // Append the filter parameters to the browser history without reloading the page
    window.history.pushState({}, "", window.location.href);
  }, []);

  const paths = ["/search", "/search/hotels"];

  if (!paths.includes(location.pathname)) {
    return null;
  }
  const handleAmenityChange = (selectedAmenity) => {
    if (amenities.includes(selectedAmenity)) {
      setAmenities(amenities.filter((amenity) => amenity !== selectedAmenity));
    } else {
      setAmenities([...amenities, selectedAmenity]);
    }
  };

  const handleRoomTypeChange = (selectedRoomType) => {
    if (roomTypes.includes(selectedRoomType)) {
      setRoomTypes(roomTypes.filter((type) => type !== selectedRoomType));
    } else {
      setRoomTypes([...roomTypes, selectedRoomType]);
    }
  };

  const handlePropertyTypeChange = (selectedPropertyType) => {
    if (propertyType.includes(selectedPropertyType)) {
      setPropertyType(
        propertyType.filter((type) => type !== selectedPropertyType)
      );
    } else {
      setPropertyType([...propertyType, selectedPropertyType]);
    }
  };

  const handleBedTypeChange = (selectedBedType) => {
    if (bedTypes.includes(selectedBedType)) {
      setBedTypes(bedTypes.filter((type) => type !== selectedBedType));
    } else {
      setBedTypes([...bedTypes, selectedBedType]);
    }
  };
  const handleStarRatingChange = (selectedRating) => {
    if (starRating.includes(selectedRating)) {
      // If the rating is already selected, remove it
      setStarRating(starRating.filter((rating) => rating !== selectedRating));
    } else {
      // If the rating is not selected, add it
      setStarRating([...starRating, selectedRating]);
    }
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setAmenities([]);
    setRoomTypes([]);
    setPropertyType([]);
    setBedTypes([]);
    setStarRating([]);
    // Remove query parameters from the URL
    const currentPath = window.location.pathname;
    navigate(currentPath);
  };
  const closeSidebar = () => {
    const offcanvasElement = document.getElementById(
      "offcanvasWithBothOptions"
    );
    if (offcanvasElement) {
      offcanvasElement.classList.remove("show");

      // Remove the offcanvas-backdrop manually
      const backdropElement = document.querySelector(".offcanvas-backdrop");
      if (backdropElement) {
        backdropElement.remove();
      }
    }
  };

  const handleSwitchChange = () => {
    filterByAll();
    closeSidebar();
  };

  return (
    <div>
      <button
        className="btn btn-outlined"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        Filter <FilterListIcon />
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <Stack direction="row" spacing={2}>
            <Button onClick={clearFilters} variant="outlined">
              Clear Filters
            </Button>
            <Button onClick={handleSwitchChange} variant="outlined">
              Apply Filters
            </Button>
          </Stack>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
        <div className="mb-3">
  <label>Filter by Price:</label>
  <div className="d-flex">
    <RangeSlider
      value={minPrice}
      onChange={(e) =>
        handlePriceChange({
          target: { name: "minPrice", value: e.target.value },
        })
      }
      step={1}
      min={0}
      max={5000}
      style={{ marginRight: "50px" }} // Add margin-right here
    />

    <RangeSlider
      value={maxPrice}
      onChange={(e) =>
        handlePriceChange({
          target: { name: "maxPrice", value: e.target.value },
        })
      }
      step={1}
      min={0}
      max={10000}
    />
  </div>
</div>

          <hr />
          <div className="mb-3">
            <label>Filter by Amenities:</label>
            {[
              "Atm",
              "Air Conditioning",
              "Pool",
              "Fitness Center",
              "Parking",
              "Spa",
              "Pet Friendly",
              "Laundry Service",
              "Business Center",
              "Shuttle Service",
              "24-Hour Front Desk",
              "Gym",
              "Lounge Area",
              "Free Wi-Fi",
              "TV",
              "Coffee Maker",
              "Balcony",
              "Room Service",
              "Ensuite Bathroom",
              "Telephone",
              "Daily Housekeeping",
              "Hair Dryer",
              "Mini Fridge",
              "Microwave",
              "Desk",
              "Wake-up Service",
              "Non-Smoking Rooms",
              "Family Rooms",
              "Elevator",
              "Valet Parking",
              "Currency Exchange",
              "ATM on Site",
              "Ticket Service",
              "Garden",
              "Picnic Area",
              "Bar",
              "Wine/Champagne",
              "Bottle of Water",
              "Kid Meals",
              "Breakfast in the Room",
              "Kitchen",
            ].map((amenity) => (
              <div key={amenity} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`amenity${amenity}`}
                  checked={amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`amenity${amenity}`}
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>{" "}
          <hr />
          <div className="mb-3">
            <label>Filter by Property Type:</label>
            {["House", "Apartment", "Resort", "Villa", "Guest House"].map(
              (availablePropertyType) => (
                <div key={availablePropertyType} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`propertyType${availablePropertyType}`}
                    checked={propertyType.includes(availablePropertyType)}
                    onChange={() =>
                      handlePropertyTypeChange(availablePropertyType)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`propertyType${availablePropertyType}`}
                  >
                    {availablePropertyType}
                  </label>
                </div>
              )
            )}
            <hr />
          </div>
          <div className="mb-3">
            <label>Filter by Room Type:</label>
            {["Standard Room", "Deluxe Room" /* ... add more room types */].map(
              (roomType) => (
                <div key={roomType} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`roomType${roomType}`}
                    checked={roomTypes.includes(roomType)}
                    onChange={() => handleRoomTypeChange(roomType)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`roomType${roomType}`}
                  >
                    {roomType}
                  </label>
                </div>
              )
            )}
          </div>
          <hr />
          <div className="mb-3">
            <label>Filter by Bed Type:</label>
            {["Single", "Bunk" /* ... add more bed types */].map((bedType) => (
              <div key={bedType} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`bedType${bedType}`}
                  checked={bedTypes.includes(bedType)}
                  onChange={() => handleBedTypeChange(bedType)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`bedType${bedType}`}
                >
                  {bedType}
                </label>
              </div>
            ))}
          </div>
          <hr />
          <div className="mb-3">
            <label>Filter by Star Rating:</label>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`rating${rating}`}
                  checked={starRating.includes(rating)}
                  onChange={() => handleStarRatingChange(rating)}
                />
                <label className="form-check-label" htmlFor={`rating${rating}`}>
                  {rating}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
