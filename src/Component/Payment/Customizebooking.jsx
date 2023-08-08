import axios from "axios";
import React, { useEffect, useState } from "react";
export const Customizebooking = ({
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
  const [updatePrice, setUpdatePrice] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    setUpdatePrice(amount);
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
        console.log(data);
        setMeals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUpdatePrice, amount]);
  console.log(meals);

  const handlePayment = async () => {
    const data = {
      hotelId: hotelId,
      userId: userId,
      amount: updatePrice,
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
  const updatepricehandler = ({ price, id }) => {
    setUpdatePrice(updatePrice + price);
  };
  console.log(hotelName);
  console.log(updatePrice);
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
              Modal title
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
              <div className="_customize-booking-header">
                <h4>Modify Your Booking</h4>
              </div>
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
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                updatepricehandler({
                                  price: m.price,
                                  id: m._id,
                                })
                              }
                            >
                              Add
                            </button>
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
                  <h4>{hotelName}</h4>
                  <img src={hotelimage} alt="hotelimage" />
                  <p>{destination}</p>
                  <p>
                    <span>{currency}</span>
                    {updatePrice}
                  </p>
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
