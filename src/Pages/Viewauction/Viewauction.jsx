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
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await fetch(
        `http://13.48.45.18:4008/bid/getBiddersByAuction/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const { data } = await response.json();
      if (response.ok) {
        console.log(data[2]);
        setBidders(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const columns = [
    {
      name: "Buyer Name",
      cell: (row) =>
        row?.userInforomation[0]?.full_name
          ? row?.userInforomation[0]?.full_name
          : "N/A",
      sortable: true,
    },
    {
      name: "Buyer Ph.No.",
      cell: (row) =>
        row?.userInforomation[0]?.mobile
          ? row?.userInforomation[0]?.mobile
          : "N/A",
      sortable: true,
    },
    {
      name: "Buyer Email",
      selector: (row) =>
        row?.userInforomation[0]?.email
          ? row?.userInforomation[0]?.email
          : "N/A",

      sortable: true,
    },
    {
      name: "Bid Amount",
      selector: (row) => row.bid_price,
      sortable: true,
    },
    {
      name: "Bid Date",
      selector: (row) => "N/A",
      sortable: true,
    },
    {
      name: "Bid Time",
      selector: (row) => "N/A",
      sortable: true,
    },
  ];

  return (
    <div className="addauction-preview">
      {!loading && bidders !== [] && (
        <>
          <ImageGallery
            ref={slideShowref}
            items={images}
            thumbnailPosition="left"
            lazyLoad="true"
            autoPlay="true"
          />
          <div className="image-btn-container">
            <button
              style={{
                backgroundColor: "#038ce4",
              }}
              onClick={setPrimary}
            >
              Set Primary
            </button>
            <button
              style={{
                backgroundColor: "#0ff44f",
              }}
            >
              Edit
            </button>
            <button
              style={{
                backgroundColor: "#ff0000",
              }}
            >
              Delete
            </button>
          </div>
          <div className="biding-details-table">
            <DataTable
              title="Bidding Details"
              columns={columns}
              data={bidders}
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
