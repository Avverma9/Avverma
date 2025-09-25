import "./App.css";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/Register";
import { Routes, Route } from "react-router-dom";
import { LoaderProvider } from "./utils/loader";
import { ToastProvider } from "./utils/toast";
import Header from "./components/Header";
import HeaderTravel from "./components/TravelLocations";
import ModernBottomNavigation from "./components/BottomNavigation";
import Footer from "./components/Footer";
import AboutPage from "./pages/about";
import ContactPage from "./pages/Contact";
import Careers from "./pages/Careers";
import SearchForm from "./components/Search";
import Locations from "./pages/home-section/locations";
import Banner from "./pages/home-section/banner";
import Offered from "./pages/home-section/Offered";
import Hotel from "./pages/hotel/hotel";
import ScrollToTopButton from "./utils/scrollToTop";
import BookNow from "./pages/booking/Booknow";
import Policies from "./pages/booking/policies";
import TourPackages from './pages/tour/tour-package'
import HotelPartnerForm from "./pages/partner/hotel-partner";
import CabsBooking from "./pages/cabs/CabBooking";
import Cabs from "./pages/cabs/Cabs";
import PolicyForm from "./pages/partner/hotel-policy";
import AmenitiesPage from "./pages/partner/hotel-amenities";
import PartnerFoods from "./pages/partner/hotel-foods";
import PartnerRooms from "./pages/partner/hotel-rooms";
import TourBookPage from "./pages/tour/tour-booking";
import Coupon from "./components/profile/coupons";
import ProfileSidebar from "./components/profile/profile-sidebar";

export default function App() {
  return (
    <div className="App">
      <LoaderProvider>
        <ToastProvider>
          <Header />
          <BookNow />
          <HeaderTravel />
          <ProfileSidebar />
          <Hotel />
          <SearchForm />
          <Banner />
          <Offered />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Locations />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/holidays" element={<TourPackages />} />
            <Route path="/travellers/booking/:id" element={<TourBookPage />} />
            <Route path="/partner" element={<HotelPartnerForm />} />
            <Route path="/partner/second-step" element={<PolicyForm />} />
            <Route path="/partner/third-step" element={<AmenitiesPage />} />
            <Route path="/partner/fourth-step" element={<PartnerFoods />} />
            <Route path="/partner/last-step" element={<PartnerRooms />} />
            <Route path="/cab-booking/:id" element={<CabsBooking />} />
            <Route path="/cabs" element={<Cabs />} />
            <Route path="/" element={<Offered />} />
            {/* <Route path='/policies' element={<PoliciesPage />} /> */}
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/coupons' element={<Coupon />} />
            <Route path='/policies' element={<Policies />} />
          </Routes>
          <ScrollToTopButton />
          <Footer />
          <ModernBottomNavigation />
        </ToastProvider>

      </LoaderProvider>
    </div>
  );
}
