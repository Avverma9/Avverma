import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Info,
  Loader2,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  Wifi,
  Wind,
  X,
  Tv,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  Snowflake,
  Bath,
  ParkingCircle,
  UtensilsCrossed,
  Clock,
  CreditCard,
  Percent,
  Tag,
  Gift,
  Minus,
  Plus,
  Trash2,
  AlertCircle,
  FileText
} from 'lucide-react';
import useBookingOperations from './hooks/useBookingOperations';
import { fetchBookingData, fetchMonthlyData } from '@/redux/slices/bookingSlice';

// --- Constants & Helpers ---
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1501117716987-c8e1ecb21014?auto=format&fit=crop&w=900&q=80&ixlib=rb-4.0.3';
const DEFAULT_AMENITIES = ['Free Wi-Fi', 'Breakfast available', 'Air conditioning', 'Daily housekeeping'];

const formatCurrency = (value) => new Intl.NumberFormat('en-IN').format(Math.max(Math.round(value || 0), 0));
const parseNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const ensureIsoDate = (value, offsetFallback = 0) => {
  if (value) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  const base = new Date();
  base.setDate(base.getDate() + offsetFallback);
  return base.toISOString();
};
const normalizeHotelId = (value) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
};
const deriveHotelId = (hotel) => {
  if (!hotel) return '';
  const candidates = [hotel.hotelId, hotel._id, hotel.id, hotel.hotelCode, hotel.slug];
  for (const candidate of candidates) {
    const normalized = normalizeHotelId(candidate);
    if (normalized) return normalized;
  }
  return '';
};
const normalizeAmenities = (amenities, fallback = []) => {
  if (!amenities) return fallback;
  if (Array.isArray(amenities)) {
    return amenities
      .flatMap((item) => {
        if (!item) return [];
        if (typeof item === 'string') return [item];
        if (Array.isArray(item.amenities)) return item.amenities;
        if (typeof item === 'object') return Object.values(item).filter((value) => typeof value === 'string');
        return [];
      })
      .filter(Boolean);
  }
  if (typeof amenities === 'string') return amenities.split(',').map((item) => item.trim()).filter(Boolean);
  return fallback;
};
const extractPriceCandidate = (payload) => {
  if (payload === null || payload === undefined) return null;
  if (typeof payload === 'number' && Number.isFinite(payload)) return payload;
  if (typeof payload === 'string') {
    const parsed = Number(payload.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (Array.isArray(payload)) {
    for (const entry of payload) {
      const candidate = extractPriceCandidate(entry);
      if (candidate !== null) return candidate;
    }
    return null;
  }
  if (typeof payload === 'object') {
    const preferred = ['finalPrice', 'price', 'discountedPrice', 'amount', 'total'];
    for (const key of preferred) {
      if (payload[key] !== undefined) {
        const candidate = extractPriceCandidate(payload[key]);
        if (candidate !== null) return candidate;
      }
    }
  }
  return null;
};
const sumFoodSelections = (items = []) =>
  items.reduce((sum, item) => sum + Math.max(item?.quantity ?? 1, 1) * parseNumber(item?.totalPrice ?? item?.price, 0), 0);
const calculateStayNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 1;
  return Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 1);
};

const deriveRoomAvailability = (room) => {
  const explicit = room?.isAvailable;
  if (typeof explicit === 'boolean') return explicit;
  if (room?.soldOut === true) return false;
  const availableCount = parseNumber(room?.availableCount ?? room?.countRooms ?? room?.totalCount ?? 0, 0);
  const totalRooms = parseNumber(room?.totalRooms ?? 0, 0);
  if (totalRooms > 0) return availableCount > 0;
  return availableCount > 0;
};

const requiredRoomsForGuests = (guests) => Math.max(Math.ceil(parseNumber(guests, 1) / 3), 1);

const dateRangesOverlap = (startA, endA, startB, endB) => {
  const aStart = new Date(startA);
  const aEnd = new Date(endA);
  const bStart = new Date(startB);
  const bEnd = new Date(endB);
  if ([aStart, aEnd, bStart, bEnd].some((d) => Number.isNaN(d.getTime()))) return false;
  return aStart < bEnd && bStart < aEnd;
};

const pickMonthlyOverride = (monthlyData, roomId, checkInIso, checkOutIso) => {
  if (!Array.isArray(monthlyData) || !monthlyData.length) return null;
  if (!roomId || !checkInIso || !checkOutIso) return null;
  return (
    monthlyData.find((entry) => {
      const entryRoomId = entry?.roomId || entry?._id || entry?.room?._id;
      if (!entryRoomId || String(entryRoomId) !== String(roomId)) return false;
      return dateRangesOverlap(checkInIso, checkOutIso, entry?.startDate, entry?.endDate);
    }) || null
  );
};

const getAmenityIcon = (label) => {
  const lower = label.toLowerCase();
  if (lower.includes('wi-fi') || lower.includes('wifi')) return <Wifi size={18} className="text-blue-500" />;
  if (lower.includes('ac') || lower.includes('air condition')) return <Snowflake size={18} className="text-cyan-500" />;
  if (lower.includes('tv') || lower.includes('television')) return <Tv size={18} className="text-purple-500" />;
  if (lower.includes('parking')) return <ParkingCircle size={18} className="text-gray-600" />;
  if (lower.includes('breakfast') || lower.includes('meal')) return <Coffee size={18} className="text-orange-500" />;
  if (lower.includes('restaurant') || lower.includes('dining')) return <UtensilsCrossed size={18} className="text-red-500" />;
  if (lower.includes('gym') || lower.includes('fitness')) return <Dumbbell size={18} className="text-green-600" />;
  if (lower.includes('pool') || lower.includes('swimming')) return <Waves size={18} className="text-blue-400" />;
  if (lower.includes('housekeeping')) return <Bath size={18} className="text-teal-500" />;
  if (lower.includes('24') || lower.includes('reception')) return <Clock size={18} className="text-indigo-500" />;
  return <CheckCircle2 size={18} className="text-emerald-500" />;
};

const RoomAmenity = ({ label }) => (
  <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-md">
    {getAmenityIcon(label)}
    {label}
  </span>
);

// --- Subcomponents ---

const CalendarPicker = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(checkIn || new Date()));
  const [selecting, setSelecting] = useState('checkIn');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const handleDateClick = (date) => {
    if (!date || date < today) return;
    if (selecting === 'checkIn') {
      onCheckInChange(date.toISOString());
      const currentCheckOut = new Date(checkOut);
      if (currentCheckOut <= date) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        onCheckOutChange(nextDay.toISOString());
      }
      setSelecting('checkOut');
    } else {
      const checkInDate = new Date(checkIn);
      if (date <= checkInDate) {
        onCheckInChange(date.toISOString());
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        onCheckOutChange(nextDay.toISOString());
      } else {
        onCheckOutChange(date.toISOString());
        onClose();
      }
    }
  };

  const isSelected = (date, type) => {
    if (!date) return false;
    const compareDate = type === 'checkIn' ? new Date(checkIn) : new Date(checkOut);
    return date.toDateString() === compareDate.toDateString();
  };

  const isInRange = (date) => {
    if (!date || !checkIn || !checkOut) return false;
    const d = date.getTime();
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    return d > start && d < end;
  };

  const renderMonth = (monthDate) => {
    const days = getDaysInMonth(monthDate);
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return (
      <div className="w-[260px] shrink-0">
        <h3 className="text-center font-bold text-gray-800 mb-3 text-sm">{monthName}</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 mb-2 uppercase tracking-wide">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-8" />;
            const isPast = date < today;
            const isCheckIn = isSelected(date, 'checkIn');
            const isCheckOut = isSelected(date, 'checkOut');
            const inRange = isInRange(date);
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                disabled={isPast}
                className={`h-8 w-8 mx-auto rounded-md text-xs font-semibold transition-all flex items-center justify-center
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                  ${isCheckIn || isCheckOut ? 'bg-blue-600 text-white shadow-md z-10' : ''}
                  ${inRange ? 'bg-blue-50 text-blue-600' : ''}
                  ${!isPast && !isCheckIn && !isCheckOut && !inRange ? 'text-gray-700' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Compact layout: Single month on mobile, dual on larger screens but tighter
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-auto max-w-[95vw]">
        <div className="p-3 border-b flex items-center justify-between bg-gray-50/50">
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setSelecting('checkIn')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selecting === 'checkIn' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Check-in
            </button>
            <button
              onClick={() => setSelecting('checkOut')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selecting === 'checkOut' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Check-out
            </button>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition text-gray-500">
            <X size={18} />
          </button>
        </div>
        
        <div className="p-4 flex items-start gap-4 overflow-x-auto no-scrollbar">
           {renderMonth(currentMonth)}
           <div className="w-[1px] bg-gray-100 self-stretch hidden sm:block"></div>
           <div className="hidden sm:block">
              {renderMonth(nextMonth)}
           </div>
        </div>
        
        <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
             <button
              onClick={() => {
                const prev = new Date(currentMonth);
                prev.setMonth(prev.getMonth() - 1);
                if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) setCurrentMonth(prev);
              }}
              className="p-2 hover:bg-white rounded-full text-gray-600 disabled:opacity-30 border border-transparent hover:border-gray-200 transition"
            >
              <ChevronLeft size={20} />
            </button>
             <button
              onClick={() => {
                const next = new Date(currentMonth);
                next.setMonth(next.getMonth() + 1);
                setCurrentMonth(next);
              }}
              className="p-2 hover:bg-white rounded-full text-gray-600 border border-transparent hover:border-gray-200 transition"
            >
              <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

const RoomsGuestsPopup = ({ rooms, guests, onRoomsChange, onGuestsChange, onClose }) => {
  // Initialize with correct number of rooms based on total rooms
  const [roomsList, setRoomsList] = useState(() => {
    const list = [];
    let remainingGuests = guests;
    for (let i = 0; i < rooms; i++) {
       const roomGuests = i === rooms - 1 ? Math.max(1, remainingGuests) : 1; // Distribute decently
       list.push({ guests: Math.min(3, roomGuests) }); // Clamp initial
       remainingGuests -= list[i].guests;
    }
    // Correct if distribution was weird, but simple map is usually fine
    // Fallback if mismatch:
    if (list.length !== rooms) {
        const reset = [];
        for(let i=0; i<rooms; i++) reset.push({guests: 1});
        return reset;
    }
    return list;
  });

  const updateGuests = (index, delta) => {
    setRoomsList(roomsList.map((room, i) => {
      if (i !== index) return room;
      return { ...room, guests: Math.max(1, Math.min(3, room.guests + delta)) };
    }));
  };
  
  const addRoom = () => {
      if (roomsList.length < 10) setRoomsList([...roomsList, { guests: 1 }]);
  };

  const removeRoom = () => {
      if (roomsList.length > 1) setRoomsList(prev => prev.slice(0, -1));
  };

  const handleDone = () => {
    const totalRooms = roomsList.length;
    const totalGuests = roomsList.reduce((sum, r) => sum + r.guests, 0);
    onRoomsChange(totalRooms);
    onGuestsChange(totalGuests);
    onClose();
  };

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-2xl shadow-xl border border-gray-200 z-[60] w-[320px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h4 className="font-semibold text-gray-800 text-sm">Rooms & Guests</h4>
        <button onClick={onClose}><X size={16} className="text-gray-400 hover:text-gray-600"/></button>
      </div>
      <div className="p-3 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
        {roomsList.map((room, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-sm font-medium text-gray-700">Room {index + 1}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateGuests(index, -1)}
                disabled={room.guests <= 1}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center font-bold text-gray-900 text-sm">{room.guests}</span>
              <button
                onClick={() => updateGuests(index, 1)}
                disabled={room.guests >= 3}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex gap-2">
          {roomsList.length > 1 && (
             <button onClick={removeRoom} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Remove Room"><Trash2 size={16}/></button>
          )}
          {roomsList.length < 10 && (
             <button onClick={addRoom} className="px-3 py-1.5 bg-white border border-gray-200 text-blue-600 hover:border-blue-200 hover:bg-blue-50 rounded-lg transition font-bold text-xs">+ Add Room</button>
          )}
        </div>
        <button onClick={handleDone} className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition shadow-sm">APPLY</button>
      </div>
    </div>
  );
};

const PoliciesModal = ({ policies, onClose }) => {
    if (!policies || policies.length === 0) return null;
    const policy = policies[0];

    // Helper to clean up time strings if they contain prefixes
    const cleanTime = (val) => val?.replace(/Check-(in|out) Time:/i, '').trim() || val;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
                <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-3xl">
                    <h3 className="text-xl font-bold text-gray-900">Property Policies</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20}/></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                   
                    {/* Check-in / Check-out */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Check-in</p>
                            <p className="text-2xl font-bold text-gray-900">{cleanTime(policy.checkInPolicy || policy.checkIn || '12:00 PM')}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Check-out</p>
                            <p className="text-2xl font-bold text-gray-900">{cleanTime(policy.checkOutPolicy || policy.checkOut || '11:00 AM')}</p>
                        </div>
                    </div>

                    {/* Guest & Property Rules Grid */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                            <ShieldCheck size={18} className="text-blue-600"/> Guest & Property Rules
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {[
                                { label: 'Unmarried Couples', val: policy.unmarriedCouplesAllowed, icon: <Users size={16}/> },
                                { label: 'Bachelors Allowed', val: policy.bachelorAllowed, icon: <Users size={16}/> },
                                { label: 'International Guests', val: policy.internationalGuestAllowed, icon: <MapPin size={16}/> },
                                { label: 'Pets', val: policy.petsAllowed, icon: <AlertCircle size={16}/> },
                                { label: 'Smoking', val: policy.smokingAllowed, icon: <Wind size={16}/> },
                                { label: 'Alcohol', val: policy.alcoholAllowed, icon: <UtensilsCrossed size={16}/> },
                                { label: 'Outside Food', val: policy.outsideFoodPolicy, icon: <Utensils size={16}/> },
                                { label: 'Payment Mode', val: policy.paymentMode, icon: <CreditCard size={16}/> },
                            ].map((rule, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-600 text-sm flex items-center gap-2">
                                        {rule.icon} {rule.label}
                                    </span>
                                    <span className={`text-sm font-bold ${
                                        ['Yes', 'Allowed', 'Both', 'Accepted'].includes(rule.val) 
                                        ? 'text-green-600' 
                                        : rule.val === 'No' || rule.val === 'Not Allowed' || rule.val === 'Not Accepted'
                                        ? 'text-red-500' 
                                        : 'text-gray-900'
                                    }`}>
                                        {rule.val || 'N/A'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Long Text Policies */}
                    <div className="space-y-6">
                        {policy.hotelsPolicy && (
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <FileText size={18} className="text-gray-500"/> General Hotel Policy
                                </h4>
                                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed pl-1">
                                    {policy.hotelsPolicy}
                                </p>
                            </div>
                        )}

                        {policy.cancellationPolicy && (
                            <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
                                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-red-600"/> Cancellation Policy
                                </h4>
                                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-1">
                                    {policy.cancellationPolicy}
                                </p>
                            </div>
                        )}

                        {policy.refundPolicy && (
                            <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                    <BadgePercent size={18} className="text-green-600"/> Refund Policy
                                </h4>
                                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-1">
                                    {policy.refundPolicy}
                                </p>
                            </div>
                        )}

                        {/* Fallback for older generic rules if specific ones aren't present */}
                        {!policy.hotelsPolicy && policy.rules && (
                             <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-3">Additional Rules</h4>
                                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{policy.rules}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                    <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition">Close</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

export default function BookNowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const bookingState = useSelector((store) => store.booking) || {};
  const user = useSelector((store) => store.auth?.user) || null;
  const isLoggedIn = Boolean(user?.id);

  // --- UI States ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRoomsPopup, setShowRoomsPopup] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const roomsPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roomsPopupRef.current && !roomsPopupRef.current.contains(e.target)) {
        setShowRoomsPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Data Initialization ---
  const initialTripMeta = useMemo(() => {
    if (!state?.tripMeta) {
      return { checkIn: ensureIsoDate(null, 0), checkOut: ensureIsoDate(null, 1), rooms: 1, guests: 1 };
    }
    return {
      checkIn: ensureIsoDate(state.tripMeta.checkIn, 0),
      checkOut: ensureIsoDate(state.tripMeta.checkOut, 1),
      rooms: parseNumber(state.tripMeta.rooms, 1) || 1,
      guests: parseNumber(state.tripMeta.guests, 1) || 1,
    };
  }, [state?.tripMeta]);

  const [checkInDate, setCheckInDate] = useState(initialTripMeta.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(initialTripMeta.checkOut);
  const [roomsCount, setRoomsCount] = useState(initialTripMeta.rooms);
  const [guestsCount, setGuestsCount] = useState(initialTripMeta.guests);

  useEffect(() => {
    setCheckInDate(initialTripMeta.checkIn);
    setCheckOutDate(initialTripMeta.checkOut);
    const normalizedGuests = Math.max(parseNumber(initialTripMeta.guests, 1), 1);
    const normalizedRooms = Math.max(parseNumber(initialTripMeta.rooms, 1), 1);
    const minRooms = requiredRoomsForGuests(normalizedGuests);
    setRoomsCount(Math.max(normalizedRooms, minRooms));
    setGuestsCount(normalizedGuests);
  }, [initialTripMeta]);

  // Ensure rooms are sufficient for guests, but allow user to add EXTRA rooms if they want
  useEffect(() => {
    const minRooms = requiredRoomsForGuests(guestsCount);
    if (roomsCount < minRooms) setRoomsCount(minRooms);
  }, [guestsCount]); // removed roomsCount dep to allow manual increase

  // Ensure max guests logic (3 per room)
  useEffect(() => {
    const maxGuests = Math.max(parseNumber(roomsCount, 1) * 3, 1);
    if (guestsCount > maxGuests) setGuestsCount(maxGuests);
  }, [roomsCount, guestsCount]);

  // --- Hotel Data Logic ---
  const navigationHotel = state?.hotel || null;
  const navigationHotelId = normalizeHotelId(state?.hotelId) || deriveHotelId(navigationHotel);
  const storeHotel = bookingState.bookingData;
  const storeHotelId = deriveHotelId(storeHotel);
  const hotelId = navigationHotelId || storeHotelId;
  const hotel = hotelId && storeHotelId === hotelId ? storeHotel : navigationHotel || storeHotel;

  useEffect(() => {
    if (!hotelId) return;
    dispatch(fetchBookingData(hotelId));
    dispatch(fetchMonthlyData(hotelId));
  }, [dispatch, hotelId]);

  // --- Process Rooms ---
  const rooms = useMemo(() => {
    const sourceRooms = Array.isArray(hotel?.rooms) && hotel.rooms.length ? hotel.rooms : null;
    if (!sourceRooms) {
      const fallbackPrice = parseNumber(hotel?.startingPrice ?? hotel?.basePrice ?? 1599, 1599);
      return [{
          id: 'primary-room',
          roomId: 'primary-room',
          name: hotel?.defaultRoomName || 'Premium room',
          area: hotel?.defaultRoomArea || 'Approx. 180 sq.ft',
          finalPrice: fallbackPrice,
          taxes: Math.round(fallbackPrice * 0.12),
          image: hotel?.coverImage || PLACEHOLDER_IMAGE,
          amenities: normalizeAmenities(hotel?.amenities, DEFAULT_AMENITIES).slice(0, 4),
          isAvailable: true,
          availableCount: 5,
          gstPercent: 12,
          priceWithGST: Math.round(fallbackPrice * 1.12),
        }];
    }
    return sourceRooms.map((room, index) => {
      const resolvedPrice = parseNumber(room.finalPrice ?? room.discountedPrice ?? room.price ?? room.priceWithGST, 0) || extractPriceCandidate(room) || 1599;
      
      // Fix: Correctly map offer details from the new payload structure
      const isOffer = Boolean(room.isOffer || room.offerApplied);
      const offerName = room.offerName || room.offerTitle || '';
      const offerValue = parseNumber(room.offerPriceLess || room.offerValue, 0);

      return {
        id: room._id || room.id || room.roomId || `room-${index + 1}`,
        roomId: room._id || room.id || room.roomId || `room-${index + 1}`,
        name: room.name || room.type || `Room ${index + 1}`,
        area: room.size || room.area || 'Approx. 180 sq.ft',
        finalPrice: resolvedPrice,
        taxes: Math.round(parseNumber(room.gstAmount ?? room.taxes ?? resolvedPrice * 0.12, 0)),
        gstPercent: parseNumber(room.gstPercent ?? room.gstPercentage ?? 0, 0),
        priceWithGST: parseNumber(room.priceWithGST ?? 0, 0),
        image: room.images?.[0] || room.image || hotel?.images?.[index] || hotel?.coverImage || PLACEHOLDER_IMAGE,
        amenities: normalizeAmenities(room.amenities, DEFAULT_AMENITIES).slice(0, 4),
        isAvailable: deriveRoomAvailability(room),
        availableCount: parseNumber(room?.availableCount ?? room?.countRooms ?? room?.totalCount ?? 0, 0),
        
        // Updated Offer Mapping
        offerApplied: isOffer,
        offerTitle: offerName,
        offerValue: offerValue,
        offerPercent: parseNumber(room?.offerPercent ?? 0, 0),
        isSpecialPrice: Boolean(room?.isSpecialPrice),
        originalPrice: parseNumber(room?.originalPrice ?? room?.basePrice ?? room?.price ?? 0, 0),
      };
    });
  }, [hotel]);

  const [selectedRoomId, setSelectedRoomId] = useState(() => rooms[0]?.id);
  
  useEffect(() => {
    if (!rooms.length) return;
    const selected = rooms.find((room) => room.id === selectedRoomId);
    if (selected && selected.isAvailable) return;
    const firstAvailable = rooms.find((room) => room.isAvailable) || rooms[0];
    if (firstAvailable?.id && firstAvailable.id !== selectedRoomId) {
      setSelectedRoomId(firstAvailable.id);
    }
  }, [rooms, selectedRoomId]);

  const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || rooms[0], [rooms, selectedRoomId]);

  // --- Pricing Logic ---
  const monthlyOverride = useMemo(
    () => pickMonthlyOverride(bookingState.monthlyData, selectedRoom?.roomId, checkInDate, checkOutDate),
    [bookingState.monthlyData, checkInDate, checkOutDate, selectedRoom?.roomId]
  );

  const effectiveRoomNightlyPrice = useMemo(() => {
    if (!selectedRoom) return 0;
    const overridePrice = parseNumber(monthlyOverride?.monthPrice, 0);
    return overridePrice > 0 ? overridePrice : parseNumber(selectedRoom.finalPrice, 0);
  }, [monthlyOverride?.monthPrice, selectedRoom]);

  const selectedRoomsPayload = useMemo(() => {
    if (!selectedRoom) return [];
    return [{
      _id: selectedRoom.roomId,
      roomId: selectedRoom.roomId,
      name: selectedRoom.name,
      type: selectedRoom.name,
      gstPercent: selectedRoom.gstPercent,
      priceWithGST: selectedRoom.priceWithGST,
      price: effectiveRoomNightlyPrice,
      finalPrice: effectiveRoomNightlyPrice,
      monthlyPriceApplied: Boolean(monthlyOverride),
      monthlyPriceMeta: monthlyOverride ? {
          startDate: monthlyOverride.startDate,
          endDate: monthlyOverride.endDate,
          monthPrice: monthlyOverride.monthPrice,
          sourceId: monthlyOverride._id,
        } : undefined,
    }];
  }, [effectiveRoomNightlyPrice, monthlyOverride, selectedRoom]);

  const [guestDetails, setGuestDetails] = useState({
    name: user?.name || user?.displayName || '',
    email: user?.email || '',
    phone: user?.mobile || '',
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    setGuestDetails({
      name: user?.name || user?.displayName || '',
      email: user?.email || '',
      phone: user?.mobile || '',
    });
  }, [isLoggedIn, user]);

  const [couponCode, setCouponCode] = useState(() => state?.priceDetails?.coupon || '');
  const [isCouponApplied, setIsCouponApplied] = useState(Boolean(state?.priceDetails?.coupon));
  const [discountPrice, setDiscountPrice] = useState(() => parseNumber(state?.priceDetails?.discount || 0));
  const [gstAmount, setGstAmount] = useState(() => parseNumber(state?.priceDetails?.gstAmount || 0));
  const [bookingStatus, setBookingStatus] = useState(null);

  const nights = useMemo(() => calculateStayNights(checkInDate, checkOutDate), [checkInDate, checkOutDate]);
  
  // --- Food Logic ---
  const availableFoods = useMemo(() => (Array.isArray(hotel?.foods) ? hotel.foods : []), [hotel?.foods]);
  const [selectedFood, setSelectedFood] = useState(() => {
    const initial = state?.selectedFood;
    return Array.isArray(initial) ? initial : [];
  });

  const upsertFood = useCallback((food, nextQty) => {
    const qty = Math.max(parseNumber(nextQty, 0), 0);
    const foodId = food?.foodId || food?._id || food?.id || food?.name;
    if (!foodId) return;
    setSelectedFood((prev) => {
      const existing = Array.isArray(prev) ? prev : [];
      const idx = existing.findIndex((x) => String(x.foodId || x._id || x.id || x.name) === String(foodId));
      if (qty <= 0) return idx >= 0 ? existing.filter((_, i) => i !== idx) : existing;
      const nextItem = {
        ...food, foodId, name: food?.name, price: parseNumber(food?.price, 0), quantity: qty, totalPrice: parseNumber(food?.price, 0) * qty,
      };
      if (idx >= 0) {
        const copy = [...existing];
        copy[idx] = nextItem;
        return copy;
      }
      return [...existing, nextItem];
    });
  }, []);

  const roomNightlyTotal = effectiveRoomNightlyPrice;
  const foodTotal = useMemo(() => sumFoodSelections(selectedFood), [selectedFood]);
  const baseSubtotal = roomNightlyTotal * roomsCount * nights;
  const grossAmount = baseSubtotal + foodTotal;
  const subtotalAfterDiscount = Math.max(grossAmount - discountPrice, 0);
  const finalPayableTotal = subtotalAfterDiscount + gstAmount;

  const priceSummary = useMemo(() => ({
    roomSubtotal: Math.round(baseSubtotal),
    addonsTotal: Math.round(foodTotal),
    discount: Math.round(Math.max(discountPrice, 0)),
    taxes: Math.round(Math.max(gstAmount, 0)),
    netPay: Math.max(Math.round(finalPayableTotal), 0),
  }), [baseSubtotal, foodTotal, discountPrice, gstAmount, finalPayableTotal]);

  const guestFormValid = useMemo(() => {
    if (isLoggedIn) return true;
    const nameValid = (guestDetails.name || '').trim().length >= 2;
    const phoneDigits = (guestDetails.phone || '').replace(/[^0-9]/g, '');
    return nameValid && phoneDigits.length >= 6;
  }, [guestDetails, isLoggedIn]);

  const { handleApplyCoupon, handleOfflineBooking, recalculateGst } = useBookingOperations({
    hotelId, hotelData: hotel, user, guestDetails, selectedRooms: selectedRoomsPayload, selectedFood, couponCode, roomsCount, guestsCount, checkInDate, checkOutDate, finalTotal: priceSummary.netPay, discountPrice, setDiscountPrice, setIsCouponApplied, setGstAmount, toBeCheckRoomNumber: roomsCount,
  });

  useEffect(() => {
    if (!selectedRoomsPayload.length) return;
    recalculateGst();
  }, [selectedRoomsPayload, roomsCount, nights, discountPrice, selectedFood, recalculateGst]);

  const [offlineBookingLoading, setOfflineBookingLoading] = useState(false);
  const triggerOfflineBooking = useCallback(async () => {
    if (offlineBookingLoading) return;
    setOfflineBookingLoading(true);
    const success = await handleOfflineBooking?.();
    if (success) {
        // Updated Status Logic for Display
        const status = roomsCount > 3 ? 'Pending' : 'Confirmed';
        setBookingStatus({ type: 'offline', status, reference: `HTL-${Date.now()}`, amount: priceSummary.netPay });
    }
    setOfflineBookingLoading(false);
  }, [handleOfflineBooking, offlineBookingLoading, priceSummary.netPay, roomsCount]);

  // --- Display Info ---
  const hotelName = hotel?.hotelName || hotel?.name || 'Selected property';
  const hotelAddress = hotel?.address || [hotel?.landmark, hotel?.city, hotel?.state].filter(Boolean).join(', ') || 'Address on confirmation';
  const hotelRating = Number.isFinite(Number(hotel?.rating)) ? Number(hotel.rating) : null;
  const hotelDescription = hotel?.description || hotel?.about || 'Experience a comfortable stay with us.';
  const allAmenities = useMemo(() => [...new Set(normalizeAmenities(hotel?.amenities, DEFAULT_AMENITIES))], [hotel?.amenities]);
  const galleryImages = useMemo(() => {
    const collected = [];
    if (Array.isArray(hotel?.images)) collected.push(...hotel.images.filter(Boolean));
    if (hotel?.coverImage) collected.unshift(hotel.coverImage);
    const unique = Array.from(new Set(collected));
    return unique.length ? unique : [PLACEHOLDER_IMAGE];
  }, [hotel]);

  // Format Helpers
  const formatDateShort = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
  };
  const getWeekday = (isoDate) => new Date(isoDate).toLocaleDateString('en-US', { weekday: 'short' });

  if (!hotel) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      {/* --- Modals --- */}
      {showCalendar && (
        <CalendarPicker
          checkIn={checkInDate}
          checkOut={checkOutDate}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
          onClose={() => setShowCalendar(false)}
        />
      )}
      
      {showPolicies && (
          <PoliciesModal policies={hotel?.policies} onClose={() => setShowPolicies(false)} />
      )}

      {/* --- Header / Navigation --- */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
            <ChevronLeft size={22} />
          </button>
          <div>
             <h1 className="text-lg font-bold text-gray-900 leading-tight">{hotelName}</h1>
             <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12}/> {hotel?.city}, {hotel?.state}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* --- Top Section: Gallery & Quick Info --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
           {/* Gallery (Left - 8 cols) */}
           <div className="lg:col-span-8 h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-sm relative group">
              <img src={galleryImages[0]} alt={hotelName} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                   {hotelRating > 0 && <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1"><Star size={10} fill="white"/> {hotelRating}</span>}
                   {rooms.some(r => r.offerApplied) && <span className="bg-rose-500/90 backdrop-blur-md px-2 py-1 rounded-md text-xs border border-white/20 font-bold animate-pulse">Hot Deal</span>}
                </div>
                <h2 className="text-2xl font-bold">{hotelName}</h2>
                <p className="text-sm opacity-90 line-clamp-1">{hotelAddress}</p>
              </div>
              {galleryImages.length > 1 && (
                  <div className="absolute bottom-6 right-6 flex gap-2">
                      {galleryImages.slice(1, 4).map((img, i) => (
                          <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/50 cursor-pointer hover:border-white transition">
                              <img src={img} className="w-full h-full object-cover" alt="thumb" />
                          </div>
                      ))}
                      {galleryImages.length > 4 && (
                          <div className="w-16 h-16 rounded-xl bg-black/60 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                              +{galleryImages.length - 4}
                          </div>
                      )}
                  </div>
              )}
           </div>
           
           {/* Map/Policies Summary (Right - 4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex-1">
                 <div className="flex items-center gap-2 mb-3 text-blue-600">
                    <ShieldCheck size={20} />
                    <span className="font-bold text-sm">Safe & Secure Stay</span>
                 </div>
                 <p className="text-sm text-gray-600 mb-4">Verified property ensuring high standards of hygiene and safety for all guests.</p>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-xl">
                       <p className="text-xs text-blue-600 font-semibold mb-1">Check-in</p>
                       <p className="text-lg font-bold text-gray-800">{hotel?.policies?.[0]?.checkIn || '12:00 PM'}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl">
                       <p className="text-xs text-blue-600 font-semibold mb-1">Check-out</p>
                       <p className="text-lg font-bold text-gray-800">{hotel?.policies?.[0]?.checkOut || '11:00 AM'}</p>
                    </div>
                 </div>
              </div>
              <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 flex items-center justify-between">
                 <div>
                    <p className="font-bold text-orange-800 text-lg">Member Deal</p>
                    <p className="text-xs text-orange-600">Log in to save extra on this booking!</p>
                 </div>
                 <div className="bg-white p-3 rounded-full text-orange-500 shadow-sm">
                    <Percent size={24} />
                 </div>
              </div>
           </div>
        </div>

        {/* --- Main Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* --- Left Column: Content --- */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">About this property</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">{hotelDescription}</p>
              </section>

              {/* Amenities (ALL) */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" size={20}/> Amenities
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                    {allAmenities.map((amenity, idx) => (
                       <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                             {getAmenityIcon(amenity)}
                          </div>
                          <span>{amenity}</span>
                       </div>
                    ))}
                 </div>
              </section>

              {/* Room Selection */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Choose your room</h3>
                 <div className="space-y-4">
                    {rooms.map(room => {
                       const isSelected = room.id === selectedRoomId;
                       return (
                          <div 
                             key={room.id}
                             onClick={() => room.isAvailable && setSelectedRoomId(room.id)}
                             className={`relative border-2 rounded-2xl p-4 transition cursor-pointer ${isSelected ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'} ${!room.isAvailable ? 'opacity-60 pointer-events-none grayscale' : ''}`}
                          >
                             {isSelected && <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg z-10">Selected</div>}
                             {room.offerApplied && !isSelected && (
                                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg z-10">
                                   {room.offerValue > 0 ? `Save ₹${room.offerValue}` : room.offerTitle || 'Limited Offer'}
                                </div>
                             )}
                             
                             <div className="flex gap-4">
                                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                                   <img src={room.image} className="w-full h-full object-cover" alt={room.name} />
                                </div>
                                <div className="flex-1">
                                   <div className="flex justify-between items-start">
                                      <div>
                                         <h4 className="font-bold text-gray-900">{room.name}</h4>
                                         <p className="text-xs text-gray-500 mb-2">{room.area} • Max 3 Guests</p>
                                         <div className="flex flex-wrap gap-1">
                                            {room.amenities.slice(0, 3).map(am => <span key={am} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">{am}</span>)}
                                         </div>
                                      </div>
                                      <div className="text-right">
                                         <p className="text-lg font-bold text-gray-900">₹{formatCurrency(room.finalPrice)}</p>
                                         <p className="text-xs text-gray-400 line-through">₹{formatCurrency(room.finalPrice * 1.4)}</p>
                                         <p className="text-[10px] text-gray-500">+ ₹{formatCurrency(room.taxes)} taxes</p>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </section>

              {/* Food Addons */}
              {availableFoods.length > 0 && (
                 <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Add Meals</h3>
                    <div className="space-y-3">
                       {availableFoods.map((food, idx) => {
                          const foodId = food?.foodId || food?._id || food?.id || food?.name;
                          const selected = selectedFood.find(x => String(x.foodId || x._id || x.id || x.name) === String(foodId));
                          const qty = Math.max(parseNumber(selected?.quantity, 0), 0);
                          return (
                             <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition">
                                <div>
                                   <p className="font-semibold text-gray-800 text-sm">{food.name}</p>
                                   <p className="text-xs text-gray-500">₹{formatCurrency(food.price)} per item</p>
                                </div>
                                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                                   <button onClick={(e) => { e.stopPropagation(); upsertFood(food, qty - 1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-blue-600 font-bold">-</button>
                                   <span className="w-4 text-center text-sm font-semibold">{qty}</span>
                                   <button onClick={(e) => { e.stopPropagation(); upsertFood(food, qty + 1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-blue-600 font-bold">+</button>
                                </div>
                             </div>
                          );
                       })}
                    </div>
                 </section>
              )}

              {/* Policies (ALL) - Preview & View More */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Info className="text-blue-500" size={20}/> Hotel Policies
                     </h3>
                     <button onClick={() => setShowPolicies(true)} className="text-blue-600 text-sm font-semibold hover:underline">View All Policies</button>
                 </div>
                 <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                          { label: 'Pets', val: hotel?.policies?.[0]?.petsAllowed, icon: <AlertCircle size={16}/> },
                          { label: 'Smoking', val: hotel?.policies?.[0]?.smokingAllowed, icon: <Wind size={16}/> },
                          { label: 'Alcohol', val: hotel?.policies?.[0]?.alcoholAllowed, icon: <UtensilsCrossed size={16}/> },
                          { label: 'Unmarried Couples', val: hotel?.policies?.[0]?.unmarriedCouplesAllowed, icon: <Users size={16}/> }
                       ].map((rule, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                             <div className="flex items-center gap-2 text-sm text-gray-600">
                                {rule.icon} {rule.label}
                             </div>
                             <span className={`text-sm font-bold ${rule.val === 'Yes' || rule.val === 'Allowed' ? 'text-green-600' : 'text-red-500'}`}>
                                {rule.val || 'Restricted'}
                             </span>
                          </div>
                       ))}
                    </div>
                 </div>
              </section>
           </div>

           {/* --- Right Column: Booking Sidebar --- */}
           <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                 
                 {/* Booking Widget Card */}
                 <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-visible relative z-40">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white rounded-t-3xl">
                       <h3 className="font-bold text-lg">Your Stay</h3>
                       <p className="text-xs text-blue-100 opacity-90">{nights} Night{nights > 1 ? 's' : ''} at {hotelName}</p>
                    </div>
                    
                    <div className="p-5 space-y-4">
                       {/* Date & Guest Selectors */}
                       <div className="flex gap-3 relative z-50">
                          <button onClick={() => setShowCalendar(true)} className="flex-1 flex flex-col items-start p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition border border-transparent hover:border-blue-200">
                             <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dates</span>
                             <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mt-1">
                                <CalendarDays size={16} className="text-blue-500"/>
                                <span>{formatDateShort(checkInDate)} - {formatDateShort(checkOutDate)}</span>
                             </div>
                          </button>
                          
                          <div className="relative" ref={roomsPopupRef}>
                             <button onClick={() => setShowRoomsPopup(!showRoomsPopup)} className="h-full flex flex-col items-start p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition border border-transparent hover:border-blue-200 min-w-[100px]">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Rooms</span>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mt-1">
                                   <Users size={16} className="text-blue-500"/>
                                   <span>{roomsCount} R, {guestsCount} G</span>
                                </div>
                             </button>
                             {showRoomsPopup && (
                                <RoomsGuestsPopup rooms={roomsCount} guests={guestsCount} onRoomsChange={setRoomsCount} onGuestsChange={setGuestsCount} onClose={() => setShowRoomsPopup(false)} />
                             )}
                          </div>
                       </div>

                       <hr className="border-dashed border-gray-200"/>

                       {/* Price Summary */}
                       <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                             <span>Room Price ({nights} nights)</span>
                             <span>₹{formatCurrency(priceSummary.roomSubtotal)}</span>
                          </div>
                          {priceSummary.addonsTotal > 0 && (
                             <div className="flex justify-between text-sm text-gray-600">
                                <span>Meals & Addons</span>
                                <span>₹{formatCurrency(priceSummary.addonsTotal)}</span>
                             </div>
                          )}
                          <div className="flex justify-between text-sm text-gray-600">
                             <span>Taxes & Fees</span>
                             <span>₹{formatCurrency(priceSummary.taxes)}</span>
                          </div>
                          {priceSummary.discount > 0 && (
                             <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Total Savings</span>
                                <span>- ₹{formatCurrency(priceSummary.discount)}</span>
                             </div>
                          )}
                       </div>

                       <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center border border-gray-100">
                          <span className="font-bold text-gray-900">Total Payable</span>
                          <span className="font-bold text-xl text-blue-600">₹{formatCurrency(priceSummary.netPay)}</span>
                       </div>

                       {/* Coupon */}
                       <div className="flex gap-2">
                          <div className="relative flex-1">
                             <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                             <input 
                                type="text" 
                                placeholder="Have a coupon?" 
                                value={couponCode} 
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                             />
                          </div>
                          <button 
                             onClick={() => handleApplyCoupon?.(couponCode)} 
                             disabled={!couponCode} 
                             className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                             APPLY
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Guest Details Form */}
                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users size={18} className="text-gray-500"/> Guest Details</h4>
                    <div className="space-y-3">
                       <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={guestDetails.name} 
                          onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})} 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                       />
                       <div className="grid grid-cols-2 gap-3">
                          <input 
                             type="tel" 
                             placeholder="Mobile Number" 
                             value={guestDetails.phone} 
                             onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})} 
                             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                          />
                          <input 
                             type="email" 
                             placeholder="Email (Optional)" 
                             value={guestDetails.email} 
                             onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})} 
                             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                          />
                       </div>
                       {!guestFormValid && <p className="text-xs text-red-500 mt-1">* Please enter valid name and mobile number.</p>}
                    </div>
                 </div>

                 {/* Payment Actions */}
                 <button
                    disabled={!guestFormValid || offlineBookingLoading || priceSummary.netPay <= 0}
                    onClick={triggerOfflineBooking}
                    className={`w-full py-4 bg-gradient-to-r ${roomsCount > 3 ? 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white font-bold text-lg rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
                 >
                    {offlineBookingLoading ? <Loader2 className="animate-spin" size={24}/> : (
                       <>
                          <span>{roomsCount > 3 ? 'Request Group Booking' : 'Book Now & Pay at Hotel'}</span>
                          <ChevronRight size={20} className="opacity-80"/>
                       </>
                    )}
                 </button>
                 <p className="text-center text-xs text-gray-400">
                    {roomsCount > 3 ? 'Large bookings require manual confirmation.' : 'Secure booking. No prepayment required today.'}
                 </p>

                 {bookingStatus?.type === 'offline' && (
                    <div className={`bg-${bookingStatus.status === 'Pending' ? 'orange' : 'green'}-50 border border-${bookingStatus.status === 'Pending' ? 'orange' : 'green'}-200 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4`}>
                       <CheckCircle2 size={24} className={`text-${bookingStatus.status === 'Pending' ? 'orange' : 'green'}-600 shrink-0`}/>
                       <div>
                          <h4 className={`font-bold text-${bookingStatus.status === 'Pending' ? 'orange' : 'green'}-800`}>
                              {bookingStatus.status === 'Pending' ? 'Request Received' : 'Booking Confirmed!'}
                          </h4>
                          <p className={`text-sm text-${bookingStatus.status === 'Pending' ? 'orange' : 'green'}-700 mt-1`}>Reference: {bookingStatus.reference}</p>
                          <p className={`text-xs text-${bookingStatus.status === 'Pending' ? 'orange' : 'green'}-600 mt-1`}>
                              {bookingStatus.status === 'Pending' ? 'Our team will contact you shortly for confirmation.' : 'A confirmation has been sent to your details.'}
                          </p>
                       </div>
                    </div>
                 )}

              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
