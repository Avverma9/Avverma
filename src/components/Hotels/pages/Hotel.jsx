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

// Redux imports for GST
import { useSelector, useDispatch } from 'react-redux';
import { getGst } from '../../../redux/reducers/gstSlice';

const Hotel = () => {
    const [hotelData, setHotelData] = useState([]);
    const [loading, setLoading] = useState(false);
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

    const dispatch = useDispatch();
    const gstData = useSelector((state) => state.gst.gst);

    const fetchData = async () => {
        showLoader();
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setHotelData(data.data);
            setTotalPages(data.totalPages);

            // After fetching hotels, dispatch GST based on max room price
            if (data.data && data.data.length > 0) {
                const allRoomPrices = data.data.flatMap(hotel =>
                    hotel.rooms?.map(room => room.price) || []
                );
                const maxRoomPrice = Math.max(...allRoomPrices);
                if (maxRoomPrice) {
                    const payload = {
                        type: 'Hotel',
                        gstThreshold: maxRoomPrice,
                    };
                    dispatch(getGst(payload));
                }
            }
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        } finally {
            setLoading(false);
            hideLoader();
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

    // GST Calculation helper
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
                                let gstAmount = 0;

                                if (hotel.rooms && hotel.rooms.length > 0) {
                                    minPriceRoom = hotel.rooms.reduce((minRoom, currentRoom) => {
                                        const minPriceVal = parseFloat(minRoom.price) || Infinity;
                                        const currentPriceVal = parseFloat(currentRoom.price) || Infinity;
                                        return currentPriceVal < minPriceVal ? currentRoom : minRoom;
                                    }, hotel.rooms[0]);

                                    if (minPriceRoom) {
                                        minPrice = minPriceRoom.price;
                                        gstAmount = calculateGstAmount(minPrice);
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
                                                            ₹{(parseFloat(minPrice) + gstAmount).toFixed(0)}{' '}
                                                            <small className="text-muted">/night</small>
                                                        </h4>
                                                        <p className="text-muted">Lowest room price (Incl. GST ₹{gstAmount.toFixed(0)})</p>
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
