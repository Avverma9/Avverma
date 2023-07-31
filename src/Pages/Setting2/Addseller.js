import React from 'react'

function Addseller() {
  return (
    <div className='setting-container'>
    <div className='setting-head'>
        <h1>Add Seller</h1>
    </div>
    <div className='setting-dropdown'>
    <label>Add Seller
    <select name="_filter-select" id="_filter-select">
              <option value="">Add Seller</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    </div>
    <button className='sub-button'>Submit</button>
      
    </div>
  )
}

export default Addseller
