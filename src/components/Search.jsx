import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// --- SVG ICON COMPONENTS ---
const SearchIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> );
const MyLocationIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path></svg> );
const CalendarMonthIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> );
const GroupIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> );
const MeetingRoomIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> );
const LocationOnIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> );
const TravelExploreIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M12 2L12 22"></path><path d="M2 12L22 12"></path><circle cx="12" cy="12" r="4"></circle></svg> );


const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().toISOString().split("T")[0];

  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [data, setData] = useState({
    search: "", checkInDate: today, checkOutDate: today,
    countRooms: 1, guests: 2, latitude: "", longitude: ""
  });

  if (location.pathname !== "/") return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const handleSearch = () => {
    const qs = Object.entries(data)
      .filter(([, v]) => v !== "")
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
    navigate(`/search?${qs}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const json = await res.json();
          const name = json.address.city || json.address.town || json.address.village || "Current Location";
          setData((p) => ({ ...p, search: name }));
        } catch (error) {
          console.error("Error fetching location name:", error);
        }
        setFetchingLocation(false);
      },
      () => setFetchingLocation(false)
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }
        .gradient-bar {
          background-size: 200% 100%;
          animation: gradientMove 3s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center my-2 md:my-4">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent inline-flex items-center gap-2">
          <TravelExploreIcon className="text-indigo-600" />
          Start Your Journey
        </h2>
        <p className="hidden sm:block text-sm md:text-base text-gray-500 font-medium">
          Best prices guaranteed
        </p>
      </div>

      <div className="relative bg-gradient-to-r from-white/95 to-slate-50/95 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-purple-200/50 shadow-lg shadow-purple-600/5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/10 hover:-translate-y-0.5">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-bar bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"></div>
        <div className="p-3 md:p-5">
            <div className="grid grid-cols-12 gap-2 md:gap-4 items-end">
                {/* Destination Input */}
                <div className="col-span-12 md:col-span-4">
                    <label className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 mb-1">
                        <LocationOnIcon className="text-purple-600" />
                        Destination
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                           <SearchIcon />
                        </div>
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={handleChange}
                            placeholder="City or hotel..."
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleSearch())}
                            className="w-full h-11 md:h-12 pl-9 pr-10 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                            <button onClick={getLocation} disabled={fetchingLocation} className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-full transition">
                                {fetchingLocation ? (
                                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <MyLocationIcon />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Check-in / Check-out */}
                <div className="col-span-6 md:col-span-2">
                     <label className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 mb-1">
                        <CalendarMonthIcon className="text-green-600"/>
                        Check-in
                    </label>
                    <input type="date" name="checkInDate" value={data.checkInDate} onChange={handleChange} className="w-full h-11 md:h-12 px-3 text-sm md:text-base font-medium text-gray-700 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" />
                </div>
                 <div className="col-span-6 md:col-span-2">
                     <label className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 mb-1">
                        <CalendarMonthIcon className="text-amber-500"/>
                        Check-out
                    </label>
                    <input type="date" name="checkOutDate" value={data.checkOutDate} onChange={handleChange} className="w-full h-11 md:h-12 px-3 text-sm md:text-base font-medium text-gray-700 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
                </div>

                {/* Rooms & Guests */}
                <div className="col-span-4 md:col-span-1">
                    <label className="flex items-center justify-center md:justify-start gap-1 text-xs md:text-sm font-semibold text-gray-700 mb-1">
                        <MeetingRoomIcon className="text-violet-600"/>
                        Rooms
                    </label>
                    <input type="number" name="countRooms" value={data.countRooms} onChange={handleChange} min="1" max="10" className="w-full h-11 md:h-12 px-2 text-center text-sm md:text-base font-semibold text-gray-700 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition" />
                </div>
                <div className="col-span-4 md:col-span-1">
                    <label className="flex items-center justify-center md:justify-start gap-1 text-xs md:text-sm font-semibold text-gray-700 mb-1">
                        <GroupIcon className="text-red-500"/>
                        Guests
                    </label>
                    <input type="number" name="guests" value={data.guests} onChange={handleChange} min="1" max="20" className="w-full h-11 md:h-12 px-2 text-center text-sm md:text-base font-semibold text-gray-700 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" />
                </div>
                
                {/* Search Button */}
                <div className="col-span-4 md:col-span-2">
                    <button onClick={handleSearch} className="w-full h-11 md:h-14 flex items-center justify-center gap-2 text-sm md:text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg shadow-purple-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/40 hover:-translate-y-1">
                        <SearchIcon className="w-4 h-4"/>
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div className="px-3 md:px-5 pb-3 md:pb-4 pt-1">
            <span className="text-xs md:text-sm font-medium text-gray-600 mr-2">🔥 Popular:</span>
            <div className="inline-flex flex-wrap gap-1 md:gap-2">
                {['Mumbai', 'Delhi', 'Goa', 'Jaipur'].map((city) => (
                    <button key={city} onClick={() => setData(prev => ({ ...prev, search: city }))} className="px-2 md:px-3 py-1 text-xs md:text-sm font-semibold text-purple-700 bg-purple-100/70 rounded-full hover:bg-purple-200 hover:scale-105 transition-all">
                        {city}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
