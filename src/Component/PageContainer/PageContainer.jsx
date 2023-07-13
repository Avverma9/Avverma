/* eslint-disable no-unused-vars */
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
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="bidding-detail" element={<Biddingdetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/import-auction" element={<Importauction />} />
        <Route path="/filter-auction" element={<Filterauction />} />
        <Route path="/wins" element={<YourWins />} />
        <Route path="/add-auction" element={<Addauction />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/set-timing" element={<Settiming />} />
        <Route path="/update-start-price" element={<Update />} />
        <Route path="/mannage-buyer" element={<Mannagebuyer />} />
        <Route path="/buyer-details" element={<Buyerdetails />} />
        <Route path="/emd-account" element={<Emdaccount />} />
        <Route path="/debit-emd" element={<Debitemd />} />
        <Route path="/vehicle-update" element={<Updatevehicle />} />
        <Route path="/assign-auction" element={<Assignauction />} />
        <Route path="/assign-new-auction" element={<Assignnewauction />} />
        <Route path="/push-notification" element={<Pushnotification />} />
        <Route path="/auto-notification" element={<Autonotification />} />
        <Route path="/register-admin" element={<Registeradmin />} />
        <Route path="/row-box" element={<Rowbox />} />
        <Route path="/mannage-admin" element={<Mannageadmin />} />
        <Route path="/edit-emd" element={<Editemd />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};
