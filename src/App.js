import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Hotel/Header";
import CarouselPage from "./Hotel/CarouselBanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "./Hotel/Search";
import Offered from "./Hotel/Offered";
import Footer from "./Hotel/Footer";
import HeaderImage from "./Hotel/HeaderLocation";

import LoginPage from "./Hotel/Authentication/Login.jsx";
import RegisterPage from "./Hotel/Authentication/Register.jsx";
import UpdatePage from "./Hotel/Profile/UpdatePage.jsx";
import BookNow from "./Hotel/Booknow/Booknow.jsx";
import Hotel from "./Hotel/Hotels/Hotel.jsx";
import PartnerForm from "./Hotel/Hotels/Partner.jsx";
import PolicyForm from "./Hotel/Hotels/PartnerPolicy.jsx";
import AmenitiesPage from "./Hotel/Hotels/PartnerAmenities.jsx";
import PartnerFoods from "./Hotel/Hotels/PartnerFoods.jsx";
import PartnerRooms from "./Hotel/Hotels/PartnerRooms.jsx";
import { LoaderProvider } from "./utils/loader";
import ScrollToTop from "./utils/scrollToTop";
import Settings from "./Hotel/Profile/Settings";
import Bottom from "./Hotel/Bottom.jsx";

function App() {
  return (
    <LoaderProvider>
      <div className="app-container">
        <Router>
          <Header />
          <div className="main-content">
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/partner" element={<PartnerForm />} />
              <Route path="/partner/second-step" element={<PolicyForm />} />
              <Route path="/partner/third-step" element={<AmenitiesPage />} />
              <Route path="/partner/fourth-step" element={<PartnerFoods />} />
              <Route path="/partner/last-step" element={<PartnerRooms />} />
              {/* Add other routes as needed */}
            </Routes>
            {/* Conditionally render components if needed */}
            <BookNow />
            <HeaderImage />
            <Settings/>
            <Hotel />
            <CarouselPage />
            <SearchForm />
            <Offered />
          </div>
          <Bottom />
          <Footer />
          <ToastContainer />
        </Router>
      </div>
    </LoaderProvider>
  );
}

export default App;
