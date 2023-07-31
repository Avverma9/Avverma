import React, { useState } from "react";

import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";

function Dashboard2() {
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      
      <div className="dashboard-section-head">
        <ul className="dashboard-content">
            <li>Live Auction</li>
            <li>Pending Auction</li>
            <li>Complete Auction</li>
            <li>Buyer List</li>
            <li>Freez User</li>
            
        </ul>
        <ul className="dashboard-content-value">
          <li>256</li>
          <li>25</li>
          <li>231</li>
          <li>5</li>
          <li>4</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard2;
