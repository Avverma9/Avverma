import React, { useState } from "react";
import './partner.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInr, faStar, faLocationDot, faPerson, faHotel, faTv, faCamera, faSnowflake, faCreditCard, faElevator, faFire, faParking, faWifi, faPaw, faKitchenSet, faCheck, faGlassMartini, faPeopleGroup, faAirFreshener, faRestroom, faHandsWash, faSchoolFlag, faCar, faBrush, faTrowel, faShower, faWater, faSwimmingPool, faHeartCircleCheck, faDesktop, faSpa, faBathtub, faBars, faCoffee, faSmoking, faBanSmoking, faBabyCarriage, faUmbrellaBeach, faShoePrints, faShirt, faLock, faBusinessTime } from '@fortawesome/free-solid-svg-icons';

const Partnerpage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [hotelownerName, setHotelownerName] = useState("");
  const [ownercontact, setOwnercontact] = useState("");
  const [receptioncontact, setReceptioncontact] = useState("");
  const [hotelemail, setHotelEmail] = useState("");
  const [gmcontact, setGmcontact] = useState("");
  const [salescontact,setSalescontact]= useState("");
  const [hotelName, setHotelName] = useState("");
  const [hoteladdress, setHoteladdress] = useState("");
  const [hotelstate, setHotelstate] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [citypartner, setCitypartner] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedImage, setSelectedImage] = useState("")

  const location = useLocation();

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     // Create FormData object to send the form data
     const formData = new FormData();
     formData.append('hotelownerName', hotelownerName);
     formData.append('ownercontact', ownercontact);
     formData.append('receptioncontact', receptioncontact);
     formData.append('hotelemail', hotelemail);
     formData.append('hoteladdress', hoteladdress);
     formData.append('hotelstate', hotelstate);
     formData.append('zipcode', zipcode);
     formData.append('citypartner', citypartner);
     formData.append('landmark', landmark);
     formData.append('selectedImage', selectedImage);
    try {
      const response = await fetch('https://hotel-backend-tge7.onrender.com/partner/create/new', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
    console.log("Submitted:", { hotelownerName, ownercontact, receptioncontact, hotelemail, gmcontact,salescontact, hotelName, hoteladdress, hotelstate, zipcode, citypartner, landmark, selectedImage });

    setHotelownerName("");
    setOwnercontact("");
    setReceptioncontact("");
    setHotelEmail("");
    setGmcontact("");
    setHotelName("");
    setHoteladdress("");
    setHotelstate("");
    setZipcode("");
    setCitypartner("");
    setLandmark("");
    setSelectedImage("");
    setSalescontact("");
  } else {
    console.log('creation of partner details failed');
  }
} catch (error) {
  console.log('Error:', error);
}
};
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file)
  }
  if (location.pathname!=="/partner"){
    return null
  };

  return (
    <div>

      <nav className="navbarparner">
        <ul>
          <li>
            <a href="#" onClick={() => openTab("contact")} className={activeTab === 'contact' ? 'active' : ''}>
              Hotel Contact Information
            </a>
          </li>
          <li>
            <a href="#" onClick={() => openTab("basic")} className={activeTab === 'basic' ? 'active' : ''}>
              Basic Information
            </a>
          </li>
          <li>
            <a href="#" onClick={() => openTab("policy")} className={activeTab === 'policy' ? 'active' : ''}>
              Hotel Policy
            </a>
          </li>
          <li>
            <a href="#" onClick={() => openTab("tariff")} className={activeTab === 'tariff' ? 'active' : ''}>
              Hotel Tariff
            </a>
          </li>
        </ul>

      </nav>
      {activeTab === "contact" && (
        <form className="form1" onSubmit={handleSubmit}>
          <h3 className="partner-title">Hotel Listed Request</h3>
          <div className="section1st"> 
          <div className="1st-pehla">
          <label htmlFor="hotelownerName">Hotel Owner Name:</label>
            <input
              type="text"
              id="hotelownerName"
              value={hotelownerName}
              onChange={(e) => setHotelownerName(e.target.value)}
              required
            /></div>
            <div className="1st-dusra">
            <label htmlFor="ownercontact">Owner Contact Detail:</label>
            <input
              type="text"
              id="ownercontact"
              value={ownercontact}
              onChange={(e) => setOwnercontact(e.target.value)}
              required
            /></div>
            <div className="1st-tisra">
            <label htmlFor="receptioncontact">Reception Contact Detail:</label>
            <input
              type="text"
              id="receptioncontact"
              value={receptioncontact}
              onChange={(e) => setReceptioncontact(e.target.value)}
              required
            /></div>


            <div className="1st-chotha">
            <label htmlFor="hotelemail">Hotel Email Address:</label>
            <input
              type="email"
              id="hotelemail"
              value={hotelemail}
              onChange={(e) => setHotelEmail(e.target.value)}
              required
            /></div>
            <div className="1st-panchwa">
            <label htmlFor="gmcontact">GM Contact Details:</label>
            <input
              type="tel"
              id="gmcontact"
              value={gmcontact}
              onChange={(e) => setGmcontact(e.target.value)}
              required
            /></div>
            <div className="1st-chatha">
            <label htmlFor="gmcontact">Sales Manager Contact Detail:</label>
            <input
              type="tel"
              id="salesmanacontact"
              value={salescontact}
              onChange={(e) => setSalescontact(e.target.value)}
              required
            /></div>
          </div>
          <div className="section2nd">
            <h3 className="partner-title">Hotel Details&Location</h3>
            <label htmlFor="hotelname">Hotel Name:</label>
            <input
              type="text"
              id="hotelName"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            /></div>
              <h3 className="partner-title">Hotel Complete Address</h3>
          <div className="section3rd">
            
            <div className="3rd-pehla">
            <label htmlFor="comaddress">Address</label>
            <input
              type="text"
              id='compaddress'
              value={hoteladdress}
              onChange={(e) => setHoteladdress(e.target.value)}
              required /></div>
              <div className="3rd-dusra">
            <label htmlFor="hotelstate">State</label>
            <input
              type="text"
              id='state'
              value={hotelstate}
              onChange={(e) => setHotelstate(e.target.value)}
              required /></div>
              <div className="3rd-tisra">
            <label htmlFor="zipcode">Post Code/Zip Code</label>
            <input
              type="text"
              id='zipcode'
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required /></div>
              <div className="3rd-chitha">
            <label htmlFor="city-partner">City</label>
            <input
              type="text"
              id='citypartner'
              value={citypartner}
              onChange={(e) => setCitypartner(e.target.value)}
              required /></div>
              <div className="3rd-pachwa">
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              id='landmark'
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required /></div>
          </div>
          <div className="section4">
            <h3 className="partner-title">Hotel Star Rating</h3>
            
            <div className="starrat">
            <label htmlFor="1checkbox">1 star</label>
            <input type="checkbox" name="1checkbox" id="1checkbox" />
            </div>
            <div className="starrat">
            <label htmlFor="2checkbox">2 star</label>
            <input type="checkbox" name="2checkbox" id="2checkbox" />
            </div>
            <div className="starrat">
            <label htmlFor="3checkbox">3 star</label>
            <input type="checkbox" name="3checkbox" id="3checkbox" />
            </div>
            <div className="starrat">
            <label htmlFor="4checkbox">4 star</label>
            <input type="checkbox" name="4checkbox" id="4checkbox" />
            </div>
            <div className="starrat">
            <label htmlFor="5checkbox">5 star</label>
            <input type="checkbox" name="5checkbox" id="5checkbox" />
            </div>
            

          </div>
          
            <h3 className="partner-title">Your Property Type</h3>
            <div className="section5">
            <div className="panch-one">
            <label htmlFor="1prop">Apartment</label>
            <input type="checkbox" name="1prop" id="1prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="2prop">Guest House</label>
            <input type="checkbox" name="2prop" id="2prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="3prop">Holiday Home</label>
            <input type="checkbox" name="3prop" id="3prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="4prop">Homestay</label>
            <input type="checkbox" name="4prop" id="4prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="5prop">Hostel</label>
            <input type="checkbox" name="5prop" id="5prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="6prop">Hotel</label>
            <input type="checkbox" name="6prop" id="6prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="7prop">Hotel Apartment</label>
            <input type="checkbox" name="7prop" id="7prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="8prop">Resort</label>
            <input type="checkbox" name="8prop" id="8prop" />
            </div>
            <div className="panch-one">
            <label htmlFor="9prop">Villa</label>
            <input type="checkbox" name="9prop" id="9prop" />
            </div>

          </div>
          <button type="submit">Submit</button>
        </form>

      )}
      {activeTab === "basic" && (
         <div className="basic-container">
          <div className="imgupload"><p>1-Upload Image</p>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                style={{ maxWidth: "300px" }}
              />
            )}
            
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div class="main">



<div class="card">

<div class="image">
<img 
          src="https://miro.medium.com/v2/resize:fit:8576/1*p1zBnv11CSx_EII8sB9Uaw.jpeg"
          alt="Image 9"
           />
   {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gfp-missouri-st-louis-clubhouse-pond-and-scenery.jpg/1199px-Gfp-missouri-st-louis-clubhouse-pond-and-scenery.jpg"/> */}
</div>
<div class="des">
 <p>Room-Image</p>
<button>ChooseFile</button>
</div>
</div>



<div class="card">

<div class="image">
<img
            className="chat-icon"
            src="https://i1.wp.com/i.pinimg.com/originals/19/f2/18/19f21857163adcee4349166af11ae145.jpg?w=1140&ssl=1"
            alt="Image 9"
          />
   {/* <img src="https://cdn.pixabay.com/photo/2018/01/09/03/49/the-natural-scenery-3070808_1280.jpg"/> */}
</div>
{/* <div class="title">
 <h1>
Write title Here</h1>
</div> */}
<div class="des">
 <p>Bathroom-image</p>
<button>Choosefile</button>
</div>
</div>


<div class="card">

<div class="image">
<img
            className="chat-icon"
            src="https://i0.wp.com/www.designlike.com/wp-content/uploads/2018/03/restaurant-1948732_1920.jpg"
            alt="Image 9"
          />
   {/* <img src="https://cdn.pixabay.com/photo/2015/11/07/11/41/lake-1031405_1280.jpg"/> */}
</div>
{/* <div class="title">
 <h1>
Write title Here</h1>
</div> */}
<div class="des">
 <p>Resturant-Room</p>
<button>ChooseFile</button>
</div>
</div>
<div class="card">

<div class="image">
<img
            className="chat-icon"
            src="https://i.nextmedia.com.au/News/crn-14_carpark_iStock-177136206.jpg"
            alt="Image 9"
          />
   {/* <img src=""/> */}
</div>
{/* <div class="title">
 <h1>
Write title Here</h1>
</div> */}
<div class="des">
 <p>Parking-images</p>
<button>ChooseFile</button>
</div>
</div>
<div class="card">

<div class="image">
<img
            className="chat-icon"
            src="https://tse1.mm.bing.net/th?id=OIP.KwETv6vjh5rRMqzeQ-J5wAHaEJ&pid=Api&P=0&h=180"
            alt="Image 9"
          />
   {/* <img src="https://cdn.pixabay.com/photo/2015/11/07/11/41/lake-1031405_1280.jpg"/> */}
</div>
{/* <div class="title">
 <h1>
Write title Here</h1>
</div> */}
<div class="des">
 <p>Lane-Images</p>
<button>ChooseFile</button>
</div>
</div>
<div class="card">

<div class="image">
<img
            className="chat-icon"
            src="https://tse4.mm.bing.net/th?id=OIP.NScPnwpNJ1GuyeeKEqOBBAHaE7&pid=Api&P=0&h=180"
            alt="Image 9"
          />
   {/* <img src="https://cdn.pixabay.com/photo/2015/11/07/11/41/lake-1031405_1280.jpg"/> */}
</div>
{/* <div class="title">
 <h1>
Write title Here</h1>
</div> */}
<div class="des">
 <p>HotelFront-View</p>
<button>ChooseFile</button>
</div>
</div>
</div>



          <div className="selectamenity">
            <p>Select Hotel Amenity</p>
            <div className="amenityitem4">
           <div className="amenityclasses"> 
          <input type="checkbox" />
          
          <label><FontAwesomeIcon icon={faWifi} />Free Wireless Internet
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faAirFreshener} />Air Conditioning
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faRestroom} />Room Service
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faHandsWash} />Clean and Disinfect
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faSchoolFlag} />School Diatacing
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faCar} />Free Parking
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faBrush} />House Keeping
          </label>
          </div>
          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faTrowel} />Towels
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faHandsWash} />Complimentary Tolietries
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faShower} />Good Showers
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faTv} />Cabel TV
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faWater} />Complimentary Battled Water
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faSwimmingPool} />Swimming Pool
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faHotel} />On-site Restaurant
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faAirFreshener} />Hair Dryer
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faHeartCircleCheck} />Fitness Center
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faDesktop} />Conclerge Desk
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faSpa} />Spa
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faAirFreshener} />Dry Cleaning
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faBathtub} />Bathrobe
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faCheck} />24 hour front desk service
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faBars} />Bar
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faCoffee} />Coffee/Tea
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faBanSmoking} />Non smoking rooms
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faBabyCarriage} />Baby Sitting
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faUmbrellaBeach} />Picnic Area
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faInr} />Currency Exchange
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faSwimmingPool} />Indoor Pool
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faShoePrints} />Shoesshine
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faCheck} />Tour Desk
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faShirt} />Loundery
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faLock} />Lockers
          </label>
          </div>

          <div className="amenityclasses"> 
          <input type="checkbox" />
          <label><FontAwesomeIcon icon={faBusinessTime} />Business center
          </label>
          </div>

          

            </div>
          </div>
        </div>

      )}
      {activeTab === "policy" && (
        <div className="policy-section">
          <div className="policy-heading">
            <h3 className="poli-head">Your Hostel Policy</h3>

            <div className="policy-item">
              <label>1 - Outside Food:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>2 - Cancellation:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>3 - Select Your Payment Mode You Accepted:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>4 - Pets Allowed:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>5 - Bachelors Allowed:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>6 - Smoking Allowed:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>7 - Alcohol Allowed:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>8 - Unmarried Couples Allowed:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>
            <div className="policy-item">
              <label>9 - International Guest Allowed:</label>
              <div className="allow">
              <input type="checkbox" id="allowedCheckbox" />
              <label htmlFor="allowedCheckbox">Allowed</label></div>
              <div className="allow">
              <input type="checkbox" id="notAllowedCheckbox" />
              <label htmlFor="notAllowedCheckbox">Not Allowed</label></div>
            </div>

          </div>
          <div className="policy-partner">
            <label>Describe Your Return Policy Here</label>
            <input type="text"/>
          </div>
          <div className="check-in-out">
            <label>Check-in - Check-out</label>
            <input type="text"/>
          </div>
          <div className="memo">
            <p className="early-late">Early Check-in And Late Check-out</p>
            <p className="checkin-rules">1-Early Check-in the Standard Check-in time in hotels is 12 noon unless mentioned otherwise in your Booking voucher Early Check in is Subject to availability Extra changes will usually apply as per below policy</p>
          </div>
          <div className="table-checkin">
          <table>
      <thead>
        <tr>
          <th>Check in Time</th>
          <th>Early Check in Changes</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Before 6AM</td>
          <td>100% Charges for one day payable as per room rates for the previous day</td>
          
        </tr>
        <tr>
          <td>Before 6AM and 10AM</td>
          <td>0% to 30% charges payable as per room rates for the previous day</td>
          
        </tr>
        <tr>
          <td>Before 10AM and 12 Noon</td>
          <td>Complimentary</td>
          
        </tr>
      </tbody>
    </table>
    <p>Complimentary breakfast will not be available to you for the day of early Check-in</p>
          </div>
          <div className="memo">
            
            <p className="checkin-rules">2-Late Check-out:The Standard Check-out times in hotel is 11AM Unless mentioned otherwise in your Booking Voucher.Late check-out is subjected to availability and can not be confirmed with the hotel in advance.Extra charges will usually apply per the below policy.</p>
          </div>
          <div className="table-checkin">
          <table>
      <thead>
        <tr>
          <th>Check in Time</th>
          <th>Early Check in Changes</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Between 11AM to 1PM</td>
          <td>Complimentary</td>
          
        </tr>
        <tr>
          <td>Between 1PM to 5PM</td>
          <td>Upto 30% of the room rate for the day depending on hotel policy</td>
          
        </tr>
        <tr>
          <td>After 5 PM</td>
          <td>100% of the room rate for the day</td>
          
        </tr>
      </tbody>
    </table>
    
          </div>
        
        </div> 
      )}
      {activeTab === "tariff" && (
        <div className="hotel-terrif">
          <h3 className="terrif-heading">Hotel Tarrif</h3>
          <div className="terrif-class">
          <div className="terii">
          <label>Double Sharing</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Quad Sharing</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Bulk booking more then 20 to 30 people with(Maplan)</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Triple Sharing</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Bulk booking more then 20 to 30 people with(Maplan)</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Bulk Booking more then four room</label>
              <input type="text"  />
              </div>
          </div>
          <h3 className="terrif-heading">Hotel Tarrif</h3>
          <div className="terrif-class">
          <div className="terii">
          <label>Double Sharing</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Quad Sharing</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Bulk booking more then 20 to 30 people with(Maplan)</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Triple Sharing</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Bulk booking more then 20 to 30 people with(Maplan)</label>
              <input type="text"  />
              </div>
              <div className="terii">
              <label>Bulk Booking more then four room</label>
              <input type="text"  />
              </div>
              </div>

        </div>
      )}
     </div>
  );
};

export default Partnerpage;