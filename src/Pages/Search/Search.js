import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Search() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const handlePlusClick = () => {
    setClick(true);
    navigate("/wins");
  };
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Auction</h1>
      </div>
      <div className="dashboard-section">
        <input type="search" placeholder="search" />
        <BiSearchAlt2 />
      </div>
      <div className="dashboard-section-head">
        <ul className="dashboard-items">
          <li className="heading-vehicle">VEHICLE NO</li>
          <li>RJ25SD0188</li>
          <li>RJ25SD4077</li>
          <li>RJ25SA0000</li>
          <li>RJ25SB0110</li>
          <li>RJ25SB0111</li>
          <li>RJ25SB1111</li>
          <li>RJ25SB5115</li>
        </ul>
        <ul className="dashboard-items-b">
          <li className="heading-vehicle">D LOAN ASSIGNMENT NUMBER</li>
          <li>
            M13765698765{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
          <li>
            M36764477554{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
          <li>
            B78984532187{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
          <li>
            U65654339876{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
          <li>
            K87604532676{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
          <li>
            K45224562110{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
          <li>
            R25863475212{" "}
            <AiOutlinePlusCircle
              onClick={handlePlusClick}
              className="_pointer"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Search;
