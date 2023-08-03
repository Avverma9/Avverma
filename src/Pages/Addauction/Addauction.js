import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import DataTable from "react-data-table-component";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

import "./Addauction.css";

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
    buyerEmail: "Cars",
    bidAmnt: "Toyota Camry",
    bidDate: "26-07-2023",
    bidTime: "17:40",
  },
  {
    buyerName: "Sourav",
    buyerPhn: "7826300178",
    buyerEmail: "Cars",
    bidAmnt: "Toyota Camry",
    bidDate: "26-07-2023",
    bidTime: "17:40",
  },
  {
    buyerName: "Sourav",
    buyerPhn: "7826300178",
    buyerEmail: "Cars",
    bidAmnt: "Toyota Camry",
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

export const Addauction = () => {
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
    <div className="auction-detail">
      <div className="dropdown-flex">
        <div className="region">
          <select className="select-option" id="select-option">
            <option value="">Region</option>
            <option value="name">Region 1</option>
            <option value="mobile">Region 2</option>
            <option value="email">Region 3</option>
          </select>
        </div>
        <div className="category">
          <select className="select-option" id="select-option">
            <option value="">Category</option>
            <option value="name">Category 1</option>
            <option value="mobile">Category 2</option>
            <option value="email">Category 3</option>
          </select>
        </div>
        <div className="seller">
          <select className="select-option" id="select-option">
            <option value="">Seller</option>
            <option value="name">Seller 1</option>
            <option value="mobile">Seller 2</option>
            <option value="email">Seller 3</option>
          </select>
        </div>
      </div>
      <div className="addauction-new">
        <div className="addauction-new-form-section">
          <label htmlFor="nameofproduct">
            Name of the product
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Ragistration Number">
            Ragistration Number
            <input type="number" placeholder="name" />
          </label>
          <label htmlFor="Agrement Number">
            Agrement Number
            <input type="number" placeholder="name" />
          </label>
          <label htmlFor="RC">
            RC
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Start Price">
            Start Price
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Reserve Price">
            Reserve Price
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Start Time">
            Start Time
            <input type="date" placeholder="name" />
          </label>
          <label htmlFor="Start Date">
            Start Date
            <input type="date" placeholder="name" />
          </label>
          <label htmlFor="End Time">
            End Time
            <input type="date" placeholder="name" />
          </label>
          <label htmlFor="End Date">
            End Date
            <input type="date" placeholder="name" />
          </label>
          <label htmlFor="Fuel Type">
            Fuel Type
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Parking Name">
            Parking Name
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Parking Address">
            Parking Address
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Year Of Manufecture">
            Year Of Manufecture
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Payment Term">
            Payment Term
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Auction Fees">
            Auction Fees
            <input type="text" placeholder="name" />
          </label>
          <label htmlFor="Other Information">
            Other Information
            <input type="text" placeholder="name" />
          </label>
          <h4 className="add-photo-text">Add Photo/Video</h4>
          <label htmlFor="file-input" className="file-label">
            
            <div className="add-video">
            <input type="file" id="file-input" className="file-input" accept="image/*, video/*" />
        <button type="submit" className="add-video-butt"><FiUpload/>Upload</button></div>
          </label>
        </div>
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
      </div>
    </div>
  );
};