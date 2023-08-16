import React, { useState } from "react";
import "./RegisterBuyer.css";
import { PrevBtn } from "../../Component/PrevBtn.jsx/PrevBtn";

function RegisterBuyer() {
  const [buyerData, setBuyerData] = useState({
    buyerName: "",
    pinCode: "",
    mobileNumber: "",
    email: "",
    region: "",
    accountStatus: "Active",
    username: "",
    password: "",
    vehicleLimit: "",
    buyingAmount: "",
    registrationDate: "",
    expiryDate: "",
    panId: "",
    address: "",
    kycVerification: "notverified",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerData({ ...buyerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", buyerData);
    alert("Data submitted successfully");
    setBuyerData({
      buyerName: "",
      pinCode: "",
      mobileNumber: "",
      email: "",
      region: "",
      accountStatus: "Active",
      username: "",
      password: "",
      vehicleLimit: "",
      buyingAmount: "",
      registrationDate: "",
      expiryDate: "",
      panId: "",
      address: "",
      kycVerification: "notverified",
    });
    alert("Data submitted");
  };

  return (
    <div className="main-container">
      <PrevBtn />
      <div className="page-heading">
        <h1>Register Buyer</h1>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="buyer-name">
          <p>Buyer Name</p>
          <input
            type="text"
            name="buyerName"
            value={buyerData.buyerName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="pin-code">
          <p>Pin Code</p>
          <input
            type="text"
            name="pinCode"
            value={buyerData.pinCode}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="mobile-no">
          <p>Mobile Number</p>
          <input
            type="text"
            name="mobileNumber"
            value={buyerData.mobileNumber}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="mail-id">
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={buyerData.email}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="region">
          <p>Region</p>
          <input
            type="text"
            name="region"
            value={buyerData.region}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="acc-status">
          <p>Account Status</p>
          <select
            name="accountStatus"
            value={buyerData.accountStatus}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <label htmlFor="user-name">
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={buyerData.username}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={buyerData.password}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="vehicle-limit">
          <p>Vehicle Limit</p>
          <input
            type="text"
            name="vehicleLimit"
            value={buyerData.vehicleLimit}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="buying-amount">
          <p>Buying Amount</p>
          <input
            type="text"
            name="buyingAmount"
            value={buyerData.buyingAmount}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="registration-date">
          <p>Registration Date</p>
          <input
            type="date"
            name="registrationDate"
            value={buyerData.registrationDate}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="expiry-date">
          <p>Expiry Date</p>
          <input
            type="date"
            name="expiryDate"
            value={buyerData.expiryDate}
            onChange={handleInputChange}
          />
        </label>
        <div className="assign-buyer">
          <p>Assign Buyer</p>
        </div>
        <div className="emd-balance">
          <p>EMD Balance</p>
        </div>
        <label htmlFor="pan-id">
          <p>Pan Id/No</p>
          <input
            type="text"
            name="panId"
            value={buyerData.panId}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="upload-kyc">
          <p>Upload Kyc</p>
          <input type="file" />
        </label>
        <label htmlFor="address">
          <p>Address</p>
          <input
            type="text"
            name="address"
            value={buyerData.address}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="kyc-verification">
          <p>KYC Verification</p>
          <div className="radio-btn">
            <input
              type="radio"
              value="verify"
              name="kycVerification"
              id="verify"
              checked={buyerData.kycVerification === "verify"}
              onChange={handleInputChange}
            />
            <label htmlFor="verify">verified</label>
            <input
              type="radio"
              value="notverified"
              name="kycVerification"
              id="not-verified"
              checked={buyerData.kycVerification === "notverified"}
              onChange={handleInputChange}
            />
            <label htmlFor="not-verified">Not verified</label>
          </div>
        </label>
        <div className="submit">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterBuyer;
