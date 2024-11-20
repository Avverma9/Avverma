import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';
import './travel-filter.css';

const Filter = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Toggle the drawer open/close
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div>
            {/* Filter Drawer for Mobile */}
            <div className={`filter-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="filter-container">
                    {/* From City */}
                    <div className="filter-item from-city">
                        <label>From City</label>
                        <div className="dropdown">
                            <FaMapMarkerAlt className="icon" />
                            <select>
                                <option>New Delhi</option>
                            </select>
                        </div>
                    </div>

                    {/* Sorted By */}
                    <div className="filter-item sorted-by">
                        <label>Sorted By</label>
                        <select className="sorted-select">
                            <option>Select</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="filter-item price-range">
                        <label>Price</label>
                        <div className="slider">
                            <span className="slider-value">₹3500</span>
                            <input type="range" min="3500" max="164990" />
                            <span className="slider-value">₹164990</span>
                        </div>
                    </div>

                    {/* Duration Range */}
                    <div className="filter-item duration-range">
                        <label>Duration</label>
                        <div className="slider">
                            <span className="slider-value">2</span>
                            <input type="range" min="2" max="9" />
                            <span className="slider-value">9</span>
                        </div>
                    </div>

                    {/* Package Type */}
                    <div className="filter-item package-type">
                        <label>Package Type</label>
                        <div className="package-buttons">
                            <button className="package-button active">With Flights</button>
                            <button className="package-button">Without Flights</button>
                        </div>
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
                <MdFilterList  />
                Filter
            </button>

            {/* Always Visible Filter for Desktop and Larger Screens */}
            <div className="desktop-filter-container">
                <div className="filter-container">
                    {/* From City */}
                    <div className="filter-item from-city">
                        <label>From City</label>
                        <div className="dropdown">
                            <FaMapMarkerAlt className="icon" />
                            <select>
                                <option>New Delhi</option>
                            </select>
                        </div>
                    </div>

                    {/* Sorted By */}
                    <div className="filter-item sorted-by">
                        <label>Sorted By</label>
                        <select className="sorted-select">
                            <option>Select</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="filter-item price-range">
                        <label>Price</label>
                        <div className="slider">
                            <span className="slider-value">₹3500</span>
                            <input type="range" min="3500" max="164990" />
                            <span className="slider-value">₹164990</span>
                        </div>
                    </div>

                    {/* Duration Range */}
                    <div className="filter-item duration-range">
                        <label>Duration</label>
                        <div className="slider">
                            <span className="slider-value">2</span>
                            <input type="range" min="2" max="9" />
                            <span className="slider-value">9</span>
                        </div>
                    </div>

                    {/* Package Type */}
                    {/* <div className="filter-item package-type">
                        <label>Package Type</label>
                        <div className="package-buttons">
                            <button className="package-button active">With Flights</button>
                            <button className="package-button">Without Flights</button>
                        </div>
                    </div> */}

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
        </div>
    );
};

export default Filter;
