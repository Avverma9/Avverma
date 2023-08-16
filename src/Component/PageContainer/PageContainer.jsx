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
import { Viewauction } from "../../Pages/Viewauction/Viewauction";
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
import Dashboard2 from "../../Pages/Dashboard2/Dashboard2";
import Setting2 from "../../Pages/Setting2/Setting2";
import Setauctiontime from "../../Pages/Setting2/Setauctiontime";
import Startprice from "../../Pages/Setting2/Startprice";
import Addregion from "../../Pages/Setting2/Addregion";
import Addseller from "../../Pages/Setting2/Addseller";
import Addcategory from "../../Pages/Setting2/Addcategory";
import { MannageAuction } from "../../Pages/Mannageauction/Mannageauction";
import { Addauction } from "../../Pages/Addauction/Addauction";
import { Profile } from "../../Pages/Profile/Profile";
import RegisterBuyer from "../../Pages/RegisterBuyer/RegisterBuyer";
import RegisterSubAdmin from "../../Pages/Registeradmin/RegisterSubAdmin";
import { Assignbuyer } from "../../Pages/Assignbuyer/Assignbuyer";
import Login from "../Login/Login";
import Upload from "../../Pages/UploadStatement/Upload";
import { Editauction } from "../../Pages/Editauction/Editauction";
import { PrevBtn } from "../PrevBtn.jsx/PrevBtn";
export const PageContainer = () => {
  return (
    <div className="page_container page_container_background-img">
      {/* <BrowserRouter> */}
      <PrevBtn />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="bidding-detail" element={<Biddingdetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/import-auction" element={<Importauction />} />
        <Route path="/filter-auction" element={<Filterauction />} />
        <Route path="/wins" element={<YourWins />} />

        <Route path="/view-auction/:id" element={<Viewauction />} />
        <Route path="/edit-view-auction/:id" element={<Editauction />} />
        <Route path="/add-new-auction" element={<Addauction />} />
        {/* <Route path="/settings" element={<Setting />} /> */}
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
        <Route path="/dashboard" element={<Dashboard2 />} />
        <Route path="/settings" element={<Setting2 />} />
        <Route path="/set-auction-timing" element={<Setauctiontime />} />
        <Route path="/start-price" element={<Startprice />} />
        <Route path="/add-region" element={<Addregion />} />
        <Route path="/add-seller" element={<Addseller />} />
        <Route path="/add-category" element={<Addcategory />} />
        <Route path="/mannage-auction" element={<MannageAuction />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register-buyer" element={<RegisterBuyer />} />
        <Route path="/register-sub-admin" element={<RegisterSubAdmin />} />
        <Route path="/assign-buyer" element={<Assignbuyer />} />
        <Route path="/upload-statement" element={<Upload />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};
