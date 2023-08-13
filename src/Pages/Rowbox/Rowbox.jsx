import React from "react";
import "./Rowbox.css";

export const Rowbox = () => {
  return (
    <div className="row_box_container">
      <div className="_input_fields">
        <h1>Name</h1>
        <input type="text" value="abcd" />
      </div>
      <div className="_input_fields">
        <h1>Mobile No</h1>
        <input type="text" value="+918888888888" />
      </div>
      <div className="_input_fields">
        <h1>Email Id</h1>
        <input type="text" value="example@example.com" />
      </div>
      <div className="_input_fields">
        <h1>Password</h1>
        <input type="text" value="hggcd65wdwj" />
      </div>
      <div className="_input_fields">
        <h1>Region</h1>
        <div className="_flex-center row-box-fields">
          <input type="text" value="Uttar Pradesh" />
          <button className="_region-btn">Add Region</button>
          <button className="_region-btn">Remove Region</button>
        </div>
      </div>
    </div>
  );
};
