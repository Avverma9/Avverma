import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../redux/reducers/travelSlice";
import { formatDate } from "../../utils/convertDate";
import { IoClose } from "react-icons/io5";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoClose className="text-xl text-gray-600" />
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-sm p-5 space-y-3">
    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    <div className="h-9 bg-gray-200 rounded w-24 mt-3"></div>
  </div>
);

const BookingModal = ({ booking, onClose }) => (
  <Modal open={!!booking} onClose={onClose}>
    <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>
    <div className="space-y-2 text-gray-700">
      <p>
        <span className="font-semibold">Agency:</span>{" "}
        {booking.travelAgencyName}
      </p>
      <p>
        <span className="font-semibold">Booking ID:</span> {booking.bookingId}
      </p>
      <p>
        <span className="font-semibold">City:</span> {booking.city}
      </p>
      <p>
        <span className="font-semibold">From:</span> {formatDate(booking.from)}
      </p>
      <p>
        <span className="font-semibold">To:</span> {formatDate(booking.to)}
      </p>
      <p>
        <span className="font-semibold">Duration:</span>{" "}
        {booking.nights} Nights / {booking.days} Days
      </p>
    </div>
  </Modal>
);

export default function TourBooking() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.travel.bookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getBookings()).finally(() => setLoading(false));
  }, [dispatch]);

  const openModal = (booking) => setSelectedBooking(booking);
  const closeModal = () => setSelectedBooking(null);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h4 className="text-2xl font-bold text-gray-800 mb-6">
        Your Tour Bookings
      </h4>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : bookings?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No tour bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {booking.travelAgencyName}
                  </h5>
                  <span className="text-xs text-gray-500">
                    ID: {booking.bookingId}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-semibold">City:</span> {booking.city}
                  </p>
                  <p>
                    <span className="font-semibold">From:</span>{" "}
                    {formatDate(booking.from)}
                  </p>
                  <p>
                    <span className="font-semibold">To:</span>{" "}
                    {formatDate(booking.to)}
                  </p>
                </div>
                <div className="text-sm font-medium text-indigo-600">
                  {booking.nights} Nights / {booking.days} Days
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => openModal(booking)}
                  className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                >
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
