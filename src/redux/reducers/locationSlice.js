import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import alert from '../../utils/custom_alert/custom_alert';

// Define the async thunk
export const fetchLocation = createAsyncThunk('location/fetchLocation', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/get-all/travel/location`);
        return response.data;
    } catch (error) {
        // Extract the error message from the error object
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Create the slice
const locationSlice = createSlice({
    name: 'location',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer to be used in the store configuration
export default locationSlice.reducer;
