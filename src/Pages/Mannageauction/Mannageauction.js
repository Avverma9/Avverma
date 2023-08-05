import React, { useState } from "react";
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

const data = [
  {
    registrationNo: "1234567890",
    agreementNumber: "1234567890",
    category: "Cars",
    productAuctionName: "Toyota Camry",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    totalBid: 100000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9876543210",
    agreementNumber: "9876543210",
    category: "Cars",
    productAuctionName: "Honda Civic",
    startDate: "2023-02-01",
    endDate: "2023-12-31",
    totalBid: 200000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "0987654321",
    agreementNumber: "0987654321",
    category: "Cars",
    productAuctionName: "Nissan Altima",
    startDate: "2023-03-01",
    endDate: "2023-12-31",
    totalBid: 300000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9087654321",
    agreementNumber: "9087654321",
    category: "Cars",
    productAuctionName: "Toyota Corolla",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    totalBid: 1000000,
    auctionStatus: "Awaiting Payment",
  },
  {
    registrationNo: "1234567890",
    agreementNumber: "1234567890",
    category: "Cars",
    productAuctionName: "Toyota Camry",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    totalBid: 100000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9876543210",
    agreementNumber: "9876543210",
    category: "Cars",
    productAuctionName: "Honda Civic",
    startDate: "2023-02-01",
    endDate: "2023-12-31",
    totalBid: 200000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "0987654321",
    agreementNumber: "0987654321",
    category: "Cars",
    productAuctionName: "Nissan Altima",
    startDate: "2023-03-01",
    endDate: "2023-12-31",
    totalBid: 300000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9087654321",
    agreementNumber: "9087654321",
    category: "Cars",
    productAuctionName: "Toyota Corolla",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    totalBid: 1000000,
    auctionStatus: "Awaiting Payment",
  },
  {
    registrationNo: "1234567890",
    agreementNumber: "1234567890",
    category: "Cars",
    productAuctionName: "Toyota Camry",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    totalBid: 100000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9876543210",
    agreementNumber: "9876543210",
    category: "Cars",
    productAuctionName: "Honda Civic",
    startDate: "2023-02-01",
    endDate: "2023-12-31",
    totalBid: 200000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "0987654321",
    agreementNumber: "0987654321",
    category: "Cars",
    productAuctionName: "Nissan Altima",
    startDate: "2023-03-01",
    endDate: "2023-12-31",
    totalBid: 300000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9087654321",
    agreementNumber: "9087654321",
    category: "Cars",
    productAuctionName: "Toyota Corolla",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    totalBid: 1000000,
    auctionStatus: "Awaiting Payment",
  },
  {
    registrationNo: "1234567890",
    agreementNumber: "1234567890",
    category: "Cars",
    productAuctionName: "Toyota Camry",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    totalBid: 100000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9876543210",
    agreementNumber: "9876543210",
    category: "Cars",
    productAuctionName: "Honda Civic",
    startDate: "2023-02-01",
    endDate: "2023-12-31",
    totalBid: 200000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "0987654321",
    agreementNumber: "0987654321",
    category: "Cars",
    productAuctionName: "Nissan Altima",
    startDate: "2023-03-01",
    endDate: "2023-12-31",
    totalBid: 300000,
    auctionStatus: "Completed",
  },
  {
    registrationNo: "9087654321",
    agreementNumber: "9087654321",
    category: "Cars",
    productAuctionName: "Toyota Corolla",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    totalBid: 1000000,
    auctionStatus: "Awaiting Payment",
  },
];

export const MannageAuction = () => {
  const [showRegion, setShowRegion] = useState(false);
  const [showSeller, setShowSeller] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const navigate = useNavigate();

  const columns = [
    {
      name: "Registration No",
      selector: (row) => row.registrationNo,
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
      selector: (row) => row.productAuctionName,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: "Total Bid",
      selector: (row) => row.totalBid,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.auctionStatus,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="_edit">
          <MdOutlineRemoveRedEye
            size="18"
            color="#1a2333"
            onClick={() => navigate("/view-auction")}
          />
          <BiEdit
            size="18"
            color="#1b3ea9"
            onClick={() => navigate("/edit-view-auction")}
          />
          <MdDeleteOutline
            size="18"
            color="#ff0000"
            onClick={() => window.alert("DELETE")}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable
        title="Mannage Auction"
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
        selectableRows
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
                <input type="text" placeholder="Search here" />
                <AiOutlineSearch className="search-icon" />
                <button className="export-button">
                  <p>
                    <TfiExport style={{ marginRight: "5px" }} />
                    Export
                  </p>
                </button>
                <button className="filter-button">
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
                <button className="refresh-button">
                  <p>
                    <FiRefreshCcw style={{ marginRight: "5px" }} />
                    Refresh
                  </p>
                </button>
              </div>
            </div>
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
