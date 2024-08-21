// src/redux/reducers.js
import { combineReducers } from "redux";
import profileReducer from "./profileSlice";
import bookingReducer from "./bookingSlice";

// Combine reducers into a rootReducer
const rootReducer = combineReducers({
  profile: profileReducer,
  booking: bookingReducer,
});

export default rootReducer;
