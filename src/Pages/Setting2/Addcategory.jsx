import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";



function Addcategory() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [categoryData,serCategoryData]=useState([])
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    fetchRegionData();
  }, []);

  const fetchRegionData = async () => {
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/category/getAll"
      );
      const data = await response.json();
      if (response.ok) {
        if (data && data.data && Array.isArray(data.data)) {
          setRegions(data.data);
          serCategoryData(data.data)
        } else {
          console.error("Invalid region data:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
  };

  const handleRegionChange = (e) => {
    const selectedRegionId = e.target.value;
    setSelectedRegionId(selectedRegionId);
    console.log("Selected region ID:", selectedRegionId);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    const regexPattern = /^[A-Za-z\s]+$/;

    if (newName.length <= 25 && regexPattern.test(newName)) {
      setName(newName);
      setIsValidName(true);
    } else {
      setName(newName);
      setIsValidName(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !startTime || !endTime || !selectedRegionId) {
      alert("All fields are required");
      return;
    }

    setIsValidName(true);

    const selectedRegion = regions.find(
      (region) => region._id === selectedRegionId
    );

    if (selectedRegion) {
      const formattedStartTime =
        new Date().toISOString().substr(0, 11) + startTime + ":00Z";
      const formattedEndTime =
        new Date().toISOString().substr(0, 11) + endTime + ":00Z";

      try {
        const response = await fetch(
          "http://13.48.45.18:4008/admin/category/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name: name,
              region: selectedRegionId,
              startTime: formattedStartTime,
              endTime: formattedEndTime,
            }),
          }
        );

        console.log(response);
        if (response && response.ok === true) {
          alert("Added successfully");
          setName("");
          setStartTime("");
          setEndTime("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = [
    {
      name: "Sl.No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="_edit">
          <BiEdit
            size="18"
            color="#1b3ea9"
            // onClick={() => handleEditClick(row._id, row.name)}
          />
          <MdDeleteOutline
            size="18"
            color="#ff0000"
            // onClick={() => handleDeleteClick(row._id)}
          />
        </div>
      ),
    },
  ];

  const filteredData = categoryData.filter((row) => {
    if (!selectedFilter) {
      return true;
    } else {
      return row.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  });


  return (
    <>

    <div className="setting-container">
      <form onSubmit={handleSubmit}>
        <div className="setting-head">
          <h1>Add Category</h1>
        </div>
        <div className="setting-dropdown">
          <label>
            Add Category
            <input
              maxLength={25}
              type="text"
              value={name}
              max={10}
              onChange={handleNameChange}
            />
            {!isValidName && (
              <p style={{ color: "red" }}>
                Please don't add any number or special characters <br />
                Maximum 25 characters allowed.
              </p>
            )}
          </label>
          <label>
            Region
            <select
              name="region"
              id="account-region"
              value={selectedRegionId}
              onChange={handleRegionChange}
            >
              <option value="">Select Region</option>
              {regions !== [] &&
                regions.map((region) => (
                  <option key={region._id} value={region._id}>
                    {region.name.charAt(0).toUpperCase() + region.name.slice(1)}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Start Time
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            End Time
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
        </div>
        <button className="sub-button">Submit</button>
      </form>
    </div>
    <DataTable
        title="Category Action"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
        subHeader
        subHeaderAlign="left"
      />
    </>
  );
}

export default Addcategory;
