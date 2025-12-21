import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
} from 'lucide-react';
import { fetchBookingData, fetchMonthlyData } from '../../redux/slices/bookingSlice';
import useBookingOperations from './hooks/useBookingOperations';

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
  // Backend may send any of these signals.
  const explicit = room?.isAvailable;
  if (typeof explicit === 'boolean') return explicit;
  // Treat soldOut as a hard "fully booked" signal.
  if (room?.soldOut === true) return false;

  const availableCount = parseNumber(room?.availableCount ?? room?.countRooms ?? room?.totalCount ?? 0, 0);
  const totalRooms = parseNumber(room?.totalRooms ?? 0, 0);
  if (totalRooms > 0) return availableCount > 0;
  // If we can't determine total, still treat 0 available as unavailable.
  return availableCount > 0;
};

// Capacity rule: 1 room can accommodate up to 3 guests.
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

  // We accept partial overlap so 1 night pricing still gets overridden when rule exists.
  return (
    monthlyData.find((entry) => {
      const entryRoomId = entry?.roomId || entry?._id || entry?.room?._id;
      if (!entryRoomId || String(entryRoomId) !== String(roomId)) return false;
      return dateRangesOverlap(checkInIso, checkOutIso, entry?.startDate, entry?.endDate);
    }) || null
  );
};

const RoomAmenity = ({ label }) => (
  <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
    {label.toLowerCase().includes('wi-fi') && <Wifi size={12} className="text-sky-500" />}
    {label.toLowerCase().includes('ac') && <Wind size={12} className="text-emerald-500" />}
    {(label.toLowerCase().includes('meal') || label.toLowerCase().includes('breakfast')) && (
      <Utensils size={12} className="text-orange-500" />
    )}
    {label}
  </span>
);

export default function BookNowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const bookingState = useSelector((store) => store.booking) || {};
  const user = useSelector((store) => store.auth?.user) || null;
  const isLoggedIn = Boolean(user?.id);
  
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);

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

  // User-editable controls (date picker + rooms/guests steppers)
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
  }, [initialTripMeta.checkIn, initialTripMeta.checkOut, initialTripMeta.guests, initialTripMeta.rooms]);

  // Enforce: rooms >= ceil(guests/3). If guests increases, auto-increase rooms.
  // If rooms decreases, clamp guests to rooms*3.
  useEffect(() => {
    const minRooms = requiredRoomsForGuests(guestsCount);
    if (roomsCount < minRooms) {
      setRoomsCount(minRooms);
    }
  }, [guestsCount, roomsCount]);

  useEffect(() => {
    const maxGuests = Math.max(parseNumber(roomsCount, 1) * 3, 1);
    if (guestsCount > maxGuests) {
      setGuestsCount(maxGuests);
    }
  }, [roomsCount, guestsCount]);

  const toInputDate = useCallback((isoValue) => {
    if (!isoValue) return '';
    const parsed = new Date(isoValue);
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toISOString().slice(0, 10);
  }, []);

  const fromInputDate = useCallback((inputValue, fallbackOffset = 0) => {
    if (!inputValue) return ensureIsoDate(null, fallbackOffset);
    const parsed = new Date(`${inputValue}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return ensureIsoDate(null, fallbackOffset);
    return parsed.toISOString();
  }, []);

  const handleCheckInChange = useCallback(
    (inputValue) => {
      const nextCheckIn = fromInputDate(inputValue, 0);
      setCheckInDate(nextCheckIn);

      // Ensure checkout is after check-in
      const checkOutParsed = new Date(checkOutDate);
      const checkInParsed = new Date(nextCheckIn);
      if (!Number.isNaN(checkOutParsed.getTime()) && !Number.isNaN(checkInParsed.getTime())) {
        if (checkOutParsed <= checkInParsed) {
          const next = new Date(checkInParsed);
          next.setDate(next.getDate() + 1);
          setCheckOutDate(next.toISOString());
        }
      }
    },
    [checkOutDate, fromInputDate]
  );

  const handleCheckOutChange = useCallback(
    (inputValue) => {
      const nextCheckOut = fromInputDate(inputValue, 1);
      const checkOutParsed = new Date(nextCheckOut);
      const checkInParsed = new Date(checkInDate);
      if (!Number.isNaN(checkOutParsed.getTime()) && !Number.isNaN(checkInParsed.getTime()) && checkOutParsed <= checkInParsed) {
        const next = new Date(checkInParsed);
        next.setDate(next.getDate() + 1);
        setCheckOutDate(next.toISOString());
        return;
      }
      setCheckOutDate(nextCheckOut);
    },
    [checkInDate, fromInputDate]
  );

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
        },
      ];
    }
    return sourceRooms.slice(0, 3).map((room, index) => {
      const resolvedPrice =
        parseNumber(room.finalPrice ?? room.discountedPrice ?? room.price ?? room.priceWithGST, 0) ||
        extractPriceCandidate(room) ||
        1599;

      const isAvailable = deriveRoomAvailability(room);
      const availableCount = parseNumber(room?.availableCount ?? room?.countRooms ?? room?.totalCount ?? 0, 0);

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
        isAvailable,
        availableCount,

        // Offer / pricing flags
        offerApplied: Boolean(room?.offerApplied),
        offerTitle: room?.offerTitle || room?.offerName || room?.offer?.title || room?.offer?.name || '',
        offerValue: parseNumber(room?.offerValue ?? room?.offerAmount ?? room?.offer?.value ?? room?.offer?.amount ?? 0, 0),
        offerPercent: parseNumber(room?.offerPercent ?? room?.offerPercentage ?? room?.offer?.percent ?? room?.offer?.percentage ?? 0, 0),
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

  const monthlyOverride = useMemo(
    () => pickMonthlyOverride(bookingState.monthlyData, selectedRoom?.roomId, checkInDate, checkOutDate),
    [bookingState.monthlyData, checkInDate, checkOutDate, selectedRoom?.roomId]
  );

  // If monthlyOverride is present, we treat monthPrice as the effective nightly price for calculation.
  // (Backend can still interpret it per their own rules; we just need correct client totals/GST.)
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
              sourceId: monthlyOverride._id,
            }
          : undefined,
      },
    ];
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
  }, [isLoggedIn, user?.displayName, user?.email, user?.mobile, user?.name]);

  const [couponCode, setCouponCode] = useState(() => state?.priceDetails?.coupon || '');
  const [isCouponApplied, setIsCouponApplied] = useState(Boolean(state?.priceDetails?.coupon));
  const [discountPrice, setDiscountPrice] = useState(() => parseNumber(state?.priceDetails?.discount || 0));
  const [gstAmount, setGstAmount] = useState(() => parseNumber(state?.priceDetails?.gstAmount || 0));
  const [bookingStatus, setBookingStatus] = useState(null);

  const nights = useMemo(() => calculateStayNights(checkInDate, checkOutDate), [checkInDate, checkOutDate]);

  const availableFoods = useMemo(() => (Array.isArray(hotel?.foods) ? hotel.foods : []), [hotel?.foods]);

  const [selectedFood, setSelectedFood] = useState(() => {
    const initial = state?.selectedFood;
    return Array.isArray(initial) ? initial : [];
  });

  // Refresh selection when hotel changes (keep items only from this hotel)
  useEffect(() => {
    setSelectedFood((prev) => {
      if (!prev?.length) return [];
      const allowedIds = new Set(availableFoods.map((f) => String(f.foodId || f._id || f.id || f.name)));
      return prev
        .filter((item) => allowedIds.has(String(item.foodId || item._id || item.id || item.name)))
        .map((item) => ({ ...item, quantity: Math.max(parseNumber(item.quantity, 1), 1) }));
    });
  }, [availableFoods]);

  const upsertFood = useCallback(
    (food, nextQty) => {
      const qty = Math.max(parseNumber(nextQty, 0), 0);
      const foodId = food?.foodId || food?._id || food?.id || food?.name;
      if (!foodId) return;
      setSelectedFood((prev) => {
        const existing = Array.isArray(prev) ? prev : [];
        const idx = existing.findIndex((x) => String(x.foodId || x._id || x.id || x.name) === String(foodId));
        if (qty <= 0) {
          return idx >= 0 ? existing.filter((_, i) => i !== idx) : existing;
        }
        const nextItem = {
          ...food,
          foodId,
          name: food?.name,
          price: parseNumber(food?.price, 0),
          quantity: qty,
          totalPrice: parseNumber(food?.price, 0) * qty,
        };
        if (idx >= 0) {
          const copy = [...existing];
          copy[idx] = nextItem;
          return copy;
        }
        return [...existing, nextItem];
      });
    },
    [setSelectedFood]
  );
  const roomNightlyTotal = useMemo(() => effectiveRoomNightlyPrice, [effectiveRoomNightlyPrice]);
  const foodTotal = useMemo(() => sumFoodSelections(selectedFood), [selectedFood]);
  const baseSubtotal = roomNightlyTotal * roomsCount * nights;
  const grossAmount = baseSubtotal + foodTotal;
  const subtotalAfterDiscount = Math.max(grossAmount - discountPrice, 0);
  const finalPayableTotal = subtotalAfterDiscount + gstAmount;
  const partialAmount = Math.round(Math.max(finalPayableTotal * 0.25, 0));

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
  }, [guestDetails.name, guestDetails.phone, isLoggedIn]);

  const {
    handleApplyCoupon,
    handleOfflineBooking,
    handleOnlinePayment,
    handlePartialPayment,
    recalculateGst,
  } = useBookingOperations({
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
    toBeCheckRoomNumber: roomsCount,
  });

  const gstSignature = useMemo(() => {
    const foodSig = (selectedFood || [])
      .map((f) => `${f.foodId || f.id || f.name}:${parseNumber(f.quantity, 1)}:${parseNumber(f.price, 0)}`)
      .join('|');
    return [
      selectedRoom?.roomId,
      effectiveRoomNightlyPrice,
      roomsCount,
      nights,
      discountPrice,
      foodSig,
    ].join('::');
  }, [discountPrice, effectiveRoomNightlyPrice, nights, roomsCount, selectedFood, selectedRoom?.roomId]);

  useEffect(() => {
    if (!selectedRoomsPayload.length) return;
    recalculateGst();
  }, [gstSignature, recalculateGst, selectedRoomsPayload.length]);

  const [offlineBookingLoading, setOfflineBookingLoading] = useState(false);

  const triggerOfflineBooking = useCallback(async () => {
    if (offlineBookingLoading) return;
    setOfflineBookingLoading(true);
    const success = await handleOfflineBooking?.();
    if (success) {
      setBookingStatus({ type: 'offline', reference: `HTL-${Date.now()}`, amount: priceSummary.netPay });
    }
    setOfflineBookingLoading(false);
  }, [handleOfflineBooking, offlineBookingLoading, priceSummary.netPay]);

  useEffect(() => {
    setBookingStatus(null);
  }, [hotelId, selectedRoomId, roomsCount, guestsCount, nights, priceSummary.netPay]);

  const requiresGuestDetails = !isLoggedIn;
  const canProceed = guestFormValid && priceSummary.netPay > 0;

  const payNowNotice =
    'Currently we are accepting only Pay at Hotel. Ticket will be auto-cancelled upon no visit.';

  // Gallery state must be declared before any early returns to satisfy Hook rules.
  const galleryImages = useMemo(() => {
    const collected = [];
    if (Array.isArray(hotel?.images)) collected.push(...hotel.images.filter(Boolean));
    if (hotel?.coverImage) collected.unshift(hotel.coverImage);
    const unique = Array.from(new Set(collected.filter(Boolean)));
    return unique.length ? unique : [PLACEHOLDER_IMAGE];
  }, [hotel?.coverImage, hotel?.images]);

  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    setGalleryIndex(0);
  }, [hotelId]);

  useEffect(() => {
    if (galleryIndex >= galleryImages.length) setGalleryIndex(0);
  }, [galleryImages.length, galleryIndex]);

  const nextGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1 >= galleryImages.length ? 0 : prev + 1));
  }, [galleryImages.length]);

  const prevGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 < 0 ? Math.max(galleryImages.length - 1, 0) : prev - 1));
  }, [galleryImages.length]);

  if (!hotel) {
    if (bookingState.loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
            <Loader2 size={36} className="mx-auto text-blue-600 animate-spin" />
            <p className="text-sm text-gray-600">Fetching live hotel details…</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
          <Info size={36} className="mx-auto text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">No hotel selected</h2>
          <p className="text-sm text-gray-500">Head back to the list and pick a stay to continue booking.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full rounded-xl bg-blue-600 text-white text-sm font-semibold py-2"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const hotelName = hotel.hotelName || hotel.name || 'Selected property';
  const hotelAddress =
    hotel.address ||
    [hotel.landmark, hotel.city, hotel.state].filter(Boolean).join(', ') ||
    'Address shared after confirmation';
  const hotelRating = Number.isFinite(Number(hotel.rating)) ? Number(hotel.rating) : null;

  return (
    <div className="bg-gray-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 mt-6"
        >
          <ChevronLeft size={16} /> Back to results
        </button>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-64">
                <img
                  src={galleryImages[galleryIndex] || PLACEHOLDER_IMAGE}
                  alt={hotelName}
                  className="w-full h-full object-cover"
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevGallery}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2 shadow"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={nextGallery}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2 shadow"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>

                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                      {galleryImages.slice(0, 6).map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setGalleryIndex(idx)}
                          className={`h-2 w-2 rounded-full transition ${
                            idx === galleryIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          aria-label={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                  <Sparkles size={12} /> Serviced stay
                </div>
                <h1 className="mt-3 text-2xl font-semibold text-gray-900">{hotelName}</h1>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={16} className="text-rose-500" /> {hotelAddress}
                </p>
                {hotelRating && (
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <Star size={16} fill="currentColor" /> {hotelRating.toFixed(1)} · Verified guests
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays size={16} className="text-blue-600" /> {new Date(checkInDate).toDateString()} → {new Date(checkOutDate).toDateString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users size={16} className="text-purple-600" /> {guestsCount} guest{guestsCount > 1 ? 's' : ''} · {roomsCount} room
                  {roomsCount > 1 ? 's' : ''}
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck size={16} className="text-emerald-600" /> Instant confirmation options
                </span>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                    Check-in
                    <input
                      type="date"
                      value={toInputDate(checkInDate)}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                    Check-out
                    <input
                      type="date"
                      value={toInputDate(checkOutDate)}
                      min={toInputDate(checkInDate)}
                      onChange={(e) => handleCheckOutChange(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-2.5 sm:p-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">Rooms</p>
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          setRoomsCount((prev) => {
                            const next = Math.max(1, prev - 1);
                            const minRooms = requiredRoomsForGuests(guestsCount);
                            return Math.max(next, minRooms);
                          })
                        }
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white text-base sm:text-lg font-semibold text-gray-700"
                      >
                        −
                      </button>
                      <span className="text-sm sm:text-base font-semibold text-gray-900">{roomsCount}</span>
                      <button
                        type="button"
                        onClick={() => setRoomsCount((prev) => Math.min(10, prev + 1))}
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white text-base sm:text-lg font-semibold text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-2.5 sm:p-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">Guests</p>
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setGuestsCount((prev) => Math.max(1, prev - 1))}
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white text-base sm:text-lg font-semibold text-gray-700"
                      >
                        −
                      </button>
                      <span className="text-sm sm:text-base font-semibold text-gray-900">{guestsCount}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setGuestsCount((prev) => {
                            const next = Math.min(20, prev + 1);
                            const maxGuests = Math.max(parseNumber(roomsCount, 1) * 3, 1);
                            return Math.min(next, maxGuests);
                          })
                        }
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white text-base sm:text-lg font-semibold text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 sm:mt-3 space-y-1">
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    Night count updates automatically: {nights} night{nights !== 1 ? 's' : ''}.
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    Rule: 1 room = up to 3 guests.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Choose your room</h2>
                  <p className="text-sm text-gray-500">Select an available room to continue booking.</p>
                </div>
                <BadgePercent size={20} className="text-blue-600" />
              </div>

              <div className="space-y-4">
                {rooms.map((room) => (
                  (() => {
                    const isSelected = room.id === selectedRoomId;
                    const override = isSelected
                      ? pickMonthlyOverride(bookingState.monthlyData, room.roomId, checkInDate, checkOutDate)
                      : null;
                    const shownNightlyPrice = override ? parseNumber(override.monthPrice, room.finalPrice) : room.finalPrice;
                    const shownTaxes = room.taxes;

                    const offerActive = Boolean(room.offerApplied);
                    const offerLabel =
                      room.offerTitle ||
                      (room.offerPercent > 0 ? `${room.offerPercent}% OFF` : room.offerValue > 0 ? `Save ₹${formatCurrency(room.offerValue)}` : 'Offer');

                    const baselineOriginal = parseNumber(room.originalPrice, 0) || parseNumber(room.finalPrice, 0);
                    const inferredSavings = Math.max(Math.round(baselineOriginal - shownNightlyPrice), 0);
                    const inferredPercent =
                      baselineOriginal > 0 ? Math.round((inferredSavings / baselineOriginal) * 100) : 0;

                    return (
                  <button
                    key={room.id}
                    type="button"
                    disabled={!room.isAvailable}
                    onClick={() => room.isAvailable && setSelectedRoomId(room.id)}
                    className={`w-full text-left rounded-2xl border px-4 py-4 transition relative ${
                      !room.isAvailable
                        ? 'border-gray-200 bg-gray-100 opacity-70 cursor-not-allowed'
                        : isSelected
                          ? 'border-blue-500 bg-blue-50/40 shadow-sm'
                          : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div className="absolute right-4 top-4 flex flex-col items-end gap-1">
                      {!room.isAvailable && (
                        <span className="text-[11px] font-semibold text-white bg-rose-500 px-2.5 py-1 rounded-full">
                          Fully booked
                        </span>
                      )}
                      {offerActive && (
                        <span className="text-[11px] font-semibold text-white bg-indigo-600 px-2.5 py-1 rounded-full">
                          {offerLabel}
                        </span>
                      )}
                      {override && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          Special price
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-gray-900">{room.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{room.area}</p>
                        {!room.isAvailable && (
                          <p className="mt-1 text-[11px] font-semibold text-rose-600">
                            No rooms left for this category
                          </p>
                        )}
                        {offerActive && !room.isAvailable && (
                          <p className="mt-1 text-[11px] font-semibold text-indigo-700">Offer available when rooms open up</p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {room.amenities.map((amenity) => (
                            <RoomAmenity key={amenity} label={amenity} />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 line-through">
                          ₹{formatCurrency((room.originalPrice || shownNightlyPrice) * 1.2)}
                        </p>
                        <p className="text-xl font-semibold text-gray-900">₹{formatCurrency(shownNightlyPrice)}</p>
                        {offerActive && !room.isAvailable ? (
                          <p className="text-[11px] font-semibold text-indigo-600">{offerLabel}</p>
                        ) : offerActive ? (
                          <p className="text-[11px] font-semibold text-indigo-600">
                            {room.offerTitle ? `${room.offerTitle} · ` : ''}
                            {room.offerPercent > 0
                              ? `${room.offerPercent}% OFF`
                              : room.offerValue > 0
                                ? `Save ₹${formatCurrency(room.offerValue)}`
                                : inferredSavings > 0
                                  ? `Save ₹${formatCurrency(inferredSavings)}${inferredPercent > 0 ? ` (${inferredPercent}% OFF)` : ''}`
                                  : 'Offer applied'}
                          </p>
                        ) : null}
                        <p className="text-xs text-gray-500">+ taxes ₹{formatCurrency(shownTaxes)}</p>
                      </div>
                    </div>
                  </button>
                    );
                  })()
                ))}
              </div>
            </section>

            {availableFoods.length > 0 && (
              <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Meals & add-ons</h2>
                    <p className="text-sm text-gray-500">Add food to your stay (optional).</p>
                  </div>
                  <Utensils size={20} className="text-orange-500" />
                </div>

                <div className="space-y-3">
                  {availableFoods.map((food, idx) => {
                    const foodId = food?.foodId || food?._id || food?.id || food?.name || `food-${idx}`;
                    const selected = selectedFood.find(
                      (x) => String(x.foodId || x._id || x.id || x.name) === String(foodId)
                    );
                    const qty = Math.max(parseNumber(selected?.quantity, 0), 0);
                    const price = parseNumber(food?.price, 0);

                    return (
                      <div key={String(foodId)} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{food?.name || 'Food item'}</p>
                          {food?.about && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{food.about}</p>}
                          <p className="text-sm font-semibold text-gray-900 mt-2">₹{formatCurrency(price)}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => upsertFood(food, qty - 1)}
                            className="h-10 w-10 rounded-xl border border-gray-200 bg-white text-lg font-semibold text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-base font-semibold text-gray-900 w-6 text-center">{qty}</span>
                          <button
                            type="button"
                            onClick={() => upsertFood(food, qty + 1)}
                            className="h-10 w-10 rounded-xl border border-gray-200 bg-white text-lg font-semibold text-gray-700"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <PhoneCall size={16} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Your booking details</h2>
              </div>
              {requiresGuestDetails && (
                <p className="text-xs text-gray-500">Not logged in? Share contact details so we can send your confirmation.</p>
              )}
              <label className="text-sm font-semibold text-gray-700 block">
                Full name
                <input
                  type="text"
                  value={guestDetails.name}
                  onChange={(e) => setGuestDetails((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-sm font-semibold text-gray-700 block">
                  Phone number
                  <input
                    type="tel"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="WhatsApp / phone"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700 block">
                  Email (optional)
                  <input
                    type="email"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirmation email"
                  />
                </label>
              </div>
            </section>

            {Array.isArray(hotel?.policies) && hotel.policies.length > 0 && (
              <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Hotel policies</h2>
                  <Info size={18} className="text-gray-500" />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs text-gray-500">Check-in</p>
                       <p className="font-semibold text-gray-900">{hotel.policies[0]?.checkIn || '12:00 PM'}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="text-right">
                       <p className="text-xs text-gray-500">Check-out</p>
                       <p className="font-semibold text-gray-900">{hotel.policies[0]?.checkOut || '11:00 AM'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPoliciesModal(true)}
                    className="w-full rounded-xl bg-white border border-gray-200 py-2 text-sm font-semibold text-blue-600 hover:bg-gray-50"
                  >
                    View all policies
                  </button>
                </div>
              </section>
            )}

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Price summary</h2>
                {bookingState.loading && <Loader2 size={18} className="text-blue-600 animate-spin" />}
              </div>
              <div className="space-y-2 text-sm text-gray-600 border-b border-gray-200 pb-2 mb-2">
                <div className="flex items-center justify-between">
                  <span>Check-in</span>
                  <span className="font-semibold">{new Date(checkInDate).toDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Check-out</span>
                  <span className="font-semibold">{new Date(checkOutDate).toDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Guests</span>
                  <span className="font-semibold">{guestsCount} Guest{guestsCount > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Rooms</span>
                  <span className="font-semibold">{roomsCount} Room{roomsCount > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Room ({roomsCount} × {nights} night{nights > 1 ? 's' : ''})</span>
                  <span>₹{formatCurrency(priceSummary.roomSubtotal)}</span>
                </div>
                {priceSummary.addonsTotal > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Meals & add-ons</span>
                    <span>₹{formatCurrency(priceSummary.addonsTotal)}</span>
                  </div>
                )}
                {priceSummary.discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600">
                    <span>You save</span>
                    <span>- ₹{formatCurrency(priceSummary.discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Taxes (GST)</span>
                  <span>₹{formatCurrency(priceSummary.taxes)}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Payable now</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{formatCurrency(priceSummary.netPay)}</p>
                </div>
                {priceSummary.discount > 0 && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    Savings applied
                  </span>
                )}
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    disabled={!couponCode || bookingState.couponLoading}
                    onClick={() => handleApplyCoupon?.(couponCode)}
                    className="rounded-2xl bg-blue-600 text-white text-sm font-semibold px-4 py-2 disabled:bg-blue-300"
                  >
                    {bookingState.couponLoading ? 'Applying…' : isCouponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {bookingState.coupon?.message && (
                  <p className="text-xs text-gray-500 mt-2">{bookingState.coupon.message}</p>
                )}
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Choose how to pay</h2>
              <p className="text-xs text-gray-500">Currently only Pay at Hotel is available.</p>

              <div className="relative group">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-2xl bg-gray-200 text-gray-500 text-sm font-semibold px-4 py-3 flex items-center justify-between cursor-not-allowed"
                  aria-disabled="true"
                >
                  <span>Pay ₹{formatCurrency(priceSummary.netPay)} now</span>
                  <ArrowRight size={16} />
                </button>
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 w-[min(320px,calc(100vw-3rem))] -translate-x-1/2 rounded-xl bg-gray-900 text-white text-[11px] px-3 py-2 opacity-0 translate-y-1 shadow-lg transition group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100">
                  {payNowNotice}
                </div>
              </div>

              <div className="relative group">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-2xl bg-blue-50 text-blue-300 border border-blue-100 text-sm font-semibold px-4 py-3 flex items-center justify-between cursor-not-allowed"
                  aria-disabled="true"
                >
                  <span>Pay 25% now (₹{formatCurrency(partialAmount)})</span>
                  <ArrowRight size={16} />
                </button>
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 w-[min(320px,calc(100vw-3rem))] -translate-x-1/2 rounded-xl bg-gray-900 text-white text-[11px] px-3 py-2 opacity-0 translate-y-1 shadow-lg transition group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100">
                  {payNowNotice}
                </div>
              </div>

              <button
                disabled={!canProceed || offlineBookingLoading}
                onClick={triggerOfflineBooking}
                className="w-full rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-semibold px-4 py-3 flex items-center justify-between disabled:opacity-60"
              >
                <span>{offlineBookingLoading ? 'Booking ho raha hai…' : 'Pay at hotel · instant hold'}</span>
                {offlineBookingLoading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
              </button>

              <p className="text-[11px] text-gray-500">{payNowNotice}</p>

              {!guestFormValid && (
                <p className="text-xs text-rose-500">Please share guest name and phone to continue.</p>
              )}
              {bookingState.error && <p className="text-xs text-rose-500">{bookingState.error}</p>}
              {bookingStatus?.type === 'offline' && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 size={18} /> Booking confirmed. Ref {bookingStatus.reference}. Pay ₹ {formatCurrency(bookingStatus.amount)} at hotel.
                </div>
              )}
              <p className="text-[11px] text-gray-400">Free cancellation up to 24 hours before check-in. Pay-at-hotel bookings are held via partner dashboard.</p>
            </section>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500 border-t border-gray-200 pt-4 flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-600" /> Company verified property
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles size={14} className="text-purple-500" /> Dedicated guest support
          </span>
          <span className="inline-flex items-center gap-1">
            <PhoneCall size={14} className="text-blue-500" /> 24x7 helpline
          </span>
        </div>
      </div>

      {/* Policy Modal */}
      {showPoliciesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Hotel Policies</h3>
              <button
                onClick={() => setShowPoliciesModal(false)}
                className="p-2 rounded-full bg-white hover:bg-gray-100 transition shadow-sm"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              {hotel.policies.map((policy, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Check-in time</p>
                      <p className="text-lg font-semibold text-gray-900">{policy.checkIn || '12:00 PM'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-right">
                      <p className="text-xs text-gray-500 mb-1">Check-out time</p>
                      <p className="text-lg font-semibold text-gray-900">{policy.checkOut || '11:00 AM'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Rules</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white">
                        <span className="text-sm text-gray-600">Pets allowed</span>
                        <span className={`text-sm font-medium ${policy.petsAllowed === 'Yes' ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {policy.petsAllowed || 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white">
                        <span className="text-sm text-gray-600">Smoking allowed</span>
                        <span className={`text-sm font-medium ${policy.smokingAllowed === 'Yes' ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {policy.smokingAllowed || 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white">
                        <span className="text-sm text-gray-600">Alcohol consumption</span>
                        <span className={`text-sm font-medium ${policy.alcoholAllowed === 'Yes' ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {policy.alcoholAllowed || 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white">
                        <span className="text-sm text-gray-600">Unmarried couples</span>
                        <span className={`text-sm font-medium ${policy.unmarriedCouplesAllowed === 'Yes' ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {policy.unmarriedCouplesAllowed || 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <button
                onClick={() => setShowPoliciesModal(false)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
