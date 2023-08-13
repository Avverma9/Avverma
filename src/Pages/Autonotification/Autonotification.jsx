import React from "react";
import "./Autonotification.css";

export const Autonotification = () => {
  return (
    <div className="_auto_notification_container">
      <div className="_input_fields">
        <h1>Seller Name</h1>
        <input type="text" value="abcd" />
      </div>
      <div className="_input_fields">
        <h1>Deactive Amount</h1>
        <input type="text" value="Rs. 1000" />
      </div>
      <div className="_input_fields">
        <h1>Emd</h1>
        <input type="text" value="Rs. 1000" />
      </div>
      <div className="_input_fields">
        <h1>Region</h1>
        <input type="text" value="Uttar Pradesh" />
      </div>
    </div>
  );
};
