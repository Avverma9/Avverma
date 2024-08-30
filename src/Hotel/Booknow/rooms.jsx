import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import Grid from "@mui/material/Grid";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import "./Booknow.css";
const Rooms = ({
  hotelData,
  selectedRooms,
  handleAddRoom,
  handleRemoveRoom,
}) => {
  return (
    <div>
      {/* Special rooms desktop view */}
      <div className="col-md-13 d-none d-sm-block">
        <div className="container mt-6">
          <div style={{ maxWidth: "100%" }}>
            <Grid container spacing={4}>
              {hotelData?.rooms?.map((room, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <div style={{ marginBottom: "20px" }}>
                    <Card sx={{ width: "100%", borderRadius: "0" }}>
                      <CardMedia
                        component="img"
                        className="card-media-image" // Apply the CSS class
                        src={
                          room.images && room.images.length > 0
                            ? room.images[0]
                            : hotelData?.images[0]
                        }
                        alt={`Room ${index + 1} Image 1`}
                        style={{
                          width: "100%",
                          height: "130px", // Set fixed height
                          objectFit: "cover", // Ensure image covers the area without distortion
                        }}
                      />
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
                          {room.price}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {selectedRooms.find(
                          (selected) => selected.roomId === room.roomId
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
              ))}
            </Grid>
          </div>
        </div>
      </div>

      {/* Mobile view section for special rooms */}
      <div className="col-md-4 d-block d-md-none">
        <div className="container mt-3">
          <Grid container spacing={2}>
            {hotelData?.rooms?.map((room, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    height="150px"
                    style={{ objectFit: "cover", width: "120px" }} // Set width explicitly
                    src={
                      room.images && room.images.length > 0
                        ? room.images[0]
                        : hotelData?.images[0]
                    }
                    alt={`Room ${index + 1} Image 1`}
                  />
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
                        style={{
                          fontSize: "small",
                          verticalAlign: "middle",
                        }}
                      />
                      {room.price}
                    </Typography>
                    <CardActions>
                      {selectedRooms.find(
                        (selected) => selected.roomId === room.roomId
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
            ))}
          </Grid>
        </div>
      </div>
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
