/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./HeaderImage.css";

const HeaderImage = () => {
  const location = useLocation();
  const isSignedIn = localStorage.getItem("isSignedIn")
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const render = location.pathname;
  if (render !== "/home" && render !== "/") {
    return null;
  }

  return (
    <div className="header">
      <div className="city">
        <div className="dropdown" >
          <div className="top-offers" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}> 
            <img
              className="circle"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Biswa_Bangla_Gate_in_Kolkata_01.jpg/1200px-Biswa_Bangla_Gate_in_Kolkata_01.jpg"
              alt="Top Offers"
            />
            <p className="city-name">Top Offers</p>
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <a href="#">Offers for Hotel</a>
              <a href="#">Offers for Tour</a>
            </div>
          )}
        </div>
      </div>
      <a href="state/punjab" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown} >
          <img
            className="circle"
            src="https://www.newsclick.in/sites/default/files/styles/amp_1200x675_16_9/public/2020-04/Punjab.PNG?itok=6M8kSqzz"
            alt="Image 2"
          />
          <p className="city-name">Punjab</p>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/cities/amritsar">Amritsar</a>
              <a href="/cities/jalandhar">Jalandhar</a>
              <a href="/cities/ludhiana">Ludhiana</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/maharashtra" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://static.india.com/wp-content/uploads/2018/08/maharashtra-1.jpg"
            alt="Image 3"
          />
          <p className="city-name">Maharashtra</p>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/cities/mumbai">Mumbai</a>
              <a href="/cities/Nagpur">Nagpur</a>
              <a href="/cities/pune">Pune</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/goa" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://assets.gqindia.com/photos/61bc4462b764212228e2b603/1:1/w_3716,h_3716,c_limit/Fairfield%20by%20Marriott%20Goa%20Benaulim2.jpeg"
            alt="Image 4"
          />
          <p className="city-name">Goa</p>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/cities/panaji">Panaji</a>
              <a href="/cities/mapuja">Mapuja</a>
              <a href="/cities/ponda">Ponda</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/tamilnadu" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://gumlet.assettype.com/swarajya%2F2022-08%2Fc4a036cd-b6e8-4f34-a340-f60e6de012ae%2FCollage_Maker_11_Aug_2022_08_07_PM.jpg?q=75&auto=format%2Ccompress&w=1200"
            alt="Image 5"
          />
          <p className="city-name">Tamil Nadu</p>
          {dropdownOpen&&(
            <div className="dropdown-menu">
            <a href="/cities/chennai">Chennai</a>
            <a href="/cities/madurai">Madurai</a>
            <a href="/cities/coimbatore">Coimbatore</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/uttarpradesh" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://cdn.britannica.com/22/124522-050-D8C3C313/pilgrims-Varanasi-Ganges-River-India-Uttar-Pradesh.jpg"
            alt="Image 6"
          />
          <p className="city-name">Uttar Pradesh</p>
          {dropdownOpen&&(
            <div className="dropdown-menu">
            <a href="/cities/Noida" >Noida</a>
            <a href="/cities/kanpur">Kanpur</a>
            <a href="/cities/lucknow">Lucknow</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/delhi" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg"
            alt="Image 7"
          />
          <p className="city-name">Delhi</p>
          {dropdownOpen&&(
            <div className="dropdown-menu">
            <a href="/cities/delhi" >Delhi</a>
            <a href="/cities/new-delhi">New Delhi</a>
            
            </div>
          )}
        </div>
      </a>
      <a href="state/westbengal" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://images.hindustantimes.com/img/2021/03/04/550x309/_e5c11594-450e-11eb-9d7d-764df83b7a87_1614867899376.jpg"
            alt="Image 8"
          />
          <p className="city-name">West Bengal</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/kolkata">Kolkata</a>
              <a href="/cities/durgapur">Durgapur</a>
              <a href="/cities/asansol">Asansol</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/rajasthan" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://static.toiimg.com/thumb/93105946/rajasthan.jpg?width=1200&height=900"
            alt="Image 9"
          />
          <p className="city-name">Rajasthan</p>
          {openDropdown&&(
            <div className="dropdown-menu">
            <a href="/cities/Jaipur">Jaipur</a>
            <a href="/cities/kota">Kota</a>
            <a href="cities/Sawai Madhopur">Sawai Madhopur</a>
            <a href="/cities/tonk">Tonk</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/kerala" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://media.istockphoto.com/id/1246366598/photo/a-scenic-view-of-boats-under-a-blue-sky-in-backwaters-situated-in-allepey-town-located-in.jpg?s=612x612&w=0&k=20&c=YBv_3nP-6YjvN9JRhaNsBmq8ke4azCgvGLS5h3r9jSk="
            alt="Image 10"
          />
          <p className="city-name">Kerala</p>
          {dropdownOpen&&(
            <div className="dropdown-menu">
            <a href="/cities/kochi">Kochi</a>
            <a href="/cities/kannur">Kannur</a>
            <a href="/cities/kollam">Kollam</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/bihar" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzoADWDPjfXwmeuM-GbOf7I974WSjUlACwg&usqp=CAU"
            alt="Image 11"
          />
          <p className="city-name">Bihar</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/patna">Patna</a>
              <a href="/cities/bhagalpur">Bhagalpur</a>
              <a href="/cities/gaya">Gaya</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/assam" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://assets.sentinelassam.com/h-upload/2023/03/18/445148-assam-tea-industries.webp"
            alt="Image 12"
          />
          <p className="city-name">Assam</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/guwahati">Guwahati</a>
              <a href="/cities/tezpur">Tezpur</a>
              <a href="/cities/silchar">Silchar</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/karnataka" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://cdn.britannica.com/73/156473-050-E0E9F844/Vidah-Sauda-state-legislature-building-Karnataka-Bengaluru.jpg"
            alt="Image 13"
          />
          <p className="city-name">Karnataka</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/bengaluru">Bengaluru</a>
              <a href="/cities/mysuru">Mysuru</a>
              <a href="/cities/mangaluru">Mangaluru</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/gujrat" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mosque_in_Gujrat_Pakistan.JPG/1200px-Mosque_in_Gujrat_Pakistan.JPG"
            alt="Image 14"
          />
          <p className="city-name">Gujrat</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/surat">Surat</a>
              <a href="/cities/ahmedabad">Ahemadabad</a>
              <a href="/cities/rajkot">Rajkot</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/kashmir" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/12/12103708/jammu-and-kashmir-1.jpg"
            alt="Image 14"
          />
          <p className="city-name">Jammu & Kashmir</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/jammu">Jammu</a>
              <a href="/cities/srinagar">Srinagar</a>
              <a href="/cities/doda">Doda</a>
            </div>
          )}
        </div>
      </a>
      <a href="state/haryana" class="no-underline text-black">
        <div className="city" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <img
            className="circle"
            src="https://lp-cms-production.imgix.net/2019-06/f17a82146e4fdc978a9e5b4ad79e95b3bc28e4e77828065ae3ca95282668cef4.jpg"
            alt="Image 16"
          />
          <p className="city-name">Haryana</p>
          {openDropdown&&(
            <div className="dropdown-menu">
              <a href="/cities/panipat">Panipat</a>
              <a href="/cities/gurugram">Gurugram</a>
              <a href="/cities/hisar">Hisar</a>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default HeaderImage;