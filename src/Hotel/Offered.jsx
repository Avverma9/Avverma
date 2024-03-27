import React, { useState, useEffect } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Button from "@mui/joy/Button";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  FaCoffee,
  FaTv,
  FaWifi,
  FaDumbbell,
  FaShuttleVan,
  FaBed,
  FaUtensils,
  FaPhone,
  FaHotTub,
  FaDoorOpen,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import Card from "@mui/joy/Card";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../baseURL";


const Offered = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = location.search.substring(1); // Remove the leading '?'
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiUrl = "https://hotel-backend-tge7.onrender.com/hotels/filters?city=&startDate=2024-03-27&endDate=2024-03-28&localId=&unmarriedCouplesAllowed=";
  console.log(apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("coming hotel data", data);
        setHotelData(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, page]);



if(location.pathname !== "/"){
  return null
}

  const handleBuy = (hotelID) => {
    navigate(`/book-hotels/${hotelID}`);
  };

  const amenityIcons = {
    "Continental Breakfast": <FaUtensils />,
    "Room Service": <FaPhone />,
    "Coffee Maker": <FaCoffee />,
    "Balcony": <FaDoorOpen />,
    "Jacuzzi": <FaHotTub />,
    "TV": <FaTv />,
    "Free Wi-Fi": <FaWifi />,
    "Gym": <FaDumbbell />,
    "24-Hour Front Desk": <FaShuttleVan />,
    "Shuttle Service": <FaShuttleVan />,
  };

  const defaultIcon = <DoneAllIcon />;
const filtered = hotelData.filter((item)=>item.isOffer === true)
  return (
    <div className="container mt-4">
  <h4 style={{ color: 'blue', fontSize: '18px', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '20px' }}>Offers are available</h4>

    <hr />
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {filtered.map((hotel, index) => (
        <div key={index} className="col mb-3">
          <Card sx={{ width: "100%", height: "400px", overflow: "hidden" }}>
            <div>
              <Typography level="title-sm">{hotel.hotelName}</Typography>
              <Typography level="body-xs">
                {" "}
                <FmdGoodIcon />
                {hotel.city}, {hotel.state}
              </Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: "absolute", top: "0.5rem", right: ".5rem" }}
              >
                {" "}
                {hotel.starRating.substring(0, 1)}
                <StarHalfIcon />
              </IconButton>
            </div>
            <Carousel>
              {hotel.images.map((image, i) => (
                <Carousel.Item key={i}>
                  <img
                    src={image}
                    className="d-block w-100"
                    alt=""
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <CardContent style={{ maxHeight: '30px', overflow: 'hidden' }}>
              {/* Amenities Section */}
              {hotel.amenities.map((amenity, amenityIndex) => (
                <div key={amenityIndex} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '30px', overflow: 'hidden' }}>
                  {amenity?.amenities?.slice(0, 4).map((singleAmenity, singleAmenityIndex) => (
                    <Typography key={singleAmenityIndex} level="body-xs" style={{ margin: '5px', whiteSpace: 'nowrap', maxHeight: '30px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <IconContext.Provider value={{ size: '1.2em' }}>
                        {amenityIcons[singleAmenity] || defaultIcon}
                      </IconContext.Provider>{" "}
                      {singleAmenity}
                    </Typography>
                  ))}
                </div>
              ))}
            </CardContent>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Price:</Typography>
                <Typography fontSize="sm" fontWeight="lg">
                  <CurrencyRupeeIcon /> {hotel.price}
                </Typography>
              </div>
            </CardContent>
            <Button
              variant="solid"
              size="sm"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              onClick={() => handleBuy(hotel.hotelId)}
            >
              View details
            </Button>
          </Card>
        </div>
      ))}
    </div>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        renderItem={(item) => (
          <PaginationItem
            component="a"
            {...item}
            onClick={(event) => {
              if (item.type !== 'start-ellipsis' && item.type !== 'end-ellipsis') {
                setPage(item.page);
              }
            }}
          />
        )}
        shape="rounded"
        size="large"
      />
    </Box>
  </div>
  

  );
};

export default Offered;
