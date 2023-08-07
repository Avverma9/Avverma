import React from "react";
import DataTable from "react-data-table-component";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import "./Mannagebuyer.css"

const data = [
  {
    sl: 1,
    name: "abc",
    phno: "8668190986",
    email: "example@example.com",
    status: "pending", // default pending, deactive,active
  },
  {
    sl: 2,
    name: "abc",
    phno: "8668190986",
    email: "example@example.com",
    status: "pending", // default pending, deactive,active
  },
  {
    sl: 3,
    name: "abc",
    phno: "8668190986",
    email: "example@example.com",
    status: "pending", // default pending, deactive,active
  },
];

export const Mannagebuyer = () => {
  const columns = [
    {
      name: "Sl. No.",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phno,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="_edit">
          <MdOutlineRemoveRedEye size="18" color="#1a2333" />
          <BiEdit size="18" color="#1b3ea9" />
          <MdDeleteOutline size="18" color="#ff0000" />
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable
        title="Mannage Buyer"
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <div className="_mannage-buyer-sub-header">
            <div className="_search-component">
              <input type="text" name="" id="" />
              <AiOutlineSearch />
            </div>
            <div className="_filter-dropdown">
              <select name="" id="">
                <option value="">Pending</option>
                <option value="">Active</option>
                <option value="">InActive</option>
              </select>
            </div>
            <div className="_register-buyer-btn">
              <button>
                <GrAddCircle />
                <span>Register a Buyer</span>
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};
