import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTravelById, bookNow } from '../../redux/reducers/travelSlice';
import { getGst } from "../../redux/reducers/gstSlice";
import { useLoader } from '../../utils/loader';
import { useToast } from '../../utils/toast';
import { userId } from '../../utils/Unauthorized';

// --- Helper Components for Icons ---

const StarIcon = ({ filled, className }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'} ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const XCircleIcon = () => (
    <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const InfoCard = ({ icon, title, value }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg shadow-sm text-center">
        {icon}
        <span className="text-sm text-gray-600 mt-1">{title}</span>
        <span className="font-bold text-gray-800">{value}</span>
    </div>
);


// --- Main Page Component ---

export default function TourBookPage() {
    const { id } = useParams();
    const { travelById, loading } = useSelector((state) => state.travel);
    const gstData = useSelector((state) => state.gst.gst);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const popup = useToast();
    const [finalPrice, setFinalPrice] = useState(0);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    useEffect(() => {
        if (id) {
            dispatch(getTravelById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getGst({ type: "Tour" }));
    }, [dispatch]);

    useEffect(() => {
        if (gstData && travelById) {
            const startingPrice = travelById.price;
            const gstPercentage = gstData.gstPrice;
            const gstAmount = (startingPrice * gstPercentage) / 100;
            const calculatedFinalPrice = startingPrice + gstAmount;
            setFinalPrice(calculatedFinalPrice);
        } else if (travelById) {
            setFinalPrice(travelById.price)
        }
    }, [gstData, travelById]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleBooking = async () => {
        if (!userId) return popup("Please log in to book.");
        if (!dateRange.startDate || !dateRange.endDate) return popup("Please select travel dates.");

        const bookingData = { 
            userId, 
            travelId: travelById._id, 
            price: finalPrice, 
            from: dateRange.startDate, 
            to: dateRange.endDate,
            city: travelById.city // Assuming city is needed for the confirmation popup
        };

        try {
            showLoader();
            const res = await dispatch(bookNow(bookingData)).unwrap();
            const bookingId = res?.bookingId || res?.data?._id || "N/A";
             popup(
               `✅ Booking Confirmed!\n\n📍 City: ${
                 bookingData.city
               }\n📅 From: ${formatDate(bookingData.from)}\n📅 To: ${formatDate(
                 bookingData.to
               )}\n🆔 Booking ID: ${bookingId}`
             );
            setTimeout(() => navigate("/tour-bookings"), 3000);
        } catch (err) {
            const errorMessage = err?.message || err?.toString() || "An unknown error occurred.";
            popup(`❌ Booking failed.\n\nReason: ${errorMessage}`);
        } finally {
            hideLoader();
        }
    };

    if (loading || !travelById) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto p-4 lg:p-8">

                {/* --- Header --- */}
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">{travelById.travelAgencyName}</h1>
                    <div className="flex items-center mt-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} filled={i < travelById.starRating} />
                            ))}
                        </div>
                        <p className="ml-2 text-md sm:text-lg text-gray-600">{travelById.starRating}.0 Star Rating</p>
                    </div>
                    <p className="mt-1 text-gray-500">{travelById.city}, {travelById.state}, {travelById.country}</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Main Content --- */}
                    <div className="lg:col-span-2">

                        {/* --- Image Gallery --- */}
                        <section className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {travelById.images.map((img, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                        <img
                                            src={img}
                                            alt={`Tour image ${index + 1}`}
                                            className="w-full h-56 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --- Overview --- */}
                        <section className="mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Tour Overview</h2>
                            <p className="text-gray-700 leading-relaxed">{travelById.overview}</p>
                        </section>


                        {/* --- Day-wise Itinerary --- */}
                        <section className="p-4 sm:p-6 bg-white rounded-lg shadow-md mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Day-wise Itinerary</h2>
                            <div className="space-y-4">
                                {travelById.dayWise.filter(day => day.description).map(day => (
                                    <div key={day._id} className="flex items-start">
                                        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold mr-4 text-sm sm:text-base">{day.day}</div>
                                        <div>
                                            <h3 className="font-semibold text-md sm:text-lg text-gray-800">Day {day.day}</h3>
                                            <p className="text-gray-600">{day.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --- Inclusions & Exclusions --- */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Inclusions</h2>
                                <ul className="space-y-2">
                                    {travelById.inclusion.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700"><CheckCircleIcon />{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Exclusions</h2>
                                <ul className="space-y-2">
                                    {travelById.exclusion.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700"><XCircleIcon />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* --- Terms and Conditions --- */}
                        <section className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Terms & Conditions</h2>
                            <div className="space-y-4">
                                {Object.entries(travelById.termsAndConditions).map(([key, value]) => (
                                    <div key={key}>
                                        <h3 className="font-semibold text-md sm:text-lg capitalize text-gray-800">{key.replace(/([A-Z])/g, ' $1')}</h3>
                                        <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* --- Sidebar / Booking Card --- */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border">
                            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
                                ₹{finalPrice.toLocaleString()}
                                <span className="text-lg font-normal text-gray-500">/ person</span>
                            </p>

                             <div className="space-y-4 mb-6">
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                     <input
                                         type="date"
                                         value={dateRange.startDate}
                                         onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                                         className="w-full p-2 border border-gray-300 rounded-md"
                                     />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                     <input
                                         type="date"
                                         value={dateRange.endDate}
                                         onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                                         className="w-full p-2 border border-gray-300 rounded-md"
                                     />
                                 </div>
                             </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <InfoCard icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} title="Days" value={travelById.days} />
                                <InfoCard icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>} title="Nights" value={travelById.nights} />
                            </div>

                            <div className="space-y-3 mb-6">
                                <p><strong>Available From:</strong> {formatDate(travelById.from)}</p>
                                <p><strong>Available To:</strong> {formatDate(travelById.to)}</p>
                                <p><strong>Places:</strong> {travelById.visitngPlaces.replace(/\|/g, ', ')}</p>
                                <p><strong>Theme:</strong> {travelById.themes}</p>
                            </div>

                            <h3 className="font-bold text-lg mb-2 text-gray-800">Amenities</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {travelById.amenities.map(item => (
                                    <span key={item} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">{item}</span>
                                ))}
                            </div>

                            <button onClick={handleBooking} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md">
                                Book Now
                            </button>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>Contact us for more details:</p>
                                <a href={`mailto:${travelById.agencyEmail}`} className="text-blue-600 hover:underline">{travelById.agencyEmail}</a>
                                <span className="mx-2">|</span>
                                <a href={`tel:${travelById.agencyPhone}`} className="text-blue-600 hover:underline">{travelById.agencyPhone}</a>
                            </div>

                        </div>
                    </aside>
                </main>

            </div>
        </div>
    );
}

