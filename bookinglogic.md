# Booking Logic Documentation (Hinglish)

Is file mein `useBookingOperations.js` se derived booking logic aur conditions explain ki gayi hain.

## 1. Booking Status Logic (Status Kaise Decide Hota Hai)

Booking ka status "Confirmed" hoga ya "Pending", ye neeche di gayi conditions par depend karta hai:

*   **Pending Status (Booking Confirm Nahi Hogi, Request Jayegi):**
    1.  **Rooms Count:** Agar user ne **3 se zyada rooms** book kiye hain (`rooms > 3`).
    2.  **Stay Duration (Single Room):** Agar user ne sirf **1 room** book kiya hai lekin **3 nights se zyada** rukna chahta hai (`stayNights > 3`).
    3.  **Partial Payment:** Agar user ne "Partial Payment" (25% advance) choose kiya hai, toh booking automatically "Pending" mark hoti hai.

*   **Confirmed Status:**
    *   Agar upar wali koi bhi condition match nahi hoti, toh booking directly "Confirmed" mark ho jayegi.

**Code Reference:**
```javascript
const computeBookingStatus = ({ roomsCount, nights }) => {
  const rooms = Number(roomsCount || 0);
  const stayNights = Number(nights || 0);

  // Business rules:
  if (rooms > 3) return "Pending";
  if (rooms === 1 && stayNights > 3) return "Pending";
  return "Confirmed";
};
```

## 2. Payment Modes (Paise Kaise Cut Rahe Hain)

User ke paas payment ke 3 options ho sakte hain:

1.  **Offline Booking (Pay at Hotel):**
    *   Koi paisa abhi nahi dena.
    *   Booking request create hoti hai.
    *   Status upar wale logic ke hisaab se "Pending" ya "Confirmed" set hota hai.

2.  **Online Full Payment:**
    *   User poora amount (`finalTotal`) Razorpay ke through pay karta hai.
    *   Payment success hone ke baad booking create hoti hai.

3.  **Partial Payment (25% Advance):**
    *   User total amount ka sirf **25%** abhi pay karta hai.
    *   `isPartialBooking: true` flag set hota hai.
    *   Status hamesha "Pending" rehta hai jab tak hotel confirm na kare ya full payment na ho jaye.

## 3. GST Calculation (Tax Kaise Lag Raha Hai)

GST calculate karne ke do tareeke hain system mein:

*   **Scenario A: Agar Room/Food mein GST % pehle se defined hai:**
    *   Har room aur food item ka tax alag-alag calculate hota hai.
    *   Formula: `(Price * Quantity * GST_Percent) / 100`
    *   Is case mein API call nahi hoti, frontend pe hi calculate hota hai.

*   **Scenario B: Agar GST % defined nahi hai (Fallback):**
    *   Total Taxable Amount nikaala jata hai: `(Room Price + Food Price) - Discount`.
    *   Fir backend API (`getGstForHotelData`) call hoti hai jo correct GST amount return karti hai.

## 4. Other Validation Rules (Aur Kya Check Hota Hai)

Booking process aage badhane se pehle ye cheezein check hoti hain (`ensureUserAndRoom`):
*   **Room Selection:** User ne kam se kam ek room select kiya ho.
*   **Availability:** Room sold out nahi hona chahiye (`toBeCheckRoomNumber > 0`).
*   **User Details:**
    *   Agar user logged in nahi hai, toh **Name** aur **Mobile Number** (min 6 digits) dena zaroori hai.

## Summary

*   **More than 3 Rooms** -> **Pending**
*   **Single Room & > 3 Nights** -> **Pending**
*   **Standard Booking** -> **Confirmed**
*   **Partial Payment** -> **Pending**
