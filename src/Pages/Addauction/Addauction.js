import React from "react";

import "./Addauction.css";

export const Addauction = () => {
  return (
    

      <div className="auction-detail">
        <div className="dropdown-flex">
          <div className="region">
            <select className="select-option" id="select-option">
              <option value="">Region</option>
              <option value="name">Region 1</option>
              <option value="mobile">Region 2</option>
              <option value="email">Region 3</option>
            </select>
          </div>
          <div className="category">
            <select className="select-option" id="select-option">
              <option value="">Category</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
            </select>
          </div>
          <div className="seller">
            <select className="select-option" id="select-option">
              <option value="">Seller</option>
              <option value="name">Seller 1</option>
              <option value="mobile">Seller 2</option>
              <option value="email">Seller 3</option>
            </select>
          </div>
        </div>
        <div className="addauction-new">
          <label htmlFor="nameofproduct">Name of the product
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Ragistration Number">Ragistration Number
            <input type="number" placeholder="name"/>
          </label>
          <label htmlFor="Agrement Number">Agrement Number
            <input type="number" placeholder="name"/>
          </label>
          <label htmlFor="RC">RC
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Start Price">Start Price
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Reserve Price">Reserve Price
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Start Time">Start Time
            <input type="date" placeholder="name"/>
          </label>
          <label htmlFor="Start Date">Start Date
            <input type="date" placeholder="name"/>
          </label>
          <label htmlFor="End Time">End Time
            <input type="date" placeholder="name"/>
          </label>
          <label htmlFor="End Date">End Date
            <input type="date" placeholder="name"/>
          </label>
          <label htmlFor="Fuel Type">Fuel Type
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Parking Name">Parking Name
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Parking Address">Parking Address
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Year Of Manufecture">Year Of Manufecture
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Payment Term">Payment Term
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Auction Fees">Auction Fees
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Other Information">Other Information
            <input type="text" placeholder="name"/>
          </label>
          <label htmlFor="Add Photo/Video">Add Photo/Video
            <input type="text" placeholder="Add photo/Video"/>
          </label>
        </div>
      </div>
    
  );
};
