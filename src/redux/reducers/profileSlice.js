import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../baseURL";
import { toast } from "react-toastify"; // Import toast

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
  }
);

// Async thunk for updating profile data
export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
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
        toast.error(
          `Failed to fetch profile: ${
            action?.payload?.message || "Unknown error"
          }`
        );
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
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
        toast.error(
          `Failed to update profile: ${
            action?.payload?.message || "Unknown error"
          }`
        );
      });
  },
});

export default profileSlice.reducer;
