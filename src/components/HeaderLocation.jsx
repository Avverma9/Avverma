import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocation } from '../redux/reducers/locationSlice';
import './HeaderTravel.css'; // Import the provided CSS file

const HeaderTravel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [locations, setLocations] = useState([]); // Initialize locations state

    const location = useLocation();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.location);

    // Fetch location data if it's not already available
    useEffect(() => {
        if (!data.length) {
            dispatch(fetchLocation());
        }
    }, [data, dispatch]);

    // Update locations state from fetched data
    useEffect(() => {
        if (data.length) {
            setLocations(data);
        }
    }, [data]);

    // Handle scroll event to change the current index
    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault(); // Prevent the default behavior of the wheel event

            const delta = event.deltaY;

            setCurrentIndex((prevIndex) => {
                if (delta > 0) {
                    // Scrolling down
                    return prevIndex < locations.length - 1 ? prevIndex + 1 : 0;
                } else if (delta < 0) {
                    // Scrolling up
                    return prevIndex > 0 ? prevIndex - 1 : locations.length - 1;
                }
                return prevIndex;
            });
        };

        // Attach the event listener to the container
        const container = document.querySelector('.header');

        if (container) {
            container.addEventListener('wheel', handleWheel);

            // Cleanup the event listener on component unmount
            return () => {
                container.removeEventListener('wheel', handleWheel);
            };
        }
    }, [locations.length]); // Only need to run when `locations.length` changes

    const paths = ['/search/hotels', '/search', '/'];

    // Return null if the current path is not in the allowed paths
    if (!paths.includes(location.pathname)) {
        return null;
    }

    // Handle loading and error states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="header-travel">
            {locations.map((loc, index) => (
                <div key={index} className={`city ${index === currentIndex ? 'active' : ''}`}>
                    <div className="image-container">
                        {/* Assuming 'images' is an array of image URLs */}
                        {loc.images.map((image, imageIndex) => (
                            <img key={imageIndex} className="circle" src={image} alt={`City Image ${imageIndex + 1}`} />
                        ))}
                    </div>
                    <div className="city-name">{loc.location}</div>
                </div>
            ))}
        </div>
    );
};

export default HeaderTravel;
