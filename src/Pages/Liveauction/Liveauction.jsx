import React from 'react'
import './Liveauction.css';
import Footer from '../../Component/Footer/footer';
import Auctioncard from '../../Component/Auctioncard/Auctioncard';
import {FiSearch} from 'react-icons/fi';
import {BiSortAlt2} from 'react-icons/bi';
import {BsFilter} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Liveauction() {

    const navigate=useNavigate();
    const handleFilterClick=()=>{
        navigate('./filter');
    }
    const handleSortClick=()=>{
        navigate('./sort');
    }
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
                    <h1> <span>311</span>Auctions</h1>
                    <div className='live-icons'>
                    <FiSearch/>
                    <BsFilter onClick={handleFilterClick}/>
                    <BiSortAlt2 onClick={handleSortClick}/>
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

export default Liveauction
