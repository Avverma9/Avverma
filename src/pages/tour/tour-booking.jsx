import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTravelById, bookNow } from '../../redux/reducers/travelSlice';
import { getGst } from "../../redux/reducers/gstSlice";
import { useLoader } from '../../utils/loader';
import { useToast } from '../../utils/toast';
import { userId } from '../../utils/Unauthorized';

// --- Icons ---
const StarIcon = ({ filled, className = '' }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-slate-300'} drop-shadow-sm ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const XCircleIcon = () => (
  <svg className="w-6 h-6 text-rose-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

// --- Main Page Component ---
export default function TourBookNowPage() {
  const { id } = useParams();
  const { travelById, loading } = useSelector((state) => state.travel);
  const gstData = useSelector((state) => state.gst.gst);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const popup = useToast();
  const [finalPrice, setFinalPrice] = useState(0);

  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatDateForInput = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    return { startDate: formatDateForInput(today), endDate: formatDateForInput(tomorrow) };
  });

  useEffect(() => {
    if (id) dispatch(getTravelById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getGst({ type: "Tour" }));
  }, [dispatch]);

  useEffect(() => {
    if (gstData && travelById) {
      const startingPrice = travelById.price;
      const gstPercentage = gstData.gstPrice;
      const gstAmount = (startingPrice * gstPercentage) / 100;
      setFinalPrice(startingPrice + gstAmount);
    } else if (travelById) {
      setFinalPrice(travelById.price);
    }
  }, [gstData, travelById]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }, []);

  const handleBooking = async () => {
    if (!userId) return popup("Please log in to book.");
    if (!dateRange.startDate || !dateRange.endDate) return popup("Please select travel dates.");

    const bookingData = {
      userId,
      travelId: travelById._id,
      price: finalPrice,
      to: dateRange.endDate,
      city: travelById.city,
      amenities: travelById.amenities,
      inclusion: travelById.inclusion,
      exclusion: travelById.exclusion,
      dayWise: travelById.dayWise
    };

    try {
      showLoader();
      const res = await dispatch(bookNow(bookingData)).unwrap();
      const response = res?.payload;
      const bookingId = response?.bookingId || res?.data?._id || "N/A";
      popup.success(
        `✅ Booking Confirmed!\n\n📍 City: ${bookingData.city}\n📅 From: ${formatDate(dateRange.startDate)}\n🆔 Booking ID: ${bookingId}`
      );
      setTimeout(() => navigate("/tour-bookings"), 3000);
    } catch (err) {
      const errorMessage = err?.message || err?.toString() || "An unknown error occurred.";
      popup(`❌ Booking failed.\n\nReason: ${errorMessage}`);
    } finally {
      hideLoader();
    }
  };

  const visitingPlaces = useMemo(() => {
    try {
      return (travelById?.visitngPlaces || '').replace(/\|/g, ', ');
    } catch {
      return '';
    }
  }, [travelById]);

  if (loading || !travelById) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 blur-lg bg-blue-500/10 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-10">

        {/* Header */}
        <header className="mb-6 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                {travelById.travelAgencyName}
              </h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < travelById.starRating} />
                  ))}
                </div>
                <p className="ml-2 text-base sm:text-lg text-slate-600">
                  {travelById.starRating}.0 Star Rating
                </p>
              </div>
              <p className="mt-1 text-slate-500">
                {travelById.city}, {travelById.state}, {travelById.country}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold ring-1 ring-inset ring-emerald-200">
                Trusted Partner
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-blue-700 text-xs font-semibold ring-1 ring-inset ring-blue-200">
                Instant Confirmation
              </span>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">

            {/* Image Gallery */}
            <section aria-label="Image Gallery" className="rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {travelById.images.map((img, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200 bg-white">
                    <img
                      src={img}
                      alt={`Tour image ${index + 1}`}
                      className="w-full h-56 sm:h-64 object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found'; }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Overview */}
            <section className="p-5 sm:p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                Tour Overview
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {travelById.overview}
              </p>
            </section>

            {/* Day-wise Itinerary */}
            <section className="p-5 sm:p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                Day-wise Itinerary
              </h2>
              <div className="space-y-4">
                {travelById.dayWise.filter(day => day.description).map(day => (
                  <div key={day._id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold shadow-sm">
                      {day.day}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                        Day {day.day}
                      </h3>
                      <p className="text-slate-600">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 sm:p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Inclusions
                </h2>
                <ul className="space-y-2">
                  {travelById.inclusion.map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700">
                      <CheckCircleIcon />
                      <span className="mt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 sm:p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Exclusions
                </h2>
                <ul className="space-y-2">
                  {travelById.exclusion.map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700">
                      <XCircleIcon />
                      <span className="mt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Terms & Conditions */}
            <section className="p-5 sm:p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                Terms & Conditions
              </h2>
              <div className="space-y-4">
                {Object.entries(travelById.termsAndConditions).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="font-semibold text-base sm:text-lg capitalize text-slate-900">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 whitespace-pre-line">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right - Booking Card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 sm:p-6 shadow-xl shadow-slate-400/10 ring-1 ring-slate-200">

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-slate-500">/ person</span>
                </div>

                {/* Date Picker */}
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label htmlFor="booking-date" className="block text-sm font-semibold text-slate-800 mb-2 sm:mb-3">
                      Select Booking Date
                    </label>
                    <div
                      className="relative group"
                      onClick={(e) => {
                        const input = e.currentTarget.querySelector('input[type="date"]');
                        if (input && input.showPicker) input.showPicker();
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="date"
                        id="booking-date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                        onClick={(e) => e.currentTarget.showPicker && e.currentTarget.showPicker()}
                        onFocus={(e) => e.currentTarget.showPicker && e.currentTarget.showPicker()}
                        className="w-full appearance-none rounded-xl border-2 border-slate-300 bg-white py-2.5 sm:py-3 pl-10 sm:pl-11 pr-4 text-slate-900 font-medium transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer"
                        aria-describedby="booking-date-help"
                      />
                    </div>
                    <p id="booking-date-help" className="mt-1 text-xs text-slate-500">
                      Tap anywhere in the field to open the calendar.
                    </p>
                  </div>

                  {/* Package Details */}
                  <div className="border-t border-slate-200 pt-5 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Package Details</h3>
                    <div className="bg-slate-50 rounded-xl p-3 sm:p-4 ring-1 ring-slate-200">
                      <ul className="space-y-2 sm:space-y-3 text-sm">
                        <li className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">Duration</span>
                          <span className="font-bold text-slate-900 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                            {travelById.days} Days / {travelById.nights} Nights
                          </span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">Available From</span>
                          <span className="font-bold text-slate-900">{formatDate(travelById.from)}</span>
                        </li>
                        <li className="flex justify-between items-start gap-3">
                          <span className="text-slate-600 font-medium">Places</span>
                          <span className="font-semibold text-slate-900 text-right max-w-[65%] sm:max-w-[70%] break-words">
                            {visitingPlaces}
                          </span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">Theme</span>
                          <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs ring-1 ring-blue-200">
                            {travelById.themes}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="border-t border-slate-200 pt-5 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Amenities Included</h3>
                    <div className="flex flex-wrap gap-2">
                      {travelById.amenities.map((item) => (
                        <span
                          key={item}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-blue-200/70 shadow-sm hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                          title={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 sm:mt-8">
                  <button
                    onClick={handleBooking}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Book Now — Secure Your Trip
                  </button>
                </div>

                {/* Trust Row */}
                <div className="mt-5 sm:mt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Have questions?
                    <a
                      href={`mailto:${travelById.agencyEmail}`}
                      className="font-semibold text-blue-600 hover:text-blue-800 hover:underline ml-1 transition-colors"
                    >
                      Contact our team
                    </a>
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-emerald-600 font-medium">Secure Booking • Instant Confirmation</span>
                  </div>
                </div>

              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
