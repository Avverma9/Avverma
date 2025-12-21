import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFilteredBooking } from "../../redux/slices/bookingSlice";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import baseURL from "../../utils/baseUrl";
import { useLoader } from "../../utils/loader";
import NotFoundPage from "../../utils/Not-found";
import { Unauthorized, userId } from "../../utils/Unauthorized";
import { useToast } from "../../utils/toast";
import { IoCalendarOutline, IoCloseSharp, IoReceiptOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { useMediaQuery } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const ModalShell = ({ open, onClose, children, maxWidthClass = "max-w-3xl" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${maxWidthClass} mx-auto overflow-hidden animate-fadeIn`}>
        {children}
      </div>
    </div>
  );
};

const PriceRow = ({ label, value, isTotal }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <div className={`text-sm font-semibold ${isTotal ? 'text-gray-900' : 'text-gray-600'}`}>{label}</div>
    <div className={`text-sm font-bold ${isTotal ? 'text-primary-600' : 'text-gray-800'}`}>₹{value}</div>
  </div>
);

const BookingCard = ({ bookingDetail, onShowDetails, onReview }) => (
  <article className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-[1.01]">
    <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
      <h3 className="text-lg font-semibold">My Bookings</h3>
      <time className="text-sm">{moment(bookingDetail?.createdAt).format("MMMM DD, YYYY")}</time>
    </header>
    <div className="p-4">
      <h4 className="text-xl font-bold text-gray-900 mb-2">{bookingDetail?.hotelDetails?.hotelName}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center mb-2">
        <div className="flex items-center gap-2">
          <IoCalendarOutline className="text-gray-500 text-xl" />
          <div>
            <span className="text-sm font-semibold">{formatDateWithOrdinal(bookingDetail.checkInDate)} <span className="text-gray-400">-</span> {formatDateWithOrdinal(bookingDetail.checkOutDate)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-start md:justify-end">
          <IoReceiptOutline className="text-gray-500 text-xl" />
          <span className="text-sm text-gray-500 mr-1">Booking ID:</span>
          <span className="font-semibold">{bookingDetail.bookingId}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <div className="text-xs uppercase text-gray-500">Guests</div>
          <div className="font-semibold">{bookingDetail.guests} {bookingDetail.guests > 1 ? 'Adults' : 'Adult'}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-gray-500">Rooms</div>
          <div className="font-semibold">{bookingDetail.numRooms}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-extrabold text-emerald-600 flex items-center gap-1">
          <RiMoneyRupeeCircleFill className="text-xl" /> <span>{bookingDetail.price}</span>
        </span>
        <div className="flex gap-2">
          <button onClick={() => onShowDetails(bookingDetail)} className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50 focus-ring">View Details</button>
          <button onClick={() => onReview(bookingDetail?.hotelDetails?.hotelId)} className="px-3 py-2 bg-primary-600 text-white rounded-md text-sm hover:opacity-95">Review</button>
        </div>
      </div>
    </div>
  </article>
);

export default function MyBookings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const toast = useToast();
  const [bookingDetails, setBookingDetails] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Confirmed");
  const filteredBookings = useSelector((state) => state.booking.filteredBookings);
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const bookingsPerPage = isSmallScreen ? 2 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();
        const userIdLocal = localStorage.getItem("rsUserId");
        if (!userIdLocal) throw new Error("You are not logged in!");
        setBookingDetails([]);
        dispatch(fetchFilteredBooking({ selectedStatus, userId: userIdLocal }));
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    };
    fetchData();
  }, [dispatch, selectedStatus]);

  useEffect(() => {
    if (Array.isArray(filteredBookings)) setBookingDetails(filteredBookings);
    else if (filteredBookings && Array.isArray(filteredBookings.data)) setBookingDetails(filteredBookings.data);
    else setBookingDetails([]);
  }, [filteredBookings]);

  const handleShowDetails = (value) => { setModalData(value); setShowModal(true); };
  const handleCloseDetails = () => { setModalData(null); setShowModal(false); };
  const handleReview = (hotelId) => {
    localStorage.setItem("hotelId_review", hotelId);
    setShowReviewForm(true);
  };
  const handleCloseReview = () => { setComment(""); setRating(0); setShowReviewForm(false); };

  const postReview = async () => {
    const userIdLocal = localStorage.getItem("rsUserId");
    const hotelId = localStorage.getItem("hotelId_review");
    try {
      const response = await axios.post(`${baseURL}/reviews/${userIdLocal}/${hotelId}`, { comment, rating });
      if (response.status === 201) {
        setComment(""); setRating(0); toast.info("Your review has been added"); setShowReviewForm(false);
      }
    } catch (error) {
      toast.info(error.response?.data?.message || "Error posting review");
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingDetails.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.max(1, Math.ceil(bookingDetails.length / bookingsPerPage));

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (bookingDetails.length === 0) return null;

    return (<div className="flex justify-center mt-8 min-h-[48px]">
      <nav className="flex items-center gap-1 px-3 py-2 bg-white/80 rounded-xl border shadow-lg backdrop-blur-xl w-full max-w-md">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-full text-gray-700 p-2 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {currentPage > 3 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="rounded-lg px-2 font-semibold text-sm text-gray-600 hover:bg-gray-100"
            >
              1
            </button>
            <span className="px-1 text-gray-500">...</span>
          </>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page =>
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 2
          )
          .map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`rounded-lg px-3 py-1.5 mx-1 font-semibold text-sm transition-colors duration-150
                ${currentPage === number
                  ? 'bg-primary-600 text-black font-extrabold border border-black shadow-lg scale-110'
                  : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {number}
            </button>
          ))}
        {currentPage < totalPages - 2 && (
          <>
            <span className="px-1 text-gray-500">...</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="rounded-lg px-2 font-semibold text-sm text-gray-600 hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-full text-gray-700 p-2 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </div>);
  };

  if (!userId) return <Unauthorized />;

  return (
    <main className="p-2 sm:p-4 md:p-8">
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-end mb-3 sm:mb-6">
          <div className="w-full md:w-auto flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-2 px-3 pr-8 text-sm font-medium shadow-sm"
              >
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Failed</option>
                <option>Checked-in</option>
                <option>Checked-out</option>
                <option>Cancelled</option>
                <option>No-show</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FiFilter /></span>
            </div>
          </div>
          <div className="ml-3">
            <button onClick={() => navigate('/travel-partner')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
              Manage Travel Packages
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 min-h-[50vh]">
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <div key={booking.bookingId} className="flex justify-center">
                <BookingCard bookingDetail={booking} onShowDetails={handleShowDetails} onReview={handleReview} />
              </div>
            ))
          ) : (
            <div className="text-center">
              <NotFoundPage />
            </div>
          )}
        </div>
        {renderPagination()}
      </section>
      <ModalShell open={showModal} onClose={handleCloseDetails} maxWidthClass="max-w-4xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary-600">Booking Details</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="px-3 py-2 border rounded-md text-sm">Print</button>
              <button onClick={handleCloseDetails} className="p-2 rounded-md hover:bg-gray-100"><IoCloseSharp /></button>
            </div>
          </div>
          <div className="max-h-[65vh] overflow-y-auto pr-2">
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Booking ID</div>
                  <div className="font-semibold">{modalData?.bookingId}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Booked By</div>
                  <div className="font-semibold">{modalData?.user?.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Booking Date</div>
                  <div className="font-semibold">{moment(modalData?.createdAt).format('Do MMM YYYY')}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="font-semibold">{modalData?.bookingStatus}</div>
                </div>
              </div>
            </section>
            <hr className="my-4" />
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Hotel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Hotel</div>
                  <div className="font-semibold">{modalData?.hotelDetails?.hotelName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-semibold">{modalData?.destination}</div>
                </div>
              </div>
            </section>
            <hr className="my-4" />
            {modalData?.roomDetails?.length > 0 && (
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Room Details</h3>
                <div className="space-y-3">
                  {modalData.roomDetails.map((room, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-gray-50 rounded p-3">
                      <div>
                        <div className="text-xs text-gray-500">Room Type</div>
                        <div className="font-semibold">{room?.type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Bed Type</div>
                        <div className="font-semibold">{room?.bedTypes}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="font-semibold">₹{room?.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <hr className="my-4" />
            <section>
              <h3 className="text-lg font-semibold mb-3">Price Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <PriceRow label="Room Total" value={(((modalData?.roomDetails||[]).reduce((acc, r) => acc + (Number(r.price) || 0), 0) * (Number(modalData?.numRooms) || 1))).toFixed(2)} />
                  <PriceRow label="Food Total" value={(((modalData?.foodDetails||[]).reduce((acc, f) => acc + (Number(f.price) || 0), 0))).toFixed(2)} />
                  <PriceRow label={`GST (${modalData?.gstPrice || 0}%)`} value={(((modalData?.roomDetails||[]).reduce((acc, r) => acc + (Number(r.price) || 0), 0) * (Number(modalData?.numRooms) || 1)) * (Number(modalData?.gstPrice)||0)/100).toFixed(2)} />
                </div>
                <div className="space-y-2">
                  <div className="py-2">
                    <div className="text-sm font-semibold text-gray-600">Discount</div>
                    <div className="text-sm font-medium">{(Number(modalData?.discountPrice) || 0) > 0 ? `- ₹${modalData?.discountPrice}` : 'No Discount'}</div>
                  </div>
                  {modalData?.isPartialBooking && (
                    <div className="py-2">
                      <div className="text-sm font-semibold text-gray-600">Partially Paid</div>
                      <div className="text-sm font-medium">{(Number(modalData?.partialAmount) || 0).toFixed(2)}</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border">
                    <div className="text-sm text-gray-600">Final Total</div>
                    <div className="text-2xl font-extrabold">₹{modalData?.price || 0}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
  </ModalShell>
  <ModalShell open={showReviewForm} onClose={handleCloseReview} maxWidthClass="max-w-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-600">Write a Review</h3>
            <button onClick={handleCloseReview} className="p-2 rounded-md hover:bg-gray-100"><IoCloseSharp /></button>
          </div>
          <div className="space-y-3">
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full border rounded-md p-3 text-sm" placeholder="Write your comment here..." />
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Rating:</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} onClick={() => setRating(i + 1)} className={`text-2xl ${rating >= i + 1 ? 'text-yellow-400' : 'text-gray-300'}`} aria-label={`Star ${i + 1}`}>★</button>
                ))}
              </div>
            </div>
            <button onClick={postReview} className="w-full py-2 bg-primary-600 text-white rounded-md">Send Review</button>
          </div>
        </div>
      </ModalShell>
    </main>
  );
}
