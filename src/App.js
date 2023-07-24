import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";
// import Home from './Component/Home/Home';
// import About from './Component/About/About';
// import Contact from './Component/Contact/Contact';
// Code start from here
// Sourav Satpati
import Register from "./Component/Register/Register.jsx";
import Login from "./Component/Login/Login";
import Profile from "./Component/Profile/Profile.jsx";
import HeaderImage from "./Component/HeaderImage/HeaderImage";

// import CarouselPage from './Component/Carousel/Carousel';
// import IndividualIntervalsExample from './Component/Carousel/Carousel';
import Carousel from "./Component/Carousel/Carousel";
// import SearchComponent from './Component/Search/Search';
import Home from "./Component/Home/Home.jsx";

import ChatBox from "./Component/Chatbot/Chatbot";
import PopupCard from "./Component/Welcome/Welcome";

import Hotel from "./Component/Hotel/Hotel.jsx";

import UserSettings from "./Component/Profile/UserAction";
import Partner from "./Component/Partner/Partner";
import PunjabPage from "./Component/States/Punjab/Punjab";

import Maharashtrapage from "./Component/States/Maharashtra/Maharashtra";
import Assampage from "./Component/States/Assam/Assam";
import Goapage from "./Component/States/Goa/Goa";
import Tamilnadupage from "./Component/States/Tamilnadu/Tamilnadu";
import Uttarpradeshpage from "./Component/States/Uttarpradesh/Uttarpradesh";
import Delhipage from "./Component/States/Delhi/Delhi";
import Westbengalpage from "./Component/States/Westbengal/Westbengal";
import Rajasthanpage from "./Component/States/Rajasthan/Rajasthan";
import Keralapage from "./Component/States/Kerala/Kerala";
import Biharpage from "./Component/States/Bihar/Bihar";
import Kernatakapage from "./Component/States/Karnataka/Karnataka";
import Gujratpage from "./Component/States/Gujrat/Gujrat";
import Kashmirpage from "./Component/States/Kashmir/Kashmir";
import Haryanapage from "./Component/States/Haryana/Haryana";
import SearchResults from "./Component/Search/SearchResults";
import Dropdownbar from "./Component/Dropdownbar/Dropdown";
import BookNow from "./Component/Hotel/BookNow";
import Jaipur from "./Component/Dropdownbar/city/jaipur/jaipur";
import Kota from "./Component/Dropdownbar/city/kota/kota";
import Sawaimadhopur from "./Component/Dropdownbar/city/sawaimadhopur/sawaimadhopur";
import Udaipur from "./Component/Dropdownbar/city/Udaipur/udaipur";
import Bikaner from "./Component/Dropdownbar/city/bikaner/bikaner";
import Jodhpur from "./Component/Dropdownbar/city/jodhpur/jodhpur";
import Noida from "./Component/Dropdownbar/city/noida/noida";
import Kanpur from "./Component/Dropdownbar/city/kanpur/kanpur";
import Prayagraj from "./Component/Dropdownbar/city/pryagraj/pryagraj";
import Mathura from "./Component/Dropdownbar/city/mathura/mathura";
import Lucknow from "./Component/Dropdownbar/city/lucknow/lucknow";
import Varanasi from "./Component/Dropdownbar/city/varanasi/varanasi";
import Agra from "./Component/Dropdownbar/city/agra/agra";
import Indore from "./Component/Dropdownbar/city/indore/indore";
import Bhopal from "./Component/Dropdownbar/city/Bhopal/bhopal";
import Jabalpur from "./Component/Dropdownbar/city/jabalpur/jabalpur";
import Gwalior from "./Component/Dropdownbar/city/gwalior/gwalior";
import Ujjain from "./Component/Dropdownbar/city/ujjain/ujjain";
import Ratlam from "./Component/Dropdownbar/city/ratlam/ratlam";
import Surat from "./Component/Dropdownbar/city/surat/surat";
import Ahmedabad from "./Component/Dropdownbar/city/ahmedabad/ahmedabad";
import Vadodara from "./Component/Dropdownbar/city/vadodara/vadodara";
import Porbandar from "./Component/Dropdownbar/city/porbandar/porbandar";
import Jamnagar from "./Component/Dropdownbar/city/jamnagar/jamnagar";

import Patna from "./Component/Dropdownbar/city/patna/patna";
import Nalanda from "./Component/Dropdownbar/city/nalanda/nalanda";
import Bhagalpur from "./Component/Dropdownbar/city/Bhagalpur/bhagalpur";
import Darbhanga from "./Component/Dropdownbar/city/darbhanga/darbhanga";
import Gaya from "./Component/Dropdownbar/city/gaya/gaya";
import Mumbai from "./Component/Dropdownbar/city/mumbai/mumbai";
import Pune from "./Component/Dropdownbar/city/pune/pune";
import Nagpur from "./Component/Dropdownbar/city/nagpur/nagpur";
import Nashik from "./Component/Dropdownbar/city/nashik/nashik";
import Akola from "./Component/Dropdownbar/city/akola/akola";
import Ratnagiri from "./Component/Dropdownbar/city/ratnagiri/ratnagiri";
import Amravati from "./Component/Dropdownbar/city/amravati/amravati";
import Latur from "./Component/Dropdownbar/city/latur/latur";
import Ahmadnagar from "./Component/Dropdownbar/city/ahmadnagar/ahmadnagar";
import Dehradun from "./Component/Dropdownbar/city/dehradun/dehradun";
import Nainital from "./Component/Dropdownbar/city/nainital/nainital";
import Rishikesh from "./Component/Dropdownbar/city/rishikesh/rishikesh";
import Mussoorie from "./Component/Dropdownbar/city/mussoorie/mussoorie";
import Haridwar from "./Component/Dropdownbar/city/Haridwar/haridwar";
import Kolhapur from "./Component/Dropdownbar/city/kolhapur/kolhapur";
import Offers from "./Component/Offers/Offers";
import BookNowPage from "./Component/Booknowpage/Booknowpage";
import Footer from "./Component/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Component/Login/ResetPassword";
import ConfirmEmail from "./Component/Login/ConfirmEmail";
import LoginWithOtp from "./Component/Login/LoginWithOtp";
import { ProfileInformation } from "./Component/Profile/ProfileInformation";
import { getLocalStorage } from "./hooks/useLocalStorage";
import { CancelBooking } from "./Component/Profile/CancelBooking";
import { ConfirmBooking } from "./Component/Profile/ConfirmBooking";
import { CheckingBooking } from "./Component/Profile/CheckingBooking";
import { CheckOutBooking } from "./Component/Profile/CheckOutBooking";
import { NoShowBooking } from "./Component/Profile/NoShowBooking";
import { FailedBooking } from "./Component/Profile/FailedBooking";
import { MyReviewSection } from "./Component/Profile/MyReviewSection";
import { ComplaintsSection } from "./Component/Profile/ComplaintsSection";

function App() {
  // console.log(search)
  const [refresh, setRefresh] = useState(1);
  const reset = () => {
    setRefresh(Math.random());
  };

  const [userData, setUserData] = useState(null);

  const userDetails = getLocalStorage("loggedUser");
  const isSignedIn = getLocalStorage("isSignedIn");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`https://hotel-backend-tge7.onrender.com/get/${userId}`)
      .then((response) => {
        console.log(response, "RESPONSE");
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        console.log(data, "API CHANGES NEW LOG");
        setUserData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <ToastContainer />
        <HeaderImage />
        <Dropdownbar />

        <Carousel />

        <Home />
        <Offers />
        <Hotel />
        <ChatBox />
        <PopupCard />

        <UserSettings />
        <Partner />
        <PunjabPage />

        <Maharashtrapage />
        <Goapage />
        <Tamilnadupage />
        <Uttarpradeshpage />
        <Delhipage />
        <Westbengalpage />
        <Rajasthanpage />
        <Keralapage />
        <Biharpage />
        <Assampage />
        <Kernatakapage />
        <Gujratpage />
        <Kashmirpage />
        <Haryanapage />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<Profile refresh={refresh} reset={reset} />}
          >
            <Route
              index
              element={
                <ProfileInformation
                  toast={toast}
                  userData={userData}
                  isSignedIn={isSignedIn}
                  userDetails={userDetails}
                  reset={reset}
                  refresh={refresh}
                />
              }
            />
            <Route
              path="cancel-booking"
              element={<CancelBooking toast={toast} />}
            />
            <Route
              path="confirm-booking"
              element={<ConfirmBooking toast={toast} />}
            />
            <Route path="check-in-booking" element={<CheckingBooking />} />
            <Route path="check-out-booking" element={<CheckOutBooking />} />
            <Route path="no-show-booking" element={<NoShowBooking />} />
            <Route path="failed-booking" element={<FailedBooking />} />
            <Route path="reviews" element={<MyReviewSection />} />
            <Route
              path="complaints"
              element={
                <ComplaintsSection
                  userData={userData}
                  reset={reset}
                  refresh={refresh}
                  isSignedIn={isSignedIn}
                />
              }
            />
          </Route>
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/passwordChangeMail" element={<ConfirmEmail />} />
          <Route path="/otplogin" element={<LoginWithOtp />} />
          <Route path="state" element={HeaderImage} />
          <Route path="/search/results" element={<SearchResults />} />
          <Route
            path="/hotels/:id"
            element={
              <BookNow refresh={refresh} reset={reset} userData={userData} />
            }
          />
          <Route path="/cities/jaipur" element={<Jaipur />} />
          <Route path="/cities/kota" element={<Kota />} />
          <Route path="/cities/Sawai Madhopur" element={<Sawaimadhopur />} />
          <Route path="cities/udaipur" element={<Udaipur />} />
          <Route path="cities/bikaner" element={<Bikaner />} />
          <Route path="cities/jodhpur" element={<Jodhpur />} />
          <Route path="cities/noida" element={<Noida />} />
          <Route path="cities/kanpur" element={<Kanpur />} />
          <Route path="cities/prayagraj" element={<Prayagraj />} />
          <Route path="cities/mathura" element={<Mathura />} />
          <Route path="cities/lucknow" element={<Lucknow />} />
          <Route path="cities/varanasi" element={<Varanasi />} />
          <Route path="cities/agra" element={<Agra />} />
          <Route path="cities/Indore" element={<Indore />} />
          <Route path="cities/bhopal" element={<Bhopal />} />
          <Route path="cities/jabalpur" element={<Jabalpur />} />
          <Route path="cities/gwalior" element={<Gwalior />} />
          <Route path="cities/ujjain" element={<Ujjain />} />
          <Route path="cities/ratlam" element={<Ratlam />} />
          <Route path="cities/surat" element={<Surat />} />
          <Route path="cities/Ahmedabad" element={<Ahmedabad />} />
          <Route path="cities/vadodara" element={<Vadodara />} />
          <Route path="cities/porbandar" element={<Porbandar />} />
          <Route path="cities/jamnagar" element={<Jamnagar />} />
          <Route path="cities/patna" element={<Patna />} />
          <Route path="cities/nalanda" element={<Nalanda />} />
          <Route path="cities/bhagalpur" element={<Bhagalpur />} />
          <Route path="cities/darbhanga" element={<Darbhanga />} />
          <Route path="cities/gaya" element={<Gaya />} />
          <Route path="cities/mumbai" element={<Mumbai />} />
          <Route path="cities/pune" element={<Pune />} />
          <Route path="cities/nagpur" element={<Nagpur />} />
          <Route path="cities/nashik" element={<Nashik />} />
          <Route path="cities/akola" element={<Akola />} />
          <Route path="cities/ratnagiri" element={<Ratnagiri />} />
          <Route path="cities/amravati" element={<Amravati />} />
          <Route path="cities/latur" element={<Latur />} />
          <Route path="cities/ahmadnagar" element={<Ahmadnagar />} />
          <Route path="cities/dehradun" element={<Dehradun />} />
          <Route path="cities/Nainital" element={<Nainital />} />
          <Route path="cities/Rishikesh" element={<Rishikesh />} />
          <Route path="cities/mussoorie" element={<Mussoorie />} />
          <Route path="cities/haridwar" element={<Haridwar />} />
          <Route path="cities/kolhapur" element={<Kolhapur />} />
          <Route
            path="/book-now/:offerId"
            element={<BookNowPage refresh={refresh} reset={reset} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
