import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiSolidOffer } from 'react-icons/bi';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useLoader } from '../../../utils/loader';
import { IconContext } from 'react-icons';
import Typography from '@mui/joy/Typography';
import { FaCheckCircle } from 'react-icons/fa';
import Box from '@mui/material/Box';
import CardContent from '@mui/joy/CardContent';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import baseURL from '../../../utils/baseURL';
import Filterbar from '../Filterbar';
import '../Hotel.css';
import FilterSidebar from '../FilterSidebar';
import amenityIcons from '../../../utils/extrasList';
import { userId } from '../../../utils/Unauthorized';
import NotFoundPage from '../../../utils/Not-found';
import HotelMobileCard from './HotelMobileCard';

const Hotel = () => {
    const [hotelData, setHotelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const location = useLocation();
    const queryString = location.search.substring(1);
    const apiUrl = `${baseURL}/hotels/filters?${queryString}&page=${page}`;
    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        rating: 0,
        amenities: [],
    });

    const fetchData = async () => {
        showLoader();
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setHotelData(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        } finally {
            hideLoader();
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiUrl]);

    const paths = ['/search/hotels', '/search'];
    if (!paths.includes(location.pathname)) return null;

    const handleBuy = (hotelID) => {
        navigate(`/book-hotels/${userId}/${hotelID}`);
    };

    const defaultIcon = <DoneAllIcon />;

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        const newQueryString = new URLSearchParams({
            ...newFilters,
            page,
        }).toString();
        navigate(`/search/hotels?${newQueryString}`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', margin: '20px' }}>
                {/* Left Skeleton - Filter Bar */}
                <div
                    className="filterbar-skeleton"
                    style={{ width: '300px', height: "800px", padding: '16px', boxSizing: 'border-box' }}
                >
                    <div className="skeleton-filterbar p-3">
                        <div className="skeleton-line" style={{ width: '80%', height: '20px', marginBottom: '10px' }} />
                        <div className="skeleton-line" style={{ width: '90%', height: '15px', marginBottom: '8px' }} />
                        <div className="skeleton-line" style={{ width: '70%', height: '15px', marginBottom: '8px' }} />
                        <div className="skeleton-line" style={{ width: '85%', height: '15px', marginBottom: '8px' }} />
                        <div className="skeleton-line" style={{ width: '60%', height: '15px', marginBottom: '8px' }} />
                    </div>
                </div>

                {/* Separator Line */}
                <div
                    style={{
                        width: '1px',
                        backgroundColor: '#ddd',
                        margin: '0 20px',
                        height: 'auto',
                        alignSelf: 'stretch',
                    }}
                />

                {/* Right Skeleton - Hotel Cards */}
                <div style={{ flexGrow: 1 }}>
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="card skeleton-card p-3 mb-4"
                            style={{ display: 'flex', gap: '16px', maxHeight: '380px', maxWidth: '900px' }}
                        >
                            {/* Image Skeleton */}
                            <div
                                className="skeleton-image"
                                style={{ width: '300px', height: '180px', borderRadius: '6px' }}
                            />

                            {/* Text Skeletons */}
                            <div style={{ flexGrow: 1 }}>
                                <div className="skeleton-line" style={{ width: '100%', height: '24px', marginBottom: '12px' }} />
                                <div className="skeleton-line" style={{ width: '100%', height: '18px', marginBottom: '10px' }} />
                                <div className="skeleton-line" style={{ width: '60%', height: '18px', marginBottom: '10px' }} />
                                <div className="skeleton-line" style={{ width: '40%', height: '18px', marginBottom: '10px' }} />
                                <div className="skeleton-line" style={{ width: '80%', height: '18px', marginBottom: '10px' }} />
                            </div>

                            {/* Button Skeleton */}
                            <div style={{ width: '120px', alignSelf: 'center' }}>
                                <div
                                    className="skeleton-button"
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '6px',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="filtesidebar-container">
                <FilterSidebar />
            </div>
            <HotelMobileCard hotelData={hotelData} totalPages={totalPages} page={page} />
            <div style={{ display: 'flex', margin: '20px' }}>
                <div className="filterbar-container" style={{ width: '250px', marginRight: '20px' }}>
                    <Filterbar onFilterChange={handleFilterChange} />
                </div>
                <div className="container mt-4 d-none d-sm-block" style={{ flexGrow: 1, marginLeft: '20px' }}>
                    {hotelData && hotelData.length > 0 ? (
                        <div className="row border p-3 bg-white">
                            {hotelData.map((hotel, index) => {
                                let minPriceRoom = null;
                                let minPrice = 'N/A';

                                if (hotel.rooms && hotel.rooms.length > 0) {
                                    minPriceRoom = hotel.rooms.reduce((minRoom, currentRoom) => {
                                        const minPrice = parseFloat(minRoom.price) || Infinity;
                                        const currentPrice = parseFloat(currentRoom.price) || Infinity;
                                        return currentPrice < minPrice ? currentRoom : minRoom;
                                    }, hotel.rooms[0]);

                                    if (minPriceRoom) {
                                        minPrice = minPriceRoom.price;
                                    }
                                }

                                return (
                                    <React.Fragment key={index}>
                                        <div className="col-md-12 mb-4 position-relative">
                                            <div className="card">
                                                {minPriceRoom?.isOffer && (
                                                    <div className="offer-details position-absolute top-0 end-0 p-2">
                                                        <p className="mb-1">
                                                            <BiSolidOffer /> {minPriceRoom?.offerName}
                                                        </p>
                                                        <p className="text-danger">
                                                            {minPriceRoom?.offerPriceLess ? `${minPriceRoom?.offerPriceLess}₹ Less` : 'No discount'}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <img
                                                            src={hotel?.images?.[0] || 'https://via.placeholder.com/300x200'}
                                                            alt="Hotel"
                                                            className="img-fluid rounded"
                                                            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <h4>{hotel?.hotelName}</h4>
                                                        <p className="text-muted">
                                                            {hotel?.landmark},{hotel?.city}, {hotel?.state}, {hotel?.pinCode}
                                                        </p>
                                                        <span className="badge bg-warning text-dark">100% Safe Place to Stay™</span>
                                                        <div className="mt-2">
                                                            <span className="badge bg-primary">{hotel?.starRating || 'N/A'}/5</span>
                                                            <span className="text-muted ms-2">{hotel?.reviewCount || '0'} Reviews</span>
                                                        </div>
                                                        <div style={{ maxHeight: '40px', overflow: 'hidden' }}>
                                                            <CardContent style={{ maxHeight: '40px', overflow: 'hidden' }}>
                                                                {hotel.amenities.map((amenity, amenityIndex) => (
                                                                    <div
                                                                        key={amenityIndex}
                                                                        style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'row',
                                                                            flexWrap: 'wrap',
                                                                            maxHeight: '30px',
                                                                            overflow: 'hidden',
                                                                        }}
                                                                    >
                                                                        {amenity?.amenities
                                                                            ?.slice(0, 4)
                                                                            .map((singleAmenity, singleAmenityIndex) => (
                                                                                <Typography
                                                                                    key={singleAmenityIndex}
                                                                                    level="body-xs"
                                                                                    style={{
                                                                                        margin: '5px',
                                                                                        whiteSpace: 'nowrap',
                                                                                        maxHeight: '30px',
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
                                                        </div>
                                                        <p className="mt-2">{hotel.customerWelcomeNote || 'No description available.'}</p>
                                                    </div>
                                                    <div className="col-md-3 text-center" style={{ marginTop: '90px' }}>
                                                        <ul className="list-unstyled">
                                                            <li>
                                                                <FaCheckCircle className="text-success" /> Free Amenities
                                                            </li>
                                                            <li>
                                                                <FaCheckCircle className="text-success" /> 100% Cleaned Rooms
                                                            </li>
                                                            <li>
                                                                <FaCheckCircle className="text-success" /> Room Service
                                                            </li>
                                                        </ul>
                                                        <h4>
                                                            ₹{minPrice} <small className="text-muted">/night</small>
                                                        </h4>
                                                        <p className="text-muted">Lowest room price(Ex. GST)</p>
                                                        <button
                                                            className="btn btn-block text-white"
                                                            style={{ backgroundColor: '#f66b58' }}
                                                            onClick={() => handleBuy(hotel.hotelId)}
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center">
                            <NotFoundPage />
                        </div>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            renderItem={(item) => (
                                <PaginationItem
                                    component="a"
                                    {...item}
                                    onClick={(event) => {
                                        if (item.type !== 'start-ellipsis' && item.type !== 'end-ellipsis') {
                                            setPage(item.page);
                                        }
                                    }}
                                />
                            )}
                            shape="rounded"
                            size="large"
                        />
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Hotel;
