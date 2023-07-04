import React from "react";
import "./PageContainer.css";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import { Profile } from "../../Pages/Profile/Profile";
import { Auction } from "../../Pages/Auction/Auction";
import { User } from "../../Pages/User/User";


export const PageContainer = () => {

    return (
        <div className="page_container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/auction" element={<Auction />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
