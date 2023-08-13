import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import DataTable from "react-data-table-component";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

import "./Viewauction.css";

const images = [
  // {
  //   url: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbWJvcmdoaW5pJTIwaHVyYWNhbiUyMGV2b3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  // },
  // {
  //   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIipyWxb6ZsJoyIySw4a_nISPRPJBR-AHJf6n4ODhy&s",
  // },
  {
    url: "https://imgd.aeplcdn.com/600x337/cw/ec/38359/Lamborghini-Huracan-Exterior-148260.jpg?wm=1&q=75",
  },
];

const data = [
  {
    buyerName: "Sourav",
    buyerPhn: "7826300178",
    buyerEmail: "buyer@ab.com",
    bidAmnt: "1200",
    bidDate: "26-07-2023",
    bidTime: "17:40",
  },
  {
    buyerName: "Sourav",
    buyerPhn: "7826300178",
    buyerEmail: "buyer@ab.com",
    bidAmnt: "1200",
    bidDate: "26-07-2023",
    bidTime: "17:40",
  },
  {
    buyerName: "Sourav",
    buyerPhn: "7826300178",
    buyerEmail: "buyer@ab.com",
    bidAmnt: "1200",
    bidDate: "26-07-2023",
    bidTime: "17:40",
  },
];

export const Viewauction = () => {
  const columns = [
    {
      name: "Buyer Name",
      selector: (row) => row.buyerName,
      sortable: true,
    },
    {
      name: "Buyer Ph.No.",
      selector: (row) => row.buyerPhn,
      sortable: true,
    },
    {
      name: "Buyer Email",
      selector: (row) => row.buyerEmail,
      sortable: true,
    },
    {
      name: "Bid Amount",
      selector: (row) => row.bidAmnt,
      sortable: true,
    },
    {
      name: "Bid Date",
      selector: (row) => row.bidDate,
      sortable: true,
    },
    {
      name: "Bid Time",
      selector: (row) => row.bidTime,
      sortable: true,
    },
  ];
  return (
    <div className="addauction-preview">
      <div className="image-slider">
        <div className="image-header-contains">
          <button>Set Primary</button>
          <BiEdit size="20" color="#000000" />
          <MdDeleteOutline size="20" color="#ff0000" />
        </div>
        <div className="image-slide">
          <RiArrowLeftDoubleFill />
          {images.map((i) => (
            <img src={i.url} alt="i-banner" />
          ))}
          <RiArrowRightDoubleFill />
        </div>
      </div>
      <div className="biding-details-table">
        <DataTable
          title="Bidding Details"
          columns={columns}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          selectableRows
        />
      </div>
    </div>
  );
};
