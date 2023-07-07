import React from 'react'
import { Bidcard } from "../../Component/Bidcard/Bidcard";
import './Biddingdetail.css';
function Biddingdetail() {
  return (
    <div className='bidding-detail'>
    <div className='bidding-header'>
      <Bidcard/>
      </div>
      <div className='bidding-details'>
        <h1 className='heading-name'>Bidding Details</h1>
      </div>
      <div className='car-owner-detail'>
        <ul>
            <li>Buyer Name</li>
            <li>Aryan Khan</li>
            <li>Sourav Satpati</li>
            <li>Ankit Kumar Verma</li>
            <li>Zishan Mohammad</li>
            <li>Payal Sharma</li>
            <li>Rakesh Kumar</li>
        </ul>
        <ul>
            <li>Bid Amount</li>
            <li>₹76,000</li>
            <li>₹56,000</li>
            <li>₹77,000</li>
            <li>₹79,000</li>
            <li>₹51,000</li>
            <li>₹35,000</li>
        </ul>
        <ul>
            <li>Bid Date</li>
            <li>1 July</li>
            <li>2 July</li>
            <li>29 June</li>
            <li>25 June</li>
            <li>27 April</li>
            <li>3 July</li>
        </ul>
        <ul>
            <li>Bid Time</li>
            <li>7 AM</li>
            <li>8 AM</li>
            <li>10 AM</li>
            <li>5 PM</li>
            <li>11 PM</li>
            <li>5 PM</li>
        </ul>
      </div>
    </div>
  )
}

export default Biddingdetail
