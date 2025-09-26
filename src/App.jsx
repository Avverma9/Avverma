import "./App.css";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/Register";
import { Routes, Route } from "react-router-dom";
import { LoaderProvider } from "./utils/loader";
import { ToastProvider } from "./utils/toast";
import Header from "./components/Header";
import HeaderTravel from "./components/TravelLocations";
import Footer from "./components/Footer";
import AboutPage from "./pages/about";
import ContactPage from "./pages/Contact";
import Careers from "./pages/Careers";
import HomePage from "./pages/HomePage";
import ScrollToTopButton from "./utils/scrollToTop";
import Policies from "./pages/booking/policies";
import TourPackages from './pages/tour/tour-package'
import HotelPartnerForm from "./pages/partner/hotel-partner";
import CabsBooking from "./pages/cabs/CabBooking";
import Cabs from "./pages/cabs/Cabs";
import TourBookPage from "./pages/tour/tour-booking";
import { CouponPage, ProfileLayout } from "./components/profile";
import ModernBottomNavigation from "./components/BottomNavigation";

export default function App() {
  return (
    <div className="App">
      <LoaderProvider>
        <ToastProvider>
          <Header />
          <HeaderTravel />
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/holidays" element={<TourPackages />} />
            <Route path="/cabs" element={<Cabs />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/policies' element={<Policies />} />

            {/* Dynamic/Booking Pages */}
            <Route path="/travellers/booking/:id" element={<TourBookPage />} />
            <Route path="/cab-booking/:id" element={<CabsBooking />} />
            <Route path="/partner" element={<HotelPartnerForm />} />

            {/* Profile Section */}
            <Route path="/profile/*" element={<ProfileLayout />} />
            <Route path="/bookings/*" element={<ProfileLayout />} />
            <Route path="/tour-bookings/*" element={<ProfileLayout />} />
            <Route path="/complaints/*" element={<ProfileLayout />} />
            <Route path="/reviews/*" element={<ProfileLayout />} />

            <Route path='/coupons' element={<CouponPage />} />
          </Routes>
          <ScrollToTopButton />
          <Footer />
          <ModernBottomNavigation />
        </ToastProvider>

      </LoaderProvider>
    </div>
  );
}
