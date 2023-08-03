import React from 'react'

function Addcategory() {
  return (
    <div className='setting-container'>
    <div className='setting-head'>
        <h1>Add Category</h1>
    </div>
    <div className='setting-dropdown'>
    <label>Add Category
    <input type='text'/>
    </label>
    </div>
    <button className='sub-button'>Submit</button>
      
    </div>
  )
}

export default Addcategory
