import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';

import { toast } from 'react-toastify';

// Async thunk for fetching booking data
export const fetchBookingData = createAsyncThunk('booking/fetchBookingData', async (hotelId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${baseURL}/hotels/get-by-id/${hotelId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch booking data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchMonthlyData = createAsyncThunk('booking/fetchMonthlyData', async (hotelId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${baseURL}/monthly-set-room-price/get/by/${hotelId}`);
        if (response.status !== 200) {
            return rejectWithValue('Failed to fetch monthly data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for fetching filtered booking data
export const fetchFilteredBooking = createAsyncThunk(
    'booking/fetchFilteredBooking',
    async ({ selectedStatus, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/get/all/users-filtered/booking/by`, {
                params: {
                    bookingStatus: selectedStatus,
                    userId: userId,
                },
            });
            return response.data; // Return the fetched data
        } catch (error) {
            return rejectWithValue(error.message); // Pass the error message
        }
    }
);
export const applyCouponCode = createAsyncThunk(
    'booking/applyCouponCode',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`${baseURL}/user-coupon/apply/a/coupon-to-room/user`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) { 
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong. Please try again.'
        );
        return rejectWithValue(error.message);
       

      }
    }
  );
const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        data: null,
        monthlyData: [],
        bookingData: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Fetch booking data
            .addCase(fetchBookingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingData.fulfilled, (state, action) => {
                state.bookingData = action.payload;
                state.loading = false;
            })
            .addCase(fetchBookingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.info(`Failed to fetch booking data: ${action.payload || 'Unknown error'}`);
            })
            // Fetch filtered booking data
            .addCase(fetchFilteredBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredBooking.fulfilled, (state, action) => {
                state.data = action.payload; // Update state with new data if required
                state.loading = false;
            })
            .addCase(fetchFilteredBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              
            })
            // Fetch monthly data
            .addCase(fetchMonthlyData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMonthlyData.fulfilled, (state, action) => {
                state.monthlyData = action.payload; // Update state with new data if required
                state.loading = false;
            })
            .addCase(fetchMonthlyData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookingSlice.reducer;
