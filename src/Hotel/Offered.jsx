// Offered.jsx
import React, { useState, useEffect } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';

const Offered = () => {
  const [hotelData, setHotelData] = useState([]);
  const [typingText, setTypingText] = useState("");
  const navigate = useNavigate();
  const apiUrl = "https://hotel-backend-tge7.onrender.com/get/offers/main/hotels";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypingText((prevText) => {
        const fullText = "Our Dhamaka Offers";
        const newText = fullText.substring(0, prevText.length + 1);

        if (newText === fullText) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTypingText("");
            setTimeout(() => {
              startTyping();
            }, 3000);
          }, 3000);
        }

        return newText;
      });
    }, 3000);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  const startTyping = () => {
    setTypingText("");
    setTimeout(() => {
      const typingInterval = setInterval(() => {
        setTypingText((prevText) => {
          const fullText = "Our Dhamaka Offers";
          const newText = fullText.substring(0, prevText.length + 1);

          if (newText === fullText) {
            clearInterval(typingInterval);
            setTimeout(() => {
              startTyping();
            }, 3000);
          }

          return newText;
        });
      }, 100);
    }, 3000);
  };

  useEffect(() => {
    startTyping();
  }, []);

  const location = useLocation();
  if (location.pathname !== "/") {
    return null;
  }

  const handleBuy = (hotelID) => {
    navigate(`/book-hotels/${hotelID}`);
  };

  const filteredData = hotelData.slice(0, 8);

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-4 text-center" style={{ fontFamily: "cursive" }}>
        <MdOutlineCelebration /> {typingText} <MdOutlineCelebration />
      </h3>
      <hr />
      <div className="row">
        {filteredData.map((hotel, index) => (
          <div key={index} className="col-md-3 mb-3">
            <Card sx={{ width: 360 }}>
              <div>
                <Typography level="title-lg">{hotel.hotelName}</Typography>
                <Typography level="body-sm"> <FmdGoodIcon/>{hotel.city},{hotel.state}</Typography>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.875rem', right: '.5rem' }}
                >
                  {hotel.starRating.substring(0, 1)}
                  <StarHalfIcon />
                </IconButton>
              </div>
              <AspectRatio minHeight="120px" maxHeight="200px">
                {hotel.images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    loading="lazy"
                    alt=""
                  />
                ))}
              </AspectRatio>
              <CardContent orientation="horizontal">
                <div>
                  <Typography level="body-xs"> price:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    <CurrencyRupeeIcon/> {hotel.roomDetails[0].price}
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                  onClick={() => handleBuy(hotel._id)}
                >
                  View details
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offered;
