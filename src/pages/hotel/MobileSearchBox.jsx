import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLocationArrow1, CiSearch } from "react-icons/ci";

const MobileSearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date().toISOString().split("T")[0];

  const [searchData, setSearchData] = useState({
    search: "",
    checkInDate: currentDate,
    checkOutDate: currentDate,
    countRooms: 1,
    guests: 2,
    latitude: "",
    longitude: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const queryString = Object.entries({
      ...searchData,
      latitude: "",
      longitude: "",
    })
      .filter(([key, value]) => value || key === "countRooms" || key === "guests")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    navigate(`/search?${queryString}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchData((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
          navigate(`/search?latitude=${latitude}&longitude=${longitude}`);
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  };

  if (location.pathname !== "/search" && location.pathname !== "/search/hotels") {
    return null;
  }

  return (
    <div
      onKeyDown={handleKeyPress}
      className="mx-4 my-6"
    >
      <div className="flex items-center w-full max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
        {/* Input with icons */}
        <div className="flex items-center flex-1 px-3">
          <CiSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            name="search"
            value={searchData.search}
            onChange={handleInputChange}
            placeholder="Search for a city or hotel..."
            maxLength={50}
            className="flex-1 bg-transparent outline-none px-2 py-2 text-gray-700 text-sm sm:text-base"
          />
          <button
            onClick={getLocation}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <CiLocationArrow1 className="text-lg" />
          </button>
        </div>

        {/* Search Button attached */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-lg flex items-center justify-center transition-colors"
        >
          <CiSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MobileSearchBox;
