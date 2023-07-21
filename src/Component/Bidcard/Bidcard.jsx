import React from "react";
import { GoClock } from "react-icons/go";
import { VscLocation } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import "./Bidcard.css";
import { diesel } from "../../assets";

export const Bidcard = () => {
  return (
    <div className="bid_container">
      <div className="bid_header">
        <GoClock />
        <p>Won on 17 Jul 23</p>
        <p className="bid_status">Pending</p>
      </div>
      <>
        <p className="bid_item">Tata Ace Gold Fully Built</p>
        <div className="bid_body">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.acedms.com%2Fphotos%2Flisting%2F2020-09-08%2F48a83f44d5836cf7f3c0304fea2e06d0_extra_large.jpg&f=1&nofb=1&ipt=f3795f26093deccfcc8b544459e25c123d84e37f2966ec44373bfc303feb6b04&ipo=images"
            alt="bid_item"
            srcset=""
          />
          <table className="bid_detail_table">
            <tr>
              <td>
                <span>
                  <SlCalender />
                </span>
                WB11F0091
              </td>
              <td>
                <span>
                  <SlCalender />
                </span>
                Reg: Not Available
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <SlCalender />
                </span>
                Mfg 2020
              </td>
              <td>
                <span>
                  <img src={diesel} alt="icon" />
                </span>
                Diesel
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <SlCalender />
                </span>
                Repo 19 May 23
              </td>
              <td>
                <span>
                  <VscLocation />
                </span>
                Kolkata
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <SlCalender />
                </span>
                LDD:N/A
              </td>
              <td>
                <span>
                  <SlCalender />
                </span>
                CVL64557666867
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <SlCalender />
                </span>
                Reg:N/A
              </td>
              <td></td>
            </tr>
          </table>
        </div>
        <>
          <p className="bid_amount">Your Bid ₹76,000</p>
          <div className="edit_bid_section">
            <div className="edit_bid_view">
              <CiCircleMinus />
              <p>₹76,000</p>
              <CiCirclePlus />
            </div>
            <input type="button" value="BID" />
          </div>
        </>
      </>
    </div>
  );
};
