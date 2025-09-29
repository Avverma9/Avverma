/* eslint-disable no-irregular-whitespace */
import React, { useState, useMemo, useEffect } from 'react';

// --- Data ---
// Yeh travel packages ka sample JSON data hai.
const travelData = [
    {
        "_id": "683bfa6f8f2403c2e02e03eb",
        "travelAgencyName": "Mannara Travels",
        "agencyId": "FT14241RC",
        "agencyPhone": "9576630507",
        "agencyEmail": "av95766@gmail.com",
        "isAccepted": true,
        "state": "BR",
        "city": "Bakhtiyarpur",
        "visitngPlaces": "1N Patna | 1N Delhi",
        "themes": "Romantic",
        "price": 1400,
        "nights": 2,
        "days": 3,
        "from": "2025-06-01T00:00:00.000Z",
        "to": "2025-06-20T00:00:00.000Z",
        "amenities": ["Coffee", "Pool", "Parking", "Gym", "Restaurant", "WIFI"],
        "inclusion": ["TV in Van", "AC", "Food"],
        "exclusion": ["WIFI", "Water"],
        "termsAndConditions": {
            "cancellation": "More than 30 days before departure: Full refund (minus processing fee, if any)\n15–29 days before departure: 50% of the tour cost refunded\n7–14 days before departure: 25% of the tour cost refunded",
            "refund": "Refunds will be processed within 7–14 business days after approval.\nRefunds will be made using the original payment method only.\nAny bank or transaction charges incurred during payment or refund will be borne by the customer.",
           	"bookingPolicy": "Advance Payment: 30–50% of the total package cost at the time of booking.\nBalance Payment: Due at least 7 days before departure.\nBookings are confirmed only after receiving the advance payment."
        },
       	"dayWise": [
            { "day": 1, "description": "From patna to Bihar", "_id": "683bfa6f8f2403c2e02e03ec" },
            { "day": 2, "description": "From Bihar to Delhi", "_id": "683bfa6f8f2403c2e02e03ed" },
            { "day": 3, "description": "", "_id": "68ce6dbbe3bba4e13c20" }
       	],
       	"starRating": 4,
       	"images": [
           	"https://images.unsplash.com/photo-15660737T1259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
           	"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       	],
       	"overview": "Discover Kerala’s lush landscapes, serene backwaters, and vibrant traditions in this perfectly planned trip. Enjoy a houseboat cruise in Alleppey, explore the tea gardens of Munnar, and relax on Kovalam’s golden beaches.",
       	"createdAt": "2025-06-01T06:59:59.090Z",
       	"updatedAt": "2025-09-20T09:02:51.742Z",
       	"__v": 0,
       	"country": "IN"
   	},
   	{
       	"_id": "683bfa9b8f2403c2e02e03f6",
       	"travelAgencyName": "Mannara Travels",
       	"agencyId": "FT14241RC",
       	"agencyPhone": "9576630507",
       	"agencyEmail": "av95766@gmail.com",
       	"isAccepted": true,
       	"state": "BR",
       	"city": "Patna",
       	"visitngPlaces": "1N Patna | 1N Delhi",
       	"themes": "Honeymoon",
       	"price": 2500,
       	"nights": 2,
       	"days": 3,
       	"from": "2025-06-01T00:00:00.000Z",
       	"to": "2025-06-20T00:00:00.000Z",
       	"amenities": ["Coffee", "Pool"],
       	"inclusion": ["TV in Van"],
       	"exclusion": ["Ac"],
       	"termsAndConditions": { "cancellation": "NA", "refund": "NA", "bookingPolicy": "NA" },
       	"dayWise": [
            { "day": 1, "description": "NA", "_id": "683bfa9b8f2403c2e02e03f7" },
            { "day": 2, "description": "NA", "_id": "683bfa9b8f2403c2e02e03f8" }
       	],
       	"starRating": 5,
       	"images": [
           	"https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
           	"https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       	],
       	"overview": "NA",
       	"createdAt": "2025-06-01T07:00:43.703Z",
       	"updatedAt": "2025-06-28T15:41:50.207Z",
       	"__v": 0,
        "country": "IN"
   	},
     {
        "_id": "683bfa6f8f2403c2e02e03ed", // Note: Changed ID to be unique
        "travelAgencyName": "Himalayan Escapes",
        "city": "Shimla",
        "themes": "Adventure",
        "price": 3200,
        "nights": 4,
        "days": 5,
        "starRating": 4,
        "amenities": ["Parking", "Restaurant", "WIFI"],
        "images": ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        "visitngPlaces": "2N Shimla | 2N Manali",
    }
];

// --- Helper Components & Icons ---

// Amenities ke liye Icons
const AmenityIcons = {
    'Coffee': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    'Pool': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m6.2 11.8 1.4-1.4c.54-.54 1.29-.81 2.03-.81s1.5.27 2.03.81l1.4 1.4"/><path d="m14.8 14.2-1.4 1.4c-.54.54-1.29.81-2.03.81s-1.5-.27-2.03-.81l-1.4-1.4"/><path d="M22 12h-2"/><path d="M4 12H2"/><path d="m15.5 18.2.8.8"/><path d="m7.8 8.5-.8-.8"/></svg>,
    'Parking': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V6h6.5a4.5 4.5 0 1 1 0 9H9"/></svg>,
    'Gym': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.2 21.2-3.8-3.8"/><path d="M12.028 12.028 2.8 2.8"/><path d="m18.4 6-2.8 2.8"/><path d="M14.8 9.6 2.8 21.2"/><path d="M9.6 14.8 21.2 2.8"/><path d="M6 18.4 2.8 15.2"/><path d="m15.2 2.8 3.2 3.2"/></svg>,
    'Restaurant': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    'WIFI': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a8 8 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M8 16.29a4 4 0 0 1 8 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
};
const AmenityDisplay = ({ amenity }) => {
    const Icon = AmenityIcons[amenity];
    if (!Icon) return null; // Agar icon nahi hai to kuch na dikhaye
    return (
        <div className="flex items-center text-gray-600" title={amenity}>
            <Icon />
        </div>
    );
};

// Rating ke liye Star Icon
const StarIcon = ({ className, filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

// Filter ke liye Icon
const FilterIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);

// Close (Band karne ke liye) Icon
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// Custom checkboxes ke liye Checkmark Icon
const CheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Chote tags ke liye component
const Tag = ({ children }) => (
    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">{children}</span>
);

// Single Travel Package Card ke liye component
const PackageCard = ({ item }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const visibleAmenities = item.amenities.slice(0, 5);
    const hiddenAmenitiesCount = item.amenities.length - visibleAmenities.length;

    const nextImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImage((prev) => (prev + 1) % item.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImage((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row">
            <div className="relative h-56 lg:h-auto lg:w-1/3 flex-shrink-0">
                <img src={item.images[currentImage]} alt={item.travelAgencyName} className="w-full h-full object-cover lg:rounded-l-xl lg:rounded-r-none" />
                {item.images.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </>
                )}
                 <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold flex items-center text-amber-500">
                    {item.starRating} <StarIcon className="w-4 h-4 ml-1" filled={true}/>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow lg:w-2/3">
                <h3 className="text-xl font-bold text-gray-800">{item.travelAgencyName}</h3>
                <p className="text-gray-500 text-sm mb-3">{item.city}, {item.state}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Tag>{item.themes}</Tag>
                    <Tag>{item.nights} Nights / {item.days} Days</Tag>
                </div>
                <p className="text-gray-600 mb-4 font-medium">{item.visitngPlaces}</p>
                
                {/* Amenities Section */}
                 <div className="flex items-center gap-4 mb-4 border-t border-b border-gray-100 py-3">
                    {visibleAmenities.map(amenity => (
                        <AmenityDisplay key={amenity} amenity={amenity} />
                    ))}
                    {hiddenAmenitiesCount > 0 && (
                        <div className="text-sm font-bold text-blue-600">
                            +{hiddenAmenitiesCount} more
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <p className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">₹{item.price.toLocaleString()}<span className="text-sm font-normal text-gray-500">/person</span></p>
                        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Filter Sidebar Component
const FilterSidebar = ({ filters, handleFilterChange, maxPrice, allThemes, allAmenities, clearFilters, applyFilters, setIsSidebarOpen }) => (
    <aside className="p-6 bg-gradient-to-b from-white to-gray-50 w-full flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center"><FilterIcon className="w-6 h-6 mr-3 text-blue-600"/>Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Action Buttons */}
        <div className="py-4 mb-4 border-b border-gray-200 flex items-center gap-3">
            <button onClick={clearFilters} className="flex-1 bg-transparent border-2 border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Clear
            </button>
            <button onClick={applyFilters} className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Apply
            </button>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">Search by Name/City</label>
            <input type="text" id="searchTerm" name="searchTerm" value={filters.searchTerm} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Mannara, Patna" />
            <svg className="absolute left-3 top-10 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <hr className="my-2 border-gray-200" />
        
        {/* Price Range */}
        <div className="my-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Max Price: ₹{Number(filters.price).toLocaleString()}</label>
            <input type="range" id="price" name="price" min="0" max={maxPrice} value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>

        <hr className="my-2 border-gray-200" />

        {/* Rating */}
        <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => handleFilterChange({ target: { name: 'rating', value: star === filters.rating ? 0 : star }})} className="p-1 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300">
                        <StarIcon className={`w-7 h-7 cursor-pointer transition-colors ${filters.rating >= star ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}`} filled={filters.rating >= star} />
                    </button>
                ))}
            </div>
        </div>

        <hr className="my-2 border-gray-200" />

        {/* Themes */}
        <div className="my-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Themes</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {allThemes.map(theme => (
                    <label htmlFor={`theme-${theme}`} key={theme} className="flex items-center cursor-pointer">
                        <input id={`theme-${theme}`} name="themes" value={theme} type="checkbox" checked={filters.themes.includes(theme)} onChange={handleFilterChange} className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex justify-center items-center transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600">
                            <CheckIcon className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"/>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">{theme}</span>
                    </label>
                ))}
            </div>
        </div>
        
         {/* Amenities */}
        <div className="my-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {allAmenities.map(amenity => (
                     <label htmlFor={`amenity-${amenity}`} key={amenity} className="flex items-center cursor-pointer">
                        <input id={`amenity-${amenity}`} name="amenities" value={amenity} type="checkbox" checked={filters.amenities.includes(amenity)} onChange={handleFilterChange} className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex justify-center items-center transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600">
                            <CheckIcon className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"/>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">{amenity}</span>
                    </label>
                ))}
            </div>
        </div>
        
    </aside>
);

// Mukhya App Component
function TourPackages() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Data se unique filter options nikalna
    const allThemes = useMemo(() => [...new Set(travelData.map(item => item.themes))], []);
    const allAmenities = useMemo(() => [...new Set(travelData.flatMap(item => item.amenities))], []);
    const maxPrice = useMemo(() => Math.max(...travelData.map(item => item.price)), []);
    
    const initialFilters = {
        searchTerm: '',
        price: maxPrice,
        themes: [],
        amenities: [],
        rating: 0
    };

    // Filters ke liye State
    const [activeFilters, setActiveFilters] = useState(initialFilters);
    const [tempFilters, setTempFilters] = useState(initialFilters);

    useEffect(() => {
        if (isSidebarOpen) {
            setTempFilters(activeFilters);
        }
    }, [isSidebarOpen, activeFilters]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTempFilters(prev => {
            if (type === 'checkbox') {
                const newValues = checked 
                    ? [...prev[name], value] 
                    : prev[name].filter(item => item !== value);
                return { ...prev, [name]: newValues };
            }
            return { ...prev, [name]: value };
        });
    };
    
    const applyFilters = () => {
        setActiveFilters(tempFilters);
        setIsSidebarOpen(false);
    };

    const clearFilters = () => {
        setTempFilters(initialFilters);
    };
    
    const clearAndApplyFilters = () => {
        setActiveFilters(initialFilters);
        setTempFilters(initialFilters);
    }

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
            const amenityMatch = activeFilters.amenities && activeFilters.amenities.length > 0 
                ? activeFilters.amenities.every(amenity => item.amenities.includes(amenity))
                : true;

            return (nameMatch || cityMatch || placesMatch) && priceMatch && ratingMatch && themeMatch && amenityMatch;
        });
    }, [activeFilters]);

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800">Find Your Next Adventure</h1>
                    <p className="text-gray-600 mt-2">Explore top-rated travel packages tailored for you.</p>
                </header>

                {/* --- Mobile Filter Toggle Button --- */}
                <button 
                    onClick={() => setIsSidebarOpen(true)} 
                    className="lg:hidden fixed bottom-20 left-4 z-30 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform hover:scale-110"
                    aria-label="Open filters"
                >
                    <FilterIcon className="w-6 h-6" />
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* --- Mobile Sidebar --- */}
                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
                    <div className={`fixed top-[80px] bottom-[50px] left-4 w-80 max-w-[calc(100%-2rem)] bg-white rounded-2xl shadow-xl z-50 transform transition-transform lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'}`}>
                       <FilterSidebar filters={tempFilters} handleFilterChange={handleFilterChange} maxPrice={maxPrice} allThemes={allThemes} allAmenities={allAmenities} clearFilters={clearFilters} applyFilters={applyFilters} setIsSidebarOpen={setIsSidebarOpen}/>
                    </div>

                    {/* --- Desktop Sidebar --- */}
                    <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
                        <div className="sticky top-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                           <FilterSidebar filters={tempFilters} handleFilterChange={handleFilterChange} maxPrice={maxPrice} allThemes={allThemes} allAmenities={allAmenities} clearFilters={clearFilters} applyFilters={applyFilters} setIsSidebarOpen={setIsSidebarOpen}/>
                        </div>
                    </div>

                    {/* --- Mukhya Content --- */}
                    <main className="w-full lg:w-3/4 xl:w-4/5">
                        <div className="flex justify-between items-center mb-6">
                             <p className="text-gray-600 font-medium text-left lg:text-right w-full">{filteredData.length} packages found</p>
                        </div>

                        {filteredData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                                {filteredData.map(item => (
                                    <PackageCard key={item._id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg shadow">
                                <h3 className="text-2xl font-semibold text-gray-700">No Packages Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                <button onClick={clearAndApplyFilters} className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default TourPackages;

