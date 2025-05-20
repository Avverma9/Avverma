import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CarouselPage from './components/CarouselBanner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchForm from './components/Search';
import Offered from './components/Offered';
import Footer from './components/Footer';
import HeaderImage from './components/HeaderLocation';

import LoginPage from './components/Authentication/Login.jsx';
import RegisterPage from './components/Authentication/Register.jsx';

import BookNow from './components/Booknow/Booknow.jsx';

import PartnerForm from './components/Hotels/Partner.jsx';
import PolicyForm from './components/Hotels/PartnerPolicy.jsx';
import Bottom from './components/Bottom.jsx';
import AmenitiesPage from './components/Hotels/PartnerAmenities.jsx';
import PartnerFoods from './components/Hotels/PartnerFoods.jsx';
import PartnerRooms from './components/Hotels/PartnerRooms.jsx';

import { LoaderProvider } from './utils/loader'; // Import the LoaderProvider
import ScrollToTop from './utils/scrollToTop';
import Settings from './components/Profile/Settings';
import Travel from './components/Travels/travel-page';
import TravelForm from './components/Travels/partnerPage';
import TravelBooking from './components/Travels/travel-booking';
import Hotel from './components/Hotels/pages/Hotel';
import Hero from './components/landingPage/Hero';
import Coupon from './components/Profile/coupon.jsx';

function App() {
    return (
        <LoaderProvider>
            <div className="App">
                <Router>
                    <Header />
                    <Settings />
                    <Coupon/>
                    <BookNow />
                    <HeaderImage />
                    <Hotel />
                    <Hero />
                    <SearchForm />
                    <CarouselPage />
                    <Offered />
                    <ScrollToTop /> {/* Add ScrollToTop component */}
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        {/* <Route path="/about" element={<NewComponent />} /> */}

                        <Route path="/travellers" element={<Travel />} />
                        <Route path="/travellers/booking/:id" element={<TravelBooking />} />
                        <Route path="/partner" element={<PartnerForm />} />
                        <Route path="/travel-partner" element={<TravelForm />} />
                        <Route path="/partner/second-step" element={<PolicyForm />} />
                        <Route path="/partner/third-step" element={<AmenitiesPage />} />
                        <Route path="/partner/fourth-step" element={<PartnerFoods />} />
                        <Route path="/partner/last-step" element={<PartnerRooms />} />
                    </Routes>
                  
                    <Footer />  
                    <Bottom />
                    <ToastContainer /> {/* Add ToastContainer here */}
                </Router>
            </div>
        </LoaderProvider>
    );
}

export default App;
