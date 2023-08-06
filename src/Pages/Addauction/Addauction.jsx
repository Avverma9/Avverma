import React, { useState } from "react";
import Select from "react-select";
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
  return (
    <>
      <div className="dashboard-header">
        <h1>Add Auction</h1>
      </div>
      <div className="add-new-auction-fields">
        <Select
          defaultValue={selectedRegion}
          onChange={setSelectedRegion}
          options={states}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Region"
        />
        <Select
          defaultValue={selectedCategory}
          onChange={setSelectedCategory}
          options={category}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Category"
        />
        <Select
          defaultValue={selectedSeller}
          onChange={setSelectedSeller}
          options={seller}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Seller"
        />

        <label htmlFor="nameofproduct">
          <p>Name of the product</p>
          <input type="text" placeholder="name" />
        </label>
        <label htmlFor="Registration Number">
          <p>Registration Number</p>
          <input type="number" placeholder="name" />
        </label>
        <label htmlFor="Agreement Number">
          <p> Agreement Number</p>
          <input type="number" placeholder="name" />
        </label>
      </div>
    </>
  );
};
