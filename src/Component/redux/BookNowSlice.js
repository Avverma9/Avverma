import { createSlice } from "@reduxjs/toolkit";

export const bookNowSlice = createSlice({
    name: "bookNow",
    initialState: {
        bookNowState: {}
    },
    reducers: {
        getBookNowState: (state, action) => {
            state.bookNowState = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { getBookNowState } = bookNowSlice.actions;

export default bookNowSlice.reducer;
