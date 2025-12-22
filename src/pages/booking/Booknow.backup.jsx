import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Info,
  Loader2,
  MapPin,
  Minus,
  ParkingCircle,
  Percent,
  Plus,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Tv,
  Users,
  Utensils,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
  X,
  Coffee,
  Dumbbell,
  Bath
} from 'lucide-react';
import useBookingOperations from './hooks/useBookingOperations';
import { fetchBookingData, fetchMonthlyData } from '@/redux/slices/bookingSlice';

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
      .map((x) => (typeof x === 'string' ? x.trim() : x))
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
  (Array.isArray(items) ? items : []).reduce((sum, item) => {
    const qty = Math.max(parseNumber(item?.quantity ?? 0, 0), 0);
    if (!qty) return sum;
    const unitFromPrice = parseNumber(item?.price ?? 0, 0);
    const unitFromTotal = item?.totalPrice ? parseNumber(item.totalPrice, 0) / Math.max(qty, 1) : 0;
    const unit = unitFromPrice > 0 ? unitFromPrice : unitFromTotal;
    return sum + qty * Math.max(unit, 0);
  }, 0);
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
  const lower = String(label || '').toLowerCase();
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

const SectionCard = ({ title, icon, right, children }) => (
  <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between gap-3 mb-4">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {right}
    </div>
    {children}
  </section>
);

const InfoRows = ({ rows }) => (
  <div className="rounded-2xl border border-gray-100 overflow-hidden">
    <div className="divide-y divide-gray-100">
      {rows
        .filter((r) => r && (r.value !== undefined || r.value !== null))
        .map((row, idx) => (
          <div key={idx} className="flex items-start justify-between gap-3 px-4 py-3 bg-white">
            <div className="text-xs sm:text-sm text-gray-500 shrink-0">{row.label}</div>
            <div className={`text-xs sm:text-sm font-semibold text-right ${row.valueClass || 'text-gray-900'}`}>
              {row.value}
            </div>
          </div>
        ))}
    </div>
  </div>
);

const badgeForPolicy = (val) => {
  const raw = val === undefined || val === null ? '' : String(val).trim();
  const norm = raw.toLowerCase();
  const yes = ['yes', 'allowed', 'accepted', 'both', 'true'].includes(norm);
  const no = ['no', 'not allowed', 'not accepted', 'false'].includes(norm);
  if (yes) return { text: raw || 'Allowed', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
  if (no) return { text: raw || 'Not allowed', cls: 'bg-rose-50 text-rose-700 border-rose-100' };
  if (!raw) return { text: 'N/A', cls: 'bg-gray-50 text-gray-700 border-gray-100' };
  return { text: raw, cls: 'bg-blue-50 text-blue-700 border-blue-100' };
};

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
      return;
    }
    const checkInDate = new Date(checkIn);
    if (date <= checkInDate) {
      onCheckInChange(date.toISOString());
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      onCheckOutChange(nextDay.toISOString());
      return;
    }
    onCheckOutChange(date.toISOString());
    onClose();
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
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
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
                className={`h-8 w-8 mx-auto rounded-md text-xs font-semibold transition-all flex items-center justify-center ${
                  isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
                } ${isCheckIn || isCheckOut ? 'bg-blue-600 text-white shadow-md z-10' : ''} ${
                  inRange ? 'bg-blue-50 text-blue-600' : ''
                } ${!isPast && !isCheckIn && !isCheckOut && !inRange ? 'text-gray-700' : ''}`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

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
          <div className="hidden sm:block">{renderMonth(nextMonth)}</div>
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
  const [roomsList, setRoomsList] = useState(() => {
    const safeRooms = Math.max(parseNumber(rooms, 1), 1);
    const safeGuests = Math.max(parseNumber(guests, 1), 1);
    const list = [];
    let remainingGuests = safeGuests;
    for (let i = 0; i < safeRooms; i++) {
      const roomGuests = i === safeRooms - 1 ? Math.max(1, remainingGuests) : 1;
      list.push({ guests: Math.min(3, Math.max(1, roomGuests)) });
      remainingGuests -= list[i].guests;
    }
    if (list.length !== safeRooms) {
      const reset = [];
      for (let i = 0; i < safeRooms; i++) reset.push({ guests: 1 });
      return reset;
    }
    return list;
  });

  const updateGuests = (index, delta) => {
    setRoomsList((prev) =>
      prev.map((room, i) => {
        if (i !== index) return room;
        return { ...room, guests: Math.max(1, Math.min(3, room.guests + delta)) };
      })
    );
  };

  const addRoom = () => {
    setRoomsList((prev) => (prev.length < 10 ? [...prev, { guests: 1 }] : prev));
  };

  const removeRoom = () => {
    setRoomsList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleDone = () => {
    const totalRooms = roomsList.length;
    const totalGuests = roomsList.reduce((sum, r) => sum + Math.max(parseNumber(r.guests, 1), 1), 0);
    onRoomsChange(totalRooms);
    onGuestsChange(totalGuests);
    onClose();
  };

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-2xl shadow-xl border border-gray-200 z-[60] w-[320px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h4 className="font-semibold text-gray-800 text-sm">Rooms & Guests</h4>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition">
          <X size={16} className="text-gray-500" />
        </button>
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
            <button onClick={removeRoom} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Remove Room">
              <Trash2 size={16} />
            </button>
          )}
          {roomsList.length < 10 && (
            <button
              onClick={addRoom}
              className="px-3 py-1.5 bg-white border border-gray-200 text-blue-600 hover:border-blue-200 hover:bg-blue-50 rounded-lg transition font-bold text-xs"
            >
              + Add Room
            </button>
          )}
        </div>
        <button onClick={handleDone} className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition shadow-sm">
          APPLY
        </button>
      </div>
    </div>
  );
};

const PoliciesModal = ({ policies, onClose }) => {
  if (!policies || policies.length === 0) return null;
  const policy = policies[0] || {};
  const cleanTime = (val) => (val ? String(val).replace(/Check-(in|out) Time:/i, '').trim() : '');

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-3xl">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Property Policies</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Check-in</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{cleanTime(policy.checkInPolicy || policy.checkIn) || '12:00 PM'}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Check-out</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{cleanTime(policy.checkOutPolicy || policy.checkOut) || '11:00 AM'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
              <ShieldCheck size={18} className="text-blue-600" /> Guest & Property Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {[
                { label: 'Unmarried Couples', val: policy.unmarriedCouplesAllowed, icon: <Users size={16} /> },
                { label: 'Bachelors Allowed', val: policy.bachelorAllowed, icon: <Users size={16} /> },
                { label: 'International Guests', val: policy.internationalGuestAllowed, icon: <MapPin size={16} /> },
                { label: 'Pets', val: policy.petsAllowed, icon: <AlertCircle size={16} /> },
                { label: 'Smoking', val: policy.smokingAllowed, icon: <Wind size={16} /> },
                { label: 'Alcohol', val: policy.alcoholAllowed, icon: <UtensilsCrossed size={16} /> },
                { label: 'Outside Food', val: policy.outsideFoodPolicy, icon: <Utensils size={16} /> },
                { label: 'Payment Mode', val: policy.paymentMode, icon: <CreditCard size={16} /> }
              ].map((rule, idx) => {
                const badge = badgeForPolicy(rule.val);
                return (
                  <div key={idx} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 text-sm flex items-center gap-2">
                      {rule.icon} {rule.label}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${badge.cls}`}>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {policy.hotelsPolicy && (
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-gray-500" /> General Hotel Policy
                </h4>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed pl-1">{policy.hotelsPolicy}</p>
              </div>
            )}

            {policy.cancellationPolicy && (
              <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-rose-600" /> Cancellation Policy
                </h4>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-1">{policy.cancellationPolicy}</p>
              </div>
            )}

            {policy.refundPolicy && (
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <BadgePercent size={18} className="text-emerald-600" /> Refund Policy
                </h4>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-1">{policy.refundPolicy}</p>
              </div>
            )}

            {!policy.hotelsPolicy && policy.rules && (
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3">Additional Rules</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{policy.rules}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
          <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const GalleryModal = ({ images, startIndex = 0, title, onClose }) => {
  const safeImages = Array.isArray(images) && images.length ? images : [PLACEHOLDER_IMAGE];
  const [idx, setIdx] = useState(Math.min(Math.max(startIndex, 0), safeImages.length - 1));

  const prev = () => setIdx((p) => (p - 1 + safeImages.length) % safeImages.length);
  const next = () => setIdx((p) => (p + 1) % safeImages.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, safeImages.length]);

  return (
    <div className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-sm">
      <div className="h-full w-full flex flex-col">
        <div className="px-4 py-3 flex items-center justify-between text-white">
          <div className="min-w-0">
            <div className="text-sm font-bold truncate">{title || 'Photos'}</div>
            <div className="text-xs opacity-80">
              {idx + 1}/{safeImages.length}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 pb-6">
          <div className="relative w-full max-w-4xl">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
              <img src={safeImages[idx]} alt="photo" className="w-full max-h-[75vh] object-contain" />
            </div>
            {safeImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {safeImages.slice(0, 24).map((src, i) => {
              const selected = i === idx;
              return (
                <button
                  key={`${src}-${i}`}
                  onClick={() => setIdx(i)}
                  className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border ${
                    selected ? 'border-white' : 'border-white/20'
                  }`}
                >
                  <img src={src} alt="thumb" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stars = ({ value = 0 }) => {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} size={14} className="text-yellow-500" fill="currentColor" />
      ))}
      {half ? <Star size={14} className="text-yellow-500" fill="currentColor" /> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} size={14} className="text-gray-300" />
      ))}
    </div>
  );
};

export default function BookNowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const bookingState = useSelector((store) => store.booking) || {};
  const user = useSelector((store) => store.auth?.user) || null;
  const isLoggedIn = Boolean(user?.id);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showRoomsPopup, setShowRoomsPopup] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showBookingSheet, setShowBookingSheet] = useState(false);

  const roomsPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roomsPopupRef.current && !roomsPopupRef.current.contains(e.target)) setShowRoomsPopup(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Inject compact styles for BookNow page to reduce padding/margins globally inside this view
  useEffect(() => {
    if (document.getElementById('compact-booknow-styles')) return;
    const css = `
      /* Slightly larger than compact: comfortable spacing */
      .compact-booknow .p-6{padding:.75rem !important}
      .compact-booknow .p-5{padding:.75rem !important}
      .compact-booknow .p-4{padding:.5rem !important}
      .compact-booknow .p-3{padding:.375rem !important}
      .compact-booknow .p-2{padding:.25rem !important}
      .compact-booknow .px-6{padding-left:.75rem !important;padding-right:.75rem !important}
      .compact-booknow .px-5{padding-left:.75rem !important;padding-right:.75rem !important}
      .compact-booknow .px-4{padding-left:.5rem !important;padding-right:.5rem !important}
      .compact-booknow .py-6{padding-top:.75rem !important;padding-bottom:.75rem !important}
      .compact-booknow .py-5{padding-top:.75rem !important;padding-bottom:.75rem !important}
      .compact-booknow .py-4{padding-top:.5rem !important;padding-bottom:.5rem !important}
      .compact-booknow .m-6{margin:.75rem !important}
      .compact-booknow .m-5{margin:.75rem !important}
      .compact-booknow .m-4{margin:.5rem !important}
      .compact-booknow .m-3{margin:.25rem !important}
      .compact-booknow .mx-4{margin-left:.5rem !important;margin-right:.5rem !important}
      .compact-booknow .my-4{margin-top:.5rem !important;margin-bottom:.5rem !important}
      .compact-booknow .space-y-6 > * + *{margin-top:.75rem !important}
      .compact-booknow .space-y-4 > * + *{margin-top:.5rem !important}
      .compact-booknow .rounded-3xl{border-radius:0.75rem !important}
    `;
    const el = document.createElement('style');
    el.id = 'compact-booknow-styles';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, []);

  const initialTripMeta = useMemo(() => {
    if (!state?.tripMeta) return { checkIn: ensureIsoDate(null, 0), checkOut: ensureIsoDate(null, 1), rooms: 1, guests: 1 };
    return {
      checkIn: ensureIsoDate(state.tripMeta.checkIn, 0),
      checkOut: ensureIsoDate(state.tripMeta.checkOut, 1),
      rooms: parseNumber(state.tripMeta.rooms, 1) || 1,
      guests: parseNumber(state.tripMeta.guests, 1) || 1
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

  useEffect(() => {
    const minRooms = requiredRoomsForGuests(guestsCount);
    if (roomsCount < minRooms) setRoomsCount(minRooms);
  }, [guestsCount]);

  useEffect(() => {
    const maxGuests = Math.max(parseNumber(roomsCount, 1) * 3, 1);
    if (guestsCount > maxGuests) setGuestsCount(maxGuests);
  }, [roomsCount, guestsCount]);

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

  const hotelName = hotel?.hotelName || hotel?.name || 'Selected property';
  const hotelAddress =
    hotel?.address ||
    [hotel?.landmark, hotel?.city, hotel?.state].filter(Boolean).join(', ') ||
    'Address on confirmation';
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

  const rooms = useMemo(() => {
    const sourceRooms = Array.isArray(hotel?.rooms) && hotel.rooms.length ? hotel.rooms : null;
    if (!sourceRooms) {
      const fallbackPrice = parseNumber(hotel?.startingPrice ?? hotel?.basePrice ?? 1599, 1599);
      return [
        {
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
          offerApplied: false,
          offerTitle: '',
          offerValue: 0,
          offerPercent: 0,
          isSpecialPrice: false,
          originalPrice: 0
        }
      ];
    }

    return sourceRooms.map((room, index) => {
      const resolvedPrice =
        parseNumber(room.finalPrice ?? room.discountedPrice ?? room.price ?? room.priceWithGST, 0) ||
        extractPriceCandidate(room) ||
        1599;

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
        offerApplied: isOffer,
        offerTitle: offerName,
        offerValue: offerValue,
        offerPercent: parseNumber(room?.offerPercent ?? 0, 0),
        isSpecialPrice: Boolean(room?.isSpecialPrice),
        originalPrice: parseNumber(room?.originalPrice ?? room?.basePrice ?? room?.price ?? 0, 0)
      };
    });
  }, [hotel]);

  const [selectedRoomId, setSelectedRoomId] = useState(() => rooms[0]?.id);

  useEffect(() => {
    if (!rooms.length) return;
    const selected = rooms.find((room) => room.id === selectedRoomId);
    if (selected && selected.isAvailable) return;
    const firstAvailable = rooms.find((room) => room.isAvailable) || rooms[0];
    if (firstAvailable?.id && firstAvailable.id !== selectedRoomId) setSelectedRoomId(firstAvailable.id);
  }, [rooms, selectedRoomId]);

  const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || rooms[0], [rooms, selectedRoomId]);

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
    return [
      {
        _id: selectedRoom.roomId,
        roomId: selectedRoom.roomId,
        name: selectedRoom.name,
        type: selectedRoom.name,
        gstPercent: selectedRoom.gstPercent,
        priceWithGST: selectedRoom.priceWithGST,
        price: effectiveRoomNightlyPrice,
        finalPrice: effectiveRoomNightlyPrice,
        monthlyPriceApplied: Boolean(monthlyOverride),
        monthlyPriceMeta: monthlyOverride
          ? {
              startDate: monthlyOverride.startDate,
              endDate: monthlyOverride.endDate,
              monthPrice: monthlyOverride.monthPrice,
              sourceId: monthlyOverride._id
            }
          : undefined
      }
    ];
  }, [effectiveRoomNightlyPrice, monthlyOverride, selectedRoom]);

  const [guestDetails, setGuestDetails] = useState({
    name: user?.name || user?.displayName || '',
    email: user?.email || '',
    phone: user?.mobile || ''
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    setGuestDetails({
      name: user?.name || user?.displayName || '',
      email: user?.email || '',
      phone: user?.mobile || ''
    });
  }, [isLoggedIn, user]);

  const [couponCode, setCouponCode] = useState(() => state?.priceDetails?.coupon || '');
  const [, setIsCouponApplied] = useState(Boolean(state?.priceDetails?.coupon));
  const [discountPrice, setDiscountPrice] = useState(() => parseNumber(state?.priceDetails?.discount || 0));
  const [gstAmount, setGstAmount] = useState(() => parseNumber(state?.priceDetails?.gstAmount || 0));
  const [bookingStatus, setBookingStatus] = useState(null);

  const nights = useMemo(() => calculateStayNights(checkInDate, checkOutDate), [checkInDate, checkOutDate]);

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
      const price = parseNumber(food?.price, 0);
      const nextItem = { ...food, foodId, name: food?.name, price, quantity: qty, totalPrice: price * qty };
      if (idx >= 0) {
        const copy = [...existing];
        copy[idx] = nextItem;
        return copy;
      }
      return [...existing, nextItem];
    });
  }, []);

  const foodTotal = useMemo(() => sumFoodSelections(selectedFood), [selectedFood]);
  const baseSubtotal = effectiveRoomNightlyPrice * roomsCount * nights;
  const grossAmount = baseSubtotal + foodTotal;
  const subtotalAfterDiscount = Math.max(grossAmount - discountPrice, 0);
  const finalPayableTotal = subtotalAfterDiscount + gstAmount;

  const priceSummary = useMemo(
    () => ({
      roomSubtotal: Math.round(baseSubtotal),
      addonsTotal: Math.round(foodTotal),
      discount: Math.round(Math.max(discountPrice, 0)),
      taxes: Math.round(Math.max(gstAmount, 0)),
      netPay: Math.max(Math.round(finalPayableTotal), 0)
    }),
    [baseSubtotal, foodTotal, discountPrice, gstAmount, finalPayableTotal]
  );

  const guestFormValid = useMemo(() => {
    if (isLoggedIn) return true;
    const nameValid = (guestDetails.name || '').trim().length >= 2;
    const phoneDigits = (guestDetails.phone || '').replace(/[^0-9]/g, '');
    return nameValid && phoneDigits.length >= 6;
  }, [guestDetails, isLoggedIn]);

  const { handleApplyCoupon, handleOfflineBooking, recalculateGst } = useBookingOperations({
    hotelId,
    hotelData: hotel,
    user,
    guestDetails,
    selectedRooms: selectedRoomsPayload,
    selectedFood,
    couponCode,
    roomsCount,
    guestsCount,
    checkInDate,
    checkOutDate,
    finalTotal: priceSummary.netPay,
    discountPrice,
    setDiscountPrice,
    setIsCouponApplied,
    setGstAmount,
    toBeCheckRoomNumber: roomsCount
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
      const status = roomsCount > 3 ? 'Pending' : 'Confirmed';
      setBookingStatus({ type: 'offline', status, reference: `HTL-${Date.now()}`, amount: priceSummary.netPay });
      setShowBookingSheet(false);
    }
    setOfflineBookingLoading(false);
  }, [handleOfflineBooking, offlineBookingLoading, priceSummary.netPay, roomsCount]);

  const formatDateShort = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
  };

  const policy0 = hotel?.policies?.[0] || {};
  const policyHighlights = useMemo(() => {
    const base = [
      { label: 'Check-in', val: policy0.checkInPolicy || policy0.checkIn },
      { label: 'Check-out', val: policy0.checkOutPolicy || policy0.checkOut },
      { label: 'Unmarried Couples', val: policy0.unmarriedCouplesAllowed },
      { label: 'Bachelors', val: policy0.bachelorAllowed },
      { label: 'Pets', val: policy0.petsAllowed },
      { label: 'Smoking', val: policy0.smokingAllowed },
      { label: 'Alcohol', val: policy0.alcoholAllowed },
      { label: 'Outside Food', val: policy0.outsideFoodPolicy },
      { label: 'Payment Mode', val: policy0.paymentMode }
    ];
    return base.filter((x) => x.val !== undefined && x.val !== null && String(x.val).trim() !== '').slice(0, 6);
  }, [policy0]);

  const reviewsArray = useMemo(() => {
    const candidates = [hotel?.reviews, hotel?.review, hotel?.ratings, hotel?.testimonials];
    const arr = candidates.find((x) => Array.isArray(x));
    return Array.isArray(arr) ? arr : [];
  }, [hotel]);

  const reviewCount = useMemo(() => {
    const direct =
      parseNumber(hotel?.reviewCount ?? hotel?.reviewsCount ?? hotel?.ratingsCount ?? hotel?.totalReviews ?? 0, 0) || 0;
    return direct > 0 ? direct : reviewsArray.length;
  }, [hotel, reviewsArray.length]);

  const safeRating = useMemo(() => {
    if (hotelRating !== null && hotelRating !== undefined && !Number.isNaN(hotelRating)) return Math.max(0, Math.min(5, hotelRating));
    const fromReviews = reviewsArray
      .map((r) => parseNumber(r?.rating ?? r?.stars ?? r?.score ?? 0, 0))
      .filter((x) => x > 0 && x <= 5);
    if (!fromReviews.length) return null;
    const avg = fromReviews.reduce((a, b) => a + b, 0) / fromReviews.length;
    return Math.round(avg * 10) / 10;
  }, [hotelRating, reviewsArray]);

  const bookingStatusStyles = useMemo(() => {
    const pending = bookingStatus?.status === 'Pending';
    return pending
      ? {
          wrap: 'bg-orange-50 border-orange-200',
          icon: 'text-orange-600',
          title: 'text-orange-800',
          text: 'text-orange-700',
          sub: 'text-orange-600'
        }
      : {
          wrap: 'bg-emerald-50 border-emerald-200',
          icon: 'text-emerald-600',
          title: 'text-emerald-800',
          text: 'text-emerald-700',
          sub: 'text-emerald-600'
        };
  }, [bookingStatus?.status]);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  const AMENITIES_PREVIEW_COUNT = 10;
const [showAllAmenities, setShowAllAmenities] = useState(false);

const amenitiesPreview = useMemo(
  () => (Array.isArray(allAmenities) ? allAmenities.slice(0, AMENITIES_PREVIEW_COUNT) : []),
  [allAmenities]
);

const amenitiesRemainingCount = useMemo(() => {
  const total = Array.isArray(allAmenities) ? allAmenities.length : 0;
  return Math.max(total - AMENITIES_PREVIEW_COUNT, 0);
}, [allAmenities]);

const amenitiesToRender = showAllAmenities ? allAmenities : amenitiesPreview;


  const BookingPanel = ({ compact = false }) => (
    <div className={`${compact ? '' : 'bg-white rounded-3xl shadow-lg border border-gray-100 overflow-visible relative z-40'}`}>
      {!compact && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white rounded-t-3xl">
          <h3 className="font-bold text-lg">Your Stay</h3>
          <p className="text-xs text-blue-100 opacity-90">
            {nights} Night{nights > 1 ? 's' : ''} at {hotelName}
          </p>
        </div>
      )}

      <div className={`${compact ? '' : 'p-5'} space-y-4`}>
        <div className="flex gap-3 relative z-50">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex-1 flex flex-col items-start p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition border border-transparent hover:border-blue-200"
          >
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dates</span>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mt-1">
              <CalendarDays size={16} className="text-blue-500" />
              <span>
                {formatDateShort(checkInDate)} - {formatDateShort(checkOutDate)}
              </span>
            </div>
          </button>

          <div className="relative" ref={roomsPopupRef}>
            <button
              onClick={() => setShowRoomsPopup(!showRoomsPopup)}
              className="h-full flex flex-col items-start p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition border border-transparent hover:border-blue-200 min-w-[120px]"
            >
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Rooms</span>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mt-1">
                <Users size={16} className="text-blue-500" />
                <span>
                  {roomsCount}R, {guestsCount}G
                </span>
              </div>
            </button>
            {showRoomsPopup && (
              <RoomsGuestsPopup
                rooms={roomsCount}
                guests={guestsCount}
                onRoomsChange={setRoomsCount}
                onGuestsChange={setGuestsCount}
                onClose={() => setShowRoomsPopup(false)}
              />
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between text-sm text-gray-700 px-4 py-3 bg-white">
              <span className="font-medium">Room Price ({nights} night{nights > 1 ? 's' : ''})</span>
              <span className="font-bold">₹{formatCurrency(priceSummary.roomSubtotal)}</span>
            </div>
            {priceSummary.addonsTotal > 0 && (
              <div className="flex justify-between text-sm text-gray-700 px-4 py-3 bg-white">
                <span className="font-medium">Meals & Addons</span>
                <span className="font-bold">₹{formatCurrency(priceSummary.addonsTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-700 px-4 py-3 bg-white">
              <span className="font-medium">Taxes & Fees</span>
              <span className="font-bold">₹{formatCurrency(priceSummary.taxes)}</span>
            </div>
            {priceSummary.discount > 0 && (
              <div className="flex justify-between text-sm px-4 py-3 bg-white">
                <span className="font-medium text-emerald-700">Total Savings</span>
                <span className="font-bold text-emerald-700">- ₹{formatCurrency(priceSummary.discount)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
          <span className="font-bold text-gray-900">Total Payable</span>
          <span className="font-bold text-xl text-blue-600">₹{formatCurrency(priceSummary.netPay)}</span>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

        {!compact && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={18} className="text-gray-500" /> Guest Details
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={guestDetails.name}
                onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={guestDetails.phone}
                  onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                />
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  value={guestDetails.email}
                  onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              {!guestFormValid && <p className="text-xs text-rose-600 mt-1">Please enter valid name and mobile number.</p>}
            </div>
          </div>
        )}

        {!compact && (
          <>
            <button
              disabled={!guestFormValid || offlineBookingLoading || priceSummary.netPay <= 0}
              onClick={triggerOfflineBooking}
              className={`w-full py-4 bg-gradient-to-r ${
                roomsCount > 3 ? 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              } text-white font-bold text-lg rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
            >
              {offlineBookingLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <span>{roomsCount > 3 ? 'Request Group Booking' : 'Book Now & Pay at Hotel'}</span>
                  <ChevronRight size={20} className="opacity-80" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              {roomsCount > 3 ? 'Large bookings require manual confirmation.' : 'Secure booking. No prepayment required today.'}
            </p>

            {bookingStatus?.type === 'offline' && (
              <div className={`${bookingStatusStyles.wrap} border rounded-2xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4`}>
                <CheckCircle2 size={24} className={`${bookingStatusStyles.icon} shrink-0`} />
                <div>
                  <h4 className={`font-bold ${bookingStatusStyles.title}`}>{bookingStatus.status === 'Pending' ? 'Request Received' : 'Booking Confirmed!'}</h4>
                  <p className={`text-sm ${bookingStatusStyles.text} mt-1`}>Reference: {bookingStatus.reference}</p>
                  <p className={`text-xs ${bookingStatusStyles.sub} mt-1`}>
                    {bookingStatus.status === 'Pending' ? 'Our team will contact you shortly for confirmation.' : 'A confirmation has been sent to your details.'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
  <div className="bg-gray-50 min-h-screen pb-24 lg:pb-20 font-sans compact-booknow">
      {showCalendar && (
        <CalendarPicker
          checkIn={checkInDate}
          checkOut={checkOutDate}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {showPolicies && <PoliciesModal policies={hotel?.policies} onClose={() => setShowPolicies(false)} />}

      {showGallery && (
        <GalleryModal
          images={galleryImages}
          startIndex={galleryIndex}
          title={hotelName}
          onClose={() => setShowGallery(false)}
        />
      )}

      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
            <ChevronLeft size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">{hotelName}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
              <MapPin size={12} /> {hotel?.city}
              {hotel?.state ? `, ${hotel.state}` : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SectionCard
              title="Images"
              icon={<Info size={20} className="text-blue-500" />}
              right={
                <button
                  onClick={() => {
                    setGalleryIndex(0);
                    setShowGallery(true);
                  }}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  View all
                </button>
              }
            >
              <div className="rounded-3xl overflow-hidden border border-gray-100 bg-gray-100">
                <button
                  onClick={() => {
                    setGalleryIndex(0);
                    setShowGallery(true);
                  }}
                  className="block w-full"
                >
                  <img src={galleryImages[0]} alt={hotelName} className="w-full h-[230px] sm:h-[320px] object-cover" />
                </button>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {galleryImages.slice(0, 10).map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    onClick={() => {
                      setGalleryIndex(i);
                      setShowGallery(true);
                    }}
                    className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100"
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
                {galleryImages.length > 10 && (
                  <button
                    onClick={() => {
                      setGalleryIndex(0);
                      setShowGallery(true);
                    }}
                    className="shrink-0 w-20 h-20 rounded-2xl border border-gray-200 bg-white text-xs font-bold text-gray-700 flex items-center justify-center"
                  >
                    +{galleryImages.length - 10}
                  </button>
                )}
              </div>

              <div className="mt-4">
                <InfoRows
                  rows={[
                    {
                      label: 'Rating',
                      value: safeRating ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                            <Star size={12} className="text-emerald-700" fill="currentColor" />
                            {safeRating}
                          </span>
                          <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
                        </span>
                      ) : (
                        'N/A'
                      )
                    }
                  ]}
                />
              </div>
            </SectionCard>

            <SectionCard title="About property" icon={<ShieldCheck size={20} className="text-blue-600" />}>
              <p className="text-gray-700 text-sm leading-relaxed">{hotelDescription}</p>
           
            </SectionCard>

           <SectionCard
  title="Amenities"
  icon={<Sparkles size={20} className="text-yellow-500" />}
  right={
    amenitiesRemainingCount > 0 ? (
      <button
        onClick={() => setShowAllAmenities((s) => !s)}
        className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline"
      >
        {showAllAmenities ? 'Show less' : `+${amenitiesRemainingCount} more`}
      </button>
    ) : null
  }
>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {amenitiesToRender.map((amenity, idx) => (
      <div
        key={`${amenity}-${idx}`}
        className="flex items-center gap-3 text-sm text-gray-700 border border-gray-100 bg-gray-50 rounded-2xl px-3 py-2"
      >
        <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
          {getAmenityIcon(amenity)}
        </div>
        <span className="text-xs sm:text-sm leading-tight">{amenity}</span>
      </div>
    ))}
  </div>
</SectionCard>


            <SectionCard title="Rooms" icon={<Users size={20} className="text-indigo-600" />}>
              <div className="hidden sm:block rounded-2xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-12 gap-0 bg-gray-50 px-4 py-3 text-xs font-bold text-gray-600">
                  <div className="col-span-6">Room</div>
                  <div className="col-span-3 text-right">Price / night</div>
                  <div className="col-span-3 text-right">Status</div>
                </div>
                <div className="divide-y divide-gray-100">
                  {rooms.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    const canSelect = Boolean(room.isAvailable);
                    return (
                      <button
                        key={room.id}
                        onClick={() => canSelect && setSelectedRoomId(room.id)}
                        className={`w-full grid grid-cols-12 gap-0 px-4 py-3 text-left hover:bg-gray-50 transition ${
                          isSelected ? 'bg-blue-50/50' : 'bg-white'
                        } ${!canSelect ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={!canSelect}
                      >
                        <div className="col-span-6 flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="font-bold text-gray-900 truncate">{room.name}</div>
                              {room.offerApplied && (
                                <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg bg-rose-50 border border-rose-100 text-rose-700">
                                  {room.offerValue > 0 ? `Save ₹${formatCurrency(room.offerValue)}` : room.offerTitle || 'Offer'}
                                </span>
                              )}
                              {isSelected && (
                                <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-600 text-white">Selected</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 truncate">{room.area} • Max 3 Guests</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {room.amenities.slice(0, 3).map((am) => (
                                <span key={am} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md border border-gray-200">
                                  {am}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-3 text-right">
                          <div className="font-bold text-gray-900">₹{formatCurrency(room.finalPrice)}</div>
                          <div className="text-[11px] text-gray-500">+ ₹{formatCurrency(room.taxes)} taxes</div>
                        </div>

                        <div className="col-span-3 text-right">
                          {room.isAvailable ? (
                            <span className="inline-flex items-center justify-end gap-2">
                              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700">
                                Available
                              </span>
                              {room.availableCount > 0 ? <span className="text-xs text-gray-500">{room.availableCount} left</span> : null}
                            </span>
                          ) : (
                            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
                              Sold out
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:hidden space-y-3">
                {rooms.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  const canSelect = Boolean(room.isAvailable);
                  return (
                    <button
                      key={room.id}
                      onClick={() => canSelect && setSelectedRoomId(room.id)}
                      disabled={!canSelect}
                      className={`w-full text-left rounded-3xl border p-4 transition ${
                        isSelected ? 'border-blue-600 bg-blue-50/40' : 'border-gray-100 bg-white'
                      } ${!canSelect ? 'opacity-60' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-gray-900 truncate">{room.name}</div>
                            {isSelected ? <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-600 text-white">Selected</span> : null}
                          </div>
                          <div className="text-xs text-gray-500">{room.area}</div>
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-gray-900">₹{formatCurrency(room.finalPrice)}</div>
                              <div className="text-[11px] text-gray-500">+ ₹{formatCurrency(room.taxes)} taxes</div>
                            </div>
                            <div>
                              {room.isAvailable ? (
                                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700">
                                  Available
                                </span>
                              ) : (
                                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
                                  Sold out
                                </span>
                              )}
                            </div>
                          </div>
                          {room.offerApplied ? (
                            <div className="mt-2">
                              <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-rose-50 border border-rose-100 text-rose-700">
                                {room.offerValue > 0 ? `Save ₹${formatCurrency(room.offerValue)}` : room.offerTitle || 'Offer'}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {availableFoods.length > 0 && (
              <SectionCard title="Foods" icon={<UtensilsCrossed size={20} className="text-red-500" />}>
                <div className="space-y-3">
                  {availableFoods.map((food, idx) => {
                    const foodId = food?.foodId || food?._id || food?.id || food?.name;
                    const selected = selectedFood.find((x) => String(x.foodId || x._id || x.id || x.name) === String(foodId));
                    const qty = Math.max(parseNumber(selected?.quantity, 0), 0);
                    return (
                      <div key={idx} className="rounded-2xl border border-gray-100 p-4 bg-white">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 text-sm truncate">{food?.name || 'Meal'}</div>
                            <div className="text-xs text-gray-500">₹{formatCurrency(food?.price)} per item</div>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1">
                            <button
                              onClick={() => upsertFood(food, qty - 1)}
                              className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-600"
                              aria-label="decrease"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">{qty}</span>
                            <button
                              onClick={() => upsertFood(food, qty + 1)}
                              className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-600"
                              aria-label="increase"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {qty > 0 ? (
                          <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-bold text-gray-900">₹{formatCurrency(parseNumber(food?.price, 0) * qty)}</span>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            )}

          
<SectionCard
  title="Policies"
  icon={<Info size={18} className="text-blue-500" />}
  right={
    <button
      onClick={() => setShowPolicies(true)}
      className="text-blue-600 text-xs font-semibold hover:underline"
    >
      View all
    </button>
  }
>
  {policyHighlights.length ? (
    <div className="flex flex-wrap gap-2">
      {policyHighlights.slice(0, 8).map((p, idx) => {
        const badge = badgeForPolicy(p.val);
        return (
          <div
            key={idx}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-gray-100 bg-gray-50"
          >
            <span className="text-[11px] text-gray-600 max-w-[120px] truncate">{p.label}</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${badge.cls}`}>{badge.text}</span>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-xs text-gray-600">Policies not available.</div>
  )}
</SectionCard>
 
            <SectionCard title="Rating & reviews" icon={<Star size={20} className="text-yellow-500" />}>
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-gray-900">Overall</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-2xl font-extrabold text-gray-900">{safeRating || 'N/A'}</span>
                      {safeRating ? <Stars value={safeRating} /> : null}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{reviewCount ? `${reviewCount} review${reviewCount > 1 ? 's' : ''}` : 'No reviews found'}</div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
                      <ShieldCheck size={16} /> Verified stay
                    </span>
                  </div>
                </div>
              </div>

              {reviewsArray.length > 0 && (
                <div className="mt-4 space-y-3">
                  {reviewsArray.slice(0, 3).map((r, i) => {
                    const name = r?.name || r?.userName || r?.customerName || 'Guest';
                    const rating = parseNumber(r?.rating ?? r?.stars ?? r?.score ?? 0, 0);
                    const text = r?.comment || r?.review || r?.message || r?.text || '';
                    const dateStr = r?.date || r?.createdAt || r?.created_on || '';
                    return (
                      <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 text-sm truncate">{name}</div>
                            {dateStr ? <div className="text-xs text-gray-500">{String(dateStr).slice(0, 10)}</div> : null}
                          </div>
                          {rating > 0 ? (
                            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                              <Star size={12} className="text-emerald-700" fill="currentColor" />
                              {Math.max(0, Math.min(5, rating))}
                            </span>
                          ) : null}
                        </div>
                        {text ? <p className="mt-2 text-sm text-gray-700 leading-relaxed">{text}</p> : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </SectionCard>
          </div>

          <div className="lg:col-span-1">
            <div className="hidden lg:block sticky top-24 space-y-4">
              <BookingPanel compact={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setShowBookingSheet(true)}
            className="flex-1 text-left rounded-2xl border border-gray-200 bg-white px-4 py-2"
          >
            <div className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Total</div>
            <div className="text-base font-extrabold text-gray-900">₹{formatCurrency(priceSummary.netPay)}</div>
          </button>

          <button
            disabled={!guestFormValid || offlineBookingLoading || priceSummary.netPay <= 0}
            onClick={() => setShowBookingSheet(true)}
            className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Book
          </button>
        </div>
      </div>

      {showBookingSheet && (
        <div className="fixed inset-0 z-[140] bg-black/40 backdrop-blur-[2px]">
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl border border-gray-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-gray-50 rounded-t-3xl">
              <div className="font-extrabold text-gray-900">Booking details</div>
              <button onClick={() => setShowBookingSheet(false)} className="p-2 rounded-full hover:bg-gray-200 transition">
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <BookingPanel compact />
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users size={18} className="text-gray-500" /> Guest Details
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={guestDetails.name}
                    onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                    <input
                      type="email"
                      placeholder="Email (Optional)"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  {!guestFormValid && <p className="text-xs text-rose-600 mt-1">Please enter valid name and mobile number.</p>}
                </div>
              </div>

              <button
                disabled={!guestFormValid || offlineBookingLoading || priceSummary.netPay <= 0}
                onClick={triggerOfflineBooking}
                className={`w-full py-4 bg-gradient-to-r ${
                  roomsCount > 3 ? 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                } text-white font-bold text-lg rounded-2xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
              >
                {offlineBookingLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <span>{roomsCount > 3 ? 'Request Group Booking' : 'Book Now & Pay at Hotel'}</span>
                    <ChevronRight size={20} className="opacity-80" />
                  </>
                )}
              </button>

              {bookingStatus?.type === 'offline' && (
                <div className={`${bookingStatusStyles.wrap} border rounded-2xl p-4 flex items-start gap-3`}>
                  <CheckCircle2 size={24} className={`${bookingStatusStyles.icon} shrink-0`} />
                  <div>
                    <h4 className={`font-bold ${bookingStatusStyles.title}`}>{bookingStatus.status === 'Pending' ? 'Request Received' : 'Booking Confirmed!'}</h4>
                    <p className={`text-sm ${bookingStatusStyles.text} mt-1`}>Reference: {bookingStatus.reference}</p>
                    <p className={`text-xs ${bookingStatusStyles.sub} mt-1`}>
                      {bookingStatus.status === 'Pending' ? 'Our team will contact you shortly for confirmation.' : 'A confirmation has been sent to your details.'}
                    </p>
                  </div>
                </div>
              )}

              <div className="h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
