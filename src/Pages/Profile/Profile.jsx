import React from "react";
import { BiEdit } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import "./Profile.css";
import DataTable from "react-data-table-component";

const data = [
  {
    name: "abc",
    phno: "8668190986",
    email: "example@example.com",
    region: "WB",
  },
  {
    name: "abc",
    phno: "8668190986",
    email: "example@example.com",
    region: "WB",
  },
  {
    name: "abc",
    phno: "8668190986",
    email: "example@example.com",
    region: "WB",
  },
];

export const Profile = () => {
  const columns = [
    {
      name: "Username",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Ph No",
      selector: (row) => row.phno,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Region",
      selector: (row) => row.region,
      sortable: true,
    },
  ];
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
          <input type="text" name="" id="" placeholder="abcd" />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Mobile No</label>
          <input type="number" name="" id="" placeholder="0000000000" />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Mail ID/Username</label>
          <input type="email" name="" id="" placeholder="example@example.com" />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Password</label>
          <input type="password" name="" id="" placeholder="**************" />
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
