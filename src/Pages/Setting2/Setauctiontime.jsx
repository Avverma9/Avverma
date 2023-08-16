import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Setauctiontime() {
  const BASE_URL = "http://13.48.45.18:4008";

  const [regions, setRegions] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectTime, setSelectTime] = useState(null);
  const [timeInterVal, setTimeInterval] = useState(null);

  const aucId = JSON.parse(localStorage.getItem("auctionId"));
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/region/getAll")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setRegions(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);
  console.log(aucId);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://13.48.45.18:4008/admin/seller/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setSellers(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sellers:", error);
      });
  }, []);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleSellerChange = (e) => {
    setSelectedSeller(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectTime(time);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      region: selectedRegion,
      seller: selectedSeller,
      startTime: selectTime,
      startDate: selectedDate,
    };

    const response = await fetch(`${BASE_URL}/admin/auction/update/${aucId}`, {
      method: "PUT",
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
    <div className="setting-container">
      <div className="setting-head">
        <h1>Setting Set Auction Timing</h1>
      </div>
      <div className="setting-dropdown">
        <label>
          Select Region
          <select
            name="_filter-select"
            id="_filter-select"
            onChange={handleRegionChange}
            value={selectedRegion}
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region._id} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select Seller
          <select
            name="_filter-select"
            id="_filter-select"
            onChange={handleSellerChange}
            value={selectedSeller}
          >
            <option value="">Select Seller</option>
            {sellers.map((seller) => (
              <option key={seller._id} value={seller.name}>
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select Date
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
          />
        </label>
        <label>
          Select a Time
          <TimePicker onChange={handleTimeChange} value={selectTime} />
        </label>
        {/* <label>
          Time Interval
          <input type="text" placeholder="Interval Time" />
        </label> */}
      </div>
      <button className="sub-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Setauctiontime;
