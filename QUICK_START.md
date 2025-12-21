# 🚀 Quick Start Guide - API Interceptor

## Instant Setup - Ready to Use!

Your API interceptor system is **fully configured** and ready to use. Here's everything you need to know:

---

## ✅ What's Already Working

1. **Redux Store** - Configured with auth and server slices
2. **Axios Interceptor** - All API calls go through it automatically
3. **Token Handling** - Tokens are added to every request automatically
4. **Health Checks** - Server connectivity checked every 30 seconds
5. **Error Pages** - Beautiful error page shows when server is down
6. **API Services** - Pre-built services ready to use

---

## 🎯 How to Make API Calls

### Method 1: Using Pre-built Services (RECOMMENDED)

```javascript
import { hotelAPI, authAPI, bookingAPI } from '../services/api';

// Login (token automatically saved)
const response = await authAPI.login({ email, password });

// Get rooms (token automatically included)
const rooms = await hotelAPI.getAllRooms();

// Create booking (token automatically included)
const booking = await bookingAPI.createBooking(bookingData);
```

### Method 2: Direct API Client

```javascript
import apiClient from '../utils/apiInterceptor';

// GET request
const response = await apiClient.get('/api/endpoint');

// POST request
const response = await apiClient.post('/api/endpoint', data);
```

### Method 3: Custom API Helper

```javascript
import { customAPI } from '../services/api';

// Any HTTP method
const data = await customAPI.get('/api/custom');
const result = await customAPI.post('/api/create', payload);
```

---

## 🔐 Authentication Example

```javascript
import { useDispatch } from 'react-redux';
import { authAPI } from '../services/api';
import { loginSuccess, logout } from '../redux/slices/authSlice';

function LoginComponent() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await authAPI.login({ email, password });
      
      // Token is automatically saved to localStorage
      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }));
      
      // ✅ All future API calls now include this token!
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Removes token from localStorage
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 📊 Using Redux State

```javascript
import { useSelector } from 'react-redux';

function MyComponent() {
  // Server connection status
  const { isConnected, errorMessage, lastChecked } = useSelector(
    state => state.server
  );

  // Authentication status
  const { isAuthenticated, user, token } = useSelector(
    state => state.auth
  );

  return (
    <div>
      {isConnected ? '✅ Server Online' : '❌ Server Offline'}
      {isAuthenticated && <p>Welcome, {user?.name}!</p>}
    </div>
  );
}
```

---

## 🎨 The Server Error Page

When server is down, users automatically see an error page with:
- Error details
- Retry button
- Connection status
- No code needed - it's automatic!

**To test:**
1. Stop your backend server
2. Make any API call
3. Error page appears automatically
4. Start server and click "Retry"

---

## ⚙️ Configuration

### Base URL
Edit `utils/baseUrl.js`:
```javascript
const baseURL = 'http://localhost:5000'; // Your backend URL
```

### Health Check Interval
Edit `src/components/ApiInterceptorWrapper.jsx`:
```javascript
startHealthCheck(30000); // 30 seconds (default)
```

---

## 📝 Important Notes

### 1. Token Storage
- Tokens are stored in `localStorage` automatically
- Set when you dispatch `loginSuccess()`
- Removed when you dispatch `logout()`

### 2. Automatic Features
✅ Token is added to every request header
✅ Server connectivity is monitored
✅ Error page shows when server is down
✅ Redux state updates automatically
✅ `withCredentials: true` is enabled

### 3. Error Handling
The interceptor handles:
- Network errors → Shows error page
- 401 Unauthorized → Clears token
- 403 Forbidden → Shows message
- 500+ Server errors → Shows error page
- Timeout → Shows timeout message

---

## 🔥 Real World Example

```javascript
// UserDashboard.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { hotelAPI, bookingAPI } from '../services/api';

function UserDashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Both calls include token automatically
      const roomsData = await hotelAPI.getAllRooms();
      const bookingsData = await bookingAPI.getUserBookings();
      
      setRooms(roomsData);
      setBookings(bookingsData);
    } catch (error) {
      // If server is down, error page shows automatically
      console.error('Failed to fetch data:', error);
    }
  };

  const handleBooking = async (roomId) => {
    try {
      // Token is included automatically
      const booking = await bookingAPI.createBooking({
        roomId,
        userId: user.id,
        checkIn: '2025-01-01',
        checkOut: '2025-01-05'
      });
      
      alert('Booking created!');
      fetchData(); // Refresh data
    } catch (error) {
      alert('Booking failed: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <RoomsList rooms={rooms} onBook={handleBooking} />
      <MyBookings bookings={bookings} />
    </div>
  );
}
```

---

## 🧪 Testing Checklist

- [ ] Make an API call without token → Should work
- [ ] Login → Token should be saved
- [ ] Make API call after login → Token included automatically
- [ ] Stop backend server → Error page should appear
- [ ] Click "Retry" on error page → Should check connection
- [ ] Start server → Should reconnect automatically
- [ ] Logout → Token should be removed

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to server"
**Solution:** Check your backend URL in `utils/baseUrl.js`

### Issue: "401 Unauthorized"
**Solution:** Token might be expired. Login again.

### Issue: Error page not showing
**Solution:** Make sure `ApiInterceptorWrapper` is in `main.jsx`

### Issue: Token not being sent
**Solution:** Make sure you're using the API services from `services/api.js`

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `src/redux/store.js` | Redux store configuration |
| `src/redux/slices/authSlice.js` | Authentication state |
| `src/redux/slices/serverSlice.js` | Server status state |
| `src/utils/apiInterceptor.js` | Axios interceptor setup |
| `src/services/api.js` | API service methods |
| `src/components/ApiInterceptorWrapper.jsx` | Wrapper component |
| `src/components/ServerErrorPage.jsx` | Error page component |
| `utils/baseUrl.js` | Backend URL configuration |

---

## 🎉 You're All Set!

The system is **fully configured** and **production-ready**. Just:

1. ✅ Update your backend URL in `utils/baseUrl.js`
2. ✅ Use the API services to make calls
3. ✅ Dispatch Redux actions for login/logout
4. ✅ Everything else happens automatically!

**Need help?** Check the full documentation in `API_INTERCEPTOR_DOCUMENTATION.md`

---

**Pro Tip:** Check the demo in the app by clicking "Show API Examples" button! 🚀
