import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHotel, FaUtensils, FaShuttleVan, FaPlane, FaGlobe, FaBinoculars } from 'react-icons/fa';
import './travel-page.css';
import Filter from './travel-filter';
import { getTravelList } from '../../redux/reducers/travelSlice';
import iconsList from '../../utils/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import NotFoundPage from '../../utils/Not-found';

const TravelPackages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    const { data } = useSelector((state) => state.travel);

    useEffect(() => {
        dispatch(getTravelList());
    }, [dispatch]);

    const getAmenityIcon = (amenity) => {
        const iconObj = iconsList.find((icon) => icon.label.toLowerCase() === amenity.toLowerCase());
        return iconObj ? iconObj.icon : null; // Return icon or null if not found
    };

    const handleBooking = (id) => {
        // Use navigate to go to the booking page
        navigate(`/travellers/booking/${id}`);
    };

    return (
        <>
            <Filter /> {/* Keep the Filter always visible */}
            {/* Check if the data exists or is empty */}
            {(!data || data.length === 0) ? (
                <NotFoundPage /> // If no data, show NotFoundPage
            ) : (
                <div className="travel-packages">
                    {data.map((pkg, index) => (
                        <div key={index} className="package-card">
                            <img
                                src={pkg.images[0] || 'default-image.jpg'} // Add a fallback image if not available
                                alt={pkg.travelAgencyName}
                                className="package-image"
                            />
                            <div className="package-info">
                                <h3 className="package-title">{pkg.travelAgencyName}</h3>
                                <p className="package-duration">
                                    {pkg?.nights} Nights & {pkg?.days} Days
                                </p>
                                <div className="nights-badge">{pkg.nights} Nights</div>
                                <div className="amenities">
                                    {pkg.amenities?.slice(0, 4).map((amenity, idx) => (
                                        <span key={idx} className="amenity">
                                            {getAmenityIcon(amenity) && <span className="amenity-icon">{getAmenityIcon(amenity)}</span>}
                                            <span className="amenity-label">{amenity}</span>
                                        </span>
                                    ))}
                                </div>
                                <div className="price-section">
                                    {/* Only show current price */}
                                    {pkg.price && <span className="current-price">₹ {pkg.price}</span>}
                                </div>

                                <button className="package-button" onClick={() => handleBooking(pkg._id)}>
                                    Customize & Book
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default TravelPackages;
