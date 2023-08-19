import React, { useEffect, useState } from "react";
import "./RegisterBuyer.css";
import Select from "react-select";

const BASE_URL = "http://13.48.45.18:4008";

function RegisterBuyer() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [buyerData, setBuyerData] = useState({
    full_name: "",
    company_name: "",
    company_address: "",
    email: "",
    mobile: "",
    DOB: "",
    password: "",
    PAN: "",
    region: '',
    PanNumber: "",
  });

  const getRegions = async () => {
    const response = await fetch(`${BASE_URL}/admin/region/getAll`);

    const { data } = await response.json();

    setSelectedRegion(data);
    console.log(data, "REGION DATA");
  };


  const nameRegex = /^[a-zA-Z\s]*$/;

  const validateField = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "full_name":
        return nameRegex.test(fieldValue);
      default:
        return true;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (validateField(name, value)) {
      setBuyerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBuyerData((prevData) => ({
      ...prevData,
      PAN: file,
    }));
  };

 



  useEffect(() => {
    getRegions();
  }, []);

  const selectRegionOptions = selectedRegion?.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  const handleRegionSelect = (selectedOptions) => {
    const selectedRegionIds = selectedOptions.map((option) => option.value);
    setSelectedOption(selectedRegionIds);
    setBuyerData((prevData) => ({
      ...prevData,
      region: selectedRegionIds,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (buyerData.mobile.length !== 10) {
      alert("Mobile number should be exactly 10 characters long.");
      return;
    }

    if (!buyerData.email.includes("@") || !buyerData.email.includes(".com")) {
      alert("Invalid email format.");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", buyerData.full_name);
    formData.append("company_name", buyerData.company_name);
    formData.append("company_address", buyerData.company_address);
    formData.append("email", buyerData.email);
    formData.append("mobile", buyerData.mobile);
    formData.append("DOB", buyerData.DOB);
    formData.append("password", buyerData.password);
    formData.append("PAN", buyerData.PAN);
    formData.append("region",buyerData.region);
    formData.append("PanNumber", buyerData.PanNumber);

    try {
      const response = await fetch(`${BASE_URL}/user/create`, {
        method: "POST",
        body: formData,
      });

      console.log(response)
  
      const responseData = await response.json();

      if (responseData.message === "user registered") {
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
          region: "",
          PanNumber: "",
          username:"",
          vehicleLimit:"",
          buyingAmount:"",
          registrationDate:"",
          expiryDate:"",
          address:""
        });
      } else if (responseData.message === "user already exist please login") {
        alert("User Already Exists");
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
            maxLength={25}
            required
          />
        </label>
        <label htmlFor="pin-code">
          <p>Company Name</p>
          <input
            type="text"
            name="company_name"
            value={buyerData.company_name}
            maxLength={20}
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
            type="tel"
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
          <Select
            name="region"
            value={selectedOption} 
            options={selectRegionOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Region"
            isMulti
            onChange={handleRegionSelect}
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
            maxLength={25}
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
            type="number"
            name="vehicleLimit"
            value={buyerData.vehicleLimit}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="buying-amount">
          <p>Buying Amount</p>
          <input
            type="number"
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
            maxLength={10}
            value={buyerData.PanNumber}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="pan-upload">
          <p>Upload Pan</p>
          <input
            type="file"
            name="PAN"
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
