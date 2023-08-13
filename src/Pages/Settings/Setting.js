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
          <div className="flex-addbtn">
          <input type="text" />
          <button className="add-btn">Add</button>
          </div>
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
          <div className="flex-addbtn">
          <input type="text" />
          <button className="add-btn">Add</button>
          </div>
        </span>
        <span>
          Add Region
          <div className="flex-addbtn">
          <input type="text" />
          <button className="add-btn">Add</button>
          </div>
        </span>
        <span>
          Add State
          <div className="flex-addbtn">
          <input type="text" />
          <button className="add-btn">Add</button>
          </div>
        </span>
        <span>
          Add Seller
          <div className="flex-addbtn">
          <input type="text" />
          <button className="add-btn">Add</button>
          </div>
        </span>
        <span>
          Add category
          <div className="flex-addbtn">
          <input type="text" />
          <button className="add-btn">Add</button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Setting;
