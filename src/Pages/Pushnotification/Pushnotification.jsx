import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import "./Pushnotification.css";

const states = [
  {
    label: "Andaman and Nicobar Islands",
    value: "AN",
  },
  {
    // Indian States List Array
    label: "Andhra Pradesh",
    value: "AP",
  },
  {
    label: "Arunachal Pradesh",
    value: "AR",
  },
  {
    label: "Assam",
    value: "AS",
  },
  {
    label: "Bihar",
    value: "BR",
  },
  {
    label: "Chandigarh",
    value: "CH",
  },
  {
    label: "Chhattisgarh",
    value: "CG",
  },
  {
    label: "Dadra and Nagar Haveli",
    value: "DH",
  },
  {
    label: "Daman and Diu",
    value: "DD",
  },
  {
    label: "Delhi",
    value: "DL",
  },
  {
    label: "Goa",
    value: "GA",
  },
  {
    label: "Gujarat",
    value: "GJ",
  },
  {
    label: "Haryana",
    value: "HR",
  },
  {
    label: "Himachal Pradesh",
    value: "HP",
  },
  {
    label: "Jammu and Kashmir",
    value: "JK",
  },
  {
    label: "Jharkhand",
    value: "JH",
  },
  {
    label: "Karnataka",
    value: "KA",
  },
  {
    label: "Kerala",
    value: "KL",
  },
  {
    label: "Kerala",
    value: "KL",
  },
  {
    label: "Lakshadweep",
    value: "LD",
  },
  {
    label: "Maharashtra",
    value: "MH",
  },
  {
    label: "Manipur",
    value: "MN",
  },
  {
    label: "Meghalaya",
    value: "ML",
  },
  {
    label: "Mizoram",
    value: "MZ",
  },
  {
    label: "Nagaland",
    value: "NL",
  },
  {
    label: "Orissa",
    value: "OR",
  },
  {
    label: "Punjab",
    value: "PB",
  },
  {
    label: "Pondicherry",
    value: "PY",
  },
  {
    label: "Rajasthan",
    value: "RJ",
  },
  {
    label: "Sikkim",
    value: "SK",
  },
  {
    label: "Tamil Nadu",
    value: "TN",
  },
  {
    label: "Tripura",
    value: "TR",
  },
  {
    label: "Uttarakhand",
    value: "UK",
  },
  {
    label: "Uttar Pradesh",
    value: "UP",
  },
  {
    label: "West Bengal",
    value: "WB",
  },
];

export const Pushnotification = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="push_notification_container">
      <div className="push_notification-header">
        <h1>Push Notification</h1>
      </div>
      <div className="_select_search_region">
        {/* <select name="sorted-option" id="sorted-option-select">
          <option value="">--Please choose an option--</option>
          <option value="name">West Bengal</option>
          <option value="mobile">Bihar</option>
          <option value="email">Uttar Pradesh</option>
        </select> */}
        <Select
          defaultValue={selectedRegion}
          onChange={setSelectedRegion}
          options={states}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Region"
        />
        {/* <AiOutlineSearch /> */}
      </div>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <input type="file" name="" id="" />
      <input type="button" value="Send" />
    </div>
  );
};
