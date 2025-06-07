import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../../redux/reducers/travelSlice";
import "./tour-booking.css";
import BookingModal from "./booking-modal";
import { formatDate } from "../../../utils/convertDate";
import BookingSkeleton from "./skeleton-loading";

export default function TourBooking() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.travel.bookings);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        dispatch(getBookings()).finally(() => setLoading(false));
    }, [dispatch]);

    const openModal = (booking) => setSelectedBooking(booking);
    const closeModal = () => setSelectedBooking(null);

    return (
        <div className="tour-booking-container">
            <h4>Your Tour Bookings</h4>

            {loading ? (
                <>
                    <BookingSkeleton />
                    <BookingSkeleton />
                    <BookingSkeleton />
                </>
            ) : bookings?.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="booking-list">
                    {bookings.map(booking => (
                        <div className="booking-card-vertical" key={booking._id}>
                            <div className="booking-summary">
                                <div>
                                    <p><strong>Agency:</strong> {booking.travelAgencyName}</p>
                                    <p><strong>City:</strong> {booking.city}</p>
                                    <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                                </div>
                                <div>
                                    <p><strong>From:</strong> {formatDate(booking.from)}</p>
                                    <p><strong>To:</strong> {formatDate(booking.to)}</p>
                                    <p><strong>Duration:</strong> {booking.nights} Nights / {booking.days} Days</p>
                                </div>
                            </div>
                            <div className="booking-card-footer">
                                <button className="view-btn" onClick={() => openModal(booking)}>View</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedBooking && (
                <BookingModal booking={selectedBooking} onClose={closeModal} />
            )}
        </div>
    );
}
