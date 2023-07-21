import React from "react";
import "./PageContainer.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Profile } from "../../Pages/Profile/Profile";
import { Auction } from "../../Pages/Auction/Auction";
import { User } from "../../Pages/User/User";
import Liveauction from "../../Pages/Liveauction/Liveauction";
import Upcoming from "../../Pages/Upcomingauction/Upcoming";
import Filter from "../../Pages/Liveauction/Filter/Filter";
import Sort from "../../Pages/Liveauction/Sort/Sort";
import {YourWins} from '../../Pages/Wins/YourWins';
import { BiddingStatus } from "../../Pages/BiddingStatus/BiddingStatus";

export const PageContainer = () => {
  return (
    <div className="page_container">
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/user" element={<User />} />
          <Route path="/live-auction" element={<Liveauction />} />
          <Route path="/upcoming-auction" element={<Upcoming />} />
          <Route path="/live-auction/filter" element={<Filter />} />
          <Route path="/live-auction/sort" element={<Sort />} />
          <Route path="/wins" element={<YourWins />} />
          <Route path="bidding-status" element={<BiddingStatus />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};
