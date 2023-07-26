import React from "react";
import "./PageContainer.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Welcome } from "../../Pages/Welcome/Welcome";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Biddingdetail from "../../Pages/Bidding_detail/Biddingdeatil";
import Search from "../../Pages/Search/Search";
import Importauction from "../../Pages/Importauction/Importauction";
import { Filterauction } from "../../Pages/Filterauction/Filterauction";
import { YourWins } from "../../Pages/Wins/YourWins";
import { Addauction } from "../../Pages/Addauction/Addauction";
import Setting from "../../Pages/Settings/Setting";
import Settiming from "../../Pages/SetTiming/Settiming";
import Update from "../../Pages/Updateauction/Update";
import { Mannagebuyer } from "../../Pages/Mannagebuyer/Mannagebuyer";
import { Buyerdetails } from "../../Pages/Buyerdetails/Buyerdetails";
import { Emdaccount } from "../../Pages/Emdaccount/Emdaccount";
import { Debitemd } from "../../Pages/Debitemd/Debitemd";
import { Updatevehicle } from "../../Pages/Updatevehicle/Updatevehicle";
import { Assignauction } from "../../Pages/Assignauction/Assignauction";
import { Assignnewauction } from "../../Pages/Assignnewauction/Assignnewauction";
import { Autonotification } from "../../Pages/Autonotification/Autonotification";
import { Registeradmin } from "../../Pages/Registeradmin/Registeradmin";
import { Pushnotification } from "../../Pages/Pushnotification/Pushnotification";
import { Rowbox } from "../../Pages/Rowbox/Rowbox";
import { Mannageadmin } from "../../Pages/Mannageadmin/Mannageadmin";
import { Editemd } from "../../Pages/Editemd/Editemd";

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
