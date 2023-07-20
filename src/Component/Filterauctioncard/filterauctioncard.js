import React from "react";

import "./filterauctioncard.css";


export const Filterauctioncard = () => {
  return (
    <div className="filter_container">
    
      
      
    
        <div className="filter_body">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.acedms.com%2Fphotos%2Flisting%2F2020-09-08%2F48a83f44d5836cf7f3c0304fea2e06d0_extra_large.jpg&f=1&nofb=1&ipt=f3795f26093deccfcc8b544459e25c123d84e37f2966ec44373bfc303feb6b04&ipo=images"
            alt="bid_item"
            srcset=""
          />
        </div>
        <div className="auction-detail">
        <div className="auction-details-a">
            <ul>
                <li>Region</li>
                <li>Category</li>
                <li>product Name</li>
                <li>seller Name</li>
            </ul>
            <ul className="filter-value">
                <li>North 24 porgana</li>
                <li>2nd Class</li>
                <li>Tata Ace Bull</li>
                <li>zishan mohammad</li>
            </ul>

        </div>
        <div className="auction-details-b">
            <ul>
                <li>Aggrement No</li>
                <li>Payment</li>
                <li>Status</li>
                
            </ul>
            <ul className="filter-value">
                <li>65825675895</li>
                <li>Online</li>
                <li>Pending</li>
                
            </ul>

        </div>
        </div>
       
      
    </div>
  );
};
