import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import { token, userMobile } from '../../utils/Unauthorized';

export const addCar = createAsyncThunk('car/addCar', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/travel/add-a-car`, data, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

export const getCarById = createAsyncThunk('car/getCarById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/travel/get-a-car/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

export const getAllCars = createAsyncThunk('car/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/travel/get-all-car`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

export const filterCar = createAsyncThunk('car/filterCar', async ({ query, value }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/travel/filter-car/by-query?${query}=${value}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

export const getSeatsData = createAsyncThunk('car/getSeatsData', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/travel/get-seat-data/by-id/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

export const bookSeat = createAsyncThunk('car/bookSeat', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/travel/create-travel/booking`, data, {
      headers: { Authorization: token },
    });
    toast.success('Seat booked successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

export const getBookings = createAsyncThunk('car/getBookings', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${baseURL}/travel/get-bookings-by/bookedBy`,
      { customerMobile: userMobile },
      { headers: { Authorization: token } }
    );
    return response.data; // should be { data: [...] }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`Error: ${errorMessage}`);
    return rejectWithValue(errorMessage);
  }
});

const carSlice = createSlice({
  name: 'car',
  initialState: {
    data: [],
    filterCar: [],
    seatsData: [],
    bookings: [], // ✅ add bookings state
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCar.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.data = [action.payload];
      })
      .addCase(getSeatsData.fulfilled, (state, action) => {
        state.seatsData = [action.payload];
      })
      .addCase(bookSeat.fulfilled, (state, action) => {
        state.data.push(action.payload); // ✅ fixed push
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(filterCar.fulfilled, (state, action) => {
        state.filterCar = action.payload;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        if (Array.isArray(action.payload?.data)) {
          state.bookings = action.payload.data; // ✅ fix Immer error
        } else {
          state.bookings = [];
        }
      });
  },
});

export default carSlice.reducer;
