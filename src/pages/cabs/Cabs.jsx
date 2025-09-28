import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getAllCars } from "../../redux/reducers/car";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../utils/loader";

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 16.5V15a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.5"></path>
    <path d="M2 10h20"></path>
    <path d="M6 11v-1.5a1.5 1.5 0 0 1 3 0V11"></path>
    <path d="M15 11v-1.5a1.5 1.5 0 0 1 3 0V11"></path>
    <path d="M4 19h16"></path>
    <path d="M5 19.5V11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8.5"></path>
  </svg>
);

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
    <circle cx="7" cy="17" r="2"></circle>
    <circle cx="17" cy="17" r="2"></circle>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const FuelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);

const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }) : "N/A";

const formatDateForInput = (dateString) =>
  dateString ? new Date(dateString).toISOString().split("T") : "";

const CabCardMobile = ({ cab }) => {
  const navigate = useNavigate();
  const availableSeats = cab.seater - cab.seatConfig.filter((s) => s.isBooked).length;
  const placeholderImage = `https://placehold.co/600x400/e0e7ff/4338ca?text=${cab.make.replace(" ", "+")}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
      <div className="relative">
        <img
          src={cab.images || placeholderImage}
          alt={`${cab.make} ${cab.model}`}
          className="h-40 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-2 left-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
            {cab.vehicleType}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full shadow-lg ${availableSeats > 0
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
            }`}>
            {availableSeats > 0 ? `${availableSeats} Seats` : "Full"}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-900 truncate">{cab.make} {cab.model}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{cab.year}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <LocationIcon />
          <span className="text-sm font-medium truncate">{cab.pickupP}</span>
          <div className="flex-1 border-t border-dashed border-gray-300"></div>
          <span className="text-sm font-medium truncate">{cab.dropP}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <UsersIcon />
            <span>{cab.sharingType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarIcon />
            <span>{formatDate(cab.pickupD)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FuelIcon />
            <span>{cab.fuelType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <UsersIcon />
            <span>{cab.seater} Seater</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-600">₹{cab.perPersonCost}</span>
            <span className="text-xs text-gray-500">per person</span>
          </div>
          <button
            onClick={() => navigate(`/cab-booking/${cab._id}`)}
            disabled={availableSeats <= 0}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${availableSeats > 0
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {availableSeats > 0 ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CabCardDesktop = ({ cab }) => {
  const navigate = useNavigate();
  const availableSeats = cab.seater - cab.seatConfig.filter((s) => s.isBooked).length;
  const placeholderImage = `https://placehold.co/600x400/e0e7ff/4338ca?text=${cab.make.replace(" ", "+")}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex h-64">
        <div className="relative w-80 flex-shrink-0">
          <img
            src={cab.images || placeholderImage}
            alt={`${cab.make} ${cab.model}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
              {cab.vehicleType}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs font-medium px-3 py-1 rounded-full shadow-lg ${availableSeats > 0
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
              }`}>
              {availableSeats > 0 ? `${availableSeats} Seats Available` : "Fully Booked"}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl text-gray-900">{cab.make} {cab.model}</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">{cab.year}</span>
            </div>

            <div className="flex items-center space-x-3 text-gray-600">
              <LocationIcon />
              <span className="text-base font-medium">{cab.pickupP}</span>
              <div className="flex-1 border-t border-dashed border-gray-300 mx-4"></div>
              <span className="text-base font-medium">{cab.dropP}</span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
                <UsersIcon />
                <span className="font-medium">{cab.sharingType}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
                <CalendarIcon />
                <span className="font-medium text-center">{formatDate(cab.pickupD)}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
                <FuelIcon />
                <span className="font-medium">{cab.fuelType}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-lg">
                <UsersIcon />
                <span className="font-medium">{cab.seater} Seater</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-blue-600">₹{cab.perPersonCost}</span>
              <span className="text-sm text-gray-500">per person</span>
            </div>
            <button
              onClick={() => navigate(`/cab-booking/${cab._id}`)}
              disabled={availableSeats <= 0}
              className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${availableSeats > 0
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {availableSeats > 0 ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const FilterComponent = ({
  filters,
  setFilters,
  makes,
  fuelTypes,
  isOpen,
  onClose,
  priceRange,
  sharingTypes,
  vehicleTypes,
}) => {
  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]:
        type === "number" || type === "range" ? Number(value) : value,
    }));
  };

  const handleSeatsChange = (inc) =>
    setFilters((p) => ({
      ...p,
      seats: Math.max(1, (p.seats || 1) + inc),
    }));

  const resetFilters = () =>
    setFilters({
      make: "All",
      fuelType: "All",
      seats: 1,
      price: priceRange.max,
      sharingType: "All",
      vehicleType: "All",
    });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed top-180-inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-full max-w-xs lg:max-w-sm
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:sticky lg:top-[80px] lg:h-fit
          bg-white rounded-none lg:rounded-xl shadow-xl lg:shadow-md
          flex flex-col
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-base font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full lg:hidden"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Price */}
          <div>
            <label className="block font-medium text-gray-800 text-sm mb-1">
              Max Price
            </label>
            <input
              type="range"
              name="price"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹{priceRange.min}</span>
              <span className="font-semibold text-blue-600">
                ₹{filters.price}
              </span>
              <span>₹{priceRange.max}</span>
            </div>
          </div>

          {/* Seats */}
          <div>
            <label className="block font-medium text-gray-800 text-sm mb-1">
              Seats Required
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => handleSeatsChange(-1)}
                disabled={filters.seats <= 1}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                −
              </button>
              <div className="flex-1 text-center py-1 font-semibold text-gray-800 border-x border-gray-300">
                {filters.seats}
              </div>
              <button
                onClick={() => handleSeatsChange(1)}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Car Brand */}
          <div>
            <label className="block font-medium text-gray-800 text-sm mb-1">
              Car Brand
            </label>
            <select
              name="make"
              value={filters.make}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Brands</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type - Dropdown */}
          <div>
            <label className="block font-medium text-gray-800 text-sm mb-1">
              Fuel Type
            </label>
            <select
              name="fuelType"
              value={filters.fuelType}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>

          {/* Sharing Type - Dropdown */}
          <div>
            <label className="block font-medium text-gray-800 text-sm mb-1">
              Sharing Type
            </label>
            <select
              name="sharingType"
              value={filters.sharingType}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Types</option>
              {sharingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Type - Dropdown */}
          <div>
            <label className="block font-medium text-gray-800 text-sm mb-1">
              Vehicle Type
            </label>
            <select
              name="vehicleType"
              value={filters.vehicleType}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All Types</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-60 bg-white border-t border-gray-200 p-3">
          <div className="flex space-x-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-2 text-blue-600 border border-blue-600 rounded-md font-medium hover:bg-blue-50 text-sm"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium hover:from-blue-700 hover:to-purple-700 text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


const SearchModal = ({ isOpen, onClose, searchParams, handleSearchChange, handleSearchSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Search Your Ride</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="relative">
            <LocationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="from"
              placeholder="Pick-up location"
              value={searchParams.from}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          <div className="relative">
            <LocationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="to"
              placeholder="Drop-off location"
              value={searchParams.to}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="pickupDate"
                value={searchParams.pickupDate}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="dropDate"
                value={searchParams.dropDate}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSearchSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm"
        >
          Search Rides
        </button>
      </div>
    </div>
  );
};

const NoResults = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
    <div className="bg-gray-100 rounded-full p-6 sm:p-8 mb-4 sm:mb-6">
      <CarIcon />
    </div>
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Rides Found</h2>
    <p className="text-gray-500 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
      We couldn't find any rides matching your criteria. Try adjusting your search or filters to see more options.
    </p>
    <button
      className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
      onClick={() => window.location.reload()}
    >
      Clear Filters
    </button>
  </div>
);


const SkeletonCard = ({ isDesktop = false }) => (
  <div
    className={`animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
      isDesktop ? "flex h-64" : ""
    }`}
  >
    {isDesktop ? (
      <>
        <div className="w-80 bg-gray-200 flex-shrink-0"></div>
        <div className="flex-1 p-6 space-y-4">
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="h-40 bg-gray-200"></div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </>
    )}
  </div>
);
export default function CarsPage() {
  const [cabs, setCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price-asc");
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    pickupDate: "",
    dropDate: ""
  });
  const [tempSearchParams, setTempSearchParams] = useState(searchParams);

  const { makes, fuelTypes, priceRange, sharingTypes, vehicleTypes } = useMemo(() => {
    const prices = cabs.map((c) => c.perPersonCost).filter((p) => p != null);
    return {
      makes: [...new Set(cabs.map((cab) => cab.make))],
      fuelTypes: [...new Set(cabs.map((cab) => cab.fuelType))],
      sharingTypes: ["Shared", "Private"],
      vehicleTypes: ["Car", "Bus", "Bike"],
      priceRange: { min: Math.min(...prices, 0), max: Math.max(...prices, 3000) },
    };
  }, [cabs]);

  const [filters, setFilters] = useState({
    make: "All",
    fuelType: "All",
    seats: 1,
    price: priceRange.max,
    sharingType: "All",
    vehicleType: "All"
  });

  useEffect(() => {
    setFilters((p) => ({ ...p, price: priceRange.max }));
  }, [priceRange.max]);

  useEffect(() => {
    setIsLoading(true);
    showLoader();
    const timer = setTimeout(() => {
      let result = [...cabs];

      if (searchParams.from)
        result = result.filter((c) =>
          c.pickupP.toLowerCase().includes(searchParams.from.toLowerCase())
        );
      if (searchParams.to)
        result = result.filter((c) =>
          c.dropP.toLowerCase().includes(searchParams.to.toLowerCase())
        );
      if (searchParams.pickupDate)
        result = result.filter((c) =>
          formatDateForInput(c.pickupD) >= searchParams.pickupDate
        );
      if (searchParams.dropDate)
        result = result.filter((c) =>
          formatDateForInput(c.dropD) <= searchParams.dropDate
        );

      if (filters.make !== "All")
        result = result.filter((c) => c.make === filters.make);
      if (filters.fuelType !== "All")
        result = result.filter((c) => c.fuelType === filters.fuelType);
      if (filters.sharingType !== "All")
        result = result.filter((c) => c.sharingType === filters.sharingType);
      if (filters.vehicleType !== "All")
        result = result.filter((c) => c.vehicleType === filters.vehicleType);

      result = result.filter((c) =>
        c.seatConfig.filter((s) => !s.isBooked).length >= filters.seats
      );
      result = result.filter((c) => c.perPersonCost <= filters.price);

      result.sort((a, b) =>
        sortBy === "price-asc" ? a.perPersonCost - b.perPersonCost :
          sortBy === "price-desc" ? b.perPersonCost - a.perPersonCost :
            b.year - a.year
      );

      setFilteredCabs(result);
      setIsLoading(false);
      hideLoader();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParams, filters, cabs, sortBy]);

  const handleTempSearchChange = (e) =>
    setTempSearchParams((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSearchSubmit = () => {
    setSearchParams(tempSearchParams);
    setSearchModalOpen(false);
  };

  const openSearchModal = () => {
    setTempSearchParams(searchParams);
    setSearchModalOpen(true);
  };

  const getSearchSummary = () => {
    const { from, to, pickupDate } = searchParams;
    if (!from && !to && !pickupDate) return "Search for your next ride...";
    return [
      from,
      to && `→ ${to}`,
      pickupDate && formatDate(pickupDate)
    ].filter(Boolean).join(" ");
  };

  useEffect(() => {
    (async () => {
      try {
      
      
        const res = await dispatch(getAllCars());
        setCabs(res.payload || []);
      
      } catch (err) {
        console.error("Fetch failed", err);
      }
    })();
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-3 sm:px-4 py-3 sm:py-4 shadow-lg">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink">
            <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl flex-shrink-0">
              <LogoIcon />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">HRS Cabs</h1>
              <p className="text-blue-100 text-xs sm:text-sm truncate">Find your perfect ride</p>
            </div>
          </div>

          <div
            onClick={openSearchModal}
            className="hidden lg:flex items-center space-x-3 cursor-pointer bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/20 max-w-sm"
          >
            <SearchIcon />
            <span className="text-sm font-medium truncate">
              {getSearchSummary()}
            </span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              makes={makes}
              fuelTypes={fuelTypes}
              isOpen={true}
              onClose={() => { }}
              priceRange={priceRange}
              sharingTypes={sharingTypes}
              vehicleTypes={vehicleTypes}
            />
          </div>
          {isMobileFilterOpen && (
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              makes={makes}
              fuelTypes={fuelTypes}
              isOpen={isMobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              priceRange={priceRange}
              sharingTypes={sharingTypes}
              vehicleTypes={vehicleTypes}
            />
          )}

          <main className="lg:col-span-9 min-w-0 p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={openSearchModal}
                className="flex lg:hidden items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl cursor-pointer hover:border-blue-300 transition-colors bg-white shadow-sm flex-1 min-w-0"
              >
                <SearchIcon />
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                  {getSearchSummary()}
                </span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 sm:p-3 text-xs sm:text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors flex-shrink-0"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Newest First</option>
              </select>
            </div>

            <div className="space-y-4 lg:space-y-6 pb-24 lg:pb-0 min-h-[50vh]">
              {isLoading ? (
                <>
                  <div className="lg:hidden grid grid-cols-1 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                  <div className="hidden lg:block space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} isDesktop={true} />)}
                  </div>
                </>
              ) : filteredCabs.length ? (
                <>
                  <div className="lg:hidden grid grid-cols-1 gap-4">
                    {filteredCabs.map((cab) => <CabCardMobile key={cab._id} cab={cab} />)}
                  </div>
                  <div className="hidden lg:block space-y-6">
                    {filteredCabs.map((cab) => <CabCardDesktop key={cab._id} cab={cab} />)}
                  </div>
                </>
              ) : (
                <NoResults />
              )}
            </div>
          </main>
        </div>
      </div>

      <button
        onClick={() => setMobileFilterOpen(true)}
        className="
          fixed bottom-[100px] left-4 lg:hidden z-40
          bg-gradient-to-r from-blue-600 to-purple-600 text-white 
          px-4 py-3 rounded-full shadow-xl 
          flex items-center space-x-2 
          hover:from-blue-700 hover:to-purple-700 
          transition-all transform hover:scale-105
          text-sm font-medium
        "
      >
        <FilterIcon />
        <span>Filters</span>
      </button>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        searchParams={tempSearchParams}
        handleSearchChange={handleTempSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* Bottom Navigation Space */}
      <div className="h-20 lg:hidden"></div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          border: 2px solid white;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }

        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: #e5e7eb;
        }

        .slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}