import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "../../baseURL";

// Async thunk for posting a complaint
export const postComplaint = createAsyncThunk(
  "complaint/postComplaint",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/create-a-complaint/on/hotel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Complaint submitted successfully!");
        return response.data; // Return data if needed for further processing
      } else {
        toast.error("Failed to create complaint");
        return rejectWithValue("Failed to create complaint");
      }
    } catch (error) {
      toast.error("Failed to create complaint");
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching complaints
export const fetchComplaints = createAsyncThunk(
  "complaint/fetchComplaints",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/complaints/${userId}`);
      return response.data; // Assuming response data structure
    } catch (error) {
      toast.error("Failed to fetch complaints");
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a complaint
export const deleteComplaint = createAsyncThunk(
  "complaint/deleteComplaint",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseURL}/delete-a-particular/complaints/delete/by/id/${id}`
      );
      if (response.status === 200) {
        toast.success("Complaint deleted successfully!");
        return id; // Return the id of the deleted complaint
      } else {
        toast.error("Failed to delete complaint");
        return rejectWithValue("Failed to delete complaint");
      }
    } catch (error) {
      toast.error("Failed to delete complaint");
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching hotel names by booking ID
export const fetchHotelNamesByBookingId = createAsyncThunk(
  "complaint/fetchHotelNamesByBookingId",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/get/all/filtered/booking/by/query?bookingId=${bookingId}`
      );
      return response.data; // Return the fetched data
    } catch (error) {
      toast.error("Booking ID is not valid");
      return rejectWithValue(error.message); // Pass the error message
    }
  }
);

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    data: [],
    loading: false,
    error: null,
    hotelNames: [], // Added state for hotel names
  },
  extraReducers: (builder) => {
    builder
      // Post complaint
      .addCase(postComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComplaint.fulfilled, (state) => {
        state.loading = false;
        // Optionally, you could refresh complaints here if needed
      })
      .addCase(postComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          `Failed to submit complaint: ${action.payload || "Unknown error"}`
        );
      })
      // Fetch complaints
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          `Failed to fetch complaints: ${action.payload || "Unknown error"}`
        );
      })
      // Delete complaint
      .addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        // Remove the deleted complaint from the list
        state.data = state.data.filter(
          (complaint) => complaint._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          `Failed to delete complaint: ${action.payload || "Unknown error"}`
        );
      })
      // Fetch hotel names by booking ID
      .addCase(fetchHotelNamesByBookingId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelNamesByBookingId.fulfilled, (state, action) => {
        state.hotelNames = action.payload; // Save fetched hotel names to state
        state.loading = false;
      })
      .addCase(fetchHotelNamesByBookingId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default complaintSlice.reducer;
