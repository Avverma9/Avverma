import React from "react";
import { FaUser } from "react-icons/fa";

export const AccountSettings = ({ navHandler }) => {

  return (
    <>
      <div
        className="sideBar_options_section"
        onClick={navHandler}
      >
        <FaUser className="svg_logo" />
         <h3> <a href="/profile"> Profile Information</a> </h3>
      </div>
      <div
        className="sideBar_options_section_collapse"
      >
      </div>
      <div className="_underLine" />
    </>
  );
};
