import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import baseURL from "../../utils/baseURL";
import { userId } from "../../utils/Unauthorized";
import HotelMobileCard from "./hotel";
export default function  Offered  ()  {
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
    <div className="mt-4">
      <hr />

      <HotelMobileCard hotelData={limitedData} />
    </div>
  );
};
