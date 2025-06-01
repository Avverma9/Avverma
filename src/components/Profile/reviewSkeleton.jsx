import React from "react";
import "./reviewSkeleton.css";

export default function ReviewSkeleton() {
  return (
    <div className="review-skeleton-container">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="review-skeleton-card">
          <div className="skeleton-user-img"></div>
          <div className="skeleton-review-content">
            <div className="skeleton-user-info">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line shorter"></div>
            </div>
            <div className="skeleton-line full"></div>
            <div className="skeleton-line full"></div>
            <div className="skeleton-stars"></div>
          </div>
          <div className="skeleton-delete-icon"></div>
        </div>
      ))}
      <div className="skeleton-pagination"></div>
    </div>
  );
}
