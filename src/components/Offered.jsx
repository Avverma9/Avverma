import React, { useState, useEffect } from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Button from '@mui/joy/Button';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import amenityIcons from '../utils/extrasList';
import Stack from '@mui/material/Stack';
import { IconContext } from 'react-icons';
import Card from '@mui/joy/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import baseURL from '../utils/baseURL';
import { userId } from '../utils/Unauthorized';
const Offered = () => {
    const [hotelData, setHotelData] = useState([]);
    const location = useLocation();
    const [page, setPage] = useState(1);

    const apiUrl = `${baseURL}/get/offers/main/hotels`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setHotelData(data);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchData();
    }, [apiUrl, page]);

    if (location.pathname !== '/') {
        return null;
    }

    const handleBuy = (hotelID) => {
        window.location.href = `/book-hotels/${userId}/${hotelID}`;
    };

    const defaultIcon = <DoneAllIcon />;
    const limitedData = hotelData?.slice(0, 10);
    return (
        <div className="container mt-4">
            <hr />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {limitedData?.map((hotel, index) => (
                    <div key={index} className="col mb-3">
                        <Card sx={{ width: '100%', height: '400px', overflow: 'hidden' }}>
                            <div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '.5rem',
                                    }}
                                >
                                    {hotel?.rooms?.[0]?.offerPriceLess > 0 && (
                                        <Stack direction="row" spacing={1}>
                                            <Chip
                                                label={`Get ${
                                                    hotel?.rooms?.[0]?.offerPriceLess > 0
                                                        ? hotel?.rooms?.[0]?.offerPriceLess
                                                        : hotel?.rooms?.[0]?.price
                                                }% less`}
                                                color="success"
                                                variant="filled"
                                                avatar={<Avatar alt="Off" src="/static/images/avatar/1.jpg" />}
                                            />
                                        </Stack>
                                    )}
                                </div>

                                <br />
                                <Typography level="title-sm">{hotel.hotelName}</Typography>
                                <Typography level="body-xs">
                                    {' '}
                                    <FmdGoodIcon />
                                    {hotel.city}, {hotel.state}
                                </Typography>
                                <IconButton
                                    aria-label="bookmark Bahamas Islands"
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    sx={{ position: 'absolute', top: '0.5rem', left: '.5rem' }}
                                >
                                    <Box
                                        key={hotel._id}
                                        sx={{
                                            '& > legend': { mt: 2 },
                                        }}
                                    >
                                        <Rating name="hotel-rating" value={hotel?.starRating} readOnly />
                                    </Box>
                                </IconButton>
                            </div>
                            <Carousel>
                                {hotel?.images?.map((image, i) => (
                                    <Carousel.Item key={i}>
                                        <img src={image} className="d-block w-100" alt="" style={{ height: '200px', objectFit: 'cover' }} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <CardContent style={{ maxHeight: '40px', overflow: 'hidden' }}>
                                {/* Amenities Section */}
                                {hotel?.amenities?.map((amenity, amenityIndex) => (
                                    <div
                                        key={amenityIndex}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            maxHeight: '40px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {amenity?.amenities?.slice(0, 4).map((singleAmenity, singleAmenityIndex) => (
                                            <Typography
                                                key={singleAmenityIndex}
                                                level="body-xs"
                                                style={{
                                                    margin: '5px',
                                                    whiteSpace: 'nowrap',
                                                    maxHeight: '40px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <IconContext.Provider value={{ size: '1.2em' }}>
                                                    {amenityIcons[singleAmenity] || defaultIcon}
                                                </IconContext.Provider>{' '}
                                                {singleAmenity}
                                            </Typography>
                                        ))}
                                    </div>
                                ))}
                            </CardContent>
                            <CardContent orientation="horizontal">
                                <div>
                                    {hotel?.rooms && (
                                        <>
                                            {hotel.rooms.reduce((minRoom, currentRoom) => {
                                                return currentRoom.price < minRoom.price ? currentRoom : minRoom;
                                            }).price !== undefined && (
                                                <>
                                                    <Typography level="body-xs">Lowest Price:</Typography>
                                                    <Typography fontSize="sm" fontWeight="lg">
                                                        <CurrencyRupeeIcon />{' '}
                                                        {
                                                            hotel.rooms.reduce((minRoom, currentRoom) => {
                                                                return currentRoom.price < minRoom.price ? currentRoom : minRoom;
                                                            }).price
                                                        }
                                                    </Typography>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                                <Button
                                    variant="solid"
                                    size="sm"
                                    color="primary"
                                    aria-label="Explore Bahamas Islands"
                                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                    onClick={() => handleBuy(hotel.hotelId)}
                                >
                                    View
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
