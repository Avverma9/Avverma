import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import alert from '../../utils/custom_alert/custom_alert';
import { token } from '../../utils/Unauthorized';

// Define the async thunk
export const sendBookingMail = createAsyncThunk('mail/sendBookingMail', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/mail/send-booking-mail`, payload, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const sendMessage = createAsyncThunk('mail/sendMessage', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/mail/send-message`, payload, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Create the slice
const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        // .addCase(fetchLocation.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })

    },
});

export default mailSlice.reducer;
