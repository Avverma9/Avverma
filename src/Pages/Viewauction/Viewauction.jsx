import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import ImageGallery from "react-image-gallery";

import "./Viewauction.css";

export const Viewauction = () => {
  const [auctionData, setAuctionData] = useState(null);
  const { id } = useParams();

  const slideShowref = useRef();

  // const currentImage = getCurrentIndex();

  const setPrimary = () => {
    console.log(slideShowref.current.getCurrentIndex());
  };

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

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
      console.log(data, "I am DATA");
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
      selector: (row) => (row.buyerEmail ? row.buyerEmail : "N/A"),

      sortable: true,
    },
    {
      name: "Bid Amount",
      selector: (row) => row.current_bidding_price,
      sortable: true,
    },
    {
      name: "Bid Date",
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: "Bid Time",
      selector: (row) => row.endTime,
      sortable: true,
    },
  ];

  return (
    <div className="addauction-preview">
      {auctionData && (
        <>
          <ImageGallery
            ref={slideShowref}
            items={images}
            thumbnailPosition="left"
            lazyLoad="true"
            autoPlay="true"
          />
          <div>
            <button onClick={setPrimary}>Set Primary</button>
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
