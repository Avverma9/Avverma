import React, { useEffect, useState } from "react";
import Select from "react-select";

import "./Addauction.css";
import { GrUpload } from "react-icons/gr";

const BASE_URL = "http://13.48.45.18:4008";

export const Addauction = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedOption, setSelectedOption] = useState(""); // State to track selected option

  const [photoVideo, setphotoVideo] = useState(null);
  const [valuationFile, setValuationFile] = useState(null);
  const [rcValue, setRcValue] = useState(true);

  const handleRCChange = (e) => {
    setRcValue(e.target.value === "true");
  };

  const handleUploadPVChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setphotoVideo(file);
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
    console.log(data, "REGION DATA");
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
      productName: event.target.productName.value,
      registrationNumber: event.target.registrationNumber.value,
      agreementNumber: event.target.agreementNumber.value,
      rc: rcValue,
      rc_name: event.target.rc_name.value,
      startPrice: event.target.startPrice.value,
      reservePrice: event.target.reservePrice.value,
      // startTime: event.target.startTime.value,
      // startDate: event.target.startDate.value,
      // endTime: event.target.endTime.value,
      // endDate: event.target.endDate.value,
      startTime:
        event.target.startDate.value + " " + event.target.startTime.value,
      endTime: event.target.endDate.value + " " + event.target.endTime.value,
      // fuelType:
      // 	document.querySelector('input[name="fuel"]:checked')?.value || "",
      parkingName: event.target.parkingName.value,
      parkingAddress: event.target.parkingAddress.value,
      yearOfManufacture: event.target.yearOfManufacture.value,
      paymentTerm: event.target.paymentTerm.value,
      quotationValidity: event.target.quotationValidity.value,
      auctionFees: event.target.auctionFees.value,
      auctionTerm: event.target.auctionTerm.value,
      files: photoVideo,
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
    if (response.ok && response.status === 200) {
      // console.log(response);
      // console.log(response.data);
      console.log("Auction successfully added.");
      alert("New Auction Added ");
    } else {
      // Error handling
      console.error("Error adding auction:", response.statusText);
    }
  };

  return (
    <>
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
              name="productName"
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

          <div className="rc-input">
            <label htmlFor="">RC</label>
            <input
              type="radio"
              id="yes"
              name="rc"
              value={true}
              checked={rcValue === true}
              onChange={handleRCChange}
            />
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="no"
              name="rc"
              value={false}
              checked={rcValue === false}
              onChange={handleRCChange}
            />
            <label htmlFor="no">No</label>
          </div>
          <label htmlFor="nameofproduct">
            <p>RC Name</p>
            <input
              type="text"
              name="rc_name"
              placeholder="RC name"
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="start-price">
            <p>Start Price</p>
            {/* <span class="price-icon">₹</span> */}
            <input
              type="number"
              name="startPrice"
              placeholder="Start Price"
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="reserve-price">
            <p>Reserve Price</p>
            {/* <span class="price-icon">₹</span> */}
            <input
              type="number"
              name="reservePrice"
              placeholder="Reserve Price"
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="start-time">
            <p>Start Time</p>
            <input
              type="time"
              name="startTime"
              placeholder="Start Time"
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="start-date">
            <p>Start Date</p>
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="end-time">
            <p>End Time</p>
            <input
              type="time"
              name="endTime"
              placeholder="End Time"
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="end-date">
            <p>End Date</p>
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              className="basic-multi-select-inputs"
            />
          </label>
          {/* <label htmlFor='fuel-type'>
					<p>RC</p>
					<div className='fuel-type'>
						<input type='radio' id='petrol' name='fuel' />
						<label for='petrol'>P</label>
						<input type='radio' id='diesel' name='fuel' />
						<label for='diesel'>D</label>
						<input type='radio' id='gas' name='fuel' />
						<label for='gas'>G</label>
						<input type='radio' id='e' name='fuel' />
						<label for='e'>E</label>
					</div>
				</label> */}
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
            <p>Year of Manufacture</p>
            <input
              type="number"
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
            <p>Quotation Validity</p>
            <input
              type="date"
              name="quotationValidity"
              placeholder=""
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="auction-fees">
            <p>Auction Fees</p>
            <input
              type="number"
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
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
          </div>
        </div>
        <div className="cont-2">
          <label htmlFor="add-video">
            <p>
              <GrUpload />
              Upload Photo/Video
            </p>
            <input
              id="add-video"
              type="file"
              name="photoVideo"
              placeholder=""
              onChange={handleUploadPVChange}
              className="basic-multi-select-inputs"
            />
          </label>
          <label htmlFor="add-file">
            <p>
              <GrUpload />
              Add Valuation File
            </p>
            <input
              type="file"
              id="add-file"
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
    </>
  );
};
