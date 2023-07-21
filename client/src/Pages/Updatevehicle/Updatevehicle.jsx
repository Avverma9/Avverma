import React from "react";
import "./Updatevehicle.css";

export const Updatevehicle = () => {
  return (
    <div className="update_vehicle_container">
      <div className="_update_vehicle_header">
        <h1>Number of Vehicle</h1>
        <input type="button" value="Update" />
      </div>
      <input type="text" value="10" />
    </div>
  );
};
