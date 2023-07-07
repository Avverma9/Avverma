import React from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  return (
    <div className="setting-container">
      <div className="setting-heading">
        <h1>Settings</h1>
      </div>
      <div className="setting-inputfield">
        <span>
          <p
            className="_pointer"
            onClick={() => navigate("/set-timing")}
            style={{ width: "200px" }}
          >
            Set Auction Timing
          </p>
          <input type="text" />
        </span>
        <span>
          <label>
            Start Price{" "}
            <input
              type="button"
              className="update-button _pointer"
              value="Update"
              onClick={() => navigate("/update-start-price")}
            />
          </label>
          <input type="text" />
        </span>
        <span>
          Add Region
          <input type="text" />
        </span>
        <span>
          Add State
          <input type="text" />
        </span>
        <span>
          Add Seller
          <input type="text" />
        </span>
        <span>
          Add category
          <input type="text" />
        </span>
      </div>
    </div>
  );
}

export default Setting;
