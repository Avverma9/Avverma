import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AccountSettings = ({ selectedNav, navHandler }) => {
  // const [isExpanded, setExpanded] = useState(false);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [hoverText, setHoverText] = useState("");

  const hoverHandler = (e) => {
    setHoverText("");
    setHoverText(e.target?.previousSibling?.innerText);
  };
  const navigate = useNavigate("");
  return (
    <>
      <div
        className="sideBar_options_section"
        // {...getToggleProps({
        //   onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        // })}
        onClick={() => navigate("/profile")}
      >
        <FaUser className="svg_logo" />
        <h2>Profile Information</h2>
      </div>
      <div
        className="sideBar_options_section_collapse"
        // {...getCollapseProps()}
      >
        {/* <button className="collapse_list" onClick={navHandler}>
          <p
            className={
              selectedNav === "Profile Information" ? `text-primary` : ``
            }
          >
            Profile Information
          </p>
          <ImProfile
            className={
              selectedNav === "Profile Information" ? `text-primary` : ``
            }
            onMouseOver={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={hoverText}
          />
        </button> */}
        {/* <button className="collapse_list" onClick={navHandler}>
          <p
            className={
              selectedNav === "Mannage Addresses" ? `text-primary` : ``
            }
          >
            Mannage Addresses
          </p>
          <FaAddressBook
            className={
              selectedNav === "Mannage Addresses" ? `text-primary` : ``
            }
            onMouseOver={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={hoverText}
          />
        </button> */}
        {/* <button className="collapse_list" onClick={navHandler}>
          <p
            className={
              selectedNav === "Add Government id" ? `text-primary` : ``
            }
          >
            Add Government id
          </p>
          <HiIdentification
            className={
              selectedNav === "Add Government id" ? `text-primary` : ``
            }
            onMouseOver={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={hoverText}
          />
        </button> */}
      </div>
      <div className="_underLine" />
    </>
  );
};
