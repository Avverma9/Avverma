/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-irregular-whitespace */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { getTravelList } from "../../redux/reducers/travelSlice";
import { useLoader } from "../../utils/loader";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HolidayImageSlider from "../../components/HolidayImageSlider";


const AmenityIcons = {
    'Coffee': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    'Pool': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m6.2 11.8 1.4-1.4c.54-.54 1.29-.81 2.03-.81s1.5.27 2.03.81l1.4 1.4"/><path d="m14.8 14.2-1.4 1.4c-.54-.54-1.29.81-2.03.81s-1.5-.27-2.03-.81l-1.4-1.4"/><path d="M22 12h-2"/><path d="M4 12H2"/><path d="m15.5 18.2.8.8"/><path d="m7.8 8.5-.8-.8"/></svg>,
    'Parking': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V6h6.5a4.5 4.5 0 1 1 0 9H9"/></svg>,
    'Gym': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.2 21.2-3.8-3.8"/><path d="M12.028 12.028 2.8 2.8"/><path d="m18.4 6-2.8 2.8"/><path d="M14.8 9.6 2.8 21.2"/><path d="M9.6 14.8 21.2 2.8"/><path d="M6 18.4 2.8 15.2"/><path d="m15.2 2.8 3.2 3.2"/></svg>,
    'Restaurant': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    'WIFI': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a8 8 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M8 16.29a4 4 0 0 1 8 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    'AC': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10 2 10"/><path d="M12 14 2 14"/><path d="M20 12 2 12"/><path d="m16 6-4 4 4 4"/></svg>,
    'Heater': () => <svg xmlns="http://wwww3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v2"/><path d="M12 18v2"/><path d="M18.36 6.64l-1.41 1.41"/><path d="M7.05 17.05l-1.41 1.41"/><path d="M20 12h-2"/><path d="M6 12H4"/><path d="M18.36 17.36l-1.41-1.41"/><path d="M7.05 6.95 5.64 5.54"/></svg>,
};
const AmenityDisplay = ({ amenity }) => {
    const Icon = AmenityIcons[amenity];
    if (!Icon) return null;
    return <div className="flex items-center text-gray-600" title={amenity}><Icon /></div>;
};

const CheckCircleIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> );
const InclusionItem = ({ children }) => ( <div className="flex items-center text-sm text-gray-600"><CheckCircleIcon className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" /><span>{children}</span></div> );
const StarIcon = ({ className, filled }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> );
const FilterIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> );
const XIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );
const CheckIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> );
const Tag = ({ children }) => ( <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">{children}</span> );

const bannerImages = {
    default: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shimla: "https://images.unsplash.com/photo-1561361533-ebb360ca0297?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    patna: "https://images.unsplash.com/photo-1627513393021-a91334c40b8a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const HeroBanner = ({ onSearch, searchTerm }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState(searchTerm);

    useEffect(() => {
        setTo(searchTerm);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(to);
    };

    const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

    const bannerTitle = `${capitalize(searchTerm) || 'Holiday'} Packages`;
    const bannerImage = bannerImages[searchTerm.toLowerCase()] || bannerImages.default;

    return (
        <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <img src={bannerImage} alt={bannerTitle} className="w-full h-full object-cover object-center transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">{bannerTitle}</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white/20 backdrop-blur-md p-2 rounded-lg flex flex-col sm:flex-row items-center gap-2 border border-white/30">
                    <div className="flex-1 w-full flex items-center bg-white/10 rounded-md p-2">
                        <label htmlFor="from" className="text-gray-300 text-sm mr-2">From</label>
                        <input id="from" type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Starting point" className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"/>
                    </div>
                     <div className="flex-1 w-full flex items-center bg-white/10 rounded-md p-2">
                        <label htmlFor="to" className="text-gray-300 text-sm mr-2">To</label>
                        <input id="to" type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Destination" className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"/>
                    </div>
                    <button type="submit" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-md transition-colors duration-300">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};


const PackageCard = ({ item, handleBooking }) => {
    const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);
    const [placesExpanded, setPlacesExpanded] = useState(false);
    
    const maxVisibleAmenities = 4;
    const amenitiesToShow = amenitiesExpanded ? item.amenities : item.amenities.slice(0, maxVisibleAmenities);
    const hiddenAmenitiesCount = item.amenities ? item.amenities.length - maxVisibleAmenities : 0;
    const visitingPlacesList = (item.visitngPlaces || '')
        .split('|')
        .map(place => place.trim())
        .filter(Boolean);
    const visiblePlaces = placesExpanded ? visitingPlacesList : visitingPlacesList.slice(0, 3);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row">
            <div className="relative lg:w-2/5 flex-shrink-0">
                <HolidayImageSlider
                    images={item.images}
                    heightClass="h-56 sm:h-64 lg:h-[360px]"
                    showIndicators
                    className="h-full"
                />
                 <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold flex items-center text-amber-500 shadow-md">{item.starRating} <StarIcon className="w-4 h-4 ml-1" filled={true}/></div>
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-grow lg:w-3/5">
                <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.travelAgencyName}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.city}, {item.state}</p>
                    <div className="flex flex-wrap gap-2 mb-3"><Tag>{item.themes}</Tag><Tag>{item.nights} Nights / {item.days} Days</Tag></div>
                    {visitingPlacesList.length > 0 && (
                        <div className="mb-2">
                            <p className="text-gray-700 font-semibold text-base break-words">
                                {visiblePlaces.join(' | ')}
                            </p>
                            {visitingPlacesList.length > 3 && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setPlacesExpanded(prev => !prev); }}
                                    className="text-xs font-semibold text-blue-600 hover:underline"
                                >
                                    {placesExpanded ? 'View less' : `View more (+${visitingPlacesList.length - 3})`}
                                </button>
                            )}
                        </div>
                    )}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.overview}</p>
                    
                    {item.inclusion && item.inclusion.length > 0 && (<div className="mb-3 space-y-1.5">{item.inclusion.slice(0, 2).map(inc => <InclusionItem key={inc}>{inc}</InclusionItem>)}</div>)}
                </div>
                
                <div className="pt-3 mt-3 border-t border-gray-100">
                     <div className="flex items-start justify-between">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            {amenitiesToShow && amenitiesToShow.map(amenity => <AmenityDisplay key={amenity} amenity={amenity} />)}
                            {hiddenAmenitiesCount > 0 && (
                                <button onClick={(e) => { e.stopPropagation(); setAmenitiesExpanded(!amenitiesExpanded);}} className="text-xs font-bold text-blue-600 hover:underline">
                                    {amenitiesExpanded ? 'Show Less' : `+${hiddenAmenitiesCount} more`}
                                </button>
                            )}
                        </div>
                         <p className="text-xl sm:text-2xl font-bold text-gray-900 text-right flex-shrink-0 ml-4">₹{item.price.toLocaleString()}<span className="block text-xs font-normal text-gray-500 -mt-1">/person</span></p>
                    </div>
                     <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full" onClick={() => handleBooking(item._id)}>View Details</button>
                </div>
            </div>
        </div>
    );
};

const FilterSidebar = ({ filters, handleFilterChange, maxPrice, allThemes, allAmenities, clearFilters, applyFilters, setIsSidebarOpen }) => (
    <aside className="p-6 bg-gradient-to-b from-white to-gray-50 w-full flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center"><FilterIcon className="w-6 h-6 mr-3 text-blue-600"/>Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800"><XIcon className="w-6 h-6" /></button>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center gap-3">
            <button onClick={clearFilters} className="flex-1 bg-transparent border-2 border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">Clear</button>
            <button onClick={applyFilters} className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">Apply</button>
        </div>
        
        <div className="my-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Max Price: ₹{Number(filters.price).toLocaleString()}</label>
            <input type="range" id="price" name="price" min="0" max={maxPrice} value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (<button key={star} onClick={() => handleFilterChange({ target: { name: 'rating', value: star === filters.rating ? 0 : star }})} className="p-1 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300"><StarIcon className={`w-7 h-7 cursor-pointer transition-colors ${filters.rating >= star ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}`} filled={filters.rating >= star} /></button>))}
            </div>
        </div>
        <hr className="my-2 border-gray-200" />
        {[ {title: 'Themes', name: 'themes', options: allThemes}, {title: 'Amenities', name: 'amenities', options: allAmenities} ].map(group => (
             <div className="my-4" key={group.name}>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{group.title}</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                    {group.options.map(option => (
                        <label htmlFor={`${group.name}-${option}`} key={option} className="flex items-center cursor-pointer">
                            <input id={`${group.name}-${option}`} name={group.name} value={option} type="checkbox" checked={filters[group.name].includes(option)} onChange={handleFilterChange} className="peer sr-only" />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex justify-center items-center transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600"><CheckIcon className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"/></div>
                            <span className="ml-3 text-sm text-gray-600">{option}</span>
                        </label>
                    ))}
                </div>
            </div>
        ))}
    </aside>
);

function TourPackages() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false);
   const { showLoader, hideLoader } = useLoader();  
    const {data} = useSelector((state)=>state.travel)
   const travelData = data || [];


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
    const allThemes = useMemo(() => [...new Set(travelData.map(item => item.themes))], [travelData]);
    const allAmenities = useMemo(() => [...new Set(travelData.flatMap(item => item.amenities ?? []))].sort(), [travelData]);
    const maxPrice = useMemo(() => (travelData.length > 0 ? Math.max(...travelData.map(item => item.price)) : 100000), [travelData]);
    
    const initialFilters = { searchTerm: '', price: maxPrice, themes: [], amenities: [], rating: 0 };
    const [activeFilters, setActiveFilters] = useState(initialFilters);
    const [tempFilters, setTempFilters] = useState(initialFilters);

    useEffect(() => {
        setActiveFilters(f => ({...f, price: maxPrice}));
        setTempFilters(f => ({...f, price: maxPrice}));
    }, [maxPrice]);

    useEffect(() => { if (isSidebarOpen) { setTempFilters(activeFilters); } }, [isSidebarOpen, activeFilters]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTempFilters(prev => {
            if (type === 'checkbox') {
                const newValues = checked ? [...prev[name], value] : prev[name].filter(item => item !== value);
                return { ...prev, [name]: newValues };
            }
            return { ...prev, [name]: value };
        });
    };
    
    const handleSearch = (term) => {
        showLoader();
        setTimeout(() => {
            const newFilters = {...activeFilters, searchTerm: term };
            setActiveFilters(newFilters);
            setTempFilters(newFilters);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            hideLoader();
        }, 0);
    };
    
    const applyFilters = () => { 
        showLoader();
        setTimeout(() => {
            setActiveFilters(tempFilters); 
            setIsSidebarOpen(false); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            hideLoader();
        }, 0);
    };
    
    const clearAndApplyFilters = () => { 
        showLoader();
        setTimeout(() => {
            setActiveFilters(prev => ({...initialFilters, searchTerm: ""})); 
            setTempFilters(prev => ({...initialFilters, searchTerm: ""})); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            hideLoader();
        }, 0);
    };

    const filteredData = useMemo(() => {
        return travelData.filter(item => {
            if (!item) return false;
            const searchLower = activeFilters.searchTerm.toLowerCase();
            const nameMatch = item.travelAgencyName?.toLowerCase().includes(searchLower);
            const cityMatch = item.city?.toLowerCase().includes(searchLower);
            const placesMatch = item.visitngPlaces?.toLowerCase().includes(searchLower);
            const priceMatch = item.price <= activeFilters.price;
            const ratingMatch = item.starRating >= activeFilters.rating;
            const themeMatch = activeFilters.themes.length === 0 || activeFilters.themes.includes(item.themes);
            const amenityMatch = activeFilters.amenities.every(amenity => item.amenities?.includes(amenity));
            
            if (searchLower) {
                 return (nameMatch || cityMatch || placesMatch) && priceMatch && ratingMatch && themeMatch && amenityMatch;
            }
            return priceMatch && ratingMatch && themeMatch && amenityMatch;
        });
    }, [activeFilters, travelData]);

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                <HeroBanner onSearch={handleSearch} searchTerm={activeFilters.searchTerm} />
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed bottom-20 left-4 z-30 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform hover:scale-110" aria-label="Open filters"><FilterIcon className="w-6 h-6" /></button>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
                    <div className={`fixed top-[80px] bottom-[50px] left-4 w-80 max-w-[calc(100%-2rem)] bg-white rounded-2xl shadow-xl z-50 transform transition-transform lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'}`}><FilterSidebar filters={tempFilters} handleFilterChange={handleFilterChange} maxPrice={maxPrice} allThemes={allThemes} allAmenities={allAmenities} clearFilters={clearAndApplyFilters} applyFilters={applyFilters} setIsSidebarOpen={setIsSidebarOpen}/></div>
                    
                    <div className="hidden lg:block lg:w-1/4 xl:w-1/5"><div className="sticky top-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"><FilterSidebar filters={tempFilters} handleFilterChange={handleFilterChange} maxPrice={maxPrice} allThemes={allThemes} allAmenities={allAmenities} clearFilters={clearAndApplyFilters} applyFilters={applyFilters} setIsSidebarOpen={setIsSidebarOpen}/></div></div>
                    
                    <main className="w-full lg:w-3/4 xl:w-4/5">
                        <div className="flex justify-between items-center mb-6"><p className="text-gray-600 font-medium text-left lg:text-right w-full">{filteredData.length} packages found</p></div>
                        {filteredData.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:gap-8">
                                {filteredData.map(item => <PackageCard key={item._id} item={item} handleBooking={handleBooking} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg shadow">
                                <h3 className="text-2xl font-semibold text-gray-700">No Packages Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                <button onClick={clearAndApplyFilters} className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">Clear All Filters</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default TourPackages;

