import React, { useState, useEffect } from "react";
import "./RegisterSubAdmin.css";
import Select from "react-select";

function RegisterSubAdmin() {
  const [subAdminData, setSubAdminData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    region: "",
    status: "active",
    role: 1,
  });

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegionData();
  }, []);

  const fetchRegionData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/region/getAll"
      );
      const data = await response.json();
      if (response.ok) {
        if (data && data.data && Array.isArray(data.data)) {
          setRegions(data.data);
          setSelectedRegion(data.data);
        } else {
          console.error("Invalid region data:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
    setLoading(false);
  };

  const handleRegionChange = (e) => {
    const selectedRegionId = e.target.value;
    setSelectedRegionId(selectedRegionId);
    console.log("Selected region ID:", selectedRegionId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !subAdminData.name ||
        !subAdminData.email ||
        !subAdminData.mobile ||
        !subAdminData.password ||
        !selectedRegionId
      ) {
        alert("All fields are required");
        return;
      }

      const nameRegex = /^[A-Za-z\s]{1,30}$/;
      if (!nameRegex.test(subAdminData.name)) {
        alert("Invalid name format");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(subAdminData.email)) {
        alert("Invalid email format");
        return;
      }

      if (subAdminData.mobile.length !== 10) {
        alert("Mobile number should be 10 digits");
        return;
      }

      const roleValue = subAdminData.role === "admin" ? 0 : 1;
      const selectedRegion = regions.find(
        (region) => region._id === selectedRegionId
      );

      if (selectedRegion) {
        const response = await fetch("http://13.48.45.18:4008/admin/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region: selectedRegionId,
            name: subAdminData.name,
            email: subAdminData.email,
            password: subAdminData.password,
            role: roleValue,
            mobile: subAdminData.mobile,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Account Created");
          console.log(data);
        }
      } else {
        console.error("Region not found:", selectedRegionId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubAdminData({ ...subAdminData, [name]: value });
  };

  const selectRegionOptions = selectedRegion?.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  return (
    <div className="main-container">
      <div className="page-heading">
        <h1>Register</h1>
      </div>
      <form className="form-container">
        <label htmlFor="sub-admin-name">
          <p>Name</p>
          <input
          maxLength={25}
            type="text"
            name="name"
            value={subAdminData.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="mobile-no">
          <p>Mobile Number</p>
          <input
            type="number"
            name="mobile"
            value={subAdminData.mobile}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="mail-id">
          <p>Mail id/Username</p>
          <input
            type="email"
            name="email"
            value={subAdminData.email}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={subAdminData.password}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="assign-region">
          <p>Assign Region</p>
          <select
            name="region"
            id="account-region"
            value={selectedRegionId}
            onChange={handleRegionChange}
          >
            <option value="">Select Region</option>
            {!loading &&
              regions !== [] &&
              regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name.charAt(0).toUpperCase() + region.name.slice(1)}
                </option>
              ))}
          </select>
          {/* <Select
            name="region"
            defaultValue={selectRegionOptions}
            options={selectRegionOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Region"
          /> */}
        </label>
        <label htmlFor="acc-status">
          <p>Account Status</p>
          <select
            name="status"
            id="account-status"
            value={subAdminData.status}
            onChange={handleInputChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label htmlFor="acc-role">
          <p>Account Role</p>
          <select
            name="role"
            id="account-role"
            value={subAdminData.role}
            onChange={handleInputChange}
          >
            <option value="admin">Admin</option>
            <option value="subadmin">Subadmin</option>
          </select>
        </label>
        <div className="submit">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterSubAdmin;
