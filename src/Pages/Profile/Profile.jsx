import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import "./Profile.css";
import DataTable from "react-data-table-component";

export const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Shivila",
    mobile: "79504865954",
    email: "test@gmail.com",
    password: "**************",
  });

  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Username",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Region",
      selector: (row) => row.regions[0]?.name || "N/A",
      sortable: true,
    },
  ];

  useEffect(() => {
    fetch("http://13.48.45.18:4008/user/getAll")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          setData(responseData.data);
        } else {
          console.error("Error fetching user data:", responseData.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="_profile-header">
        <h1>Profile</h1>
        <BiEdit size={22} />
        <ImExit size={18} />
      </div>
      <div className="_profile-body">
        <div className="_input-fields">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="abcd"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Mobile No</label>
          <input
            type="number"
            name="mobile"
            id=""
            placeholder="0000000000"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Mail ID/Username</label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="**************"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="_profile-btn">Update</button>
      <DataTable
        title="Assigned Region Table"
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
      />
    </>
  );
};
