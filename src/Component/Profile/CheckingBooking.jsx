import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const CheckingBooking = () => {
  const [bookingId, setBookingId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isEditingCheckIn, setIsEditingCheckIn] = useState(false);
  const [isEditingCheckOut, setIsEditingCheckOut] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://hotel-backend-tge7.onrender.com/getbooking/${bookingId}`
      );
      console.log(response.data, "RESPONSE");

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
<<<<<<< HEAD
        `http://localhost:5000/updatebooking/${bookingId}`,
=======
        `https://hotel-backend-tge7.onrender.com/updatebooking/${bookingId}`,
>>>>>>> origin/Abdul-frontend
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
<<<<<<< HEAD
                        max={checkOutDate ? checkOutDate : undefined} // Set the max attribute to the selected checkout date
=======
                        max={checkOutDate ? checkOutDate : undefined} 
>>>>>>> origin/Abdul-frontend
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
