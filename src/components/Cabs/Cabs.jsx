import React, { useState, useEffect, useMemo, useRef } from 'react';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { getAllCars } from '../../redux/reducers/car';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../utils/loader';

const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="no-results-icon"><path d="M14 16.5V15a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.5"></path><path d="M2 10h20"></path><path d="M6 11v-1.5a1.5 1.5 0 0 1 3 0V11"></path><path d="M15 11v-1.5a1.5 1.5 0 0 1 3 0V11"></path><path d="M4 19h16"></path><path d="M5 19.5V11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8.5"></path></svg>;
const LogoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toISOString().split('T')[0];
};

const CabCard = ({ cab }) => {
  const navigate = useNavigate();
  const availableSeats = cab.seater - cab.seatConfig.filter(s => s.isBooked).length;
  const placeholderImage = `https://placehold.co/600x400/e0e7ff/4338ca?text=${cab.make.replace(" ", "+")}`;
  const viewDetails = (id) => {
    navigate(`/cab-booking/${id}`);
  };
  return (
    <div className="cab-card">
      <div className="cab-card-image-wrapper">
        <img src={cab.images[0] || placeholderImage} alt={`${cab.make} ${cab.model}`} className="cab-card-image" onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} />
        <span className="cab-card-tag">{cab.vehicleType}</span>
        <span className={`cab-card-status ${availableSeats > 0 ? 'available' : 'full'}`}>{availableSeats > 0 ? `${availableSeats} Seats Available` : 'Fully Booked'}</span>
      </div>
      <div className="cab-card-content">
        <div className="cab-card-header"><h3 className="cab-card-title">{cab.make} {cab.model}</h3><p className="cab-card-year">{cab.year}</p></div>
        <p className="cab-card-route">{cab.pickupP} → {cab.dropP}</p>
        <div className="cab-card-details">
          <div><span className="detail-icon">👥</span><strong>Type:</strong> {cab.sharingType}</div>
          <div><span className="detail-icon">📅</span><strong>Pickup:</strong> {formatDate(cab.pickupD)}</div>
          <div><span className="detail-icon">📅</span><strong>Drop:</strong> {formatDate(cab.dropD)}</div>
        </div>
        <div className="cab-card-tags"><span><span className="tag-icon">⛽</span>{cab.fuelType}</span><span><span className="tag-icon">👤</span>{cab.seater} Seater</span></div>
        <div onClick={() => viewDetails(cab._id)} className="cab-card-footer"><p className="cab-card-price">₹{cab.perPersonCost}<span>/person</span></p><button className="cab-card-button" disabled={availableSeats <= 0}>View</button></div>
      </div>
    </div>
  );
};

const FilterComponent = ({ filters, setFilters, makes, fuelTypes, isOpen, onClose, priceRange, maxPrice, sharingTypes, vehicleTypes }) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);
  const scrollYRef = useRef(0);
  useEffect(() => {
    const lock = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    };
    const unlock = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollYRef.current || 0);
    };
    if (isMobile && isOpen) lock();
    else unlock();
    return () => unlock();
  }, [isMobile, isOpen]);

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === 'number' || type === 'range') val = Number(value);
    setFilters(prev => ({ ...prev, [name]: val }));
  };

  const handleSeatsChange = (increment) => {
    setFilters(prev => ({ ...prev, seats: Math.max(1, (prev.seats || 1) + increment) }));
  };

  const resetFilters = () => setFilters({ make: 'All', fuelType: 'All', seats: 1, price: maxPrice, sharingType: 'All', vehicleType: 'All' });
  if (!isMobile) {
    return (
      <aside className="filter-container">
        <div className="filter-wrapper">
          <div className="filter-header"><h2>Filters</h2><button className="filter-close-btn" onClick={onClose}><CloseIcon /></button></div>
          <div className="filter-group"><div className="price-label"><label htmlFor="price-filter">Max Price</label><span>₹{filters.price}</span></div><input type="range" id="price-filter" name="price" min={priceRange.min} max={priceRange.max} value={filters.price} onChange={handleFilterChange} className="price-slider" /></div>
          <div className="filter-group">
            <label>Seats Required</label>
            <div className="stepper-input">
              <button type="button" onClick={() => handleSeatsChange(-1)} disabled={filters.seats <= 1}>-</button>
              <span>{filters.seats}</span>
              <button type="button" onClick={() => handleSeatsChange(1)}>+</button>
            </div>
          </div>
          <div className="filter-group"><label htmlFor="make-filter">Car Brand</label><select id="make-filter" name="make" value={filters.make} onChange={handleFilterChange}><option value="All">All Brands</option>{makes.map(make => <option key={make} value={make}>{make}</option>)}</select></div>
          <div className="filter-group"><label>Fuel Type</label><div className="radio-group"><label><input type="radio" name="fuelType" value="All" checked={filters.fuelType === 'All'} onChange={handleFilterChange} />All</label>{fuelTypes.map(fuel => (<label key={fuel}><input type="radio" name="fuelType" value={fuel} checked={filters.fuelType === fuel} onChange={handleFilterChange} />{fuel}</label>))}</div></div>
          <div className="filter-group"><label>Sharing Type</label><div className="radio-group"><label><input type="radio" name="sharingType" value="All" checked={filters.sharingType === 'All'} onChange={handleFilterChange} />All</label>{sharingTypes.map(type => (<label key={type}><input type="radio" name="sharingType" value={type} checked={filters.sharingType === type} onChange={handleFilterChange} />{type}</label>))}</div></div>
          <div className="filter-group"><label>Vehicle Type</label><div className="radio-group"><label><input type="radio" name="vehicleType" value="All" checked={filters.vehicleType === 'All'} onChange={handleFilterChange} />All</label>{vehicleTypes.map(type => (<label key={type}><input type="radio" name="vehicleType" value={type} checked={filters.vehicleType === type} onChange={handleFilterChange} />{type}</label>))}</div></div>
          <div className="filter-footer"><button className="filter-reset-btn" onClick={resetFilters}>Reset All Filters</button></div>
        </div>
      </aside>
    );
  }
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 0.28s ease',
  };
  const sheetStyle = {
    width: '100%',
    maxWidth: 980,
    borderRadius: '18px 18px 0 0',
    boxShadow: '0 -10px 25px rgba(0,0,0,0.12)',
    padding: '12px 12px 8px 12px',
    marginBottom: '72px',
    maxHeight: 'calc(100vh - 140px)',
    backgroundColor: 'var(--bg-white)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.32s cubic-bezier(.2,.9,.3,1)',
  };
  const handleStyle = { width: 40, height: 4, backgroundColor: '#d1d5db', borderRadius: 2, alignSelf: 'center', marginBottom: 8 };
  const headerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 4px', borderBottom: '1px solid var(--border-color)', flexShrink: 0 };
  const titleStyle = { fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)' };
  const closeBtnStyle = { background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };
  const contentStyle = { padding: '8px 6px', overflowY: 'auto', WebkitOverflowScrolling: 'touch', flexGrow: 1, overscrollBehavior: 'contain', paddingBottom: 96 };
  const groupStyle = { marginBottom: 10, paddingBottom: 6 };
  const labelStyle = { display: 'block', fontWeight: 700, marginBottom: 6, fontSize: 13, color: 'var(--text-dark)' };
  const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14 };
  const rangeStyle = { width: '100%', cursor: 'pointer', accentColor: 'var(--primary-color)' };
  const radioGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 };
  const radioLabelStyle = { padding: '8px 6px', border: '1px solid var(--border-color)', borderRadius: 8, textAlign: 'center', fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', background: 'white' };
  const footerStyle = { position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to top, rgba(255,255,255,0.92), rgba(255,255,255,0.70))', flexShrink: 0 };
  const resetBtnStyle = { background: 'transparent', border: 'none', color: 'var(--primary-color)', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 };
  const applyBtnStyle = { background: 'linear-gradient(to right, #4f46e5, #6366f1)', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 };
  const stepperContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...inputStyle,
    padding: '0',
  };
  const stepperBtnStyle = {
    background: 'transparent',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: 'var(--primary-color)',
    fontWeight: 'bold',
    lineHeight: 1,
  };
  const stop = (e) => e.stopPropagation();
  const handleApply = () => {
    onClose();
  };
  return (
    <aside style={overlayStyle} onClick={onClose} aria-hidden={!isOpen}>
      <div role="dialog" aria-modal="true" style={sheetStyle} onClick={stop}>
        <div style={handleStyle} />
        <div style={headerStyle}>
          <div style={titleStyle}>Filters</div>
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close filters">
            <CloseIcon />
          </button>
        </div>
        <div style={contentStyle}>
          <div style={groupStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={labelStyle} htmlFor="price-filter">Max Price</label>
              <div style={{ color: 'var(--primary-color)', fontWeight: 600 }}>₹{filters.price}</div>
            </div>
            <input id="price-filter" name="price" type="range" min={priceRange.min} max={priceRange.max} value={filters.price} onChange={handleFilterChange} style={rangeStyle} />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Seats Required</label>
            <div style={stepperContainerStyle}>
              <button type="button" style={{...stepperBtnStyle, borderRight: '1px solid var(--border-color)'}} onClick={() => handleSeatsChange(-1)} disabled={filters.seats <= 1}>-</button>
              <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{filters.seats}</span>
              <button type="button" style={{...stepperBtnStyle, borderLeft: '1px solid var(--border-color)'}} onClick={() => handleSeatsChange(1)}>+</button>
            </div>
          </div>
          <div style={groupStyle}>
            <label style={labelStyle} htmlFor="make-filter">Car Brand</label>
            <select id="make-filter" name="make" value={filters.make} onChange={handleFilterChange} style={inputStyle}>
              <option value="All">All Brands</option>
              {makes.map(make => <option key={make} value={make}>{make}</option>)}
            </select>
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Fuel Type</label>
            <div style={radioGridStyle}>
              <label style={radioLabelStyle}>
                <input type="radio" name="fuelType" value="All" checked={filters.fuelType === 'All'} onChange={handleFilterChange} />
                <span style={{ marginLeft: 6 }}>All</span>
              </label>
              {fuelTypes.map(fuel => (
                <label key={fuel} style={radioLabelStyle}>
                  <input type="radio" name="fuelType" value={fuel} checked={filters.fuelType === fuel} onChange={handleFilterChange} />
                  <span style={{ marginLeft: 6 }}>{fuel}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Sharing Type</label>
            <div style={radioGridStyle}>
              <label style={radioLabelStyle}>
                <input type="radio" name="sharingType" value="All" checked={filters.sharingType === 'All'} onChange={handleFilterChange} />
                <span style={{ marginLeft: 6 }}>All</span>
              </label>
              {sharingTypes.map(t => (
                <label key={t} style={radioLabelStyle}>
                  <input type="radio" name="sharingType" value={t} checked={filters.sharingType === t} onChange={handleFilterChange} />
                  <span style={{ marginLeft: 6 }}>{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Vehicle Type</label>
            <div style={radioGridStyle}>
              <label style={radioLabelStyle}>
                <input type="radio" name="vehicleType" value="All" checked={filters.vehicleType === 'All'} onChange={handleFilterChange} />
                <span style={{ marginLeft: 6 }}>All</span>
              </label>
              {vehicleTypes.map(t => (
                <label key={t} style={radioLabelStyle}>
                  <input type="radio" name="vehicleType" value={t} checked={filters.vehicleType === t} onChange={handleFilterChange} />
                  <span style={{ marginLeft: 6 }}>{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div style={footerStyle}>
          <button type="button" style={resetBtnStyle} onClick={resetFilters}>Reset All</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" style={{ ...resetBtnStyle, background: 'transparent' }} onClick={onClose}>Close</button>
            <button type="button" style={applyBtnStyle} onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const SearchModal = ({ isOpen, onClose, searchParams, handleSearchChange, handleSearchSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <h3>Search for Your Ride</h3>
          <button onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="search-modal-content">
          <div className="search-form-group">
            <label htmlFor="from">From</label>
            <input type="text" id="from" name="from" placeholder="e.g., Patna" value={searchParams.from} onChange={handleSearchChange} />
          </div>
          <div className="search-form-group">
            <label htmlFor="to">To</label>
            <input type="text" id="to" name="to" placeholder="e.g., Delhi" value={searchParams.to} onChange={handleSearchChange} />
          </div>
          <div className="search-form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input type="date" id="pickupDate" name="pickupDate" value={searchParams.pickupDate} onChange={handleSearchChange} />
          </div>
          <div className="search-form-group">
            <label htmlFor="dropDate">Drop Date</label>
            <input type="date" id="dropDate" name="dropDate" value={searchParams.dropDate} onChange={handleSearchChange} />
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

export default function CarsPage() {
  const [cabs, setCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {showLoader, hideLoader} =useLoader()
  const [sortBy, setSortBy] = useState('price-asc');
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({ from: '', to: '', pickupDate: '', dropDate: '' });
  const [tempSearchParams, setTempSearchParams] = useState(searchParams);

  const { makes, fuelTypes, priceRange, sharingTypes, vehicleTypes } = useMemo(() => {
    const prices = cabs.map(c => c.perPersonCost).filter(p => p != null);
    return {
      makes: [...new Set(cabs.map(cab => cab.make))],
      fuelTypes: [...new Set(cabs.map(cab => cab.fuelType))],
      sharingTypes: ['Shared', 'Private'],
      vehicleTypes: ['Car', 'Bus', 'Bike'],
      priceRange: { min: Math.min(...prices, 0), max: Math.max(...prices, 3000) }
    };
  }, [cabs]);

  const [filters, setFilters] = useState({ make: 'All', fuelType: 'All', seats: 1, price: priceRange.max, sharingType: 'All', vehicleType: 'All' });

  useEffect(() => {
    setFilters(prev => ({ ...prev, price: priceRange.max }));
  }, [priceRange.max]);

  useEffect(() => {
    setIsLoading(true);
    showLoader()
    const timer = setTimeout(() => {
      let result = [...cabs];
      if (searchParams.from) result = result.filter(cab => cab.pickupP.toLowerCase().includes(searchParams.from.toLowerCase()));
      if (searchParams.to) result = result.filter(cab => cab.dropP.toLowerCase().includes(searchParams.to.toLowerCase()));
      if (searchParams.pickupDate) result = result.filter(cab => formatDateForInput(cab.pickupD) >= searchParams.pickupDate);
      if (searchParams.dropDate) result = result.filter(cab => formatDateForInput(cab.dropD) <= searchParams.dropDate);
      if (filters.make !== 'All') result = result.filter(cab => cab.make === filters.make);
      if (filters.fuelType !== 'All') result = result.filter(cab => cab.fuelType === filters.fuelType);
      if (filters.sharingType !== 'All') result = result.filter(cab => cab.sharingType === filters.sharingType);
      if (filters.vehicleType !== 'All') result = result.filter(cab => cab.vehicleType === filters.vehicleType);
      result = result.filter(cab => cab.seatConfig.filter(s => !s.isBooked).length >= filters.seats);
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
      hideLoader()
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
  };

  const getSearchSummary = () => {
    const { from, to, pickupDate } = searchParams;
    if (!from && !to && !pickupDate) return "Find your next ride...";
    const parts = [];
    if (from) parts.push(from);
    if (to) parts.push(`→ ${to}`);
    if (pickupDate) parts.push(formatDate(pickupDate));
    return parts.join(' ');
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await dispatch(getAllCars());
        const allCars = response.payload || [];
        setCabs(allCars);
      } catch (error) { console.error("Initial fetch failed:", error); }
    };
    fetchInitialData();
  }, [dispatch]);

  return (
    <>
      <style>{styles}</style>
      <div id="app-container">
        <header className="app-header">
          <div className="logo-container">
            <LogoIcon /> Cabs
          </div>
          <div className="desktop-search-trigger" onClick={openSearchModal}>
            <span>{getSearchSummary()}</span>
            <SearchIcon />
          </div>
        </header>

        <div className="cabs-page-container">
          <FilterComponent filters={filters} setFilters={setFilters} makes={makes} fuelTypes={fuelTypes} isOpen={isMobileFilterOpen} onClose={() => setMobileFilterOpen(false)} priceRange={priceRange} maxPrice={priceRange.max} sharingTypes={sharingTypes} vehicleTypes={vehicleTypes} />

          <main className="main-content">
            <div className="mobile-search-trigger" onClick={openSearchModal}>
              <SearchIcon />
              <span>{getSearchSummary()}</span>
            </div>

            <div className="results-header">
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

        <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} searchParams={tempSearchParams} handleSearchChange={handleTempSearchChange} handleSearchSubmit={handleSearchSubmit} />
      </div>
    </>
  );
}
