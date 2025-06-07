import React from "react";
import "./skeleton.css";

export default function BookingSkeleton() {
    return (
        <div className="booking-skeleton-card">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-button"></div>
        </div>
    );
}
