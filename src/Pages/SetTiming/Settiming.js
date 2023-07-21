import React from 'react'
import './Settiming.css';

function Settiming() {
  return (
    <div className='setting-container'>
    <div className='setting-heading'>
        <h1>Settings</h1>
    </div>
    <div className='setting-inputfield'>
        <span>Select Region
        <input type="text"/></span>
        <span>Select Seller 
        <input type="text"/></span>
        <span>Select Date
        <input type="text"/></span>
        <span>Select Time
        <input type="text"/></span>
        <span>Interval Time
        <input type="text"/></span>
        <input type="submit" value="Submit"/>
    </div>
      

    </div>
  )
}

export default Settiming
