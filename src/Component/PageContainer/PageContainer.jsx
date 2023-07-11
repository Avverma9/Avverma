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
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};