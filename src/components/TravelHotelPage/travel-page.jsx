import React from 'react';
import { FaHotel, FaUtensils, FaShuttleVan, FaPlane, FaGlobe, FaBinoculars } from 'react-icons/fa';
import './travel-page.css';
import Filter from './travel-filter';
const TravelPackages = () => {
    const packages = [
        {
            image: 'https://media.easemytrip.com/media/Deal/DL638070533953597585/Attraction/Attractionlaa1f7.jpg',
            title: 'Goa with Zuri White Sands',
            duration: '03 Nights and 04 Days Goa',
            nights: 3,
            price: 28999,
            originalPrice: 32999,
            emi: 5590,
            amenities: [
                { icon: <FaHotel />, label: 'Hotel' },
                { icon: <FaBinoculars />, label: 'Sightseeing' }, // FaBinoculars for Sightseeing
                { icon: <FaShuttleVan />, label: 'Transfer' },
                { icon: <FaUtensils />, label: 'Meal' },
            ],
            flightIncluded: false,
            buttonText: 'View Package',
        },
        {
            image: 'https://media.easemytrip.com/media/Deal/DL638070533953597585/Attraction/Attractionlaa1f7.jpg',
            title: 'Best Singapore Holiday',
            duration: '4N Singapore',
            nights: 4,
            price: 47587,
            emi: 8688,
            amenities: [
                { icon: <FaHotel />, label: 'Hotel' },
                { icon: <FaBinoculars />, label: 'Sightseeing' },
                { icon: <FaShuttleVan />, label: 'Transfer' },
                { icon: <FaUtensils />, label: 'Meal' },
                { icon: <FaPlane />, label: 'Flight' },
            ],
            hotelRating: 4,
            flightIncluded: true,
            buttonText: 'Customize & Book',
        },
        {
            image: 'https://media.easemytrip.com/media/Deal/DL638070533953597585/Attraction/Attractionlaa1f7.jpg',
            title: 'Best Singapore Holiday',
            duration: '4N Singapore',
            nights: 4,
            price: 47587,
            emi: 8688,
            amenities: [
              { icon: <FaHotel />, label: 'Hotel' },
              { icon: <FaBinoculars />, label: 'Sightseeing' },
              { icon: <FaShuttleVan />, label: 'Transfer' },
              { icon: <FaUtensils />, label: 'Meal' },
              { icon: <FaPlane />, label: 'Flight' }
            ],
            hotelRating: 4,
            flightIncluded: true,
            buttonText: 'Customize & Book'
          },
        {
            image: 'https://media.easemytrip.com/media/Deal/DL638070533953597585/Attraction/Attractionlaa1f7.jpg',
            title: 'Best Singapore Holiday',
            duration: '4N Singapore',
            nights: 4,
            price: 47587,
            emi: 8688,
            amenities: [
                { icon: <FaHotel />, label: 'Hotel' },
                { icon: <FaBinoculars />, label: 'Sightseeing' },
                { icon: <FaShuttleVan />, label: 'Transfer' },
                { icon: <FaUtensils />, label: 'Meal' },
                { icon: <FaPlane />, label: 'Flight' },
            ],
            hotelRating: 4,
            flightIncluded: true,
            buttonText: 'Customize & Book',
        },
        {
            image: 'https://media.easemytrip.com/media/Deal/DL638070533953597585/Attraction/Attractionlaa1f7.jpg',
            title: 'Best Singapore Holiday',
            duration: '4N Singapore',
            nights: 4,
            price: 47587,
            emi: 8688,
            amenities: [
                { icon: <FaHotel />, label: 'Hotel' },
                { icon: <FaBinoculars />, label: 'Sightseeing' },
                { icon: <FaShuttleVan />, label: 'Transfer' },
                { icon: <FaUtensils />, label: 'Meal' },
                { icon: <FaPlane />, label: 'Flight' },
            ],
            hotelRating: 4,
            flightIncluded: true,
            buttonText: 'Customize & Book',
        },
        {
            image: 'https://media.easemytrip.com/media/Deal/DL638070533953597585/Attraction/Attractionlaa1f7.jpg',
            title: 'Year End Singapore Vacay with City Tour',
            duration: '5N Singapore',
            nights: 5,
            price: 38899,
            emi: 7240,
            amenities: [
                { icon: <FaHotel />, label: 'Hotel' },
                { icon: <FaBinoculars />, label: 'Sightseeing' },
                { icon: <FaShuttleVan />, label: 'Transfer' },
                { icon: <FaUtensils />, label: 'Meal' },
                { icon: <FaGlobe />, label: 'Visa' },
                { icon: <FaPlane />, label: 'Flight' },
            ],
            hotelRating: 3,
            flightIncluded: true,
            buttonText: 'Customize & Book',
        },
    ];

    return (
        <>
            <Filter />
            <div className="travel-packages">
                {packages.map((pkg, index) => (
                    <div key={index} className="package-card">
                        <img src={pkg.image} alt={pkg.title} className="package-image" />
                        <div className="package-info">
                            <h3 className="package-title">{pkg.title}</h3>
                            <p className="package-duration">{pkg.duration}</p>
                            <div className="nights-badge">{pkg.nights} Nights</div>
                            <div className="amenities">
                                {pkg.amenities.map((amenity, idx) => (
                                    <span key={idx} className="amenity">
                                        {amenity.icon}
                                        <span className="amenity-label">{amenity.label}</span>
                                    </span>
                                ))}
                            </div>
                            <div className="price-section">
                                {pkg.originalPrice && <span className="original-price">₹ {pkg.originalPrice}</span>}
                                <span className="current-price">₹ {pkg.price}</span>
                            </div>
                            <p className="emi-info">No Cost EMI Starts from ₹ {pkg.emi}</p>
                            <button className="package-button">{pkg.buttonText}</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TravelPackages;
