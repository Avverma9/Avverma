import React from 'react'
import { GoClock } from "react-icons/go"
import { VscLocation } from "react-icons/vsc"
import { IoMdLock } from "react-icons/io"
import { TiTick } from "react-icons/ti"
import { BsHammer } from "react-icons/bs"
import { PiMotorcycleFill, PiCarProfileBold } from "react-icons/pi"

export const Auction = () => {
    return (
        <div auction_wrapper>
            <div className="auction_type_header">
                <h1>Live Auctions <span>(311)</span></h1>
                <input type="button" value="View All" />
            </div>
            <div className="auction_body">
                <div>
                    <GoClock />
                    <p>Ends in 6 h 80 min</p>
                    <IoMdLock />
                </div>
                <div className="auction_party">
                    <h1>Exclusive Bajaj Salvage Auction <span>20 jun 23</span></h1>
                </div>
                <div className="auction_icons">
                    <div>
                        <VscLocation />
                        <p>N/A</p>
                    </div>
                    <div>
                        <TiTick />
                        <p>Insurance</p>
                    </div>
                    <div>
                        <BsHammer />
                        <p>Close</p>
                    </div>
                </div>
                <div className="auction_vehicle_count">
                    <div>
                        <PiMotorcycleFill />
                    </div>
                    <div>
                        <PiCarProfileBold />
                    </div>
                </div>
            </div>

        </div>
    )
}
