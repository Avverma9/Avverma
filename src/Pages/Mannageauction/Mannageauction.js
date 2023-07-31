import React from "react";
import DataTable from "react-data-table-component";

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
    },
    {
      name: "Agreement No",
      selector: (row) => row.agreementNumber,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Product Auction Name",
      selector: (row) => row.productAuctionName,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
    },
    {
      name: "Total Bid",
      selector: (row) => row.totalBid,
    },
    {
      name: "Status",
      selector: (row) => row.auctionStatus,
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
      />
    </>
  );
};