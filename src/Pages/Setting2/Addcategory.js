import React from 'react'

function Addcategory() {
  return (
    <div className='setting-container'>
    <div className='setting-head'>
        <h1>Add Category</h1>
    </div>
    <div className='setting-dropdown'>
    <label>Add Category
    <select name="_filter-select" id="_filter-select">
              <option value="">Add Category</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    </div>
    <button>Submit</button>
      
    </div>
  )
}

export default Addcategory
