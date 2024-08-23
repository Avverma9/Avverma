import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Booknow.css"
const Foods = ({ hotelData, handleAddFood }) => {
  return (
    <div>
      <h6
        style={{
          color: "#333",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "uppercase",
          backgroundImage: "linear-gradient(to right, #ff8c00, #ffc300)",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        Add Meals During Your Stay
      </h6>
      <div
        className="extras"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {hotelData?.foods.map((foodArray, index) => (
          <Card
            key={index}
            sx={{ width: 240, borderRadius: 0, overflow: "hidden" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="160"
                width="100%"
                src={
                  foodArray.images && foodArray.images.length > 0
                    ? foodArray.images[0]
                    : hotelData?.images[0]
                }
                alt={`Food ${index + 1} Image 1`}
                style={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {foodArray.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "0.875rem" }}
                >
                  Price: <CurrencyRupeeIcon style={{ fontSize: "small" }} />
                  {foodArray.price}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center", padding: "8px" }}>
                <button
                  size="small"
                  className="custom-button"
                  style={{ width: "100px", height: "30px" }}
                  onClick={() => handleAddFood(foodArray)}
                >
                  Select
                </button>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

Foods.propTypes = {
  hotelData: PropTypes.shape({
    foods: PropTypes.arrayOf(
      PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleAddFood: PropTypes.func.isRequired,
};

export default Foods;
