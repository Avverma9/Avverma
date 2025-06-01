import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTravelList } from '../../redux/reducers/travelSlice';
import { useLoader } from '../../utils/loader';
import NotFoundPage from '../../utils/Not-found';
import iconsList from '../../utils/icons';
import Filter from './travel-filter';
import './travel-page.css';

const TravelPackages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { data } = useSelector((state) => state.travel);

  useEffect(() => {
    showLoader();
    try {
      dispatch(getTravelList());
    } catch (error) {
      console.error('Error fetching travel packages:', error);
    } finally {
      hideLoader();
    }
  }, [dispatch]);

  const getAmenityIcon = (amenity) => {
    const iconObj = iconsList.find((icon) => icon.label.toLowerCase() === amenity.toLowerCase());
    return iconObj ? iconObj.icon : null;
  };

  const handleBooking = (id) => {
    navigate(`/travellers/booking/${id}`);
  };

  return (
    <>
      <Filter />
      {!data ? (
        <div className="skeleton-loader">
          {Array(6)
            .fill()
            .map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image" />
                <div className="skeleton-content">
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-amenities">
                    <div className="skeleton-icon" />
                    <div className="skeleton-icon" />
                    <div className="skeleton-icon" />
                  </div>
                  <div className="skeleton-line medium" />
                  <div className="skeleton-button" />
                </div>
              </div>
            ))}
        </div>
      ) : data.length === 0 ? (
        <NotFoundPage />
      ) : (
        <div className="travel-packages">
          {data.map((pkg, index) => (
            <div key={index} className="package-card">
              <img
                src={pkg.images[0] || 'default-image.jpg'}
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
                      {getAmenityIcon(amenity) && (
                        <span className="amenity-icon">{getAmenityIcon(amenity)}</span>
                      )}
                      <span className="amenity-label">{amenity}</span>
                    </span>
                  ))}
                </div>
                <div className="price-section">
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
