import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../../redux/reducers/travelSlice";
import "./tour-booking.css";
import BookingModal from "./booking-modal";
import { formatDate } from "../../../utils/convertDate";

export default function TourBooking() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.travel.bookings);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getBookings()).finally(() => setLoading(false));
    }, [dispatch]);

    const openModal = (booking) => setSelectedBooking(booking);
    const closeModal = () => setSelectedBooking(null);

    // Skeleton loader component
    const SkeletonCard = () => (
        <div className="booking-card-skeleton">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line text"></div>
            <div className="skeleton-line text short"></div>
            <div className="skeleton-button"></div>
        </div>
    );

    return (
        <div className="tour-booking-container">
            <h4>Your Tour Bookings</h4>

            {loading ? (
                <div className="booking-list">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : bookings?.length === 0 ? (
                <div className="no-bookings-found">
                    <p>No tour bookings found.</p>
                </div>
            ) : (
                <div className="booking-list">
                    {bookings.map(booking => (
                        <div className="booking-card" key={booking._id}>
                            <div className="booking-card-header">
                                <h5 className="agency-name">{booking.travelAgencyName}</h5>
                                <span className="booking-id">ID: {booking.bookingId}</span>
                            </div>
                            <div className="booking-card-body">
                                <div className="booking-info">
                                    <p><strong>City:</strong> {booking.city}</p>
                                    <p><strong>From:</strong> {formatDate(booking.from)}</p>
                                    <p><strong>To:</strong> {formatDate(booking.to)}</p>
                                </div>
                                <div className="booking-duration">
                                    <p>{booking.nights} Nights / {booking.days} Days</p>
                                </div>
                            </div>
                            <div className="booking-card-footer">
                                <button className="view-details-btn" onClick={() => openModal(booking)}>
                                    View Details
                                </button>
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