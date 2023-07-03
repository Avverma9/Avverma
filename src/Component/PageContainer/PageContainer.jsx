import React from "react";
import "./PageContainer.css";
import { Profile } from "../../Pages/Profile/Profile";
import { Auction } from "../../Pages/Auction/Auction";

export const PageContainer = () => {
    return (
        <div className="page_container">
            {/* <Profile /> */}
            <Auction />
        </div>
    );
};
