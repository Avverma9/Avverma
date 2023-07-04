import React from 'react'
import "./Auction.css"

import Auctioncard from '../../Component/Auctioncard/Auctioncard'
import Footer from '../../Component/Footer/footer';

export const Auction = () => {
    return (
        <div auction_wrapper>
            <div className='section1'>
                <div className="auction_type_header">
                    <h1>Live Auctions <span>(311)</span></h1>
                    <div className='button1'>
                        <input type="button" value="View All" />
                    </div>
                </div>
                <Auctioncard />
                <Auctioncard />
            </div>
            <div className='section1'>
                <div className="auction_type_header">
                    <h1>Upcoming Auctions <span>(311)</span></h1>
                    <div className='button1'>
                        <input type="button" value="View All" />
                    </div>
                </div>
                <Auctioncard />
                <Auctioncard />
            </div>
            <Footer/>
        </div>
        
    )
}
