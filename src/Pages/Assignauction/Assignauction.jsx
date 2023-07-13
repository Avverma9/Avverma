import React from "react";
import "./Assignauction.css";
import { useNavigate } from "react-router-dom";

export const Assignauction = () => {
  const navigate = useNavigate()
  return (
    <div className="assign_auction_container">
      <div className="assign_auction_table">
        <table>
          <tr className="_auction_table_head">
            <th>Region</th>
            <th>Seller</th>
            <th></th>
          </tr>
          <tr>
            <td>West Bengal</td>
            <td>Tvs Craft</td>
            <td>
              <button className="_cancel_auction_btn">Cancel</button>
            </td>
          </tr>
          <tr>
            <td>West Bengal</td>
            <td>Tvs Craft</td>
            <td>
              <button className="_cancel_auction_btn">Cancel</button>
            </td>
          </tr>
          <tr>
            <td>West Bengal</td>
            <td>Tvs Craft</td>
            <td>
              <button className="_cancel_auction_btn">Cancel</button>
            </td>
          </tr>
        </table>
      </div>
      <button
        className="_assign_auction_btn"
        onClick={() => navigate("/assign-new-auction")}
      >
        Assign New Auction
      </button>
    </div>
  );
};
