import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CarouselPage from './components/CarouselBanner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchForm from './components/Hotels/Searchbox/Search';
import Offered from './components/Offered';
import Footer from './components/Footer';
import HeaderImage from './components/HeaderLocation';

import LoginPage from './components/Authentication/Login.jsx';
import RegisterPage from './components/Authentication/Register.jsx';

import BookNow from './components/Booknow/Booknow.jsx';

import PartnerForm from './components/Hotels/Partner/Partner.jsx';
import PolicyForm from './components/Hotels/Partner/PartnerPolicy.jsx';
import Bottom from './components/Bottom.jsx';
import AmenitiesPage from './components/Hotels/Partner/PartnerAmenities.jsx';
import PartnerFoods from './components/Hotels/Partner/PartnerFoods.jsx';
import PartnerRooms from './components/Hotels/Partner/PartnerRooms.jsx';

import { LoaderProvider } from './utils/loader'; // Import the LoaderProvider
import ScrollToTop from './utils/scrollToTop';
import Settings from './components/Profile/Settings';
import Travel from './components/Travels/tour-package';
import TravelForm from './components/Travels/partnerPage';
import TravelBooking from './components/Travels/tour-booking';
import Hotel from './components/Hotels/pages/Hotel';
import Hero from './components/landingPage/Hero';
import Coupon from './components/Profile/coupon.jsx';
import Policies from './components/Booknow/policies.jsx';

import ScrollToTopButton from './utils/scrollToTop.jsx';
import Careers from './components/extras/Careers.jsx';
import { ToastProvider } from './utils/toast';
import Cars from './components/Cabs/Cabs';
import TourBookingPage from './components/Travels/tour-booking';
import AboutPage from './components/extras/About';
import ContactPage from './components/extras/Contact';

function App() {
    return (
        <LoaderProvider>
            <ToastProvider>
            <div className="App">
                <Router>
                    <Header />

                    <Settings />
                    <BookNow />
                    <HeaderImage />
                    <Hotel /> 
                    <SearchForm />
                    <Hero />
                   
                    {/* <CarouselPage /> */}
                    <Offered />
                    <ScrollToTop /> {/* Add ScrollToTop component */}
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        {/* <Route path="/about" element={<NewComponent />} /> */}
                        <Route path='/policies' element={<Policies />} />
                        <Route path='/about' element={<AboutPage/>}/>
                        <Route path='/contact' element={<ContactPage/>}/>

                        <Route path="/travellers" element={<Travel />} />
                        <Route path="/travellers/booking/:id" element={<TourBookingPage />} />
                        <Route path="/partner" element={<PartnerForm />} />
                        <Route path="/travel-partner" element={<TravelForm />} />
                        <Route path="/partner/second-step" element={<PolicyForm />} />
                        <Route path="/partner/third-step" element={<AmenitiesPage />} />
                        <Route path="/coupons" element={<Coupon />} />
                        <Route path='/cabs' element={<Cars />} />
                        <Route path="/partner/fourth-step" element={<PartnerFoods />} />
                        <Route path='/careers' element={<Careers/>}/>
                        <Route path="/partner/last-step" element={<PartnerRooms />} />
                    </Routes>

                    <Footer />
                    <Bottom />
                    <ToastContainer /> {/* Add ToastContainer here */}
                    <ScrollToTopButton />
                </Router>
            </div>
            </ToastProvider>
        </LoaderProvider>
    );
}

export default App;
