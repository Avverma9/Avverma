import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import alert from '../../utils/custom_alert/custom_alert';

// Async Thunk for creating a travel
export const createTravel = createAsyncThunk('travel/createTravel', async (formDataToSend, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/create-travel`, formDataToSend);
        if (response.status === 201) {
            alert('Yur request is saved !');
        }
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Async Thunk for booking a travel
export const bookNow = createAsyncThunk('travel/bookNow', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/book-now`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Travel slice
const travelSlice = createSlice({
    name: 'travel',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTravel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(bookNow.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            });
    },
});

export default travelSlice.reducer;
