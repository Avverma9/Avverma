import React from "react";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import Face4TwoToneIcon from "@mui/icons-material/Face4TwoTone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { FaPlus, FaMinus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import "./Booknow.css";
const BookingDetails = ({
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
  scrollToFood,
  scrollToRooms,
  calculateTotalPrice,
  handlePay,
  handleBookNow,
}) => {
  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <div>
      {/* For desktop view */}
      
        {" "}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            className="booking-details-container"
            style={{
              position: "sticky",
              top: "0",
              right: "20px",
              width: "400px", // Adjust the width as needed
              zIndex: "1000",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <h5>
              <ConfirmationNumberTwoToneIcon /> Booking Details
            </h5>
            <hr />

            {/* Selected Food */}
            <div
              className="selected-container"
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                {selectedFood.length > 0 ? (
                  <CardContent>
                    {selectedFood.map((selected, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                        >
                          {selected.quantity} {selected.name}
                        </Typography>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleRemoveFood(selected)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                ) : (
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      Add Meals <LunchDiningTwoToneIcon />
                    </Typography>
                  </CardContent>
                )}
              </div>
              <Button
                variant="outlined"
                color="error"
                style={{ marginLeft: "10px", flexShrink: 0 }}
                onClick={scrollToFood}
              >
                <DriveFileRenameOutlineIcon />
              </Button>
            </div>

            {/* Selected Rooms */}
            <div
              className="selected-container"
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                {selectedRooms?.map((selected, index) => (
                  <div
                    key={index}
                    style={{ height: "50px", marginRight: "10px" }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="body1" component="div">
                        {selected.type} & {selected.bedTypes}{" "}
                        <BedOutlinedIcon />
                      </Typography>
                    </CardContent>
                  </div>
                ))}
              </div>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={scrollToRooms}
              >
                <DriveFileRenameOutlineIcon />
              </Button>
            </div>

            {/* Rooms and Guests */}
            <hr />
            <label
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                color: "#555",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Rooms <MeetingRoomTwoToneIcon /> & Guests <Face4TwoToneIcon />
            </label>
            <div className="date-selection mt-3">
              <div
                className="check-in"
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleDecrementRooms}
                  style={{ minWidth: "25px" }} // Adjusted min width
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "90px", textAlign: "center" }} // Center align input
                  placeholder="Rooms"
                  value={roomsCount}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleIncrementRooms}
                  style={{ minWidth: "25px" }} // Adjusted min width
                >
                  <FaPlus />
                </button>
              </div>
              <div
                className="check-out"
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleDecrementGuests}
                  style={{ minWidth: "25px" }} // Adjusted min width
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "90px", textAlign: "center" }} // Center align input
                  placeholder="Guests"
                  value={guestsCount}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleIncrementGuests}
                  style={{ minWidth: "25px" }} // Adjusted min width
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <hr />
            <div className="container mt-3">
              <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
                <div className="check-in">
                  <p>
                    Check-in <InventoryTwoToneIcon />
                  </p>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInDateChange}
                    dateFormat="d MMMM yyyy"
                    placeholderText={formatDate(checkInDate)}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    onChangeRaw={(e) => e.preventDefault()}
                    className="datepicker-input"
                  />
                </div>
                <div className="check-out">
                  <p>
                    Check-out <InventoryTwoToneIcon />
                  </p>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutDateChange}
                    dateFormat="d MMMM yyyy"
                    placeholderText={formatDate(checkOutDate)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    onChangeRaw={(e) => e.preventDefault()}
                    className="datepicker-input"
                  />
                </div>
              </div>
            </div>
            <p>Total Price</p>
            {/* Total Price */}
            <div className="total-price mt-3" style={{ marginTop: "3rem" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "red",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <CurrencyRupeeIcon />
                {calculateTotalPrice()}
              </h3>
            </div>

            {/* Payment Buttons */}
            <div className="payment-buttons mt-3">
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePay}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                Pay Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ width: "100%" }}
                onClick={handleBookNow}
              >
                Pay at Hotel
              </Button>
            </div>
          </div>
        </div>

      <div className="col-md-4 d-block d-md-none">
        <div
          className="booking-details-container"
          style={{
            position: "sticky",
            top: "0",
            width: "100%",
            zIndex: "1000",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <h5>
            <ConfirmationNumberTwoToneIcon /> Booking Details
          </h5>
          <hr />

          {/* Selected Food */}
          <div
            className="selected-container"
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              {selectedFood.length > 0 ? (
                <CardContent>
                  {selectedFood.map((selected, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography gutterBottom variant="body1" component="div">
                        {selected.quantity} {selected.name}
                      </Typography>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => handleRemoveFood(selected)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </CardContent>
              ) : (
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    Add Meals <LunchDiningTwoToneIcon />
                  </Typography>
                </CardContent>
              )}
            </div>
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: "10px", flexShrink: 0 }}
              onClick={scrollToFood}
            >
              <DriveFileRenameOutlineIcon />
            </Button>
          </div>

          {/* Selected Rooms */}
          <div
            className="selected-container"
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              {selectedRooms?.map((selected, index) => (
                <div
                  key={index}
                  style={{ height: "50px", marginRight: "10px" }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {selected.type} & {selected.bedTypes} <BedOutlinedIcon />
                    </Typography>
                  </CardContent>
                </div>
              ))}
            </div>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={scrollToRooms}
            >
              <DriveFileRenameOutlineIcon />
            </Button>
          </div>

          {/* Rooms and Guests */}
          <hr />
          <label
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              color: "#555",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Rooms <MeetingRoomTwoToneIcon /> & Guests <Face4TwoToneIcon />
          </label>
          <div className="date-selection mt-3">
            <div
              className="check-in"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleDecrementRooms}
                style={{ minWidth: "25px" }} // Adjusted min width
              >
                <FaMinus />
              </button>
              <input
                type="number"
                className="form-control"
                style={{ width: "90px", textAlign: "center" }} // Center align input
                placeholder="Rooms"
                value={roomsCount}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrementRooms}
                style={{ minWidth: "25px" }} // Adjusted min width
              >
                <FaPlus />
              </button>
            </div>
            <div
              className="check-out"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleDecrementGuests}
                style={{ minWidth: "25px" }} // Adjusted min width
              >
                <FaMinus />
              </button>
              <input
                type="number"
                className="form-control"
                style={{ width: "90px", textAlign: "center" }} // Center align input
                placeholder="Guests"
                value={guestsCount}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrementGuests}
                style={{ minWidth: "25px" }} // Adjusted min width
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <hr />
          <div className="container mt-3">
            <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
              <div className="check-in">
                <p>
                  Check-in <InventoryTwoToneIcon />
                </p>
                <DatePicker
                  selected={checkInDate}
                  onChange={handleCheckInDateChange}
                  dateFormat="d MMMM yyyy"
                  placeholderText={formatDate(checkInDate)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  className="datepicker-input"
                />
              </div>
              <div className="check-out">
                <p>
                  Check-out <InventoryTwoToneIcon />
                </p>
                <DatePicker
                  selected={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  dateFormat="d MMMM yyyy"
                  placeholderText={formatDate(checkOutDate)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  onChangeRaw={(e) => e.preventDefault()}
                  className="datepicker-input"
                />
              </div>
            </div>
          </div>
          <p>Total Price</p>
          {/* Total Price */}
          <div className="total-price mt-3" style={{ marginTop: "3rem" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "red",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <CurrencyRupeeIcon />
              {calculateTotalPrice()}
            </h3>
          </div>

          {/* Payment Buttons */}
          <div className="payment-buttons mt-3">
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePay}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Pay Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: "100%" }}
              onClick={handleBookNow}
            >
              Pay at Hotel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

BookingDetails.propTypes = {
  selectedFood: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRooms: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      bedTypes: PropTypes.string.isRequired,
    })
  ).isRequired,
  roomsCount: PropTypes.number.isRequired,
  guestsCount: PropTypes.number.isRequired,
  checkInDate: PropTypes.instanceOf(Date),
  checkOutDate: PropTypes.instanceOf(Date),
  handleAddFood: PropTypes.func.isRequired,
  handleRemoveFood: PropTypes.func.isRequired,
  handleIncrementRooms: PropTypes.func.isRequired,
  handleDecrementRooms: PropTypes.func.isRequired,
  handleIncrementGuests: PropTypes.func.isRequired,
  handleDecrementGuests: PropTypes.func.isRequired,
  handleCheckInDateChange: PropTypes.func.isRequired,
  handleCheckOutDateChange: PropTypes.func.isRequired,
  scrollToFood: PropTypes.func.isRequired,
  scrollToRooms: PropTypes.func.isRequired,
  calculateTotalPrice: PropTypes.func.isRequired,
  handlePay: PropTypes.func.isRequired,
  handleBookNow: PropTypes.func.isRequired,
};

export default BookingDetails;
