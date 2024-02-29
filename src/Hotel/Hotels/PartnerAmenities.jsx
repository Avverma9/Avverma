import React, { useState } from "react";
import baseURL from "../../baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AmenitiesPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const navigate = useNavigate()
  const hotelId = localStorage.getItem("hotelId");
  const handleCheckboxChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
 


  const sendAmenitiesToAPI = async () => {
    // Check if there are selected amenities
    if (selectedAmenities.length === 0) {
      window.alert("Please select at least one amenity before submitting.");
      return;
    }
  
    // Display a confirmation dialog before submitting
    const isConfirmed = window.confirm(
      "Before submitting, have you checked all details? Do you want to submit?"
    );
  
    if (!isConfirmed) {
      return;
    }
  
    const apiEndpoint = `${baseURL}/create-a-amenities/to-your-hotel`;
  
    try {
      const response = await axios.post(apiEndpoint, {
        hotelId,
        amenities: selectedAmenities,
      });
  
      // Handle the API response if needed
      console.log("API Response:", response.data);
  
      // Check if the submission was successful
      if (response.status === 201) {
        // Show an alert if the submission was successful
        window.alert("Amenities submitted successfully!");
        navigate("/partner/fourth-step");
      } else {
        // Handle other cases if needed
        console.log("Submission failed:", response.data.error);
      }
    } catch (error) {
      // Handle errors during the API request
      console.error("Error sending amenities to API:", error);
    }
  };
  


  const amenitiesList = [
    { name: "Pool", id: "poolCheckbox" },
    { name: "Fitness Center", id: "fitnessCheckbox" },
    { name: "Spa", id: "spaCheckbox" },
    { name: "Restaurant", id: "restaurantCheckbox" },
    { name: "Conference Room", id: "conferenceRoomCheckbox" },
    { name: "Wi-Fi(Paid)", id: "wifiCheckbox" },
    { name: "Parking", id: "parkingCheckbox" },
    { name: "Pet Friendly", id: "petFriendlyCheckbox" },
    { name: "Laundry Service", id: "laundryCheckbox" },
    { name: "Business Center", id: "businessCenterCheckbox" },
    { name: "Shuttle Service", id: "shuttleCheckbox" },
    { name: "24-Hour Front Desk", id: "frontDeskCheckbox" },
    { name: "Gym", id: "gymCheckbox" },
    { name: "Lounge Area", id: "loungeCheckbox" },
    { name: "Free Wi-Fi", id: "freeWifiCheckbox" },
    { name: "TV", id: "tvCheckbox" },
    { name: "Air Conditioning", id: "airConditioningCheckbox" },
    { name: "Coffee Maker", id: "coffeeMakerCheckbox" },
    { name: "Balcony", id: "balconyCheckbox" },
    { name: "Jacuzzi", id: "jacuzziCheckbox" },
    { name: "Barbecue Area", id: "barbecueCheckbox" },
    { name: "Room Service", id: "roomServiceCheckbox" },
    { name: "Ensuite Bathroom", id: "ensuiteBathroomCheckbox" },
    { name: "Telephone", id: "telephoneCheckbox" },
    { name: "Daily Housekeeping", id: "dailyHousekeepingCheckbox" },
    { name: "Complimentary Toiletries", id: "toiletriesCheckbox" },
    { name: "Closet", id: "closetCheckbox" },
    { name: "Iron and Ironing Board", id: "ironCheckbox" },
    { name: "Hair Dryer", id: "hairDryerCheckbox" },
    { name: "Safe", id: "safeCheckbox" },
    { name: "Mini Fridge", id: "miniFridgeCheckbox" },
    { name: "Microwave", id: "microwaveCheckbox" },
    { name: "Desk", id: "deskCheckbox" },
    { name: "Wake-up Service", id: "wakeUpServiceCheckbox" },
    { name: "Heating", id: "heatingCheckbox" },
    { name: "Cable Channels", id: "cableChannelsCheckbox" },
    { name: "Non-Smoking Rooms", id: "nonSmokingCheckbox" },
    { name: "Soundproof Rooms", id: "soundproofCheckbox" },
    { name: "Family Rooms", id: "familyRoomsCheckbox" },
    { name: "Elevator", id: "elevatorCheckbox" },
    { name: "Wheelchair Accessible", id: "wheelchairAccessibleCheckbox" },
    { name: "Airport Shuttle", id: "airportShuttleCheckbox" },
    { name: "Concierge Service", id: "conciergeCheckbox" },
    { name: "Valet Parking", id: "valetParkingCheckbox" },
    { name: "Currency Exchange", id: "currencyExchangeCheckbox" },
    { name: "ATM on Site", id: "atmCheckbox" },
    { name: "Gift Shop", id: "giftShopCheckbox" },
    { name: "Express Check-in/Check-out", id: "expressCheckInCheckbox" },
    { name: "Tour Desk", id: "tourDeskCheckbox" },
    { name: "Ticket Service", id: "ticketServiceCheckbox" },
    { name: "Luggage Storage", id: "luggageStorageCheckbox" },
    { name: "Library", id: "libraryCheckbox" },
    { name: "Sun Terrace", id: "sunTerraceCheckbox" },
    { name: "Garden", id: "gardenCheckbox" },
    { name: "Picnic Area", id: "picnicAreaCheckbox" },
    { name: "Outdoor Furniture", id: "outdoorFurnitureCheckbox" },
    { name: "Terrace", id: "terraceCheckbox" },
    { name: "BBQ Facilities", id: "bbqFacilitiesCheckbox" },
    { name: "Vending Machine (Drinks)", id: "vendingMachineDrinksCheckbox" },
    { name: "Vending Machine (Snacks)", id: "vendingMachineSnacksCheckbox" },
    { name: "Special Diet Menus (on request)", id: "specialDietMenusCheckbox" },
    { name: "Packed Lunches", id: "packedLunchesCheckbox" },
    { name: "Kid-Friendly Buffet", id: "kidFriendlyBuffetCheckbox" },
    { name: "Kid Meals", id: "kidMealsCheckbox" },
    { name: "Breakfast in the Room", id: "breakfastInRoomCheckbox" },
    { name: "Restaurant Buffet", id: "restaurantBuffetCheckbox" },
    { name: "Snack Bar", id: "snackBarCheckbox" },
    { name: "Bar", id: "barCheckbox" },
    { name: "Wine/Champagne", id: "wineChampagneCheckbox" },
    { name: "Bottle of Water", id: "bottleOfWaterCheckbox" },
    { name: "Chocolate/Cookies", id: "chocolateCookiesCheckbox" },
    { name: "Fruit", id: "fruitCheckbox" },
    { name: "Kid-Friendly Buffet", id: "kidFriendlyBuffetCheckbox" },
    { name: "Kid Meals", id: "kidMealsCheckbox" },
    { name: "Breakfast in the Room", id: "breakfastInRoomCheckbox" },
    { name: "Restaurant Buffet", id: "restaurantBuffetCheckbox" },
    { name: "Snack Bar", id: "snackBarCheckbox" },
    { name: "Bar", id: "barCheckbox" },
    { name: "Wine/Champagne", id: "wineChampagneCheckbox" },
    { name: "Bottle of Water", id: "bottleOfWaterCheckbox" },
    { name: "Chocolate/Cookies", id: "chocolateCookiesCheckbox" },
    { name: "Fruit", id: "fruitCheckbox" },
    { name: "24-Hour Room Service", id: "roomServiceCheckbox" },
    { name: "Buffet Breakfast", id: "buffetBreakfastCheckbox" },
    { name: "Continental Breakfast", id: "continentalBreakfastCheckbox" },
    { name: "Gluten-Free Options", id: "glutenFreeOptionsCheckbox" },
    { name: "Vegetarian Options", id: "vegetarianOptionsCheckbox" },
    { name: "Vegan Options", id: "veganOptionsCheckbox" },
    { name: "Halal Options", id: "halalOptionsCheckbox" },
    { name: "Kosher Options", id: "kosherOptionsCheckbox" },
    { name: "Allergy-Free Room", id: "allergyFreeRoomCheckbox" },
    { name: "Designated Smoking Area", id: "smokingAreaCheckbox" },
    { name: "Non-Smoking Throughout", id: "nonSmokingThroughoutCheckbox" },
    { name: "Kitchen", id: "kitchen" },
  ];

  return (
    <div className="container mt-5">
        <h5>You came so far, fill amenities details carefully !</h5>
        <hr />
      <div className="row">
        {amenitiesList.map((amenity) => (
          <div key={amenity.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={amenity.id}
                    value={amenity.name}
                    checked={selectedAmenities.includes(amenity.name)}
                    onChange={() => handleCheckboxChange(amenity.name)}
                  />
                  <label className="form-check-label" htmlFor={amenity.id}>
                    {amenity.name}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-body">
             
              <ul className="list-group">
                {selectedAmenities.map((amenity) => (
                  <li key={amenity} className="list-group-item">
                    {amenity}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-primary mt-3"
                onClick={sendAmenitiesToAPI}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPage;
