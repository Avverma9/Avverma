import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
export const Customizebooking = () => {
  const [meals, setMeals] = useState([]);
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
        console.log(data);
        setMeals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(meals);
  return (
    <>
      <div className="_customize-booking-header">
        <AiOutlineLeft />
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
                      <small className="text-body-secondary">{m.price}</small>
                    </p>
                    <Link to="" className="btn btn-primary">
                      Add
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="booking-details-preview"
          style={{ backgroundColor: "green", width: "40%" }}
        >
          preview
        </div>
      </div>
    </>
  );
};
