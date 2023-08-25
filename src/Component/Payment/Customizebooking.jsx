import axios from "axios";
import React, { useEffect, useState } from "react";
import Plusminus from "../Payment/Plusminus";
import "./Plusminus.css";
import { FaStar, FaRupeeSign } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
export const Customizebooking = ({
  rating,
  hoteldescription,
  hotelId,
  userId,
  amount,
  currency,
  userData,
  checkIn,
  checkOut,
  guests,
  rooms,
  hotelName,
  hotelimage,
  destination,
}) => {
  const [meals, setMeals] = useState([]);
  const [mealQty, setMealQty] = useState(0);
  console.log(mealQty);
  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/get/latest/food`)
      .then((response) => {
        console.log(response, "RESPONSE");
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        setMeals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(meals);

  const handlePayment = async () => {
    const data = {
      hotelId: hotelId,
      userId: userId,
      amount: amount,
      currency: currency,
    };
    try {
      const response = await axios.post(
        "https://hotel-backend-tge7.onrender.com/payments",
        data
      );
      console.log(response);
      //  handleOpenRazorpay(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const addFoodItemsHandler = async ({name,price}) => {
  //   const data = {
  //     name: name,
  //     price: price,
  //     quantity:1,
  //   };
  //   try {
  //     const response = await axios.post(
  //       `https://hotel-backend-tge7.onrender.com/booking/${userId}/${hotelId}`,
  //       data
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const addFoodItemsHandler = async ({ name, price }) => {
    const data = {
      name: name,
      price: price,
      quantity: 1,
    };
    try {
      const response = await fetch(
        `https://hotel-backend-tge7.onrender.com/booking/${userId}/${hotelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="modal modal-xl fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Enjoy meals during your stay
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <>
              {/* <div className="_customize-booking-header">
                <h4>Modify Your Booking</h4>
              </div> */}
              <div className="d-flex">
                <div className="meals-container" style={{ width: "60%" }}>
                  {meals.map((m) => (
                    <div className="card w-75 mb-3" key={m._id}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={m.images[0]}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{m.name}</h5>
                            <p className="card-text">{m.description}</p>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                {m.price}
                              </small>
                            </p>
                            <div className="btn-flex">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  addFoodItemsHandler({
                                    name: m.name,
                                    price: m.price,
                                  })
                                }
                              >
                                Add
                              </button>
                              <Plusminus setMealQty={setMealQty} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="booking-details-preview"
                  style={{ width: "40%" }}
                >
                  <div className="hotelname">
                    <h4>{hotelName}</h4>
                  </div>
                  <img src={hotelimage} alt="hotelimage" />
                  <div className="name-rating-flex">
                    <p className="destination">
                      <span>
                        <GoLocation />
                      </span>
                      {destination}
                    </p>
                    <p className="rating12">
                      {rating}
                      <FaStar />
                    </p>
                  </div>
                  <p className="rate">
                    <span>
                      <FaRupeeSign />
                    </span>
                    {amount}
                  </p>
                  <div className="detail-head">
                    <h6>Description</h6>
                    <p className="detail-hotel">{hoteldescription}</p>
                  </div>
                  <div className="checkinout">
                    <p>{checkIn}</p>
                    <p>{checkOut}</p>
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePayment}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
