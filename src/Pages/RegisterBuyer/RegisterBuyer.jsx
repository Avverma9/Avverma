import React, { useState } from "react";
import "./RegisterBuyer.css";

function RegisterBuyer() {
  const [buyerData, setBuyerData] = useState({
    full_name: "",
    company_name: "",
    company_address: "",
    email: "",
    mobile: "",
    DOB: "",
    password: "",
    Pan: "",
    region: [],
    PanNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerData({ ...buyerData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBuyerData({ ...buyerData, Pan: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in buyerData) {
      formData.append(key, buyerData[key]);
    }

    try {
      const response = await fetch("http://13.48.45.18:4008/user/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Data submitted successfully");
        setBuyerData({
          full_name: "",
          company_name: "",
          company_address: "",
          email: "",
          mobile: "",
          DOB: "",
          password: "",
          Pan: "",
          region: [],
          PanNumber: "",
        });
      } else {
        alert("Failed to submit data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };



  return (
    <div className="main-container">
      <div className="page-heading">
        <h1>Register Buyer</h1>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="buyer-name">
          <p>Buyer Name</p>
          <input
            type="text"
            name="full_name"
            value={buyerData.full_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="pin-code">
          <p>Company Name</p>
          <input
            type="text"
            name="company_name"
            value={buyerData.company_name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="pin-code">
          <p>Company Address</p>
          <input
            type="text"
            name="company_address"
            value={buyerData.company_address}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="mobile-no">
          <p>Mobile Number</p>
          <input
            type="text"
            name="mobile"
            value={buyerData.mobile}
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
        <label htmlFor="mobile-no">
          <p>Date of Birth</p>
          <input
            type="date"
            name="DOB"
            value={buyerData.DOB}
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
        <label htmlFor="pan">
          <p>Pan Id/No</p>
          <input
            type="text"
            name="PanNumber"
            value={buyerData.PanNumber}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="pan-upload">
          <p>Upload Pan</p>
          <input
            type="file"
            name="Pan"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
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
