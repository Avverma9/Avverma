import React, { useState, useEffect } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import AspectRatio from "@mui/joy/AspectRatio";
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
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../../baseURL";

const Hotel = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = location.search.substring(1); // Remove the leading '?'

  const apiUrl = `${baseURL}/hotels/filters?${queryString}`;
  console.log(apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("coming hotel data", data);
        setHotelData(data.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const paths = ["/search/hotels", "/search"];

  if (!paths.includes(location.pathname) || loading) {
    return <Box sx={{ width: "100%" }}>{/* <LinearProgress /> */}</Box>;
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
  
  return (
    <div className="container-fluid mt-4">
      <hr />
      <div className="row">
        {hotelData.map((hotel, index) => (
          <div key={index} className="col-md-3 mb-3">
            <Card sx={{ width: 350 }}>
              <div>
                <Typography level="title-lg">{hotel.hotelName}</Typography>
                <Typography level="body-sm">
                  {" "}
                  <FmdGoodIcon />
                  {hotel.city}, {hotel.state}
                </Typography>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: "absolute", top: "0.875rem", right: ".5rem" }}
                >
                  {" "}
                  {hotel.starRating.substring(0, 1)}
                  <StarHalfIcon />
                </IconButton>
              </div>
              
              {/* Replace AspectRatio with Carousel */}
              <Carousel>
                {hotel.images.map((image, i) => (
                  <Carousel.Item key={i}>
                    <img
                      src={image}
                      className="d-block w-100"
                      alt=""
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <CardContent>
                {/* Amenities Section */}
                {hotel.amenities.map((amenity, amenityIndex) => (
        <div key={amenityIndex} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {amenity?.amenities?.slice(0, 4).map((singleAmenity, singleAmenityIndex) => (
            <Typography key={singleAmenityIndex} level="body-sm" style={{ margin: '5px', whiteSpace: 'nowrap' }}>
              <IconContext.Provider value={{ size: '1.2em' }}>
                {amenityIcons[singleAmenity] || defaultIcon}
              </IconContext.Provider>{" "}{singleAmenity}
            </Typography>
          ))}
          {/* Add more amenities details as needed */}
        </div>
      ))}
              </CardContent>
              
              <CardContent orientation="horizontal">
                <div>
                  <Typography level="body-xs">Price:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    <CurrencyRupeeIcon /> {hotel.price}
                  </Typography>
                </div>
              </CardContent>
              
              <Button
                variant="solid"
                size="md"
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
    </div>
  );
};

export default Hotel;
