import React from "react";
import "./Addauction.css";

export const Addauction = () => {
  return (
    <>
      <div className="dashboard-header">
        <h1>Add Auction</h1>
      </div>
      <div className="add-new-auction-fields">
        <select
          id="region"
          name="Region"
          multiple
          multiselect-select-all="true"
          className="multi-select"
        >
          <option>AP</option>
          <option>AR</option>
        </select>
        <select id="region" name="Region">
          <option>Category 1</option>
          <option>Category 2</option>
        </select>
        <select
          id="region"
          name="Region"
          multiple
          //   multiselect-select-all="true"
          className="multi-select"
        >
          <option>Anil</option>
          <option>Mukesh</option>
        </select>
        <label htmlFor="nameofproduct">
          Name of the product
          <input type="text" placeholder="name" />
        </label>
        <label htmlFor="Registration Number">
          Registration Number
          <input type="number" placeholder="name" />
        </label>
        <label htmlFor="Agreement Number">
          Agreement Number
          <input type="number" placeholder="name" />
        </label>
        <label htmlFor="RC">
          RC
        </label>
      </div>
    </>
  );
};
