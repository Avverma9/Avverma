import { useState } from "react";
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

export const MyBookings = ({ selectedNav, navHandler, reset, refresh }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [toolTip, setToolTip] = useState("");
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const hoverHandler = (e) => {
    setToolTip(e.target.parentElement.lastChild.innerText);
  };
  const navigate = useNavigate("");
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
            className={selectedNav === "Cancel Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "Cancel Booking" ? `text-primary` : ``}>
            Cancel Booking
          </p>
        </button>
        <button
          className="collapse_list"
          onClick={() => navigate("confirm-booking")}
        >
          <TiTick
            className={selectedNav === "Confirm Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p
            className={selectedNav === "Confirm Booking" ? `text-primary` : ``}
          >
            Confirm Booking
          </p>
        </button>
        <button
          className="collapse_list"
          onClick={() => navigate("check-in-booking")}
        >
          <MdCheckCircle
            className={selectedNav === "CheckedIn Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p
            className={selectedNav === "CheckedIn Booking" ? `text-primary` : ``}
          >
            CheckedIn Booking
          </p>
        </button>
        <button
          className="collapse_list"
          onClick={() => navigate("check-out-booking")}
        >
          <MdFactCheck
            className={
              selectedNav === "Check Out Booking" ? `text-primary` : ``
            }
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p
            className={
              selectedNav === "Check Out Booking" ? `text-primary` : ``
            }
          >
            Check Out Booking
          </p>
        </button>
        <button
          className="collapse_list"
          onClick={() => navigate("no-show-booking")}
        >
          <TiCancel
            className={selectedNav === "NoShow Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "NoShow Booking" ? `text-primary` : ``}>
            NoShow Booking
          </p>
        </button>
        <button
          className="collapse_list"
          onClick={() => navigate("failed-booking")}
        >
          <MdOutlineError
            className={selectedNav === "Failed Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "Failed Booking" ? `text-primary` : ``}>
            Failed Booking
          </p>
        </button>
      </div>
      <div className="_underLine" />
    </>
  );
};
