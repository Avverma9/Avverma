import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyData } from "../../redux/reducers/bookingSlice";
import { useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/material";
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
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };
  const formattedCheckIn = checkInDate ? formatDate(checkInDate) : null;
  const formattedCheckOut = checkOutDate ? formatDate(checkOutDate) : null;
  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchMonthlyData(newhotelId));
    }
  }, [dispatch, newhotelId]);
  let overallLowestPrice = Infinity;
  return (
    <Box sx={{ mt: 3, mb: 4 }}>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
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
          if (!Array.isArray(numericPrices) || numericPrices.length === 0) {
            return null;
          }
          const lowestPrice = Math.min(...numericPrices);
          overallLowestPrice = Math.min(overallLowestPrice, lowestPrice);
          const isSelected = selectedRooms.find(
            (selected) => selected.roomId === room.roomId
          );
          const isSoldOut = room?.countRooms === 0;
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ position: "relative", width: { xs: "120px", sm: "100%" } }}>
                  <CardMedia
                    component="img"
                    src={
                      room.images && room.images.length > 0
                        ? room.images[0]
                        : hotelData?.images?.[0]
                    }
                    alt={`Room ${index + 1} Image`}
                    sx={{
                      width: "100%",
                      height: { xs: "100%", sm: "150px" },
                      objectFit: "cover",
                      borderRadius: { xs: "12px 0 0 12px", sm: "12px 12px 0 0" },
                    }}
                  />
                  {isSoldOut && (
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
                        Sold Out
                      </Typography>
                    </Box>
                  )}
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Box>
                    <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                      {room.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <BedOutlinedIcon sx={{ fontSize: "small", mr: 0.5 }} />
                      {room.bedTypes}
                    </Typography>
                    <Typography variant="body1" fontWeight={700} color="primary.main" sx={{ mt: 1 }}>
                      <CurrencyRupeeIcon sx={{ fontSize: "small", verticalAlign: "text-bottom", mr: 0.5 }} />
                      {lowestPrice}
                    </Typography>
                  </Box>
                  <CardActions sx={{ p: 0, mt: 2, justifyContent: "flex-end" }}>
                    <Button
                      variant={isSelected ? "outlined" : "contained"}
                      size="small"
                      color={isSelected ? "error" : "primary"}
                      onClick={() =>
                        isSelected ? handleRemoveRoom(room) : handleAddRoom(room)
                      }
                      disabled={isSoldOut}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 2,
                      }}
                    >
                      {isSelected ? "Remove" : "Select"}
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {overallLowestPrice !== Infinity &&
        localStorage.setItem("lowestPrice", overallLowestPrice)}
    </Box>
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
        countRooms: PropTypes.number.isRequired,
      })
    ).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedRooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddRoom: PropTypes.func.isRequired,
  handleRemoveRoom: PropTypes.func.isRequired,
};
export default Rooms;
