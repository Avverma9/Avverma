import React, { useEffect, useState } from 'react';
import './HotelMobileCard.css';
import MobileSearchBox from '../Searchbox/MobileSearchBox';
// NotFoundPage import is no longer needed if not used elsewhere
// import NotFoundPage from '../../../utils/Not-found'; 
import { userId } from '../../../utils/Unauthorized';
import { Button, Skeleton, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getGst } from '../../../redux/reducers/gstSlice';
import { useDispatch, useSelector } from 'react-redux';

const HotelMobileCard = ({ hotelData }) => {
    const [expandedHotelIndex, setExpandedHotelIndex] = useState(null);
    const dispatch = useDispatch();
    const gstData = useSelector((state) => state.gst.gst);
    const location = useLocation();

    const togglePriceView = (index) => {
        setExpandedHotelIndex(expandedHotelIndex === index ? null : index);
    };

    const paths = ['/search/hotels', '/search', '/'];
    if (!paths.includes(location.pathname)) {
        return null;
    }

    const handleBuy = (hotelID) => {
        window.location.href = `/book-hotels/${userId}/${hotelID}`;
    };

    const loading = hotelData === null || hotelData === undefined;

    useEffect(() => {
        if (hotelData && hotelData.length > 0) {
            const allRoomPrices = hotelData.flatMap(hotel => hotel.rooms?.map(room => room.price) || []);
            const maxRoomPrice = Math.max(...allRoomPrices);

            if (maxRoomPrice) {
                dispatch(getGst({ type: "Hotel", gstThreshold: maxRoomPrice }));
            }
        }
    }, [hotelData, dispatch]);

    const calculateGstAmount = (price) => {
        if (
            gstData &&
            price >= gstData.gstMinThreshold &&
            price <= gstData.gstMaxThreshold
        ) {
            return (price * gstData.gstPrice) / 100;
        }
        return 0;
    };

    return (
        <div className="hotel-card">
            <MobileSearchBox />

            {loading ? (
                <Stack spacing={2} className="skeleton-container">
                    {[...Array(3)].map((_, index) => (
                        <div className="card-content skeleton-card" key={index}>
                            <div className="image-container">
                                <Skeleton variant="rectangular" width="48%" height={50} />
                                <Skeleton variant="rectangular" width="48%" height={50} />
                            </div>
                            <div className="hotel-info">
                                <Skeleton variant="text" width="70%" height={25} />
                                <Skeleton variant="text" width="50%" height={20} />
                                <Skeleton variant="text" width="30%" height={20} />
                                <div className="price-details-skeleton">
                                    <Skeleton variant="text" width="30%" height={22} />
                                    <Skeleton variant="text" width="25%" height={18} />
                                    <Skeleton variant="text" width="20%" height={18} />
                                </div>
                                <Skeleton variant="text" width="60%" height={18} style={{ marginTop: 8 }} />
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={36}
                                    style={{ marginTop: 12, borderRadius: 6 }}
                                />
                            </div>
                        </div>
                    ))}
                </Stack>
            ) : hotelData.length === 0 ? (
                // When no data is found, render nothing
                null
            ) : (
                hotelData.map((hotel, index) => {
                    const mainRoomPrice = hotel?.rooms?.[0]?.price || 0;
                    const mainRoomGst = calculateGstAmount(mainRoomPrice);

                    return (
                        <div
                            key={index}
                            className="card-content"
                            onClick={() => handleBuy(hotel?.hotelId)}
                        >
                            <div className="image-container">
                                {hotel?.images?.[0] && (
                                    <img src={hotel.images[0]} alt="Hotel Room 1" className="hotel-image" />
                                )}
                                {hotel?.images?.[1] && (
                                    <img src={hotel.images[1]} alt="Hotel Room 2" className="hotel-image" />
                                )}
                            </div>
                            <div className="hotel-info">
                                <h3 className="hotel-name">{hotel?.hotelName}</h3>
                                <p className="hotel-location">{hotel?.landmark}</p>
                                <div className="rating">
                                    ⭐ <span>{hotel?.starRating}</span>{' '}
                                    <span className="reviews">(147)</span>
                                </div>
                                <div className="price-details">
                                    <span className="current-price">₹{(mainRoomPrice + mainRoomGst).toFixed(0)}</span>
                                    <span className="original-price">₹9341</span>
                                    <span className="discount">73% off</span>
                                </div>
                                {
                                    mainRoomGst.toFixed(0) > 0 && <p className="tax-info">({mainRoomGst.toFixed(0)} included as taxes & fees)</p>
                                }
                                <Button
                                    className="toggle-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePriceView(index);
                                    }}
                                    variant="text"
                                >
                                    {expandedHotelIndex === index
                                        ? `▲ Showing price for ${hotel?.rooms?.[0]?.type}`
                                        : `▼ Showing price for ${hotel?.rooms?.[0]?.type}`}
                                </Button>
                            </div>

                            {expandedHotelIndex === index && (
                                <div className="expanded-details">
                                    {hotel?.rooms?.map((room, roomIndex) => {
                                        const gstAmount = calculateGstAmount(room?.price);
                                        return (
                                            <div className="expanded-item" key={roomIndex}>
                                                <img
                                                    src={room?.images?.[0]}
                                                    alt={`${room?.type} Image`}
                                                    className="room-image"
                                                />
                                                <div className="expanded-info">
                                                    <div className="room-type">{room?.type}</div>
                                                    <div className="price">
                                                        <span className="current-price">₹{(room?.price + gstAmount).toFixed(0)}</span>
                                                        <span className="original-price">₹{room?.originalPrice}</span>
                                                    </div>
                                                    <p className="tax-info">({gstAmount.toFixed(0)} included as taxes & fees)</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default HotelMobileCard;