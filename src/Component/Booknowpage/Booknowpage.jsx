import React, { useEffect, useState, useRef } from "react";
import "./Booknowpage.css";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
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
import { formatDate } from "../../utils/_dateFuntions";
import { FaTelegramPlane } from "react-icons/fa";
import Avatar from "react-avatar";
import { Rating } from "react-simple-star-rating";
import Ratingrange from "../Hotel/Ratingrange";
import { BiEdit, BiTrash } from "react-icons/bi";
import BookingDetails from "../Hotel/BookingDetails";

const BookNowPage = ({ userData, toast }) => {
  const { offerId } = useParams();
  const [offerData, setOfferData] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [hotelMoreOpt, setHotelMoreOpt] = useState([]);
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [expand, setExpand] = useState(false);
  const [offerReviews, setOfferReviews] = useState([]);
  const [myReview, setMyReview] = useState("");
  const userId = localStorage.getItem("userId");
  const [myrating, setMyRating] = useState(0);
  const [isUpdatingReview, setIsUpdatingReview] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [updatedReview, setUpdatedReview] = useState("");
  const [foodPrice, setFoodPrice] = useState(0);
  const [indexedButton, setIndexedButton] = useState(null);
  const [revCount, setRevCount] = useState(null);
  const [meals, setMeals] = useState([]);
  const [selectedRoomBtn, setSelectedRoomBtn] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);
  const [addingFood, setAddingFood] = useState(false);
  const [foodIdArr, setFoodIdArr] = useState([]);

  const [selectedRooms, setSelectedRooms] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 6;

  const [writeReview, setWriteReview] = useState(false);

  // Pagination for Reviews

  const totalItems = offerReviews && offerReviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = offerReviews && offerReviews.slice(startIndex, endIndex);

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

  const sliderRef = useRef(null);

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

  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/getReviews/${offerId}`)
      .then((response) => response.json())
      .then((data) => {
        setOfferReviews(data?.reviews);
        setRevCount(data?.countRating);
      })
      .catch((error) => console.error(error));
  }, [offerId]);

  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/hotels/${offerId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        console.log(data);
        setOfferData(data);
        setHotelImages(data.images);
        setHotelAmenities(data.amenities);
        setHotelMoreOpt(data.moreOptions);
        setMeals(data?.foodItems);
        // setCheckIn(formatDate(data.startDate));
        // setCheckout(formatDate(data.endDate));
        setRoomPrice(data?.roomDetails[0].price);
      })
      .catch((error) => console.error(error));
  }, [offerId]);
  console.log(roomPrice);

  // useEffect(() => {
  //   fetch(`https://hotel-backend-tge7.onrender.com/get/latest/food`)
  //     .then((response) => {
  //       console.log(response, "RESPONSE");
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("Failed to fetch user data");
  //       }
  //     })
  //     .then((data) => {
  //       setMeals(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  if (!offerData) {
    return <div>Loading...</div>;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const expanddescription = () => {
    setExpand(!expand);
  };

  const truncateText = (text, maxLength) => {
    if (!expand && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const postReviewHandler = () => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/reviews/${userId}/${offerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: myReview,
          rating: myrating,
        }),
      }
    ).then((response) => {
      try {
        if (response?.status === 201) {
          const data = response.json();
          console.log(data);
          setMyReview("");
          // window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const updateReviewHandler = () => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/offers/review/put/${offerId}/${userId}/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: updatedReview,
          rating: myrating,
        }),
      }
    ).then((response) => {
      try {
        if (response?.status === 200) {
          const data = response.json();
          console.log(data);
          setIsUpdatingReview(false);
          setReviewId("");
          setUpdatedReview("");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteReviewHandler = (revId) => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/offers/review/delete/${userId}/${offerId}/${revId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      try {
        if (response.status === 200) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleRating = (rate) => {
    setMyRating(rate);
  };

  const toggleUpdateReview = (rev) => {
    setIsUpdatingReview(true);
    setReviewId(rev.review._id);
    setUpdatedReview(rev.review.comment);
  };

  const firstImageURL = offerData?.images?.[0];

  const foodPriceHandler = (index, fprice, fId) => {
    setFoodIdArr([...foodIdArr, { _id: fId }]);
    setAddingFood(true);
    setIndexedButton(index);
    setTimeout(() => {
      setAddingFood(false);
    }, 1000);
    setFoodPrice(foodPrice + fprice);
  };

  const handleRoomChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 1 : Math.min(Math.max(value, 1), 4);
    setSelectedRooms(value);
  };

  const selectRoomHandler = (index, rprice) => {
    setSelectedRoomBtn(index);
    setRoomPrice(rprice);
  };

  return (
    <>
      <div className="container-p-4">
        <div className="flex">
          <div className="w-1/3 slider-container _book_now_page">
            <Slider ref={sliderRef} {...settings}>
              {hotelImages &&
                hotelImages.map((photo, i) => (
                  <div key={i} className="slider-slide">
                    <img
                      src={photo}
                      alt={offerData.hotelName}
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
          <div className="bookingflex">
            <div className="hotel-details1">
              <div className="flex-rating">
                <div className="name-location">
                  <h2 className="hotel-name1">{offerData.hotelName}</h2>

                  <p className="location-booknow">{offerData.destination}</p>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="rating0">
                    <div className="staricon">
                      {offerData.rating}
                      <FontAwesomeIcon icon={faStar} className="staricon" />
                    </div>
                  </div>
                  <div className="reviewCount">
                    <span>{revCount}</span>
                    <p>Reviews</p>
                  </div>
                </div>
              </div>
              <div className="pricing">
                <FontAwesomeIcon icon={faInr} className="indianrupee" />
                {offerData.roomDetails[0].price}
              </div>
              <div className="offer-data">
                <p style={{ fontSize: "20px" }}>Offer:{offerData.offers}</p>
              </div>
              <div className="hotel-descrip">
                <p className={`description1 ${expand ? "expanded" : ""}`}>
                  Description:
                </p>{" "}
                <p
                  className={`description-content ${expand ? "expanded" : ""}`}
                >
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
                  {hotelAmenities &&
                    hotelAmenities.map((option, index) => {
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
                            <FontAwesomeIcon
                              icon={icon}
                              className="amenity-icon"
                            />
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
                  {hotelMoreOpt &&
                    hotelMoreOpt.map((option, index) => {
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
                            <FontAwesomeIcon
                              icon={icon}
                              className="more-icon"
                            />
                          )}
                          {option}
                        </p>
                      );
                    })}
                </div>
              </div>

              <div className="hotel-policies">
                <div className="hotel-policyheading">Hotel Policies:</div>
                <div className="bookcardmain">
                  <div className="booking-card">
                    <h2 className="booking-card-title">Check in</h2>
                    <div className="booking-card-content">
                      <p>
                        <span className="booking-label"></span>{" "}
                        <span className="booking-date">
                          <input type="text" value="12 PM" />
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
                          <input
                            type="text"
                            value="11 AM"
                            onChange={(e) => setCheckout(e.target.value)}
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="hotel-policy"> {offerData.hotelsPolicy}</p>
              </div>

              <div className="_meals-container">
                <h1>Enjoy meals during your stay</h1>
                <div className="d-flex gap-3">
                  {meals.map((m, i) => (
                    <div className="card w-50 h-25 mb-3" key={m._id}>
                      <div className="row-g-0">
                        <div className="img-thali">
                          <img
                            src={m.images[0]}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{m.name}</h5>
                            {/* <p className="card-text">{m.description}</p> */}
                            <p className="card-text">
                              <small className="text-body-secondary">
                                {m.price}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row g-0">
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="btn btn-primary w-100 d-flex mt-4"
                            onClick={() => foodPriceHandler(i, m.price, m._id)}
                            key={i}
                          >
                            {addingFood && indexedButton === i ? (
                              <div
                                className="spinner-border spinner-border-sm text-white"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "Add"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cust-detail">Booking Details:</div>
              <div className="card">
                <p className="roomtype">
                  <FontAwesomeIcon icon={faHotel} className="icon" />
                  Room Type: {offerData.roomtype}
                </p>

                <p className="noofroom">
                  <FontAwesomeIcon icon={faRestroom} className="icon" />
                  Rooms:
                  <button
                    className="negposbtn"
                    onClick={() =>
                      setSelectedRooms(Math.max(selectedRooms - 1, 1))
                    }
                  >
                    -
                  </button>
                  <input
                    className="inputbutton"
                    type="text"
                    inputmode="numeric"
                    value={selectedRooms}
                    onChange={handleRoomChange}
                    min="1"
                    max="4"
                  />
                  <button
                    className="negposbtn"
                    onClick={() =>
                      setSelectedRooms(Math.min(selectedRooms + 1, 4))
                    }
                  >
                    +
                  </button>
                </p>

                <div className="noofguest input-container">
                  <FontAwesomeIcon icon={faPerson} className="icon" />
                  Guests :
                  <button
                    className="negposbtn"
                    onClick={() =>
                      setSelectedGuests(Math.max(selectedGuests - 1, 1))
                    }
                  >
                    -
                  </button>
                  <input
                    className="inputbutton"
                    type="text"
                    inputmode="numeric"
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(e.target.value)}
                    min="1"
                  />
                  <button
                    className="negposbtn"
                    onClick={() => setSelectedGuests(selectedGuests + 1)}
                  >
                    +
                  </button>
                </div>
                {offerData.disclaimer && (
                  <>
                    <p>{offerData.disclaimer}</p>
                    {offerData.contact && (
                      <p>Hotel Contact: {offerData.contact}</p>
                    )}
                  </>
                )}

                <p className="id">
                  <FontAwesomeIcon icon={faIdCard} className="icon" />
                  LocalID: {offerData.availability}
                </p>
              </div>

              <div className="cust-detail">Choose your room:</div>
              {offerData &&
                offerData?.roomDetails &&
                offerData?.roomDetails.map((item, index) => (
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      margin: "15px 0",
                      background: "#fff",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="card-detail-info flex-fill">
                        <p>Room Type : {item?.type}</p>
                        <p>Bed Type : {item?.bedTypes}</p>
                        <p>Price : {item?.price}</p>
                      </div>
                      <div className="card-detail-img">
                        <img src={hotelImages[0]} alt="hotelImage" />
                      </div>
                    </div>
                    <button
                      className="select-btn"
                      onClick={() => selectRoomHandler(index, item?.price)}
                    >
                      {index === selectedRoomBtn ? "Selected" : "Select"}
                    </button>
                  </div>
                ))}

              {writeReview !== true && (
                <>
                  <h6
                    className="writeReview"
                    onClick={() => setWriteReview(true)}
                  >
                    Write a Review
                  </h6>
                </>
              )}

              {writeReview === true && (
                <>
                  <p
                    className="cancelReview"
                    onClick={() => setWriteReview(false)}
                  >
                    Cancel
                  </p>
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
                    <Rating
                      onClick={handleRating}
                      initialValue={myrating}
                      size={22}
                    />
                  </div>
                </>
              )}

              <div className="reviews">
                <div className="reviewhead">
                  <h1>Ratings and reviews</h1>
                  <Ratingrange />

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
                              <>
                                <span>
                                  <Rating
                                    onClick={handleRating}
                                    initialValue={rev.review.rating}
                                    size={22}
                                    // readonly
                                  />
                                </span>
                                <div className="update_review">
                                  <textarea
                                    placeholder="Update Review"
                                    type="text"
                                    rows="2"
                                    value={updatedReview}
                                    onChange={(e) =>
                                      setUpdatedReview(e.target.value)
                                    }
                                  />
                                  <button
                                    className="update_review_button"
                                    onClick={updateReviewHandler}
                                  >
                                    <FaTelegramPlane />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <span>
                                  <Rating
                                    initialValue={rev.review.rating}
                                    size={22}
                                    readonly
                                  />
                                </span>
                                <div className="review_comment">
                                  <p>{rev.review.comment}</p>

                                  <div className="comment_date">
                                    <h6>{formatDate(rev.review.createdAt)}</h6>
                                  </div>
                                </div>
                              </>
                            )}
                            <div style={{ border: "1px solid #94a3b8 " }}></div>
                          </div>
                        </>
                      ))
                    : null}
                </div>

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
            </div>
            <div className="bookingDetailsticky">
              <BookingDetails
                hotelOwnerName={offerData?.hotelOwnerName}
                hotelName={offerData?.hotelName}
                // price={bookingDetails.price}
                foodPrice={foodPrice}
                hotelID={offerData?._id}
                userId={userId}
                currency="INR"
                userData={userData}
                selectedRooms={selectedRooms}
                selectedGuests={selectedGuests}
                setSelectedRooms={setSelectedRooms}
                setSelectedGuests={setSelectedGuests}
                checkIn={checkin}
                checkOut={checkout}
                hotelimage={firstImageURL}
                destination={offerData?.destination}
                foodIdArr={foodIdArr}
                setFoodIdArr={setFoodIdArr}
                roomPrice={offerData?.roomDetails[0].price}
                isOffer={offerData?.isOffer}
                offerDetails={offerData?.offerDetails}
                offerPriceLess={offerData?.offerPriceLess}
                toast={toast}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookNowPage;
