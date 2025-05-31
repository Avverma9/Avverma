import React from "react";
import "./Search.css";

const SearchSkeleton = () => {
  return (
    <div className="search-bar skeleton">
      <div className="skeleton-item skeleton-date-picker"></div>
      <div className="skeleton-item skeleton-date-picker"></div>
      <div className="skeleton-item skeleton-dropdown"></div>
      <div className="skeleton-item skeleton-dropdown"></div>
      <div style={{ display: "flex", flex: 2, gap: "5px" }}>
        <div className="skeleton-item skeleton-search-input"></div>
        <div className="skeleton-item skeleton-location-icon"></div>
      </div>
      <div className="skeleton-item skeleton-search-btn"></div>
    </div>
  );
};

export default SearchSkeleton;
