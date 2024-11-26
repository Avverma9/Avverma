import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocation } from '../redux/reducers/locationSlice';
import './HeaderTravel.css'; // Import the provided CSS file

const HeaderTravel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [locations, setLocations] = useState([]);

    const location = useLocation();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.location);

    useEffect(() => {
        if (!data.length) {
            dispatch(fetchLocation());
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (data.length) {
            setLocations(data);
        }
    }, [data]);

    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault();
            const delta = event.deltaY;

            setCurrentIndex((prevIndex) => {
                if (delta > 0) {
                    return prevIndex < locations.length - 1 ? prevIndex + 1 : 0;
                } else if (delta < 0) {
                    return prevIndex > 0 ? prevIndex - 1 : locations.length - 1;
                }
                return prevIndex;
            });
        };

        const container = document.querySelector('.header');

        if (container) {
            container.addEventListener('wheel', handleWheel);

            return () => {
                container.removeEventListener('wheel', handleWheel);
            };
        }
    }, [locations.length]);

    const paths = ['/search/hotels', '/search', '/', '/travellers'];

    if (!paths.includes(location.pathname)) {
        return null;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="header-travel">
            {locations?.map((loc, index) => (
                <div key={index} className={`city ${index === currentIndex ? 'active' : ''}`}>
                    <Link to={`/search?search=${loc.location}`}>
                        <div className="image-container">
                            {loc.images.map((image, imageIndex) => (
                                <img key={imageIndex} className="circle" src={image} alt={`City Image ${imageIndex + 1}`} />
                            ))}
                        </div>
                        <div className="city-name">{loc?.location === 'Uttar Pradesh' ? 'UP' : loc?.location}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default HeaderTravel;
