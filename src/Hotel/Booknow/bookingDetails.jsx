import React from "react";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { FaPlus, FaMinus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import "./Booknow.css";
import { BiSolidOffer } from "react-icons/bi";
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
      {/* For desktop view */}{" "}
      <div className="col-md-4 d-none d-sm-block">
        <div
          className="booking-details-container"
          style={{
            position: "sticky",
            top: "0",
            right: "20px",
            width: "300px", // Reduced width
            zIndex: "1000",
            padding: "15px", // Reduced padding
            backgroundColor: "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px", // Reduced border-radius
            fontSize: "0.9rem", // Reduced font size
          }}
        >
          <h5 style={{ fontSize: "1rem" }}>
            {" "}
            {/* Smaller header font size */}
            <BiSolidOffer
              style={{ fontSize: "1.2rem" }}
            />{" "}
            Booking Details
          </h5>
          <hr style={{ margin: "10px 0" }} />{" "}
          {/* Adjusted margin for the horizontal line */}
          {/* Selected Food */}
          <div className="selected-food-container">
            <div
              className="selected-container"
              style={{
                marginBottom: "15px", // Reduced margin
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #e0e0e0", // Added border for separation
                paddingBottom: "10px", // Added padding for separation
              }}
            >
              <div style={{ flex: 1 }}>
                {selectedFood.length > 0 ? (
                  <CardContent style={{ padding: "0" }}>
                    {selectedFood.map((selected, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "5px", // Reduced margin
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {selected.name} Selected
                        </Typography>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleRemoveFood(selected)}
                          style={{ fontSize: "0.7rem", padding: "4px 8px" }} // Reduced font size and padding
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                ) : (
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Add Meals{" "}
                    <LunchDiningTwoToneIcon style={{ fontSize: "0.8rem" }} />
                  </Typography>
                )}
              </div>
              <Button
                variant="outlined"
                color="error"
                style={{
                  marginLeft: "10px",
                  fontSize: "0.7rem",
                  padding: "4px 8px",
                }} // Adjusted font size and padding
                onClick={scrollToFood}
              >
                Add
              </Button>
            </div>

            {/* Selected Rooms */}
            <div
              className="selected-rooms-container"
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #e0e0e0", // Added border for separation
                paddingBottom: "10px", // Added padding for separation
              }}
            >
              <Typography
                variant="body2"
                component="div"
                style={{
                  fontSize: "0.8rem",
                  marginBottom: "5px", // Reduced margin
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold", // Added bold for emphasis
                }}
              >
                Selected Rooms
              </Typography>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedRooms?.map((selected, index) => (
                  <div
                    key={index}
                    style={{
                      flex: "1 1 200px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }} // Adjusted flex and gap
                  >
                    <CardContent style={{ padding: "0" }}>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {selected.type} & {selected.bedTypes} Bed {" "}
                        <BedOutlinedIcon style={{ fontSize: "1rem" }} />
                      </Typography>
                    </CardContent>
                  </div>
                ))}
              </div>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  marginTop: "10px",
                  fontSize: "0.7rem",
                  backgroundColor: "#ffff",
                  padding: "4px 8px",
                }} // Adjusted font size and padding
                onClick={scrollToRooms}
              >
                Change
              </Button>
            </div>
          </div>
          {/* Rooms and Guests */}
          <hr style={{ margin: "10px 0" }} />{" "}
          {/* Adjusted margin for the horizontal line */}
          <label
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "0.8rem", // Reduced font size
              color: "#555",
              fontWeight: "bold",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
            }}
          >
             Rooms & Guests
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
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaMinus style={{ fontSize: "0.8rem" }} />
              </button>
              <input
                type="number"
                className="form-control"
                style={{
                  width: "70px",
                  textAlign: "center",
                  fontSize: "0.7rem",
                }} // Reduced width and font size
                placeholder="Rooms"
                value={roomsCount}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrementRooms}
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaPlus style={{ fontSize: "0.8rem" }} />
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
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaMinus style={{ fontSize: "0.8rem" }} />
              </button>
              <input
                type="number"
                className="form-control"
                style={{
                  width: "70px",
                  textAlign: "center",
                  fontSize: "0.7rem",
                }} // Reduced width and font size
                placeholder="Guests"
                value={guestsCount}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrementGuests}
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaPlus style={{ fontSize: "0.8rem" }} />
              </button>
            </div>
          </div>
          {/* Date Selection */}
          <hr style={{ margin: "10px 0" }} />{" "}
          {/* Adjusted margin for the horizontal line */}
          <div className="container mt-3">
            <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
              <div className="check-in">
                <p style={{ fontSize: "0.8rem" }}>
                  {" "}
                  {/* Reduced font size */}
                  Check-in <InventoryTwoToneIcon style={{ fontSize: "1rem" }} />
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
                  style={{ fontSize: "0.8rem" }} // Reduced font size
                />
              </div>
              <div className="check-out">
                <p style={{ fontSize: "0.8rem" }}>
                  {" "}
                  {/* Reduced font size */}
                  Check-out{" "}
                  <InventoryTwoToneIcon style={{ fontSize: "1rem" }} />
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
                  style={{ fontSize: "0.3rem" }} // Reduced font size
                />
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
            {" "}
            {/* Reduced font size */}
            Total Price
          </p>
          {/* Total Price */}
          <div className="total-price mt-3" style={{ marginTop: "2rem" }}>
            {" "}
            {/* Reduced top margin */}
            <h3
              style={{
                fontSize: "1.2rem", // Reduced font size
                color: "red",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <CurrencyRupeeIcon style={{ fontSize: "1.5rem" }} />{" "}
              {/* Reduced icon size */}
              {calculateTotalPrice()}
            </h3>
          </div>
          {/* Payment Buttons */}
          <div className="payment-buttons mt-3">
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePay}
              style={{
                width: "100%",
                marginBottom: "5px",
                fontSize: "0.8rem",
                padding: "6px 12px",
              }} // Reduced font size and padding
            >
              Pay Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: "100%", fontSize: "0.8rem", padding: "6px 12px" }} // Reduced font size and padding
              onClick={handleBookNow}
            >
              Pay at Hotel
            </Button>
          </div>
        </div>
      </div>
      {/*                                 mobile                             */}
      <div className="col-md-4 d-block d-md-none">
        <div
          className="booking-details-container"
          style={{
            position: "sticky",
            top: "0",
            right: "25px",
            width: "350px", // Reduced width
            zIndex: "1000",
            padding: "15px", // Reduced padding
            backgroundColor: "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px", // Reduced border-radius
            fontSize: "0.9rem", // Reduced font size
          }}
        >
          <h5 style={{ fontSize: "1rem" }}>
            {" "}
            {/* Smaller header font size */}
            <BiSolidOffer
              style={{ fontSize: "1.2rem" }}
            />{" "}
            Booking Details
          </h5>
          <hr style={{ margin: "10px 0" }} />{" "}
          {/* Adjusted margin for the horizontal line */}
          {/* Selected Food */}
          <div className="selected-food-container">
            <div
              className="selected-container"
              style={{
                marginBottom: "15px", // Reduced margin
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #e0e0e0", // Added border for separation
                paddingBottom: "10px", // Added padding for separation
              }}
            >
              <div style={{ flex: 1 }}>
                {selectedFood.length > 0 ? (
                  <CardContent style={{ padding: "0" }}>
                    {selectedFood.map((selected, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "5px", // Reduced margin
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {selected.name} Selected
                        </Typography>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleRemoveFood(selected)}
                          style={{ fontSize: "0.7rem", padding: "4px 8px" }} // Reduced font size and padding
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                ) : (
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Add Meals{" "}
                    {/* <LunchDiningTwoToneIcon style={{ fontSize: "0.8rem" }} /> */}
                  </Typography>
                )}
              </div>
              <Button
                variant="outlined"
                color="error"
                style={{
                  marginLeft: "10px",
                  fontSize: "0.7rem",
                  padding: "4px 8px",
                }} // Adjusted font size and padding
                onClick={scrollToFood}
              >
                Add
              </Button>
            </div>

            {/* Selected Rooms */}
            <div
              className="selected-rooms-container"
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #e0e0e0", // Added border for separation
                paddingBottom: "10px", // Added padding for separation
              }}
            >
              <Typography
                variant="body2"
                component="div"
                style={{
                  fontSize: "0.8rem",
                  marginBottom: "5px", // Reduced margin
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold", // Added bold for emphasis
                }}
              >
                Selected Rooms
              </Typography>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedRooms?.map((selected, index) => (
                  <div
                    key={index}
                    style={{
                      flex: "1 1 200px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }} // Adjusted flex and gap
                  >
                    <CardContent style={{ padding: "0" }}>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {selected.type} & {selected.bedTypes} Bed {" "}
                        {/* <BedOutlinedIcon style={{ fontSize: "1rem" }} /> */}
                      </Typography>
                    </CardContent>
                  </div>
                ))}
              </div>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  marginTop: "10px",
                  fontSize: "0.7rem",
                  backgroundColor: "#ffff",
                  padding: "4px 8px",
                }} // Adjusted font size and padding
                onClick={scrollToRooms}
              >
                Change
              </Button>
            </div>
          </div>
          {/* Rooms and Guests */}
          <hr style={{ margin: "10px 0" }} />{" "}
          {/* Adjusted margin for the horizontal line */}
          <label
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "0.8rem", // Reduced font size
              color: "#555",
              fontWeight: "bold",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
            }}
          >
         Rooms & Guests
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
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaMinus style={{ fontSize: "0.8rem" }} />
              </button>
              <input
                type="number"
                className="form-control"
                style={{
                  width: "70px",
                  textAlign: "center",
                  fontSize: "0.7rem",
                }} // Reduced width and font size
                placeholder="Rooms"
                value={roomsCount}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrementRooms}
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaPlus style={{ fontSize: "0.8rem" }} />
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
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaMinus style={{ fontSize: "0.8rem" }} />
              </button>
              <input
                type="number"
                className="form-control"
                style={{
                  width: "70px",
                  textAlign: "center",
                  fontSize: "0.7rem",
                }} // Reduced width and font size
                placeholder="Guests"
                value={guestsCount}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrementGuests}
                style={{
                  minWidth: "20px",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }} // Reduced min width, font size, and padding
              >
                <FaPlus style={{ fontSize: "0.8rem" }} />
              </button>
            </div>
          </div>
          {/* Date Selection */}
          <hr style={{ margin: "10px 0" }} />{" "}
          {/* Adjusted margin for the horizontal line */}
          <div className="container mt-3">
            <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
              <div className="check-in">
                <p style={{ fontSize: "0.8rem" }}>
                  {" "}
                  {/* Reduced font size */}
                  Check-in <InventoryTwoToneIcon style={{ fontSize: "1rem" }} />
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
                  style={{ fontSize: "0.8rem" }} // Reduced font size
                />
              </div>
              <div className="check-out">
                <p style={{ fontSize: "0.8rem" }}>
                  {" "}
                  {/* Reduced font size */}
                  Check-out{" "}
                  <InventoryTwoToneIcon style={{ fontSize: "0.5rem" }} />
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
                  style={{ fontSize: "0.3rem" }} // Reduced font size
                />
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
            {" "}
            {/* Reduced font size */}
            Total Price
          </p>
          {/* Total Price */}
          <div className="total-price mt-3" style={{ marginTop: "2rem" }}>
            {" "}
            {/* Reduced top margin */}
            <h3
              style={{
                fontSize: "1.2rem", // Reduced font size
                color: "red",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <CurrencyRupeeIcon style={{ fontSize: "1.5rem" }} />{" "}
              {/* Reduced icon size */}
              {calculateTotalPrice()}
            </h3>
          </div>
          {/* Payment Buttons */}
          <div className="payment-buttons mt-3">
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePay}
              style={{
                width: "100%",
                marginBottom: "5px",
                fontSize: "0.8rem",
                padding: "6px 12px",
              }} // Reduced font size and padding
            >
              Pay Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: "100%", fontSize: "0.8rem", padding: "6px 12px" }} // Reduced font size and padding
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
