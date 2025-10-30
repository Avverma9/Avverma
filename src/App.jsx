import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderProvider } from "./utils/loader";
import { ToastProvider } from "./utils/toast";

// Components
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
import Policies from "./pages/booking/policies";
import ServerErrorPage from "./pages/errors/ServerError"; // ✅ Add karo

import baseURL from "./utils/baseURL";

// Loading component
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    </div>
  );
}

// Main layout
function MainLayout() {
  return (
    <>
      <Header />
      <HeaderTravel />
      <BookNow />
      <ProfileSideBar />
      <Hotel />
      <Banner />
      <SearchForm />

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
        <Route path="/offered" element={<Offered />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/coupons" element={<CouponPage />} />
        <Route path="/policies" element={<Policies />} />
      </Routes>

      <ScrollToTop />
      <ModernBottomNavigation />
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isServerUp, setIsServerUp] = useState(true);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        // ✅ Yahan baseURL check karo
        const response = await fetch(`${baseURL}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        });

        setIsServerUp(response.ok);
      } catch (error) {
        console.error('Server health check failed:', error);
        setIsServerUp(false);
      } finally {
        setLoading(false);
      }
    };

    checkServerHealth();
  }, []);

  // ✅ Loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ Server error screen
  if (!isServerUp) {
    return <ServerErrorPage />;
  }

  // ✅ Normal app
  return (
    <div className="App flex flex-col">
      <LoaderProvider>
        <ToastProvider>
          <MainLayout />
        </ToastProvider>
      </LoaderProvider>
    </div>
  );
}
