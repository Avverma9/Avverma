// src/redux/reducers.js
import { combineReducers } from 'redux';
import profileReducer from './reducers/profileSlice';
import bookingReducer from './reducers/bookingSlice';
import reviewReducer from './reducers/reviewSlice';
import locationReducer from './reducers/locationSlice';
import partnerReducer from './reducers/partnerSlice';
import complaintReducer from './reducers/complaintSlice';
import travelReducer from './reducers/travelSlice';
import gstReducer from './reducers/gstSlice';
import mailReducer from './reducers/mailSlice'; // Import the mail reducer
// Combine reducers into a rootReducer
const rootReducer = combineReducers({
    profile: profileReducer,
    booking: bookingReducer,
    review: reviewReducer,
    location: locationReducer,
    partner: partnerReducer,
    complaint: complaintReducer,
    travel: travelReducer,
    gst: gstReducer,
    mail:mailReducer, // Add the mail reducer
});

export default rootReducer;
