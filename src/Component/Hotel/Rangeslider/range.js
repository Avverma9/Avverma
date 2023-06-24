import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./range.css";
import { useNavigate } from "react-router-dom";

function RangeSlider() {
  const [minValue, set_minValue] = useState(400);
  const [maxValue, set_maxValue] = useState(4000);
  const [hotellist, setHotellist] = useState([]);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/hotels/price/get/by?minPrice=${minValue}&maxPrice=${maxValue}`
    )
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
        setHotellist(res);
      })
      .catch((error) => console.log(error));
  }, [minValue, maxValue]);

  return (
    <div className="range">
      <MultiRangeSlider
        min={400}
        max={4000}
        step={100}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
          handleInput(e);
        }}
      />
      <ul>
        {hotellist.map((hotel) => (
          <li key={hotel.id}>{hotel.hotelName}</li>
        ))}
      </ul>
    </div>
  );
}

export default RangeSlider;
