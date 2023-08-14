import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Setauctiontime() {
  const [regions, setRegions] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); 
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/region/getAll")
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setRegions(data.data);
        }
      })
      .catch(error => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://13.48.45.18:4008/admin/seller/getAll",{
 headers : {
  'Authorization': `Bearer ${token}`
 }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setSellers(data.data);
          alert("data recieved")
        }
      })
      .catch(error => {
        console.error("Error fetching sellers:", error);
      });
  }, []);

  const handleRegionChange = e => {
    setSelectedRegion(e.target.value);
  };

  const handleSellerChange = e => {
    setSelectedSeller(e.target.value);
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className='setting-container'>
      <div className='setting-head'>
        <h1>Setting Set Auction Timing</h1>
      </div>
      <div className='setting-dropdown'>
        <label>Select Region
          <select name="_filter-select" id="_filter-select" onChange={handleRegionChange} value={selectedRegion}>
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region._id} value={region.name}>{region.name}</option>
            ))}
          </select>
        </label>
        <label>Select Seller
          <select name="_filter-select" id="_filter-select" onChange={handleSellerChange} value={selectedSeller}>
            <option value="">Select Seller</option>
            {sellers.map(seller => (
              <option key={seller._id} value={seller.name}>{seller.name}</option>
            ))}
          </select>
        </label>
        <label>Select Date
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
        </label>
        <label>Select a Time
          <input type='text' placeholder='Time' />
        </label>
        <label>Time Interval
          <input type='text' placeholder='Interval Time' />
        </label>
      </div>
      <button className='sub-button'>Submit</button>
    </div>
  )
}

export default Setauctiontime;
