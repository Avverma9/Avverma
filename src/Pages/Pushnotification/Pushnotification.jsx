import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Pushnotification.css";

export const Pushnotification = () => {
  return (
    <div className="push_notification_container">
      <div className="_select_search_region">
        <select name="sorted-option" id="sorted-option-select">
          <option value="">--Please choose an option--</option>
          <option value="name">West Bengal</option>
          <option value="mobile">Bihar</option>
          <option value="email">Uttar Pradesh</option>
        </select>
        <AiOutlineSearch />
          </div>
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <input type="file" name="" id="" />
          <input type="button" value="Send" />
    </div>
  );
};
