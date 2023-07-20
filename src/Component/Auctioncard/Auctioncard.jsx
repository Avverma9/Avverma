import React from 'react'
import './Auctioncard.css';
import { GoClock } from "react-icons/go"
import { VscLocation } from "react-icons/vsc"
import { IoMdLock } from "react-icons/io"
import { TiTick } from "react-icons/ti"
import { BsHammer } from "react-icons/bs"
import { PiMotorcycleFill, PiCarProfileBold } from "react-icons/pi"


function Auctioncard() {

    const handleLockClick=()=>{
        alert("Selected Auction has not assigned to you.please Contact Us at 6375360267 for more details.");
    };
  return (
    <div className="auction_body">
    <div className='auction-timing'>
    <div className='clock-time'>
        <GoClock />
        <p>Ends in 6 h 80 min</p>
        </div>
        <IoMdLock onClick={handleLockClick}/>
    </div>
    <div className="auction_party">
        <h1>Exclusive Bajaj Salvage Auction <span>20 jun 23</span></h1>
    </div>
    <div className="auction_icons">
        <div className='car-location'>
            <VscLocation className='location'/>
            <p>N/A</p>
        </div>
        <div className='car-insurance'>
            <TiTick className='tick'/>
            <p>Insurance</p>
        </div>
        <div className='close-auction'>
            <BsHammer  className='hammer'/>
            <p>Close</p>
        </div>
    </div>
    <div className="auction_vehicle_count">
        <div className='motorcycle-pic'>
            <PiMotorcycleFill />
        </div>
        <div className='car-pic'>
            <PiCarProfileBold />
        </div>
    </div>
</div>
  )
}

export default Auctioncard
