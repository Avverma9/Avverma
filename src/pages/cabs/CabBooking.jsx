import React, { useState, useEffect } from "react";
import { bookSeat, getCarById } from "../../redux/reducers/car";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLoader } from "../../utils/loader";

// --- SVG Icons (unchanged) ---
const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>
);
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const ArmchairIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path><path d="M5 18v2"></path><path d="M19 18v2"></path></svg>
);

// --- Helpers ---
const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

const formatTime = (dateString) =>
  dateString ? new Date(dateString).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase() : "N/A";

// --- Location Info Card ---
const LocationInfoCard = ({ locationName, info, isLoading }) => {
  if (isLoading)
    return (
      <div className="animate-pulse bg-white shadow rounded-lg overflow-hidden">
        <div className="h-40 bg-gray-200" />
        <div className="p-4 space-y-2">
          <div className="h-5 bg-gray-200 w-1/3 rounded"></div>
          <div className="h-4 bg-gray-200 w-4/5 rounded"></div>
        </div>
      </div>
    );
  if (!info) return null;
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="relative">
        <img src={info.imageUrl} alt={locationName} className="h-40 w-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900">{locationName}</h4>
        <p className="text-sm text-gray-600">{info.description}</p>
      </div>
    </div>
  );
};

// --- Toast ---
const Toast = ({ message, type, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded shadow-lg text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircleIcon /> : <AlertTriangleIcon />}
      <span>{message}</span>
    </div>
  );
};

// --- Seat ---
const Seat = ({ seat, onSelect, isSelected }) => {
  const getSeatClass = () =>
    seat.isBooked ? "bg-gray-300 cursor-not-allowed" : isSelected ? "bg-indigo-600 text-white" : "bg-white hover:bg-indigo-100";

  return (
    <button
      className={`flex flex-col items-center justify-between p-2 rounded-md shadow border text-xs ${getSeatClass()}`}
      onClick={() => onSelect(seat)}
      disabled={seat.isBooked}
    >
      <div className="flex justify-between w-full text-xs font-medium">
        <span>{seat.seatNumber}</span>
        <span>{seat.seatType}</span>
      </div>
      <ArmchairIcon />
      <span className="text-sm font-semibold">₹{seat.seatPrice}</span>
    </button>
  );
};

// --- Main Component ---
export default function CabsBooking() {
  const [passengerDetails, setPassengerDetails] = useState({ fullName: "", phone: "", email: "" });
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();
  const [selectedCab, setSelectedCab] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const [isBooking, setIsBooking] = useState(false);

  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (id) {
      showLoader();
      dispatch(getCarById(id))
        .unwrap()
        .then((data) => setSelectedCab(data))
        .catch(() => setToast({ visible: true, message: "Failed to load car details", type: "error" }))
        .finally(() => hideLoader());
    }
  }, [id, dispatch]);

  const handleSeatSelect = (seat) =>
    setSelectedSeats((prev) =>
      prev.find((s) => s.seatNumber === seat.seatNumber) ? prev.filter((s) => s.seatNumber !== seat.seatNumber) : [...prev, seat]
    );

  const handleBooking = async () => {
    if (!passengerDetails.fullName || !passengerDetails.phone) return setToast({ visible: true, message: "Enter Full Name & Phone", type: "error" });
    if (selectedSeats.length === 0) return setToast({ visible: true, message: "Select at least one seat", type: "error" });

    setIsBooking(true);
    try {
      const seatIds = selectedSeats.map((s) => s._id);
      await dispatch(bookSeat({ seats: seatIds, carId: id, bookedBy: passengerDetails.fullName, customerMobile: passengerDetails.phone, customerEmail: passengerDetails.email })).unwrap();
      setToast({ visible: true, message: "Booking Confirmed!", type: "success" });
      setSelectedSeats([]);
      setPassengerDetails({ fullName: "", phone: "", email: "" });
    } catch {
      setToast({ visible: true, message: "Booking failed", type: "error" });
    } finally {
      setIsBooking(false);
    }
  };

  if (!selectedCab) return <div className="flex items-center justify-center h-screen text-gray-600">Cab Not Found</div>;

  const baseFare = selectedSeats.reduce((sum, seat) => sum + (seat.seatPrice || 0), 0);
  const taxes = Math.round(baseFare * 0.05);
  const totalPrice = baseFare + taxes;

  return (
    <div className="min-h-screen bg-gray-50">
      {toast.visible && <Toast {...toast} onHide={() => setToast({ ...toast, visible: false })} />}

      <header className="bg-indigo-600 text-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 font-semibold text-lg">
          <LogoIcon /> Confirm Your Ride
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Details */}
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Trip Details</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <img src={selectedCab.images?.[0]} alt={selectedCab.make} className="w-full md:w-1/3 h-40 object-cover rounded-lg" />
              <div>
                <h4 className="text-lg font-semibold">{selectedCab.make} {selectedCab.model}</h4>
                <p className="text-sm text-gray-600">{selectedCab.pickupP} → {selectedCab.dropP}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <p><strong>Pickup:</strong> {formatDate(selectedCab.pickupD)} {formatTime(selectedCab.pickupD)}</p>
                  <p><strong>Drop:</strong> {formatDate(selectedCab.dropD)} {formatTime(selectedCab.dropD)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Select Your Seats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {selectedCab.seatConfig?.map((seat) => (
                <Seat key={seat.seatNumber} seat={seat} onSelect={handleSeatSelect} isSelected={selectedSeats.some((s) => s.seatNumber === seat.seatNumber)} />
              ))}
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Passenger Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name *" value={passengerDetails.fullName} onChange={(e) => setPassengerDetails({ ...passengerDetails, fullName: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-300" />
              <input type="tel" placeholder="Phone Number *" value={passengerDetails.phone} onChange={(e) => setPassengerDetails({ ...passengerDetails, phone: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-300" />
              <input type="email" placeholder="Email (optional)" value={passengerDetails.email} onChange={(e) => setPassengerDetails({ ...passengerDetails, email: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-300" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between"><span>Seats</span><span>{selectedSeats.length ? selectedSeats.map((s) => s.seatNumber).join(", ") : "None"}</span></div>
              <div className="flex justify-between"><span>Base Fare</span><span>₹{baseFare}</span></div>
              <div className="flex justify-between"><span>Taxes (5%)</span><span>₹{taxes}</span></div>
              <div className="flex justify-between font-semibold border-t pt-2"><span>Total</span><span>₹{totalPrice}</span></div>
            </div>
            <button onClick={handleBooking} disabled={isBooking || !selectedSeats.length} className="mt-4 w-full py-2 px-4 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50">
              {isBooking ? "Processing..." : `Confirm & Pay ₹${totalPrice}`}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
