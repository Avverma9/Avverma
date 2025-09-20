import React, { useState, useEffect, useMemo } from 'react';
import { styles } from './styles';

// --- Data ---
// Cab data in JSON format.
const initialCabData = [
    {
        "_id": "6820303682dbb7a994ef97e8",
        "make": "Plymouth",
        "model": "Sundance/Duster",
        "vehicleNumber": "BR-201421F",
        "images": [],
        "year": 2020,
        "pickupP": "Patna",
        "dropP": "Gaya",
        "seater": 5,
        "runningStatus": "Available",
        "seatConfig": [
            { "seatType": "AC", "seatNumber": 1, "isBooked": true, "seatPrice": 1800, "bookedBy": "Ankit ", "_id": "68594b9bdced8e1bd79a0e99" },
            { "seatType": "Non-AC", "seatNumber": 2, "isBooked": true, "seatPrice": 2500, "bookedBy": "ss", "_id": "685ad1be7a9e70b2e765a1db" },
            { "seatType": "AC", "seatNumber": 3, "isBooked": true, "seatPrice": 3000, "bookedBy": "Ankit verma", "_id": "685ae2e17a9e70b2e765b7fc" },
            { "seatType": "AC", "seatNumber": 4, "isBooked": true, "seatPrice": 3000, "bookedBy": "Ankit", "_id": "685ae3237a9e70b2e765b889" },
            { "seatType": "AC", "seatNumber": 5, "isBooked": true, "seatPrice": 3000, "bookedBy": "Normal", "_id": "685ae3897a9e70b2e765b92f" }
        ],
        "extraKm": 50,
        "perPersonCost": 597,
        "pickupD": "2025-06-23T21:00:00.000Z",
        "dropD": "2025-06-26T10:02:00.000Z",
        "price": 1200,
        "color": "Red",
        "mileage": 100,
        "fuelType": "Petrol",
        "transmission": "Automatic",
        "ownerId": "66751804def0b0b1d2f0d672",
        "isAvailable": true,
        "dateAdded": "2025-05-11T05:05:58.554Z",
        "__v": 0
    },
    {
        "_id": "6820307f82dbb7a994ef97f5",
        "make": "Hyundai",
        "model": "Accent",
        "vehicleNumber": "BR414514E",
        "images": ["https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        "year": 2021,
        "pickupP": "Patna",
        "dropP": "Delhi",
        "seater": 1,
        "runningStatus": "Available",
        "seatConfig": [],
        "extraKm": 25,
        "perPersonCost": 1200,
        "pickupD": "2025-05-11T13:36:00.000Z",
        "dropD": "2025-05-12T10:36:00.000Z",
        "price": 2700,
        "color": "Red",
        "mileage": 100,
        "fuelType": "Petrol",
        "transmission": "Automatic",
        "ownerId": "66751804def0b0b1d2f0d672",
        "isAvailable": true,
        "dateAdded": "2025-05-11T05:07:11.026Z",
        "__v": 0
    },
    {
        "_id": "6820557682dbb7a994ef9bc2",
        "make": "Ford",
        "model": "LTD Crown Victoria",
        "vehicleNumber": "HR82-2154S",
        "images": [
            "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        "year": 2021,
        "pickupP": "Lucknow",
        "dropP": "Jaipur",
        "seater": 9,
        "runningStatus": "Available",
        "seatConfig": [
            { "seatType": "AC", "seatNumber": 1, "isBooked": false, "seatPrice": 500, "bookedBy": "", "_id": "6820557682dbb7a994ef9bc3" },
            { "seatType": "AC", "seatNumber": 2, "isBooked": false, "seatPrice": 500, "bookedBy": "", "_id": "6820557682dbb7a994ef9bc4" },
            { "seatType": "AC", "seatNumber": 3, "isBooked": false, "seatPrice": 530, "bookedBy": "", "_id": "6820557682dbb7a994ef9bc5" },
            { "seatType": "AC", "seatNumber": 4, "isBooked": false, "seatPrice": 500, "bookedBy": "", "_id": "6820557682dbb7a994ef9bc6" },
            { "seatType": "AC", "seatNumber": 5, "isBooked": false, "seatPrice": 530, "bookedBy": "", "_id": "6820557682dbb7a994ef9bc7" },
            { "seatType": "", "seatNumber": 6, "isBooked": false, "seatPrice": 500, "bookedBy": "", "_id": "6820557682dbb7a994ef9bc8" },
            { "seatType": "AC", "seatNumber": 7, "isBooked": true, "seatPrice": 500, "bookedBy": "Praveen Gupta ", "_id": "6820557682dbb7a994ef9bc9" },
            { "seatType": "AC", "seatNumber": 8, "isBooked": true, "seatPrice": 500, "bookedBy": "Ankit verma", "_id": "6820557682dbb7a994ef9bca" },
            { "seatType": "AC", "seatNumber": 9, "isBooked": true, "seatPrice": 501, "bookedBy": "Praveen ", "_id": "6820557682dbb7a994ef9bcb" }
        ],
        "extraKm": 15,
        "perPersonCost": 300,
        "pickupD": "2025-09-23T13:30:00.000Z",
        "dropD": "2025-09-24T07:30:00.000Z",
        "price": 850,
        "color": "Black",
        "mileage": 10,
        "fuelType": "Diesel",
        "transmission": "Manual",
        "ownerId": "66b5f475d19a3dcaaad081eb",
        "isAvailable": true,
        "dateAdded": "2025-05-11T07:44:54.083Z",
        "__v": 0
    },
    {
        "_id": "685ae6017a9e70b2e765baf2",
        "make": "Ford",
        "model": "Escape FWD",
        "vehicleNumber": "BR-1424ER",
        "images": [],
        "year": 2025,
        "pickupP": "Delhi",
        "dropP": "Ahmedabad",
        "seater": 4,
        "runningStatus": "Available",
        "seatConfig": [
            { "seatType": "AC", "seatNumber": 1, "isBooked": true, "seatPrice": 1000, "bookedBy": "Raja", "_id": "685ae6017a9e70b2e765baf3" },
            { "seatType": "AC", "seatNumber": 2, "isBooked": true, "seatPrice": 1060, "bookedBy": "ds", "_id": "685ae6017a9e70b2e765baf4" },
            { "seatType": "Non-AC", "seatNumber": 3, "isBooked": true, "seatPrice": 800, "bookedBy": "Ankit Kumar Verma", "_id": "685ae6017a9e70b2e765baf5" },
            { "seatType": "Non-AC", "seatNumber": 4, "isBooked": true, "seatPrice": 800, "bookedBy": "Ajay", "_id": "685ae6017a9e70b2e765baf6" }
        ],
        "extraKm": 50,
        "perPersonCost": 800,
        "pickupD": "2025-06-24T23:22:00.000Z",
        "dropD": "2025-06-26T23:22:00.000Z",
        "price": 2000,
        "color": "Red",
        "mileage": 47,
        "fuelType": "Electric",
        "transmission": "Automatic",
        "ownerId": "66751804def0b0b1d2f0d672",
        "isAvailable": true,
        "dateAdded": "2025-06-24T17:53:05.625Z",
        "__v": 0
    }
];

// --- SVG Icons ---
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="no-results-icon"><path d="M14 16.5V15a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.5"></path><path d="M2 10h20"></path><path d="M6 11v-1.5a1.5 1.5 0 0 1 3 0V11"></path><path d="M15 11v-1.5a1.5 1.5 0 0 1 3 0V11"></path><path d="M4 19h16"></path><path d="M5 19.5V11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8.5"></path></svg>;
const LogoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;


// --- Helper Functions ---
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
};

// --- Sub-Components ---
const CabCard = ({ cab }) => {
    const availableSeats = cab.seater - cab.seatConfig.filter(s => s.isBooked).length;
    const placeholderImage = `https://placehold.co/600x400/e0e7ff/4338ca?text=${cab.make.replace(" ", "+")}`;

    return (
        <div className="cab-card">
            <div className="cab-card-image-wrapper">
                <img src={cab.images[0] || placeholderImage} alt={`${cab.make} ${cab.model}`} className="cab-card-image" onError={(e) => { e.target.onerror = null; e.target.src=placeholderImage; }} />
                <span className={`cab-card-status ${availableSeats > 0 ? 'available' : 'full'}`}>{availableSeats > 0 ? `${availableSeats} Seats Available` : 'Fully Booked'}</span>
            </div>
            <div className="cab-card-content">
                <div className="cab-card-header"><h3 className="cab-card-title">{cab.make} {cab.model}</h3><p className="cab-card-year">{cab.year}</p></div>
                <p className="cab-card-route">{cab.pickupP} → {cab.dropP}</p>
                <div className="cab-card-details">
                    <div><span className="detail-icon">📅</span><strong>Pickup:</strong> {formatDate(cab.pickupD)}</div>
                    <div><span className="detail-icon">📅</span><strong>Drop:</strong> {formatDate(cab.dropD)}</div>
                </div>
                <div className="cab-card-tags"><span><span className="tag-icon">⛽</span>{cab.fuelType}</span><span><span className="tag-icon">👤</span>{cab.seater} Seater</span></div>
                <div className="cab-card-footer"><p className="cab-card-price">₹{cab.perPersonCost}<span>/person</span></p><button className="cab-card-button" disabled={availableSeats <= 0}>View Details</button></div>
            </div>
        </div>
    );
};

const FilterComponent = ({ filters, setFilters, makes, fuelTypes, isOpen, onClose, priceRange, maxPrice }) => {
    const handleFilterChange = (e) => {
        const { name, value, type } = e.target;
        setFilters(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
    };
    const resetFilters = () => setFilters({ make: 'All', fuelType: 'All', seats: 1, price: maxPrice });

    return (
        <aside className={`filter-container ${isOpen ? 'open' : ''}`}>
            <div className="filter-wrapper">
                <div className="filter-header"><h2>Filters</h2><button className="filter-close-btn" onClick={onClose}><CloseIcon /></button></div>
                <div className="filter-group"><div className="price-label"><label htmlFor="price-filter">Max Price</label><span>₹{filters.price}</span></div><input type="range" id="price-filter" name="price" min={priceRange.min} max={priceRange.max} value={filters.price} onChange={handleFilterChange} className="price-slider" /></div>
                <div className="filter-group"><label htmlFor="seats-filter">Seats Required</label><input type="number" id="seats-filter" name="seats" min="1" max="10" value={filters.seats} onChange={handleFilterChange} className="seats-input" /></div>
                <div className="filter-group"><label htmlFor="make-filter">Car Brand</label><select id="make-filter" name="make" value={filters.make} onChange={handleFilterChange}><option value="All">All Brands</option>{makes.map(make => <option key={make} value={make}>{make}</option>)}</select></div>
                <div className="filter-group"><label>Fuel Type</label><div className="radio-group"><label><input type="radio" name="fuelType" value="All" checked={filters.fuelType === 'All'} onChange={handleFilterChange} />All</label>{fuelTypes.map(fuel => (<label key={fuel}><input type="radio" name="fuelType" value={fuel} checked={filters.fuelType === fuel} onChange={handleFilterChange} />{fuel}</label>))}</div></div>
                <div className="filter-footer"><button className="filter-reset-btn" onClick={resetFilters}>Reset All Filters</button></div>
            </div>
        </aside>
    );
}

const SearchModal = ({ isOpen, onClose, searchParams, handleSearchChange, handleSearchSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay" onClick={onClose}>
            <div className="search-modal" onClick={e => e.stopPropagation()}>
                <div className="search-modal-header">
                    <h3>Search for Your Ride</h3>
                    <button onClick={onClose}><CloseIcon/></button>
                </div>
                <div className="search-modal-content">
                    <div className="search-form-group">
                        <label htmlFor="from">From</label>
                        <input type="text" id="from" name="from" placeholder="e.g., Patna" value={searchParams.from} onChange={handleSearchChange}/>
                    </div>
                     <div className="search-form-group">
                        <label htmlFor="to">To</label>
                        <input type="text" id="to" name="to" placeholder="e.g., Delhi" value={searchParams.to} onChange={handleSearchChange}/>
                    </div>
                     <div className="search-form-group">
                        <label htmlFor="pickupDate">Pickup Date</label>
                        <input type="date" id="pickupDate" name="pickupDate" value={searchParams.pickupDate} onChange={handleSearchChange}/>
                    </div>
                    <div className="search-form-group">
                        <label htmlFor="dropDate">Drop Date</label>
                        <input type="date" id="dropDate" name="dropDate" value={searchParams.dropDate} onChange={handleSearchChange}/>
                    </div>
                </div>
                 <div className="search-modal-footer">
                    <button className="search-submit-btn" onClick={handleSearchSubmit}>Search Rides</button>
                </div>
            </div>
        </div>
    );
};

const NoResults = () => (<div className="no-results-container"><CarIcon /><h2>No Cabs Found</h2><p>Try adjusting your search or filter criteria.</p></div>);
const SkeletonCard = () => (<div className="cab-card skeleton"><div className="cab-card-image-wrapper skeleton-box"></div><div className="cab-card-content"><div className="skeleton-box skeleton-title"></div><div className="skeleton-box skeleton-text"></div><div className="skeleton-box skeleton-text"></div><div className="skeleton-box skeleton-footer"></div></div></div>);

// --- Main CarsPage Component ---
export default function CarsPage() {
    const [cabs] = useState(initialCabData);
    const [filteredCabs, setFilteredCabs] = useState([]);
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('price-asc');
    
    const [searchParams, setSearchParams] = useState({ from: '', to: '', pickupDate: '', dropDate: '' });
    const [tempSearchParams, setTempSearchParams] = useState(searchParams);

    const { makes, fuelTypes, priceRange } = useMemo(() => {
        const prices = cabs.map(c => c.perPersonCost).filter(p => p != null);
        return {
            makes: [...new Set(cabs.map(cab => cab.make))],
            fuelTypes: [...new Set(cabs.map(cab => cab.fuelType))],
            priceRange: { min: Math.min(...prices, 0), max: Math.max(...prices, 3000) }
        };
    }, [cabs]);

    const [filters, setFilters] = useState({ make: 'All', fuelType: 'All', seats: 1, price: priceRange.max });
    
    useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        let result = [...cabs];
        if (searchParams.from) result = result.filter(cab => cab.pickupP.toLowerCase().includes(searchParams.from.toLowerCase()));
        if (searchParams.to) result = result.filter(cab => cab.dropP.toLowerCase().includes(searchParams.to.toLowerCase()));
        if (searchParams.pickupDate) result = result.filter(cab => formatDateForInput(cab.pickupD) >= searchParams.pickupDate);
        if (searchParams.dropDate) result = result.filter(cab => formatDateForInput(cab.dropD) <= searchParams.dropDate);
        if (filters.make !== 'All') result = result.filter(cab => cab.make === filters.make);
        if (filters.fuelType !== 'All') result = result.filter(cab => cab.fuelType === filters.fuelType);
        result = result.filter(cab => (cab.seater - cab.seatConfig.filter(s => s.isBooked).length) >= filters.seats);
        result = result.filter(cab => cab.perPersonCost <= filters.price);
        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.perPersonCost - b.perPersonCost;
                case 'price-desc': return b.perPersonCost - a.perPersonCost;
                case 'year-desc': return b.year - a.year;
                default: return 0;
            }
        });
        setFilteredCabs(result);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }, [searchParams, filters, cabs, sortBy]);
    
    const handleTempSearchChange = (e) => {
        const { name, value } = e.target;
        setTempSearchParams(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSearchSubmit = () => {
        setSearchParams(tempSearchParams);
        setSearchModalOpen(false);
    };
    
    const openSearchModal = () => {
        setTempSearchParams(searchParams);
        setSearchModalOpen(true);
    }
    
    const getSearchSummary = () => {
        const { from, to, pickupDate } = searchParams;
        if (!from && !to && !pickupDate) return "Find your next ride...";
        const parts = [];
        if (from) parts.push(from);
        if (to) parts.push(`→ ${to}`);
        if (pickupDate) parts.push(formatDate(pickupDate));
        return parts.join(' ');
    }

    return (
        <>
         <style>{styles}</style>

            <div id="app-container">
                <header className="app-header">
                    <div className="logo-container">
                        <LogoIcon/> Cabs
                    </div>
                    <div className="desktop-search-trigger" onClick={openSearchModal}>
                        <span>{getSearchSummary()}</span>
                        <SearchIcon/> 
                    </div>
                </header>

                <div className="cabs-page-container">
                    <FilterComponent filters={filters} setFilters={setFilters} makes={makes} fuelTypes={fuelTypes} isOpen={isMobileFilterOpen} onClose={() => setMobileFilterOpen(false)} priceRange={priceRange} maxPrice={priceRange.max} />
                    
                    <main className="main-content">
                        <div className="mobile-search-trigger" onClick={openSearchModal}>
                            <SearchIcon/> 
                            <span>{getSearchSummary()}</span>
                        </div>
                        
                        <div className="results-header">
                            <div className="results-count">{isLoading ? 'Searching...' : `${filteredCabs.length} Rides Found`}</div>
                            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="year-desc">Newest First</option>
                            </select>
                        </div>

                        <div className="cab-list">
                           {isLoading ? (
                               Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                           ) : filteredCabs.length > 0 ? (
                               filteredCabs.map(cab => <CabCard key={cab._id} cab={cab} />)
                           ) : (
                               <NoResults />
                           )}
                        </div>
                    </main>
                </div>
                
                <button className="mobile-filter-trigger" onClick={() => setMobileFilterOpen(true)}><FilterIcon /> Filters</button>
                
                <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} searchParams={tempSearchParams} handleSearchChange={handleTempSearchChange} handleSearchSubmit={handleSearchSubmit}/>
            </div>
        </>
    );
}

