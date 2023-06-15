import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar, faPerson, faHotel, faPeopleArrows, faIdCard, faRestroom, faInr, faWifi, faParking, faDumbbell, faFire, faTv, faCamera, faSnowflake, faCreditCard, faElevator, faKitchenSet, faCheck,faPaw, faGlassMartini, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import './Booknow.css';

export default function BookNow() {
    const [bookingDetails, setBookingDetails] = useState({});
    const [hotelImages, setHotelImages] = useState([]);
    const [hotelMoreOpt, setHotelMoreOpt] = useState([]);
    const [hotelAmenities, setHotelAmenities] = useState([]);
    const sliderRef = useRef(null);

    const params = useParams();

    useEffect(() => {
        fetch(`https://hotel-backend-tge7.onrender.com/hotels/${params.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .then((data) => {
                setBookingDetails(data);

                setHotelImages(data.images);
                setHotelAmenities(data.amenities);
                setHotelMoreOpt(data.moreOptions);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Display 3 images at a time
        slidesToScroll: 3, // Navigate by 3 images
    };

    const slideToPrev = () => {
        sliderRef.current.slickPrev();
    };

    const slideToNext = () => {
        sliderRef.current.slickNext();
    };
    console.log(bookingDetails);

    return (
        <>
            <div className="container-p-4">
                <div className="flex">
                    <div className="w-1/3 slider-container">
                        <Slider ref={sliderRef} {...settings}>
                            {hotelImages.map((photo, i) => (
                                <div key={i} className="slider-slide">
                                    <img src={photo} alt={bookingDetails.hotelName} className="my-1" />
                                </div>
                            ))}
                        </Slider>
                        <div className="slider-navigation">
                            <button className="slider-prev" onClick={slideToPrev}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button className="slider-next" onClick={slideToNext}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                    <div className="hotel-details1">
                        <div className='flex-rating'>
                            <div className='name-location'>
                                <h2 className='hotel-name1'>{bookingDetails.hotelName}</h2>

                                <p className='location-booknow'>{bookingDetails.destination}</p>
                            </div>
                            <p className='rating0'><p className='staricon'>{bookingDetails.rating}<FontAwesomeIcon icon={faStar} className='staricon' /></p></p>
                        </div>
                        <div className='pricing'><FontAwesomeIcon icon={faInr} className='indianrupee' />{bookingDetails.price}</div>
                        <p className='hotel-descrip'><p className='description1'>Description:</p> {bookingDetails.description}</p>
                        <p className='amenity-section'><p className='amenity-word'>Amenities: </p><div className='amenityclass'>{hotelAmenities.map((option, index) => {
                            let icon;
                            switch (option) {

                                case 'GYM':
                                    icon = faDumbbell;
                                    break;
                                case 'Free WIFI':
                                    icon = faWifi;
                                    break;

                                case 'Parking':
                                    icon = faParking;
                                    break;
                                case 'Geyser':
                                    icon = faFire;
                                    break;
                                case 'TV':
                                    icon = faTv;
                                    break;
                                case 'CCTV':
                                    icon = faCamera;
                                    break;
                                case 'AC':
                                    icon = faSnowflake;
                                    break;
                                case 'Card-payment':
                                    icon = faCreditCard;
                                    break;
                                case 'Elevator':
                                    icon = faElevator;
                                    break;
                                case 'Kitchen':
                                    icon = faKitchenSet;
                                    break;
                                default:
                                    icon = faCheck;
                            }
                            return (
                                <p key={index}>
                                    {icon && <FontAwesomeIcon icon={icon} className="amenity-icon" />} {option}
                                </p>
                            );
                        })}
                        </div>
                        </p>
                        <div className='moreopt'><p className='morehead'>More:</p>
                        <div className='moreitem'>
                            {hotelMoreOpt.map((option, index) => {
                                let icon;
                                switch (option){
                                    case 'Pets Allowed':
                                    icon = faPaw;
                                    break;
                                    case 'Alcohol Allowed':
                                    icon = faGlassMartini;
                                    break;
                                    case 'Bachelor Allowed':
                                    icon = faPeopleGroup;
                                    break;
                                    


                                }
                                return(
                                    <p key={index}>
                                        {icon && <FontAwesomeIcon icon={icon} className='more-icon'/>}{option}
                                    </p>
                                );
                            })}
                            </div></div>
                            
                                



                        <div className='bookcardmain'>
                            <div className="booking-card">
                                <h2 className="booking-card-title">Booking Starts</h2>
                                <div className="booking-card-content">
                                    <p>
                                        <span className="booking-label"></span>{" "}
                                        <span className="booking-date">{bookingDetails.startDate}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="booking-card">
                                <h2 className="booking-card-title">Booking Ends</h2>
                                <div className="booking-card-content">
                                    <p>
                                        <span className="booking-label"></span>{" "}
                                        <span className="booking-date">{bookingDetails.endDate}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='cust-detail'>Customer Details:</div>
                        <div className="card">

                            <p className='id'>
                                <FontAwesomeIcon icon={faIdCard} className="icon" />
                                LocalID: {bookingDetails.localId}</p>
                            <p className='noofroom'><FontAwesomeIcon icon={faRestroom} className='icon' />Rooms:{bookingDetails.numRooms}</p>
                            <p className="noofguest">
                                <FontAwesomeIcon icon={faPerson} className="icon" />
                                Guests: {bookingDetails.guests}
                            </p>
                            <p className="roomtype">
                                <FontAwesomeIcon icon={faHotel} className="icon" />
                                Room Type: {bookingDetails.roomType}
                            </p>
                            <p className="maritalstatus">
                                <FontAwesomeIcon icon={faPeopleArrows} className="icon" />
                                Marital Status: {bookingDetails.maritalStatus}
                            </p>
                        </div>

                        <div className='hotel-policies'>
                            <div className='hotel-policyheading'>Hotel Policies:</div>
                            <p className='hotel-policy'> {bookingDetails.hotelsPolicy}</p>
                        </div>


                        <div className='reviews'>
                            <div className='reviewhead'>Reviews:<FontAwesomeIcon icon={faStar} className='star1' /><FontAwesomeIcon icon={faStar} className='star1' /><FontAwesomeIcon icon={faStar} className='star1' /></div>
                            <p className='reviewdetail'>{bookingDetails.reviews}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
