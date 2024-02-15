import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";

import Register from "./Component/Register/Register.jsx";
import Login from "./Component/Login/Login";
import Profile from "./Component/Profile/Profile.jsx";
import HeaderImage from "./Component/HeaderImage/HeaderImage";
import Carousel from "./Component/Carousel/Carousel";

import Home from "./Component/Home/Home.jsx";

import ChatBox from "./Component/Chatbot/Chatbot";
import PopupCard from "./Component/Welcome/Welcome";

import Hotel from "./Component/Hotel/Hotel.jsx";

import UserSettings from "./Component/Profile/UserAction";
import Partner from "./Component/Partner/Partner";

import BookNow from "./Component/Hotel/BookNow";

import Offers from "./Component/Offers/Offers";

import Footer from "./Component/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Component/Login/ResetPassword";
import ConfirmEmail from "./Component/Login/ConfirmEmail";
import LoginWithOtp from "./Component/Login/LoginWithOtp";
import { ProfileInformation } from "./Component/Profile/ProfileInformation";
import { getLocalStorage } from "./hooks/useLocalStorage";
import { CancelBooking } from "./Component/Profile/CancelBooking";
import { ConfirmBooking } from "./Component/Profile/ConfirmBooking";
import { MyReviewSection } from "./Component/Profile/MyReviewSection";
import { ComplaintsSection } from "./Component/Profile/ComplaintsSection";
import ViewDetailsModal from "./Component/Profile/ViewDetailsModal";
import Policy from "./Policy/Policy.jsx";
function App() {
  const [userData, setUserData] = useState(null);

  const userDetails = getLocalStorage("loggedUser");
  const isSignedIn = getLocalStorage("isSignedIn");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`https://hotel-backend-tge7.onrender.com/get/${userId}`)
      .then((response) => {
        console.log(response, "RESPONSE");
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        console.log(data, "API CHANGES NEW LOG");
        setUserData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <ToastContainer />
        <HeaderImage />
        <Policy />
        <Carousel />
<Home/>
        <Offers />
        <Hotel />
        <ChatBox />
        <PopupCard />
        <UserSettings />
        <Partner />

        <Routes>
          <Route path="/signin" element={<Login />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />}>
            <Route
              index
              element={
                <ProfileInformation
                  toast={toast}
                  userData={userData}
                  isSignedIn={isSignedIn}
                  userDetails={userDetails}
                />
              }
            />
            <Route
              path="cancel-booking"
              element={<CancelBooking toast={toast} />}
            />
            <Route
              path="confirm-booking"
              element={<ConfirmBooking toast={toast} />}
            />

            <Route path="reviews" element={<MyReviewSection />} />
            <Route path="view-details" element={<ViewDetailsModal />} />
            <Route
              path="complaints"
              element={
                <ComplaintsSection
                  userData={userData}
                  isSignedIn={isSignedIn}
                />
              }
            />
          </Route>
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/passwordChangeMail" element={<ConfirmEmail />} />
          <Route path="/otplogin" element={<LoginWithOtp />} />
          <Route path="state" element={<HeaderImage />} />

          <Route
            path="/hotels/:id"
            element={<BookNow userData={userData} toast={toast} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
