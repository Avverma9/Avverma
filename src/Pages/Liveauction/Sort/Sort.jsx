import React from 'react'
import {BiSortAlt2} from 'react-icons/bi';
import { AiOutlineReload } from 'react-icons/ai';
import './Sort.css';

function Sort() {
  return (
    <div className='sort-auction'>
      <div className='sort-auction-heading'>
        <div className='sort-heading-icon'>
          <BiSortAlt2 /><span>Sort</span></div>
        <AiOutlineReload />
      </div>
      <div className='sortbytime'>
      <div className='sort-endtime'>
        <h1>End Time</h1>
        <label>
        <input type='radio' name='sooner-later' value='sooner-later'/>Sooner-Later</label>
      </div>
      <div className='sort-endtime'>
        <h1>End Time</h1>
        <label>
        <input type='radio' name='sooner-later' value='later-sooner'/>Later-Sooner</label>
      </div>
      <div className='sort-endtime'>
        <h1>Vehicle-Count</h1>
        <label>
        <input type='radio' name='sooner-later' value='low-high'/>Low-High</label>
      </div>
      <div className='sort-endtime'>
        <h1>Vehicle-Count</h1>
        <label>
        <input type='radio' name='sooner-later' value='high-low'/>High-Low</label>
      </div>
      </div>
      

    </div>
  )
}

export default Sort
