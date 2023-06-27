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
import "./Booknow.css";
import CheckOut from "../Payment/CheckOut";
import { convertDate } from "../../utils/convertDate";
import axios from "axios";
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
        fetch(`https://hotel-backend-tge7.onrender.com/reviewData/${hotelID}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then((data) => {
                setHotelReviews(data?.reviews);
                console.log(data?.reviews, "JTRSLUYFI:UG");
            });
    }, [hotelID]);

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

    const postReviewHandler = () => {
        axios
            .post(
                `https://hotel-backend-tge7.onrender.com/reviews/${userId}/${hotelID}`,
                {
                    comment: myReview,
                }
            )
            .then((response) => {
                try {
                    if (response?.status === 201) {
                        setMyReview("");
                    }
                } catch (error) {
                    console.log(error);
                }
                console.log(response);
            });
    };

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
                                placeholder="Post New Review"
                                type="text"
                                rows="2"
                                value={myReview}
                                onChange={(e) => setMyReview(e.target.value)}
                            />
                            <button
                                className="post_review_button"
                                onClick={postReviewHandler}
                            >
                                Post
                            </button>
                        </div>

                        <div className="reviews">
                            <div className="reviewhead">
                                <h1>Reviews:</h1>
                                <div className="d-flex flex-column gap-3" style={{
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    padding: "20px",
                                    marginRight: "10%",
                                    marginBottom: "20px",
                                    width: "75%",
                                    height: "auto"
                                }}>
                                    <div className="review_container">
                                        <div className="comment_profile">
                                            <Avatar
                                                name="Anna Kendrick"
                                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcelebmafia.com%2Fwp-content%2Fuploads%2F2019%2F01%2Fanna-kendrick-personal-pics-01-06-2019-5.jpg&f=1&nofb=1&ipt=922df56b5c100652a713c26d29bd9ba409d08d2eefc06d2bb3ab6822cb5180ff&ipo=images"
                                                round={true}
                                                size="35"
                                                style={{
                                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                                }}
                                            />
                                        </div>

                                        <div className="comment_profile_name">
                                            <h4>Anna Kendrick</h4>
                                        </div>

                                        <div className="comment_date">
                                            <p>27/06/2023</p>
                                        </div>
                                    </div>

                                    <div className="review_comment">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit maiores mollitia porro est voluptate, voluptates doloribus dolorem aut sequi sit? Aspernatur minima, dolore dolor ipsam sed ut non maiores! Dolorum, natus. Harum ipsa, iure officia tenetur cumque odio eaque excepturi optio officiis exercitationem qui cupiditate eveniet? Pariatur provident adipisci architecto error, ut repudiandae. Incidunt atque repudiandae rem itaque consequatur officiis.
                                        </p>
                                    </div>
                                </div>

                                {/* <FontAwesomeIcon icon={faStar} className='star1' />
                                <FontAwesomeIcon icon={faStar} className='star1' />
                                <FontAwesomeIcon icon={faStar} className='star1' /> */}
                                {/* {hotelReviews ? hotelReviews.map((review) =>

                                    <div className="d-flex w-75" key={review._id}>
                                        <div className="flex-grow-1 comment">{review.comment}</div>
                                        <div className='createdAt'>{convertDate(review.createdAt)}</div>
                                    </div>

                                ) : <>Loading....</>} */}
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
