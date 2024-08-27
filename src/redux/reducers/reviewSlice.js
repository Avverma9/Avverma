import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "../../baseURL";

export const fetchBookingReview = createAsyncThunk(
  "booking/fetchBookingReview",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/getReviews/hotelId?hotelId=${hotelId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // Fetch booking review
      .addCase(fetchBookingReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingReview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookingReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          `Failed to fetch booking Review: ${action.payload || "Unknown error"}`
        );
      });
  },
});

export default reviewSlice.reducer;
