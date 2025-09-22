import React, { useState, useMemo, useEffect } from 'react';

// --- SVG Icons (Self-contained components) ---
const StarIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
const LocationIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>);
const NightsStayIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>);
const WbSunnyIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25v.01a2.25 2.25 0 002.25 2.25h.01a2.25 2.25 0 002.25-2.25v-.01a2.25 2.25 0 00-2.25-2.25h-.01z" /></svg>);
const MapIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.875 5.688c-.381.19-.622.58-.622-1.006V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0z" /></svg>);
const CalendarIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h18" /></svg>);
const CheckIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>);
const XIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const PlusIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>);
const MinusIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>);

// --- Tour Package Data ---
const tourData = {
  _id: '683bfa6f8f2403c2e02e03eb',
  travelAgencyName: 'Mannara Travels',
  price: 1400,
  nights: 2,
  days: 1,
  themes: 'Romantic',
  visitngPlaces: '1N Patna|1N Delhi',
  starRating: 4,
  overview: 'Discover the historic charm and cultural richness of Patna and Delhi. This whirlwind tour takes you through ancient landmarks, bustling markets, and iconic sites, offering a glimpse into India’s diverse heritage.',
  images: [
    'https://static.vecteezy.com/system/resources/thumbnails/017/186/202/small_2x/amazing-panorama-beach-landscape-maldives-sunset-seascape-view-horizon-with-sea-and-sky-tranquil-scenery-tourism-and-travel-banner-summer-luxury-resort-landscape-vacation-holiday-island-concept-photo.jpg',
    'https://img.freepik.com/free-photo/nature-landscape-with-starry-clear-sky_23-2151683195.jpg?semt=ais_hybrid&w=740&q=80',
    'https://happy-stay-hopspitiality.s3.eu-north-1.amazonaws.com/1748761196849-Basic-Definition-of-Travel-Agency.jpg',
  ],
  dayWise: [
    { day: 1, title: 'Arrival in Patna', description: 'Arrive at Patna airport, transfer to your hotel. Spend the day exploring local sights like the Golghar and Patna Museum.'},
    { day: 2, title: 'Journey to Delhi', description: 'After breakfast, take a flight to Delhi. Check into your hotel and enjoy an evening at the bustling Chandni Chowk market.'},
    { day: 3, title: 'Delhi Exploration & Departure', description: 'Visit iconic landmarks like India Gate and Qutub Minar. Later, transfer to the airport for your departure.'},
  ],
  inclusion: ['Flights', 'Hotel Stay', 'Breakfast & Dinner', 'Airport Transfer'],
  exclusion: ['Visa Fees', 'Lunch', 'Personal Expenses'],
};

// --- Helper Components ---
const Counter = ({ label, value, onIncrement, onDecrement }) => (
    <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1 mt-1">
            <button onClick={onDecrement} disabled={value <= 1} className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"><MinusIcon className="w-5 h-5" /></button>
            <span className="font-bold text-lg">{value}</span>
            <button onClick={onIncrement} className="p-1 rounded-md text-gray-500 hover:bg-gray-100"><PlusIcon className="w-5 h-5" /></button>
        </div>
    </div>
);

// --- Main Component ---
export default function TourBookingPage() {
  const [bookingDetails, setBookingDetails] = useState({ date: '', travelers: 1 });
  const [coupon, setCoupon] = useState({ code: '', discount: 0, applied: false });
  const [showCouponInput, setShowCouponInput] = useState(false);

  const priceDetails = useMemo(() => {
    const basePrice = tourData.price * bookingDetails.travelers;
    const gst = basePrice * 0.12;
    const discountAmount = basePrice * (coupon.discount / 100);
    const total = basePrice + gst - discountAmount;
    return { basePrice, gst, discountAmount, total };
  }, [bookingDetails.travelers, coupon.discount]);
  
  const handleDetailChange = (e) => setBookingDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCounterChange = (field, change) => setBookingDetails(prev => ({...prev, [field]: Math.max(1, prev[field] + change)}));
  
  const handleApplyCoupon = () => {
    if (coupon.code.toUpperCase() === 'TRAVEL10') {
      setCoupon(prev => ({...prev, discount: 10, applied: true}));
    } else {
      setCoupon(prev => ({...prev, discount: 0, applied: false}));
    }
    setShowCouponInput(false);
  };

  const handleBooking = () => console.log("Booking Details:", { ...bookingDetails, ...priceDetails });
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setBookingDetails(prev => ({ ...prev, date: today }));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        
        {/* --- HERO SECTION --- */}
        <div className="animate-fade-in">
            <div className="py-8">
              <span className="inline-block bg-pink-100 text-pink-700 text-sm font-semibold px-3 py-1 rounded-full mb-2">{tourData.themes}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{tourData.travelAgencyName}</h1>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 text-gray-600">
                <div className="flex items-center"><StarIcon className="w-5 h-5 text-yellow-500 mr-1" /> <b>{tourData.starRating}.0</b> (124 reviews)</div>
                <div className="hidden md:block w-px h-5 bg-gray-300"></div>
                <div className="flex items-center"><LocationIcon className="w-5 h-5 mr-1" /> {tourData.visitngPlaces.replace(/\|/g, ', ')}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-2xl overflow-hidden">
              <div className="col-span-4 md:col-span-2 row-span-2 overflow-hidden"><img src={tourData.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"/></div>
              <div className="hidden md:block overflow-hidden"><img src={tourData.images[1]} alt="Side 1" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"/></div>
              <div className="hidden md:block overflow-hidden"><img src={tourData.images[2]} alt="Side 2" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"/></div>
            </div>
        </div>
      
        {/* --- MAIN CONTENT & BOOKING --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
                {/* Highlights */}
                <div className="border-b pb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Tour Highlights</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="bg-white p-4 rounded-lg border text-center"><NightsStayIcon className="w-8 h-8 mx-auto text-blue-600 mb-2"/><span className="font-semibold">{tourData.nights} Nights</span></div>
                      <div className="bg-white p-4 rounded-lg border text-center"><WbSunnyIcon className="w-8 h-8 mx-auto text-orange-500 mb-2"/><span className="font-semibold">{tourData.days} Day</span></div>
                      <div className="bg-white p-4 rounded-lg border text-center"><MapIcon className="w-8 h-8 mx-auto text-green-600 mb-2"/><span className="font-semibold">{tourData.visitngPlaces.split('|').length} Destinations</span></div>
                      <div className="bg-white p-4 rounded-lg border text-center"><CalendarIcon className="w-8 h-8 mx-auto text-purple-600 mb-2"/><span className="font-semibold">June - July</span></div>
                  </div>
                </div>

                {/* Itinerary */}
                <div className="border-b pb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Itinerary</h2>
                  <div className="space-y-6">
                    {tourData.dayWise.map((day) => (
                      <div key={day.day} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">Day {day.day}</div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{day.title}</h3>
                          <p className="text-gray-600 mt-1">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Inclusions / Exclusions */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <ul className="space-y-3">
                          {tourData.inclusion.map(item => (<li key={item} className="flex items-center"><CheckIcon className="w-6 h-6 text-green-500 mr-3"/><span className="text-gray-700">{item}</span></li>))}
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3">
                          {tourData.exclusion.map(item => (<li key={item} className="flex items-center"><XIcon className="w-6 h-6 text-red-500 mr-3"/><span className="text-gray-700">{item}</span></li>))}
                        </ul>
                      </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border">
                <div className="bg-red-500 text-white font-bold text-center py-2 px-4 rounded-t-lg -mt-6 -mx-6 mb-4">
                  Booking Summary
                </div>
                
                <p className="text-gray-600 text-sm">Tour Details</p>
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">{tourData.themes} Tour</p>
                    <button className="text-sm font-semibold text-blue-600 hover:underline">CHANGE</button>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4">
                  <Counter label="Travelers" value={bookingDetails.travelers} onIncrement={() => handleCounterChange('travelers', 1)} onDecrement={() => handleCounterChange('travelers', -1)}/>
                  <div className="relative">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-9"/>
                    <input type="date" name="date" value={bookingDetails.date} onChange={handleDetailChange} className="w-full border border-gray-300 rounded-lg p-2 pl-10 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                  </div>
                </div>
                
                {!showCouponInput && <button className="w-full py-2.5 my-2 font-semibold text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors" onClick={() => setShowCouponInput(true)}>APPLY COUPON</button>}

                {showCouponInput && 
                  <div className="flex my-2">
                    <input type="text" placeholder="Coupon Code" className="flex-grow border border-r-0 border-gray-300 rounded-l-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={coupon.code} onChange={(e) => setCoupon(prev => ({...prev, code: e.target.value}))}/>
                    <button onClick={handleApplyCoupon} className="bg-blue-600 text-white font-semibold px-4 rounded-r-lg hover:bg-blue-700" disabled={coupon.applied}>Apply</button>
                  </div>
                }

                <div className="mt-4 space-y-2">
                    <h3 className="font-bold">Pricing Summary</h3>
                    <div className="flex justify-between text-gray-600"><p>Tour Price (x{bookingDetails.travelers})</p><p>₹{priceDetails.basePrice.toLocaleString()}</p></div>
                    <div className="flex justify-between text-gray-600"><p>GST 12% Applied</p><p>₹{priceDetails.gst.toLocaleString()}</p></div>
                    {coupon.applied && <div className="flex justify-between text-green-600 font-semibold"><p>Coupon Discount</p><p>- ₹{priceDetails.discountAmount.toLocaleString()}</p></div>}
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between font-bold text-lg"><p>Total Payable Amount</p><p>₹{priceDetails.total.toLocaleString()}</p></div>
                </div>
                
                <button className="w-full bg-blue-600 text-white font-bold py-3 mt-4 rounded-lg hover:bg-blue-700 transition-colors text-lg" disabled={!bookingDetails.date} onClick={handleBooking}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

