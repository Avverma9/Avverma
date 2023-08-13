import React, { useState } from "react";
import { GoClock } from "react-icons/go";
import { VscLocation } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import "./Bidcard.css";
import { dieselIcon } from "../../assets";
import { FiEdit } from "react-icons/fi";

export const Bidcard = () => {
  const [isopen,setIsopen] = useState(false);
  const [selectoption,setSelectoption]=useState('status');
const dropdownopen=()=>{
  setIsopen(!isopen);
}
const handleOptionClick = (option) => {
  setSelectoption(option);
  setIsopen(false);
}
const [isEditing,setIsEditing]=useState(false);
const [h4Text,setH4Text] = useState({
  item: "Tata Ace Gold Fully Built",
  wb: "WB11F0091",
  reg: "Reg: Not Available",
  mfg: "Mfg 2020",
  diesel: "Diesel",
  repo: "Repo 19 May 23",
  location: "Kolkata",
  ldd: "LDD: N/A",
  cvl: "CVL64557666867",
  regNA: "Reg: N/A",
});
const handleEditClick=()=>{
  setIsEditing(true);
};
const handleSaveClick=()=>{
  setIsEditing(false);
}
const handleInputChange = (event, field) => {
  setH4Text((prevState) => ({
    ...prevState,
    [field]: event.target.value,
  }));
};
  return (
    <div className="bid_container">
      <div className="bid_header">
        <GoClock />
        <p>Won on 17 Jul 23</p>
        <div className="status-dropdown">
          <button className="status-btn" onClick={dropdownopen}>{selectoption}</button>
          {isopen && (
            <ul className="dropdownmenu">
              <li onClick={() => handleOptionClick('Completed')}>Completed</li>
              <li onClick={() => handleOptionClick('Pending')}>Pending</li>
            </ul>
          )}
        </div>
      </div>
      <>

      <div className="flex-btn">
       
      
      <div className="bid_item">
        {isEditing ? (
          <input
            type="text"
            value={h4Text.item}
            onChange={(e) => handleInputChange(e, "item")}
          />
        ) : (
          <h4>{h4Text.item}</h4>
        )}
      </div>
      <button className="edit-btn" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? "Save" : <FiEdit/>}
        </button>
      </div>
      <div className="bid_body">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.acedms.com%2Fphotos%2Flisting%2F2020-09-08%2F48a83f44d5836cf7f3c0304fea2e06d0_extra_large.jpg&f=1&nofb=1&ipt=f3795f26093deccfcc8b544459e25c123d84e37f2966ec44373bfc303feb6b04&ipo=images"
          alt="bid_item"
          srcSet=""
        />
        <table className="bid_detail_table">
          <tr>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.wb}
                  onChange={(e) => handleInputChange(e, "wb")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.wb}</h4>
                </span>
              )}
            </td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.reg}
                  onChange={(e) => handleInputChange(e, "reg")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.reg}</h4>
                </span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.mfg}
                  onChange={(e) => handleInputChange(e, "mfg")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.mfg}</h4>
                </span>
              )}
            </td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.diesel}
                  onChange={(e) => handleInputChange(e, "diesel")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.diesel}</h4>
                </span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.repo}
                  onChange={(e) => handleInputChange(e, "repo")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.repo}</h4>
                </span>
              )}
            </td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.location}
                  onChange={(e) => handleInputChange(e, "location")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.location}</h4>
                </span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.ldd}
                  onChange={(e) => handleInputChange(e, "ldd")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.ldd}</h4>
                </span>
              )}
            </td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.cvl}
                  onChange={(e) => handleInputChange(e, "cvl")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.cvl}</h4>
                </span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={h4Text.regNA}
                  onChange={(e) => handleInputChange(e, "regNa")}
                />
              ) : (
                <span>
                  <SlCalender />
                  <h4>{h4Text.regNA}</h4>
                </span>
              )}
            </td>
            
          </tr>
          {/* Add other rows for each field */}
        </table>
        {/* ... */}
      </div></>
    </div>
    
  );
};
        
  
