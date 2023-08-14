import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";
import { FiRefreshCcw } from "react-icons/fi";
import { TfiExport } from "react-icons/tfi";
import "./Mannageauction.css";
import { useNavigate } from "react-router-dom";

export const MannageAuction = () => {
  const [showRegion, setShowRegion] = useState(false);
  const [showSeller, setShowSeller] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [filterView, setFilterView] = useState(false);
  const [exportView, setExportView] = useState([]);
  const [filterText, setFilterText] = useState("");

  const [auctions, setAuctions] = useState([]);

  const fetchAuctions = async () => {
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/auction/getAll",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const { data } = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleClick = () => {
    fetchAuctions();
  };

  const filteredItems = auctions?.filter((item) => {
    if (!item) {
      return false;
    }

    const lowercaseFilterText = filterText.toLowerCase();

    return (
      item.registrationNumber?.toLowerCase().includes(lowercaseFilterText) ||
      item.agreementNumber?.toLowerCase().includes(lowercaseFilterText) ||
      item.category?.toLowerCase().includes(lowercaseFilterText) ||
      item.productName?.toLowerCase().includes(lowercaseFilterText)
    );
  });

  const navigate = useNavigate();

  const deleteAuction = async (id) => {
    const response = await fetch(
      `http://13.48.45.18:4008/auction/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      fetchAuctions();
    }
  };

  const columns = [
    {
      name: "Registration No",
      selector: (row) => row.registrationNumber,
      sortable: true,
    },
    {
      name: "Agreement No",
      selector: (row) => row.agreementNumber,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Product Auction Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => {
        const date = new Date(row.startTime);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        return formattedDate;
      },
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => {
        const date = new Date(row.endTime);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        return formattedDate;
      },
      sortable: true,
    },
    {
      name: "Total Bid",
      selector: (row) => row.bid_remains,
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
          <MdOutlineRemoveRedEye
            size="18"
            color="#1a2333"
            onClick={() => navigate(`/view-auction/${row._id}`)}
          />
          <BiEdit
            size="18"
            color="#1b3ea9"
            onClick={() => navigate(`/edit-view-auction/${row._id}`)}
          />
          <MdDeleteOutline
            size="18"
            color="#ff0000"
            onClick={() => deleteAuction(row._id)}
          />
        </div>
      ),
    },
  ];
  const handleRowSelected = (state) => {
    setExportView(state.selectedRows);
  };
  console.log(auctions);
  return (
    <>
      <DataTable
        title="Mannage Auction"
        columns={columns}
        data={filteredItems}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <>
            <div
              className="_mannage-auction-search"
              style={{
                margin: "15px 0",
              }}
            >
              <div className="buttons-header">
                <input
                  type="text"
                  placeholder="Search here"
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <AiOutlineSearch className="search-icon" />
                {exportView.length !== 0 && (
                  <button className="export-button">
                    <p>
                      <TfiExport style={{ marginRight: "5px" }} />
                      Export
                    </p>
                  </button>
                )}
                <button
                  className="filter-button"
                  onClick={() => setFilterView(!filterView)}
                >
                  <p>
                    <BsFilter style={{ marginRight: "5px" }} />
                    Filter
                  </p>
                </button>
                <button
                  className="addnew-button"
                  onClick={() => navigate("/add-new-auction")}
                >
                  <p>
                    <GrAddCircle
                      className="add-circle"
                      style={{ marginRight: "5px" }}
                    />
                    Add New Auction
                  </p>
                </button>
                <button className="upload-button">
                  <p>
                    <FiUpload style={{ marginRight: "5px" }} />
                    Upload Bulk
                  </p>
                </button>
                <button className="refresh-button" onClick={handleClick}>
                  <p>
                    <FiRefreshCcw style={{ marginRight: "5px" }} />
                    Refresh
                  </p>
                </button>
              </div>
            </div>
            {filterView && (
              <div>
                <div className="_flex_center_between">
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input type="checkbox" id="filter1" name="filter1"></input>
                    <label for="filter1">Running Auction</label>
                  </div>
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input type="checkbox" id="filter2" name="filter2"></input>
                    <label for="filter2">Awaiting Status Declaration</label>
                  </div>
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input type="checkbox" id="filter3" name="filter3"></input>
                    <label for="filter3">Awaiting Payment Approval</label>
                  </div>
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input type="checkbox" id="filter4" name="filter4"></input>
                    <label for="filter4">Expired</label>
                  </div>
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input type="checkbox" id="filter4" name="filter4"></input>
                    <label for="filter4">Complete</label>
                  </div>
                </div>
                <div
                  className="_flex_center_between"
                  style={{ marginTop: "15px" }}
                >
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input
                      type="checkbox"
                      id="filter5"
                      name="filter5"
                      onChange={(e) => setShowRegion(e.target.checked)}
                    ></input>
                    <label for="filter5">Region</label>
                  </div>
                  {showRegion && (
                    <div className="filter-auction-select">
                      <select
                        name="filter-auction-select"
                        id="filter-auction-select"
                      >
                        <option value="">-- Please choose an option --</option>
                        <option value="name">Kolkata</option>
                        <option value="mobile">Jaipur</option>
                        <option value="email">Patna</option>
                      </select>
                    </div>
                  )}
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input
                      type="checkbox"
                      id="filter6"
                      name="filter6"
                      onChange={(e) => setShowSeller(e.target.checked)}
                    ></input>
                    <label for="filter6">Seller Name</label>
                  </div>
                  {showSeller && (
                    <div className="filter-auction-select">
                      <select
                        name="filter-auction-select"
                        id="filter-auction-select"
                      >
                        <option value="">-- Please choose an option --</option>
                        <option value="name">Raju</option>
                        <option value="mobile">Shyam</option>
                        <option value="email">Ram</option>
                      </select>
                    </div>
                  )}
                  <div className="filter-auction-checkbox _flex_center_between">
                    <input
                      type="checkbox"
                      id="filter7"
                      name="filter7"
                      onChange={(e) => setShowCategory(e.target.checked)}
                    ></input>
                    <label for="filter7">Category</label>
                  </div>
                  {showCategory && (
                    <div className="filter-auction-select">
                      <select
                        name="filter-auction-select"
                        id="filter-auction-select"
                      >
                        <option value="">-- Please choose an option --</option>
                        <option value="name">Category 1</option>
                        <option value="mobile">Category 2</option>
                        <option value="email">Category 3</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        }
        // actions={
        //   <button
        //     className="export-butto"
        //     style={{
        //       padding: "10px",
        //       backgroundcolor: "rgba(44, 44, 44, 0.8)",
        //       border: "medium",
        //       color: "white",
        //       cursor: "pointer",
        //       display: "flex",
        //       alignitems: "center",
        //       gap: "5px",
        //       fontWeight: "800",
        //     }}
        //   >
        //     Export
        //     <TfiExport />
        //   </button>
        // }
      />
    </>
  );
};
