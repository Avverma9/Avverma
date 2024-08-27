// src/redux/reducers.js
import { combineReducers } from "redux";
import profileReducer from "./reducers/profileSlice";
import bookingReducer from "./reducers/bookingSlice";
import reviewReducer from "./reducers/reviewSlice";
import locationReducer from "./reducers/locationSlice";
// Combine reducers into a rootReducer
const rootReducer = combineReducers({
  profile: profileReducer,
  booking: bookingReducer,
  review: reviewReducer,
  location: locationReducer,
});

export default rootReducer;
