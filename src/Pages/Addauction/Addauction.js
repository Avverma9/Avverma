import React from "react";

import "./Addauction.css";

export const Addauction = () => {
  return (
    <div className="addAuction_container">
      <div className="_addauction-select">
        <select name="_addauction-select" id="_addauction-select">
          <option value="">-- Please choose an option --</option>
          <option value="name">Category 1</option>
          <option value="mobile">Category 2</option>
          <option value="email">Category 3</option>
        </select>
      </div>
    </div>
  );
};
