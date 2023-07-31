import React from 'react';
import '../Setting2/Setting2.css';
import { Link } from 'react-router-dom';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {CiMoneyCheck1} from 'react-icons/ci';
import {PiTrainRegionalThin} from 'react-icons/pi';
import {CgProfile} from 'react-icons/cg';
import {TbCategory} from 'react-icons/tb';
import {RiArrowDropDownLine} from 'react-icons/ri';
function Setting2() {
  return (
    <div className='setting-page'>
      <div className='setting-content'>
        <div className='setting-heading'>
          <h1>Setting</h1>
        </div>
        <div className='setting-item'>
          <ul>
            <li>
              <Link to='/set-auction-timing'><AiOutlineClockCircle/>Set Auction Timing<RiArrowDropDownLine/></Link>
            </li>
            <li>
              <Link to='/start-price'><CiMoneyCheck1/>Start Price<RiArrowDropDownLine/></Link>
            </li>
            <li>
              <Link to='/add-region'><PiTrainRegionalThin/>Add Region<RiArrowDropDownLine/></Link>
            </li>
            <li>
              <Link to='/add-seller'><CgProfile/>Add Seller<RiArrowDropDownLine/></Link>
            </li>
            <li>
              <Link to='/add-category'><TbCategory/>Add Category<RiArrowDropDownLine/></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Setting2;
