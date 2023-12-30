import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./partner.css";
import "../Profile/confirmBooking.css";

const Partner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [DeskServicesChecked, setDeskServicesChecked] = useState(false);
  const [Atm, setAtm] = useState(false);
  const [AirConditioning, setAirConditioning] = useState(false);
  const [AirportShuttleFree, setAirportShuttleFree] = useState(false);
  const [AirportShuttleSurcharge, setAirportShuttleSurcharge] = useState(false);
  const [BBQpicnicArea, setBBQpicnicArea] = useState(false);
  const [BabySitting, setBabySitting] = useState(false);
  const [BaggageStorage, setBaggageStorage] = useState(false);
  const [Bar, setBar] = useState(false);
  const [Bathrobe, setBathrobe] = useState(false);
  const [Beach, setBeach] = useState(false);
  const [BeachFront, setBeachFront] = useState(false);
  const [Billiard, setBilliard] = useState(false);
  const [BusinessCenter, setBusinessCenter] = useState(false);
  const [CableTV, setCableTV] = useState(false);
  const [CarRental, setCarRental] = useState(false);
  const [Casino, setCasino] = useState(false);
  const [CleanDisinfect, setCleanDisinfect] = useState(false);
  const [CoffeeTea, setCoffeeTea] = useState(false);
  const [CoffeeMaker, setCoffeeMaker] = useState(false);
  const [ComplimentaryBottledWater, setComplimentaryBottledWater] =
    useState(false);
  const [ComplimentaryToiletries, setComplimentaryToiletries] = useState(false);
  const [ComplimentaryBreakfast, setComplimentaryBreakfast] = useState(false);
  const [ConclergeDesk, setConclergeDesk] = useState(false);
  const [ContinentalBreakfast, setContinentalBreakfast] = useState(false);
  const [CurrencyExchange, setCurrencyExchange] = useState(false);
  const [Dinner, setDinner] = useState(false);
  const [DryCleaning, setDryCleaning] = useState(false);
  const [Elevators, setElevators] = useState(false);
  const [ExecutiveSuite, setExecutiveSuite] = useState(false);
  const [Fishing, setFishing] = useState(false);
  const [FitnessCenter, setFitnessCenter] = useState(false);
  const [FreeParking, setFreeParking] = useState(false);
  const [FreeWirelessInternet, setFreeWirelessInternet] = useState(false);
  const [GameRoom, setGameRoom] = useState(false);
  const [GoodShowers, setGoodShowers] = useState(false);
  const [GroceryShoppingServiceAvailable, setGroceryShoppingServiceAvailable] =
    useState(false);
  const [HairDryer, setHairDryer] = useState(false);
  const [HouseKeeping, setHouseKeeping] = useState(false);
  const [IndoorParking, setIndoorParking] = useState(false);
  const [IndoorPool, setIndoorPool] = useState(false);
  const [IroningService, setIroningService] = useState(false);
  const [Jacuzzi, setJacuzzi] = useState(false);
  const [KitchenFacility, setKitchenFacility] = useState(false);
  const [Laundary, setLaundary] = useState(false);
  const [Library, setLibrary] = useState(false);
  const [Lockers, setLockers] = useState(false);
  const [Lunch, setLunch] = useState(false);
  const [MeetingBanquetFacilities, setMeetingBanquetFacilities] =
    useState(false);
  const [Microwave, setMicrowave] = useState(false);
  const [Newspaper, setNewspaper] = useState(false);
  const [NightclubDJ, setNightclubDJ] = useState(false);
  const [NonSmokingRooms, setNonSmokingRooms] = useState(false);
  const [OnSiteRestaurant, setOnSiteRestaurant] = useState(false);
  const [PaidParking, setPaidParking] = useState(false);
  const [PetFriendly, setPetFriendly] = useState(false);
  const [Playground, setPlayground] = useState(false);
  const [PrivateBeacharea, setPrivateBeacharea] = useState(false);
  const [Refrigerator, setRefrigerator] = useState(false);
  const [RoomService, setRoomService] = useState(false);
  const [Safe, setSafe] = useState(false);
  const [SatelliteTv, setSatelliteTv] = useState(false);
  const [Shoeshine, setShoeshine] = useState(false);

  const [Shops, setShops] = useState(false);
  const [SocialDistancing, setSocialDistancing] = useState(false);
  const [GiftShop, setGiftShop] = useState(false);
  const [Spa, setSpa] = useState(false);
  const [SwimmingPool, setSwimmingPool] = useState(false);
  const [Tabletennis, setTabletennis] = useState(false);
  const [Telephone, setTelephone] = useState(false);
  const [Television, setTelevision] = useState(false);
  const [Tenniscourt, setTenniscourt] = useState(false);
  const [TourDesk, setTourDesk] = useState(false);
  const [Towels, setTowels] = useState(false);
  const [TurkishSteambath, setTurkishSteambath] = useState(false);
  const [valetparking, setvaletparking] = useState(false);
  const [VendingMachine, setVendingMachine] = useState(false);

  const [activeNavItem, setActiveNavItem] = useState(
    "Hotel Contact Information"
  );
  const [images, setImages] = useState([]);
  const [hotelOwnerName, setHotelOwnerName] = useState("");
  const [roomDetails, setRoomDetails] = useState([{}]);
  const [foodItems, setFoodItems] = useState([{}]);
  const [ownerContactDetails, setOwnerContactDetails] = useState("");
  const [receptionContactDetails, setReceptionContactDetails] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [generalManagerContact, setGeneralManagerContact] = useState("");
  const [salesManagerContact, setSalesManagerContact] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [description, setDescription] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [hotelsPolicy,setHotelsPolicy] = useState("")
  const [customerWelcomeNote,setCustomerWelcomeNote]= useState("")
  const [checkOutPolicy,setCheckOutPolicy]=useState("")
  const [checkInPolicy,setCheckInPolicy]=useState("")
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [countryState, setCountryState] = useState("");
  const [zip, setZip] = useState("");
  const [landmark, setLandmark] = useState("");
  const [destination, setDestination] = useState("");
  const [starRating, setstarRating] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [onDoubleSharing, setOnDoubleSharing] = useState("");
  const [onQuadSharing, setOnQuadSharing] = useState("");
  const [onbulkbooking, setOnbulkbooking] = useState("");
  const [ontripplesharing, setOntripplesharing] = useState("");
  const [onmore4room, setOnmore4room] = useState("");

  const [onDoubleSharingap, setOnDoubleSharingap] = useState("");
  const [onQuadSharingap, setOnQuadSharingap] = useState("");
  const [onbulkbookingap, setOnbulkbookingap] = useState("");
  const [ontripplesharingap, setOntripplesharingap] = useState("");
  const [onmore4roomap, setOnmore4roomap] = useState("");

  const [onDoubleSharingmap, setOnDoubleSharingmap] = useState("");
  const [onQuadSharingmap, setOnQuadSharingmap] = useState("");
  const [onbulkbookingmap, setOnbulkbookingmap] = useState("");
  const [ontripplesharingmap, setOntripplesharingmap] = useState("");
  const [onmore4roommap, setOnmore4roommap] = useState("");

  const [offDoubleSharing, setOffDoubleSharing] = useState("");
  const [offtripplesharing, setOfftripplesharing] = useState("");
  const [offquadsharing, setOffquadsharing] = useState("");
  const [offbulkbooking, setOffbulkbooking] = useState("");
  const [offmore4room, setOffmore4room] = useState("");

  const [offDoubleSharingApPlan, setOffDoubleSharingApPlan] = useState("");
  const [offtripplesharingap, setOfftripplesharingap] = useState("");
  const [offquadsharingap, setOffquadsharingap] = useState("");
  const [offbulkbookingap, setOffbulkbookingap] = useState("");
  const [offmore4roomap, setOffmore4roomap] = useState("");

  const [offDoubleSharingmap, setOffDoubleSharingmap] = useState("");
  const [offtripplesharingmap, setOfftripplesharingmap] = useState("");
  const [offquadsharingmap, setOffquadsharingmap] = useState("");
  const [offbulkbookingmap, setOffbulkbookingmap] = useState("");
  const [offmore4roommap, setOffmore4roommap] = useState("");

  const [outsideFoodPolicy, setOutsideFoodPolicy] = useState("");
  const [cancellationpolicy, setCancellationpolicy] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [pets, setPets] = useState("");
  const [bachelor, setBachelor] = useState("");
  const [smoking, setSmoking] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [unmarriedcouples, setUnmarriedcouples] = useState("");
  const [internationalcouple, setInternationalcouple] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
 
  const [checkInOut, setCheckInOut] = useState("");

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
    formData.append("hotelName", hotelName);
    for (const detail of roomDetails) {
      formData.append("roomDetails[type]", detail.type);
      // formData.append("roomDetails[images]", detail.images);
      formData.append("roomDetails[bedTypes]", detail.bedTypes);

      formData.append("roomDetails[price]", detail.price);
    }
    for (const detail of foodItems) {
      formData.append("foodItems[name]", detail.name);
      // formData.append("foodItems[images]", detail.images);
      formData.append("foodItems[about]", detail.about);
      formData.append("foodItems[price]", detail.price);
    }
    formData.append("description", description);
    formData.append("hotelsPolicy",hotelsPolicy)
    formData.append("checkInPolicy",checkInPolicy)
    formData.append("checkOutPolicy",checkOutPolicy)
    formData.append("customerWelcomeNote",customerWelcomeNote)
    formData.append("street", street);
    formData.append("numRooms", numRooms);
    formData.append("city", city);
    formData.append("state", countryState);
    formData.append("zip", zip);
    formData.append("landmark", landmark);
    formData.append("destination", destination);
    formData.append("starRating", starRating);
    formData.append("propertyType", propertyType);
    //see here
    if (DeskServicesChecked) {
      formData.append("amenities", "24-hour Front Desk Service");
    }
    if (Atm) {
      formData.append("amenities", "ATM on Site");
    }

    if (AirConditioning) {
      formData.append("amenities", "Air Conditioning");
    }
    if (AirportShuttleFree) {
      formData.append("amenities", "Airport Shuttle (Free)");
    }
    if (AirportShuttleSurcharge) {
      formData.append("amenities", "Airport Shuttle (Surcharge)");
    }
    if (BBQpicnicArea) {
      formData.append("amenities", "BBQ picnic Area");
    }
    if (BabySitting) {
      formData.append("amenities", "Baby Sitting");
    }
    if (BaggageStorage) {
      formData.append("amenities", "Baggage Storage");
    }

    if (Bar) {
      formData.append("amenities", "Bar");
    }
    if (Bathrobe) {
      formData.append("amenities", "Bathrobe");
    }
    if (Beach) {
      formData.append("amenities", "Beach");
    }
    if (BeachFront) {
      formData.append("amenities", "Beach Front");
    }
    if (Billiard) {
      formData.append("amenities", "Billiard");
    }

    if (BusinessCenter) {
      formData.append("amenities", "Business Center");
    }
    if (CableTV) {
      formData.append("amenities", "Cable TV");
    }
    if (CarRental) {
      formData.append("amenities", "Car Rental");
    }
    if (Casino) {
      formData.append("amenities", "Casino");
    }
    if (CleanDisinfect) {
      formData.append("amenities", "Clean & Disinfect");
    }
    if (CoffeeTea) {
      formData.append("amenities", "Coffee/Tea");
    }

    if (CoffeeMaker) {
      formData.append("amenities", "Coffee Maker");
    }
    if (ComplimentaryBottledWater) {
      formData.append("amenities", "Complimentary Bottled Water");
    }
    if (ComplimentaryToiletries) {
      formData.append("amenities", "Complimentary Toiletries");
    }
    if (ComplimentaryBreakfast) {
      formData.append("amenities", "Complimentary Breakfast");
    }
    if (ConclergeDesk) {
      formData.append("amenities", "Conclerge Desk");
    }
    if (ContinentalBreakfast) {
      formData.append("amenities", "Continental Breakfast");
    }

    if (CurrencyExchange) {
      formData.append("amenities", "Currency Exchange");
    }
    if (Dinner) {
      formData.append("amenities", "Dinner");
    }
    if (DryCleaning) {
      formData.append("amenities", "Dry Cleaning");
    }
    if (Elevators) {
      formData.append("amenities", "Elevators");
    }
    if (ExecutiveSuite) {
      formData.append("amenities", "Executive Suite");
    }
    if (Fishing) {
      formData.append("amenities", "Fishing");
    }

    if (FitnessCenter) {
      formData.append("amenities", "Fitness Center");
    }
    if (FreeParking) {
      formData.append("amenities", "Free Parking");
    }
    if (FreeWirelessInternet) {
      formData.append("amenities", "Free Wireless Internet");
    }

    if (GameRoom) {
      formData.append("amenities", "Game Room");
    }

    if (GoodShowers) {
      formData.append("amenities", "Good Showers");
    }
    if (GroceryShoppingServiceAvailable) {
      formData.append("amenities", "Grocery Shopping Service Available");
    }
    if (HairDryer) {
      formData.append("amenities", "Hair Dryer");
    }
    if (HouseKeeping) {
      formData.append("amenities", "House Keeping");
    }

    if (IndoorParking) {
      formData.append("amenities", "Indoor Parking");
    }
    if (IndoorPool) {
      formData.append("amenities", "Indoor Pool");
    }
    if (IroningService) {
      formData.append("amenities", "Ironing Service");
    }
    if (Jacuzzi) {
      formData.append("amenities", "Jacuzzi");
    }
    if (KitchenFacility) {
      formData.append("amenities", "Kitchen Facility");
    }
    if (Laundary) {
      formData.append("amenities", "Laundary");
    }
    if (Library) {
      formData.append("amenities", "Library");
    }

    if (Lockers) {
      formData.append("amenities", "Lockers");
    }
    if (Lunch) {
      formData.append("amenities", "Lunch");
    }
    if (MeetingBanquetFacilities) {
      formData.append("amenities", "Meeting Banquet Facilities");
    }
    if (Microwave) {
      formData.append("amenities", "Microwave");
    }
    if (Newspaper) {
      formData.append("amenities", "Newspaper");
    }

    if (NightclubDJ) {
      formData.append("amenities", "Nightclub DJ");
    }
    if (NonSmokingRooms) {
      formData.append("amenities", "Non Smoking Rooms");
    }
    if (OnSiteRestaurant) {
      formData.append("amenities", "On Site Restaurant");
    }
    if (PaidParking) {
      formData.append("amenities", "Paid Parking");
    }
    if (PetFriendly) {
      formData.append("amenities", "Pet Friendly");
    }
    if (Playground) {
      formData.append("amenities", "Playground");
    }

    if (PrivateBeacharea) {
      formData.append("amenities", "Private Beach area");
    }
    if (Refrigerator) {
      formData.append("amenities", "Refrigerator");
    }
    if (RoomService) {
      formData.append("amenities", "Room Service");
    }
    if (Safe) {
      formData.append("amenities", "Safe");
    }
    if (SatelliteTv) {
      formData.append("amenities", "Satellite Tv");
    }
    if (Shoeshine) {
      formData.append("amenities", "Shoeshine");
    }

    if (Shops) {
      formData.append("amenities", "Shops");
    }
    if (SocialDistancing) {
      formData.append("amenities", "Social Distancing");
    }
    if (GiftShop) {
      formData.append("amenities", "Gift Shop");
    }
    if (Spa) {
      formData.append("amenities", "Spa");
    }
    if (SwimmingPool) {
      formData.append("amenities", "Swimming Pool");
    }
    if (Tabletennis) {
      formData.append("amenities", "Table tennis");
    }
    if (Telephone) {
      formData.append("amenities", "Telephone");
    }

    if (Television) {
      formData.append("amenities", "Television");
    }
    if (Tenniscourt) {
      formData.append("amenities", "Tennis court");
    }
    if (TourDesk) {
      formData.append("amenities", "Tour Desk");
    }
    if (Towels) {
      formData.append("amenities", "Towels");
    }
    if (TurkishSteambath) {
      formData.append("amenities", "Turkish Steam bath");
    }
    if (valetparking) {
      formData.append("amenities", "valet parking");
    }
    if (VendingMachine) {
      formData.append("amenities", "Vending Machine");
    }

    formData.append("outsideFoodPolicy", outsideFoodPolicy);
    formData.append("cancellationPolicy", cancellationpolicy);
    formData.append("paymentMode", paymentMode);
    formData.append("petsAllowed", pets);
    formData.append("bachelorAllowed", bachelor);
    formData.append("smokingAllowed", smoking);
    formData.append("alcoholAllowed", alcohol);
    formData.append("unmarriedCouplesAllowed", unmarriedcouples);
    formData.append("internationalGuestAllowed", internationalcouple);
    formData.append("returnPolicy", returnPolicy);
   
    // formData.append("checkInOut", checkInOut);

    formData.append("onDoubleSharing", onDoubleSharing);
    formData.append("onQuadSharing", onQuadSharing);
    formData.append("onBulkBooking", onbulkbooking);
    formData.append("onTrippleSharing", ontripplesharing);
    formData.append("onMoreThanFour", onmore4room);

    formData.append("onDoubleSharingAp", onDoubleSharingap);
    formData.append("onQuadSharingAp", onQuadSharingap);
    formData.append("onBulkBookingAp", onbulkbookingap);
    formData.append("onTrippleSharingAp", ontripplesharingap);
    formData.append("onMoreThanFourAp", onmore4roomap);

    formData.append("onDoubleSharingMAp", onDoubleSharingmap);
    formData.append("onQuadSharingMAp", onQuadSharingmap);
    formData.append("onBulkBookingMAp", onbulkbookingmap);
    formData.append("onTrippleSharingMAp", ontripplesharingmap);
    formData.append("onMoreThanFourMAp", onmore4roommap);

    formData.append("offDoubleSharing", offDoubleSharing);
    formData.append("offQuadSharing", offquadsharing);
    formData.append("offBulkBooking", offbulkbooking);
    formData.append("offTrippleSharing", offtripplesharing);
    formData.append("offMoreThanFour", offmore4room);

    formData.append("offDoubleSharingAp", offDoubleSharingApPlan);
    formData.append("offQuadSharingAp", offquadsharingap);
    formData.append("offBulkBookingAp", offbulkbookingap);
    formData.append("offTrippleSharingAp", offtripplesharingap);
    formData.append("offMoreThanFourAp", offmore4roomap);

    formData.append("offDoubleSharingMAp", offDoubleSharingmap);
    formData.append("offQuadSharingMAp", offquadsharingmap);
    formData.append("offBulkBookingMAp", offbulkbookingmap);
    formData.append("offTrippleSharingMAp", offtripplesharingmap);
    formData.append("offMoreThanFourMAp", offmore4roommap);
    formData.append("images", images);
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      formData.append("images", file);
    }
    try {
      const response = await fetch(
        "https://hotel-backend-tge7.onrender.com/data/hotels-new/post/upload/data",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
         
        navigate("/");
        windows.location.reload()
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const navItems = [
    "Hotel Contact Information",
    "Basic Information",
    "Add Rooms",
    "Add Foods",
    "Hotel Policy",
    "Hotel Tariff",
  ];

  const handleChange = (e) => {
    const files = e.target.files;
    setImages([...images, ...files]);
  };

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

  if (location.pathname !== "/partner") {
    return null;
  }

  const handleFoodDetailsChange = (index, field, value) => {
    const updatedFoodDetails = [...foodItems];
    updatedFoodDetails[index][field] = value;
    setFoodItems(updatedFoodDetails);
  };


  // const handleFoodImageChange = (index, selectedFile) => {
  
  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const updatedFoodDetails = [...foodItems];
  //       updatedFoodDetails[index].images = e.target.result;
  //       setFoodItems(updatedFoodDetails);
  //     };
  //     reader.readAsDataURL(selectedFile);
  //   }
  // };


  const handleRoomDetailsChange = (index, field, value) => {
    const updatedRoomDetails = [...roomDetails];
    updatedRoomDetails[index][field] = value;
    setRoomDetails(updatedRoomDetails);
  };


  // const handleRoomImageChange = (index, selectedFile) => {

  //   if (selectedFile) {
    
  //     const reader = new FileReader();

  
  //     reader.onload = (e) => {
  //       const updatedRoomDetails = [...roomDetails];
       
  //       updatedRoomDetails[index].images = e.target.result;
  //       setRoomDetails(updatedRoomDetails);
  //     };

    
  //     reader.readAsDataURL(selectedFile);
  //   }
  // };

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
              <div
                className="salesmanagercontact"
                style={{ position: "relative", left: "-20px" }}
              >
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
              <div className="street">
                <label htmlFor="hotelName">Hotel Name:</label>
                <input
                  type="text"
                  id="hotelName"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>

              {/* <button type="button" onClick={addRoomDetail}>
          Add Room Detail
        </button> */}
              <div className="street" style={{ marginLeft: "15px" }}>
                <label htmlFor="description">Description :</label>
                <input
                  type="text"
                  id="descritption"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <h3>Hotel Star Rating</h3>

            <table style={{ width: "100%" }}>
              <tr>
                <td>
                  <input
                    type="radio"
                    id="starone"
                    name="starRating"
                    value="1 star"
                    onChange={(e) => setstarRating(e.target.value)}
                    checked={starRating === "1 star"}
                  />
                  <label htmlFor="starone">1 Star</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="startwo"
                    name="starRating"
                    value="2 star"
                    onChange={(e) => setstarRating(e.target.value)}
                    checked={starRating === "2 star"}
                  />
                  <label htmlFor="startwo">2 Star</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="starthree"
                    name="starRating"
                    value="3 star"
                    onChange={(e) => setstarRating(e.target.value)}
                    checked={starRating === "3 star"}
                  />
                  <label htmlFor="starthree">3 Star</label>
                </td>
              </tr>
            </table>

            <table style={{ width: "65%" }}>
              <tr>
                <td>
                  <input
                    type="radio"
                    id="starfour"
                    name="starRating"
                    value="4 star"
                    onChange={(e) => setstarRating(e.target.value)}
                    checked={starRating === "4 star"}
                  />
                  <label htmlFor="starfour">4 Star</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="starfive"
                    name="starRating"
                    value="5 star"
                    onChange={(e) => setstarRating(e.target.value)}
                    checked={starRating === "5 star"}
                  />
                  <label htmlFor="starfive">5 Star</label>
                </td>
              </tr>
            </table>

            <br />

            <h3>Your Property Type</h3>

            <table style={{ width: "100%" }}>
              <tr>
                <td>
                  <input
                    type="radio"
                    id="apartment"
                    name="propertyType"
                    value="Apartment"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Apartment"}
                  />
                  <label htmlFor="Apartment">Apartment</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="guesthouse"
                    name="propertyType"
                    value="Guest House"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Guest House"}
                  />
                  <label htmlFor="guesthouse">Guest House</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="holiday"
                    name="propertyType"
                    value="Holiday Home"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Holiday Home"}
                  />
                  <label htmlFor="holiday">Holiday Home</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="radio"
                    id="homestay"
                    name="propertyType"
                    value="Homestay"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Homestay"}
                  />
                  <label htmlFor="homestay">Homestay</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="hostel"
                    name="propertyType"
                    value="Hostel"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Hostel"}
                  />
                  <label htmlFor="hostel">Hostel</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="hotel"
                    name="propertyType"
                    value="Hotel"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Hotel"}
                  />
                  <label htmlFor="hotel">Hotel</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="radio"
                    id="hotelapartment"
                    name="propertyType"
                    value="Hotel Aprtment"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Hotel Aprtment"}
                  />
                  <label htmlFor="hotelaprtment">Hotel Aprtment</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="resort"
                    name="propertyType"
                    value="Resort"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Resort"}
                  />
                  <label htmlFor="resort">Resort</label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="villa"
                    name="propertyType"
                    value="Villa"
                    onChange={(e) => setPropertyType(e.target.value)}
                    checked={propertyType === "Villa"}
                  />
                  <label htmlFor="villa">Villa</label>
                </td>
              </tr>
            </table>
          </div>
        )}

        {activeNavItem === "Basic Information" && (
          <div>
            <h3>Basic Information</h3>
            <div className="uploadimages1">
              <div>
                <label htmlFor="">Room</label>
                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="">Bathroom</label>

                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="">Parking</label>

                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="">lane</label>

                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="">Front</label>

                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="">Reception</label>

                <input type="file" onChange={handleChange} />
              </div>
            </div>

            <div className="amenity-container5">
              <h3>Amenities</h3>
              <div className="amenities1">
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setDeskServicesChecked(!DeskServicesChecked)
                    }
                    checked={DeskServicesChecked}
                  />
                  24-hour Front Desk Service
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setAtm(!Atm)}
                    checked={Atm}
                  />
                  ATM on Site
                </label>
                <br />

                <label>
                  <input
                    type="checkbox"
                    onChange={() => setAirConditioning(!AirConditioning)}
                    checked={AirConditioning}
                  />
                  Air Conditioning
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setAirportShuttleFree(!AirportShuttleFree)}
                    checked={AirportShuttleFree}
                  />
                  Airport Shuttle (Free)
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setAirportShuttleSurcharge(!AirportShuttleSurcharge)
                    }
                    checked={AirportShuttleSurcharge}
                  />
                  Airport Shuttle Surcharge
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBBQpicnicArea(!BBQpicnicArea)}
                    checked={BBQpicnicArea}
                  />
                  BBQ picnic Area
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBabySitting(!BabySitting)}
                    checked={BabySitting}
                  />
                  Baby Sitting
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBaggageStorage(!BaggageStorage)}
                    checked={BaggageStorage}
                  />
                  Baggage Storage
                </label>
                <br />
                {/* here */}
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBar(!Bar)}
                    checked={Bar}
                  />
                  Bar
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBathrobe(!Bathrobe)}
                    checked={Bathrobe}
                  />
                  Bathrobe
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBeach(!Beach)}
                    checked={Beach}
                  />
                  Beach
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBeachFront(!BeachFront)}
                    checked={BeachFront}
                  />
                  Beach Front
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBilliard(!Billiard)}
                    checked={Billiard}
                  />
                  Billiard
                </label>
                <br />
                {/* here last */}
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setBusinessCenter(!BusinessCenter)}
                    checked={BusinessCenter}
                  />
                  Business Center
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCableTV(!CableTV)}
                    checked={CableTV}
                  />
                  Cable TV
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCarRental(!CarRental)}
                    checked={CarRental}
                  />
                  Car Rental
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCasino(!Casino)}
                    checked={Casino}
                  />
                  Casino
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCleanDisinfect(!CleanDisinfect)}
                    checked={CleanDisinfect}
                  />
                  Clean & Disinfect
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCoffeeTea(!CoffeeTea)}
                    checked={CoffeeTea}
                  />
                  Coffee/Tea
                </label>
                <br />
                {/* last to last */}
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCoffeeMaker(!CoffeeMaker)}
                    checked={CoffeeMaker}
                  />
                  Coffee Maker
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setComplimentaryBottledWater(!ComplimentaryBottledWater)
                    }
                    checked={ComplimentaryBottledWater}
                  />
                  Complimentary Bottled Water
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setComplimentaryToiletries(!ComplimentaryToiletries)
                    }
                    checked={ComplimentaryToiletries}
                  />
                  Complimentary Toiletries
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setComplimentaryBreakfast(!ComplimentaryBreakfast)
                    }
                    checked={ComplimentaryBreakfast}
                  />
                  Complimentary Breakfast
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setConclergeDesk(!ConclergeDesk)}
                    checked={ConclergeDesk}
                  />
                  Conclerge Desk
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setContinentalBreakfast(!ContinentalBreakfast)
                    }
                    checked={ContinentalBreakfast}
                  />
                  Continental Breakfast
                </label>
                <br />
                {/* last to last */}
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setCurrencyExchange(!CurrencyExchange)}
                    checked={CurrencyExchange}
                  />
                  Currency Exchange
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setDinner(!Dinner)}
                    checked={Dinner}
                  />
                  Dinner
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setDryCleaning(!DryCleaning)}
                    checked={DryCleaning}
                  />
                  Dry Cleaning
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setElevators(!Elevators)}
                    checked={Elevators}
                  />
                  Elevators
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setExecutiveSuite(!ExecutiveSuite)}
                    checked={ExecutiveSuite}
                  />
                  Executive Suite
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setFishing(!Fishing)}
                    checked={Fishing}
                  />
                  Fishing
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setFitnessCenter(!FitnessCenter)}
                    checked={FitnessCenter}
                  />
                  Fitness Center
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setFreeParking(!FreeParking)}
                    checked={FreeParking}
                  />
                  Free Parking
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setFreeWirelessInternet(!FreeWirelessInternet)
                    }
                    checked={FreeWirelessInternet}
                  />
                  Free Wireless Internet
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setGameRoom(!GameRoom)}
                    checked={GameRoom}
                  />
                  GameRoom
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setGoodShowers(!GoodShowers)}
                    checked={GoodShowers}
                  />
                  Good Showers
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setGroceryShoppingServiceAvailable(
                        !GroceryShoppingServiceAvailable
                      )
                    }
                    checked={GroceryShoppingServiceAvailable}
                  />
                  Grocery Shopping Service Available
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setHairDryer(!HairDryer)}
                    checked={HairDryer}
                  />
                  Hair Dryer
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setHouseKeeping(!HouseKeeping)}
                    checked={HouseKeeping}
                  />
                  House Keeping
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setIndoorParking(!IndoorParking)}
                    checked={IndoorParking}
                  />
                  Indoor Parking
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setIndoorPool(!IndoorPool)}
                    checked={IndoorPool}
                  />
                  Indoor Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setIroningService(!IroningService)}
                    checked={IroningService}
                  />
                  Ironing Service
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setJacuzzi(!Jacuzzi)}
                    checked={Jacuzzi}
                  />
                  Jacuzzi
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setKitchenFacility(!KitchenFacility)}
                    checked={KitchenFacility}
                  />
                  Kitchen Facility
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setLaundary(!Laundary)}
                    checked={Laundary}
                  />
                  Laundary
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setLibrary(!Library)}
                    checked={Library}
                  />
                  Library
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setLockers(!Lockers)}
                    checked={Lockers}
                  />
                  Lockers
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setLunch(!Lunch)}
                    checked={Lunch}
                  />
                  Lunch
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setMeetingBanquetFacilities(!MeetingBanquetFacilities)
                    }
                    checked={MeetingBanquetFacilities}
                  />
                  Meeting Banquet Facilities
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setMicrowave(!Microwave)}
                    checked={Microwave}
                  />
                  Microwave
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setNewspaper(!Newspaper)}
                    checked={Newspaper}
                  />
                  Newspaper
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setNightclubDJ(!NightclubDJ)}
                    checked={NightclubDJ}
                  />
                  Nightclub DJ
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setNonSmokingRooms(!NonSmokingRooms)}
                    checked={NonSmokingRooms}
                  />
                  Non Smoking Rooms
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setOnSiteRestaurant(!OnSiteRestaurant)}
                    checked={OnSiteRestaurant}
                  />
                  On Site Restaurant
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setPaidParking(!PaidParking)}
                    checked={PaidParking}
                  />
                  Paid Parking
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setPetFriendly(!PetFriendly)}
                    checked={PetFriendly}
                  />
                  Pet Friendly
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setPlayground(!Playground)}
                    checked={Playground}
                  />
                  Playground
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setPrivateBeacharea(!PrivateBeacharea)}
                    checked={PrivateBeacharea}
                  />
                  Private Beach area
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setRefrigerator(!Refrigerator)}
                    checked={Refrigerator}
                  />
                  Refrigerator
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setRoomService(!RoomService)}
                    checked={RoomService}
                  />
                  Room Service
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setSafe(!Safe)}
                    checked={Safe}
                  />
                  Safe
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setSatelliteTv(!SatelliteTv)}
                    checked={SatelliteTv}
                  />
                  Satellite Tv
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setShoeshine(!Shoeshine)}
                    checked={Shoeshine}
                  />
                  Shoeshine
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setShops(!Shops)}
                    checked={Shops}
                  />
                  Shops
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setSocialDistancing(!SocialDistancing)}
                    checked={SocialDistancing}
                  />
                  Social Distancing
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setGiftShop(!GiftShop)}
                    checked={GiftShop}
                  />
                  Gift Shop
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setSpa(!Spa)}
                    checked={Spa}
                  />
                  Spa
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setSwimmingPool(!SwimmingPool)}
                    checked={SwimmingPool}
                  />
                  Swimming Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTabletennis(!Tabletennis)}
                    checked={Tabletennis}
                  />
                  Table tennis
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTelephone(!Telephone)}
                    checked={Telephone}
                  />
                  Telephone
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTelevision(!Television)}
                    checked={Television}
                  />
                  Television
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTenniscourt(!Tenniscourt)}
                    checked={Tenniscourt}
                  />
                  Tenniscourt
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTourDesk(!TourDesk)}
                    checked={TourDesk}
                  />
                  Tour Desk
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTowels(!Towels)}
                    checked={Towels}
                  />
                  Towels
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setTurkishSteambath(!TurkishSteambath)}
                    checked={TurkishSteambath}
                  />
                  Turkish Steam bath
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setvaletparking(!valetparking)}
                    checked={valetparking}
                  />
                  valet parking
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setVendingMachine(!VendingMachine)}
                    checked={VendingMachine}
                  />
                  Vending Machine
                </label>
                <br />
              </div>
            </div>
          </div>
        )}

        <div className="room-content">
          {activeNavItem === "Add Rooms" && (
            <>
              <div className="disclaimer">
                {" "}
                For now you are only permitted to Add Standard Room, After
                confirmation of your partnership you can add more
              </div>
              <hr />
              {roomDetails.map((room, index) => (
                <div key={index}>
                  <table style={{ width: "100%" }}>
                    <tr>
                      <td>
                        <strong>Room Type</strong>
                      </td>
                      <td>
                        <select
                          value={room.type || "Standard"}
                          className="room-input"
                          onChange={(e) =>
                            handleRoomDetailsChange(
                              index,
                              "type",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Room Type</option>
                          <option value="Standard Room">Standard Room</option>
                          <option value="Deluxe Room">Deluxe Room</option>
                          <option value="Double Room">Double Room</option>
                          <option value="Double or Twin">Double or Twin</option>
                          <option value="Deluxe King Room">
                            Deluxe King Room
                          </option>
                          <option value="Family Room">Family Room</option>
                          <option value="Business Double Room">
                            Business Double Room
                          </option>
                          <option value="Two Bedroom Apartment">
                            Two Bedroom Apartment
                          </option>
                          <option value="Free Stay">Free Stay</option>
                          <option value="Three Bedroom Apartment">
                            Three Bedroom Apartment
                          </option>
                          <option value="Deluxe One Bed Room">
                            Deluxe One Bed Room
                          </option>
                          <option value="Deluxe Twin Room">
                            Deluxe Twin Room
                          </option>
                          <option value="Twin">Twin</option>
                          <option value="Two Bedroom Suite">
                            Two Bedroom Suite
                          </option>
                          <option value="Executive Studio">
                            Executive Studio
                          </option>
                          <option value="Executive Suite">
                            Executive Suite
                          </option>
                          <option value="Executive Room">Executive Room</option>
                          <option value="Superior">Superior</option>
                          <option value="Junior Suite">Junior Suite</option>
                          <option value="One Bedroom Suite">
                            One Bedroom Suite
                          </option>
                          <option value="One Bedroom Apartment">
                            One Bedroom Apartment
                          </option>
                          <option value="Partition Room">Partition Room</option>
                          <option value="Quadrupel">Quadrupel</option>
                          <option value="Royal Two Bedroom Suite">
                            Royal Two Bedroom Suite
                          </option>
                          <option value="Single Room">Single Room</option>
                          <option value="Six Bed">Six Bed</option>
                          <option value="Small Private Partition Room">
                            Small Private Partition Room
                          </option>
                          <option value="Standard One Bedroom Apartment">
                            Standard One Bedroom Apartment
                          </option>
                          <option value="Standard Studio With King Bed">
                            Standard Studio With King Bed
                          </option>
                          <option value="Standard Studio with Twin Bed">
                            Standard Studio with Twin Bed
                          </option>
                          <option value="Standard Three Bedroom Apartment">
                            Standard Three Bedroom Apartment
                          </option>
                          <option value="Standard Two Bedroom Apartment">
                            Standard Two Bedroom Apartment
                          </option>
                        </select>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <strong>Room Picture</strong>
                      </td>
                      <td>
                        <input
                          type="file"
                          className="room-input"
                          onChange={(e) =>
                            handleRoomImageChange(index, e.target.files[0])
                          }
                        />
                      </td>
                    </tr> */}

                    {/* </label> */}
                    <tr>
                      <td>
                        <strong>Bed Type</strong>
                      </td>
                      <td>
                        <select
                          value={room.bedTypes || "Single Bed"}
                          className="room-input"
                          onChange={(e) =>
                            handleRoomDetailsChange(
                              index,
                              "bedTypes",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Bed Type</option>
                          <option value="Single">Single Bed</option>
                          <option value="Bunk">Bunk Bed</option>
                          <option value="DayBed">DayBed</option>
                          <option value="KingSize">King Size</option>
                          <option value="KingBedOrQueenBed">
                            King Bed Or Queen Bed
                          </option>
                          <option value="KingOrTwin">King or Twin</option>
                          <option value="KingPlusTwin">King+Twin</option>
                          <option value="MurphyBed">Murphy Bed</option>
                          <option value="KingSizePlusQueenSize">
                            King Size + Queen Size
                          </option>
                          <option value="QueenSize">Queen Size</option>
                          <option value="TrundleBed">Trundle Bed</option>
                          <option value="TwinPlusKingPlusQueen">
                            Twin+King+Queen
                          </option>
                          <option value="Twin">Twin Bed</option>
                          <option value="KingBedOrQueenBedOrTwinBed">
                            King Bed or Queen Bed or Twin Bed
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Price</strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={room.price || ""}
                          className="room-input"
                          onChange={(e) =>
                            handleRoomDetailsChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Available rooms</strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={numRooms}
                          onChange={(e) => setNumRooms(e.target.value)}
                        />
                      </td>
                    </tr>
                    <br />
                  </table>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="room-content">
          {activeNavItem === "Add Foods" && (
            <>
              <div className="disclaimer"> Add foods to your hotel</div>
              <hr />
              {foodItems.map((food, index) => (
                <div key={index}>
                  <table style={{ width: "100%" }}>
                    <tr>
                      <td>
                        <strong>Food Name</strong>
                      </td>
                      <td>
                        <select
                          value={food.name || ""}
                          className="room-input"
                          onChange={(e) =>
                            handleFoodDetailsChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select food type</option>
                          <option value="Biryani">Biryani</option>
                          <option value="ButterChicken">Butter Chicken</option>
                          <option value="PaneerTikka">Paneer Tikka</option>
                          <option value="MasalaDosa">Masala Dosa</option>
                          <option value="CholeBhature">Chole Bhature</option>
                          <option value="RoganJosh">Rogan Josh</option>
                          <option value="Dhokla">Dhokla</option>
                          <option value="TandooriChicken">
                            Tandoori Chicken
                          </option>
                          <option value="AlooParatha">Aloo Paratha</option>
                          <option value="GulabJamun">Gulab Jamun</option>
                          <option value="Dosa">Dosa</option>
                          <option value="Idli">Idli</option>
                          <option value="Vada">Vada</option>
                          <option value="Sambhar">Sambhar</option>
                          <option value="Uttapam">Uttapam</option>
                          <option value="Bisi Bele Bath">Bisi Bele Bath</option>
                          <option value="Pongal">Pongal</option>
                          <option value="Rasam">Rasam</option>
                          <option value="Coconut Chutney">
                            Coconut Chutney
                          </option>
                          <option value="Fish Curry">Fish Curry</option>
                          <option value="FrenchFries">French Fries</option>
                          <option value="Burgers">Burgers</option>
                          <option value="Pizza">Pizza</option>
                          <option value="HotDogs">Hot Dogs</option>
                          <option value="IceCream">Ice Cream</option>
                          <option value="PotatoChips">Potato Chips</option>
                          <option value="CandyBars">Candy Bars</option>
                          <option value="Soda">
                            Soda (Carbonated Soft Drinks)
                          </option>
                          <option value="ChickenNuggets">
                            Chicken Nuggets
                          </option>
                          <option value="ChocolateChipCookies">
                            Chocolate Chip Cookies
                          </option>
                        </select>
                      </td>
                    </tr>

                    {/* </label> */}
                    <tr>
                      <td>
                        <strong>Description</strong>
                      </td>
                      <td>
                        <input
                          value={food.about || ""}
                          className="room-input"
                          onChange={(e) =>
                            handleFoodDetailsChange(
                              index,
                              "about",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <strong>Food Picture</strong>
                      </td>
                      <td>
                        <input
                          type="file"
                          className="room-input"
                          onChange={(e) =>
                            handleFoodImageChange(index, e.target.files[0])
                          }
                        />
                      </td>
                    </tr> */}

                    <tr>
                      <td>
                        <strong>Price</strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={food.price}
                          onChange={(e) =>
                            handleFoodDetailsChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                    <br />
                  </table>
                </div>
              ))}
            </>
          )}
        </div>
        {activeNavItem === "Hotel Policy" && (
          <div>
            <h3>Hotel Policy</h3>
            <form onSubmit={handlePartnerSubmit}>
              <div className="radioinputs">
                <table>
                  <tr>
                    <td>
                      <strong>1-Outside Food</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="outsideFoodPolicy"
                          value="allowed"
                          onChange={(e) => setOutsideFoodPolicy(e.target.value)}
                          checked={outsideFoodPolicy === "allowed"}
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
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
                    </td>
                  </tr>

                  {/* <br /> */}

                  <tr>
                    <td>
                      <strong>2-Cancellation</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="cancellationpolicy"
                          value="allowed"
                          checked={cancellationpolicy === "allowed"}
                          onChange={(e) =>
                            setCancellationpolicy(e.target.value)
                          }
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="cancellationpolicy"
                          value="notAllowed"
                          checked={cancellationpolicy === "notAllowed"}
                          onChange={(e) =>
                            setCancellationpolicy(e.target.value)
                          }
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>3-Select Your Payment Mode You Accepted</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="paymentmode"
                          value="online"
                          checked={paymentMode === "online"}
                          onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        Online
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="paymentmode"
                          value="offline"
                          checked={paymentMode === "offline"}
                          onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        Offline
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="paymentmode"
                          value="both"
                          checked={paymentMode === "both"}
                          onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        Online & Offline both
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>4-Pets Allowed</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="pets"
                          value="allowed"
                          checked={pets === "allowed"}
                          onChange={(e) => setPets(e.target.value)}
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="pets"
                          value="notAllowed"
                          checked={pets === "notAllowed"}
                          onChange={(e) => setPets(e.target.value)}
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>5-Bachelor Allowed</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="Bachelorallow"
                          value="allowed"
                          checked={bachelor === "allowed"}
                          onChange={(e) => setBachelor(e.target.value)}
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="Bachelorallow"
                          value="notAllowed"
                          checked={bachelor === "notAllowed"}
                          onChange={(e) => setBachelor(e.target.value)}
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>6-Smoking Allowed</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="smokingallow"
                          value="allowed"
                          checked={smoking === "allowed"}
                          onChange={(e) => setSmoking(e.target.value)}
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="smokingallow"
                          value="notAllowed"
                          checked={smoking === "notAllowed"}
                          onChange={(e) => setSmoking(e.target.value)}
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>7-Alcohol Allowed</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="Alcohol"
                          value="allowed"
                          checked={alcohol === "allowed"}
                          onChange={(e) => setAlcohol(e.target.value)}
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="Alcohol"
                          value="notAllowed"
                          checked={alcohol === "notAllowed"}
                          onChange={(e) => setAlcohol(e.target.value)}
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>8-Unmarried Couples</strong>
                    </td>
                    <td>
                      {" "}
                      <label>
                        <input
                          type="radio"
                          name="unmarriedcouples"
                          value="allowed"
                          checked={unmarriedcouples === "allowed"}
                          onChange={(e) => setUnmarriedcouples(e.target.value)}
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="unmarriedcouples"
                          value="notAllowed"
                          checked={unmarriedcouples === "notAllowed"}
                          onChange={(e) => setUnmarriedcouples(e.target.value)}
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>9-International Guest Allowed</strong>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="internationalcouple"
                          value="allowed"
                          checked={internationalcouple === "allowed"}
                          onChange={(e) =>
                            setInternationalcouple(e.target.value)
                          }
                        />
                        Allowed
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="internationalcouple"
                          value="notAllowed"
                          checked={internationalcouple === "notAllowed"}
                          onChange={(e) =>
                            setInternationalcouple(e.target.value)
                          }
                        />
                        Not Allowed
                      </label>
                    </td>
                  </tr>
                </table>

                <hr />
                <label htmlFor="returnPolicy">
                  Describe your return policy:
                </label>
                <input
                  type="text"
                  id="returnPolicy"
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                />
   <label htmlFor="returnPolicy">
                  Hotel Policy:
                </label>
                <textarea
                  type="text"
                  id="returnPolicy"
                  value={hotelsPolicy}
                  onChange={(e) => setHotelsPolicy(e.target.value)}
                />
                  <label htmlFor="returnPolicy">
                  Check-In Policy:
                </label>
                <textarea
                  type="text"
                  id="returnPolicy"
                  value={checkInPolicy}
                  onChange={(e) => setCheckInPolicy(e.target.value)}
                />
                  <label htmlFor="returnPolicy">
                  Check-Out Policy:
                </label>
                <textarea
                  type="text"
                  id="returnPolicy"
                  value={checkOutPolicy}
                  onChange={(e) => setCheckOutPolicy(e.target.value)}
                />
                  <label htmlFor="returnPolicy">
                  Customer welcome note:
                </label>
                <textarea
                  type="text"
                  id="returnPolicy"
                  value={customerWelcomeNote}
                  onChange={(e) => setCustomerWelcomeNote(e.target.value)}
                />
                {/* <label htmlFor='checkInOut'>Check-In and Check-Out:</label>
								<input
									type='text'
									id='checkInOut'
									value={checkInOut}
									onChange={(e) => setCheckInOut(e.target.value)}
								/> */}
                <hr />
                <div className="memo">
                  <p className="early-late">
                    Early Check-in And Late Check-out
                  </p>
                  <p className="checkin-rules">
                    1-Early Check-in the Standard Check-in time in hotels is 12
                    noon unless mentioned otherwise in your Booking voucher
                    Early Check in is Subject to availability Extra changes will
                    usually apply as per below policy
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
                    2-Late Check-out:The Standard Check-out times in hotel is
                    11AM Unless mentioned otherwise in your Booking Voucher.Late
                    check-out is subjected to availability and can not be
                    confirmed with the hotel in advance.Extra charges will
                    usually apply per the below policy.
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
                          Upto 30% of the room rate for the day depending on
                          hotel policy
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

                <table className="mytable1">
                  <tr>
                    <td>
                      <strong>Double Sharing</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="offdoublesharing"
                        value={offDoubleSharing}
                        onChange={(e) => setOffDoubleSharing(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Quad Sharing</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="offquadsharing"
                        value={offquadsharing}
                        onChange={(e) => setOffquadsharing(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Bulk Booking more then 20-30people:</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="offbulkbooking"
                        value={offbulkbooking}
                        onChange={(e) => setOffbulkbooking(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tripple Sharing:</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="offtripplesharing"
                        onChange={(e) => setOfftripplesharing(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>More then four rooms:</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="offmore4rooms"
                        value={offmore4room}
                        onChange={(e) => setOffmore4room(e.target.value)}
                      />
                    </td>
                  </tr>
                </table>
                <div className="tariff-container1">
                  <br />
                  <h6>AP Plan</h6>
                  {/* <label htmlFor="offDoubleSharingApPlan">
                    Double Sharing:
                    <input
                      type="text"
                      id="offDoubleSharingApPlan"
                      value={offDoubleSharingApPlan}
                      onChange={(e) =>
                        setOffDoubleSharingApPlan(e.target.value)
                      }
                    />
                  </label> */}
                  <table>
                    <tr>
                      <td>
                        <strong>Double Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offDoubleSharingApPlan"
                          value={offDoubleSharingApPlan}
                          onChange={(e) =>
                            setOffDoubleSharingApPlan(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Quad Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offquadsharingap"
                          value={offquadsharingap}
                          onChange={(e) => setOffquadsharingap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Bulk Booking more then 20-30people:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offbulkbookingap"
                          value={offbulkbookingap}
                          onChange={(e) => setOffbulkbookingap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tripple Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offtripplesharingap"
                          value={offtripplesharingap}
                          onChange={(e) =>
                            setOfftripplesharingap(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>More then four rooms:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offmore4roomsap"
                          value={offmore4roomap}
                          onChange={(e) => setOffmore4roomap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <br />
                  </table>

                  <h6>Map plan</h6>

                  <table>
                    <tr>
                      <td>
                        <strong>Double Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offdoublesharingmap"
                          value={offDoubleSharingmap}
                          onChange={(e) =>
                            setOffDoubleSharingmap(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Quad Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offquadsharingmap"
                          value={offquadsharingmap}
                          onChange={(e) => setOffquadsharingmap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Bulk Booking more then 20-30people:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offbulkbookingmap"
                          value={offbulkbookingmap}
                          onChange={(e) => setOffbulkbookingmap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tripple Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offtripplesharingmap"
                          value={offtripplesharingmap}
                          onChange={(e) =>
                            setOfftripplesharingmap(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>More then four rooms:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="offmore4roomsmap"
                          value={offmore4roommap}
                          onChange={(e) => setOffmore4roommap(e.target.value)}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="tariff">
                <h3>Hotel Tariff</h3>
                <h6>On-season</h6>
                <br />

                <div className="tariff-container1">
                  <table>
                    <tr>
                      <td>
                        <strong>Double Sharing</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ondoublesharing"
                          value={onDoubleSharing}
                          onChange={(e) => setOnDoubleSharing(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Quad Sharing</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onquadsharing"
                          value={onQuadSharing}
                          onChange={(e) => setOnQuadSharing(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Bulk Booking more then 20-30people</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onbulkbooking"
                          value={onbulkbooking}
                          onChange={(e) => setOnbulkbooking(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tripple Sharing</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ontripplesharing"
                          value={ontripplesharing}
                          onChange={(e) => setOntripplesharing(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>More then four rooms:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onmore4rooms"
                          value={onmore4room}
                          onChange={(e) => setOnmore4room(e.target.value)}
                        />
                      </td>
                    </tr>
                    <br />
                  </table>
                  {/* <label htmlFor="ondoublesharing">
                    Double Sharing
                    <input
                      type="text"
                      id="ondoublesharing"
                      value={onDoubleSharing}
                      onChange={(e) => setOnDoubleSharing(e.target.value)}
                    />
                  </label>

                  <label htmlFor="onquadsharing">
                    Quad Sharing
                    <input
                      type="text"
                      id="onquadsharing"
                      value={onQuadSharing}
                      onChange={(e) => setOnQuadSharing(e.target.value)}
                    />
                  </label>

                  <label htmlFor="onbulkbooking">
                    Bulk Booking more then 20-30people
                    <input
                      type="text"
                      id="onbulkbooking"
                      value={onbulkbooking}
                      onChange={(e) => setOnbulkbooking(e.target.value)}
                    />
                  </label>

                  <label htmlFor="ontripplesharing">
                    Tripple Sharing
                    <input
                      type="text"
                      id="ontripplesharing"
                      value={ontripplesharing}
                      onChange={(e) => setOntripplesharing(e.target.value)}
                    />
                  </label>
                  <label htmlFor="onmorerooms">
                    More then four rooms:
                    <input
                      type="text"
                      id="onmore4rooms"
                      value={onmore4room}
                      onChange={(e) => setOnmore4room(e.target.value)}
                    />
                  </label> */}
                  <h6>AP Plan</h6>
                  <table>
                    <tr>
                      <td>
                        <strong>Double Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ondoublesharingap"
                          value={onDoubleSharingap}
                          onChange={(e) => setOnDoubleSharingap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Quad Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ondoublesharingap"
                          value={onDoubleSharingap}
                          onChange={(e) => setOnDoubleSharingap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Bulk Booking more then 20-30people:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onbulkbookingap"
                          value={onbulkbookingap}
                          onChange={(e) => setOnbulkbookingap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tripple Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ontripplesharingap"
                          value={ontripplesharingap}
                          onChange={(e) =>
                            setOntripplesharingap(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>More then four rooms:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onmore4roomsap"
                          value={onmore4roomap}
                          onChange={(e) => setOnmore4roomap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <br />
                  </table>

                  <h6>Map plan</h6>

                  <table>
                    <tr>
                      <td>
                        <strong>Double Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ondoublesharingmap"
                          value={onDoubleSharingmap} //offDoubleSharingMapPlan
                          onChange={(e) =>
                            setOnDoubleSharingmap(e.target.value)
                          } //offDoubleSharingApPlan
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Quad Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onquadsharingmap"
                          value={onQuadSharingmap}
                          onChange={(e) => setOnQuadSharingmap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Bulk Booking more then 20-30people:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onbulkbookingmap"
                          value={onbulkbookingmap}
                          onChange={(e) => setOnbulkbookingmap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tripple Sharing:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="ontripplesharingmap"
                          value={ontripplesharingmap}
                          onChange={(e) =>
                            setOntripplesharingmap(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>More then four rooms:</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="onmore4roomsmap"
                          value={onmore4roommap}
                          onChange={(e) => setOnmore4roommap(e.target.value)}
                        />
                      </td>
                    </tr>
                    <br />
                  </table>
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
