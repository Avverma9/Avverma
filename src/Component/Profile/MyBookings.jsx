import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { TiCancel, TiTick } from "react-icons/ti";
import {
  MdKeyboardArrowRight,
  MdOutlineError,
  MdFactCheck,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const MyBookings = ({ selectedNav, navHandler }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [toolTip, setToolTip] = useState("");
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const hoverHandler = (e) => {
    setToolTip(e.target.parentElement.lastChild.innerText);
  };

  const navigate = useNavigate();

  return (
    <>
      <div
        className="sideBar_options_section"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <BsFillCalendarCheckFill className="svg_logo" />
        <h2>My Bookings</h2>
        <MdKeyboardArrowRight className="arrow_right" />
      </div>
      <div className="sideBar_options_section_collapse" {...getCollapseProps()}>
        <button
          className="collapse_list"
          onClick={() => navigate("cancel-booking")}
        >
          <MdClose
            className={selectedNav === "Cancel Booking" ? `text-primary` : ""}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "Cancel Booking" ? `text-primary` : ""}>
            Cancel Booking
          </p>
        </button>
        <button
          className="collapse_list"
          onClick={() => navigate("confirm-booking")}
        >
          <TiTick
            className={selectedNav === "Confirm Booking" ? `text-primary` : ""}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "Confirm Booking" ? `text-primary` : ""}>
            All Bookings
          </p>
        </button>
        {/* Add more buttons for other booking options as needed */}
      </div>
    </>
  );
};
