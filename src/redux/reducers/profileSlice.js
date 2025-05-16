import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { token } from "../../utils/Unauthorized";
import alert from "../../utils/custom_alert/custom_alert";

// Async thunk for fetching profile data
export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/get/${userId}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Async thunk for updating profile data
export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });      
      alert("Profile updated successfully");
      return response.data;

    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      alert(errorMessage);
      return rejectWithValue(err.response.data);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
    updateSuccess: false,
    bookingData: null, // New state for booking data
    bookingLoading: false, // New state for booking data loading
    bookingError: null, // New state for booking data error
  },
  reducers: {
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        if (action.payload.userImage && action.payload.userImage.length > 0) {
          const firstImageUrl = action.payload.userImage[0];
          localStorage.setItem("userImage", firstImageUrl);
        }
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfileData.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      });
  },
});

export default profileSlice.reducer;
