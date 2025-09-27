import "./App.css";

import { Routes, Route } from "react-router-dom";
import { LoaderProvider } from "./utils/loader";
import { ToastProvider } from "./utils/toast";
import Header from "./components/Header";
import BookNow from "./pages/booking/Booknow";
import HeaderTravel from "./components/TravelLocations";
import Hotel from "./pages/hotel/hotel";
import SearchForm from "./components/Search";
import Offered from "./pages/home-section/Offered";
import LoginPage from "./components/auth/login";

import RegisterPage from "./components/auth/Register";
import TourPackages from "./pages/tour/tour-package";
import TourBookNowPage from "./pages/tour/tour-booking";
import HotelPartnerForm from "./pages/partner/hotel-partner";
import PolicyForm from "./pages/partner/hotel-policy";
import AmenitiesPage from "./pages/partner/hotel-amenities";
import PartnerFoods from "./pages/partner/hotel-foods";
import PartnerRooms from "./pages/partner/hotel-rooms";
import CarsPage from "./pages/cabs/Cabs";
import CabsBooking from "./pages/cabs/CabBooking";
import AboutPage from "./pages/about";
import ContactPage from "./pages/Contact";
import Careers from "./pages/Careers";
import PoliciesPage from "./pages/PolicyPage";
import Footer from "./components/Footer";
import ModernBottomNavigation from "./components/BottomNavigation";
import ScrollToTop from "./utils/scrollToTop";

import ProfileSideBar from "./components/Profile/ProfileSidebar";
import Banner from "./pages/home-section/banner";
import Locations from "./pages/home-section/locations";
import CouponPage from "./components/Profile/coupons";
import TravelForm from "./pages/tour/partnerPage";

export default function App() {
  return (
    <div className="App flex flex-col">
      <LoaderProvider>
        <ToastProvider>
          <Header />
          <BookNow />
          <HeaderTravel />
          <ProfileSideBar />
          <Hotel />
          <SearchForm />
          <Banner />
          <Offered />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Locations />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/holidays" element={<TourPackages />} />
            <Route path="/travellers/booking/:id" element={<TourBookNowPage />} />
            <Route path="/partner" element={<HotelPartnerForm />} />
            <Route path="/partner/second-step" element={<PolicyForm />} />
            <Route path="/partner/third-step" element={<AmenitiesPage />} />
            <Route path="/partner/fourth-step" element={<PartnerFoods />} />
            <Route path="/partner/last-step" element={<PartnerRooms />} />
            <Route path="/cab-booking/:id" element={<CabsBooking />} />
            <Route path="/cabs" element={<CarsPage />} />
            <Route path="/travel-partner" element={<TravelForm />} />
         
            <Route path="/" element={<Offered />} />
            <Route path='/policies' element={<PoliciesPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/coupons' element={< CouponPage/>} />
            <Route path='/policies' element={<PoliciesPage />} />
          </Routes>
          <ScrollToTop />
          
          <ModernBottomNavigation /><Footer />
        </ToastProvider>

      </LoaderProvider>
    </div>
  );
}
