import React, { useState, useEffect } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Button from "@mui/joy/Button";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import amenityIcons from "../utils/extrasList";
import Stack from "@mui/material/Stack";
import { IconContext } from "react-icons";
import Card from "@mui/joy/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../utils/baseURL";
import { userId } from "../utils/Unauthorized";
import HotelMobileCard from "./Hotels/pages/HotelMobileCard";
const Offered = () => {
  const [hotelData, setHotelData] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(1);

  const apiUrl = `${baseURL}/get/offers/main/hotels`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchData();
  }, [apiUrl, page]);

  if (location.pathname !== "/") {
    return null;
  }

  const handleBuy = (hotelID) => {
    window.location.href = `/book-hotels/${userId}/${hotelID}`;
  };

  const limitedData = hotelData?.slice(0, 10);
  return (
    <div className="container mt-4">
      <hr />

      <HotelMobileCard hotelData={limitedData} />
    </div>
  );
};

export default Offered;
