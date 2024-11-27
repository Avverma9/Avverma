import React, { useEffect, useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import './travel-filter.css';
import { useDispatch } from 'react-redux';
import { getTravelByDuration, getTravelByOrder, getTravelByPrice, getTravelByThemes } from '../../redux/reducers/travelSlice';
import { Button } from 'react-bootstrap';
import { useLoader } from '../../utils/loader';
import Slider from 'react-slider'; // Ensure you are using react-slider

const Filter = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(164990);
    const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
    const [sortByOrder, setSortByOrder] = useState('asc');
    const [isMoreFilterOpen, setIsMoreFilterOpen] = useState(false);
    const [minNights, setMinNights] = useState(2); // Minimum nights for duration filter
    const [maxNights, setMaxNights] = useState(9); // Maximum nights for duration filter
    const [selectedThemes, setSelectedThemes] = useState([]); // State for selected themes
    const { showLoader, hideLoader } = useLoader();
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleMoreFilter = () => setIsMoreFilterOpen(!isMoreFilterOpen);

    // Handle theme checkbox changes
    const handleThemeChange = (event) => {
        const theme = event.target.value;
        setSelectedThemes((prevThemes) => {
            if (prevThemes.includes(theme)) {
                return prevThemes.filter((t) => t !== theme); // Remove theme if unchecked
            } else {
                return [...prevThemes, theme]; // Add theme if checked
            }
        });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedMinPrice(minPrice);
            setDebouncedMaxPrice(maxPrice);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [minPrice, maxPrice]);

    // Effect for price filtering
    useEffect(() => {
        showLoader();
        try {
            dispatch(getTravelByPrice({ minPrice: debouncedMinPrice, maxPrice: debouncedMaxPrice }));
        } catch (error) {
            console.error(error);
        } finally {
            hideLoader();
        }
    }, [debouncedMinPrice, debouncedMaxPrice, dispatch]);

    // Effect for sorting
    useEffect(() => {
        if (sortByOrder) {
            dispatch(getTravelByOrder(sortByOrder));
        }
    }, [sortByOrder, dispatch]);

    // Effect for themes filtering
    useEffect(() => {
        if (selectedThemes.length > 0) {
            dispatch(getTravelByThemes(selectedThemes)); // Pass selected themes
        } else {
            dispatch(getTravelByOrder(sortByOrder)); // Refetch data by sortByOrder if no themes selected
        }
    }, [selectedThemes, dispatch, sortByOrder]);

    // Effect for duration filtering
    useEffect(() => {
        // Dispatch action when duration changes
        dispatch(getTravelByDuration({ minNights, maxNights }));
    }, [minNights, maxNights, dispatch]);

    // Shared filter components
    const FilterComponent = ({ isMobile }) => (
        <>
            {/* Sorted By */}
            <div className="filter-item sorted-by">
                <label>Sorted By</label>
                <select
                    className="sorted-select"
                    value={sortByOrder}
                    onChange={(e) => setSortByOrder(e.target.value)} // Handle sort order change
                >
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {/* Price Range with react-slider */}
            <div className="filter-item price-range">
                <label>Price</label>
                <div className="slider-container">
                    <Slider
                        value={[minPrice, maxPrice]}
                        onChange={(newValue) => {
                            setMinPrice(newValue[0]);
                            setMaxPrice(newValue[1]);
                        }}
                        min={500}
                        max={164990}
                        step={100}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    background: '#e4e4e4',
                                    height: '8px',
                                    borderRadius: '4px',
                                }}
                            />
                        )}
                        renderThumb={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    backgroundColor: '#0061f2',
                                    height: '16px',
                                    width: '16px',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                }}
                            />
                        )}
                    />
                    <span className="slider-value">
                        ₹{minPrice} - ₹{maxPrice}
                    </span>
                </div>
            </div>

            {/* Duration Range with react-slider */}
            <div className="filter-item duration-range">
                <label>Duration</label>
                <div className="slider-container">
                    <Slider
                        value={[minNights, maxNights]}
                        onChange={(newValue) => {
                            setMinNights(newValue[0]);
                            setMaxNights(newValue[1]);
                        }}
                        min={2}
                        max={9}
                        step={1}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    background: 'gray',
                                    height: '8px',
                                    borderRadius: '4px',
                                }}
                            />
                        )}
                        renderThumb={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    backgroundColor: '#0061f2',
                                    height: '16px',
                                    width: '16px',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                }}
                            />
                        )}
                    />
                    <span className="slider-value">
                        {minNights} - {maxNights} Nights
                    </span>
                </div>
            </div>

            {/* Clear and More Filters */}
            <div className="filter-item more-filters">
                <a href="/travellers" className="clear-link">
                    Clear
                </a>
                <Button className="more-filter-link" onClick={toggleMoreFilter}>
                    <MdFilterList />
                    <span>More Filter</span>
                </Button>
            </div>

            {isMoreFilterOpen && (
                <div className={`themes-container ${isMoreFilterOpen ? 'slide-in' : 'slide-out'}`}>
                    <label className="theme-label">Themes</label>
                    <div className="themes-options">
                        <label>
                            <input
                                type="checkbox"
                                value="Winter"
                                checked={selectedThemes.includes('Winter')}
                                onChange={handleThemeChange}
                            />
                            Winter
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Summer"
                                checked={selectedThemes.includes('Summer')}
                                onChange={handleThemeChange}
                            />
                            Summer
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Honeymoon"
                                checked={selectedThemes.includes('Honeymoon')}
                                onChange={handleThemeChange}
                            />
                            Honeymoon
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Romantic"
                                checked={selectedThemes.includes('Romantic')}
                                onChange={handleThemeChange}
                            />
                            Romantic
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Adventure"
                                checked={selectedThemes.includes('Adventure')}
                                onChange={handleThemeChange}
                            />
                            Adventure
                        </label>
                        <label>
                            <input type="checkbox" value="Beach" checked={selectedThemes.includes('Beach')} onChange={handleThemeChange} />
                            Beach
                        </label>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div>
            {/* Mobile View */}
            <div className={`filter-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="mobile-filter-container">
                    <FilterComponent isMobile />
                </div>
            </div>

            {/* Sticky Filter Button (Mobile Only) */}
            <button className="sticky-filter-button" onClick={toggleDrawer}>
                <MdFilterList />
                Filter
            </button>

            {/* Desktop View */}
            <div className="desktop-filter-container">
                <div className="filter-container">
                    <FilterComponent isMobile={false} />
                </div>
            </div>
        </div>
    );
};

export default Filter;
