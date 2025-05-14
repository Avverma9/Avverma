import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import "./Booknow.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyData } from "../../redux/reducers/bookingSlice";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const Rooms = ({
  hotelData,
  selectedRooms,
  handleAddRoom,
  handleRemoveRoom,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const newhotelId = path.substring(path.lastIndexOf("/") + 1);
  const dispatch = useDispatch();
  const { monthlyData } = useSelector((state) => state.booking);

  const checkInDate = localStorage.getItem("selectedCheckInDate");
  const checkOutDate = localStorage.getItem("selectedCheckOutDate");

  // Function to convert date string to YYYY-MM-DD format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  // Format check-in and check-out dates
  const formattedCheckIn = checkInDate ? formatDate(checkInDate) : null;
  const formattedCheckOut = checkOutDate ? formatDate(checkOutDate) : null;

  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchMonthlyData(newhotelId));
    }
  }, [dispatch, newhotelId]);

  // Initialize overallLowestPrice to a high value
  let overallLowestPrice = Infinity;

  return (
    <div>
      {/* Special rooms desktop view */}
      <div className="col-md-13 d-none d-sm-block">
        <div className="container mt-6">
          <Grid container spacing={4}>
            {hotelData?.rooms?.map((room, index) => {
              const monthlyEntry = monthlyData.find((data) => {
                return (
                  data.roomId === room.roomId &&
                  data.hotelId === newhotelId &&
                  data.startDate <= formattedCheckIn &&
                  data.endDate >= formattedCheckOut
                );
              });

              // Ensure displayPrice is an array
              const displayPrice = monthlyEntry
                ? monthlyEntry.monthPrice
                : [room.price];
              const numericPrices = Array.isArray(displayPrice)
                ? displayPrice.map((price) => Number(price))
                : [Number(displayPrice)];

              // Check if numericPrices is a valid array
              if (!Array.isArray(numericPrices) || numericPrices.length === 0) {
                console.warn("numericPrices is not valid:", numericPrices);
                return null; // Skip rendering if invalid
              }

              // Find the lowest price for this room
              const lowestPrice = Math.min(...numericPrices);
              overallLowestPrice = Math.min(overallLowestPrice, lowestPrice);

              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <div style={{ marginBottom: "20px" }}>
                    <Card sx={{ width: "100%", borderRadius: "0" }}>
                      <Box position="relative" width="100%" height="130px">
                        <CardMedia
                          component="img"
                          className="card-media-image"
                          src={
                            room.images && room.images.length > 0
                              ? room.images[0]
                              : hotelData?.images?.[0]
                          }
                          alt={`Room ${index + 1} Image`}
                          style={{
                            width: "100%",
                            height: "130px",
                            objectFit: "cover",
                          }}
                        />

                        {room?.countRooms === 0 && (
                          <Box
                            position="absolute"
                            top={8}
                            right={8}
                            bgcolor="error.main"
                            color="white"
                            px={1}
                            py={0.5}
                            borderRadius="4px"
                            zIndex={2}
                          >
                            <Typography variant="caption" fontWeight="bold">
                              Sold
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          {room.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bed: {room.bedTypes}
                          <BedOutlinedIcon
                            style={{
                              fontSize: "small",
                              verticalAlign: "middle",
                              marginLeft: "5px",
                            }}
                          />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price:{" "}
                          <CurrencyRupeeIcon
                            style={{
                              fontSize: "small",
                              verticalAlign: "middle",
                            }}
                          />
                          {lowestPrice}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {selectedRooms.find(
                          (selected) => selected.roomId === room.roomId,
                        ) ? (
                          <button
                            size="small"
                            className="custom-button"
                            onClick={() => handleRemoveRoom(room)}
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            size="small"
                            className="custom-button"
                            onClick={() => handleAddRoom(room)}
                          >
                            Select
                          </button>
                        )}
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>

      {/* Mobile view section for special rooms */}
      <div className="col-md-4 d-block d-md-none">
        <div className="container mt-3">
          <Grid container spacing={1}>
            {hotelData?.rooms?.map((room, index) => {
              const monthlyEntry = monthlyData.find((data) => {
                return (
                  data.roomId === room.roomId &&
                  data.hotelId === newhotelId &&
                  data.startDate <= formattedCheckIn &&
                  data.endDate >= formattedCheckOut
                );
              });

              const displayPrice = monthlyEntry
                ? monthlyEntry.monthPrice
                : [room.price];
              const numericPrices = Array.isArray(displayPrice)
                ? displayPrice.map((price) => Number(price))
                : [Number(displayPrice)];

              const lowestPrice = Math.min(...numericPrices);

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ display: "flex", position: "relative" }}>
                    <Box position="relative">
                      <CardMedia
                        component="img"
                        height="150px"
                        style={{ objectFit: "cover", width: "120px" }}
                        src={
                          room.images && room.images.length > 0
                            ? room.images[0]
                            : hotelData?.images?.[0]
                        }
                        alt={`Room ${index + 1} Image 1`}
                      />

                      {room?.countRooms === 0 && (
                        <Box
                          position="absolute"
                          top={8}
                          right={8}
                          bgcolor="error.main"
                          color="white"
                          px={1}
                          py={0.5}
                          borderRadius="4px"
                          zIndex={2}
                        >
                          <Typography variant="caption" fontWeight="bold">
                            Sold
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        {room.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bed: {room.bedTypes}
                        <BedOutlinedIcon
                          style={{
                            fontSize: "small",
                            verticalAlign: "middle",
                            marginLeft: "5px",
                          }}
                        />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price:{" "}
                        <CurrencyRupeeIcon
                          style={{ fontSize: "small", verticalAlign: "middle" }}
                        />
                        {lowestPrice}
                      </Typography>

                      <CardActions>
                        {selectedRooms.find(
                          (selected) => selected.roomId === room.roomId,
                        ) ? (
                          <button
                            size="small"
                            className="custom-button"
                            onClick={() => handleRemoveRoom(room)}
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            size="small"
                            className="custom-button"
                            onClick={() => handleAddRoom(room)}
                          >
                            Select
                          </button>
                        )}
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>

      {/* Save overall lowest price to localStorage */}
      {overallLowestPrice !== Infinity &&
        localStorage.setItem("lowestPrice", overallLowestPrice)}
    </div>
  );
};

Rooms.propTypes = {
  hotelData: PropTypes.shape({
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        roomId: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.string.isRequired,
        bedTypes: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedRooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleAddRoom: PropTypes.func.isRequired,
  handleRemoveRoom: PropTypes.func.isRequired,
};

export default Rooms;
