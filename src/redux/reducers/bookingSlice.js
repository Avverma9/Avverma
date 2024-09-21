import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "../../baseURL";

// Async thunk for fetching booking data
export const fetchBookingData = createAsyncThunk(
  "booking/fetchBookingData",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/hotels/get-by-id/${hotelId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch booking data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyData = createAsyncThunk(
  "booking/fetchMonthlyData",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseURL}/monthly-set-room-price/get/by/${hotelId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch month data");
      }
      const data = await response.json();
           
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching filtered booking data
export const fetchFilteredBooking = createAsyncThunk(
  "booking/fetchFilteredBooking",
  async ({ selectedStatus, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/get/all/users-filtered/booking/by`,
        {
          params: {
            bookingStatus: selectedStatus,
            userId: userId,
          },
        }
      );
      return response.data; // Return the fetched data
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null,
    monthlyData: [],
    bookingData:null,
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
        toast.error(
          `Failed to fetch booking data: ${action.payload || "Unknown error"}`
        );
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
        toast.error("There are no such bookings");
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
        toast.error("Failed to fetch monthly data");
      });
  },
});

export default bookingSlice.reducer;
