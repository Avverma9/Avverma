import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "../../utils/baseURL";
import { token } from "../../utils/Unauthorized";



export const getGst = createAsyncThunk(
    "gst/getGst",
    async (payload, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${baseURL}/gst/get-single-gst?type=${payload?.type}&gstThreshold=${payload?.gstThreshold}`,
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


// Initial state
const initialState = {
    gst: null,
    gstList: [],
};

// Slice
const gstSlice = createSlice({
    name: "gst",
    initialState,
    reducers: {
        resetGst: (state) => {
            state.gst = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getGst.fulfilled, (state, action) => {
                state.gst = action.payload;
            })

    },
});

export const { resetGst } = gstSlice.actions;
export default gstSlice.reducer;
