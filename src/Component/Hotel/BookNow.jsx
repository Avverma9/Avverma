/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
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
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
import "./Booknow.css";
import CheckOut from "../Payment/CheckOut";
import { convertDate, getCurrentDate } from "../../utils/convertDate";
import Avatar from "react-avatar";

export default function BookNow({ refresh, reset, userData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 6;

  const [bookingDetails, setBookingDetails] = useState({});
  const [hotelID, setHotelID] = useState("");
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelMoreOpt, setHotelMoreOpt] = useState([]);
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState(1);


  const [localid, setLocalid] = useState("");
  const [myReview, setMyReview] = useState("");
  const [hotelReviews, setHotelReviews] = useState([]);

  const [isUpdatingReview, setIsUpdatingReview] = useState(false);

  const [reviewId, setReviewId] = useState("");

  const [updatedReview, setUpdatedReview] = useState("");
  const [fieldFocus, setFieldFocus] = useState("");

  const sliderRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const params = useParams();
  const [expand, setExpand] = useState(false);

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
    window.scrollTo(0, 0);
  }, []);

  const handleRoomChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 1 : Math.min(Math.max(value, 1), 4);
    setSelectedRooms(value);
  };


  useEffect(() => {
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
        setLocalid(data.localId);
        // setCheckIn(convertDate(bookingDetails.startDate));
        // setCheckOut(convertDate(bookingDetails.endDate));
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
  }, [hotelID, reset]);

  // Pagination for Reviews

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

  useEffect(() => {
    const interval = setInterval(() => {
      slideToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  console.log(bookingDetails);

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
  console.log(bookingDetails, "Bookigggggggggggggggggggggggggggggggggggggggggggg")
  const firstImageURL = bookingDetails.images?.[0];
  console.log(firstImageURL, "gggggggggggggggggggggggg")


  return (
    <>
      <div className="container-p-4">
        <div className="flex">
          <div className="w-1/3 slider-container book_now">
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
            <div className="hotel-descrip">
              <p className={`description1 ${expand ? "expanded" : ""}`}>
                Description:
              </p>{" "}
              <p className={`description-content ${expand ? "expanded" : ""}`}>
                {bookingDetails.description &&
                  truncateText(bookingDetails.description, 100)}
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
                    <span className="booking-date">
                      <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={getCurrentDate()} />
                    </span>
                  </p>
                </div>
              </div>

              <div className="booking-card">
                <h2 className="booking-card-title">Check out</h2>
                <div className="booking-card-content">
                  <p>
                    <span className="booking-label"></span>{" "}
                    <span className="booking-date">
                      <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="cust-detail">Customer Details:</div>
            <div className="card">
              <p className="id">
                <FontAwesomeIcon icon={faIdCard} className="icon" />
                LocalID: {bookingDetails.availability}
              </p>
              <div className="noofroom input-container">
                <FontAwesomeIcon icon={faRestroom} className="icon" />
                Rooms:
                <button className="negposbtn" onClick={() => setSelectedRooms(Math.max(selectedRooms - 1, 1))}>
                  -
                </button>
                <input className="inputbutton" type="number" value={selectedRooms} onChange={handleRoomChange} min="1" max="4" />
                <button className="negposbtn" onClick={() => setSelectedRooms(Math.min(selectedRooms + 1, 4))}>
                  +
                </button>
              </div>

              <div className="noofguest input-container">
                <FontAwesomeIcon icon={faPerson} className="icon" />
                Guests :
                <button className="negposbtn" onClick={() => setSelectedGuests(Math.max(selectedGuests - 1, 1))}>
                  -
                </button>
                <input className="inputbutton" type="number" value={selectedGuests} onChange={(e) => setSelectedGuests(e.target.value)} min="1" />
                <button className="negposbtn" onClick={() => setSelectedGuests(selectedGuests + 1)}>
                  +
                </button>
              </div>
              {bookingDetails.disclaimer && (
                <>
                  <p>{bookingDetails.disclaimer}</p>
                  {bookingDetails.contact && (
                    <p>Hotel Contact: {bookingDetails.contact}</p>
                  )}
                </>
              )}
              <p className="roomtype">
                <FontAwesomeIcon icon={faHotel} className="icon" />
                Room Type: {bookingDetails.roomtype}
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
                    className={`_pagination-button ${page === currentPage ? "_pagination-active" : ""
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
              hotelId={bookingDetails._id}
              userId={userId}
              amount={Number(bookingDetails.price)}
              currency="INR"
              userData={userData}
              checkIn={checkInDate}
              checkOut={checkOutDate}
              guests={selectedGuests}
              rooms={selectedRooms}
              hotelName={bookingDetails.hotelName}
              hotelimage={firstImageURL}
              destination={bookingDetails.destination}
              paymentMethod={bookingDetails.paymentMethod}
            />
          </div>
        </div>
      </div>
    </>
  );
}
