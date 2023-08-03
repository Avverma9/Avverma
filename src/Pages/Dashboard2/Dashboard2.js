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
            <li className="dashboard-b">Live Auction 256</li>
            <li className="dashboard-bu">Pending Auction 56</li>
            <li className="dashboard-but">Complete Auction 85</li>
            <li className="dashboard-butt">Buyer List 78</li>
            <li className="dashboard-butto">Freez User 53</li>
            
        </ul>
      </div>
    </div>
  );
}

export default Dashboard2;
