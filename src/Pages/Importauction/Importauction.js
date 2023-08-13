import React from "react";
import "./Importauction.css";
import { BsCloudArrowUp } from "react-icons/bs";

function Importauction() {
  return (
    <div className="import-auction">
      <div className="import-auction-heading">
        <div className="import-icon">
          <span>Import Auction</span>
        </div>
      </div>
      <div className="import-inputs">
        <div className="_filter-select">
          <select name="_filter-select" id="_filter-select">
            <option value="">-- Please choose an option --</option>
            <option value="cat-1">Category 1</option>
            <option value="cat-2">Category 2</option>
            <option value="cat-3">Category 3</option>
          </select>
        </div>
        <div className="_filter-select">
          <select name="_filter-select" id="_filter-select">
            <option value="">-- Please choose an option --</option>
            <option value="reg-1">Region 1</option>
            <option value="reg-2">Region 2</option>
            <option value="reg-3">Region 3</option>
          </select>
        </div>
        <div className="_filter-select">
          <select name="_filter-select" id="_filter-select">
            <option value="">-- Please choose an option --</option>
            <option value="name">Seller 1</option>
            <option value="mobile">Seller 2</option>
            <option value="email">Seller 3</option>
          </select>
        </div>
      </div>
      <div className="import-buttons">
        <input type="button" value="Upload CSV" />
        <BsCloudArrowUp className="cloud-icon" />
        <input type="button" value="Upload Xlx" />
        <BsCloudArrowUp className="cloud-icons" />
      </div>
    </div>
  );
}

export default Importauction;
