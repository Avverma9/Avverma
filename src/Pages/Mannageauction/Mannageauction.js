import React from "react";
import DataTable from "react-data-table-component";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

import "./Mannageauction.css";

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
            onClick={() => window.alert(row.productAuctionName)}
          />
          <BiEdit
            size="18"
            color="#1b3ea9"
            onClick={() => window.alert(row.productAuctionName)}
          />
          <MdDeleteOutline
            size="18"
            color="#ff0000"
            onClick={() => window.alert(row.productAuctionName)}
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
          <div className="_mannage-auction-sub-header">
            <input type="text" placeholder="Search here" />
            <button>Filter</button>
            <button>Add New Auction</button>
            <button>Upload Bulk</button>
            <button>Refresh</button>
          </div>
        }
        actions={<button>Export</button>}
      />
    </>
  );
};