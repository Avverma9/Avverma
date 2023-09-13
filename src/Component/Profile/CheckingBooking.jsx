/* eslint-disable no-unreachable */
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import './confirmBooking.css'

export const CheckingBooking = () => {
  const [bookingId, setBookingId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isEditingCheckIn, setIsEditingCheckIn] = useState(false);
  const [isEditingCheckOut, setIsEditingCheckOut] = useState(false);
  const [checkedInBooking, setcheckedInBooking] = useState(null);


  const fetchBookingDetails = useCallback(async () => {
    const id = localStorage.getItem("userId")
    console.log(id, "myId")
    try {
      const response = await axios.get(`https://hotel-backend-tge7.onrender.com/booking/getCheckedIn`)
      // console.log(response.data);
      // console.log("hello")
      const bookings = response.data;

      // console.log(bookings, "backend data");
      setcheckedInBooking(bookings);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching booking details");
    }
  }, [setcheckedInBooking, toast]);

  useEffect(() => {
    fetchBookingDetails();
  }, []);


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://hotel-backend-tge7.onrender.com/bookingsCheckedIn/${bookingId}`
      );
      // console.log(response.data, "RESPONSE");

      if (response.status === 200) {
        setBookingDetails(response.data.booking);
        setCheckInDate(
          new Date(response.data.booking.checkInDate).toISOString().slice(0, 10)
        );
        setCheckOutDate(
          new Date(response.data.booking.checkOutDate)
            .toISOString()
            .slice(0, 10)
        );
        toast.success("Successfully fetched booking data.");
      } else {
        toast.error("Booking not found.");
      }
    } catch (error) {
      toast.error("Error occurred while fetching booking data.");
    }
  };

  const handleUpdateDates = async () => {
    try {
      const response = await axios.put(
        `https://hotel-backend-tge7.onrender.com/updatebooking/${bookingId}`,
        {
          checkInDate,
          checkOutDate,
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        setBookingDetails(response.data.booking);
        setIsEditingCheckIn(false);
        setIsEditingCheckOut(false);
        toast.success("Booking dates updated successfully.");
      } else {
        toast.error("Failed to update booking dates.");
      }
    } catch (error) {
      toast.error("Error occurred while updating booking dates.");
    }
  };

  return (
    <>
      <div className="_title">
        <h1>CheckedIn Booking</h1>
      </div>
      {(checkedInBooking && checkedInBooking.length > 0) ?
        <>
          {
            checkedInBooking.map((bookingDetails) => {
              return (<>
                <div className="card" style={{ display: "inline-block", width: "22rem", marginLeft : "-10px" , marginBottom: "12px", marginRight: "30px" }}>
                  <img src={`${bookingDetails.images}`} className="card-img-top" alt="..." />
                  <table className="mytable">
                    <tr>
                      <td><strong>Booking ID</strong></td>
                      <td>{bookingDetails.bookingId}</td>
                    </tr>
                    <tr>
                      <td><strong>Booking Date</strong></td>
                      <td>{bookingDetails.createdAt.substring(0, 10)}</td>
                    </tr>
                    <tr>
                      <td><strong>Booking Time</strong></td>
                      <td>{bookingDetails.createdAt.substring(11, 19)}</td>
                    </tr>
                    <tr>
                      <td><strong>Status</strong></td>
                      <td>{bookingDetails.bookingStatus}</td>
                    </tr>
                    <tr>
                      <td><strong>Hotel</strong></td>
                      <td>{bookingDetails.hotelName}</td>
                    </tr>
                    <tr>
                      <td><strong>Destination Name</strong></td>
                      <td>{bookingDetails.destination}</td>
                    </tr>
                    <tr>
                      <td><strong>Guests</strong></td>
                      <td>{bookingDetails.guests}</td>
                    </tr>
                    <tr>
                      <td><strong>Food Items</strong></td>
                      <td>{bookingDetails.foodItems.length && bookingDetails.foodItems.map((e) => { return (<>{e.name},</>) })}</td>
                    </tr>
                    <tr>
                      <td><strong>Check-In Date</strong></td>
                      <td>{bookingDetails.checkInDate ? bookingDetails.checkInDate.substring(0, 10) : ""}</td>
                    </tr>
                    <tr>
                      <td><strong>Check-Out Date</strong></td>
                      <td>{bookingDetails.checkOutDate ? bookingDetails.checkOutDate.substring(0, 10) : ""}</td>
                    </tr>
                    <tr>
                      <td><strong>Check-In Time</strong></td>
                      <td>{bookingDetails.checkInTime}</td>
                    </tr>
                    {/* <tr>
                      <td><strong>Check-Out Time</strong></td>
                      <td>{bookingDetails.checkOutTime}</td>
                    </tr> */}
                    <tr>
                      <td><strong>Price</strong></td>
                      <td>{bookingDetails.price}</td>
                    </tr>
                  </table>
                  <center>
                    <button type="button" class="btn btn-primary" style={{fontSize : "14px" , padding : '5px 10px '}}>View Details</button>
                  </center>
                </div>
              </>)
            })
          }
        </>
        :
        <h6>Fetching Details....</h6>
      }
    </>
  )




  return (
    <>
      <div className="_title">
        <h1>CheckedIn Booking</h1>
      </div>
      {/* 
      <div className="_fields_col">
        <input type="text" onChange={(e) => setBookingId(e.target.value)} />
        <span>Provide the BookingId</span>
      </div>

      <button className="profile_body_button" onClick={handleSearch}>
        Check
      </button> */}

      {bookingDetails && (
        <>
          <div className="_title">
            <h1>Booking Details</h1>
          </div>

          <div className="flex-col items-start text-left">
            <div className="flex-col">
              <div className="_title">
                <h1 className="me-2">Name</h1>
                <p>{bookingDetails.user.name}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Email</h1>
                <p>{bookingDetails.user.email}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Booking ID</h1>
                <p>{bookingDetails.bookingId}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Guest</h1>
                <p>{bookingDetails.guests}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Rooms</h1>
                <p>{bookingDetails.rooms}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Price</h1>
                <p>{bookingDetails.price}</p>
              </div>

              <div className="flex-col items-start text-left">
                {/* Check-In Date */}
                <div className="">
                  <div className="_title">
                    <h1 className="me-2">Booking Start Date</h1>
                    {isEditingCheckIn ? (
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().slice(0, 10)}
                        max={checkOutDate ? checkOutDate : undefined}
                      />
                    ) : (
                      <p>
                        {new Date(
                          bookingDetails.checkInDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      className="editbtn"
                      onClick={() => setIsEditingCheckIn(!isEditingCheckIn)}
                    >
                      {isEditingCheckIn ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>

                {/* Check-Out Date */}
                <div className="flex-row">
                  <div className="_title">
                    <h1 className="me-2">Booking End Date</h1>
                    {isEditingCheckOut ? (
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={
                          checkInDate
                            ? checkInDate
                            : new Date().toISOString().slice(0, 10)
                        }
                      />
                    ) : (
                      <p>
                        {new Date(
                          bookingDetails.checkOutDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      className="editbtn"
                      onClick={() => setIsEditingCheckOut(!isEditingCheckOut)}
                    >
                      {isEditingCheckOut ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>

                {isEditingCheckIn || isEditingCheckOut ? (
                  <button className="savebtn" onClick={handleUpdateDates}>
                    Save Dates
                  </button>
                ) : null}
              </div>

              <div className="_title">
                <h1 className="me-2">Booking Status</h1>
                <p>{bookingDetails.bookingStatus}</p>
              </div>
            </div>
          </div>



        </>
      )}
    </>
  );
};