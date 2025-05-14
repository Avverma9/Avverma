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
  Modal,
} from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import { BiSolidOffer } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userId } from "../../utils/Unauthorized";
import { applyCouponCode } from "../../redux/reducers/bookingSlice";
import { useDispatch } from "react-redux";

const BookingDetails = ({
  hotelData,
  selectedRooms,
  // selectedFood,
  // setSelectedFood,
  roomsCount,
  guestsCount,
  checkInDate,
  checkOutDate,
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
  const dispatch = useDispatch();

  const [showCouponField, setShowCouponField] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [selectedFood, setSelectedFood] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleToggleCoupon = () => {
    setShowCouponField((prev) => !prev);
  };

  const handleSelectFood = (foodItem) => {
    const isAlreadySelected = selectedFood.some(
      (item) => item.foodId === foodItem.foodId,
    );
    if (!isAlreadySelected) {
      setSelectedFood((prev) => [...prev, foodItem]);
    }
  };

  const handleRemoveFood = (foodItem) => {
    setSelectedFood((prev) =>
      prev.filter((item) => item.foodId !== foodItem.foodId),
    );
  };

  const handleCouponSubmit = () => {
    if (couponCode.trim() !== "") {
      handleApplyCoupon(hotelData.hotelId, selectedRooms[0].roomId, couponCode);
      setCouponCode("");
      setShowCouponField(false);
    }
  };

  const handleApplyCoupon = useCallback(
    async (hotelId, roomId, couponCode) => {
      const payload = {
        hotelId,
        roomId,
        couponCode,
        userId,
      };

      try {
        const response = await dispatch(applyCouponCode(payload));
        setDiscountPrice(response.payload.discountPrice);
        sessionStorage.setItem("discountPrice", response.payload.discountPrice);
        setIsCouponApplied(true);
      } catch (error) {
        console.error("Error applying coupon:", error);
        alert("Error applying coupon");
      }
    },
    [dispatch],
  );

  const getFinalPrice = () => {
    const roomPrice = calculateTotalPrice();
    const mealPrice = selectedFood.reduce((sum, item) => sum + item.price, 0);
    return roomPrice - discountPrice + mealPrice;
  };

  return (
    <>
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
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <BiSolidOffer size={22} color="#f44336" />
          <Typography variant="h6" fontWeight="bold">
            Booking Summary
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Room Details */}
        <Box mb={2}>
          <Typography variant="subtitle2" fontWeight="bold" color="primary">
            Room Details
          </Typography>
          <Stack spacing={1} mt={1}>
            {selectedRooms.map((room, index) => (
              <Typography key={index} fontSize={14}>
                {room.type} – {room.bedTypes}{" "}
                <BedOutlinedIcon fontSize="small" />
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

        {/* Dates */}
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
        <Box mt={3}>
          <Typography fontSize={14} color="text.secondary">
            Pricing Summary
          </Typography>

          {discountPrice > 0 && (
            <Typography color="error" fontSize={14}>
              Discount: ₹{discountPrice}
            </Typography>
          )}

          <Typography fontWeight="bold" fontSize={18}>
            Total: ₹{getFinalPrice()}
          </Typography>
        </Box>
        {/* Final Booking Button */}
        <Stack mt={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "#007bff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Book Now
          </Button>
        </Stack>
      </Card>

      {/* Final Confirmation Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 500,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            mx: "auto",
            mt: "5%",
            position: "relative", // Positioning context for the close button
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10, // Ensures the close button appears above other content
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>

          {/* Modal Title */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Confirm Your Booking
          </Typography>

          {/* Booking Summary */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Booking Summary
            </Typography>

            {/* Check-In and Check-Out Dates */}
            <Typography variant="body2" mb={0.5}>
              <strong>Check-In Date:</strong>{" "}
              {checkInDate ? new Date(checkInDate).toLocaleDateString() : "N/A"}
            </Typography>
            <Typography variant="body2" mb={0.5}>
              <strong>Check-Out Date:</strong>{" "}
              {checkOutDate
                ? new Date(checkOutDate).toLocaleDateString()
                : "N/A"}
            </Typography>

            {/* Guests Count */}
            <Typography variant="body2" mb={0.5}>
              <strong>Guests:</strong> {guestsCount} guest
              {guestsCount > 1 ? "s" : ""}
            </Typography>

            {/* Rooms Count */}
            <Typography variant="body2" mb={0.5}>
              <strong>Rooms:</strong> {roomsCount} room
              {roomsCount > 1 ? "s" : ""}
            </Typography>

            {/* Coupon Discount (if any) */}
            {isCouponApplied && (
              <Typography variant="body2" mb={1}>
                <strong>Discount Applied:</strong>{" "}
                <CurrencyRupeeIcon sx={{ fontSize: 14 }} />
                {discountPrice}
              </Typography>
            )}
          </Box>

          {/* Room Price */}
          <Typography variant="body2" mb={1}>
            Room Price: <CurrencyRupeeIcon sx={{ fontSize: 14 }} />
            {calculateTotalPrice()}
          </Typography>

          {/* Food Selection */}
          <Typography variant="subtitle1" fontWeight="bold" mt={2} mb={1}>
            Add Meals
          </Typography>

          <Grid container spacing={2}>
            {hotelData.foods?.map((food) => {
              const isSelected = selectedFood.some(
                (f) => f.foodId === food.foodId,
              );
              return (
                <Grid item xs={12} key={food.foodId}>
                  <Card sx={{ p: 2, display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src={food.images[0]}
                      alt={food.name}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        objectFit: "cover",
                        mr: 2,
                      }}
                    />
                    <Box flexGrow={1}>
                      <Typography fontWeight="bold">{food.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {food.about}
                      </Typography>
                      <Typography variant="body2" mt={0.5}>
                        <CurrencyRupeeIcon sx={{ fontSize: 14 }} />
                        {food.price}
                      </Typography>
                    </Box>
                    <Button
                      variant={isSelected ? "contained" : "outlined"}
                      color={isSelected ? "error" : "primary"}
                      size="small"
                      onClick={() =>
                        isSelected
                          ? handleRemoveFood(food)
                          : handleSelectFood(food)
                      }
                    >
                      {isSelected ? "Remove" : "Select"}
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Final Total */}
          <Typography variant="body1" fontWeight="bold" mb={2}>
            Final Total: <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
            {getFinalPrice()}
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleBookNow(getFinalPrice(), selectedFood)}
            >
              Pay at Hotel
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => handlePay(getFinalPrice(), selectedFood)}
            >
              Pay Now
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default BookingDetails;
