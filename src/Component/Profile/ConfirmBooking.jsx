import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "./ConfirmBooking.module.css";
import noImage from "../../assets/noImage.jpg";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
export const ConfirmBooking = ({ toast }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [modalData, setmodalData] = useState([]);
  const [userData, setuserdata] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setmodalData([]);
    setShow(false);
  };
  const handleShow = (value) => {
    setmodalData(value);
    setShow(true);
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    axios
      .get(`https://hotel-backend-tge7.onrender.com/get/${id}`)
      .then((res) => setuserdata(res?.data?.data));
  }, []);

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
  }, [fetchBookingDetails]);

  return (
    <>
      <div className={styles.bookingHeader}>
        <h2>Booking History</h2>
      </div>

      {bookingDetails && bookingDetails.length > 0 ? (
        <>
          {bookingDetails.map((bookingDetails) => {
            return (
              <>
                <div className={styles.bookingDetails}>
                  <img
                    src={
                      bookingDetails &&
                      bookingDetails?.images &&
                      bookingDetails?.images
                        ? bookingDetails.images
                        : noImage
                    }
                    alt=""
                  />

                  <div className={styles.bookingRowOne}>
                    <h4>{bookingDetails?.hotelName}</h4>
                    {bookingDetails?.checkInDate &&
                      bookingDetails?.checkOutDate && (
                        <h6>
                          <>
                            {bookingDetails?.checkInDate &&
                              bookingDetails?.checkInDate.substring(0, 10)}
                            {"  "}
                          </>
                          {"   "}
                          to{"   "}
                          <>
                            {"  "}
                            {bookingDetails?.checkOutDate &&
                              bookingDetails?.checkOutDate.substring(0, 10)}
                          </>
                        </h6>
                      )}
                    {bookingDetails?.guests && bookingDetails?.rooms && (
                      <h6>
                        <>
                          {bookingDetails?.guests}{" "}
                          <span>
                            {bookingDetails?.guests > 1 ? "Guests" : "Guest"}
                          </span>
                          {"  "}
                        </>
                        {"  "},
                        <>
                          {"  "}
                          {bookingDetails?.rooms}{" "}
                          <span>
                            {bookingDetails?.rooms > 1 ? "Rooms" : "Room"}
                          </span>
                        </>
                      </h6>
                    )}
                  </div>
                  <div className={styles.bookingRowOne}>
                    <h6>{bookingDetails?.bookingId}</h6>
                  </div>
                  <div className={styles.bookingRowTwo}>
                    <h6>{bookingDetails?.price}</h6>
                    <button
                      className={styles.link}
                      onClick={() => handleShow(bookingDetails)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <p>No Data Found...</p>
      )}

      {/* Modal Starts From Here */}
      <Modal show={show} onHide={handleClose} centered size="xl">
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <button className={styles.print}>
              <span>Print</span>
            </button>
            <button onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.body}>
              <div>
                <h4>Booking Id</h4>
                <p>{modalData?.bookingId}</p>
              </div>
              {userData && userData?.name && (
                <p>
                  Booked by {userData?.name} on{" "}
                  <span>
                    {modalData &&
                    modalData?.createdAt &&
                    moment(modalData?.createdAt).isoWeekday() === 1
                      ? "Mon"
                      : moment(modalData?.createdAt).isoWeekday() === 2
                      ? "Tue"
                      : moment(modalData?.createdAt).isoWeekday() === 3
                      ? "Wed"
                      : moment(modalData?.createdAt).isoWeekday() === 4
                      ? "Thu"
                      : moment(modalData?.createdAt).isoWeekday() === 5
                      ? "Fri"
                      : moment(modalData?.createdAt).isoWeekday() === 6
                      ? "Sat"
                      : "Sun"}
                  </span>
                  {", "}
                  <span>
                    {modalData &&
                      modalData?.createdAt &&
                      moment(
                        modalData?.createdAt.substring(0, 10).replace(/-/g, "")
                      ).format("Do MMMM YYYY")}
                  </span>
                </p>
              )}
            </div>
            <div className={styles.borderBottom} />
            <div className={styles.body}>
              <div>
                <h6>
                  Hotel Name: <span>{modalData?.hotelName}</span>
                </h6>
                <h6>
                  Hotel Owner: <span>{modalData?.hotelOwnerName}</span>
                </h6>
              </div>
              <img
                src={
                  modalData && modalData?.images && modalData?.images
                    ? modalData.images
                    : noImage
                }
                alt=""
              />
            </div>
            <div className={styles.borderBottom} />
            <div className={styles.body}>
              <div>
                <span>Primary Guest</span>
                <h6>{userData?.name}</h6>
                <span>Mobile Number</span>
                <h6>{userData?.mobile}</h6>
                <span>Email</span>
                <h6>{userData?.email}</h6>
              </div>
              {modalData &&
                modalData?.checkInDate &&
                modalData?.checkOutDate && (
                  <div>
                    <span>Check In</span>
                    <h6>
                      {modalData &&
                        modalData?.checkInDate &&
                        modalData?.checkInDate.substring(0, 10)}
                    </h6>
                    <span>Check Out</span>
                    <h6>
                      {modalData &&
                        modalData?.checkOutDate &&
                        modalData?.checkOutDate.substring(0, 10)}
                    </h6>
                  </div>
                )}
              {modalData && modalData?.rooms && modalData?.guests && (
                <div>
                  <span>Rooms</span>
                  <h6>{modalData.rooms}</h6>
                  <span>Guests</span>
                  <h6>{modalData.guests}</h6>
                </div>
              )}
              {Array.isArray(modalData.foodItems) &&
                modalData.foodItems.map((e) => (
                  <div key={e._id}>
                    <h6>Foods</h6> {e.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
