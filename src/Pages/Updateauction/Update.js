
import React, {useState} from 'react';
import './Update.css';

function Update() {
    


  return (
    <div className='update-container'>
    <div className='update-dropdown'>
      
      <select >
        <option value="">Select Region</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      
    </div>
    <div className='update-dropdown'>
      
      <select >
        <option value="">Select Seller</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      
    </div>
    <div className='update-dropdown'>
      
      <select >
      <option value="">Select Start Price</option>
        <option value="option0">10% of start price</option>
        <option value="option1">25% of start price</option>
        <option value="option2">50% of start price</option>
        <option value="option3">80% of start price</option>
      </select>
      
    </div>
    <div className='update-dropdown'>
      
      <select >
      <option value="">Select Reserve Price</option>
        <option value="option0">10% of reserve price</option>
        <option value="option1">25% of reserve price</option>
        <option value="option2">50% of reserve price</option>
        <option value="option3">80% of reserve price</option>
      </select>
      
    </div>
    <input type='button' value="Update" className='update-butt'/>
    
    </div>
  );
};

export default Update;

   
