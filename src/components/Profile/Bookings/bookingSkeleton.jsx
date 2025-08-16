import React from "react";
import "./bookingSkeleton.css";

export default function BookingSkeleton() {
  return (
    <div className="booking-skeleton-container">
      {[...Array(2)].map((_, i) => (
        <div className="skeleton-booking-card" key={i}>
          <div className="skeleton-title"></div>
          <div className="skeleton-row icon-row"></div>
          <div className="skeleton-row icon-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row icon-row"></div>
          <div className="skeleton-divider"></div>
          <div className="skeleton-buttons">
            <div className="skeleton-button"></div>
            <div className="skeleton-button filled"></div>
          </div>
        </div>
      ))}

      <div className="skeleton-pagination"></div>
    </div>
  );
}
