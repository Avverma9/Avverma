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
import { FaRupeeSign } from "react-icons/fa";

const TravelPackages = () => {
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

  const filterContent = (
    <div className="flex flex-col space-y-6">
      <div>
        <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">Sort & Order</label>
        <div className="relative">
          <select
            id="sort-by"
            value={sortByOrder}
            onChange={(e) => setSortByOrder(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <ArrowDropDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Price Range</p>
        <p className="text-center font-semibold text-blue-600 mb-4">₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}</p>
        <Slider
          min={500}
          max={164990}
          step={500}
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
          className="h-1 w-full"
          thumbClassName="h-4 w-4 bg-blue-600 rounded-full cursor-pointer outline-none -top-1.5 border-2 border-white shadow-md focus:ring-2 focus:ring-blue-400"
          renderTrack={(props, state) => (
             <div {...props} className={`h-1 rounded-full ${state.index === 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Duration</p>
         <p className="text-center font-semibold text-blue-600 mb-4">{minNights} - {maxNights} Nights</p>
        <Slider
          min={2}
          max={9}
          step={1}
          value={[minNights, maxNights]}
          onChange={handleNightsChange}
          className="h-1 w-full"
          thumbClassName="h-4 w-4 bg-blue-600 rounded-full cursor-pointer outline-none -top-1.5 border-2 border-white shadow-md focus:ring-2 focus:ring-blue-400"
          renderTrack={(props, state) => (
             <div {...props} className={`h-1 rounded-full ${state.index === 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-3">Trip Category</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            { value: "Winter", label: "Winter" }, { value: "Summer", label: "Summer" },
            { value: "Honeymoon", label: "Honeymoon" }, { value: "Romantic", label: "Romantic" },
            { value: "Adventure", label: "Adventure" }, { value: "Beach", label: "Beach" },
          ].map((theme) => (
            <label key={theme.value} className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={selectedThemes.includes(theme.value)}
                onChange={handleThemeChange}
                value={theme.value}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{theme.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-wrap gap-8">
          <aside className="hidden w-full md:block md:w-1/4 lg:w-1/5">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="mb-6 text-xl font-bold text-gray-800">Filters</h2>
                {filterContent}
                <div className="mt-8 flex items-center space-x-3">
                  <button
                    onClick={handleClearFilters}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="w-full flex-1 md:w-3/4 lg:w-4/5">
            <div
              className="relative mb-8 overflow-hidden rounded-2xl bg-cover bg-center p-8 text-center text-white shadow-xl"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop)' }}
            >
              <div className="absolute inset-0 z-10 bg-black/50"></div>
              <div className="relative z-20">
                <h1 className="mb-2 text-4xl font-bold md:text-5xl">
                  Travel Packages ✈️
                </h1>
                <p className="text-base text-white/90 md:text-lg">
                  Discover Your Next Great Adventure
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col md:flex-row animate-pulse rounded-xl bg-white p-4 shadow-md overflow-hidden">
                    <div className="h-48 md:h-auto md:w-64 flex-shrink-0 rounded-lg bg-gray-300"></div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                        <div className="h-7 w-3/4 rounded bg-gray-300 mb-4"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-300 mb-5"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-20 rounded-full bg-gray-300"></div>
                            <div className="h-6 w-20 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                            <div className="h-10 w-28 rounded-md bg-gray-300"></div>
                            <div className="h-10 w-24 rounded-md bg-gray-300"></div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !data || data.length === 0 ? (
              <NotFoundPage />
            ) : (
              <div className="flex flex-col gap-6">
                {data.map((pkg) => (
                  <div key={pkg._id} className="flex flex-col md:flex-row overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                    <div className="relative h-56 md:h-auto md:w-64 lg:w-72 flex-shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        src={pkg.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                        alt={pkg.travelAgencyName}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                       <div className="absolute right-3 top-3 z-20 rounded-md bg-gray-900/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {`${pkg.nights}N ${pkg.days}D`}
                      </div>
                      <div className="absolute bottom-3 left-3 z-20 flex items-center text-white">
                        <LocationOnIcon style={{ fontSize: 16, marginRight: '4px' }} />
                        <span className="text-sm font-semibold">
                          {pkg.location || "Location Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col p-5">
                      <h3 className="mb-2 text-xl font-bold text-gray-800" title={pkg.travelAgencyName}>
                        {pkg.travelAgencyName}
                      </h3>
                      <div className="mb-4 flex items-center">
                        <StarIcon className="text-base text-yellow-400" />
                        <span className="ml-1 mr-2 text-sm font-semibold text-gray-700">4.5</span>
                        <span className="text-sm text-gray-500">(128 Reviews)</span>
                      </div>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {pkg.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                         <div>
                            <p className="text-xs text-gray-500">Starting from</p>
                            <p className="text-xl font-bold text-green-600">
                                ₹{pkg.price ? pkg.price.toLocaleString() : 'N/A'}
                            </p>
                         </div>
                        <button
                          onClick={() => handleBooking(pkg._id)}
                          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
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

        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg md:hidden"
        >
          <FilterListIcon />
        </button>

        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileDrawerOpen(false)}
            ></div>
            <div className="relative flex h-[85vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl">
              <div className="mx-auto my-2 h-1.5 w-12 rounded-full bg-gray-300"></div>
              <div className="flex flex-shrink-0 items-center justify-between border-b px-4 pb-2">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button onClick={() => setIsMobileDrawerOpen(false)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                  <CloseIcon />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                {filterContent}
              </div>
              <div className="flex-shrink-0 border-t bg-white p-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleClearFilters}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPackages;