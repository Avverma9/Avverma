import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./ConfirmBooking.module.css";

const styles = {
  tableContainer: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  cell: {
    padding: "10px",
    border: "1px solid #ccc",
  },
  circularImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  circularImageImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imgConfig: {
    height: "100px",
    width: "150px",
    // marginLeft: "8px"
    // margin : "auto"
  },
};

export const ConfirmBooking = ({ toast }) => {
  const [bookingDetails, setBookingDetails] = useState(null);

  const fetchBookingDetails = useCallback(async () => {
    const id = localStorage.getItem("userId");
    console.log(id, "myId");
    try {
      const response = await axios.get(
        `https://hotel-backend-tge7.onrender.com/bookingsConfirm/${id}`
      );
      const bookings = response.data;
      console.log(bookings, "backend data");
      setBookingDetails(bookings);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching booking details");
    }
  }, [setBookingDetails, toast]);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="_title">
        <h1>Confirmed Booking</h1>
      </div>

      <div className="sub_Title">
        We are pleased to inform you that your booking has been confirmed.
      </div>

      <div className="_title">
        <h1>Booking Details</h1>
      </div>

      {bookingDetails && bookingDetails.length > 0 ? (
        <>
          {bookingDetails.map((bookingDetails) => {
            return (
              <>
                <div
                  className="card"
                  style={{
                    display: "inline-block",
                    width: "22rem",
                    marginLeft: "-10px",
                    marginBottom: "12px",
                    marginRight: "30px",
                  }}
                >
                  <h5>
                    <strong>Booking ID</strong>
                  </h5>

                  <h5 style={{ fontWeight: "lighter" }}>
                    {bookingDetails.bookingId}
                  </h5>
                  <hr />
                  <h6>{bookingDetails.hotelName}</h6>
                  <br />
                  <h6>Hotel Destination</h6>
                  <h6 style={{ fontWeight: "lighter" }}>
                    {bookingDetails.destination}
                  </h6>
                  <br />
                  <h6 style={{ fontSize: "15px" }}>Landmark</h6>
                  <img
                    src={`${bookingDetails.images}`}
                    className="card-img-top"
                    alt="..."
                    style={styles.imgConfig}
                  />
                  <hr />
                  <br />

                  <div
                    className="first"
                    style={{
                      display: "flex",
                      width: "full",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="bookingdate"
                      style={{
                        borderLeft: "2px solid grey",
                        borderRadius: "12px",
                        paddingLeft: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <h6 style={{ color: "grey" }}>Booking Date</h6>
                      <h6 style={{ color: "black", fontSize: "15px" }}>
                        {bookingDetails.createdAt.substring(0, 10)}
                      </h6>
                    </div>
                    <div
                      className="bookingtime"
                      style={{
                        borderLeft: "2px solid grey",
                        borderRadius: "12px",
                        paddingLeft: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <h6 style={{ color: "grey" }}>Booking Time</h6>
                      <h6 style={{ fontSize: "15px" }}>
                        {bookingDetails.createdAt.substring(11, 19)}
                      </h6>
                    </div>
                  </div>
                  <div
                    className="first"
                    style={{
                      display: "flex",
                      width: "full",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="bookingdate"
                      style={{
                        borderLeft: "2px solid grey",
                        borderRadius: "12px",
                        paddingLeft: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <h6 style={{ color: "grey" }}>Check-In-Time</h6>
                      <h6 style={{ color: "black", fontSize: "15px" }}>
                        {bookingDetails.checkInTime}
                      </h6>
                    </div>
                  </div>
                  <div
                    className="bookingtime"
                    style={{
                      borderLeft: "2px solid grey",
                      borderRadius: "12px",
                      paddingLeft: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <h6 style={{ color: "grey" }}>Check-Out-Time</h6>
                    <h6 style={{ fontSize: "15px" }}>
                      {bookingDetails.checkOutTime}
                    </h6>
                  </div>

                  <div
                    className="first"
                    style={{
                      display: "flex",
                      width: "full",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="bookingdate"
                      style={{
                        borderLeft: "2px solid grey",
                        borderRadius: "12px",
                        paddingLeft: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <h6 style={{ color: "grey" }}>Status</h6>
                      <h6 style={{ color: "black", fontSize: "15px" }}>
                        {bookingDetails.bookingStatus}
                      </h6>
                    </div>
                  </div>
                  <div
                    className="bookingtime"
                    style={{
                      borderLeft: "2px solid grey",
                      borderRadius: "12px",
                      paddingLeft: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <h6 style={{ color: "grey" }}>Guests</h6>
                    <h6 style={{ fontSize: "15px" }}>
                      {bookingDetails.guests}
                    </h6>
                  </div>

                  <center>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ fontSize: "14px", padding: "5px 5px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      View Details
                    </button>
                  </center>

                  {/* <!-- Modal Starts From Here--> */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Booking Details
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <img
                            src={`${bookingDetails.images}`}
                            className="card-img-top"
                            alt="..."
                            style={styles.imgConfig}
                          />
                          <table className="mytable">
                            <tr>
                              <td>
                                <strong>Booking ID</strong>
                              </td>
                              <td>{bookingDetails.bookingId}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Hotel</strong>
                              </td>
                              <td>{bookingDetails.hotelName}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Booking Date</strong>
                              </td>
                              <td>
                                {bookingDetails.createdAt.substring(0, 10)}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Booking Time</strong>
                              </td>
                              <td>
                                {bookingDetails.createdAt.substring(11, 19)}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Destination Name</strong>
                              </td>
                              <td>{bookingDetails.destination}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Check-In Date</strong>
                              </td>
                              <td>
                                {bookingDetails.checkInDate
                                  ? bookingDetails.checkInDate.substring(0, 10)
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Check-Out Date</strong>
                              </td>
                              <td>
                                {bookingDetails.checkOutDate
                                  ? bookingDetails.checkOutDate.substring(0, 10)
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Status</strong>
                              </td>
                              <td>{bookingDetails.bookingStatus}</td>
                            </tr>

                            <tr>
                              <td>
                                <strong>Guests</strong>
                              </td>
                              <td>{bookingDetails.guests}</td>
                            </tr>

                            <tr>
                              <td>
                                <strong>Food Items</strong>
                              </td>
                              <td>
                                {bookingDetails.foodItems.length &&
                                  bookingDetails.foodItems.map((e) => {
                                    return (
                                      <>
                                        <ul>
                                          <li>{e.name}</li>
                                        </ul>
                                      </>
                                    );
                                  })}
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <strong>Check-In Time</strong>
                              </td>
                              <td>{bookingDetails.checkInTime}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Check-Out Time</strong>
                              </td>
                              <td>{bookingDetails.checkOutTime}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Price</strong>
                              </td>
                              <td>{bookingDetails.price}</td>
                            </tr>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* //Modal Ends Here */}
                </div>
              </>
            );
          })}
        </>
      ) : (
        <p>No Data Found...</p>
      )}
    </>
  );
};
