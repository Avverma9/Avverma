import axios from "axios";
import { useCallback, useEffect, useState } from "react";

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
};

export const CheckOutBooking = ({ toast }) => {
  const [bookingDetails, setBookingDetails] = useState(null);


  const fetchBookingDetails = useCallback(async () => {
    const id = localStorage.getItem("userId")
    console.log(id, "myId")
    try {
      const response = await axios.get(`https://hotel-backend-tge7.onrender.com/bookingsCheckedOut/${id}`)
      // console.log("kds" , response)
      // const  bookings  = response.data;
      // console.log(bookings, "backend data");
      setBookingDetails(response.data);
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
          <div style={styles.tableContainer}>
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
          </div>;
        </>
      ) : (
        <p>No Data Found...</p>
      )}
    </>
  );
}


// export const CheckOutBooking = () => {
//   return (
//     <>
//       <div className="_title">
//         <h1>Checkout Booking</h1>
//       </div>

//       {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

//       <div className="_title">
//         <h1>Checking Details</h1>
//       </div>

//       <div className="flex-col items-start text-left">
//         <div className="flex-col">
//           <div className="_title">
//             <h1 className="me-2">Name</h1>
//             <p>Rahul Bose</p>
//           </div>

//           <div className="_title">
//             <h1 className="me-2">Email</h1>
//             <p>boserahul@gmail.com</p>
//           </div>

//           <div className="_title">
//             <h1 className="me-2">Booking ID</h1>
//             <p>654oiuyvgfi5</p>
//           </div>

//           <div className="_title">
//             <h1 className="me-2">Booking Start Date</h1>
//             <p>09-06-23</p>
//           </div>

//           <div className="_title">
//             <h1 className="me-2">Booking End Date</h1>
//             <p>12-06-23</p>
//           </div>
//         </div>

//         <div className="_title">
//           <h1>Checking Details</h1>
//         </div>

//         <div className="flex-col items-start text-left">
//           <div className="flex-col">
//             <div className="_title">
//               <h1 className="me-2">Checked In at</h1>
//               <p>
//                 11:54 pm on <span>09-06-23</span>
//               </p>
//             </div>

//             <div className="_title">
//               <h1 className="me-2">Checked Out at</h1>
//               <p>
//                 8:00 am on <span>12-06-23</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }