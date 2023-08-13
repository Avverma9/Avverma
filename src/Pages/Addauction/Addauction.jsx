import React, { useState } from "react";
import Select from "react-select";
import {LiaRupeeSignSolid} from 'react-icons/lia';
import { IoMdArrowDropdown } from 'react-icons/io';
import "./Addauction.css";

const category = [
  {
    label: "category1",
    value: "category1",
  },
  {
    label: "category2",
    value: "category2",
  },
  {
    label: "category3",
    value: "category3",
  },
];

const seller = [
  {
    label: "Amar",
    value: "Amar",
  },
  {
    label: "Akbar",
    value: "Akbar",
  },
  {
    label: "Anthony",
    value: "Anthony",
  },
];

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

export const Addauction = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);

  // console.log(selectedOption);
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className="dashboard-header">
        <h1>Add new Auction</h1>
      </div>
      <div className="add-new-auction-fields">
        <Select
          defaultValue={selectedRegion}
          onChange={setSelectedRegion}
          options={states}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Region"
        />
        <Select
          defaultValue={selectedCategory}
          onChange={setSelectedCategory}
          options={category}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Category"
        />
        <Select
          defaultValue={selectedSeller}
          onChange={setSelectedSeller}
          options={seller}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Seller"
        />

        <label htmlFor="nameofproduct">
          <p>Name of the product</p>
          <input
            type="text"
            placeholder="Name of the product"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="Registration Number">
          <p>Registration Number</p>
          <input
            type="number"
            placeholder="Registration Number"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="Agreement Number">
          <p>Agreement Number</p>
          <input
            type="number"
            placeholder="Agreement Number"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="RC">
          <p>RC</p>
          <div className="rc-input">
            <input type="radio" id="yes" name="rc" />
            <label for="yes">Yes</label>
            <input type="radio" id="no" name="rc" />
            <label for="no">No</label>
          </div>
        </label>
        <label htmlFor="start-price">
          <p>Start Price</p>
          <input
            type="text"
            placeholder=<LiaRupeeSignSolid />
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="reserve-price">
          <p>Reserve Price</p>
          <input
            type="text"
            placeholder=<LiaRupeeSignSolid />
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="start-time">
          <p>Start Time</p>
          <input
            type="text"
            placeholder="Start Time"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="start-date">
          <p>Start Date</p>
          <input
            type="text"
            placeholder="Start Date"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="end-time">
          <p>End Time</p>
          <input
            type="text"
            placeholder="End Time"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="end-date">
          <p>End Date</p>
          <input
            type="text"
            placeholder="End Date"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="fuel-type">
          <p>RC</p>
          <div className="fuel-type">
            <input type="radio" id="petrol" name="fuel" />
            <label for="petrol">P</label>
            <input type="radio" id="diesel" name="fuel" />
            <label for="diesel">D</label>
            <input type="radio" id="gas" name="fuel" />
            <label for="gas">G</label>
            <input type="radio" id="e" name="fuel" />
            <label for="e">E</label>
          </div>
        </label>
        <label htmlFor="parking-name">
          <p>Parking Name</p>
          <input
            type="text"
            placeholder="Parking Name"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="parking-address">
          <p>Parking Address</p>
          <input
            type="text"
            placeholder="Address"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="menufecture-year">
          <p>Year of Menufecture</p>
          <input
            type="text"
            placeholder="Year"
            className="basic-multi-select-inputs"
          />
        </label>

        <label htmlFor="payment-mode">
          <p>Payment Term</p>
          <select
            className="basic-multi-select-inputs"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="upi">UPI</option>
            <option value="net-banking">Net Banking</option>
          </select>
        </label>
        <label htmlFor="quatation-validity">
          <p>Quatation Validity</p>
          <input
            type="text"
            placeholder=""
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="auction-fees">
          <p>Auction Fees</p>
          <input
            type="text"
            placeholder="Auction-fees"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="auction-term">
          <p>Auction Term</p>
          <input
            type="text"
            placeholder="Auction-term"
            className="basic-multi-select-inputs"
          />
        </label>
        <div className="textarea">
          <label htmlFor="text-area">
            <p>Other Information </p>
          </label>
        </div>
      </div>
      <div className="cont-2">
        <label htmlFor="add-video">
          <p>Upload Photo/Video</p>
          <input
            type="file"
            placeholder=""
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="add-file">
          <p>Add Valuation File</p>
          <input
            type="file"
            placeholder=""
            className="basic-multi-select-inputs"
          />
        </label>
      </div>
      <div className="submit-btn-1">
        <button className="submit-btn">Submit</button>
      </div>
    </>
  );
};
