// src/redux/reducers.js
import profileReducer from "./profileSlice"; // Assuming profileReducer is exported from profileSlice.js
import bookingReducer from "./bookingSlice"; // Assuming bookingReducer is exported from bookingSlice.js

const rootReducer = {
  profile: profileReducer,
  booking: bookingReducer,
}

export default rootReducer;
