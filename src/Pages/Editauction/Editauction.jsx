import React, { useEffect, useState } from "react";
import Select from "react-select";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
// import "./Addauction.css";

const BASE_URL = "http://13.48.45.18:4008";

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

export const Editauction = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedOption, setSelectedOption] = useState(""); // State to track selected option

  const [uploadPVFile, setUploadPVFile] = useState(null);
  const [valuationFile, setValuationFile] = useState(null);

  const handleUploadPVChange = (e) => {
    const file = e.target.files[0];
    setUploadPVFile(file);
  };

  const handleValuationFileChange = (e) => {
    const file = e.target.files[0];
    setValuationFile(file);
  };

  const getCategory = async () => {
    const response = await fetch(`${BASE_URL}/admin/category/getAll`);

    const { data } = await response.json();
    // console.log(data);
    setSelectedCategory(data);
  };
  const getRegions = async () => {
    const response = await fetch(`${BASE_URL}/admin/region/getAll`);

    const { data } = await response.json();

    setSelectedRegion(data);
    // console.log(data);
  };
  const getSeller = async () => {
    const response = await fetch(`${BASE_URL}/admin/seller/getAll`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const { data } = await response.json();

    setSelectedSeller(data);
    // console.log(data);
  };

  useEffect(() => {
    getCategory();
    getRegions();
    getSeller();
  }, []);

  const selectRegionOptions = selectedRegion?.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  const selectCategoryOptions = selectedCategory?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const selectSellerOptions = selectedSeller?.map((seller) => ({
    value: seller._id,
    label: seller.name,
  }));

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      region: event.target.region.value,
      category: event.target.category.value,
      seller: event.target.seller.value,
      nameOfProduct: event.target.nameOfProduct.value,
      registrationNumber: event.target.registrationNumber.value,
      agreementNumber: event.target.agreementNumber.value,
      rc: document.querySelector('input[name="rc"]:checked')?.value || "",
      startPrice: event.target.startPrice.value,
      reservePrice: event.target.reservePrice.value,
      startTime: event.target.startTime.value,
      startDate: event.target.startDate.value,
      endTime: event.target.endTime.value,
      endDate: event.target.endDate.value,
      fuelType:
        document.querySelector('input[name="fuel"]:checked')?.value || "",
      parkingName: event.target.parkingName.value,
      parkingAddress: event.target.parkingAddress.value,
      yearOfManufacture: event.target.yearOfManufacture.value,
      paymentTerm: event.target.paymentTerm.value,
      quotationValidity: event.target.quotationValidity.value,
      auctionFees: event.target.auctionFees.value,
      auctionTerm: event.target.auctionTerm.value,
      uploadPV: uploadPVFile,
      valuationFile: valuationFile,
    };

    const response = await fetch(`${BASE_URL}/admin/auction/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("Form Data:", formData);

    // Check the response status and handle accordingly
    if (response.ok) {
      // Successful response handling
      console.log("Auction successfully added.");
    } else {
      // Error handling
      console.error("Error adding auction:", response.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="dashboard-header">
        <h1>Add new Auction</h1>
      </div>
      <div className="add-new-auction-fields">
        <Select
          name="region"
          defaultValue={selectRegionOptions}
          options={selectRegionOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Region"
        />
        <Select
          name="category"
          defaultValue={selectCategoryOptions}
          options={selectCategoryOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Category"
        />
        <Select
          name="seller"
          defaultValue={selectSellerOptions}
          options={selectSellerOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Seller"
        />

        <label htmlFor="nameofproduct">
          <p>Name of the product</p>
          <input
            type="text"
            name="nameOfProduct"
            placeholder="Name of the product"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="Registration Number">
          <p>Registration Number</p>
          <input
            type="number"
            name="registrationNumber"
            placeholder="Registration Number"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="Agreement Number">
          <p>Agreement Number</p>
          <input
            type="number"
            name="agreementNumber"
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
            name="startPrice"
            placeholder=<LiaRupeeSignSolid />
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="reserve-price">
          <p>Reserve Price</p>
          <input
            type="text"
            name="reservePrice"
            placeholder=<LiaRupeeSignSolid />
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="start-time">
          <p>Start Time</p>
          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="start-date">
          <p>Start Date</p>
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="end-time">
          <p>End Time</p>
          <input
            type="text"
            name="endTime"
            placeholder="End Time"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="end-date">
          <p>End Date</p>
          <input
            type="text"
            name="endDate"
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
            name="parkingName"
            placeholder="Parking Name"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="parking-address">
          <p>Parking Address</p>
          <input
            type="text"
            name="parkingAddress"
            placeholder="Address"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="menufecture-year">
          <p>Year of Menufecture</p>
          <input
            type="text"
            name="yearOfManufacture"
            placeholder="Year"
            className="basic-multi-select-inputs"
          />
        </label>

        <label htmlFor="payment-mode">
          <p>Payment Term</p>
          <select
            className="basic-multi-select-inputs"
            name="paymentTerm"
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
            name="quotationValidity"
            placeholder=""
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="auction-fees">
          <p>Auction Fees</p>
          <input
            type="text"
            name="auctionFees"
            placeholder="Auction-fees"
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="auction-term">
          <p>Auction Term</p>
          <input
            type="text"
            name="auctionTerm"
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
            name="uploadPV"
            placeholder=""
            onChange={handleUploadPVChange}
            className="basic-multi-select-inputs"
          />
        </label>
        <label htmlFor="add-file">
          <p>Add Valuation File</p>
          <input
            type="file"
            name="valuationFile"
            placeholder=""
            onChange={handleValuationFileChange}
            className="basic-multi-select-inputs"
          />
        </label>
      </div>
      <div className="submit-btn-1">
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};
