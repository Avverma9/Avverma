import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Mannagebuyer.css";

export const Mannagebuyer = () => {
  return (
    <div className="_mannage_buyer_container">
      <div className="_mannage_buyer_header">
        <h1>Mannage Buyer</h1>
        <span>
          <p>Registration of a buyer : 768794562</p>
          <input type="button" value="View" />
        </span>
      </div>
      <div className="_mannage_buyer_body">
        <div className="_search">
          <input type="text" name="" id="" />
          <AiOutlineSearch />
        </div>
        <div className="sorted_option">
          <select name="sorted-option" id="sorted-option-select">
            <option value="">--Please choose an option--</option>
            <option value="name">Name</option>
            <option value="mobile">Mobile Number</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      <div className="_sorted_option_list">
        <div className="_sorted_option_list_header">
          <h1>Buyer Name</h1>
          <h1>Phone No</h1>
          <h1>Status</h1>
        </div>
        <div className="_sorted_option_list_body">
          <p>Raju Kar</p>
          <p>8562788914</p>
          <p>Active</p>
        </div>
      </div>
    </div>
  );
};
