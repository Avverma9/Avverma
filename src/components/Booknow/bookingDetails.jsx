import React from "react";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
  {/* For desktop view */}
  <div className="col-md-4 d-sm-block">
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
        <BiSolidOffer style={{ fontSize: "1.2rem" }} /> Booking Details
      </h5>
      <hr style={{ margin: "10px 0" }} />

      {/* Selected Food */}
      <div className="selected-food-container">
        <div
          className="selected-container"
          style={{
            marginBottom: "15px",
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
                    <button
                      size="small"
                      className="custom-button"
                      onClick={() => handleRemoveFood(selected)}
                      style={{
                        fontSize: "0.7rem",
                        padding: "4px 8px", // Reduced font size and padding
                        backgroundColor: "#f8d7da", // Light red background
                        border: "1px solid #f5c6cb", // Red border
                        color: "#721c24", // Dark red text color
                        borderRadius: "4px",
                      }}
                    >
                      Remove
                    </button>
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
          <button
            variant="outlined"
            color="error"
            className="custom-button"
            style={{
              marginLeft: "10px",
              fontSize: "0.7rem",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: "#d4edda", // Light green background
              border: "1px solid #c3e6cb", // Green border
              color: "#155724", // Dark green text
            }}
            onClick={scrollToFood}
          >
            Add
          </button>
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
              color: "red",
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
                }}
              >
                <CardContent style={{ padding: "0" }}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {selected.type} & {selected.bedTypes} {" "}
                    <BedOutlinedIcon style={{ fontSize: "1rem" }} />
                  </Typography>
                </CardContent>
              </div>
            ))}
          </div>
          <button
            className="custom-button"
            style={{
              marginTop: "10px",
              fontSize: "0.7rem",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: "#f8d7da", // Light red background
              border: "1px solid #f5c6cb", // Red border
              color: "#721c24", // Dark red text color
            }}
            onClick={scrollToRooms}
          >
            Change
          </button>
        </div>
      </div>

      {/* Rooms and Guests */}

<p style={{color:"red", fontSize:"11px"}}>Note :- By default 1 room and 3 max guests is selected, you can select single room with maximum of 3 guests</p>
<p>Rooms & Guests</p>
      <div className="date-selection mt-3">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleDecrementRooms}
            style={{
              minWidth: "30px",
              fontSize: "0.8rem",
              padding: "5px",
              backgroundColor: "#c3e6cb", // Light background
            }}
          >
            <FaMinus style={{ fontSize: "0.7rem" }} />
          </button>
        
          <input
            type="number"
            className="form-control"
            style={{
              width: "70px",
              textAlign: "center",
              fontSize: "0.8rem",
              padding: "6px",
              border: "1px solid #ccc", // Subtle border for input
            }}
            placeholder="Rooms"
            value={roomsCount}
            readOnly
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleIncrementRooms}
            style={{
              minWidth: "30px",
              fontSize: "0.8rem",
              padding: "5px",
              backgroundColor: "#c3e6cb", // Light background
            }}
          >
            <FaPlus style={{ fontSize: "0.7rem" }} />
          </button>
        </div>
        <div
          className="check-out"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleDecrementGuests}
            style={{
              minWidth: "30px",
              fontSize: "0.8rem",
              padding: "5px",
              backgroundColor: "#c3e6cb", // Light background
            }}
          >
            <FaMinus style={{ fontSize: "0.7rem" }} />
          </button>
          <input
            type="number"
            className="form-control"
            style={{
              width: "70px",
              textAlign: "center",
              fontSize: "0.8rem",
              padding: "6px",
              border: "1px solid #ccc", // Subtle border for input
            }}
            placeholder="Guests"
            value={guestsCount}
            readOnly
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleIncrementGuests}
            style={{
              minWidth: "30px",
              fontSize: "0.8rem",
              padding: "5px",
              backgroundColor: "#c3e6cb", // Light background
            }}
          >
            <FaPlus style={{ fontSize: "0.7rem" }} />
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <hr style={{ margin: "10px 0" }} />
      <div className="container mt-3">
        <div className="date-selection mt-3 d-flex justify-content-around align-items-center">
          <div className="check-in">
            <p style={{ fontSize: "0.8rem" }}>
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
              style={{
                fontSize: "0.8rem",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc", // Subtle border for date picker
              }}
            />
          </div>
          <div className="check-out">
            <p style={{ fontSize: "0.8rem" }}>
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
              style={{
                fontSize: "0.8rem",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc", // Subtle border for date picker
              }}
            />
          </div>
        </div>
      </div>
      <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
        Total Price
      </p>
      {/* Total Price */}
      <div className="total-price mt-3" style={{ marginTop: "2rem" }}>
        <h3
          style={{
            fontSize: "1.2rem",
            color: "red",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <CurrencyRupeeIcon style={{ fontSize: "1.5rem" }} />
          {calculateTotalPrice()}
        </h3>
      </div>

      {/* Payment Buttons */}
      <div className="payment-buttons mt-3">
        <button
          className="custom-button"
          onClick={handlePay}
          style={{
            width: "100%",
            marginBottom: "5px",
            fontSize: "0.8rem",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#28a745", // Green background for "Pay Now"
            color: "white",
          }}
        >
          Pay Now
        </button>
        <button
          className="custom-button"
          style={{
            width: "100%",
            fontSize: "0.8rem",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#17a2b8", // Blue background for "Pay at Hotel"
            color: "white",
          }}
          onClick={handleBookNow}
        >
          Pay at Hotel
        </button>
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
