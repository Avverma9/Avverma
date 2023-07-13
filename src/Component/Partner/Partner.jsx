import React, { useState } from "react";
import "./partner.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faBaby,
  faBars,
  faBath,
  faBathtub,
  faBottleWater,
  faBrush,
  faBusinessTime,
  faChair,
  faCheck,
  faCoffee,
  faDesktop,
  faHandsWash,
  faHeartCircleCheck,
  faHotel,
  faInr,
  faLock,
  faParking,
  faRestroom,
  faSchoolFlag,
  faShirt,
  faShoePrints,
  faShower,
  faSmokingBan,
  faSpa,
  faSwimmingPool,
  faTrowel,
  faTv,
  faUmbrellaBeach,
  faWater,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

const Partner = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(
    "Hotel Contact Information"
  );
  const [images, setImages] = useState([]);

  const [hotelOwnerName, setHotelOwnerName] = useState("");
  const [ownerContactDetails, setOwnerContactDetails] = useState("");
  const [receptionContactDetails, setReceptionContactDetails] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [generalManagerContact, setGeneralManagerContact] = useState("");
  const [salesManagerContact, setSalesManagerContact] = useState("");
  const [hotelDetails, setHotelDetails] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [countryState, setCountryState] = useState("");
  const [zip, setZip] = useState("");
  const [landmark, setLandmark] = useState("");
  const [starType, setStarType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [freeWifi, setFreeWifi] = useState(false);
  const [ac, setAc] = useState(false);
  const [roomService, setRoomService] = useState(false);
  const [cleanDisinfect, setCleanDisinfect] = useState(false);
  const [schoolDiatacing, setSchoolDiatacing] = useState(false);
  const [freeParking, setFreeParking] = useState(false);
  const [houseKeeping, setHouseKeeping] = useState(false);
  const [towels, setTowels] = useState(false);
  const [toiletries, setToiletries] = useState(false);
  const [goodShowers, setGoodShowers] = useState(false);
  const [cableTv, setCableTv] = useState(false);
  const [bottledWater, setBottledWater] = useState(false);
  const [swimmingPool, setSwimmingPool] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [hairDryer, setHairDryer] = useState(false);
  const [fitnessCenter, setFitnessCenter] = useState(false);
  const [conclergeDesk, setConclergeDesk] = useState(false);
  const [spa, setSpa] = useState(false);
  const [dryClean, setDryClean] = useState(false);
  const [bathrobe, setBathrobe] = useState(false);
  const [frontDeskService, setFrontDeskService] = useState(false);
  const [onDoubleSharing, setOnDoubleSharing] = useState("");
  const [onQuadSharing,setOnQuadSharing] = useState("");
  const [onbulkbooking,setOnbulkbooking] = useState("");
  const [ontripplesharing,setOntripplesharing] = useState("");
  const [onmore4room,setOnmore4room] = useState("");
  
  const [offDoubleSharing, setOffDoubleSharing] = useState("");
  const [offtripplesharing,setOfftripplesharing] = useState("");
  const [offquadsharing,setOffquadsharing] = useState("");
  const [offbulkbooking,setOffbulkbooking] = useState("");
  const [offmore4room,setOffmore4room] = useState("");
  const [outsideFoodPolicy, setOutsideFoodPolicy] = useState("");
  const [cancellationpolicy, setCancellationpolicy] = useState("");
  const [paymentMode,setPaymentMode]= useState("");
  const [pets,setPets] = useState("");
  const[bachelor,setBachelor]=useState("");
  const[smoking,setSmoking]=useState("");
  const[alcohol,setAlcohol]=useState("");
  const[unmarriedcouples,setUnmarriedcouples]=useState("");
  const[internationalcouple,setInternationalcouple]=useState("");
  const[returnPolicy,setReturnPolicy]= useState("");
  const[checkInOut,setCheckInOut]=useState("");

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages.slice(0, 6));
  };
  

  
  

  const handlePartnerSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object to send the form data
    const formData = new FormData();
    formData.append("hotelOwnerName", hotelOwnerName);
    formData.append("ownerContactDetails", ownerContactDetails);
    formData.append("receptionContactDetails", receptionContactDetails);
    formData.append("hotelEmail", hotelEmail);
    formData.append("generalManagerContact", generalManagerContact);
    formData.append("salesManagerContact", salesManagerContact);
    formData.append("hotelDetails", hotelDetails);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", countryState);
    formData.append("zip", zip);
    formData.append("landmark", landmark);
    formData.append("starType", starType);
    formData.append("propertyType", propertyType);
    formData.append("amenities[Free Wireless Internet]", freeWifi);
    formData.append("amenities[Air Conditioning]", ac);
    formData.append("amenities[Room Services]", roomService);
    formData.append("amenities[Clean And Disinfect]", cleanDisinfect);
    formData.append("amenities[School Diatacing]", schoolDiatacing);
    formData.append("amenities[Free Parking]", freeParking);
    formData.append("amenities[House Keeping]", houseKeeping);
    formData.append("amenities[Towels]", towels);
    formData.append("amenities[Complimentary Tolietries]", toiletries);
    formData.append("amenities[Good Showers]", goodShowers);
    formData.append("amenities[Cable Tv]", cableTv);
    formData.append("amenities[Bottled Water]", bottledWater);
    formData.append("amenities[Swimming Pool]", swimmingPool);
    formData.append("amenities[On-site Restaurant]", restaurant);
    formData.append("amenities[Hair Dryer]", hairDryer);
    formData.append("amenities[Fitness Center]", fitnessCenter);
    formData.append("amenities[Conclerge Desk]", conclergeDesk);
    formData.append("amenities[Spa]", spa);
    formData.append("amenities[Dry Cleaning]", dryClean);
    formData.append("amenities[Bathrobe]", bathrobe);
    formData.append("amenities[24 Hour Front Desk Service]", frontDeskService);
    formData.append("outsideFoodPolicy", outsideFoodPolicy);
    formData.append("cancellationPolicy", cancellationpolicy);
    formData.append("paymentMode", paymentMode);
    formData.append("petsAllowed", pets);
    formData.append("bachelorAllowed", bachelor);
    formData.append("smokingAllowed", smoking);
    formData.append("alcoholAllowed", alcohol);
    formData.append("unmarriedCouplesAllowed",unmarriedcouples);
    formData.append("internationalGuestAllowed", internationalcouple);
    formData.append("returnPolicy", returnPolicy);
    formData.append("checkInOut", checkInOut);
    formData.append("onDoubleSharing", onDoubleSharing);
    formData.append("onQuadSharing",onQuadSharing);
    formData.append("onBulkBooking",onbulkbooking);
    formData.append("onMoreThanFour",onmore4room);
    formData.append("onTrippleSharing",ontripplesharing);

    formData.append("offDoubleSharing", offDoubleSharing);
    formData.append("offQuadSharing",offquadsharing);
    formData.append("offBulkBooking",offbulkbooking);
    formData.append("offMoreThanFour",offmore4room);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });


    

    
  
  

    try {
      const response = await fetch(
        "https://hotel-backend-tge7.onrender.com/create/partner",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log(response, "successful");
        // Reset form
        setHotelOwnerName("");
        setOwnerContactDetails("");
        setReceptionContactDetails("");
        setHotelEmail("");
        setGeneralManagerContact("");
        setSalesManagerContact("");
        setHotelDetails("");
        setStreet("");
        setCity("");
        setCountryState("");
        setZip("");
        setLandmark("");
        setStarType("");
        setPropertyType("");
        setImages([]);
        
        setFreeWifi(false);
        setAc(false);
        setRoomService(false);
        setCleanDisinfect(false);
        setSchoolDiatacing(false);
        setFreeParking(false);
        setHouseKeeping(false);
        setTowels(false);
        setToiletries(false);
        setGoodShowers(false);
        setCableTv(false);
        setBottledWater(false);
        setSwimmingPool(false);
        setRestaurant(false);
        setHairDryer(false);
        setFitnessCenter(false);
        setConclergeDesk(false);
        setSpa(false);
        setDryClean(false);
        setBathrobe(false);
        setFrontDeskService(false);
        setOutsideFoodPolicy("");
        setCancellationpolicy("");
        setPaymentMode("");
        setPets("");
        setBachelor("");
        setSmoking("");
        setAlcohol("");
        setUnmarriedcouples("");
        setInternationalcouple("");
        setReturnPolicy("");
        setCheckInOut("");
        setOnDoubleSharing("");
        setOnQuadSharing("");
        setOnbulkbooking("");
        setOntripplesharing("");
        setOnmore4room("");
        setOffDoubleSharing("");
        setOffbulkbooking("");
        setOffmore4room("");
        setOffquadsharing("");
        setOfftripplesharing("");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const navItems = [
    "Hotel Contact Information",
    "Basic Information",
    "Hotel Policy",
    "Hotel Tariff",
  ];

  const defaultImages = [
    "https://avvermabucket.s3.ap-south-1.amazonaws.com/1688022019310-Room.jpg",
    "https://avvermabucket.s3.ap-south-1.amazonaws.com/1688022443531-bathroom.jpeg",
    "https://avvermabucket.s3.ap-south-1.amazonaws.com/1688022416654-parking.jpg",
    "https://avvermabucket.s3.ap-south-1.amazonaws.com/1688022425620-Lane.jpg",
    "https://avvermabucket.s3.ap-south-1.amazonaws.com/1688022404482-resturant.jpg",
    "https://avvermabucket.s3.ap-south-1.amazonaws.com/1688022435744-Front.jpg",
  ];

  const [uploadimage, setUploadimage] = useState("");

  const handleNavItemClick = (navItem) => {
    if (navItem === "Basic Information") {
      setActiveNavItem(navItem);
      setImages([]);
    } else {
      setActiveNavItem(navItem);
    }
  };

  const handleNextClick = () => {
    const currentIndex = navItems.indexOf(activeNavItem);
    const nextIndex = currentIndex + 1;

    if (nextIndex < navItems.length) {
      setActiveNavItem(navItems[nextIndex]);
    }
  };

  const handlePrevClick = () => {
    const currentIndex = navItems.indexOf(activeNavItem);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setActiveNavItem(navItems[prevIndex]);
    }
  };

  

  const handleCheckboxChange = (event) => {
    // Handle checkbox change logic here
  };

  if (location.pathname !== "/partner") {
    return null;
  }

  return (
    <div>
      <nav>
        <ul className="navbar">
          {navItems.map((navItem) => (
            <li
              key={navItem}
              className={activeNavItem === navItem ? "active" : ""}
              onClick={() => handleNavItemClick(navItem)}
            >
              {navItem}
            </li>
          ))}
        </ul>
      </nav>

      <div className="content">
        {activeNavItem === "Hotel Contact Information" && (
          <div>
            <h3>Hotel Listed Request</h3>
            <div className="group1">
              <div className="hotelownername">
                <label htmlFor="hotelOwnerName">Hotel Owner Name</label>
                <input
                  type="text"
                  id="hotelOwnerName"
                  value={hotelOwnerName}
                  onChange={(e) => setHotelOwnerName(e.target.value)}
                />
              </div>
              <div className="ownercontactdetail">
                <label htmlFor="ownerContactDetails">
                  Owner Contact Details:
                </label>
                <input
                  type="text"
                  id="ownerContactDetails"
                  value={ownerContactDetails}
                  onChange={(e) => setOwnerContactDetails(e.target.value)}
                />
              </div>
              <div className="receptioncontactdetails">
                <label htmlFor="receptionContactDetails">
                  Reception Contact Details:
                </label>
                <input
                  type="text"
                  id="receptionContactDetails"
                  value={receptionContactDetails}
                  onChange={(e) => setReceptionContactDetails(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="group2">
              <div className="hotelemailaddress">
                <label htmlFor="hotelEmail">Hotel Email Address:</label>
                <input
                  type="email"
                  id="hotelEmail"
                  value={hotelEmail}
                  onChange={(e) => setHotelEmail(e.target.value)}
                />
              </div>
              <div className="generalmanagercontact">
                <label htmlFor="generalManagerContact">
                  General Manager Contact Details:
                </label>
                <input
                  type="text"
                  id="generalManagerContact"
                  value={generalManagerContact}
                  onChange={(e) => setGeneralManagerContact(e.target.value)}
                />
              </div>
              <div className="salesmanagercontact">
                <label htmlFor="salesManagerContact">
                  Sales Manager Contact Details:
                </label>
                <input
                  type="text"
                  id="salesManagerContact"
                  value={salesManagerContact}
                  onChange={(e) => setSalesManagerContact(e.target.value)}
                />
              </div>
            </div>

            <h3>Hotel Details & Location</h3>
            <div className="group3">
              <div className="hoteldetails">
                <label htmlFor="hotelDetails">Hotel Details:</label>
                <input
                  type="text"
                  id="hotelDetails"
                  value={hotelDetails}
                  onChange={(e) => setHotelDetails(e.target.value)}
                />
              </div>
              <div className="street">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="cities">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="group4">
              <div className="state">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  value={countryState}
                  onChange={(e) => setCountryState(e.target.value)}
                />
              </div>
              <div className="zipcode">
                <label htmlFor="zip">ZIP Code:</label>
                <input
                  type="text"
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div className="landmark">
                <label htmlFor="landmark">Landmark</label>
                <input
                  type="text"
                  id="landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
            </div>

            <h3>Hotel Star Rating</h3>
            <input
              type="radio"
              id="starone"
              name="starType"
              value="1 star"
              onChange={(e) => setStarType(e.target.value)}
            />
            <label htmlFor="starone">1 Star</label>
            <br />
            <input
              type="radio"
              id="startwo"
              name="starType"
              value="2 star"
              onChange={(e) => setStarType(e.target.value)}
            />
            <label htmlFor="startwo">2 Star</label>
            <br />
            <input
              type="radio"
              id="starthree"
              name="starType"
              value="3 star"
              onChange={(e) => setStarType(e.target.value)}
            />
            <label htmlFor="starthree">3 Star</label>
            <br />
            <input
              type="radio"
              id="starfour"
              name="starType"
              value="4 star"
              onChange={(e) => setStarType(e.target.value)}
            />
            <label htmlFor="starfour">4 Star</label>
            <br />
            <input
              type="radio"
              id="starfive"
              name="starType"
              value="5 star"
              onChange={(e) => setStarType(e.target.value)}
            />
            <label htmlFor="starfive">5 Star</label>

            <h3>Your Property Type</h3>
            <input
              type="radio"
              id="apartment"
              name="propertyType"
              value="apartment"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="Apartment">Apartment</label>
            <br />
            <input
              type="radio"
              id="guesthouse"
              name="propertyType"
              value="Guest House"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="guesthouse">Guest House</label>
            <br />
            <input
              type="radio"
              id="holiday"
              name="propertyType"
              value="Holiday Home"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="holiday">Holiday Home</label>
            <br />
            <input
              type="radio"
              id="homestay"
              name="propertyType"
              value="Homestay"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="homestay">Homestay</label>
            <br />

            <input
              type="radio"
              id="hostel"
              name="propertyType"
              value="Hostel"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="hostel">Hostel</label>
            <br />
            <input
              type="radio"
              id="hotel"
              name="propertyType"
              value="Hotel"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="hotel">Hotel</label>
            <br />
            <input
              type="radio"
              id="hotelapartment"
              name="propertyType"
              value="Hotel Aprtment"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="hotelaprtment">Hotel Aprtment</label>
            <br />
            <input
              type="radio"
              id="resort"
              name="propertyType"
              value="Resort"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="resort">Resort</label>
            <br />
            <input
              type="radio"
              id="villa"
              name="propertyType"
              value="Villa"
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <label htmlFor="villa">Villa</label>
          </div>
        )}

        {activeNavItem === "Basic Information" && (
          <div>
            <h3>Basic Information</h3>
            <div className="uploadimages1">
      {[...Array(6)].map((_, index) => (
        <div className="images" key={index}>
          <label htmlFor={`imageUpload${index}`}>
            {images[index] ? (
              <img src={URL.createObjectURL(images[index])} alt={`Selected Image ${index + 1}`} />
            ) : (
              <img
                className="default-image"
                src={defaultImages[index]}
                alt={`Default Image ${index + 1}`}
              />
            )}
          </label>
          <div className="image-container6">
            <input
              type="file"
              id={`imageUpload${index}`}
              accept="image/*"
              onChange={(event) => handleImageUpload(event, index)}
              className="imgbutton"
            />
          </div>
        </div>
      ))}

      
    </div>

            <div className="amenity-container5">
              <h3>Amenities</h3>
              <div className="amenities1">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setFreeWifi(e.target.checked)}
                    value="Free Wireless Internet"
                  />
                  <FontAwesomeIcon icon={faWifi} />
                  Free Wireless Internet
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setAc(e.target.checked)}
                    value="Air Conditioning"
                  />
                  <FontAwesomeIcon icon={faAirFreshener} />
                  Air Conditioning
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setRoomService(e.target.checked)}
                    value="Room Services"
                  />
                  <FontAwesomeIcon icon={faRestroom} />
                  Room Services
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setCleanDisinfect(e.target.checked)}
                    value="Clean And Disinfect"
                  />
                  <FontAwesomeIcon icon={faHandsWash} />
                  Clean & Disinfect
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setSchoolDiatacing(e.target.checked)}
                    value="School Diatacing"
                  />
                  <FontAwesomeIcon icon={faSchoolFlag} />
                  School Diatacing
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setFreeParking(e.target.checked)}
                    value="Free Parking"
                  />
                  <FontAwesomeIcon icon={faParking} />
                  Free Parking
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setHouseKeeping(e.target.checked)}
                    value="House Keeping"
                  />
                  <FontAwesomeIcon icon={faBrush} />
                  House Keeping
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setTowels(e.target.checked)}
                    value="Towels"
                  />
                  <FontAwesomeIcon icon={faTrowel} />
                  Towels
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setToiletries(e.target.checked)}
                    value="Complimentary Tolietries"
                  />
                  <FontAwesomeIcon icon={faHandsWash} />
                  Complimentary Tolietries
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setGoodShowers(e.target.checked)}
                    value="Good Showers"
                  />
                  <FontAwesomeIcon icon={faShower} />
                  Good Showers
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setCableTv(e.target.checked)}
                    value="Cable Tv"
                  />
                  <FontAwesomeIcon icon={faTv} />
                  Cable Tv
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setBottledWater(e.target.checked)}
                    value="Bottled Water"
                  />
                  <FontAwesomeIcon icon={faBottleWater} />
                  Complimentary Bottled Water
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setSwimmingPool(e.target.checked)}
                    value="Swimming Pool"
                  />
                  <FontAwesomeIcon icon={faSwimmingPool} />
                  Swimming Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setRestaurant(e.target.checked)}
                    value="On-site Restaurant"
                  />
                  <FontAwesomeIcon icon={faHotel} />
                  On-site Restaurant
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setHairDryer(e.target.checked)}
                    value="Hair Dryer"
                  />
                  <FontAwesomeIcon icon={faAirFreshener} />
                  Hair Dryer
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setFitnessCenter(e.target.checked)}
                    value="Fitness Center"
                  />
                  <FontAwesomeIcon icon={faHeartCircleCheck} />
                  Fitness Center
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setConclergeDesk(e.target.checked)}
                    value="Conclerge Desk"
                  />
                  <FontAwesomeIcon icon={faDesktop} />
                  Conclerge Desk
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setSpa(e.target.checked)}
                    value="Spa"
                  />
                  <FontAwesomeIcon icon={faSpa} />
                  Spa
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setDryClean(e.target.checked)}
                    value="Dry Cleaning"
                  />
                  <FontAwesomeIcon icon={faAirFreshener} />
                  Dry Cleaning
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setBathrobe(e.target.checked)}
                    value="Bathrobe"
                  />
                  <FontAwesomeIcon icon={faBathtub} />
                  Bathrobe
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setFrontDeskService(e.target.checked)}
                    value="24 Hour Front Desk Service"
                  />
                  <FontAwesomeIcon icon={faCheck} />
                  24 Hours Front Desk Service
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Bar"
                  />
                  <FontAwesomeIcon icon={faBars} />
                  Bar
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Coffee/Tea"
                  />
                  <FontAwesomeIcon icon={faCoffee} />
                  Coffee/Tea
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Non Smoking Rooms"
                  />
                  <FontAwesomeIcon icon={faSmokingBan} />
                  Non Smoking Rooms
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Baby Sitting"
                  />
                  <FontAwesomeIcon icon={faBaby} />
                  Baby Sitting
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Picnic Area"
                  />
                  <FontAwesomeIcon icon={faUmbrellaBeach} />
                  Picnic Area
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Currency Exchange"
                  />
                  <FontAwesomeIcon icon={faInr} />
                  Currency Exchange
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Indoor Pool"
                  />
                  <FontAwesomeIcon icon={faSwimmingPool} />
                  Indoor Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Shoesshine"
                  />
                  <FontAwesomeIcon icon={faShoePrints} />
                  Shoesshine
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Tour Desk"
                  />
                  <FontAwesomeIcon icon={faCheck} />
                  Tour Desk
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Loundry"
                  />
                  <FontAwesomeIcon icon={faShirt} />
                  Loundry
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Lockers"
                  />
                  <FontAwesomeIcon icon={faLock} />
                  Lockers
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value="Business Center"
                  />
                  <FontAwesomeIcon icon={faBusinessTime} />
                  Business Center
                </label>
              </div>
            </div>
          </div>
        )}

        {activeNavItem === "Hotel Policy" && (
          <div>
            <h3>Hotel Policy</h3>
            <form onSubmit={handlePartnerSubmit}>
            <div className="radioinputs">
              <label>1-Outside Food</label>
              <br />
              <label>
                <input type="radio" 
                name="outsideFoodPolicy" 
                value="allowed"
                onChange={(e) => setOutsideFoodPolicy(e.target.value)}
        checked={outsideFoodPolicy === "allowed"} 
               
                  
                />
                Allowed
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="outsideFoodPolicy"
                  value="notAllowed"
                  checked={outsideFoodPolicy === "notAllowed"}
                  onChange={(e) => setOutsideFoodPolicy(e.target.value)}
        

                  
                />
                Not Allowed
              </label>
              <br />
              <label>2-Cancellation</label>
              <br />
              <label>
                <input type="radio"
                 name="cancellationpolicy"
                  value="allowed"
                  checked={cancellationpolicy === "allowed"}
                  onChange={(e)=>setCancellationpolicy(e.target.value)}
                   />
                Allowed
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="cancellationpolicy"
                  value="notAllowed"
                  checked={cancellationpolicy === "notAllowed"}
                  onChange={(e)=>setCancellationpolicy(e.target.value)}
                />
                Not Allowed
              </label>
              <br />
              <label>3-Select Your Payment Mode You Accepted</label>
              <br />
              <label>
                <input type="radio"
                 name="paymentmode"
                  value="online"
                  checked={paymentMode === "online"}
                  onChange={(e)=>setPaymentMode(e.target.value)} />
                Online
              </label>
              <br />
              <label>
                <input type="radio" name="paymentmode" value="offline"
                checked={paymentMode === "offline"}
                  onChange={(e)=>setPaymentMode(e.target.value)} />
                Offline
              </label>
              <br />
              <label>4-Pets Allowed</label>
              <br />
              <label>
                <input type="radio"
                 name="pets"
                  value="allowed"
                  checked={pets === "allowed"} 
                    onChange={(e)=>setPets(e.target.value)}
                  />
                Allowed
              </label>
              <br />
              <label>
                <input type="radio" name="pets" value="notAllowed" 
                   checked={pets === "notAllowed"} 
                    onChange={(e)=>setPets(e.target.value)}
                />
                Not Allowed
              </label>
              <br />
              <label>5-Bachelor Allowed</label>
              <br />
              <label>
                <input type="radio"
                 name="Bachelorallow"
                  value="allowed"
                  checked={bachelor === "allowed"} 
                    onChange={(e)=>setBachelor(e.target.value)} />
                Allowed
              </label>
              <br />
              <label>
                <input type="radio" name="Bachelorallow" value="notAllowed"
                 checked={bachelor === "notAllowed"} 
                    onChange={(e)=>setBachelor(e.target.value)} />
                Not Allowed
              </label>
              <br />
              <label>6-Smoking Allowed</label>
              <br />
              <label>
                <input type="radio" name="smokingallow" value="allowed" 
                  checked={smoking === "allowed"} 
                    onChange={(e)=>setSmoking(e.target.value)}
                />
                Allowed
              </label>
              <br />
              <label>
                <input type="radio" name="smokingallow" value="notAllowed"
                 checked={smoking === "notAllowed"} 
                    onChange={(e)=>setSmoking(e.target.value)} />
                Not Allowed
              </label>
              <br />
              <label>7-Alcohol Allowed</label>
              <br />
              <label>
                <input type="radio" name="Alcohol" value="allowed" 
                   checked={alcohol === "allowed"} 
                    onChange={(e)=>setAlcohol(e.target.value)}
                />
                Allowed
              </label>
              <br />
              <label>
                <input type="radio" name="Alcohol" value="notAllowed"
                checked={alcohol === "notAllowed"} 
                    onChange={(e)=>setAlcohol(e.target.value)} />
                Not Allowed
              </label>
              <br />
              <label>8-Unmarried Couples</label>
              <br />
              <label>
                <input type="radio" name="unmarriedcouples" value="allowed" 
                  checked={unmarriedcouples === "allowed"} 
                    onChange={(e)=>setUnmarriedcouples(e.target.value)}
                />
                Allowed
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="unmarriedcouples"
                  value="notAllowed"
                  checked={unmarriedcouples === "notAllowed"} 
                    onChange={(e)=>setUnmarriedcouples(e.target.value)}
                />
                Not Allowed
              </label>
              <br />
              <label>9-International Guest Allowed</label>
              <br />
              <label>
                <input
                  type="radio"
                  name="internationalcouple"
                  value="allowed"
                  checked={internationalcouple === "allowed"} 
                    onChange={(e)=>setInternationalcouple(e.target.value)}
                />
                Allowed
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="internationalcouple"
                  value="notAllowed"
                  checked={internationalcouple === "notAllowed"} 
                    onChange={(e)=>setInternationalcouple(e.target.value)}
                />
                Not Allowed
              </label>
              <br />
             
              <hr />
              <label htmlFor="returnPolicy">Describe your return policy:</label>
              <input type="text" id="returnPolicy" 
              value={returnPolicy}
                onChange={(e)=>setReturnPolicy(e.target.value)}
              />

              <label htmlFor="checkInOut">Check-In and Check-Out:</label>
              <input type="text" id="checkInOut" value={checkInOut}
                onChange={(e)=>setCheckInOut(e.target.value)}
              />
              <hr />
              <div className="memo">
                <p className="early-late">Early Check-in And Late Check-out</p>
                <p className="checkin-rules">
                  1-Early Check-in the Standard Check-in time in hotels is 12
                  noon unless mentioned otherwise in your Booking voucher Early
                  Check in is Subject to availability Extra changes will usually
                  apply as per below policy
                </p>
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
                      <td>
                        100% Charges for one day payable as per room rates for
                        the previous day
                      </td>
                    </tr>
                    <tr>
                      <td>Before 6AM and 10AM</td>
                      <td>
                        0% to 30% charges payable as per room rates for the
                        previous day
                      </td>
                    </tr>
                    <tr>
                      <td>Before 10AM and 12 Noon</td>
                      <td>Complimentary</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  Complimentary breakfast will not be available to you for the
                  day of early Check-in
                </p>
              </div>
              <div className="memo">
                <p className="checkin-rules">
                  2-Late Check-out:The Standard Check-out times in hotel is 11AM
                  Unless mentioned otherwise in your Booking Voucher.Late
                  check-out is subjected to availability and can not be
                  confirmed with the hotel in advance.Extra charges will usually
                  apply per the below policy.
                </p>
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
                      <td>
                        Upto 30% of the room rate for the day depending on hotel
                        policy
                      </td>
                    </tr>
                    <tr>
                      <td>After 5 PM</td>
                      <td>100% of the room rate for the day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </form>
          </div>
          
        )}
        {activeNavItem === "Hotel Tariff" && (
          <div>
<div className="tariff-contain-all">

          <div className="tariff">
              <h3>Hotel Tariff</h3>
              <h6>Off-season</h6>
              <br />
              <div className="tariff-container1">
                <label htmlFor="offdoublesharing">
                  Double Sharing:
                  <input type="text" id="offdoublesharing" value={offDoubleSharing}
                    onChange={(e)=>setOffDoubleSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="offquadsharing">
                  Quad Sharing:
                  <input type="text" id="offquadsharing" value={offquadsharing}
                  onChange={(e)=>setOffquadsharing(e.target.value)} />
                </label>

                <label htmlFor="offbulkbooking">
                  Bulk Booking more then 20-30people:
                  <input type="text" id="offbulkbooking" value={offbulkbooking}
                    onChange={(e)=>setOffbulkbooking(e.target.value)}
                  />
                </label>

                <label htmlFor="offtripplesharing">
                  Tripple Sharing:
                  <input type="text" id="offtripplesharing" />
                </label>
                <label htmlFor="offtripplesharing">
                  More then four rooms:
                  <input type="text" id="offmore4rooms" value={offmore4room}
                    onChange={(e)=>setOffmore4room(e.target.value)}
                  />
                </label>
                <h6>AP Plan</h6>
                <label htmlFor="offdoublesharing">
                  Double Sharing:
                  <input type="text" id="offdoublesharing" value={offDoubleSharing}
                    onChange={(e)=>setOffDoubleSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="offquadsharing">
                  Quad Sharing:
                  <input type="text" id="offquadsharing" value={offquadsharing}
                  onChange={(e)=>setOffquadsharing(e.target.value)} />
                </label>

                <label htmlFor="offbulkbooking">
                  Bulk Booking more then 20-30people:
                  <input type="text" id="offbulkbooking" value={offbulkbooking}
                    onChange={(e)=>setOffbulkbooking(e.target.value)}
                  />
                </label>

                <label htmlFor="offtripplesharing">
                  Tripple Sharing:
                  <input type="text" id="offtripplesharing" />
                </label>
                <label htmlFor="offtripplesharing">
                  More then four rooms:
                  <input type="text" id="offmore4rooms" value={offmore4room}
                    onChange={(e)=>setOffmore4room(e.target.value)}
                  />
                </label>
                <h6>Map plan</h6>
                <label htmlFor="offdoublesharing">
                  Double Sharing:
                  <input type="text" id="offdoublesharing" value={offDoubleSharing}
                    onChange={(e)=>setOffDoubleSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="offquadsharing">
                  Quad Sharing:
                  <input type="text" id="offquadsharing" value={offquadsharing}
                  onChange={(e)=>setOffquadsharing(e.target.value)} />
                </label>

                <label htmlFor="offbulkbooking">
                  Bulk Booking more then 20-30people:
                  <input type="text" id="offbulkbooking" value={offbulkbooking}
                    onChange={(e)=>setOffbulkbooking(e.target.value)}
                  />
                </label>

                <label htmlFor="offtripplesharing">
                  Tripple Sharing:
                  <input type="text" id="offtripplesharing" />
                </label>
                <label htmlFor="offtripplesharing">
                  More then four rooms:
                  <input type="text" id="offmore4rooms" value={offmore4room}
                    onChange={(e)=>setOffmore4room(e.target.value)}
                  />
                </label>
                
                  
                
              </div>
            </div>
            <div className="tariff">
              <h3>Hotel Tariff</h3>
              <h6>On-season</h6>
              <br />

              <div className="tariff-container1">
                <label htmlFor="ondoublesharing">
                  Double Sharing
                  <input type="text" id="ondoublesharing" value={onDoubleSharing}
                    onChange={(e)=>setOnDoubleSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="onquadsharing">
                  Quad Sharing
                  <input type="text" id="onquadsharing" value={onQuadSharing}
                    onChange={(e)=>setOnQuadSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="onbulkbooking">
                  Bulk Booking more then 20-30people
                  <input type="text" id="onbulkbooking" value={onbulkbooking}
                    onChange={(e)=>setOnbulkbooking(e.target.value)}
                  />
                </label>

                <label htmlFor="ontripplesharing">
                  Tripple Sharing
                  <input type="text" id="ontripplesharing" value={ontripplesharing}
                    onChange={(e)=>setOntripplesharing(e.target.value)}
                  />
                </label>
                <label htmlFor="onmorerooms">
                  More then four rooms:
                  <input type="text" id="onmore4rooms" value={onmore4room}
                    onChange={(e)=>setOnmore4room(e.target.value)}
                  />
                </label>
                <h6>AP Plan</h6>
                <label htmlFor="offdoublesharing">
                  Double Sharing:
                  <input type="text" id="offdoublesharing" value={offDoubleSharing}
                    onChange={(e)=>setOffDoubleSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="offquadsharing">
                  Quad Sharing:
                  <input type="text" id="offquadsharing" value={offquadsharing}
                  onChange={(e)=>setOffquadsharing(e.target.value)} />
                </label>

                <label htmlFor="offbulkbooking">
                  Bulk Booking more then 20-30people:
                  <input type="text" id="offbulkbooking" value={offbulkbooking}
                    onChange={(e)=>setOffbulkbooking(e.target.value)}
                  />
                </label>

                <label htmlFor="offtripplesharing">
                  Tripple Sharing:
                  <input type="text" id="offtripplesharing" />
                </label>
                <label htmlFor="offtripplesharing">
                  More then four rooms:
                  <input type="text" id="offmore4rooms" value={offmore4room}
                    onChange={(e)=>setOffmore4room(e.target.value)}
                  />
                </label>
                <h6>Map plan</h6>
                <label htmlFor="offdoublesharing">
                  Double Sharing:
                  <input type="text" id="offdoublesharing" value={offDoubleSharing}
                    onChange={(e)=>setOffDoubleSharing(e.target.value)}
                  />
                </label>

                <label htmlFor="offquadsharing">
                  Quad Sharing:
                  <input type="text" id="offquadsharing" value={offquadsharing}
                  onChange={(e)=>setOffquadsharing(e.target.value)} />
                </label>

                <label htmlFor="offbulkbooking">
                  Bulk Booking more then 20-30people:
                  <input type="text" id="offbulkbooking" value={offbulkbooking}
                    onChange={(e)=>setOffbulkbooking(e.target.value)}
                  />
                </label>

                <label htmlFor="offtripplesharing">
                  Tripple Sharing:
                  <input type="text" id="offtripplesharing" />
                </label>
                <label htmlFor="offtripplesharing">
                  More then four rooms:
                  <input type="text" id="offmore4rooms" value={offmore4room}
                    onChange={(e)=>setOffmore4room(e.target.value)}
                  />
                </label>
              </div>
            </div>

            
          </div>
          </div>
        )}

        <div className="button-container">
          {activeNavItem !== navItems[0] && (
            <button onClick={handlePrevClick}>Previous</button>
          )}
          {activeNavItem !== navItems[navItems.length - 1] && (
            <button onClick={handleNextClick}>Next</button>
          )}
          {activeNavItem === "Hotel Tariff" && (
            <button onClick={handlePartnerSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partner;