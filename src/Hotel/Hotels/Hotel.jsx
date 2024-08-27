import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiPerson } from "react-icons/gi";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useLoader } from "../../utils/loader";
import Stack from "@mui/material/Stack";
import { IconContext } from "react-icons";
import Typography from "@mui/joy/Typography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Carousel } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Button from "@mui/joy/Button";
import { FaCheckCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import amenityIcons from "../../utils/amenities";
import Card from "@mui/joy/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../../baseURL";
import Filterbar from "./Filterbar";
import "./Hotel.css";
import FilterSidebar from "./FilterSidebar";
const Hotel = () => {
  const [hotelData, setHotelData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const queryString = location.search.substring(1); // Remove the leading '?'
  const apiUrl = `${baseURL}/hotels/filters?${queryString}&page=${page}`;
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    rating: 0,
    amenities: [],
  });
  const fetchData = async () => {
    showLoader();
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setHotelData(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);
  const paths = ["/search/hotels", "/search"];
  if (!paths.includes(location.pathname)) {
    return null;
  }

  const handleBuy = (hotelID) => {
    navigate(`/book-hotels/${hotelID}`);
  };

  const defaultIcon = <DoneAllIcon />;
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update queryString with new filters
    const newQueryString = new URLSearchParams({
      ...newFilters,
      page,
    }).toString();
    navigate(`/search/hotels?${newQueryString}`);
  };
  return (
    <>
      <div className="filtesidebar-container">
        <FilterSidebar />
      </div>

      <div style={{ display: "flex", margin: "20px" }}>
        <div className="filterbar-container">
          <Filterbar onFilterChange={handleFilterChange} />
        </div>
        <div style={{ flexGrow: 1, marginLeft: "20px" }}>
          <div className="container mt-4 d-block d-md-none">
            <hr />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {hotelData.map((hotel, index) => (
                <div key={index} className="col mb-3">
                  <Card
                    sx={{ width: "100%", height: "400px", overflow: "hidden" }}
                  >
                    <div>
                      {hotel?.rooms?.[0]?.price <
                        hotel?.rooms?.[0]?.originalPrice && (
                        <div
                          style={{
                            position: "absolute",
                            top: "0.5rem",
                            right: ".5rem",
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={`Get ${hotel?.rooms?.[0]?.offerPriceLess}% less`}
                              color="success"
                              variant="filled"
                              avatar={
                                <Avatar
                                  alt="Off"
                                  src="/static/images/avatar/1.jpg"
                                />
                              }
                            />
                          </Stack>
                        </div>
                      )}
                      <br />
                      <Typography level="title-sm">
                        {hotel.hotelName}
                      </Typography>
                      <Typography level="body-xs">
                        <FmdGoodIcon />
                        {hotel.city}, {hotel.state}
                      </Typography>
                      <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{
                          position: "absolute",
                          top: "0.5rem",
                          left: ".5rem",
                        }}
                      >
                        <Box key={hotel._id} sx={{ "& > legend": { mt: 2 } }}>
                          <Rating
                            name="hotel-rating"
                            value={hotel?.starRating}
                            readOnly
                          />
                        </Box>
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
                    <CardContent
                      style={{ maxHeight: "30px", overflow: "hidden" }}
                    >
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
                            ?.slice(0, 5)
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
          <div className="container mt-4 d-none d-sm-block">
            {hotelData && hotelData.length > 0 ? (
              <div className="row border p-3 bg-white">
                {hotelData.map((hotel, index) => (
                  <React.Fragment key={index}>
                    <div className="col-md-12 mb-4">
                      <div className="row">
                        <div className="col-md-4">
                          <img
                            src={
                              hotel?.images?.[0]
                                ? hotel.images[0]
                                : "https://via.placeholder.com/300x200"
                            }
                            alt="Hotel"
                            className="img-fluid rounded"
                            style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-md-5">
                          <h4>{hotel.hotelName}</h4>
                          <p className="text-muted">
                            {hotel.city}, {hotel.state}
                          </p>
                          <span className="badge bg-warning text-dark">
                            100% Safe Place to Stay™
                          </span>
                          <div className="mt-2">
                            <span className="badge bg-primary">
                              {hotel?.starRating || "N/A"}/5
                            </span>
                            <span className="text-muted ms-2">
                              {hotel?.reviewCount || "0"} Reviews
                            </span>
                          </div>
                          <div
                            style={{ maxHeight: "40px", overflow: "hidden" }}
                          >
                            <CardContent
                              style={{ maxHeight: "40px", overflow: "hidden" }}
                            >
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
                                    .map(
                                      (singleAmenity, singleAmenityIndex) => (
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
                                          <IconContext.Provider
                                            value={{ size: "1.2em" }}
                                          >
                                            {amenityIcons[singleAmenity] ||
                                              defaultIcon}
                                          </IconContext.Provider>{" "}
                                          {singleAmenity}
                                        </Typography>
                                      )
                                    )}
                                </div>
                              ))}
                            </CardContent>
                          </div>
                          <p className="mt-2">
                            {hotel.description || "No description available."}
                          </p>
                        </div>
                        <div className="col-md-3 text-center">
                          <ul className="list-unstyled">
                            <li>
                              <FaCheckCircle className="text-success" /> Free
                              Amenities
                            </li>
                            <li>
                              <FaCheckCircle className="text-success" /> 100%
                              Cleaned Rooms
                            </li>
                            <li>
                              <FaCheckCircle className="text-success" /> Room
                              Service
                            </li>
                          </ul>
                          <p className="text-muted text-decoration-line-through">
                            ₹{hotel.originalPrice || "N/A"}
                          </p>
                          <p className="text-danger">
                            {hotel.discount
                              ? `${hotel.discount}% off`
                              : "No discount"}
                          </p>
                          <h3>
                            ₹{hotel.price || "N/A"}{" "}
                            <small className="text-muted">/night</small>
                          </h3>
                          <p className="text-muted">for 1 Room (Ex. GST)</p>
                          <button
                            className="btn btn-warning btn-block text-white"
                            onClick={() => handleBuy(hotel.hotelId)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <img
                  src="https://www.waadaa.insure/images/not_found.gif"
                  alt="No Hotels Found"
                  className="img-fluid"
                  style={{
                    maxWidth: "600px",
                    width: "100%",
                    height: "auto",
                    margin: "0 auto",
                  }}
                />
                <h3 className="mt-4">No Hotels Found</h3>
                <p>Please try again later or adjust your search criteria.</p>
              </div>
            )}
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
        </div>
      </div>
    </>
  );
};

export default Hotel;
