import React, { useState, useEffect } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
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
import baseURL from "../../baseURL";

const Hotel = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = location.search.substring(1); // Remove the leading '?'
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiUrl = `${baseURL}/hotels/filters?${queryString}&page=${page}`;
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
    Balcony: <FaDoorOpen />,
    Jacuzzi: <FaHotTub />,
    TV: <FaTv />,
    "Free Wi-Fi": <FaWifi />,
    Gym: <FaDumbbell />,
    "24-Hour Front Desk": <FaShuttleVan />,
    "Shuttle Service": <FaShuttleVan />,
  };

  const defaultIcon = <DoneAllIcon />;

  return (
    <div className="container mt-4">
      <hr />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {hotelData.map((hotel, index) => (
          <div key={index} className="col mb-3">
            <Card sx={{ width: "100%", height: "400px", overflow: "hidden" }}>
              <div>
            
                
              {hotel?.rooms?.[0]?.price < hotel?.rooms?.[0]?.originalPrice && (
  <div style={{ position: "absolute", top: "0.5rem", right: ".5rem" }}>
    <Stack direction="row" spacing={1}>
     
      <Chip
        label={`Get ${hotel?.rooms?.[0]?.offerPriceLess}% less`}
        color="success"
        variant="filled"
        avatar={<Avatar alt="Offer" src="/static/images/avatar/1.jpg" />}
      />
    </Stack>
  </div>
)}
                <br />
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
                  sx={{ position: "absolute", top: "0.5rem", left: ".5rem" }}
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
              <CardContent style={{ maxHeight: "30px", overflow: "hidden" }}>
                {/* Amenities Section */}
                {hotel.amenities.map((amenity, amenityIndex) => (
                  <div
                    key={amenityIndex}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      maxHeight: "30px",
                      overflow: "hidden",
                    }}
                  >
                    {amenity?.amenities
                      ?.slice(0, 4)
                      .map((singleAmenity, singleAmenityIndex) => (
                        <Typography
                          key={singleAmenityIndex}
                          level="body-xs"
                          style={{
                            margin: "5px",
                            whiteSpace: "nowrap",
                            maxHeight: "30px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <IconContext.Provider value={{ size: "1.2em" }}>
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          renderItem={(item) => (
            <PaginationItem
              component="a"
              {...item}
              onClick={(event) => {
                if (
                  item.type !== "start-ellipsis" &&
                  item.type !== "end-ellipsis"
                ) {
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

export default Hotel;
