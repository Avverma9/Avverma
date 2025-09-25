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
    // Omitting lat/long when doing a text search
    const { latitude, longitude, ...restOfData } = searchData;
    const queryString = Object.entries(restOfData)
      .filter(([key, value]) => value || key === "countRooms" || key === "guests")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    if (queryString) {
      navigate(`/search?${queryString}`);
    }
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
          // You might want to update state here as well if needed elsewhere
          setSearchData((prev) => ({
            ...prev,
            latitude,
            longitude,
            search: "", // Clear search text when using location
          }));
          navigate(`/search?latitude=${latitude}&longitude=${longitude}`);
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  if (location.pathname !== "/search" && location.pathname !== "/search/hotels") {
    return null;
  }

  return (
    // Use responsive margins for better spacing on all screens
    <div onKeyDown={handleKeyPress} className="mx-2 my-4 sm:mx-4 sm:my-6">
      <div className="flex items-center w-full max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
        
        {/* Input container with responsive padding */}
        <div className="flex items-center flex-1 pl-2 pr-1 sm:pl-4 sm:pr-2">
          <CiSearch className="text-gray-500 text-xl mx-1" />
          <input
            type="text"
            name="search"
            value={searchData.search}
            onChange={handleInputChange}
            // Shortened placeholder for small screens
            placeholder="City or hotel..."
            maxLength={50}
            // Consistent height and responsive text size
            className="w-full h-12 bg-transparent outline-none px-2 text-gray-800 text-sm sm:text-base placeholder:text-gray-500"
          />
          <button
            onClick={getLocation}
            aria-label="Search by current location"
            // Larger, rounder click area for the location icon
            className="p-2 text-gray-600 rounded-full hover:bg-gray-100 hover:text-blue-600 transition-all"
          >
            <CiLocationArrow1 className="text-xl" />
          </button>
        </div>

        {/* Search Button that adapts to screen size */}
        <button
          onClick={handleSearch}
          aria-label="Search"
          // Consistent height and responsive padding
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-4 sm:px-5 flex items-center justify-center font-semibold transition-colors"
        >
          {/* Show icon only on small screens */}
          <CiSearch className="text-2xl sm:hidden" />
          {/* Show text only on larger screens */}
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  );
};

export default MobileSearchBox;