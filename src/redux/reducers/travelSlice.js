import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import alert from '../../utils/custom_alert/custom_alert';
import { token } from '../../utils/Unauthorized';

export const createTravel = createAsyncThunk('travel/createTravel', async (formDataToSend, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/create-travel`, formDataToSend, {
            headers: {
                Authorization: token,
            },
        });
        if (response.status === 201) {
            alert('Your request is saved!');
        }
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getTravelList = createAsyncThunk('travel/getTravelList', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/get-travel-list`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getTravelById = createAsyncThunk('travel/getTravelById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/get-travel/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const bookNow = createAsyncThunk('travel/bookNow', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${baseURL}/book-now`,

            {
                headers: {
                    Authorization: token,
                },
            }
        );
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const travelSlice = createSlice({
    name: 'travel',
    initialState: {
        data: [],
        travelById: null,
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
            })
            .addCase(getTravelList.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getTravelById.fulfilled, (state, action) => {
                state.travelById = action.payload;
                state.loading = false;
            });
    },
});

export default travelSlice.reducer;
