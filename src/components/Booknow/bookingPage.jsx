// components/BookingPage.jsx
import React from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BiSolidOffer } from "react-icons/bi";
import {
  Remove,
  Add,
  CloseOutlined,
  BedOutlined as BedOutlinedIcon,
  InventoryTwoTone as InventoryTwoToneIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, formatISO } from "date-fns";
import { formatDate } from "../../utils/convertDate";

// Make sure to pass all required props from parent
const BookingPage = ({
  selectedRooms,
  scrollToRooms,
  roomsCount,
  guestsCount,
  handleDecrementRooms,
  handleIncrementRooms,
  handleDecrementGuests,
  handleIncrementGuests,
  checkInDate,
  checkOutDate,
  handleCheckInDateChange,
  handleCheckOutDateChange,
  isCouponApplied,
  showCouponField,
  handleToggleCoupon,
  couponCode,
  setCouponCode,
  showConfirmModal,
  setShowConfirmModal,
  handleCouponSubmit,
  discountPrice,
  getFinalPrice,
  calculateBasePrice,
  finalTotal,
  handleOpenModal,
  gstAmount,
  openModal,
  handleCloseModal,
  selectedFood,
  hotelData,
  handleRemoveFood,
  handleSelectFood,
  handlePayment,
  handlePartialPayment,
  handleBookNow,
}) => {
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
          overflow: "visible",
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
          * Max: 3 guests per 1 room booking
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
            Room Price: ₹{getFinalPrice()}
          </Typography>
          {gstAmount > 0 && (
            <Typography fontWeight="bold" fontSize={14}>
              GST {gstAmount}% Applied
            </Typography>
          )}

          <Typography fontWeight="bold" fontSize={14}>
            Total Payable Amount: ₹
            {(
              getFinalPrice() +
              (getFinalPrice() * gstAmount) / 100 +
              selectedFood.reduce((sum, item) => sum + item.price, 0)
            ).toFixed(2)}
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
              Total Room Price: <strong>₹{getFinalPrice()}</strong>
            </Typography>
            {gstAmount > 0 && (
              <Typography fontWeight="bold" fontSize={14}>
                GST {gstAmount}% Applied
              </Typography>
            )}
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
              Room Price with all taxes: ₹
              {(getFinalPrice() + (getFinalPrice() * gstAmount) / 100).toFixed(
                2,
              )}
            </Typography>
            {selectedFood.length > 0 && (
              <Typography variant="body2">
                Meal Price: + ₹
                {selectedFood.reduce((sum, item) => sum + item.price, 0)}
              </Typography>
            )}

            <Typography variant="body1" fontWeight={600} mt={1} mb={3}>
              Total Amount: ₹
              {(
                getFinalPrice() +
                (getFinalPrice() * gstAmount) / 100 +
                selectedFood.reduce((sum, item) => sum + item.price, 0)
              ).toFixed(2)}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {roomsCount >= 3 ? (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handlePartialPayment}
                >
                  Pay 25% Now & Rest Later
                </Button>
                {roomsCount <= 3 && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBookNow}
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      "&:hover": { bgcolor: "#f2deff2" },
                    }}
                  >
                    Pay at Hotel
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
                {roomsCount <= 3 && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBookNow}
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      "&:hover": { bgcolor: "#f2deff2" },
                    }}
                  >
                    Pay at Hotel
                  </Button>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default BookingPage;
