import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {


  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li >
          <Link to="/admin/add/hotel">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
  
      </ul>
    </div>
  );
}

export default Sidebar;
