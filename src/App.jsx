import "./App.css";

import { Routes, Route } from "react-router-dom";
import { LoaderProvider } from "./utils/loader";
import { ToastProvider } from "./utils/toast";
import Header from "./components/Header";
import BookNow from "./pages/booking/Booknow";
import HeaderTravel from "./components/TravelLocations";
// import ProfileSidebar from "./components/profile/ProfileSidebar";
import Hotel from "./pages/hotel/hotel";
import SearchForm from "./components/Search";
// import Banner from "./pages/home-section/Banner";
import Offered from "./pages/home-section/Offered";
import LoginPage from "./components/auth/login";
// import Locations from "./pages/home-section/Locations";
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
// import CouponPage from "./components/profile/coupons";
import PoliciesPage from "./pages/PolicyPage";
import Footer from "./components/Footer";
import ModernBottomNavigation from "./components/BottomNavigation";
import ScrollToTop from "./utils/scrollToTop";
import ProfilePage from "./components/profile/profile";
import BookingPage from "./pages/booking/BookingPage";
import TourBooking from "./components/profile/TourBooking";
import Reviews from "./components/profile/MyReviews";
import ComplaintsPage from "./components/profile/complaints";

export default function App() {
  return (
    <div className="App">
      <LoaderProvider>
        <ToastProvider>
          <Header />
          <BookNow />
          <HeaderTravel />
          {/* <ProfileSidebar /> */}
          <Hotel />
          <SearchForm />
          {/* <Banner /> */}
          <Offered />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={<Locations />} /> */}
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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/tour-bookings" element={<TourBooking />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/" element={<Offered />} />
            {/* <Route path='/policies' element={<PoliciesPage />} /> */}
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/careers' element={<Careers />} />
            {/* <Route path='/coupons' element={< CouponPage/>} /> */}
            <Route path='/policies' element={<PoliciesPage />} />
          </Routes>
          <ScrollToTop />
          <Footer />
          <ModernBottomNavigation />
        </ToastProvider>

      </LoaderProvider>
    </div>
  );
}
