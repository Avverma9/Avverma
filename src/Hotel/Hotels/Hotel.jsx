/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiPerson } from "react-icons/gi";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { FaElevator } from "react-icons/fa6";
import { GiDesk } from "react-icons/gi";
import { BiSolidDryer } from "react-icons/bi";
import { LuRefrigerator } from "react-icons/lu";
import { IconContext } from "react-icons";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import {
  FaWineGlass,
  FaUtensils,
  FaPhone,
  FaCoffee,
  FaDoorOpen,
  FaHotTub,
  FaTv,
  FaCheckCircle,
  FaWifi,
  FaDumbbell,
  FaShuttleVan,
  FaSwimmingPool,
  FaSpa,
  FaChalkboardTeacher,
  FaParking,
  FaDog,
  FaTshirt,
  FaBriefcase,
  FaCouch,
  FaSnowflake,
  FaFireAlt,
  FaShower,
  FaPhoneAlt,
  FaBroom,
  FaSoap,
  FaSuitcase,
  FaLock,
  FaClock,
  FaThermometer,
  FaSmokingBan,
  FaVolumeMute,
  FaBed,
  FaWheelchair,
  FaPlaneDeparture,
  FaUserFriends,
  FaCar,
  FaMoneyBillAlt,
  FaGift,
  FaClipboardCheck,
  FaMapMarkedAlt,
  FaTicketAlt,
  FaBookOpen,
  FaSun,
  FaLeaf,
  FaTree,
  FaChair,
  FaCity,
  FaCocktail,
  FaCandyCane,
  FaAppleAlt,
  FaHamburger,
  FaCookieBite,
  FaChild,
  FaBan,
  FaCarrot,
  FaMosque,
  FaStarOfDavid,
  FaAllergies,
  FaSmoking,
} from "react-icons/fa";
import { MdMicrowave } from "react-icons/md";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../../baseURL";

const Hotel = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = location.search.substring(1); // Remove the leading '?'
  const apiUrl = `${baseURL}/hotels/filters?${queryString}&page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const paths = ["/search/hotels", "/search"];
  if (!paths.includes(location.pathname) || loading) {
    return (
      <Box sx={{ width: "100%" }}>{/* Loading Spinner or Indicator */}</Box>
    );
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
    Pool: <FaSwimmingPool />,
    "Fitness Center": <FaDumbbell />,
    Spa: <FaSpa />,
    Restaurant: <FaUtensils />,
    "Conference Room": <FaChalkboardTeacher />,
    "Wi-Fi(Paid)": <FaWifi />,
    Parking: <FaParking />,
    "Pet Friendly": <FaDog />,
    "Laundry Service": <FaTshirt />,
    "Business Center": <FaBriefcase />,
    "Lounge Area": <FaCouch />,
    "Air Conditioning": <FaSnowflake />,
    "Barbecue Area": <FaFireAlt />,
    "Ensuite Bathroom": <FaShower />,
    Telephone: <FaPhoneAlt />,
    "Daily Housekeeping": <FaBroom />,
    "Complimentary Toiletries": <FaSoap />,
    Closet: <FaSuitcase />,
    "Iron and Ironing Board": <FaTshirt />,
    "Hair Dryer": <BiSolidDryer />,
    Safe: <FaLock />,
    "Mini Fridge": <LuRefrigerator />,
    Microwave: <MdMicrowave />,
    Desk: <GiDesk />,
    "Wake-up Service": <FaClock />,
    Heating: <FaThermometer />,
    "Cable Channels": <FaTv />,
    "Non-Smoking Rooms": <FaSmokingBan />,
    "Soundproof Rooms": <FaVolumeMute />,
    "Family Rooms": <FaBed />,
    Elevator: <FaElevator />,
    "Wheelchair Accessible": <FaWheelchair />,
    "Airport Shuttle": <FaPlaneDeparture />,
    "Concierge Service": <FaUserFriends />,
    "Valet Parking": <FaCar />,
    "Currency Exchange": <FaMoneyBillAlt />,
    "ATM on Site": <FaMoneyBillAlt />,
    "Gift Shop": <FaGift />,
    "Express Check-in/Check-out": <FaClipboardCheck />,
    "Tour Desk": <FaMapMarkedAlt />,
    "Ticket Service": <FaTicketAlt />,
    "Luggage Storage": <FaSuitcase />,
    Library: <FaBookOpen />,
    "Sun Terrace": <FaSun />,
    Garden: <FaLeaf />,
    "Picnic Area": <FaTree />,
    "Outdoor Furniture": <FaChair />,
    Terrace: <FaCity />,
    "BBQ Facilities": <FaFireAlt />,
    "Vending Machine (Drinks)": <FaCocktail />,
    "Vending Machine (Snacks)": <FaCandyCane />,
    "Special Diet Menus (on request)": <FaAppleAlt />,
    "Packed Lunches": <FaHamburger />,
    Bar: <FaCocktail />,
    "Wine/Champagne": <FaWineGlass />,
    "Bottle of Water": <FaCocktail />,
    "Chocolate/Cookies": <FaCookieBite />,
    "Kid-Friendly Buffet": <FaChild />,
    "Kid Meals": <FaChild />,
    "Breakfast in the Room": <FaUtensils />,
    "Restaurant Buffet": <FaUtensils />,
    "Snack Bar": <FaUtensils />,
    Fruit: <FaAppleAlt />,
    "Buffet Breakfast": <FaUtensils />,
    "Gluten-Free Options": <FaBan />,
    "Vegetarian Options": <FaCarrot />,
    "Vegan Options": <FaLeaf />,
    "Halal Options": <FaMosque />,
    "Kosher Options": <FaStarOfDavid />,
    "Allergy-Free Room": <FaAllergies />,
    "Designated Smoking Area": <FaSmoking />,
    "Non-Smoking Throughout": <FaSmokingBan />,
    Kitchen: <FaUtensils />,
  };
  const defaultIcon = <DoneAllIcon />;

  return (
    <div className="container mt-4">
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
                        {hotel.reviews || "0"} Reviews
                      </span>
                    </div>
                    <div style={{ maxHeight: "40px", overflow: "hidden" }}>
                      {/* Amenities Section */}
                      <CardContent
                        style={{ maxHeight: "40px", overflow: "hidden" }}
                      >
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
                                  <IconContext.Provider
                                    value={{ size: "1.2em" }}
                                  >
                                    {amenityIcons[singleAmenity] || defaultIcon}
                                  </IconContext.Provider>{" "}
                                  {singleAmenity}
                                </Typography>
                              ))}
                          </div>
                        ))}
                      </CardContent>
                    </div>

                    <a href="#" className="text-primary mt-2 d-block">
                      + all other amenities
                    </a>
                    <p className="mt-2">
                      {hotel.description || "No description available."}
                    </p>
                    <div className="mt-2">
                      <GiPerson /> {hotel.peopleLooking || 0} people looking
                      right now
                    </div>
                  </div>
                  <div className="col-md-3 text-center">
                    <ul className="list-unstyled">
                      <li>
                        <FaCheckCircle className="text-success" /> Free
                        Cancellation
                      </li>
                      <li>
                        <FaCheckCircle className="text-success" /> FREE
                        Breakfast
                      </li>
                      <li>
                        <FaCheckCircle className="text-success" /> Pay @ Hotel
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
                    <p className="text-muted">for 1 guest (Ex. GST)</p>
                    <button
                      className="btn btn-warning btn-block text-white"
                      onClick={() => handleBuy(hotel.hotelId)}
                    >
                      Select Rooms
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
  );
};

export default Hotel;
