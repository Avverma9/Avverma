import React from "react";
import "./Assignnewauction.css";

export const Assignnewauction = () => {
  return (
    <div className="assign_new_auction">
      <div className="_input_fields">
        <h1>Region</h1>
        <input type="text" value="Uttar Pradesh" />
      </div>
      <div className="_input_fields">
        <h1>Seller</h1>
        <input type="text" value="Uttar Pradesh" />
      </div>
      <div className="_input_fields">
        <h1>Buying Amount</h1>
        <div className="_flex-center">
          <input type="text" value="Rs. 100" />
          <button className="_bid_btn">Bid</button>
        </div>
      </div>
      <div className="_input_fields">
        <h1>Debit</h1>
        <input type="text" value="64886485" />
      </div>
    </div>
  );
};
