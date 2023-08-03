import React, { useState } from "react";
import {GiOlive} from 'react-icons/gi';
import {CgStopwatch} from 'react-icons/cg';
import {MdIncompleteCircle} from 'react-icons/md';
import {BsCheckAll} from 'react-icons/bs';
import {BsSnow2} from 'react-icons/bs';

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
            <li className="dashboard-b"><GiOlive/>Live Auction 256</li>
            <li className="dashboard-bu"><CgStopwatch/>Pending Auction 56</li>
            <li className="dashboard-but"><MdIncompleteCircle/>Complete Auction 85</li>
            <li className="dashboard-butt"><BsCheckAll/>Total Buyers 78</li>
            <li className="dashboard-butto"><BsSnow2/>Freez User 53</li>
            
        </ul>
      </div>
    </div>
  );
}

export default Dashboard2;
