import React from 'react'
import './Filter.css';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineReload } from 'react-icons/ai';

function Filter() {
  return (
    <div className='filter-auction'>
      <div className='filter-auction-heading'>
        <div className='heading-icon'>
          <BsFilter /><span>Filter</span></div>
        <AiOutlineReload />
      </div>
      <div className='filter-inputs'>
        <input type='text' placeholder='Vehicle Type'/>
        <input type='text' placeholder='Auction Type'/>
        <input type='text' placeholder='Business Type'/>

      </div>
      <div className='filter-buttons'>
        <input type='button' value='Cancel'/>
        <input type='button' value='Apply Filter'/>
      </div>

    </div>
  )
}

export default Filter
