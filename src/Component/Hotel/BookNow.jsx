/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, getCurrentDate } from "../../utils/_dateFuntions";
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
import { MdCurrencyRupee } from "react-icons/md";
import { FaStar, FaTelegramPlane } from "react-icons/fa";
import "./Booknow.css";
import CheckOut from "../Payment/CheckOut";
import { convertDate } from "../../utils/convertDate";
import Avatar from "react-avatar";
import BookingDetails from "./BookingDetails";
import Ratingrange from "./Ratingrange";
import { Rating } from "react-simple-star-rating";

export default function BookNow({ userData, toast }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 6;

  const [bookingDetails, setBookingDetails] = useState({});
  const [hotelID, setHotelID] = useState("");
  const [hotelOwnerName, setHotelOwnerName] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelMoreOpt, setHotelMoreOpt] = useState([]);
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState(1);

  const [foodPrice, setFoodPrice] = useState(0);
  const [foodCounts, setFoodCounts] = useState({});
  const [indexedButton, setIndexedButton] = useState(null);
  const [revCount, setRevCount] = useState(null);

  const [localid, setLocalid] = useState("");
  const [writeReview, setWriteReview] = useState(false);
  const [myReview, setMyReview] = useState("");
  const [myrating, setMyRating] = useState(0);
  const [hotelReviews, setHotelReviews] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedRoomBtn, setSelectedRoomBtn] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomType, setRoomType] = useState("");
  const [bedtype, setBedtype] = useState("");

  const [isUpdatingReview, setIsUpdatingReview] = useState(false);

  const [reviewId, setReviewId] = useState("");

  const [updatedReview, setUpdatedReview] = useState("");
  const [fieldFocus, setFieldFocus] = useState("");

  const sliderRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const params = useParams();
  const [expand, setExpand] = useState(false);

  const [addingFood, setAddingFood] = useState(false);
  const [foodIdArr, setFoodIdArr] = useState([]);

  const [positionTop, setpositionTop] = useState(0);

  const bookingRef = useRef(null);
  const selectRoomRef = useRef(null);
  const bookingDetailsEndRef = useRef(0);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.scrollY);
    });
    if (scrollPosition >= bookingDetailsEndRef.current.offsetTop) {
      setpositionTop(bookingDetailsEndRef.current.offsetTop - scrollPosition);
    } else setpositionTop(0);
  }, [scrollPosition]);

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

  const changeScrollPos = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

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
        console.log(data?.foodItems, "144");
        setBookingDetails(data);
        setHotelID(data._id);
        setHotelImages(data.images);
        setHotelAmenities(data.amenities);
        setHotelMoreOpt(data.moreOptions);
        setLocalid(data.localId);
        setRoomPrice(data?.roomDetails[0].price);
        setRoomType(data?.roomDetails[0].type)
        setBedtype(data?.roomDetails[0].bedTypes);
        setHotelOwnerName(data?.hotelOwnerName);
        setMeals(data?.foodItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params, bookingDetails.startDate, bookingDetails.endDate, hotelID]);
  console.log(meals);
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
        setRevCount(data?.countRating);
        console.log(data?.reviews[0].review, "JTRSLUYFI:UG");
      });
  }, [hotelID]);

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
    slidesToShow: 2,
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
          rating: myrating,
        }),
      }
    ).then((response) => {
      try {
        if (response?.status === 201) {
          const data = response.json();
          console.log(data);

          setMyReview("");
          setMyRating(0);
          setWriteReview(false);
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
          rating: myrating,
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
  console.log(
    bookingDetails,
    "Bookigggggggggggggggggggggggggggggggggggggggggggg"
  );
  const firstImageURL = bookingDetails.images?.[0];
  console.log(firstImageURL, "gggggggggggggggggggggggg");

  const removeFoodHandler = (fId, price) => {
    if (foodCounts[fId] > 1) {
      // If there are more than one of the item, decrease the count
      setFoodCounts((prevFoodCounts) => ({
        ...prevFoodCounts,
        [fId]: prevFoodCounts[fId] - 1,
      }));
    } else {
      // If there's only one item, remove it from the counts
      const { [fId]: _, ...restCounts } = foodCounts;
      setFoodCounts(restCounts);
    }

    // Remove the food item from the foodIdArr
    setFoodIdArr(foodIdArr.filter((item) => item._id !== fId));

    // Update the total price by subtracting the item's price
    setFoodPrice(foodPrice - price);
  };

  const foodPriceHandler = (index, fprice, fId) => {
    // Check if the food item is already in the foodCounts state
    if (foodCounts[fId]) {
      // If it exists, increment the count
      setFoodCounts((prevFoodCounts) => ({
        ...prevFoodCounts,
        [fId]: prevFoodCounts[fId] + 1,
      }));
    } else {
      // If it doesn't exist, set the count to 1
      setFoodCounts((prevFoodCounts) => ({
        ...prevFoodCounts,
        [fId]: 1,
      }));
    }

    // Add the food item to the foodIdArr state
    setFoodIdArr([...foodIdArr, { _id: fId }]);

    // You can use the same code as before for the loading spinner
    setAddingFood(true);
    setIndexedButton(index);
    setTimeout(() => {
      setAddingFood(false);
    }, 1000);

    // Update the total price
    setFoodPrice(foodPrice + fprice);
  };

  const handleRating = (rate) => {
    setMyRating(rate);
  };

  const selectRoomHandler = (index, rprice, bedtype,roomType) => {
    setSelectedRoomBtn(index);
    setRoomPrice(rprice);
    setRoomType(roomType)
    setBedtype(bedtype);
  };

  const showPopup = () => {
    alert("Contact Hotel");
  };

  useEffect(() => {
    if (selectedRooms > selectedGuests && selectedRooms <= 4) {
      setSelectedGuests(selectedGuests + (selectedRooms - selectedGuests));
    }
    if (selectedRooms * 3 < selectedGuests && selectedRooms <= 4) {
      setSelectedGuests(selectedRooms * 3);
    }
    // if (selectedGuests % 3 !== 0 && selectedRooms < 4) {
    //   setSelectedRooms(selectedRooms + 1);
    // }
  }, [selectedGuests, selectedRooms]);

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
                    style={{ height: "600px" }}
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
                  <h2 className="hotel-name1">{bookingDetails.hotelName}</h2>

                  <p className="location-booknow">
                    {bookingDetails.destination}
                  </p>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="rating0">
                    <div className="staricon">
                      {bookingDetails.rating}
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
                {bookingDetails.roomDetails &&
                bookingDetails.roomDetails.length > 0 ? (
                  <>
                    <FontAwesomeIcon icon={faInr} className="indianrupee" />
                    {bookingDetails.roomDetails[0].price}
                  </>
                ) : (
                  <span>No pricing information available</span>
                )}
              </div>

              <div className="hotel-descrip">
                <p className={`description1 ${expand ? "expanded" : ""}`}>
                  Description:
                </p>{" "}
                <p
                  className={`description-content ${expand ? "expanded" : ""}`}
                >
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
                          <FontAwesomeIcon
                            icon={icon}
                            className="amenity-icon"
                          />
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
                  {hotelMoreOpt &&
                    hotelMoreOpt !== ([] || undefined) &&
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
                      }
                      return (
                        <p
                          key={index}
                          style={{
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
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
                          <input type="text" value="11 AM" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="hotel-policy"> {bookingDetails.hotelsPolicy}</p>
              </div>

              {/* <div className="bookcardmain">
                <div className="booking-card">
                  <h2 className="booking-card-title">Check in</h2>
                  <div className="booking-card-content">
                    <p>
                      <span className="booking-label"></span>{" "}
                      <span className="booking-date">
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          min={getCurrentDate()}
                        />
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
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          min={checkInDate}
                          disabled={!checkInDate}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div> */}

              {meals && meals.length > 0 ? (
                <div className="cust-detail">Enjoy meals during your stay:</div>
              ) : null}

              {meals.map((m, i) => (
                <div
                  className="card"
                  style={{
                    width: "75%",
                    minWidth: "480px",
                    background: "#fff",
                  }}
                  key={m._id}
                >
                  <div className="d-flex align-items-center">
                    <div className="card-detail-info flex-fill">
                      <p>Item Name : {m.name}</p>
                      <p>Item Description : {m.about}</p>
                    </div>
                    <div className="card-detail-img">
    {m.images[0] ? (
        <img src={m.images[0]} alt="..." />
    ) : (
        <img src="https://www.adityabirlacapital.com/healthinsurance/active-together/wp-content/uploads/2018/10/Unhealthy-Food-Chart.jpg" alt="Default Image" />
    )}
</div>

                  </div>
                  <div className="downhead">
                    <p className="price-total">
                      <MdCurrencyRupee className="r-sign" />
                      {m.price}
                    </p>
                    <button
                      type="button"
                      className="mt-4 select-btn"
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
                        <>
                          <span
                            onClick={() => removeFoodHandler(m._id, m.price)}
                          >
                            +
                          </span>
                          {foodCounts[m._id] ? `(${foodCounts[m._id]})` : "Add"}
                        </>
                      )}
                    </button>
                    {foodCounts[m._id] && (
                      <button
                        type="button"
                        className="mt-4 select-btn"
                        onClick={() => removeFoodHandler(m._id, m.price)}
                      >
                        <span>-</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div ref={bookingDetailsEndRef} />

              <div className="cust-detail" ref={bookingRef}>
                Booking Details:
              </div>
              <div
                className="card"
                style={{
                  width: "75%",
                  minWidth: "480px",
                  background: "#fff",
                }}
              >
                <p className="roomtype">
                  <FontAwesomeIcon icon={faHotel} className="icon" />
                  Room Type: {bookingDetails.type}
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
                      selectedRooms === 4
                        ? showPopup()
                        : setSelectedRooms(Math.min(selectedRooms + 1, 4))
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
                {bookingDetails.disclaimer && (
                  <>
                    <p>{bookingDetails.disclaimer}</p>
                    {bookingDetails.contact && (
                      <p>Hotel Contact: {bookingDetails.contact}</p>
                    )}
                  </>
                )}

                <p className="id">
                  <FontAwesomeIcon icon={faIdCard} className="icon" />
                  LocalID: {bookingDetails.availability}
                </p>
              </div>

              <div className="cust-detail" ref={selectRoomRef}>
                Choose your room:
              </div>

              {bookingDetails &&
                bookingDetails?.roomDetails &&
                bookingDetails?.roomDetails.map((item, index) => (
                  <div
                    className="card"
                    style={{
                      width: "75%",
                      minWidth: "480px",
                      background: "#fff",
                      margin: "20px 0",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="card-detail-info flex-fill">
                        <p>Room Type : {item?.type}</p>
                        <p>Bed Type : {item?.bedTypes}</p>
                      </div>
                      <div className="card-detail-img">
                        <img
                          src={
                            item.images.length > 0
                              ? item.images[0]
                              : hotelImages[0]
                          }
                          alt="hotelImage"
                        />
                      </div>
                    </div>
                    <div className="downhead">
                      <p className="price-total">
                        <MdCurrencyRupee className="r-sign" />
                        {item?.price}
                      </p>
                      <button
                        className="select-btn mt-4"
                        onClick={() =>
                          selectRoomHandler(index, item?.price, item?.type, item?.bedTypes)
                        }
                      >
                        {index === selectedRoomBtn ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                ))}
              {writeReview !== true && (
                <>
                  <h6
                    className="writeReview"
                    onClick={() => setWriteReview(true)}
                  >
                    Write a Review ...
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
                    {/* <Ratings setMyRating={setMyRating} /> */}
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
              </div>
            </div>
            <div className="bookingDetailsticky">
              <BookingDetails
                hotelOwnerName={hotelOwnerName}
                hotelName={bookingDetails.hotelName}
                foodPrice={foodPrice}
                hotelID={hotelID}
                userId={userId}
                currency="INR"
                userData={userData}
                selectedRooms={selectedRooms}
                selectedGuests={selectedGuests}
                hotelimage={firstImageURL}
                destination={bookingDetails.destination}
                foodIdArr={foodIdArr}
                setFoodIdArr={setFoodIdArr}
                roomPrice={roomPrice}
                roomType={roomType}
                bedtype={bedtype}
                isOffer={bookingDetails?.isOffer}
                offerDetails={bookingDetails?.offerDetails}
                offerPriceLess={bookingDetails?.offerPriceLess}
                toast={toast}
                changeScrollPos={changeScrollPos}
                bookingRef={bookingRef}
                selectRoomRef={selectRoomRef}
                positionTop={positionTop}
                meals={meals}
              />
            </div>
          </div>
          {totalItems > itemsPerPage ? (
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
          ) : null}
        </div>
      </div>
    </>
  );
}
