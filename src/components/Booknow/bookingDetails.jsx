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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Close, CloseOutlined, Remove } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import { BiSolidOffer } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userId } from "../../utils/Unauthorized";
import { applyCouponCode } from "../../redux/reducers/bookingSlice";
import { useDispatch } from "react-redux";
import { useLoader } from "../../utils/loader";
import { format } from "date-fns";
import baseURL from "../../utils/baseURL";
import { popup } from "../../utils/custom_alert/pop";
import { width } from "@mui/system";

const BookingDetails = ({
  hotelId,
  hotelData,
  monthlyData,
  selectedRooms,
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
  handlePay,
}) => {
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  const [showCouponField, setShowCouponField] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [selectedFood, setSelectedFood] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toBeCheckRoomNumber =
    parseInt(localStorage.getItem("toBeCheckRoomNumber")) || 0;
  const compareRoomId = selectedRooms?.[0]?.roomId;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleToggleCoupon = () => setShowCouponField((prev) => !prev);

  const handleSelectFood = (foodItem) => {
    const isAlreadySelected = selectedFood.some(
      (item) => item.foodId === foodItem.foodId,
    );
    if (!isAlreadySelected) {
      setSelectedFood((prev) => [...prev, { ...foodItem, quantity: 1 }]);
    }
  };

  const handleRemoveFood = (foodItem) => {
    setSelectedFood((prev) =>
      prev.filter((item) => item.foodId !== foodItem.foodId),
    );
  };

  const handleCouponSubmit = () => {
    if (couponCode.trim() !== "") {
      handleApplyCoupon(hotelId, compareRoomId, couponCode);
      setShowCouponField(false);
    }
  };

  const handleApplyCoupon = useCallback(
    async (hotelId, roomId, couponCode) => {
      const payload = { hotelId, roomId, couponCode, userId };
      try {
        const response = await dispatch(applyCouponCode(payload));
        setDiscountPrice(response.payload.discountPrice || 0);
        sessionStorage.setItem(
          "discountPrice",
          response.payload.discountPrice || 0,
        );
        setIsCouponApplied(true);
      } catch (error) {
        console.error("Error applying coupon:", error);
        alert("Error applying coupon");
      }
    },
    [dispatch],
  );

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    const daysDifference = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
    );
    if (daysDifference < 1) return 0;

    selectedRooms?.forEach((room) => {
      totalPrice += room.price * roomsCount;
    });

    totalPrice *= daysDifference;

    monthlyData?.forEach((bookingData) => {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);

      if (
        checkInDate < endDate &&
        checkOutDate > startDate &&
        compareRoomId === bookingData.roomId
      ) {
        totalPrice = bookingData.monthPrice * daysDifference;
      }
    });

    const foodPrice = selectedFood.reduce(
      (total, food) => total + food.price * (food.quantity || 1),
      0,
    );

    totalPrice += foodPrice;
    return totalPrice;
  };

  const getFinalPrice = () => {
    const roomPrice = calculateTotalPrice();
    return roomPrice - discountPrice;
  };

  const handleBookNow = async () => {
    try {
      showLoader();
      const bookingData = {
        hotelId,
        user: userId,
        checkInDate: format(checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
        guests: guestsCount,
        numRooms: roomsCount,
        roomDetails: selectedRooms?.map((room) => ({
          roomId: room.roomId,
          type: room.type,
          bedTypes: room.bedTypes,
          price: room.price,
        })),
        foodDetails: selectedFood?.map((food) => ({
          foodId: food.foodId,
          name: food.name,
          price: food.price,
          quantity: food.quantity,
        })),
        price: getFinalPrice(),
        pm: "Offline",
        couponCode: couponCode,
        discountPrice: sessionStorage.getItem("discountPrice"),
        bookingSource: "Site",
        destination: hotelData.city,
        hotelName: hotelData.hotelName,
        hotelOwnerName: hotelData.hotelOwnerName,
        hotelEmail: hotelData.hotelEmail,
      };

      if (toBeCheckRoomNumber > 0) {
        const response = await fetch(
          `${baseURL}/booking/${userId}/${hotelId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          },
        );

        const bookedDetails = await response.json();
        if (response.status === 201) {
          popup(
            `🎉 Booking Confirmed!\n\n📌 Booking ID: ${bookedDetails?.data?.bookingId}\n` +
              `📅 Check in Date: ${format(
                new Date(bookedDetails?.data?.checkInDate),
                "dd MMM yyyy",
              )}\n` +
              `📅 Check out Date: ${format(
                new Date(bookedDetails?.data?.checkOutDate),
                "dd MMM yyyy",
              )}`,
            () => {
              window.location.href = "/bookings"; // <-- Redirect to /bookings
            },
          );

          sessionStorage.removeItem("discountPrice");
          setSelectedFood([]);
          setIsCouponApplied(false);
          setDiscountPrice(0);
        } else {
          alert(bookedDetails?.message || "Booking failed");
        }
      } else {
        alert("This room is already fully booked");
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert("Something went wrong during booking.");
    } finally {
      hideLoader();
    }
  };
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <>
      <Card
        sx={{
          position: "sticky",
          top: 0,
          width: 370,
          p: 3,
          boxShadow: 4,
          backgroundColor: "#ffffff",
          overflow: "visible", // ensure the calendar is visible outside
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <BiSolidOffer size={22} color="#f44336" />
          <Typography
            variant="p6"
            fontWeight="bold"
            sx={{
              backgroundColor: "#f44336", // Light red (Material UI red[500])
              color: "white",
              px: 2,
              py: 1,
              borderRadius: 1,
              display: "inline-block", // Keeps the background tight around the text
            }}
          >
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
            sx={{
              mt: 1,
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "#f2deff2" },
            }}
          >
            Change
          </Button>
        </Box>

        {/* Rooms & Guests */}
        <Typography fontSize={12} color="text.secondary" mb={1}>
          * Max: 1 room & 3 guests per booking
        </Typography>
        <Divider />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  color: "black",
                  fontSize: "1.1rem", // Increase this value for larger text
                  "&.Mui-focused": {
                    color: "black",
                  },
                }}
              >
                Rooms
              </InputLabel>
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
              <InputLabel
                sx={{
                  color: "black",
                  fontSize: "1.1rem", // Increase this value for larger text
                  "&.Mui-focused": {
                    color: "black",
                  },
                }}
              >
                Guests
              </InputLabel>
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
                customInput={
                  <OutlinedInput
                    size="small"
                    sx={{ width: "155px" }} // Adjust the width here
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarMonthIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                }
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
                customInput={
                  <OutlinedInput
                    size="small"
                    sx={{ width: "155px" }} // Adjust the width here
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarMonthIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                }
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
            sx={{
              backgroundColor: isCouponApplied ? "success.main" : "black",
              color: "white",
              borderColor: "black",
              "&:hover": {
                backgroundColor: isCouponApplied ? "success.dark" : "#222",
                borderColor: isCouponApplied ? "success.dark" : "black",
              },
            }}
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
                onClick={() => setShowConfirmModal(true)}
              >
                Apply
              </Button>
            </Stack>
          </Collapse>

          {/* Confirm Apply Coupon Modal */}
          <Dialog
            open={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
          >
            <DialogTitle>Apply Coupon?</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Once this coupon is applied, it cannot be used again—even if you
                don’t book.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowConfirmModal(false)} color="error">
                Don’t Apply
              </Button>
              <Button
                onClick={() => {
                  handleCouponSubmit();
                  setShowConfirmModal(false);
                }}
                color="success"
                variant="contained"
              >
                Okay, Apply
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box mt={3}>
          <Typography fontSize={14} color="text.secondary">
            Pricing Summary
          </Typography>

          {discountPrice > 0 && (
            <Typography color="error" fontSize={14}>
              Applied Coupon Discount: ₹{discountPrice}
            </Typography>
          )}

          <Typography fontWeight="bold" fontSize={14}>
            Total Payable Amount: ₹{getFinalPrice()}
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 550, md: 650 },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 10,
            p: { xs: 2, sm: 4 },
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" fontWeight={600} mb={3}>
            Confirm Your Booking
          </Typography>

          {/* Booking Details */}
          <Box mb={3}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Booking Details
            </Typography>
            <Grid container spacing={1}>
              {[
                { label: "Check in", value: formatDate(checkInDate) },
                { label: "Check out", value: formatDate(checkOutDate) },
                { label: "Guests", value: guestsCount },
                { label: "Rooms", value: roomsCount },
              ].map(({ label, value }, i) => (
                <Grid item xs={6} key={i}>
                  <Typography variant="body2">
                    {label}: <strong>{value}</strong>
                  </Typography>
                </Grid>
              ))}
              {isCouponApplied && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Discount: <strong>₹{discountPrice}</strong>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          {/* Room Pricing */}
          <Box mb={3} sx={{ borderBottom: "2px dotted", pb: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Room Pricing
            </Typography>
            <Typography variant="body2">
              Total Room Price:{" "}
              <strong>
                ₹
                {calculateTotalPrice() -
                  selectedFood.reduce((sum, item) => sum + item.price, 0)}
              </strong>
            </Typography>
          </Box>

          {/* Meal Selection */}
          <Box mb={3}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Add Meals
            </Typography>
            <Grid container spacing={2}>
              {hotelData.foods?.map((food) => {
                const isSelected = selectedFood.some(
                  (f) => f.foodId === food.foodId,
                );
                return (
                  <Grid item xs={12} sm={6} key={food.foodId}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderColor: isSelected ? "success.main" : "grey.300",
                        bgcolor: isSelected ? "grey.100" : "white",
                      }}
                    >
                      <Box>
                        <Typography fontWeight={500}>
                          {food.foodType}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{food.price}
                        </Typography>
                      </Box>
                      <Button
                        variant={isSelected ? "contained" : "outlined"}
                        color={isSelected ? "error" : "inherit"}
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: "black",
                          color: "white",
                          "&:hover": { bgcolor: "#f2deff2" },
                        }}
                        onClick={() =>
                          isSelected
                            ? handleRemoveFood(food)
                            : handleSelectFood(food)
                        }
                      >
                        {isSelected ? "Remove" : "Add"}
                      </Button>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Price Summary */}
          <Divider sx={{ my: 3 }} />
          <Box textAlign="right">
            {discountPrice > 0 && (
              <Typography color="error" fontSize={14}>
                Applied Coupon Discount: - ₹{discountPrice}
              </Typography>
            )}
            <Typography variant="body2">
              Room Price:{" "}
              <strong>
                ₹
                {calculateTotalPrice() -
                  selectedFood.reduce((sum, item) => sum + item.price, 0)}
              </strong>
            </Typography>
            {selectedFood.length > 0 && (
              <Typography variant="body2">
                Meal Price: + ₹
                {selectedFood.reduce((sum, item) => sum + item.price, 0)}
              </Typography>
            )}
            <Typography variant="body1" fontWeight={600} mt={1} mb={3}>
              Total Amount: ₹{getFinalPrice()}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => handlePay(getFinalPrice(), selectedFood)}
            >
              Pay Now
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleBookNow}
              sx={{
                mt: 1,
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "#f2deff2" },
              }}
            >
              Pay at Hotel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default BookingDetails;
