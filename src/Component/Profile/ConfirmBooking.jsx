import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import './confirmBooking.css'
// useRef

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
  }
};

export const ConfirmBooking = ({ toast }) => {
  const [bookingDetails, setBookingDetails] = useState(null);

  const ref = useRef();
  // ref = null ; 
  const closeClick = () => {
    ref.current.click();
  }


  const fetchBookingDetails = useCallback(async () => {
    const id = localStorage.getItem("userId")
    console.log(id, "myId")
    try {
      const response = await axios.get(`https://hotel-backend-tge7.onrender.com/bookingsConfirm/${id}`)
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
          {
            bookingDetails.map((bookingDetails) => {
              return (<>
                <div className="card" style={{ display: "inline-block", width: "22rem", marginLeft: "-10px", marginBottom: "12px", marginRight: "30px" }}>
                <h5><strong>Booking ID</strong></h5>
                
                <h5 style={{fontWeight : "lighter"}}>{bookingDetails.bookingId}</h5>
                <hr />
                <h6>{bookingDetails.hotelName}</h6><br />
                <h6>Hotel Destination</h6>
                <h6 style={{fontWeight : "lighter"}}>{bookingDetails.destination}</h6><br />
                <h6 style={{fontSize : "15px"}}>Landmark</h6>
                  <img src={`${bookingDetails.images}`} className="card-img-top" alt="..." style={styles.imgConfig} />
                 <hr />
                 <br />

                 <div className="first" style={{display : "flex" , width : "full" , justifyContent : "space-between"}}>
                  <div className="bookingdate">
                      <h6 style={{color : "grey"}}>Booking Date</h6>
                      <h6 style={{color : "black" , fontSize : "15px" }}>{bookingDetails.createdAt.substring(0, 10)}</h6>
                  </div>
                  <div className="bookingtime">
                      <h6 style={{color : "grey"}}>Booking Time</h6>
                      <h6 style={{fontSize : "15px" }}>{bookingDetails.createdAt.substring(11, 19)}</h6>
                  </div>
                 </div>
                 <div className="first" style={{display : "flex" , width : "full" , justifyContent : "space-between"}}>
                  <div className="bookingdate">
                      <h6 style={{color : "grey"}}>Check-In-Time</h6>
                      <h6 style={{color : "black" , fontSize : "15px" }}>{bookingDetails.checkInTime}</h6>
                  </div>
                  
                 </div>
                 <div className="bookingtime">
                      <h6 style={{color : "grey"}}>Check-Out-Time</h6>
                      <h6 style={{fontSize : "15px" }}>{bookingDetails.checkOutTime}</h6>
                  </div>

                  <div className="first" style={{display : "flex" , width : "full" , justifyContent : "space-between"}}>
                  <div className="bookingdate">
                      <h6 style={{color : "grey"}}>Status</h6>
                      <h6 style={{color : "black" , fontSize : "15px" }}>{bookingDetails.bookingStatus}</h6>
                  </div>
                  
                  </div>
                  <div className="bookingtime">
                      <h6 style={{color : "grey"}}>Guests</h6>
                      <h6 style={{fontSize : "15px" }}>{bookingDetails.guests}</h6>
                  </div>
                  
                  

                
                  <center>
                    <button type="button" className="btn btn-primary" style={{ fontSize: "14px", padding: "5px 5px" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                      View Details
                    </button></center>

                  {/* <!-- Modal --> */}
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Booking Details</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">  
                          
                          <img src={`${bookingDetails.images}`} className="card-img-top" alt="..." style={styles.imgConfig} />
                          <table className="mytable">
                            <tr>
                              <td><strong>Booking ID</strong></td>
                              <td>{bookingDetails.bookingId}</td>
                            </tr>
                            <tr >
                              <td><strong>Hotel</strong></td>
                              <td>{bookingDetails.hotelName}</td>
                            </tr>
                            <tr>
                              <td><strong>Booking Date</strong></td>
                              <td>{bookingDetails.createdAt.substring(0, 10)}</td>
                            </tr>
                            <tr >
                              <td><strong>Booking Time</strong></td>
                              <td>{bookingDetails.createdAt.substring(11, 19)}</td>
                            </tr>
                            <tr >
                              <td><strong>Destination Name</strong></td>
                              <td>{bookingDetails.destination}</td>
                            </tr>
                            <tr >
                              <td><strong>Check-In Date</strong></td>
                              <td>{bookingDetails.checkInDate ? bookingDetails.checkInDate.substring(0, 10) : ""}</td>
                            </tr>
                            <tr >
                              <td><strong>Check-Out Date</strong></td>
                              <td>{bookingDetails.checkOutDate ? bookingDetails.checkOutDate.substring(0, 10) : ""}</td>
                            </tr>
                            <tr >
                              <td><strong>Status</strong></td>
                              <td>{bookingDetails.bookingStatus}</td>
                            </tr>

                            <tr >
                              <td><strong>Guests</strong></td>
                              <td>{bookingDetails.guests}</td>
                            </tr>

                            {/* inko pop up me dikhana hai */}
                            <tr >
                              <td><strong>Food Items</strong></td>
                              <td>{bookingDetails.foodItems.length && bookingDetails.foodItems.map((e) => { return (<><ul><li>{e.name}</li></ul></>) })}</td>
                            </tr>

                            <tr>
                              <td><strong>Check-In Time</strong></td>
                              <td>{bookingDetails.checkInTime}</td>
                            </tr>
                            <tr>
                              <td><strong>Check-Out Time</strong></td>
                              <td>{bookingDetails.checkOutTime}</td>
                            </tr>
                            <tr >
                              <td><strong>Price</strong></td>
                              <td>{bookingDetails.price}</td>
                            </tr>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                          {/* <button type="button"  className="btn btn-primary" onClick={closeClick}>OK</button> */}
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </>)
            })
          }

          {/* <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.cell}>Sr</th>
                  <th style={styles.cell}>Image</th>
                  <th style={styles.cell}>Hotel Name</th>
                  <th style={styles.cell}>Booking ID</th>
                  <th style={styles.cell}>Destination</th>
                  <th style={styles.cell}>Check In</th>
                  <th style={styles.cell}>Check Out</th>
                  <th style={styles.cell}>Price</th>
                  <th style={styles.cell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails
                  .filter((booking) => booking.bookingStatus === "success")
                  .map((booking,index) => (
                    <tr key={booking.bookingId}>
                      <td>{index +1}</td>
                      <td style={styles.cell}>
              <div style={styles.circularImage}>
                <img
                  className="hotelimage"
                  src={booking.hotelimage}
                  alt="Hotel"
                  style={styles.circularImageImg}
                />
              </div>
            </td>
                      <td style={styles.cell}>{booking.hotel.hotelName}</td>
                      <td style={styles.cell}>{booking.bookingId}</td>
                      <td style={styles.cell}>
                        {booking.destination ? booking.destination : "No data"}
                      </td>
                      <td style={styles.cell}>{formatDate(booking.checkInDate)}</td>
                      <td style={styles.cell}>{formatDate(booking.checkOutDate)}</td>
                      <td style={styles.cell}>{booking.price}</td>
                      <td style={{ ...styles.cell, color: "green" }}>
                        {booking.bookingStatus}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>; */}
        </>
      ) : (
        <p>No Data Found...</p>
      )}
    </>
  );
}