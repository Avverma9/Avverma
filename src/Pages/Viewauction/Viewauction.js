import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import DataTable from "react-data-table-component";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

import "./Viewauction.css";

export const Viewauction = () => {
  const [auctionData, setAuctionData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://13.48.45.18:4008/admin/auction/get/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const { data } = await response.json();
      console.log(data, "I am DATA")
      setAuctionData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const columns = [
    {
      name: "Buyer Name",
      cell: (row) => {
        const seller = row.seller[0]; 
        return seller ? seller.name : "";
      },
      sortable: true,
    },
    {
      name: "Buyer Ph.No.",
      cell: (row) => {
        const seller = row.seller[0]; 
        return seller ? seller.name : "";
      },
      sortable: true,
    },
    {
      name: "Buyer Email",
      selector: (row) => row.buyerEmail ?  row.buyerEmail : "N/A",
  
      sortable: true,
    },
    {
      name: "Bid Amount",
      selector: (row) => row.current_bidding_price
      ,
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
      {auctionData && (
        <>
          <div className="image-slider">
        <div className="image-header-contains">
          <button>Set Primary</button>
          <BiEdit size="20" color="#000000" />
          <MdDeleteOutline size="20" color="#ff0000" />
        </div>
        <div className="image-slide">
          <RiArrowLeftDoubleFill />
          {/* {images.map((i) => (
            <img src={i.url} alt="i-banner" />
          ))} */}
          <RiArrowRightDoubleFill />
        </div>
      </div>
          <div className="biding-details-table">
            <DataTable
              title="Bidding Details"
              columns={columns}
              data={auctionData} 
              pagination
              fixedHeader
              fixedHeaderScrollHeight="75vh"
              selectableRows
            />
          </div>
        </>
      )}
    </div>
  );
};

