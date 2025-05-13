import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  Divider,
  IconButton,
  Button,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid,
  Collapse,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import { BiSolidOffer } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userId } from "../../utils/Unauthorized"; // Assuming this is how you get the userId
import { applyCouponCode } from "../../redux/reducers/bookingSlice";
import { useDispatch } from "react-redux";
import BookNow from "./Booknow";

const BookingDetails = ({
  hotelData,
  selectedFood,
  selectedRooms,
  roomsCount,
  guestsCount,
  checkInDate,
  checkOutDate,
  handleRemoveFood,
  handleIncrementRooms,
  handleDecrementRooms,
  handleIncrementGuests,
  handleDecrementGuests,
  handleCheckInDateChange,
  handleCheckOutDateChange,
  scrollToRooms,
  calculateTotalPrice,
  handlePay,
  handleBookNow,
}) => {
  const [showCouponField, setShowCouponField] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false); // Assuming you want to track if the coupon is applied
  const [discountPrice, setDiscountPrice] = useState(""); // Assuming you want to store the discount price
  const dispatch = useDispatch(); // Assuming you are using Redux
  const handleToggleCoupon = () => {
    setShowCouponField((prev) => !prev);
  };

  const handleCouponSubmit = () => {
    // Assuming applyCouponCode is a function passed from the parent component
    if (couponCode.trim() !== "") {
      handleApplyCoupon(hotelData.hotelId, selectedRooms[0].roomId, couponCode);
      setCouponCode("");
      setShowCouponField(false);
    }
  };

  // Apply coupon logic
  const handleApplyCoupon = useCallback(
    async (hotelId, roomId, couponCode) => {
      const payload = {
        hotelId,
        roomId,
        couponCode,
        userId: userId,
      };

      try {
        const response = await dispatch(applyCouponCode(payload));
        console.log("Coupon applied successfully:", response);
        setDiscountPrice(response.payload.discountPrice);
        sessionStorage.setItem("discountPrice", response.payload.discountPrice);
        setIsCouponApplied(true); // ✅ Set coupon status
      } catch (error) {
        console.error("Error applying coupon:", error);
        alert("Error applying coupon");
      }
    },
    [dispatch],
  );

  return (
    <Card
      sx={{
        position: "sticky",
        top: 0,
        width: 340,
        p: 3,
        borderRadius: 4,
        boxShadow: 4,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <BiSolidOffer size={22} color="#f44336" />
        <Typography variant="h6" fontWeight="bold">
          Booking Summary
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Selected Food */}
      {selectedFood.length > 0 && (
        <Box mb={2}>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Selected Food
          </Typography>
          <Stack spacing={1}>
            {selectedFood.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize={14}>{item.name}</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveFood(item)}
                >
                  Remove
                </Button>
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Selected Rooms */}
      <Box mb={2}>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          Room Details
        </Typography>
        <Stack spacing={1} mt={1}>
          {selectedRooms.map((room, index) => (
            <Typography key={index} fontSize={14}>
              {room.type} – {room.bedTypes} <BedOutlinedIcon fontSize="small" />
            </Typography>
          ))}
        </Stack>
        <Button
          variant="outlined"
          size="small"
          onClick={scrollToRooms}
          sx={{ mt: 1 }}
        >
          Change Rooms
        </Button>
      </Box>

      {/* Rooms & Guests */}
      <Typography fontSize={12} color="text.secondary" mb={1}>
        * Max: 1 room & 3 guests per booking
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Rooms</InputLabel>
            <OutlinedInput
              label="Rooms"
              value={roomsCount}
              readOnly
              startAdornment={
                <InputAdornment position="start">
                  <IconButton onClick={handleDecrementRooms} size="small">
                    <Remove />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleIncrementRooms} size="small">
                    <Add />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Guests</InputLabel>
            <OutlinedInput
              label="Guests"
              value={guestsCount}
              readOnly
              startAdornment={
                <InputAdornment position="start">
                  <IconButton onClick={handleDecrementGuests} size="small">
                    <Remove />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleIncrementGuests} size="small">
                    <Add />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      {/* Check-in & Check-out */}
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              <InventoryTwoToneIcon fontSize="small" sx={{ mr: 0.5 }} />
              Check-in
            </Typography>
            <DatePicker
              selected={checkInDate}
              onChange={handleCheckInDateChange}
              dateFormat="d MMM yyyy"
              className="datepicker-input"
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Select date"
              minDate={new Date()}
              wrapperClassName="date-picker-wrapper"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              <InventoryTwoToneIcon fontSize="small" sx={{ mr: 0.5 }} />
              Check-out
            </Typography>
            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              dateFormat="d MMM yyyy"
              className="datepicker-input"
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Select date"
              minDate={checkInDate || new Date()}
              wrapperClassName="date-picker-wrapper"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Coupon Code */}
      <Box mt={3}>
        <Button
          variant={isCouponApplied ? "contained" : "outlined"}
          color={isCouponApplied ? "success" : "secondary"}
          onClick={isCouponApplied ? null : handleToggleCoupon}
          fullWidth
          disabled={isCouponApplied}
        >
          {isCouponApplied
            ? "Coupon Applied"
            : showCouponField
            ? "Cancel"
            : "Apply Coupon"}
        </Button>

        <Collapse in={showCouponField && !isCouponApplied}>
          <Stack direction="row" spacing={1} mt={2}>
            <TextField
              fullWidth
              size="small"
              label="Enter Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleCouponSubmit}
            >
              Apply
            </Button>
          </Stack>
        </Collapse>
      </Box>

      {/* Price Display */}
      {/* Price Display */}
      <Box mt={3}>
        <Typography fontSize={14} color="text.secondary">
          Pricing Summary
        </Typography>

        {discountPrice ? (
          <>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                  fontSize: "1rem",
                }}
              >
                <CurrencyRupeeIcon
                  sx={{ fontSize: "1rem", verticalAlign: "middle" }}
                />
                {calculateTotalPrice()}
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                fontWeight="bold"
                fontSize="0.9rem"
              >
                You saved{" "}
                <CurrencyRupeeIcon
                  sx={{ fontSize: "0.9rem", verticalAlign: "middle" }}
                />
                {discountPrice}
              </Typography>
            </Stack>

            <Typography
              variant="h5"
              color="error"
              fontWeight="bold"
              mt={1}
              display="flex"
              alignItems="center"
            >
              <CurrencyRupeeIcon sx={{ fontSize: "1.5rem", mr: 0.5 }} />
              {calculateTotalPrice() - discountPrice}
            </Typography>
          </>
        ) : (
          <Typography
            variant="h5"
            color="error"
            fontWeight="bold"
            mt={1}
            display="flex"
            alignItems="center"
          >
            <CurrencyRupeeIcon sx={{ fontSize: "1.5rem", mr: 0.5 }} />
            {calculateTotalPrice()}
          </Typography>
        )}
      </Box>

      {/* Buttons */}
      <Stack mt={3} spacing={1}>
        <Button
          fullWidth
          variant="contained"
          onClick={handlePay}
          sx={{
            backgroundColor: "#28a745",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#218838" },
          }}
        >
          Pay Now
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleBookNow}
          sx={{
            backgroundColor: "#007bff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          Pay at Hotel
        </Button>
      </Stack>
    </Card>
  );
};

export default BookingDetails;
