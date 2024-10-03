import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CarouselPage from "./components/CarouselBanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "./components/Search";
import Offered from "./components/Offered";
import Footer from "./components/Footer";
import HeaderImage from "./components/HeaderLocation";

import LoginPage from "./components/Authentication/Login.jsx";
import RegisterPage from "./components/Authentication/Register.jsx";


import BookNow from "./components/Booknow/Booknow.jsx";
import Hotel from "./components/Hotels/Hotel.jsx";
import PartnerForm from "./components/Hotels/Partner.jsx";
import PolicyForm from "./components/Hotels/PartnerPolicy.jsx";
import Bottom from "./components/Bottom.jsx";
import AmenitiesPage from "./components/Hotels/PartnerAmenities.jsx";
import PartnerFoods from "./components/Hotels/PartnerFoods.jsx";
import PartnerRooms from "./components/Hotels/PartnerRooms.jsx";

import { LoaderProvider } from "./utils/loader"; // Import the LoaderProvider
import ScrollToTop from "./utils/scrollToTop";
import Settings from "./components/Profile/Settings";

function App() {
  return (
    <LoaderProvider>
      <div className="App">
        <Router>
          <Header />
          <Settings />
          <BookNow />
          <HeaderImage />
          <Hotel />
          <CarouselPage />
          <SearchForm />
          <Offered />
          <ScrollToTop /> {/* Add ScrollToTop component */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/partner" element={<PartnerForm />} />
            <Route path="/partner/second-step" element={<PolicyForm />} />
            <Route path="/partner/third-step" element={<AmenitiesPage />} />
            <Route path="/partner/fourth-step" element={<PartnerFoods />} />
            <Route path="/partner/last-step" element={<PartnerRooms />} />
          </Routes>
          <Bottom />
          <Footer />
          <ToastContainer /> {/* Add ToastContainer here */}
        </Router>
      </div>
    </LoaderProvider>
  );
}

export default App;
