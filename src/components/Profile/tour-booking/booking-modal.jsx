import React from "react";
import "./booking-modal.css";
import { formatDate } from "../../../utils/convertDate";

export default function BookingModal({ booking, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>

                {/* Header with Agency and Images */}
                <div className="modal-header">
                    <div className="agency-avatar-name">
                        <img
                            src={booking.images[0]}
                            alt="Agency"
                            className="agency-avatar"
                        />
                        <h2>{booking.travelAgencyName}</h2>
                    </div>
                </div>


                <div className="modal-section">
                    <h4>Basic Info</h4>
                    <p><strong>City:</strong> {booking.city}, {booking.state}</p>
                    <p><strong>Theme:</strong> {booking.themes}</p>
                    <p><strong>Price:</strong> ₹{booking.price}</p>
                    <p><strong>Visiting Places:</strong> {booking.visitngPlaces}</p>
                    <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                </div>

                <div className="modal-section">
                    <h4>Dates & Duration</h4>
                    <p><strong>From:</strong> {formatDate(booking.from)}</p>
                    <p><strong>To:</strong> {formatDate(booking.to)}</p>
                    <p><strong>Duration:</strong> {booking.nights} Nights / {booking.days} Days</p>
                </div>

                <div className="modal-section">
                    <h4>Amenities & Inclusions</h4>
                    <p><strong>Amenities:</strong> {booking.amenities.join(", ")}</p>
                    <p><strong>Inclusions:</strong> {booking.inclusion.join(", ")}</p>
                    <p><strong>Exclusions:</strong> {booking.exclusion.join(", ")}</p>
                </div>

                {booking.dayWise?.length > 0 && (
                    <div className="modal-section">
                        <h4>Day-wise Plan</h4>
                        <ul>
                            {booking.dayWise.map((d, idx) => (
                                <li key={d._id}>
                                    Day {d.day || idx + 1}: {d.description || "NA"}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {booking.termsAndCondition && (
                    <div className="modal-section">
                        <h4>Terms & Conditions</h4>
                        <p><strong>Cancellation:</strong> {booking.termsAndCondition.cancellation}</p>
                        <p><strong>Refund:</strong> {booking.termsAndCondition.refund}</p>
                        <p><strong>Booking Policy:</strong> {booking.termsAndCondition.bookingPolicy}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
