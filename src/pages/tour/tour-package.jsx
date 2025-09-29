import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTravelList } from "../../redux/reducers/travelSlice";
import { useLoader } from "../../utils/loader";
import NotFoundPage from "../../utils/Not-found";
import Slider from "react-slider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortIcon from '@mui/icons-material/Sort';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CategoryIcon from '@mui/icons-material/Category';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FaRupeeSign } from "react-icons/fa";

export default function TourPackages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.travel);

  const [loading, setLoading] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(164990);
  const [sortByOrder, setSortByOrder] = useState("asc");
  const [minNights, setMinNights] = useState(2);
  const [maxNights, setMaxNights] = useState(9);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handlePriceChange = useCallback((value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, []);

  const handleNightsChange = useCallback((value) => {
    setMinNights(value[0]);
    setMaxNights(value[1]);
  }, []);

  const handleThemeChange = (event) => {
    const theme = event.target.value;
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  const { showLoader, hideLoader } = useLoader();

  const handleApplyFilters = useCallback(() => {
    setIsMobileDrawerOpen(false);
    setLoading(true);
    showLoader();
    const filterParams = {
      minPrice,
      maxPrice,
      sortByOrder,
      minNights,
      maxNights,
      themes: selectedThemes,
    };
    dispatch(getTravelList(filterParams)).finally(() => {
      setLoading(false);
      hideLoader();
    });
  }, [
    dispatch,
    showLoader,
    hideLoader,
    minPrice,
    maxPrice,
    sortByOrder,
    minNights,
    maxNights,
    selectedThemes,
  ]);

  const handleClearFilters = useCallback(() => {
    setMinPrice(500);
    setMaxPrice(164990);
    setSortByOrder("asc");
    setMinNights(2);
    setMaxNights(9);
    setSelectedThemes([]);
    setIsMobileDrawerOpen(false);
    setLoading(true);
    showLoader();
    dispatch(getTravelList({})).finally(() => {
      setLoading(false);
      hideLoader();
    });
  }, [dispatch, showLoader, hideLoader]);

  useEffect(() => {
    showLoader();
    setLoading(true);
    dispatch(getTravelList({})).finally(() => {
      hideLoader();
      setLoading(false);
    });
  }, [dispatch]);

  const handleBooking = useCallback(
    (id) => {
      navigate(`/travellers/booking/${id}`);
    },
    [navigate]
  );

  // Enhanced filter content with better styling
  const filterContent = (
    <div className="grid grid-cols-1 gap-y-3 text-sm">
      <div>
        <label className="block font-semibold text-gray-800 mb-1">Sort & Order</label>
        <div className="relative">
          <select
            value={sortByOrder}
            onChange={(e) => setSortByOrder(e.target.value)}
            className="w-full rounded-md border px-2 py-1.5 text-sm"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <ArrowDropDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1 flex items-center">
          <FaRupeeSign className="w-3.5 h-3.5 mr-1 text-gray-500" />
          Price
        </p>
        <p className="text-center font-semibold text-blue-600 text-xs mb-1">
          ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
        </p>
        <Slider
          min={500}
          max={164990}
          step={500}
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
          className="h-1.5 w-full"
          thumbClassName="h-4 w-4 bg-blue-600 rounded-full cursor-pointer outline-none -top-1.5 border-2 border-white shadow"
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`h-1.5 rounded-full ${state.index === 1
                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                  : "bg-gray-200"
                }`}
            />
          )}
        />
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1 flex items-center">
          <NightsStayIcon className="w-4 h-4 mr-1 text-gray-500" />
          Duration
        </p>
        <p className="text-center text-green-600 text-xs font-semibold mb-1">
          {minNights} - {maxNights} Nights
        </p>
        <Slider
          min={2}
          max={9}
          step={1}
          value={[minNights, maxNights]}
          onChange={handleNightsChange}
          className="h-1.5 w-full"
          thumbClassName="h-4 w-4 bg-green-600 rounded-full cursor-pointer outline-none -top-1.5 border-2 border-white shadow"
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`h-1.5 rounded-full ${state.index === 1
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : "bg-gray-200"
                }`}
            />
          )}
        />
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1 flex items-center">
          <CategoryIcon className="w-4 h-4 mr-1 text-gray-500" /> Category
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Winter", "Summer", "Honeymoon", "Romantic", "Adventure", "Beach"].map(
            (theme) => (
              <label
                key={theme}
                className={`flex cursor-pointer items-center space-x-1.5 p-1.5 rounded-md border text-xs ${selectedThemes.includes(theme)
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white border-gray-200"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedThemes.includes(theme)}
                  onChange={handleThemeChange}
                  value={theme}
                  className="h-3 w-3 text-blue-600"
                />
                <span>{theme}</span>
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pb-24 md:pb-8">
      <div className="mx-auto max-w-screen-xl px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-wrap gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <FilterListIcon className="text-white text-lg" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Smart Filters</h2>
                </div>
                {filterContent}
                <div className="mt-8 flex items-center space-x-3">
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
                  >
                    🔄 Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200"
                  >
                    ✨ Apply
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Hero Section - Compact for Mobile */}
            <div
              className="relative mb-4 sm:mb-8 overflow-hidden rounded-2xl bg-cover bg-center p-4 sm:p-8 text-center text-white shadow-2xl"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop)',
                minHeight: '160px'
              }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
              <div className="relative z-20">
                <h1 className="mb-1 sm:mb-2 text-2xl sm:text-4xl md:text-5xl font-bold">
                  Travel Packages ✈️
                </h1>
                <p className="text-sm sm:text-base text-white/90 md:text-lg">
                  Discover Your Next Great Adventure
                </p>
              </div>
            </div>

            {/* Results Count & Mobile Filter Button */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {loading ? "Loading..." : `${data?.length || 0} Packages Found`}
                </h2>
              </div>
            </div>

            {/* Loading Skeleton - More Compact */}
            {loading ? (
              <div className="flex flex-col gap-3 sm:gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col sm:flex-row animate-pulse rounded-2xl bg-white p-3 sm:p-4 shadow-lg overflow-hidden">
                    <div className="h-40 sm:h-48 sm:w-56 md:w-64 flex-shrink-0 rounded-xl bg-gray-300"></div>
                    <div className="mt-3 sm:mt-0 sm:ml-4 md:ml-6 flex-grow">
                      <div className="h-5 sm:h-7 w-3/4 rounded bg-gray-300 mb-2 sm:mb-4"></div>
                      <div className="h-3 sm:h-4 w-1/2 rounded bg-gray-300 mb-3 sm:mb-5"></div>
                      <div className="flex gap-2">
                        <div className="h-5 sm:h-6 w-16 sm:w-20 rounded-full bg-gray-300"></div>
                        <div className="h-5 sm:h-6 w-16 sm:w-20 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="mt-4 sm:mt-8 flex items-center justify-between">
                        <div className="h-8 sm:h-10 w-20 sm:w-28 rounded-lg bg-gray-300"></div>
                        <div className="h-8 sm:h-10 w-20 sm:w-24 rounded-lg bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !data || data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏝️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              /* Package Cards - Compact Mobile Design */
              <div className="flex flex-col gap-3 sm:gap-6">
                {data.map((pkg) => (
                  <div key={pkg._id} className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="relative h-48 sm:h-64 sm:w-56 md:w-64 lg:w-72 flex-shrink-0">
                      <img
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={pkg.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                        alt={pkg.travelAgencyName}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      {/* Duration Badge */}
                      <div className="absolute right-3 top-3 z-20 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                        {`${pkg.nights}N ${pkg.days}D`}
                      </div>

                      {/* Location */}
                      <div className="absolute bottom-3 left-3 z-20 flex items-center text-white">
                        <div className="p-1.5 bg-white/20 rounded-full mr-2 backdrop-blur-sm">
                          <LocationOnIcon style={{ fontSize: 14 }} />
                        </div>
                        <span className="text-sm font-semibold drop-shadow-lg">
                          {pkg.location || "Location Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col p-4 sm:p-5">
                      {/* Title */}
                      <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors" title={pkg.travelAgencyName}>
                        {pkg.travelAgencyName}
                      </h3>

                      {/* Rating */}
                      <div className="mb-3 sm:mb-4 flex items-center">
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg mr-3">
                          <StarIcon className="text-sm text-yellow-500 mr-1" />
                          <span className="text-sm font-bold text-yellow-700">4.5</span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">(128 Reviews)</span>
                      </div>

                      {/* Amenities - Compact */}
                      <div className="mb-4 sm:mb-5 flex flex-wrap gap-1.5">
                        {pkg.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 border">
                            {amenity}
                          </span>
                        ))}
                        {pkg.amenities?.length > 3 && (
                          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-600">
                            +{pkg.amenities.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Price & Book Button - Mobile Optimized */}
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Starting from</p>
                          <div className="flex items-center">
                            <FaRupeeSign className="text-green-600 text-sm mr-1" />
                            <p className="text-xl sm:text-2xl font-bold text-green-600">
                              {pkg.price ? pkg.price.toLocaleString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleBooking(pkg._id)}
                          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Enhanced Mobile Filter Drawer with Bottom App Bar Spacing */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileDrawerOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative flex w-full flex-col bg-white rounded-t-2xl shadow-lg h-[60vh] animate-slideUp">

              {/* Header with Actions */}
              <div className="flex items-center justify-between border-b px-4 py-4">
                <h2 className="text-base font-bold text-gray-800">Smart Filters</h2>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleClearFilters}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition shadow"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
                  >
                    <CloseIcon fontSize="small" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto p-4">{filterContent}</div>
            </div>
          </div>
        )}

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="
            fixed bottom-23 left-4 lg:hidden z-40
            flex items-center space-x-2 
            bg-gradient-to-r from-blue-600 to-purple-600 text-white 
            px-4 py-3 rounded-full shadow-xl 
            hover:from-blue-700 hover:to-purple-700 
            transition-all transform hover:scale-105
          "
        >
          <FilterListIcon />
          <span className="text-sm font-medium">Filters</span>
        </button>

      </div>
    </div>
  );
};
