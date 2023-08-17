import React from "react";
import "../Setting2/Setting2.css";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiMoneyCheck1 } from "react-icons/ci";
import { PiTrainRegionalThin } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { TbCategory } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDropright } from "react-icons/io";

function Setting2() {
  return (
    <div className="setting-page">
      <div className="setting-content">
        <div className="setting-heading">
          <h1>Setting</h1>
        </div>
        <div className="setting-item">
          <ul>
            <li>
              <Link to="/set-auction-timing">
                <div className="first2">
                  <AiOutlineClockCircle />
                  <h5>Set Auction Timing</h5>
                </div>
                <IoIosArrowDropright />
              </Link>
            </li>
            <li>
              <Link to="/start-price">
                <div className="first2">
                  <CiMoneyCheck1 />
                  <h5>Start Price</h5>
                </div>
                <IoIosArrowDropright />
              </Link>
            </li>
            <li>
              <Link to="/add-region">
                <div className="first2">
                  <PiTrainRegionalThin />
                  <h5>Add Region</h5>
                </div>
                <IoIosArrowDropright />
              </Link>
            </li>
            <li>
              <Link to="/add-seller">
                <div className="first2">
                  <CgProfile />
                  <h5>Add Seller</h5>
                </div>
                <IoIosArrowDropright />
              </Link>
            </li>
            <li>
              <Link to="/add-category">
                <div className="first2">
                  <TbCategory />
                  <h5>Add Category</h5>
                </div>
                <IoIosArrowDropright />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Setting2;
