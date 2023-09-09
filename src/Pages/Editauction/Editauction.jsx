import React, { useEffect, useState } from "react";
import Select from "react-select";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
// import "./Addauction.css";

const BASE_URL = "http://13.48.45.18:4008";

export const Editauction = () => {
  const [auctionData, setAuctionData] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [photoVideo, setPhotoVideo] = useState(null);
  // const [uploadPVFile, setUploadPVFile] = useState(null);
  const [valuationFile, setValuationFile] = useState(null);
  const [rcValue, setRcValue] = useState(true);
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState('');


  const handleRCChange = (e) => {
    setRcValue(e.target.value === "true");
  };

  const urlId = useParams();
  const navigate = useNavigate();
  const auctionId = urlId.id;
  localStorage.setItem("auctionId", JSON.stringify(urlId));


  // console.log(urlId.id, "IDDDDDDD")

  const handleUploadPVChange = (e) => {
    const file = e.target.files[0];
    setPhotoVideo(file);
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

  const getAuctionDataById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/auction/get/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      
      if (!response.ok) {
        throw new Error("API request failed");
      }
      
      const { data } = await response.json();
      console.log("Auction Data:", data);
      const selectedTerm = data[0]?.paymentTerm || '';
      setSelectedPaymentTerm(selectedTerm);
      setPhotoVideo(data[0]?.photoVideo || []);
      console.log("photoVideo:", data[0]?.photoVideo);
      setAuctionData(data);

    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getCategory();
    getRegions();
    getSeller();
    getAuctionDataById(auctionId);
  }, [auctionId]);

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

    
    console.log("photoVideo:", photoVideo);
    console.log("Previous Value:", auctionData[0]?.photoVideo[0]);
  
    const formData = new FormData();
    formData.append("region", event.target.region.value);
    formData.append("category", event.target.category.value);
    formData.append("seller", event.target.seller.value);
    formData.append("productName", event.target.productName.value);
    formData.append("registrationNumber", event.target.registrationNumber.value);
    formData.append("agreementNumber", event.target.agreementNumber.value);
    formData.append("rc", rcValue);
    formData.append("startPrice", event.target.startPrice.value);
    formData.append("reservePrice", event.target.reservePrice.value);
    formData.append("parkingName", event.target.parkingName.value);
    formData.append("parkingAddress", event.target.parkingAddress.value);
    formData.append("yearOfManufacture", event.target.yearOfManufacture.value);
    formData.append("paymentTerm", event.target.paymentTerm.value);
    formData.append("quotationValidity", event.target.quotationValidity.value);
    formData.append("auctionFees", event.target.auctionFees.value);
    formData.append("auctionTerm", event.target.auctionTerm.value);
    if (photoVideo) {
      formData.append("files", photoVideo);
    } else {
      formData.append("files", auctionData[0]?.photoVideo[0]);
    }
  
    const response = await fetch(`${BASE_URL}/admin/auction/update/${urlId.id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });
  
    const responseData = await response.json();
  
    if (responseData.message === "Auction updated") {
      alert("Auction Data Updated")
    } else if (responseData.message === "Something went wrong") {
      alert("Something went wrong")
    } else {
      console.error("Error adding auction:", response.statusText);
    }
  };
  
  
  //StartTime Formate changing 
  const startTime = new Date(auctionData[0]?.startTime);
  const startTimeHours = startTime.getHours().toString().padStart(2, '0');
  const startTimeMinutes = startTime.getMinutes().toString().padStart(2, '0');


  //End Time Format Changing 
  const EndTime = new Date(auctionData[0]?.endTime);
  const EndTimeHours = EndTime.getHours().toString().padStart(2, '0');
  const EndTimeMinutes = EndTime.getMinutes().toString().padStart(2, '0');

  //  const handleAddAuctionTiming = () => {
  //   navigate(`/set-auction-timing/${auctionId}`);
  // }\

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options).split('/').reverse().join('-');
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="dashboard-header">
          <h1>Edit Auction</h1>
          {/* <button onClick={handleAddAuctionTiming}>Add Auction Timing</button> */}
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

          <label htmlFor="productName">
            <p>Name of the product</p>
            <input
              type="text"
              name="productName"
              placeholder="Name of the product"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.productName || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].productName = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="Registration Number">
            <p>Registration Number</p>
            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.registrationNumber || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].registrationNumber = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="Agreement Number">
            <p>Agreement Number</p>
            <input
              type="text"
              name="agreementNumber"
              placeholder="Agreement Number"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.agreementNumber || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].agreementNumber = e.target.value;
                setAuctionData(newData);
              }}

            />
          </label>
          <label htmlFor="RC">
            <p>RC</p>
            <div className="rc-input">
              <input type="radio" id="true" name="rc" checked={rcValue === true}
                onChange={handleRCChange} />
              <label for="yes">Yes</label>
              <input type="radio" id="false" name="rc"
                checked={rcValue === false}
                onChange={handleRCChange} />
              <label for="no">No</label>
            </div>
          </label>
          <label htmlFor="start-price">
            <p>Start Price</p>
            <input
              type="text"
              name="startPrice"
              placeholder="Start Price"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.startPrice || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].startPrice = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="reserve-price">
            <p>Reserve Price</p>
            <input
              type="text"
              name="reservePrice"
              placeholder="Reserve Price"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.reservePrice || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].reservePrice = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          {/* <label htmlFor="start-time">
            <p>Start Time</p>
            <input
              type="time"
              name="startTime"
              placeholder="Start Time"
              className="basic-multi-select-inputs"
              value={`${startTimeHours}:${startTimeMinutes}`}
           
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
              value={`${EndTimeHours}:${EndTimeMinutes}`}
        
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
          </label> */}
          {/* <label htmlFor="fuel-type">
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
          </label> */}
          <label htmlFor="parking-name">
            <p>Parking Name</p>
            <input
              type="text"
              name="parkingName"
              placeholder="Parking Name"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.parkingName || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].parkingName = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="parking-address">
            <p>Parking Address</p>
            <input
              type="text"
              name="parkingAddress"
              placeholder="Address"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.parkingAddress || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].parkingAddress = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="menufecture-year">
            <p>Year of Manufacture</p>
            <input
              type="text"
              name="yearOfManufacture"
              placeholder="Year"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.yearOfManufacture || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].yearOfManufacture = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>

          <label htmlFor="payment-mode">
            <p>Payment Term</p>
            <select
              className="basic-multi-select-inputs"
              name="paymentTerm"
              value={selectedPaymentTerm}
              onChange={(e) => setSelectedPaymentTerm(e.target.value)}
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
              type="date"
              name="quotationValidity"
              placeholder="Quatation Validity"
              className="basic-multi-select-inputs"
              value={formatDate(auctionData[0]?.quotationValidity)}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].quotationValidity = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="auction-fees">
            <p>Auction Fees</p>
            <input
              type="text"
              name="auctionFees"
              placeholder="Auction-fees"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.auctionFees || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].auctionFees = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <label htmlFor="auction-term">
            <p>Auction Term</p>
            <input
              type="text"
              name="auctionTerm"
              placeholder="Auction-term"
              className="basic-multi-select-inputs"
              value={auctionData[0]?.auctionTerm || ""}
              onChange={(e) => {
                const newData = { ...auctionData };
                newData[0].auctionTerm = e.target.value;
                setAuctionData(newData);
              }}
            />
          </label>
          <div className="textarea">
            <label htmlFor="text-area">
              <p>Other Information </p>
            </label>
          </div>
        </div>
        <div className="cont-2">
          <label>
            <p>Upload Photo/Video</p>
            <input
              type="file"
              name="photoVideo"
              placeholder=""
              onChange={handleUploadPVChange}
              className="basic-multi-select-inputs"
            />
          </label>
          <label >
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
    </>
  );
};
