/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  faAirFreshener,
  faBaby,
  faBars,
  faBathtub,
  faBottleWater,
  faBrush,
  faBusinessTime,
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
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./partner.css";

const Partner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(
    "Hotel Contact Information"
  );
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [hotelOwnerName, setHotelOwnerName] = useState("");
  const [ownerContactDetails, setOwnerContactDetails] = useState("");
  const [receptionContactDetails, setReceptionContactDetails] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [generalManagerContact, setGeneralManagerContact] = useState("");
  const [salesManagerContact, setSalesManagerContact] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [countryState, setCountryState] = useState("");
  const [zip, setZip] = useState("");
  const [landmark, setLandmark] = useState("");
  const [starRating, setStarRating] = useState("");
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

  const toggleAmenity = (amenity) => {
    if (amenities.includes(amenity)) {
      // If amenity is already in the array, remove it
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      // If amenity is not in the array, add it
      setAmenities([...amenities, amenity]);
    }
  };

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
    formData.append("hotelName", hotelName);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", countryState);
    formData.append("zip", zip);
    formData.append("landmark", landmark);
    formData.append("starRating", starRating);
    formData.append("propertyType", propertyType);

    formData.append("amenities", amenities);

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

    formData.append("offDoubleSharing", offDoubleSharing);
    formData.append("offQuadSharing", offquadsharing);
    formData.append("offBulkBooking", offbulkbooking);
    formData.append("offTrippleSharing", offtripplesharing);
    formData.append("offMoreThanFour", offmore4room);

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
    formData.append(`images`, images);

    try {
      const response = await fetch(
        "https://hotel-backend-tge7.onrender.com/hotels/create/new",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert(
          "Thank you for your request, we will review and contact you soon"
        );
        navigate("/home");
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
              <div className="hotelName">
                <label htmlFor="hotelName">Hotel Name:</label>
                <input
                  type="text"
                  id="hotelName"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
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
              onChange={(e) => setStarRating(e.target.value)}
              checked={starRating === "1 star"}
            />
            <label htmlFor="starone">1 Star</label>
            <br />
            <input
              type="radio"
              id="startwo"
              name="starType"
              value="2 star"
              onChange={(e) => setStarRating(e.target.value)}
              checked={starRating === "2 star"}
            />
            <label htmlFor="startwo">2 Star</label>
            <br />
            <input
              type="radio"
              id="starthree"
              name="starType"
              value="3 star"
              onChange={(e) => setStarRating(e.target.value)}
              checked={starRating === "3 star"}
            />
            <label htmlFor="starthree">3 Star</label>
            <br />
            <input
              type="radio"
              id="starfour"
              name="starType"
              value="4 star"
              onChange={(e) => setStarRating(e.target.value)}
              checked={starRating === "4 star"}
            />
            <label htmlFor="starfour">4 Star</label>
            <br />
            <input
              type="radio"
              id="starfive"
              name="starType"
              value="5 star"
              onChange={(e) => setStarRating(e.target.value)}
              checked={starRating === "5 star"}
            />
            <label htmlFor="starfive">5 Star</label>

            <h3>Your Property Type</h3>
            <input
              type="radio"
              id="apartment"
              name="propertyType"
              value="Apartment"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Apartment"}
            />
            <label htmlFor="Apartment">Apartment</label>
            <br />
            <input
              type="radio"
              id="guesthouse"
              name="propertyType"
              value="Guest House"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Guest House"}
            />
            <label htmlFor="guesthouse">Guest House</label>
            <br />
            <input
              type="radio"
              id="holiday"
              name="propertyType"
              value="Holiday Home"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Holiday Home"}
            />
            <label htmlFor="holiday">Holiday Home</label>
            <br />
            <input
              type="radio"
              id="homestay"
              name="propertyType"
              value="Homestay"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Homestay"}
            />
            <label htmlFor="homestay">Homestay</label>
            <br />

            <input
              type="radio"
              id="hostel"
              name="propertyType"
              value="Hostel"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Hostel"}
            />
            <label htmlFor="hostel">Hostel</label>
            <br />
            <input
              type="radio"
              id="hotel"
              name="propertyType"
              value="Hotel"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Hotel"}
            />
            <label htmlFor="hotel">Hotel</label>
            <br />
            <input
              type="radio"
              id="hotelapartment"
              name="propertyType"
              value="Hotel Aprtment"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Hotel Aprtment"}
            />
            <label htmlFor="hotelaprtment">Hotel Aprtment</label>
            <br />
            <input
              type="radio"
              id="resort"
              name="propertyType"
              value="Resort"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Resort"}
            />
            <label htmlFor="resort">Resort</label>
            <br />
            <input
              type="radio"
              id="villa"
              name="propertyType"
              value="Villa"
              onChange={(e) => setPropertyType(e.target.value)}
              checked={propertyType === "Villa"}
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
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`Selected Image ${index + 1}`}
                      />
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
                    onChange={(e) => toggleAmenity("Free Wireless Internet")}
                    value="Free Wireless Internet"
                    checked={amenities[0] === "Free Wireless Internet"}
                  />
                  <FontAwesomeIcon icon={faWifi} />
                  Free Wireless Internet
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Air Conditioning")}
                    value="Air Conditioning"
                    checked={amenities[1] === "Air Conditioning"}
                  />
                  <FontAwesomeIcon icon={faAirFreshener} />
                  Air Conditioning
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Room Services")}
                    value="Room Services"
                    checked={amenities[2] === "Room Services"}
                  />
                  <FontAwesomeIcon icon={faRestroom} />
                  Room Services
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Clean And Disinfect")}
                    value="Clean And Disinfect"
                    checked={amenities[3] === "Clean And Disinfect"}
                  />
                  <FontAwesomeIcon icon={faHandsWash} />
                  Clean & Disinfect
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("School Diatacing")}
                    value="School Diatacing"
                    checked={amenities[4] === "School Diatacing"}
                  />
                  <FontAwesomeIcon icon={faSchoolFlag} />
                  School Diatacing
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Free Parking")}
                    value="Free Parking"
                    checked={amenities[5] === "Free Parking"}
                  />
                  <FontAwesomeIcon icon={faParking} />
                  Free Parking
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("House Keeping")}
                    value="House Keeping"
                    checked={amenities[6] === "House Keeping"}
                  />
                  <FontAwesomeIcon icon={faBrush} />
                  House Keeping
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Towels")}
                    value="Towels"
                    checked={amenities[7] === "Towels"}
                  />
                  <FontAwesomeIcon icon={faTrowel} />
                  Towels
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Complimentary Tolietries")}
                    value="Complimentary Tolietries"
                    checked={amenities[8] === "Complimentary Tolietries"}
                  />
                  <FontAwesomeIcon icon={faHandsWash} />
                  Complimentary Tolietries
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Good Showers")}
                    value="Good Showers"
                    checked={amenities[9] === "Good Showers"}
                  />
                  <FontAwesomeIcon icon={faShower} />
                  Good Showers
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Cable Tv")}
                    value="Cable Tv"
                    checked={amenities[10] === "Cable Tv"}
                  />
                  <FontAwesomeIcon icon={faTv} />
                  Cable Tv
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      toggleAmenity("Complimentary Bottled Water")
                    }
                    value="Complimentary Bottled Water"
                    checked={amenities[11] === "Complimentary Bottled Water"}
                  />
                  <FontAwesomeIcon icon={faBottleWater} />
                  Complimentary Bottled Water
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Swimming Pool")}
                    value="Swimming Pool"
                    checked={amenities[12] === "Swimming Pool"}
                  />
                  <FontAwesomeIcon icon={faSwimmingPool} />
                  Swimming Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("On-site Restaurant")}
                    value="On-site Restaurant"
                    checked={amenities[13] === "On-site Restaurant"}
                  />
                  <FontAwesomeIcon icon={faHotel} />
                  On-site Restaurant
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Hair Dryer")}
                    value="Hair Dryer"
                    checked={amenities[14] === "Hair Dryer"}
                  />
                  <FontAwesomeIcon icon={faAirFreshener} />
                  Hair Dryer
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Fitness Center")}
                    value="Fitness Center"
                    checked={amenities[15] === "Fitness Center"}
                  />
                  <FontAwesomeIcon icon={faHeartCircleCheck} />
                  Fitness Center
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Conclerge Desk")}
                    value="Conclerge Desk"
                    checked={amenities[16] === "Conclerge Desk"}
                  />
                  <FontAwesomeIcon icon={faDesktop} />
                  Conclerge Desk
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Spa")}
                    value="Spa"
                    checked={amenities[17] === "Spa"}
                  />
                  <FontAwesomeIcon icon={faSpa} />
                  Spa
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Dry Cleaning")}
                    value="Dry Cleaning"
                    checked={amenities[18] === "Dry Cleaning"}
                  />
                  <FontAwesomeIcon icon={faAirFreshener} />
                  Dry Cleaning
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Bathrobe")}
                    value="Bathrobe"
                    checked={amenities[19] === "Bathrobe"}
                  />
                  <FontAwesomeIcon icon={faBathtub} />
                  Bathrobe
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      toggleAmenity("24 Hour Front Desk Service")
                    }
                    value="24 Hour Front Desk Service"
                    checked={amenities[20] === "24 Hour Front Desk Service"}
                  />
                  <FontAwesomeIcon icon={faCheck} />
                  24 Hours Front Desk Service
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Bar")}
                    value="Bar"
                    checked={amenities[21] === "Bar"}
                  />
                  <FontAwesomeIcon icon={faBars} />
                  Bar
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Coffee/Tea")}
                    value="Coffee/Tea"
                    checked={amenities[22] === "Coffee/Tea"}
                  />
                  <FontAwesomeIcon icon={faCoffee} />
                  Coffee/Tea
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Non Smoking Rooms")}
                    value="Non Smoking Rooms"
                    checked={amenities[23] === "Non Smoking Rooms"}
                  />
                  <FontAwesomeIcon icon={faSmokingBan} />
                  Non Smoking Rooms
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Baby Sitting")}
                    value="Baby Sitting"
                    checked={amenities[24] === "Baby Sitting"}
                  />
                  <FontAwesomeIcon icon={faBaby} />
                  Baby Sitting
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Picnic Area")}
                    value="Picnic Area"
                    checked={amenities[25] === "Picnic Area"}
                  />
                  <FontAwesomeIcon icon={faUmbrellaBeach} />
                  Picnic Area
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Currency Exchange")}
                    value="Currency Exchange"
                    checked={amenities[26] === "Currency Exchange"}
                  />
                  <FontAwesomeIcon icon={faInr} />
                  Currency Exchange
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Indoor Pool")}
                    value="Indoor Pool"
                    checked={amenities[27] === "Indoor Pool"}
                  />
                  <FontAwesomeIcon icon={faSwimmingPool} />
                  Indoor Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Shoesshine")}
                    value="Shoesshine"
                    checked={amenities[28] === "Shoesshine"}
                  />
                  <FontAwesomeIcon icon={faShoePrints} />
                  Shoesshine
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Tour Desk")}
                    value="Tour Desk"
                    checked={amenities[29] === "Tour Desk"}
                  />
                  <FontAwesomeIcon icon={faCheck} />
                  Tour Desk
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Laundry")}
                    value="Laundry"
                    checked={amenities[30] === "Laundry"}
                  />
                  <FontAwesomeIcon icon={faShirt} />
                  Laundry
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Lockers")}
                    value="Lockers"
                    checked={amenities[31] === "Lockers"}
                  />
                  <FontAwesomeIcon icon={faLock} />
                  Lockers
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAmenity("Business Center")}
                    value="Business Center"
                    checked={amenities[32] === "Business Center"}
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
                  <input
                    type="radio"
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
                  <input
                    type="radio"
                    name="cancellationpolicy"
                    value="allowed"
                    checked={cancellationpolicy === "allowed"}
                    onChange={(e) => setCancellationpolicy(e.target.value)}
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
                    onChange={(e) => setCancellationpolicy(e.target.value)}
                  />
                  Not Allowed
                </label>
                <br />
                <label>3-Select Your Payment Mode You Accepted</label>
                <br />
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
                <br />
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
                <br />
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
                <br />
                <label>4-Pets Allowed</label>
                <br />
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
                <br />
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
                <br />
                <label>5-Bachelor Allowed</label>
                <br />
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
                <br />
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
                <br />
                <label>6-Smoking Allowed</label>
                <br />
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
                <br />
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
                <br />
                <label>7-Alcohol Allowed</label>
                <br />
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
                <br />
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
                <br />
                <label>8-Unmarried Couples</label>
                <br />
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
                <br />
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
                <br />
                <label>9-International Guest Allowed</label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="internationalcouple"
                    value="allowed"
                    checked={internationalcouple === "allowed"}
                    onChange={(e) => setInternationalcouple(e.target.value)}
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
                    onChange={(e) => setInternationalcouple(e.target.value)}
                  />
                  Not Allowed
                </label>
                <br />

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
                <div className="tariff-container1">
                  <label htmlFor="offdoublesharing">
                    Double Sharing:
                    <input
                      type="text"
                      id="offdoublesharing"
                      value={offDoubleSharing}
                      onChange={(e) => setOffDoubleSharing(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offquadsharing">
                    Quad Sharing:
                    <input
                      type="text"
                      id="offquadsharing"
                      value={offquadsharing}
                      onChange={(e) => setOffquadsharing(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offbulkbooking">
                    Bulk Booking more then 20-30people:
                    <input
                      type="text"
                      id="offbulkbooking"
                      value={offbulkbooking}
                      onChange={(e) => setOffbulkbooking(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offtripplesharing">
                    Tripple Sharing:
                    <input
                      type="text"
                      id="offtripplesharing"
                      onChange={(e) => setOfftripplesharing(e.target.value)}
                    />
                  </label>
                  <label htmlFor="offmore4room">
                    More then four rooms:
                    <input
                      type="text"
                      id="offmore4rooms"
                      value={offmore4room}
                      onChange={(e) => setOffmore4room(e.target.value)}
                    />
                  </label>
                  <h6>AP Plan</h6>
                  <label htmlFor="offDoubleSharingApPlan">
                    Double Sharing:
                    <input
                      type="text"
                      id="offDoubleSharingApPlan"
                      value={offDoubleSharingApPlan}
                      onChange={(e) =>
                        setOffDoubleSharingApPlan(e.target.value)
                      }
                    />
                  </label>

                  <label htmlFor="offquadsharing">
                    Quad Sharing:
                    <input
                      type="text"
                      id="offquadsharingap"
                      value={offquadsharingap}
                      onChange={(e) => setOffquadsharingap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offbulkbookingap">
                    Bulk Booking more then 20-30people:
                    <input
                      type="text"
                      id="offbulkbookingap"
                      value={offbulkbookingap}
                      onChange={(e) => setOffbulkbookingap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offtripplesharingap">
                    Tripple Sharing:
                    <input
                      type="text"
                      id="offtripplesharingap"
                      value={offtripplesharingap}
                      onChange={(e) => setOfftripplesharingap(e.target.value)}
                    />
                  </label>
                  <label htmlFor="offmore4roomap">
                    More then four rooms:
                    <input
                      type="text"
                      id="offmore4roomsap"
                      value={offmore4roomap}
                      onChange={(e) => setOffmore4roomap(e.target.value)}
                    />
                  </label>
                  <h6>Map plan</h6>
                  <label htmlFor="offdoublesharingmap">
                    Double Sharing:
                    <input
                      type="text"
                      id="offdoublesharingmap"
                      value={offDoubleSharingmap}
                      onChange={(e) => setOffDoubleSharingmap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offquadsharingmap">
                    Quad Sharing:
                    <input
                      type="text"
                      id="offquadsharingmap"
                      value={offquadsharingmap}
                      onChange={(e) => setOffquadsharingmap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offbulkbookingmap">
                    Bulk Booking more then 20-30people:
                    <input
                      type="text"
                      id="offbulkbookingmap"
                      value={offbulkbookingmap}
                      onChange={(e) => setOffbulkbookingmap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="offtripplesharingmap">
                    Tripple Sharing:
                    <input
                      type="text"
                      id="offtripplesharingmap"
                      value={offtripplesharingmap}
                      onChange={(e) => setOfftripplesharingmap(e.target.value)}
                    />
                  </label>
                  <label htmlFor="offmore4roommap">
                    More then four rooms:
                    <input
                      type="text"
                      id="offmore4roomsmap"
                      value={offmore4roommap}
                      onChange={(e) => setOffmore4roommap(e.target.value)}
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
                  </label>
                  <h6>AP Plan</h6>
                  <label htmlFor="ondoublesharingap">
                    Double Sharing:
                    <input
                      type="text"
                      id="ondoublesharingap"
                      value={onDoubleSharingap}
                      onChange={(e) => setOnDoubleSharingap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="onquadsharingap">
                    Quad Sharing:
                    <input
                      type="text"
                      id="onquadsharingap"
                      value={onQuadSharingap}
                      onChange={(e) => setOnQuadSharingap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="onbulkbookingap">
                    Bulk Booking more then 20-30people:
                    <input
                      type="text"
                      id="onbulkbookingap"
                      value={onbulkbookingap}
                      onChange={(e) => setOnbulkbookingap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="ontripplesharingap">
                    Tripple Sharing:
                    <input
                      type="text"
                      id="ontripplesharingap"
                      value={ontripplesharingap}
                      onChange={(e) => setOntripplesharingap(e.target.value)}
                    />
                  </label>
                  <label htmlFor="ontripplesharing">
                    More then four rooms:
                    <input
                      type="text"
                      id="onmore4roomsap"
                      value={onmore4roomap}
                      onChange={(e) => setOnmore4roomap(e.target.value)}
                    />
                  </label>
                  <h6>Map plan</h6>
                  <label htmlFor="ondoublesharingmap">
                    Double Sharing:
                    <input
                      type="text"
                      id="ondoublesharingmap"
                      value={onDoubleSharingmap} //offDoubleSharingMapPlan
                      onChange={(e) => setOnDoubleSharingmap(e.target.value)} //offDoubleSharingApPlan
                    />
                  </label>

                  <label htmlFor="onquadsharingmap">
                    Quad Sharing:
                    <input
                      type="text"
                      id="onquadsharingmap"
                      value={onQuadSharingmap}
                      onChange={(e) => setOnQuadSharingmap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="onbulkbookingmap">
                    Bulk Booking more then 20-30people:
                    <input
                      type="text"
                      id="onbulkbookingmap"
                      value={onbulkbookingmap}
                      onChange={(e) => setOnbulkbookingmap(e.target.value)}
                    />
                  </label>

                  <label htmlFor="ontripplesharingmap">
                    Tripple Sharing:
                    <input
                      type="text"
                      id="ontripplesharingmap"
                      value={ontripplesharingmap}
                      onChange={(e) => setOntripplesharingmap(e.target.value)}
                    />
                  </label>
                  <label htmlFor="onmore4roommap">
                    More then four rooms:
                    <input
                      type="text"
                      id="onmore4roomsmap"
                      value={onmore4roommap}
                      onChange={(e) => setOnmore4roommap(e.target.value)}
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
