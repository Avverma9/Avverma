import React, { useEffect, useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import './travel-filter.css';
import { useDispatch } from 'react-redux';
import { getTravelByDuration, getTravelByOrder, getTravelByPrice } from '../../redux/reducers/travelSlice';
import { Slider, Box } from '@mui/material'; // Import MUI components

const Filter = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(164990);
    const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
    const [sortByOrder, setSortByOrder] = useState('asc');

    const [minNights, setMinNights] = useState(2); // Minimum nights for duration filter
    const [maxNights, setMaxNights] = useState(9); // Maximum nights for duration filter

    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Debounce effect for price filter
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
        dispatch(getTravelByPrice({ minPrice: debouncedMinPrice, maxPrice: debouncedMaxPrice }));
    }, [debouncedMinPrice, debouncedMaxPrice, dispatch]);

    // Effect for sorting
    useEffect(() => {
        if (sortByOrder) {
            dispatch(getTravelByOrder(sortByOrder));
        }
    }, [sortByOrder, dispatch]);

    // Effect for duration filtering
    useEffect(() => {
        // Dispatch action when duration changes
        dispatch(getTravelByDuration({ minNights, maxNights }));
    }, [minNights, maxNights, dispatch]);

    return (
        <div>
            {/* Filter Drawer for Mobile */}
            <div className={`filter-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="filter-container">
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

                    {/* Price Range with MUI Slider */}
                    <div className="filter-item price-range">
                        <label>Price</label>
                        <Box sx={{ width: 120 }}>
                            <span className="slider-value">₹{minPrice}</span>

                            <Slider
                                value={[minPrice, maxPrice]}
                                onChange={(event, newValue) => {
                                    setMinPrice(newValue[0]);
                                    setMaxPrice(newValue[1]);
                                }}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `₹${value}`}
                                min={500}
                                max={164990}
                                step={100}
                                disableSwap
                            />
                            <span className="slider-value">₹{maxPrice}</span>
                        </Box>
                    </div>

                    {/* Duration Range */}
                    <div className="filter-item duration-range">
                        <label>Duration</label>
                        <Box sx={{ width: 120 }}>
                            <span className="slider-value">{minNights} Nights</span>

                            <Slider
                                value={[minNights, maxNights]}
                                onChange={(event, newValue) => {
                                    setMinNights(newValue[0]);
                                    setMaxNights(newValue[1]);
                                }}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value} Nights`}
                                min={2}
                                max={9}
                                step={1}
                                disableSwap
                            />
                            <span className="slider-value">{maxNights} Nights</span>
                        </Box>
                    </div>

                    {/* Clear and More Filters */}
                    <div className="filter-item more-filters">
                        <a href="#" className="clear-link">
                            Clear
                        </a>
                        <div className="more-filter-link">
                            <MdFilterList />
                            <span>More Filter</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Filter Button (Mobile Only) */}
            <button className="sticky-filter-button" onClick={toggleDrawer}>
                <MdFilterList />
                Filter
            </button>

            {/* Always Visible Filter for Desktop and Larger Screens */}
            <div className="desktop-filter-container">
                <div className="filter-container">
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

                    {/* Price Range with MUI Slider */}
                    <div className="filter-item price-range">
                        <label>Price</label>
                        <Box sx={{ width: 120 }}>
                            <span className="slider-value">₹{minPrice}</span>

                            <Slider
                                value={[minPrice, maxPrice]}
                                onChange={(event, newValue) => {
                                    setMinPrice(newValue[0]);
                                    setMaxPrice(newValue[1]);
                                }}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `₹${value}`}
                                min={500}
                                max={164990}
                                step={100}
                                disableSwap
                            />
                            <span className="slider-value">₹{maxPrice}</span>
                        </Box>
                    </div>

                    {/* Duration Range */}
                    <div className="filter-item duration-range">
                        <label>Duration</label>
                        <Box sx={{ width: 120 }}>
                            <span className="slider-value">{minNights} Nights</span>

                            <Slider
                                value={[minNights, maxNights]}
                                onChange={(event, newValue) => {
                                    setMinNights(newValue[0]);
                                    setMaxNights(newValue[1]);
                                }}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value} Nights`}
                                min={2}
                                max={9}
                                step={1}
                                disableSwap
                            />
                            <span className="slider-value">{maxNights} Nights</span>
                        </Box>
                    </div>

                    {/* Clear and More Filters */}
                    <div className="filter-item more-filters">
                        <a href="/travellers" className="clear-link">
                            Clear
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
