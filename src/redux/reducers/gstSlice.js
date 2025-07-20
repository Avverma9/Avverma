import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
export const getGst = createAsyncThunk(
    "gst/getGst",
    async ({type,gstThreshold}, { rejectWithValue }) => {
      
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${baseURL}/gst/get-single-gst?type=${type}&gstThreshold=${gstThreshold}`,
                {
                    headers: { Authorization: token },
                }
            );
            return response.data?.data || response.data; // ensure data extraction
        } catch (error) {
            console.error("Error fetching GST:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// We only need one thunk as both were identical.
export const getGstForHotelData = createAsyncThunk(
    "gst/getGstForHotelData",
    async ({ type, gstThreshold }, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${baseURL}/gst/get-single-gst?type=${type}&gstThreshold=${gstThreshold}`,
                {
                    headers: { Authorization: token },
                }
            );
            // Return the actual data payload, which might be null if no GST applies.
            return response.data?.data || response.data;
        } catch (error) {
            console.error("Error fetching GST:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Simplified and more robust initial state
const initialState = {
    gstData: null, // This will hold the single GST object like { gstPrice, ... }
    loading: false,
    error: null,
};

// Slice
const gstSlice = createSlice({
    name: "gst",
    initialState,
    reducers: {
        // This is the new reducer to clear the GST data from the component.
        clearGstData: (state) => {
            state.gstData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle loading state when the API call is in progress
            .addCase(getGstForHotelData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
              .addCase(getGst.fulfilled, (state, action) => {
                state.gst = action.payload;
            }) 
            // Handle successful API call
            .addCase(getGstForHotelData.fulfilled, (state, action) => {
                state.loading = false;
                state.gstData = action.payload;
            })
            // Handle failed API call
            .addCase(getGstForHotelData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.gstData = null; // Also clear data on error
            });
    },
});

// Export the new action so you can use it in your component
export const { clearGstData } = gstSlice.actions;

export default gstSlice.reducer;