import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header/Header';
// import Home from './Component/Home/Home';
// import About from './Component/About/About';
// import Contact from './Component/Contact/Contact';
import Register from './Component/Register/Register.jsx';
import Login from './Component/Login/Login';
import Profile from './Component/Profile/Profile.jsx';
import HeaderImage from './Component/HeaderImage/HeaderImage';

// import CarouselPage from './Component/Carousel/Carousel';
// import IndividualIntervalsExample from './Component/Carousel/Carousel';
import Carousel from './Component/Carousel/Carousel';
// import SearchComponent from './Component/Search/Search';
import Home from './Component/Home/Home.jsx'

import ChatBox from './Component/Chatbot/Chatbot';
import PopupCard from './Component/Welcome/Welcome';
import Footer from './Component/Footer/Footer';
import Hotel from './Component/Hotel/Hotel.jsx';

import UserSettings from './Component/Profile/UserAction';
import Partner from './Component/Partner/Partner';
import PunjabPage from './Component/States/Punjab/Punjab';




function App() {
  return (
    <Router>
      <div>
        <Header />
       
         <HeaderImage/>
       
   <Carousel/>
   {/* <SearchComponent/> */}
   <Home/>
  <Hotel/>
   <ChatBox/>
   <PopupCard/>
   
        <Register/>
        <Login/>
        <Profile/>
        <UserSettings/>
        <Partner/>
        <PunjabPage/>
        <Footer/>
        <Routes>
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
