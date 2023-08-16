import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const CheckingBooking = () => {
  const [bookingId, setBookingId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getbooking/${bookingId}`
      );
      console.log(response.data, "RESPONSE");

      if (response.status === 200) {
        setBookingDetails(response.data.booking);
        toast.success("Successfully fetched booking data.");
      } else {
        toast.error("Booking not found.");
      }
    } catch (error) {
      toast.error("Error occurred while fetching booking data.");
    }
  };

  return (
    <>
      <div className="_title">
        <h1>Checking Booking</h1>
      </div>

      <div className="_fields_col">
        <input type="text" onChange={(e) => setBookingId(e.target.value)} />
        <span>Provide the BookingId</span>
      </div>

      <button className="profile_body_button" onClick={handleSearch}>
        Check
      </button>

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
                <h1 className="me-2">Booking Start Date</h1>
                <p>
                  {new Date(bookingDetails.checkInDate).toLocaleDateString()}
                </p>
              </div>

              <div className="_title">
                <h1 className="me-2">Booking End Date</h1>
                <p>
                  {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
                </p>
              </div>

              <div className="_title">
                <h1 className="me-2">Booking Status</h1>
                <p>{bookingDetails.bookingStatus}</p>
              </div>
            </div>

            {/* <div className="_title">
              <h1>Checking Details</h1>
            </div>

            <div className="flex-col items-start text-left">
              <div className="flex-col">
                <div className="_title">
                  <h1 className="me-2">Checked In at</h1>
                  <p>{new Date(bookingDetails.checkInDate.$date).toLocaleTimeString()}</p>
                </div>

                <div className="_title">
                  <h1 className="me-2">Checked Out at</h1>
                  <p>{new Date(bookingDetails.checkOutDate.$date).toLocaleTimeString()}</p>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};
