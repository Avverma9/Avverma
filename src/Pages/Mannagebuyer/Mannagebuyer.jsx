import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Mannagebuyer.css";
import { useNavigate } from "react-router-dom";

export const Mannagebuyer = () => {
  const navigate = useNavigate();
  return (
    <div className="_mannage_buyer_container">
      <div className="_mannage_buyer_header">
        <h1>Mannage Buyer</h1>
        <span>
          <p>Registration of a buyer : 768794562</p>
          <input
            type="button"
            value="View"
            onClick={() => navigate("/buyer-details")}
          />
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
        <table className="_w-100">
          <tr className="table_head">
            <th>Buyer Name</th>
            <th>Phone No</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Raju Kar</td>
            <td>8562788914</td>
            <td>In Active</td>
          </tr>
          <tr>
            <td>Raju Kar</td>
            <td>8562788914</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Raju Kar</td>
            <td>8562788914</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Raju Kar</td>
            <td>8562788914</td>
            <td>In Active</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
