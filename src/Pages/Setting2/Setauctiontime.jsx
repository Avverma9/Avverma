import React,{useState,useEffect} from 'react'

function Setauctiontime() {
  const [data, setData] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch("http://13.233.229.68:4008/admin/region/getAll")
      .then(response => response.json())
      .then(data => {
        setData(data);
        // Assuming data is an array of regions
        setRegions(data.map(region => region.name));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className='setting-container'>
    <div className='setting-head'>
        <h1>Setting Set Auction Timing</h1>
    </div>
    <div className='setting-dropdown'>
    <label>Select Region
          <select name="_filter-select" id="_filter-select">
            <option value="">Select Region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </label>
    <label>Select Seller
    <select name="_filter-select" id="_filter-select">
              <option value="">Select Seller</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    <label>Select Date
    <select name="_filter-select" id="_filter-select">
              <option value="">Select Date</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
    </select>
    </label>
    <label>Select a Time
    <input type='text' placeholder='Time'/>
    </label>
    <label>Time Interval
    <input type='text' placeholder='Interval Time'/>
    </label>
    </div>
    <button className='sub-button'>Submit</button>
      
    </div>
  )
}

export default Setauctiontime
