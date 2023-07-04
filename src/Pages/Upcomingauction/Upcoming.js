import React from 'react'
import './Upcoming.css';
import Footer from '../../Component/Footer/footer';
import Auctioncard from '../../Component/Auctioncard/Auctioncard';
import {FiSearch} from 'react-icons/fi';
import {BiSortAlt2} from 'react-icons/bi';
import {BsFilter} from 'react-icons/bs';

function Upcoming() {
  return (
    <div auction_wrapper>
            <div className='live-section1'>
                <div className="live-auction_type_header">
                    <h1>Live </h1>
                    <div className='live-upcoming'>
                        <h1>Upcoming</h1>
                    </div>
                    
                </div>
                <div className='live-header'>
                    <h1> <span>288</span>Auctions</h1>
                    <div className='live-icons'>
                    <FiSearch/>
                    <BsFilter/>
                    <BiSortAlt2/>
                    </div>

                    </div>
                <Auctioncard />
                <Auctioncard />
                <Auctioncard />
                <Auctioncard />
                <Auctioncard />
                <Auctioncard />
                <Auctioncard />
            </div>
           
            <Footer/>
        </div>
  )
}

export default Upcoming
