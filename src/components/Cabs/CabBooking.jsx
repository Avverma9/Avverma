
import React, { useState, useEffect } from 'react';
import { bookSeat, getCarById } from "../../redux/reducers/car";
import { useDispatch } from 'react-redux';
import { styles } from './styles';
import { useParams } from 'react-router-dom';

// --- SVG Icons ---
const LogoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const ArmchairIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path><path d="M5 18v2"></path><path d="M19 18v2"></path></svg>;

// --- Helper Functions ---
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};
const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
};

// --- AI API Functions ---
const apiKey = "AIzaSyBTOcgD_PQFH-1eG1mPLFA-fpQr48NCsw4";

const fetchLocationDescription = async (locationName) => {
    if (!apiKey) return `Explore the beautiful city of ${locationName}.`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: `Provide a captivating, one-sentence description for a tourist visiting ${locationName}. Highlight its most famous feature.` }] }] };
    try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || `Explore the beautiful city of ${locationName}.`;
    } catch (error) { console.error(`Error fetching description for ${locationName}:`, error); return `Explore the beautiful city of ${locationName}.`; }
};
const fetchLocationImage = async (locationName) => {
    if (!apiKey) return `https://picsum.photos/seed/${locationName}/600/400`; // Better fallback
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
    const payload = { instances: { prompt: `A stunning, professional travel photograph of the most famous landmark in ${locationName}, India. Cinematic, golden hour lighting, vibrant colors.` }, parameters: { "sampleCount": 1 } };
    try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const result = await response.json();
        if (result.predictions?.[0]?.bytesBase64Encoded) { return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`; }
        return `https://picsum.photos/seed/${locationName}/600/400`;
    } catch (error) { console.error(`Error fetching image for ${locationName}:`, error); return `https://picsum.photos/seed/${locationName}/600/400`; }
};
// --- UI Components ---
const LocationInfoCard = ({ locationName, info, isLoading }) => {
    if (isLoading) return (
        <div className="location-card skeleton">
            <div className="location-image-placeholder skeleton-box"></div>
            <div className="location-info">
                <div className="skeleton-box" style={{height: '24px', width: '40%', marginBottom: '1rem'}}></div>
                <div className="skeleton-box" style={{height: '16px', width: '90%'}}></div>
                <div className="skeleton-box" style={{height: '16px', width: '80%', marginTop: '0.5rem'}}></div>
            </div>
        </div>
    );
    if (!info) return null;
    return (
        <div className="location-card">
            <div className="location-image-wrapper">
                <img src={info.imageUrl} alt={locationName} className="location-image" />
                <div className="location-image-overlay"></div>
            </div>
            <div className="location-info">
                <h4>{locationName}</h4>
                <p>{info.description}</p>
            </div>
        </div>
    );
};

const Toast = ({ message, type, onHide }) => {
    useEffect(() => { 
        const timer = setTimeout(onHide, 3000); 
        return () => clearTimeout(timer); 
    }, [onHide]);
    return (
        <div className={`toast ${type}`}>
            {type === 'success' ? <CheckCircleIcon /> : <AlertTriangleIcon />}
            <span>{message}</span>
        </div>
    );
};

const Seat = ({ seat, onSelect, isSelected }) => {
    const getSeatClass = () => seat.isBooked ? 'booked' : isSelected ? 'selected' : 'available';
    return (
        <button 
            className={`seat ${getSeatClass()}`} 
            onClick={() => onSelect(seat)} 
            disabled={seat.isBooked} 
            aria-label={`Seat ${seat.seatNumber}, ${getSeatClass()}`}
        >
            <div className="seat-info-top">
                <span className="seat-number">{seat.seatNumber}</span>
                <span className="seat-type">{seat.seatType}</span>
            </div>
            <ArmchairIcon />
            <span className="seat-price">₹{seat.seatPrice}</span>
        </button>
    );
};

export default function CabsBooking() {
    const [passengerDetails, setPassengerDetails] = useState({ 
        fullName: '', 
        phone: '', 
        email: '' 
    });
    const { id } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const dispatch = useDispatch();
    const [selectedCab, setSelectedCab] = useState(null); 
    const [isLoadingCab, setIsLoadingCab] = useState(true);
    const [locationInfo, setLocationInfo] = useState({});
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    // Load cab data
    useEffect(() => {
        if (id) {
            setIsLoadingCab(true);
            dispatch(getCarById(id))
                .unwrap()
                .then((data) => {
                    setSelectedCab(data);
                    setIsLoadingCab(false);
                })
                .catch((error) => {
                    console.error('Error fetching car data:', error);
                    showToast('Failed to load car details');
                    setIsLoadingCab(false);
                });
        }
    }, [id, dispatch]);

    // Load AI content when cab data is available
    useEffect(() => {
        if (selectedCab?.pickupP && selectedCab?.dropP) {
            const loadAiContent = async () => {
                setIsLocationLoading(true);
                try {
                    const [pickupDesc, dropDesc, pickupImg, dropImg] = await Promise.all([
                        fetchLocationDescription(selectedCab.pickupP), 
                        fetchLocationDescription(selectedCab.dropP),
                        fetchLocationImage(selectedCab.pickupP), 
                        fetchLocationImage(selectedCab.dropP)
                    ]);
                    setLocationInfo({
                        pickup: { description: pickupDesc, imageUrl: pickupImg },
                        drop: { description: dropDesc, imageUrl: dropImg }
                    });
                } catch (error) { 
                    console.error("Failed to load AI content:", error); 
                } finally { 
                    setIsLocationLoading(false); 
                }
            };
            loadAiContent();
        }
    }, [selectedCab]);

    const showToast = (message, type = 'error') => 
        setToast({ visible: true, message, type });

    const handleSeatSelect = (seat) => {
        setSelectedSeats(prev => {
            const existingIndex = prev.findIndex(s => s.seatNumber === seat.seatNumber);
            if (existingIndex >= 0) {
                return prev.filter((_, index) => index !== existingIndex);
            } else {
                return [...prev, seat];
            }
        });
    };

    const handleBooking = async () => {
        if (!passengerDetails.fullName || !passengerDetails.phone) {
            return showToast('Please fill in your Full Name and Phone Number.');
        }
        if (selectedSeats.length === 0) {
            return showToast('Please select at least one seat to book.');
        }

        setIsBooking(true);
        try {
            const seatIds = selectedSeats.map((seat) => seat._id);
            await dispatch(bookSeat({
                seats: seatIds,
                carId: id,
                bookedBy: passengerDetails.fullName,
                vehicleNumber: selectedCab?.vehicleNumber,
                customerMobile: passengerDetails.phone,
                customerEmail: passengerDetails.email,
            })).unwrap();
            
            showToast('Booking Confirmed Successfully!', 'success');
            // Reset form after successful booking
            setSelectedSeats([]);
            setPassengerDetails({ fullName: '', phone: '', email: '' });
        } catch (error) {
            console.error('Booking failed:', error);
            showToast('Booking failed. Please try again.');
        } finally {
            setIsBooking(false);
        }
    };

    if (isLoadingCab) {
        return (
            <>
                <style>{styles}</style>
                <div id="app-container">
                    <header className="app-header">
                        <div className="logo-container">
                            <LogoIcon/> Loading Ride Details...
                        </div>
                    </header>
                    <main className="booking-page-container">
                        <div className="loading-container">
                            <div>Loading cab details...</div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    if (!selectedCab) {
        return (
            <>
                <style>{styles}</style>
                <div id="app-container">
                    <header className="app-header">
                        <div className="logo-container">
                            <LogoIcon/> Cab Not Found
                        </div>
                    </header>
                    <main className="booking-page-container">
                        <div className="error-container">
                            <div>Cab details not found. Please try again.</div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    const baseFare = selectedSeats.reduce((total, seat) => total + (seat?.seatPrice || 0), 0);
    const taxes = Math.round(baseFare * 0.05);
    const totalPrice = baseFare + taxes;

    return (
        <>
            <style>{styles}</style>
            <div id="app-container">
                {toast.visible && (
                    <Toast 
                        message={toast.message} 
                        type={toast.type} 
                        onHide={() => setToast({ ...toast, visible: false })} 
                    />
                )}
                <header className="app-header">
                    <div className="logo-container">
                        <LogoIcon/> Confirm Your Ride
                    </div>
                </header>

                <main className="booking-page-container">
                    <div className="left-column">
                        <div className="booking-card">
                            <h3>Trip Details</h3>
                            <div className="trip-details-grid">
                                <img 
                                    src={selectedCab.images?.[0] || `https://placehold.co/600x400/e0e7ff/4338ca?text=${selectedCab.make?.replace(" ", "+")}`} 
                                    alt={`${selectedCab.make} ${selectedCab.model}`} 
                                />
                                <div className="trip-info">
                                    <h4>{selectedCab.make} {selectedCab.model} ({selectedCab.year})</h4>
                                    <p className="route">{selectedCab.pickupP} → {selectedCab.dropP}</p>
                                    <div className="datetime-grid">
                                        <div className="datetime-item">
                                            <strong>Pickup</strong> {formatDate(selectedCab.pickupD)} at {formatTime(selectedCab.pickupD)}
                                        </div>
                                        <div className="datetime-item">
                                            <strong>Drop</strong> {formatDate(selectedCab.dropD)} at {formatTime(selectedCab.dropD)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="booking-card" style={{marginTop: '1.5rem'}}>
                             <h3>About Your Destinations</h3>
                             <div className="location-info-container">
                                <LocationInfoCard 
                                    locationName={selectedCab.pickupP} 
                                    info={locationInfo.pickup} 
                                    isLoading={isLocationLoading} 
                                />
                                <LocationInfoCard 
                                    locationName={selectedCab.dropP} 
                                    info={locationInfo.drop} 
                                    isLoading={isLocationLoading} 
                                />
                             </div>
                        </div>

                        <div className="booking-card" style={{marginTop: '1.5rem'}}>
                             <h3>Select Your Seats</h3>
                             <div className="seat-selection-container">
                                <div className="seat-layout-grid">
                                    {selectedCab.seatConfig?.map(seat => (
                                        <Seat 
                                            key={seat.seatNumber} 
                                            seat={seat} 
                                            onSelect={handleSeatSelect} 
                                            isSelected={selectedSeats.some(s => s.seatNumber === seat.seatNumber)} 
                                        />
                                    ))}
                                </div>
                                <div className="seat-legend">
                                    <div className="legend-item">
                                        <div className="legend-box" style={{backgroundColor: '#f9fafb'}}></div> 
                                        Available
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-box" style={{backgroundColor: 'var(--primary-color)'}}></div> 
                                        Selected
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-box" style={{backgroundColor: 'var(--border-color)'}}></div> 
                                        Booked
                                    </div>
                                </div>
                             </div>
                        </div>

                        <div className="booking-card" style={{marginTop: '1.5rem'}}>
                            <h3>Passenger Details</h3>
                            <div className="booking-form-group">
                                <label htmlFor="fullName">Full Name *</label>
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    name="fullName" 
                                    value={passengerDetails.fullName} 
                                    onChange={e => setPassengerDetails({...passengerDetails, fullName: e.target.value})} 
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                             <div className="booking-form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value={passengerDetails.phone} 
                                    onChange={e => setPassengerDetails({...passengerDetails, phone: e.target.value})} 
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                             <div className="booking-form-group">
                                <label htmlFor="email">Email Address (Optional)</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={passengerDetails.email} 
                                    onChange={e => setPassengerDetails({...passengerDetails, email: e.target.value})} 
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="right-column">
                         <div className="booking-card">
                            <h3>Payment Summary</h3>
                            <div className="payment-summary">
                                <div className="summary-row">
                                    <span>Selected Seats</span>
                                    <span>
                                        {selectedSeats.length > 0 
                                            ? selectedSeats.map(s => s.seatNumber).sort((a,b) => a-b).join(', ') 
                                            : 'None'
                                        }
                                    </span>
                                </div>
                                <div className="summary-row">
                                    <span>Base Fare</span>
                                    <span>₹{baseFare}</span>
                                </div>
                                 <div className="summary-row">
                                    <span>Taxes & Fees (5%)</span>
                                    <span>₹{taxes}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total Payable</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                            <button 
                                className="confirm-booking-btn" 
                                onClick={handleBooking}
                                disabled={isBooking || selectedSeats.length === 0}
                            >
                                {isBooking ? 'Processing...' : `Confirm & Pay ₹${totalPrice}`}
                            </button>
                         </div>
                    </div>
                </main>
            </div>
        </>
    );
}
