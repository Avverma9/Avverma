import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import "./Mannagebuyer.css";
import { useNavigate } from "react-router-dom";

export const Mannagebuyer = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [managebuyer, setManagebuyer] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const Token = localStorage.getItem("token");

  const fetchmanagebuyer = async () => {
    try {
      const response = await fetch("http://13.48.45.18:4008/user/getAll", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      const res = await response.json();
      console.log(res.data);
      setManagebuyer(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(managebuyer);

  useEffect(() => {
    fetchmanagebuyer();
  }, []);

  const columns = [
    {
      name: "Sl.No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Buyer Name",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "Buyer Phone",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Buyer Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.isApprovedByAdmin ? "Active" : "Pending"),
      sortable: true,
    },
    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <div className="_edit">
    //       <MdOutlineRemoveRedEye size="18" color="#1a2333" />
    //       <BiEdit size="18" color="#1b3ea9" />
    //       <MdDeleteOutline size="18" color="#ff0000" />
    //     </div>
    //   ),
    // },
  ];


  const filteredData = managebuyer.filter((row) => {
    if (!selectedFilter) {
      return true;
    }
    return (
      (selectedFilter === "Pending" && !row.isApprovedByAdmin) ||
      (selectedFilter === "Active" && row.isApprovedByAdmin)
    );
  }).filter((row) =>
    row.full_name.toLowerCase().includes(searchInput.toLowerCase()) ||
    row.mobile.includes(searchInput) ||
    row.email.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      <DataTable
        title="Manage Buyer"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <div className="_mannage-buyer-sub-header">
            <div className="_search-component">
              <input
                type="text"
                name=""
                id=""
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <AiOutlineSearch />
            </div>
            <div className="_filter-dropdown">
              <select
                name=""
                id=""
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="">Filter</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="_register-buyer-btn">
              <button onClick={() => navigate("/register-buyer")}>
                <GrAddCircle color="#fff" />
                <span>Register a Buyer</span>
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};
