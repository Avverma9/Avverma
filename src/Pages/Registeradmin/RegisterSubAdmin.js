import React, { useState, useEffect } from "react";
import "./RegisterSubAdmin.css";
import Select from "react-select";
import DataTable from "react-data-table-component";

function RegisterSubAdmin() {
  const [formattedData, setFormattedData] = useState("");
  const columns = [
    {
      name: "Username",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile || "N/A",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Region",
      selector: (row) => {
        let arr = [];
        row?.regionData.forEach((element) => {
          arr.push(element?.name);
          let str = arr.join(",");
          setFormattedData(str);
        });
        return formattedData;
      },
      sortable: true,
    },
  ];
  const [subAdminData, setSubAdminData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    region: "",
    status: "active",
    role: 1,
  });

  const [data, setData] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  // const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [regionArr, setRegionArr] = useState([]);
  // const [regId, setRegId] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [mobileError, setMobileError] = useState(null);

  useEffect(() => {
    fetchRegionData();
    fetchAdminData();
  }, []);

  const Token = localStorage.getItem("token");

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://13.48.45.18:4008/admin/getAll", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.data);
        setData(data.data);
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
    setLoading(false);
  };

  const fetchRegionData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/region/getAll"
      );
      const data = await response.json();
      if (response.ok) {
        if (data && data.data && Array.isArray(data.data)) {
          // setRegions(data.data);
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
    e.map((elem) => setRegionArr([...regionArr, elem.value]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !subAdminData.name ||
        !subAdminData.email ||
        !subAdminData.mobile ||
        !subAdminData.password ||
        (!selectRegionOptions && regionArr !== [])
      ) {
        alert("All fields are required");
        return;
      }

      // const nameRegex = /^[A-Za-z\s]{1,30}$/;
      // if (!nameRegex.test(subAdminData.name)) {
      //   alert("Invalid name format");
      //   return;
      // }

      // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      // if (!emailRegex.test(subAdminData.email)) {
      //   alert("Invalid email format");
      //   return;
      // }

      // if (subAdminData.mobile.length !== 10) {
      //   alert("Mobile number should be 10 digits");
      //   return;
      // }

      const roleValue = subAdminData.role === "admin" ? 0 : 1;
      // const selectedRegion = regions.find(
      //   (region) => region._id === selectedRegionId
      // );

      if (regionArr !== []) {
        const response = await fetch("http://13.48.45.18:4008/admin/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region: regionArr,
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
          setSubAdminData({
            name: "",
            email: "",
            mobile: "",
            password: "",
            region: "",
            status: "active",
            role: 1,
          });
          console.log(data);
        }
      } else {
        console.error("Region not found:", regionArr);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  }

  function isValidName(name) {
    return /^[a-zA-Z\s]{3,30}$/.test(name);
  }

  function isValidMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (!isValidEmail(value)) {
        setEmailError("Email is invalid");
      } else {
        setEmailError(null);
      }
    } else if (name === "password") {
      if (!isValidPassword(value)) {
        setPasswordError(
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
        );
      } else {
        setPasswordError(null);
      }
    } else if (name === "name") {
      if (!isValidName(value)) {
        setNameError(
          "Provide Valid Name Using Letters and not more than 30 characters and less than 3 characters"
        );
      } else {
        setNameError(null);
      }
    } else if (name === "mobile") {
      if (!isValidMobile(value)) {
        setMobileError("Provide Valid Phone Number");
      } else {
        setMobileError(null);
      }
    }
    setSubAdminData({ ...subAdminData, [name]: value });
  };

  const selectRegionOptions = selectedRegion?.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  return (
    <>
      <div className="main-container">
        <div className="page-heading">
          <h1>Register</h1>
        </div>
        <form className="form-container">
          <label htmlFor="sub-admin-name">
            <p>Name</p>
            <input
              // maxLength={25}
              type="text"
              name="name"
              value={subAdminData.name}
              onChange={handleInputChange}
            />
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
          </label>
          <label htmlFor="mobile-no">
            <p>Mobile Number</p>
            <input
              type="number"
              name="mobile"
              maxLength={10}
              value={subAdminData.mobile}
              onChange={handleInputChange}
            />
            {mobileError && <p style={{ color: "red" }}>{mobileError}</p>}
          </label>
          <label htmlFor="mail-id">
            <p>Mail id/Username</p>
            <input
              type="email"
              name="email"
              value={subAdminData.email}
              onChange={handleInputChange}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={subAdminData.password}
              onChange={handleInputChange}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </label>
          <label htmlFor="assign-region">
            <p>Assign Region</p>
            {/* <select
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
            </select> */}
            <Select
              name="region"
              defaultValue={selectRegionOptions}
              options={selectRegionOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Region"
              isMulti
              onChange={handleRegionChange}
            />
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
      <DataTable
        title={
          <h1 style={{ fontWeight: "500", margin: "10px 0" }}>
            List of Admins And Sub Admins
          </h1>
        }
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
      />
    </>
  );
}

export default RegisterSubAdmin;
