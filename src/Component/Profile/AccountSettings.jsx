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
        <h2>Profile Information</h2>
      </div>
      <div
        className="sideBar_options_section_collapse"
      >
      </div>
      <div className="_underLine" />
    </>
  );
};
