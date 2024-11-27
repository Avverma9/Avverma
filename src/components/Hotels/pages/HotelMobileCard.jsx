import React, { useState } from 'react';
import './HotelMobileCard.css';
import MobileSearchBox from './MobileSearchBox';
import NotFoundPage from '../../../utils/Not-found';
import { userId } from '../../../utils/Unauthorized';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const HotelMobileCard = ({ hotelData }) => {
    const [expandedHotelIndex, setExpandedHotelIndex] = useState(null);
    const location = useLocation();

    // Toggle the expanded view of hotel prices
    const togglePriceView = (index) => {
        setExpandedHotelIndex(expandedHotelIndex === index ? null : index);
    };

    const paths = ['/search/hotels', '/search'];
    if (!paths.includes(location.pathname)) {
        return null;
    }
    const handleBuy = (hotelID) => {
        window.location.href = `/book-hotels/${userId}/${hotelID}`;
    };
    return (
        <div className="hotel-card">
            <MobileSearchBox />

            {!hotelData || hotelData.length === 0 ? (
                <NotFoundPage />
            ) : (
                hotelData.map((hotel, index) => (
                    <div
                        key={index}
                        className="card-content"
                        onClick={() => handleBuy(hotel?.hotelId)} // Trigger handleBuy on card click
                    >
                        <div className="image-container">
                            {hotel?.images?.[0] && <img src={hotel?.images[0]} alt="Hotel Room 1" className="hotel-image" />}
                            {hotel?.images?.[1] && <img src={hotel?.images[1]} alt="Hotel Room 2" className="hotel-image" />}
                        </div>
                        <div className="hotel-info">
                            <h3 className="hotel-name">{hotel?.hotelName}</h3>
                            <p className="hotel-location">{hotel?.landmark}</p>
                            <div className="rating">
                                ⭐ <span>{hotel?.starRating}</span> <span className="reviews">(147)</span>
                            </div>
                            <div className="price-details">
                                <span className="current-price">{hotel?.rooms?.[0]?.price}</span>
                                <span className="original-price">₹9341</span>
                                <span className="discount">73% off</span>
                            </div>
                            <p className="tax-info">+ ₹411 taxes & fees</p>
                            <Button
                                className="toggle-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePriceView(index);
                                }} // Prevent triggering handleBuy
                                variant="text"
                            >
                                {expandedHotelIndex === index
                                    ? `▲ Showing price for ${hotel?.rooms?.[0]?.type}`
                                    : `▼ Showing price for ${hotel?.rooms?.[0]?.type}`}
                            </Button>
                        </div>

                        {expandedHotelIndex === index && (
                            <div className="expanded-details">
                                {hotel?.rooms?.map((room, roomIndex) => (
                                    <div className="expanded-item" key={roomIndex}>
                                        <img src={room?.images?.[0]} alt={`${room?.type} Image`} className="room-image" />
                                        <div className="expanded-info">
                                            <div className="room-type">{room?.type}</div>
                                            <div className="price">
                                                <span className="current-price">{room?.price}</span>
                                                <span className="original-price">{room?.originalPrice}</span>
                                            </div>
                                            <p className="tax-info">+ ₹411 taxes & fees</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default HotelMobileCard;
