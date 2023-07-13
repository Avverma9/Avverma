import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Mannageadmin.css";

export const Mannageadmin = () => {
  const navigate = useNavigate();
  return (
    <div className="_mannage_buyer_container">
      <div className="_mannage_buyer_header">
        <h1>Mannage Admin</h1>
      </div>
      <div className="_mannage_buyer_body">
        <div className="_search">
          <input type="text" name="" id="" />
          <AiOutlineSearch />
        </div>
        <span>
          <p>Registration of a buyer : 768794562</p>
          <input
            type="button"
            value="View"
            onClick={() => navigate("/register-admin")}
          />
        </span>
      </div>
      <div className="_sorted_option_list">
        <table className="_w-50">
          <tr className="table_head">
            <th>Name</th>
            <th>Email Id</th>
          </tr>
          <tr>
            <td onClick={() => navigate("/row-box")}>Raju Kar</td>
            <td>example@example.com</td>
          </tr>
          <tr>
            <td onClick={() => navigate("/row-box")}>Raju Kar</td>
            <td>example@example.com</td>
          </tr>
          <tr>
            <td onClick={() => navigate("/row-box")}>Raju Kar</td>
            <td>example@example.com</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
