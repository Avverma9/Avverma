import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import alert from '../../utils/custom_alert/custom_alert';
import { token, userId } from '../../utils/Unauthorized';

export const createTravel = createAsyncThunk('travel/createTravel', async (formDataToSend, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/create-tour`, formDataToSend, {
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
        const response = await axios.get(`${baseURL}/get-tour-list`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getTravelByPrice = createAsyncThunk('travel/getTravelByPrice', async ({ minPrice, maxPrice }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/sort-tour/by-price?minPrice=${minPrice}&maxPrice=${maxPrice}`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});
export const getTravelByDuration = createAsyncThunk('travel/getTravelByDuration', async ({ minNights, maxNights }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/sort-tour/by-duration?minNights=${minNights}&maxNights=${maxNights}`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getTravelByThemes = createAsyncThunk('travel/getTravelByThemes', async (themes, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/sort-tour/by-themes?themes=${themes}`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});
export const getTravelByOrder = createAsyncThunk('travel/getTravelByOrder', async (sort, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/sort-tour/by-order?sort=${sort}`, {
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
        const response = await axios.get(`${baseURL}/get-tour/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const bookNow = createAsyncThunk('travel/bookNow', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${baseURL}/tour-booking/create-tour-booking`,
            data,
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

export const getBookings = createAsyncThunk('travel/getBookings', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${baseURL}/tour-booking/get-users-booking`,
            {
                params: {
                    userId: userId,  // 👈 This sends userId as a query parameter
                },
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

// Fetch seat map for a specific tour vehicle
export const fetchSeatMap = createAsyncThunk(
    'travel/fetchSeatMap',
    async ({ tourId, vehicleId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/tours/${tourId}/vehicles/${vehicleId}/seats`, {
                headers: { Authorization: token }
            });
            return { tourId, vehicleId, seats: response?.data?.seats || [] };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const travelSlice = createSlice({
    name: 'travel',
    initialState: {
        data: [],
        bookings: [],
        travelById: null,
        loading: false,
        error: null,
        // seat map cache keyed by `${tourId}:${vehicleId}`
        seatMapByKey: {},
    },
    reducers: {
        clearSeatError(state) {
            state.error = null;
        }
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
            })
            .addCase(getTravelByPrice.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getTravelByOrder.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getTravelByDuration.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getTravelByThemes.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            // seat map handlers
            .addCase(fetchSeatMap.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeatMap.fulfilled, (state, action) => {
                const { tourId, vehicleId, seats } = action.payload;
                state.loading = false;
                state.seatMapByKey[`${tourId}:${vehicleId}`] = seats;
            })
            .addCase(fetchSeatMap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            });
    },
});

export const { clearSeatError } = travelSlice.actions;
export default travelSlice.reducer;
