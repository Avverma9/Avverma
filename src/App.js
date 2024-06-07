import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Hotel/Header";
import CarouselPage from "./Hotel/CarouselBanner";
import SearchForm from "./Hotel/Search";
import Offered from "./Hotel/Offered";
import Footer from "./Hotel/Footer";
import HeaderImage from "./Hotel/HeaderLocation";
import Dropdown from "./Hotel/DropDown/DropDown.jsx";
import LoginPage from "./Hotel/Authentication/Login.jsx";
import RegisterPage from "./Hotel/Authentication/Register.jsx";
import ProfileSidebar from "./Hotel/Profile/ProfileSidebar.jsx";
import Profile from "./Hotel/Profile/Profile.jsx";
import Navigation from "./Hotel/Profile/Navigation.jsx";
import UpdatePage from "./Hotel/Profile/UpdatePage.jsx";
import { ConfirmBooking } from "./Hotel/Bookings/Bookings.jsx";
import BookNow from "./Hotel/Booknow/Booknow.jsx";
import FilterDropdownBar from "./Hotel/Hotels/FilterSidebar.jsx";
import FilterSidebar from "./Hotel/Hotels/FilterSidebar.jsx";
import Hotel from "./Hotel/Hotels/Hotel.jsx";
import Partner from "./Hotel/Hotels/Partner.jsx";
import PartnerForm from "./Hotel/Hotels/Partner.jsx";
import PolicyForm from "./Hotel/Hotels/PartnerPolicy.jsx";
import Bottom from "./Hotel/Bottom.jsx";
import AmenitiesPage from "./Hotel/Hotels/PartnerAmenities.jsx";
import PartnerFoods from "./Hotel/Hotels/PartnerFoods.jsx";
import PartnerRooms from "./Hotel/Hotels/PartnerRooms.jsx";
import Reviews from "./Hotel/Profile/Review.jsx";
import { LoaderProvider } from "./utils/loader"; // Import the LoaderProvider

function App() {
  return (
    <LoaderProvider>
      <div className="App">
        <Router>
          <Header />
          <Navigation />
          <Reviews />
          <UpdatePage />
          <ConfirmBooking />
          <BookNow />
          {/* <ProfileSidebar/> */}
          <HeaderImage />
          <Dropdown />
          <FilterSidebar />
          <Hotel />
          <SearchForm />
          <CarouselPage />
          <Offered />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/partner" element={<PartnerForm />} />
            <Route path="/partner/second-step" element={<PolicyForm />} />
            <Route path="/partner/third-step" element={<AmenitiesPage />} />
            <Route path="/partner/fourth-step" element={<PartnerFoods />} />
            <Route path="/partner/last-step" element={<PartnerRooms />} />
          </Routes>
          <Bottom />
          <Footer />
        </Router>
      </div>
    </LoaderProvider>
  );
}

export default App;
