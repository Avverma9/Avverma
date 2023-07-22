import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CheckOut from "../Payment/CheckOut";
import { BiEdit, BiTrash } from "react-icons/bi";
import Avatar from "react-avatar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { FaTelegramPlane } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
import { convertDate } from '../../utils/convertDate';


export default function BookNowPage({ refresh, reset, userData }) {
  const maxVisiblePages = 6;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { offerId } = useParams();
  const [hotelID, setHotelID] = useState("");
  const [offerData, setOfferData] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [hotelMoreOpt, setHotelMoreOpt] = useState([]);
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [expand, setExpand] = useState(false);
  const [myReview, setMyReview] = useState("");
  const [updatedReview, setUpdatedReview] = useState("");
  const [fieldFocus, setFieldFocus] = useState("");
  const userId = localStorage.getItem("userId");
  const [reviewId, setReviewId] = useState("");
  const [hotelReviews, setHotelReviews] = useState([]);
  const [isUpdatingReview, setIsUpdatingReview] = useState(false);
  

  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/offers/${offerId}`)
      .then((response) => response.json())
      .then((data) => {
        setOfferData(data);
        setHotelImages(data.images);
        setHotelAmenities(data.amenities);
        setHotelMoreOpt(data.moreOptions);
        setCheckIn(convertDate(data.startDate));
        setCheckout(convertDate(data.endDate));
        setHotelID(data._id);
      })
      .catch((error) => console.error(error));
  }, [offerId]);

  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  // const slideToPrev = () => {
  //   sliderRef.current.slickPrev();
  // };

  // const slideToNext = () => {
  //   sliderRef.current.slickNext();
  // };

  const expanddescription = () => {
    setExpand(!expand);
  };

  const truncateText = (text, maxLength) => {
    if (!expand && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
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
  }, [hotelID, reset]);

  const totalItems = hotelReviews && hotelReviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = hotelReviews && hotelReviews.slice(startIndex, endIndex);

  const visiblePages = [];
  const totalPagesToDisplay = Math.min(totalPages, maxVisiblePages);
  let startPage = 1;
  let endPage = totalPagesToDisplay;

  if (currentPage > Math.floor(maxVisiblePages / 2)) {
    startPage = currentPage - Math.floor(maxVisiblePages / 2);
    endPage = startPage + totalPagesToDisplay - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - totalPagesToDisplay + 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const postReviewHandler = () => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/reviews/${userId}/${hotelID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: myReview,
        }),
      }
    ).then((response) => {
      try {
        if (response?.status === 201) {
          const data = response.json();
          console.log(data);

          setMyReview("");
          // window.location.reload();
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteReviewHandler = (revId) => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/delete/${userId}/${hotelID}/${revId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      try {
        if (response.status === 200) {
          // const data = response.json();
          // window.location.reload();
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const updateReviewHandler = () => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/update/${userId}/${hotelID}/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: updatedReview,
        }),
      }
    ).then((response) => {
      try {
        if (response?.status === 200) {
          const data = response.json();
          // window.location.reload();
          console.log(data);
          // window.alert(data.value.message)
          setIsUpdatingReview(false);
          setReviewId("");
          setUpdatedReview("");
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const toggleUpdateReview = (rev) => {
    setIsUpdatingReview(true);
    setReviewId(rev.review._id);
    setUpdatedReview(rev.review.comment);
  };

  const keyPressHandler = (event) => {
    if (
      event.key === "Enter" &&
      event.ctrlKey &&
      fieldFocus === ("post_review_button" || "update_review_button")
    ) {
      // Next Line when the `ctrl` + `enter` key is pressed
      event.target.value += "\n";
    } else if (
      event.key === "Enter" &&
      fieldFocus === "post_review_button" &&
      event.target.value !== ("" || "\n")
    ) {
      event.target.value -= "\n";
      postReviewHandler();
      event.target.value = "";
    } else if (
      event.key === "Enter" &&
      fieldFocus === "update_review_button" &&
      event.target.value !== ("" || "\n")
    ) {
      event.target.value -= "\n";
      updateReviewHandler();
      event.target.value = "";
    }
  };

  console.log(fieldFocus);


  return (
    <div>
      <div className="container-p-4">
        <div className="flex">
          <div className="w-1/3 slider-container _book_now_page">
            <Slider ref={sliderRef} {...settings}>
              {hotelImages.map((photo, i) => (
                <div key={i} className="slider-slide">
                  <img src={photo} alt={offerData.hotelName} className="my-1" />
                </div>
              ))}
            </Slider>
            {/* <div className="slider-navigation">
              <button className="slider-prev" onClick={slideToPrev}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="slider-next" onClick={slideToNext}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div> */}
          </div>
          <div className="hotel-details1">
            <div className="flex-rating">
              <div className="name-location">
                <h2 className="hotel-name1">{offerData.hotelName}</h2>

                <p className="location-booknow">{offerData.destination}</p>
              </div>
              <div className="rating0">
                <div className="staricon">
                  {offerData.rating}
                  <FontAwesomeIcon icon={faStar} className="staricon" />
                </div>
              </div>
            </div>
            <div className="pricing">
              <FontAwesomeIcon icon={faInr} className="indianrupee" />
              {offerData.price}
            </div>
            <div className="offer-data">
              <p style={{ fontSize: "20px" }}>Offer:{offerData.offers}</p>
            </div>
            <div className="hotel-descrip">
              <p className={`description1 ${expand ? "expanded" : ""}`}>
                Description:
              </p>{" "}
              <p className={`description-content ${expand ? "expanded" : ""}`}>
                {offerData.description &&
                  truncateText(offerData.description, 100)}
              </p>
              {!expand && (
                <button className="viewMoreBtn" onClick={expanddescription}>
                  View More
                </button>
              )}
              {expand && (
                <button className="viewLessBtn" onClick={expanddescription}>
                  View Less
                </button>
              )}
            </div>
            <div className="amenity-section">
              <div className="amenity-word">Amenities:</div>
              <div className="amenityclass">
                {hotelAmenities.map((option, index) => {
                  let icon;
                  switch (option) {
                    case "GYM":
                      icon = faDumbbell;
                      break;
                    case "Wifi":
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
                    <div key={index} className="amenity-item">
                      {icon && (
                        <FontAwesomeIcon icon={icon} className="amenity-icon" />
                      )}{" "}
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>

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
                    default:
                      icon = faCheck;
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
                <h2 className="booking-card-title">Check-IN</h2>
                <div className="booking-card-content">
                  <p>
                    <span className="booking-label"></span>{" "}
                    <span className="booking-date">{checkin}</span>
                  </p>
                </div>
              </div>

              <div className="booking-card">
                <h2 className="booking-card-title">Check-Out</h2>
                <div className="booking-card-content">
                  <p>
                    <span className="booking-label"></span>{" "}
                    <span className="booking-date">{checkout}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="cust-detail">Customer Details:</div>
            <div className="card">
              <p className="id">
                <FontAwesomeIcon icon={faIdCard} className="icon" />
                LocalID: {offerData.availability}
              </p>
              <p className="noofroom">
                <FontAwesomeIcon icon={faRestroom} className="icon" />
                Rooms:{offerData.numRooms}
              </p>
              <p className="noofguest">
                <FontAwesomeIcon icon={faPerson} className="icon" />
                Guests: {offerData.guests}
              </p>
              <p className="roomtype">
                <FontAwesomeIcon icon={faHotel} className="icon" />
                Room Type: {offerData.roomType}
              </p>
              <p className="accomodation">
                <FontAwesomeIcon icon={faHotel} className="icon" />
                Accomodation: {offerData.accommodationType}
              </p>
              <p className="maritalstatus">
                <FontAwesomeIcon icon={faPeopleArrows} className="icon" />
                Marital Status: {offerData.maritalStatus}
              </p>
              <p className="collection">
                <FontAwesomeIcon icon={faPeopleArrows} className="icon" />
                Collection:{offerData.collections}
              </p>
            </div>

            <div className="hotel-policies">
              <div className="hotel-policyheading">Hotel Policies:</div>
              <p className="hotel-policy"> {offerData.hotelsPolicy}</p>
            </div>
            <div className="create_new_reviews">
              <textarea
                placeholder="Write a new review"
                type="text"
                rows="2"
                value={myReview}
                onChange={(e) => setMyReview(e.target.value)}
                onKeyUp={keyPressHandler}
                onFocus={(e) =>
                  setFieldFocus(e.target.nextElementSibling.className)
                }
              />
              <button
                className="post_review_button"
                onClick={postReviewHandler}
              >
                <FaTelegramPlane />
              </button>
            </div>
            <div className="reviews" key={refresh}>
              <div className="reviewhead">
                <h1>Reviews:</h1>
                {currentData
                  ? [...currentData].reverse().map((rev, i) => (
                      <>
                        <div
                          className="d-flex flex-column gap-3"
                          style={{
                            padding: "20px",
                            marginRight: "10%",
                            // marginBottom: "20px",
                            width: "75%",
                            height: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1",
                          }}
                          key={i}
                        >
                          <div className="review_container">
                            <div className="comment_profile">
                              <Avatar
                                name={rev.user.name}
                                src={rev.user.images[0]}
                                round={true}
                                size="35"
                                style={{
                                  boxShadow:
                                    "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)",
                                }}
                              />
                            </div>

                          <div className="comment_profile_name">
                            <h4>{rev.user.name}</h4>
                          </div>

                          {rev.review.user === userId && (
                            <div className="comment_update_del">
                              <BiEdit
                                color="#2563eb"
                                size={24}
                                onClick={() => toggleUpdateReview(rev)}
                              />
                              <BiTrash
                                color="#dc3545"
                                size={24}
                                onClick={() =>
                                  deleteReviewHandler(rev.review._id)
                                }
                              />
                            </div>
                          )}
                        </div>

                        {isUpdatingReview && reviewId === rev.review._id ? (
                          <div className="update_review">
                            <textarea
                              placeholder="Update Review"
                              type="text"
                              rows="2"
                              value={updatedReview}
                              onChange={(e) =>
                                setUpdatedReview(e.target.value)
                              }
                              onKeyUp={keyPressHandler}
                              onFocus={(e) =>
                                setFieldFocus(
                                  e.target.nextElementSibling.className
                                )
                              }
                            />
                            <button
                              className="update_review_button"
                              onClick={updateReviewHandler}
                            >
                              <FaTelegramPlane />
                            </button>
                          </div>
                        ) : (
                          <div className="review_comment">
                            <p>{rev.review.comment}</p>

                            <div className="comment_date">
                              <h6>{convertDate(rev.review.createdAt)}</h6>
                            </div>
                          </div>
                        )}
                        <div style={{ border: "1px solid #94a3b8 " }}></div>
                      </div>
                    </>
                  ))
                  : null}
              </div>
              {/* <p className='reviewdetail'>{bookingDetails.reviews}</p> */}
              <div className="_pagination">
                <button
                  className="_pagination-button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    className={`_pagination-button ${
                      page === currentPage ? "_pagination-active" : ""
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="_pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            <CheckOut
              hotelId={offerData._id}
              userId={userId}
              amount={Number(offerData.price)}
              currency="INR"
              userData={userData}
            />
            <div className='reviews'>
              <div className='reviewhead'>
                <h1>Reviews:</h1>
              </div>
              <p>{offerData.reviews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

