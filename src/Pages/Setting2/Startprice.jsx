import React from "react";
import { PrevBtn } from "../../Component/PrevBtn.jsx/PrevBtn";

function Startprice() {
  return (
    <div className="setting-container">
      <PrevBtn />
      <div className="setting-head">
        <h1>Set Price</h1>
      </div>
      <div className="setting-dropdown">
        <label>
          Select Region
          <select name="_filter-select" id="_filter-select">
            <option value="">Select Region</option>
            <option value="name">Category 1</option>
            <option value="mobile">Category 2</option>
            <option value="email">Category 3</option>
          </select>
        </label>
        <label>
          Select Seller
          <select name="_filter-select" id="_filter-select">
            <option value="">Select Region</option>
            <option value="name">Category 1</option>
            <option value="mobile">Category 2</option>
            <option value="email">Category 3</option>
          </select>
        </label>
        <label>
          Set Start Price
          <select name="_filter-select" id="_filter-select">
            <option value="">Select Region</option>
            <option value="name">Category 1</option>
            <option value="mobile">Category 2</option>
            <option value="email">Category 3</option>
          </select>
        </label>
      </div>
      <button className="sub-button">Submit</button>
    </div>
  );
}

export default Startprice;
