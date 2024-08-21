import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import baseURL from "../baseURL";

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

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null,
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
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          `Failed to fetch booking data: ${
            action.payload.message || "Unknown error"
          }`
        );
      });
  },
});

export default bookingSlice.reducer;
