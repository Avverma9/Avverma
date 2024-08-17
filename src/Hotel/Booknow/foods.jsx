import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
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
        }}
      >
        Add Meals During Your Stay
      </h6>
      <div
        className="extras"
        style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
      >
        {hotelData?.foods.map((foodArray, index) => (
          <Card key={index} sx={{ width: 500 }}>
            <CardActionArea style={{ display: "flex" }}>
              <CardMedia
                component="img"
                height="140"
                width="100px"
                src={
                  foodArray.images && foodArray.images.length > 0
                    ? foodArray.images[0]
                    : hotelData?.images[0]
                }
                alt={`Food ${index + 1} Image 1`}
              />
              <CardContent style={{ flex: "1 0 auto" }}>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {foodArray.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  About: {foodArray.about}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  Price: <CurrencyRupeeIcon style={{ fontSize: "small" }} />
                  {foodArray.price}
                </Typography>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleAddFood(foodArray)}
                  >
                    Add +1
                  </Button>
                </CardActions>
              </CardContent>
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
