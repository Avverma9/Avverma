import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faStar,
    faPerson,
    faHotel,
    faPeopleArrows,
    faIdCard,
    faRestroom,
    faInr,
    faWifi,
    faParking,
    faDumbbell,
    faFire,
    faTv,
    faCamera,
    faSnowflake,
    faCreditCard,
    faElevator,
    faKitchenSet,
    faCheck,
    faPaw,
    faGlassMartini,
    faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { BiEdit, BiTrash } from 'react-icons/bi';
import { FaTelegramPlane } from "react-icons/fa"
import "./Booknow.css";
import CheckOut from "../Payment/CheckOut";
import { convertDate } from "../../utils/convertDate";
import Avatar from "react-avatar";

export default function BookNow() {
    const [bookingDetails, setBookingDetails] = useState({});
    const [hotelID, setHotelID] = useState("");
    const [hotelImages, setHotelImages] = useState([]);
    const [hotelMoreOpt, setHotelMoreOpt] = useState([]);
    const [hotelAmenities, setHotelAmenities] = useState([]);
    const [checkIN, setCheckIn] = useState("");
    const [checkOUT, setCheckOut] = useState("");
    const [myReview, setMyReview] = useState("");
    const [hotelReviews, setHotelReviews] = useState([]);

    const [isUpdatingReview, setIsUpdatingReview] = useState(false);
    const [reviewId, setReviewId] = useState("");

    const [updatedReview, setUpdatedReview] = useState("")


    const sliderRef = useRef(null);
    const userId = localStorage.getItem("userId");

    const params = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`https://hotel-backend-tge7.onrender.com/hotels/${params.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch user data");
                }
            })
            .then((data) => {
                setBookingDetails(data);
                setHotelID(data._id);
                setHotelImages(data.images);
                setHotelAmenities(data.amenities);
                setHotelMoreOpt(data.moreOptions);
                setCheckIn(convertDate(bookingDetails.startDate));
                setCheckOut(convertDate(bookingDetails.endDate));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params, bookingDetails.startDate, bookingDetails.endDate]);

    useEffect(() => {
        setHotelReviews([]);
        fetch(`https://hotel-backend-tge7.onrender.com/getReviews/${hotelID}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then((data) => {
                setHotelReviews(data?.reviews);
                console.log(data?.reviews[0].review, "JTRSLUYFI:UG");
            });
    }, [hotelID]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const slideToPrev = () => {
        sliderRef.current.slickPrev();
    };

    const slideToNext = () => {
        sliderRef.current.slickNext();
    };

    console.log(bookingDetails);

    const postReviewHandler = () => {
        fetch(`https://hotel-backend-tge7.onrender.com/reviews/${userId}/${hotelID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: myReview,
            }),
        })
            .then((response) => {
                try {
                    if (response?.status === 201) {
                        const data = response.json();
                        console.log(data)

                        setMyReview("");
                        window.location.reload(); // Reload the page
                    }
                } catch (error) {
                    console.log(error);
                }
            });
    };

    const deleteReviewHandler = (revId) => {
        fetch(`https://hotel-backend-tge7.onrender.com/delete/${userId}/${hotelID}/${revId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                try {
                    if (response.status === 200) {
                        const data = response.json();
                        window.location.reload();
                    }
                } catch (error) {
                    console.log(error);
                }
            });
    };

    const updateReviewHandler = () => {
        fetch(`https://hotel-backend-tge7.onrender.com/update/${userId}/${hotelID}/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: updatedReview,
            }),
        })
            .then((response) => {
                try {
                    if (response?.status === 200) {
                        const data = response.json();
                        window.location.reload();
                        console.log(data);
                        window.alert(data.value.message)
                        setIsUpdatingReview(false)
                        setReviewId("");
                        setUpdatedReview("")
                    }
                } catch (error) {
                    console.log(error);
                }
            });
    }

    const toggleUpdateReview = (rev) => {
        setIsUpdatingReview(true)
        setReviewId(rev.review._id);
        setUpdatedReview(rev.review.comment)
    }

    return (
        <>
            <div className="container-p-4">
                <div className="flex">
                    <div className="w-1/3 slider-container">
                        <Slider ref={sliderRef} {...settings}>
                            {hotelImages.map((photo, i) => (
                                <div key={i} className="slider-slide">
                                    <img
                                        src={photo}
                                        alt={bookingDetails.hotelName}
                                        className="my-1"
                                    />
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
                        <div className="flex-rating">
                            <div className="name-location">
                                <h2 className="hotel-name1">{bookingDetails.hotelName}</h2>

                                <p className="location-booknow">{bookingDetails.destination}</p>
                            </div>
                            <p className="rating0">
                                <p className="staricon">
                                    {bookingDetails.rating}
                                    <FontAwesomeIcon icon={faStar} className="staricon" />
                                </p>
                            </p>
                        </div>
                        <div className="pricing">
                            <FontAwesomeIcon icon={faInr} className="indianrupee" />
                            {bookingDetails.price}
                        </div>
                        <p className="hotel-descrip">
                            <p className="description1">Description:</p>{" "}
                            {bookingDetails.description}
                        </p>
                        <p className="amenity-section">
                            <p className="amenity-word">Amenities: </p>
                            <div className="amenityclass">
                                {hotelAmenities.map((option, index) => {
                                    let icon;
                                    switch (option) {
                                        case "GYM":
                                            icon = faDumbbell;
                                            break;
                                        case "Free WIFI":
                                            icon = faWifi;
                                            break;

                                        case "Parking":
                                            icon = faParking;
                                            break;
                                        case "Geyser":
                                            icon = faFire;
                                            break;
                                        case "TV":
                                            icon = faTv;
                                            break;
                                        case "CCTV":
                                            icon = faCamera;
                                            break;
                                        case "AC":
                                            icon = faSnowflake;
                                            break;
                                        case "Card-payment":
                                            icon = faCreditCard;
                                            break;
                                        case "Elevator":
                                            icon = faElevator;
                                            break;
                                        case "Kitchen":
                                            icon = faKitchenSet;
                                            break;
                                        default:
                                            icon = faCheck;
                                    }
                                    return (
                                        <p key={index}>
                                            {icon && (
                                                <FontAwesomeIcon icon={icon} className="amenity-icon" />
                                            )}{" "}
                                            {option}
                                        </p>
                                    );
                                })}
                            </div>
                        </p>
                        <div className="moreopt">
                            <p className="morehead">More:</p>
                            <div className="moreitem">
                                {hotelMoreOpt.map((option, index) => {
                                    let icon;
                                    // eslint-disable-next-line default-case
                                    switch (option) {
                                        case "Pets Allowed":
                                            icon = faPaw;
                                            break;
                                        case "Alcohol Allowed":
                                            icon = faGlassMartini;
                                            break;
                                        case "Bachelor Allowed":
                                            icon = faPeopleGroup;
                                            break;
                                    }
                                    return (
                                        <p key={index}>
                                            {icon && (
                                                <FontAwesomeIcon icon={icon} className="more-icon" />
                                            )}
                                            {option}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bookcardmain">
                            <div className="booking-card">
                                <h2 className="booking-card-title">Check in</h2>
                                <div className="booking-card-content">
                                    <p>
                                        <span className="booking-label"></span>{" "}
                                        <span className="booking-date">{checkIN}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="booking-card">
                                <h2 className="booking-card-title">Check out</h2>
                                <div className="booking-card-content">
                                    <p>
                                        <span className="booking-label"></span>{" "}
                                        <span className="booking-date">{checkOUT}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">Customer Details:</div>
                        <div className="card">
                            <p className="id">
                                <FontAwesomeIcon icon={faIdCard} className="icon" />
                                LocalID: {bookingDetails.localId}
                            </p>
                            <p className="noofroom">
                                <FontAwesomeIcon icon={faRestroom} className="icon" />
                                Rooms:{bookingDetails.numRooms}
                            </p>
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

                        <div className="hotel-policies">
                            <div className="hotel-policyheading">Hotel Policies:</div>
                            <p className="hotel-policy"> {bookingDetails.hotelsPolicy}</p>
                        </div>

                        <div className="create_new_reviews">
                            <textarea
                                placeholder="Write a new review"
                                type="text"
                                rows="2"
                                value={myReview}
                                onChange={(e) => setMyReview(e.target.value)}
                            />
                            <button
                                className="post_review_button"
                                onClick={postReviewHandler}
                            >
                                <FaTelegramPlane />
                            </button>
                        </div>

                        <div className="reviews">
                            <div className="reviewhead">
                                <h1>Reviews:</h1>
                                {hotelReviews ? [...hotelReviews].reverse().map((rev, i) => (
                                    <>
                                        <div className="d-flex flex-column gap-3" style={{
                                            padding: "20px",
                                            marginRight: "10%",
                                            // marginBottom: "20px",
                                            width: "75%",
                                            height: "auto",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "1",
                                        }} key={i}>
                                            <div className="review_container">
                                                <div className="comment_profile">
                                                    <Avatar
                                                        name={rev.user.name}
                                                        src={rev.user.images[0]}
                                                        round={true}
                                                        size="35"
                                                        style={{
                                                            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)",
                                                        }}
                                                    />
                                                </div>

                                                <div className="comment_profile_name">
                                                    <h4>{rev.user.name}</h4>
                                                </div>

                                                {rev.review.user === userId && <div className="comment_update_del">
                                                    <BiEdit color="#2563eb" size={24} onClick={() => toggleUpdateReview(rev)} />
                                                    <BiTrash color="#dc3545" size={24} onClick={() => deleteReviewHandler(rev.review._id)} />
                                                </div>}
                                            </div>

                                            {isUpdatingReview && reviewId === rev.review._id ?
                                                <div className="update_review">
                                                    <textarea
                                                        placeholder="Update Review"
                                                        type="text"
                                                        rows="2"
                                                        value={updatedReview}
                                                        onChange={(e) => setUpdatedReview(e.target.value)}
                                                    />
                                                    <button
                                                        className="update_review_button"
                                                        onClick={updateReviewHandler}
                                                    >
                                                        <FaTelegramPlane />
                                                    </button>
                                                </div>
                                                :
                                                <div className="review_comment">
                                                    <p>
                                                        {rev.review.comment}
                                                    </p>

                                                    <div className="comment_date">
                                                        <p>{convertDate(rev.review.createdAt)}</p>
                                                    </div>
                                                </div>
                                            }
                                            <div style={{ border: "1px solid #94a3b8 " }}></div>
                                        </div>
                                    </>
                                )) : null}
                            </div>
                            {/* <p className='reviewdetail'>{bookingDetails.reviews}</p> */}
                        </div>
                        <CheckOut
                            hotelId={bookingDetails._id}
                            userId={userId}
                            amount={Number(bookingDetails.price)}
                            currency="INR"
                        />
                    </div>
                </div>
            </div>
        </>
    );

}
