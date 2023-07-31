import React from 'react'

function Setauctiontime() {
  return (
    <div className='setting-container'>
    <div className='setting-head'>
        <h1>Setting Set Auction Timing</h1>
    </div>
    <div className='setting-dropdown'>
    <label>Select Region
    <select name="_filter-select" id="_filter-select">
              <option value="">Select Region</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    <label>Select Seller
    <select name="_filter-select" id="_filter-select">
              <option value="">Select Seller</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    <label>Select Date
    <select name="_filter-select" id="_filter-select">
              <option value="">Select Date</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    <label>Select a Time
    <input type='text' placeholder='Time'/>
    </label>
    <label>Time Interval
    <input type='text' placeholder='Interval Time'/>
    </label>
    </div>
    <button className='sub-button'>Submit</button>
      
    </div>
  )
}

export default Setauctiontime
